# Image Assets Guide

Content-matched photography for Iron Mountain Ranch / Las Vegas pages.
Route → image mapping lives in `lib/page-images.ts`.

## Folder Structure

```
images/
├── hero/           # Homepage / flagship IMR hero
├── og/             # Open Graph / social share defaults
├── page-heroes/    # Buyer, seller, valuation, relocation, investment, about
├── agent/          # Agent-related visuals (desk/keys — not stock headshots)
├── properties/     # Featured listing demo photos
├── neighborhoods/  # Area/community photos (IMR, Summerlin, Henderson, etc.)
├── testimonials/   # Reserved (reviews use initials, not stock faces)
└── logos/          # Brand assets
```

## Usage

```tsx
import Image from "next/image";
import { HOME_HERO, getPageHeroImage } from "@/lib/page-images";
import PageHeroImage from "@/components/sections/PageHeroImage";

// Homepage
<Image src={HOME_HERO.src} alt={HOME_HERO.alt} fill priority />

// Interior pages
<PageHeroImage pathname="/neighborhoods/summerlin" />
```

## Notes

- Prefer `/images/*` over legacy `/Image/*`.
- Do not use stock headshots for Dr. Jan Duffy or client testimonials.
- Always include location-specific alt text for SEO.
- Next.js `next/image` handles AVIF/WebP optimization locally; enable Cloudflare Images via env (see `.env.example`) for edge transforms (`/cdn-cgi/image`, Images binding, or `imagedelivery.net`).
