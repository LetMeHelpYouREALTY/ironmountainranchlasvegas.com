/**
 * Cloudflare Worker — Image Optimization
 *
 * Uses Cloudflare Images features (2025–2026):
 * 1. Images binding (`env.IMAGES`) for byte-level transforms when available
 * 2. `cf.image` fetch options (URL interface equivalent) as primary path
 * 3. Long-lived cache + Accept-based format negotiation (avif/webp)
 *
 * @see https://developers.cloudflare.com/images/optimization/transformations/transform-via-workers/
 * @see https://developers.cloudflare.com/images/optimization/binding/
 */

export interface Env {
  CF_IMAGES_URL?: string;
  /** Images binding from wrangler.toml `[images] binding = "IMAGES"` */
  IMAGES?: ImagesBinding;
}

/** Minimal typing for the Images binding chain API */
type ImagesBinding = {
  info: (stream: ReadableStream) => Promise<{ width: number; height: number }>;
  input: (stream: ReadableStream) => ImagesPipeline;
};

type ImagesPipeline = {
  transform: (options: Record<string, unknown>) => ImagesPipeline;
  output: (options: { format: string; quality?: number }) => Promise<{
    response: () => Response;
  }>;
};

type ImageFit =
  | "scale-down"
  | "contain"
  | "cover"
  | "crop"
  | "pad"
  | "aspect-crop"
  | "scale-up";

interface ImageParams {
  width?: number;
  height?: number;
  quality: number;
  format: "auto" | "avif" | "webp" | "jpeg" | "png";
  fit: ImageFit;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Native /cdn-cgi/image/ is handled by the Cloudflare zone — pass through
    if (url.pathname.startsWith("/cdn-cgi/image/")) {
      return fetch(request);
    }

    if (!isImageRequest(url.pathname)) {
      return fetch(request);
    }

    const params = parseImageParams(url);
    const accept = request.headers.get("Accept") || "";
    const negotiatedFormat = negotiateFormat(accept, params.format);

    // Origin image URL without transform query params
    const originUrl = new URL(url.toString());
    ["w", "h", "q", "f", "fit", "width", "height", "quality", "format"].forEach(
      (key) => originUrl.searchParams.delete(key)
    );

    try {
      // Prefer Images binding when configured (byte pipeline)
      if (env.IMAGES && (params.width || params.height)) {
        const bound = await transformWithBinding(
          originUrl.toString(),
          params,
          negotiatedFormat,
          env.IMAGES
        );
        if (bound) return withImageHeaders(bound);
      }

      // Standard Worker transform via cf.image
      const cfImage: Record<string, unknown> = {
        fit: params.fit,
        quality: params.quality,
      };
      if (params.width) cfImage.width = params.width;
      if (params.height) cfImage.height = params.height;
      if (negotiatedFormat) cfImage.format = negotiatedFormat;

      const transformed = await fetch(originUrl.toString(), {
        headers: request.headers,
        // @ts-expect-error cf is available on Cloudflare Workers fetch
        cf: {
          image: cfImage,
          cacheTtl: 31_536_000,
          cacheEverything: true,
        },
      });

      if (!transformed.ok) {
        return fetch(request);
      }

      return withImageHeaders(transformed);
    } catch (error) {
      console.error("Image optimization error:", error);
      return fetch(request);
    }
  },
};

function isImageRequest(pathname: string): boolean {
  return (
    /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(pathname) ||
    pathname.startsWith("/Image/") ||
    pathname.startsWith("/images/")
  );
}

function parseImageParams(url: URL): ImageParams {
  const widthRaw = url.searchParams.get("w") || url.searchParams.get("width");
  const heightRaw = url.searchParams.get("h") || url.searchParams.get("height");
  const qualityRaw = url.searchParams.get("q") || url.searchParams.get("quality");
  const formatRaw = (url.searchParams.get("f") ||
    url.searchParams.get("format") ||
    "auto") as ImageParams["format"];
  const fitRaw = (url.searchParams.get("fit") || "scale-down") as ImageFit;

  return {
    width: widthRaw ? Number.parseInt(widthRaw, 10) : undefined,
    height: heightRaw ? Number.parseInt(heightRaw, 10) : undefined,
    quality: qualityRaw ? Number.parseInt(qualityRaw, 10) : 85,
    format: formatRaw,
    fit: fitRaw,
  };
}

function negotiateFormat(
  accept: string,
  requested: ImageParams["format"]
): "avif" | "webp" | "jpeg" | undefined {
  if (requested === "avif" || requested === "webp" || requested === "jpeg") {
    return requested;
  }
  // format=auto → content negotiate (required for Workers; URL interface does this natively)
  if (/image\/avif/i.test(accept)) return "avif";
  if (/image\/webp/i.test(accept)) return "webp";
  return undefined;
}

async function transformWithBinding(
  origin: string,
  params: ImageParams,
  format: "avif" | "webp" | "jpeg" | undefined,
  images: ImagesBinding
): Promise<Response | null> {
  const originResponse = await fetch(origin);
  if (!originResponse.ok || !originResponse.body) {
    return null;
  }

  const outputMime =
    format === "avif"
      ? "image/avif"
      : format === "webp"
        ? "image/webp"
        : originResponse.headers.get("content-type") || "image/jpeg";

  const transform: Record<string, unknown> = { fit: params.fit };
  if (params.width) transform.width = params.width;
  if (params.height) transform.height = params.height;

  const result = await images
    .input(originResponse.body)
    .transform(transform)
    .output({ format: outputMime, quality: params.quality });

  return result.response();
}

function withImageHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
  headers.set("Vary", "Accept");
  headers.set("X-CF-Image-Optimized", "1");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
