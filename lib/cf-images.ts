/**
 * Helpers for Cloudflare Images URL interface and Open Graph assets.
 * @see https://developers.cloudflare.com/images/optimization/features/
 */

export type CfImageOptions = {
  width?: number;
  height?: number;
  quality?: number;
  fit?: "scale-down" | "contain" | "cover" | "crop" | "pad" | "aspect-crop" | "scale-up";
  format?: "auto" | "avif" | "webp" | "jpeg" | "baseline-jpeg" | "json";
};

function isCfResizingEnabled(): boolean {
  return (
    process.env.NEXT_PUBLIC_CF_IMAGE_RESIZING === "true" ||
    process.env.NEXT_PUBLIC_CF_IMAGE_WORKER === "true" ||
    process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_ENABLED === "true"
  );
}

/**
 * Build a Cloudflare-optimized image URL for a site-relative or absolute path.
 * Returns the original path when Cloudflare image features are disabled.
 */
export function cfImageUrl(src: string, options: CfImageOptions = {}): string {
  if (!isCfResizingEnabled()) {
    return src;
  }

  const {
    width,
    height,
    quality = 85,
    fit = "cover",
    format = "auto",
  } = options;

  // Worker query-string mode
  if (
    process.env.NEXT_PUBLIC_CF_IMAGE_WORKER === "true" &&
    process.env.NEXT_PUBLIC_CF_IMAGE_RESIZING !== "true" &&
    process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_ENABLED !== "true"
  ) {
    const path = src.startsWith("http") || src.startsWith("/") ? src : `/${src}`;
    const params = new URLSearchParams({ f: format, fit, q: String(quality) });
    if (width) params.set("w", String(width));
    if (height) params.set("h", String(height));
    return `${path}?${params.toString()}`;
  }

  // Hosted Images
  if (process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_ENABLED === "true") {
    const hash = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH;
    if (hash) {
      const id = src.replace(/^\/+/, "").replace(/^images\//, "");
      const parts = [
        width ? `width=${width}` : null,
        height ? `height=${height}` : null,
        `quality=${quality}`,
        `fit=${fit}`,
        `format=${format}`,
      ].filter(Boolean);
      return `https://imagedelivery.net/${hash}/${id}/${parts.join(",")}`;
    }
  }

  // /cdn-cgi/image/ URL interface
  const zone = (process.env.NEXT_PUBLIC_CF_IMAGE_ZONE || "").replace(/\/$/, "");
  const parts = [
    width ? `width=${width}` : null,
    height ? `height=${height}` : null,
    `quality=${quality}`,
    `fit=${fit}`,
    `format=${format}`,
  ].filter(Boolean);
  const optionsPath = parts.join(",");

  if (src.startsWith("http://") || src.startsWith("https://")) {
    return `${zone}/cdn-cgi/image/${optionsPath}/${src}`;
  }

  const path = src.startsWith("/") ? src : `/${src}`;
  return `${zone}/cdn-cgi/image/${optionsPath}${path}`;
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
