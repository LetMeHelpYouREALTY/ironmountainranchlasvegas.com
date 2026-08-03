/**
 * Cloudflare Images URL helpers (OG, JSON-LD, non-next/image contexts).
 *
 * Current practice (Aug 2026):
 * 1. Prefer URL interface `/cdn-cgi/image/<OPTIONS>/<SOURCE>`
 * 2. Prefer dashboard Transformation Flows for zero-code `/images/*` optimization
 * 3. Reserve Images binding / Workers for overlays, auth, or byte pipelines (paid)
 *
 * @see https://developers.cloudflare.com/images/optimization/transformations/integrate-with-frameworks/
 * @see https://developers.cloudflare.com/images/optimization/transformations/flows/
 */

export type CfImageOptions = {
  width?: number;
  height?: number;
  quality?: number;
  /** Omit unless you need a specific crop; URL interface default is safer for photos */
  fit?: "scale-down" | "contain" | "cover" | "crop" | "pad" | "aspect-crop" | "scale-up";
  format?: "auto" | "avif" | "webp" | "jpeg" | "baseline-jpeg" | "json";
};

function normalizeSrc(src: string): string {
  return src.startsWith("/") ? src.slice(1) : src;
}

function isProductionCfEnabled(): boolean {
  if (process.env.NODE_ENV === "development") return false;
  return (
    process.env.NEXT_PUBLIC_CF_IMAGE_RESIZING === "true" ||
    process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_ENABLED === "true"
  );
}

/**
 * Build a Cloudflare-optimized image URL.
 * Returns the original path in development or when CF resizing is disabled
 * (Vercel Image Optimization / Transformation Flows can still help).
 */
export function cfImageUrl(src: string, options: CfImageOptions = {}): string {
  if (!isProductionCfEnabled()) {
    return src;
  }

  const {
    width,
    height,
    quality = 75,
    fit,
    format = "auto",
  } = options;

  // Hosted Images delivery
  if (process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_ENABLED === "true") {
    const hash = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH;
    if (hash) {
      const id = normalizeSrc(src).replace(/^images\//, "");
      const parts = [
        width ? `width=${width}` : null,
        height ? `height=${height}` : null,
        `quality=${quality}`,
        fit ? `fit=${fit}` : null,
        `format=${format}`,
      ].filter(Boolean);
      return `https://imagedelivery.net/${hash}/${id}/${parts.join(",")}`;
    }
  }

  const zone = (process.env.NEXT_PUBLIC_CF_IMAGE_ZONE || "").replace(/\/$/, "");
  const parts = [
    width ? `width=${width}` : null,
    height ? `height=${height}` : null,
    `quality=${quality}`,
    fit ? `fit=${fit}` : null,
    `format=${format}`,
  ].filter(Boolean);
  const optionsPath = parts.join(",");

  if (src.startsWith("http://") || src.startsWith("https://")) {
    return `${zone}/cdn-cgi/image/${optionsPath}/${src}`;
  }

  return `${zone}/cdn-cgi/image/${optionsPath}/${normalizeSrc(src)}`;
}

/** Open Graph / social share size (1200×630). */
export function cfOgImageUrl(src: string): string {
  return cfImageUrl(src, {
    width: 1200,
    height: 630,
    fit: "cover",
    quality: 85,
    format: "auto",
  });
}
