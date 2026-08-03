/**
 * Cloudflare Images loader for Next.js `<Image />`.
 *
 * Aligned to current docs (checked Aug 2026):
 * - Cloudflare: integrate-with-frameworks (global loaderFile + normalizeSrc + dev passthrough)
 * - Next.js: images.loader Cloudflare example (`format=auto`)
 * - Prefer URL interface `/cdn-cgi/image/…` over Images binding (binding is paid)
 *
 * @see https://developers.cloudflare.com/images/optimization/transformations/integrate-with-frameworks/
 * @see https://nextjs.org/docs/app/api-reference/config/next-config-js/images
 *
 * Vercel + DNS-only (gray cloud) apex: set NEXT_PUBLIC_CF_IMAGE_ZONE to an
 * orange-clouded image host so /cdn-cgi/image hits Cloudflare.
 */

import type { ImageLoaderProps } from "next/image";

const normalizeSrc = (src: string): string =>
  src.startsWith("/") ? src.slice(1) : src;

/**
 * Build Cloudflare URL-interface options.
 * Official CF loader uses width + optional quality; Next.js Cloudflare example
 * adds format=auto for AVIF/WebP negotiation without separate URLs.
 */
function buildParams(width: number, quality?: number): string {
  const params = [`width=${width}`, `quality=${quality || 75}`, "format=auto"];
  return params.join(",");
}

export default function cloudflareImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  // Official CF pattern: skip /cdn-cgi in local next dev
  if (process.env.NODE_ENV === "development") {
    const params = [`width=${width}`];
    if (quality) params.push(`quality=${quality}`);
    const joiner = src.includes("?") ? "&" : "?";
    return `${src}${joiner}${params.join("&")}`;
  }

  // Hosted Images (imagedelivery.net) — only when explicitly enabled
  if (process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_ENABLED === "true") {
    const hash = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH;
    if (hash) {
      const id = normalizeSrc(src).replace(/^images\//, "");
      return `https://imagedelivery.net/${hash}/${id}/${buildParams(width, quality)}`;
    }
  }

  const options = buildParams(width, quality);
  const zone = (process.env.NEXT_PUBLIC_CF_IMAGE_ZONE || "").replace(/\/$/, "");

  // Absolute remote sources (allowed origin must be enabled in CF dashboard)
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return `${zone}/cdn-cgi/image/${options}/${src}`;
  }

  // Same-origin relative path (official CF + Next.js shape)
  // zone empty → `/cdn-cgi/image/...` on the request host (needs CF proxy)
  return `${zone}/cdn-cgi/image/${options}/${normalizeSrc(src)}`;
}
