/**
 * Cloudflare Images loader for Next.js `<Image />`.
 *
 * Per Cloudflare Images docs (URL interface, 2026):
 *   https://<ZONE>/cdn-cgi/image/<OPTIONS>/<SOURCE-IMAGE>
 *
 * Enable with NEXT_PUBLIC_CF_IMAGE_RESIZING=true.
 * Optional NEXT_PUBLIC_CF_IMAGE_ZONE for a dedicated image host
 * (recommended when the site is on Vercel with DNS-only / gray-cloud).
 *
 * Hosted Images (imagedelivery.net) are supported when
 * NEXT_PUBLIC_CLOUDFLARE_IMAGES_ENABLED=true and an account hash is set.
 */

type LoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

function buildCdnCgiUrl(src: string, width: number, quality: number): string {
  const zone = (process.env.NEXT_PUBLIC_CF_IMAGE_ZONE || "").replace(/\/$/, "");
  const options = [
    `width=${width}`,
    `quality=${quality}`,
    "fit=cover",
    "format=auto",
  ].join(",");

  // Absolute remote sources: pass full URL after options
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return `${zone}/cdn-cgi/image/${options}/${src}`;
  }

  const path = src.startsWith("/") ? src : `/${src}`;
  return `${zone}/cdn-cgi/image/${options}${path}`;
}

function buildHostedDeliveryUrl(src: string, width: number, quality: number): string | null {
  const accountHash = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH;
  if (!accountHash) return null;

  // Hosted Images IDs are typically not filesystem paths.
  // Support either a bare image id or "id/variant" style src.
  const id = src.replace(/^\/+/, "").replace(/^images\//, "");
  const flexible = `width=${width},quality=${quality},fit=cover,format=auto`;
  return `https://imagedelivery.net/${accountHash}/${id}/${flexible}`;
}

export default function cloudflareImageLoader({
  src,
  width,
  quality,
}: LoaderProps): string {
  const q = quality ?? 75;

  // 1) Cloudflare Hosted Images delivery
  if (process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_ENABLED === "true") {
    const hosted = buildHostedDeliveryUrl(src, width, q);
    if (hosted) return hosted;
  }

  // 2) Zone / Worker URL interface (/cdn-cgi/image/...)
  if (process.env.NEXT_PUBLIC_CF_IMAGE_RESIZING === "true") {
    return buildCdnCgiUrl(src, width, q);
  }

  // 3) Worker query-string fallback (workers/image-optimizer.ts)
  if (process.env.NEXT_PUBLIC_CF_IMAGE_WORKER === "true") {
    const path = src.startsWith("http") ? src : src.startsWith("/") ? src : `/${src}`;
    const params = new URLSearchParams({
      w: String(width),
      q: String(q),
      f: "auto",
      fit: "cover",
    });
    return `${path}?${params.toString()}`;
  }

  // Safe default when loader is registered but flags are off
  return src.startsWith("/") || src.startsWith("http") ? src : `/${src}`;
}
