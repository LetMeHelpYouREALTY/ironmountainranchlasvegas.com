import { afterEach, describe, expect, it, vi } from "vitest";
import { cfImageUrl, cfOgImageUrl } from "@/lib/cf-images";
import cloudflareImageLoader from "@/lib/cloudflare-image-loader";

describe("cfImageUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns the original path when Cloudflare resizing is disabled", () => {
    expect(cfImageUrl("/images/hero/iron-mountain-ranch.jpg")).toBe(
      "/images/hero/iron-mountain-ranch.jpg"
    );
  });

  it("builds official /cdn-cgi/image URLs in production when enabled", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_CF_IMAGE_RESIZING", "true");
    vi.stubEnv("NEXT_PUBLIC_CF_IMAGE_ZONE", "https://img.example.com");

    expect(
      cfImageUrl("/images/neighborhoods/summerlin.jpg", {
        width: 1200,
        quality: 80,
      })
    ).toBe(
      "https://img.example.com/cdn-cgi/image/width=1200,quality=80,format=auto/images/neighborhoods/summerlin.jpg"
    );
  });

  it("builds OG-sized URLs with cover fit", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_CF_IMAGE_RESIZING", "true");

    expect(cfOgImageUrl("/images/og/default.jpg")).toBe(
      "/cdn-cgi/image/width=1200,height=630,quality=85,fit=cover,format=auto/images/og/default.jpg"
    );
  });
});

describe("cloudflareImageLoader", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("matches the official CF+Next.js production URL shape", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_CF_IMAGE_ZONE", "https://img.example.com");

    expect(
      cloudflareImageLoader({
        src: "/images/hero/iron-mountain-ranch.jpg",
        width: 1920,
        quality: 75,
      })
    ).toBe(
      "https://img.example.com/cdn-cgi/image/width=1920,quality=75,format=auto/images/hero/iron-mountain-ranch.jpg"
    );
  });

  it("passthroughs in development per Cloudflare docs", () => {
    vi.stubEnv("NODE_ENV", "development");

    expect(
      cloudflareImageLoader({
        src: "/images/hero/iron-mountain-ranch.jpg",
        width: 800,
        quality: 75,
      })
    ).toBe("/images/hero/iron-mountain-ranch.jpg?width=800&quality=75");
  });
});
