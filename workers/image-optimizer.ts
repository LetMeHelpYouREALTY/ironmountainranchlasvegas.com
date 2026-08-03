/**
 * Cloudflare Worker — Image Optimization (URL interface / cf.image)
 *
 * Current practice (Aug 2026):
 * - Prefer dashboard Transformation Flows for `/images/*` (format=auto, width=auto)
 *   when the zone is proxied — no Worker required.
 * - Use this Worker when you need Accept negotiation or query-param control.
 * - Images binding (`env.IMAGES`) is paid — only used when the binding exists.
 *
 * @see https://developers.cloudflare.com/images/optimization/transformations/transform-via-workers/
 * @see https://developers.cloudflare.com/images/optimization/transformations/flows/
 */

export interface Env {
  /** Optional paid Images binding — see wrangler.toml */
  IMAGES?: ImagesBinding;
}

type ImagesBinding = {
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

    // Native /cdn-cgi/image/ is handled by the zone — pass through
    if (url.pathname.startsWith("/cdn-cgi/image/")) {
      return fetch(request);
    }

    if (!isImageRequest(url.pathname)) {
      return fetch(request);
    }

    const params = parseImageParams(url);
    const hasTransformHint =
      Boolean(params.width) ||
      Boolean(params.height) ||
      url.searchParams.has("f") ||
      url.searchParams.has("format") ||
      url.searchParams.has("q") ||
      url.searchParams.has("quality");

    // No explicit transform → let Transformation Flows / origin handle it
    if (!hasTransformHint) {
      const passthrough = await fetch(request);
      return withImageHeaders(passthrough, "passthrough");
    }

    const accept = request.headers.get("Accept") || "";
    const negotiatedFormat = negotiateFormat(accept, params.format);

    const originUrl = new URL(url.toString());
    ["w", "h", "q", "f", "fit", "width", "height", "quality", "format"].forEach(
      (key) => originUrl.searchParams.delete(key)
    );

    try {
      // Paid Images binding (optional)
      if (env.IMAGES && (params.width || params.height)) {
        const bound = await transformWithBinding(
          originUrl.toString(),
          params,
          negotiatedFormat,
          env.IMAGES
        );
        if (bound) return withImageHeaders(bound, "binding");
      }

      // URL-interface equivalent via cf.image (works on transform-enabled zones)
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

      return withImageHeaders(transformed, "cf.image");
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
    quality: qualityRaw ? Number.parseInt(qualityRaw, 10) : 75,
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
  // format=auto on Workers requires Accept negotiation
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

function withImageHeaders(response: Response, mode: string): Response {
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
  headers.set("Vary", "Accept");
  headers.set("X-CF-Image-Optimized", mode);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
