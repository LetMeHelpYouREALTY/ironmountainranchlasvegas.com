import type { BreadcrumbItem } from "@/lib/schema";

/**
 * Human-readable labels for each route path (used in BreadcrumbList JSON-LD).
 * Matches visible breadcrumb trails on inner pages where present.
 */
const PATH_LABELS: Record<string, string> = {
  "/about": "About",
  "/buyers": "Buyers",
  "/buyers/california-relocator": "California Relocator",
  "/buyers/first-time-buyers": "First-Time Buyers",
  "/buyers/luxury-homes-las-vegas": "Luxury Homes",
  "/contact": "Contact",
  "/faq": "FAQ",
  "/google-business": "Google Business",
  "/home-valuation": "Home Valuation",
  "/investment-properties": "Investment Properties",
  "/listings": "Listings",
  "/luxury-homes": "Luxury Homes",
  "/market-insights": "Market Insights",
  "/market-report": "Market Report",
  "/market-update": "Weekly Update",
  "/new-construction": "New Construction",
  "/relocation": "Relocation",
  "/security-policy": "Security Policy",
  "/services": "Services",
  "/sellers": "Sellers",
  "/sellers/divorce-probate": "Divorce & Probate",
  "/sellers/downsizing": "Downsizing",
  "/sellers/move-up": "Move-Up Sellers",
  "/sellers/relocation": "Relocation",
  "/why-berkshire-hathaway": "Why Berkshire Hathaway",
  "/neighborhoods": "Neighborhoods",
  "/neighborhoods/centennial-hills": "Centennial Hills",
  "/neighborhoods/green-valley": "Green Valley",
  "/neighborhoods/henderson": "Henderson",
  "/neighborhoods/inspirada": "Inspirada",
  "/neighborhoods/iron-mountain-ranch": "Iron Mountain Ranch",
  "/neighborhoods/mountains-edge": "Mountains Edge",
  "/neighborhoods/north-las-vegas": "North Las Vegas",
  "/neighborhoods/skye-canyon": "Skye Canyon",
  "/neighborhoods/southern-highlands": "Southern Highlands",
  "/neighborhoods/summerlin": "Summerlin",
  "/neighborhoods/the-ridges": "The Ridges",
  "/55-plus-communities": "55+ Communities",
  "/55-plus-communities/del-webb-lake-las-vegas": "Del Webb at Lake Las Vegas",
  "/55-plus-communities/heritage-stonebridge": "Heritage at Stonebridge",
  "/55-plus-communities/solera-anthem": "Solera at Anthem",
  "/55-plus-communities/sun-city-aliante": "Sun City Aliante",
  "/55-plus-communities/sun-city-anthem": "Sun City Anthem",
  "/55-plus-communities/sun-city-summerlin": "Sun City Summerlin",
  "/55-plus-communities/trilogy-summerlin": "Trilogy at Summerlin",
};

/** Routes whose trail does not follow default parent segments */
const CHAIN_OVERRIDES: Record<string, BreadcrumbItem[]> = {
  "/market-update": [
    { name: "Home", url: "/" },
    { name: "Market Report", url: "/market-report" },
    { name: "Weekly Update", url: "/market-update" },
  ],
};

const SECTION_SLUG_LABELS: Record<string, string> = {
  "55-plus-communities": "55+ Communities",
  buyers: "Buyers",
  sellers: "Sellers",
  neighborhoods: "Neighborhoods",
  listings: "Listings",
};

function formatSlug(slug: string): string {
  if (SECTION_SLUG_LABELS[slug]) {
    return SECTION_SLUG_LABELS[slug];
  }

  return slug
    .split("-")
    .map((word) => {
      const lower = word.toLowerCase();
      if (lower === "las" || lower === "vegas" || lower === "nv") {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
      if (word.length <= 2) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

function labelForPath(path: string, segment: string): string {
  return PATH_LABELS[path] ?? formatSlug(segment);
}

function buildDefaultChain(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  const items: BreadcrumbItem[] = [{ name: "Home", url: "/" }];

  for (let i = 0; i < segments.length; i++) {
    const path = `/${segments.slice(0, i + 1).join("/")}`;
    items.push({
      name: labelForPath(path, segments[i]),
      url: path,
    });
  }

  return items;
}

/**
 * Resolve BreadcrumbList items for the current pathname.
 * Returns null on the homepage (no inner-page trail).
 */
export function resolvePageBreadcrumbs(pathname: string): BreadcrumbItem[] | null {
  const normalized = pathname.split("?")[0].replace(/\/$/, "") || "/";

  if (normalized === "/") {
    return null;
  }

  if (CHAIN_OVERRIDES[normalized]) {
    return CHAIN_OVERRIDES[normalized];
  }

  const listingMatch = /^\/listings\/[^/]+$/.exec(normalized);
  if (listingMatch) {
    return [
      { name: "Home", url: "/" },
      { name: "Listings", url: "/listings" },
      { name: "Property Details", url: normalized },
    ];
  }

  return buildDefaultChain(normalized);
}
