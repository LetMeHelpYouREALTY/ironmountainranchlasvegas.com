import { afterEach, describe, expect, it, vi } from "vitest";
import { cfImageUrl, cfOgImageUrl } from "@/lib/cf-images";
import cloudflareImageLoader from "@/lib/cloudflare-image-loader";

describe("cfImageUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns the original path when Cloudflare features are disabled", () => {
    expect(cfImageUrl("/images/hero/iron-mountain-ranch.jpg")).toBe(
      "/images/hero/iron-mountain-ranch.jpg"
    );
  });

  it("builds /cdn-cgi/image URLs when resizing is enabled", () => {
    vi.stubEnv("NEXT_PUBLIC_CF_IMAGE_RESIZING", "true");
    vi.stubEnv("NEXT_PUBLIC_CF_IMAGE_ZONE", "https://img.example.com");

    expect(
      cfImageUrl("/images/neighborhoods/summerlin.jpg", {
        width: 1200,
        quality: 80,
        fit: "cover",
      })
    ).toBe(
      "https://img.example.com/cdn-cgi/image/width=1200,quality=80,fit=cover,format=auto/images/neighborhoods/summerlin.jpg"
    );
  });

  it("builds OG-sized URLs", () => {
    vi.stubEnv("NEXT_PUBLIC_CF_IMAGE_RESIZING", "true");

    expect(cfOgImageUrl("/images/og/default.jpg")).toBe(
      "/cdn-cgi/image/width=1200,height=630,quality=85,fit=cover,format=auto/images/og/default.jpg"
    );
  });

  it("builds worker query-string URLs", () => {
    vi.stubEnv("NEXT_PUBLIC_CF_IMAGE_WORKER", "true");

    expect(
      cfImageUrl("/images/properties/imr-gated-village-home.jpg", { width: 800 })
    ).toBe(
      "/images/properties/imr-gated-village-home.jpg?f=auto&fit=cover&q=85&w=800"
    );
  });
});

describe("cloudflareImageLoader", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("uses /cdn-cgi/image for Next.js width requests", () => {
    vi.stubEnv("NEXT_PUBLIC_CF_IMAGE_RESIZING", "true");
    vi.stubEnv("NEXT_PUBLIC_CF_IMAGE_ZONE", "https://img.example.com");

    expect(
      cloudflareImageLoader({
        src: "/images/hero/iron-mountain-ranch.jpg",
        width: 1920,
        quality: 75,
      })
    ).toBe(
      "https://img.example.com/cdn-cgi/image/width=1920,quality=75,fit=cover,format=auto/images/hero/iron-mountain-ranch.jpg"
    );
  });
});
