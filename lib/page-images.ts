/**
 * Content-matched images for Iron Mountain Ranch / Las Vegas pages.
 * Prefer /images/* paths (organized); keep alt text location-specific for SEO.
 */

export type PageImage = {
  src: string;
  alt: string;
};

/** Default OG / social share image */
export const DEFAULT_OG_IMAGE: PageImage = {
  src: "/images/og/default.jpg",
  alt: "Iron Mountain Ranch homes in northwest Las Vegas with desert mountain views",
};

/** Homepage hero */
export const HOME_HERO: PageImage = {
  src: "/images/hero/iron-mountain-ranch.jpg",
  alt: "Iron Mountain Ranch neighborhood street with Mediterranean stucco homes and desert mountains in northwest Las Vegas",
};

/** Featured listing card images */
export const FEATURED_PROPERTY_IMAGES = {
  imrGated: {
    src: "/images/properties/imr-gated-village-home.jpg",
    alt: "Gated village home in Iron Mountain Ranch, Las Vegas 89131",
  },
  henderson: {
    src: "/images/properties/henderson-family-home.jpg",
    alt: "Spacious family home in Henderson, Nevada",
  },
  greenValley: {
    src: "/images/properties/green-valley-estate.jpg",
    alt: "Elegant estate home in Green Valley, Henderson",
  },
} as const;

/**
 * Resolve a content-matched hero image from the current route path.
 */
export function getPageHeroImage(pathname: string): PageImage {
  const path = pathname.replace(/\/$/, "") || "/";

  const exact: Record<string, PageImage> = {
    "/": HOME_HERO,
    "/neighborhoods/iron-mountain-ranch": {
      src: "/images/hero/iron-mountain-ranch.jpg",
      alt: "Iron Mountain Ranch homes for sale in northwest Las Vegas 89131",
    },
    "/neighborhoods/centennial-hills": {
      src: "/images/neighborhoods/centennial-hills.jpg",
      alt: "Centennial Hills northwest Las Vegas community near Iron Mountain Ranch",
    },
    "/neighborhoods/skye-canyon": {
      src: "/images/neighborhoods/skye-canyon.jpg",
      alt: "Skye Canyon new construction homes in northwest Las Vegas",
    },
    "/neighborhoods/summerlin": {
      src: "/images/neighborhoods/summerlin.jpg",
      alt: "Summerlin Las Vegas homes with Red Rock Canyon views",
    },
    "/neighborhoods/henderson": {
      src: "/images/neighborhoods/henderson.jpg",
      alt: "Henderson Nevada suburban homes for sale",
    },
    "/neighborhoods/green-valley": {
      src: "/images/neighborhoods/henderson.jpg",
      alt: "Green Valley Henderson neighborhood homes",
    },
    "/neighborhoods/the-ridges": {
      src: "/images/neighborhoods/luxury-estate.jpg",
      alt: "Luxury estate living near The Ridges Summerlin Las Vegas",
    },
    "/neighborhoods/southern-highlands": {
      src: "/images/neighborhoods/luxury-estate.jpg",
      alt: "Southern Highlands Las Vegas luxury community homes",
    },
    "/neighborhoods/north-las-vegas": {
      src: "/images/neighborhoods/north-las-vegas.jpg",
      alt: "North Las Vegas homes for sale",
    },
    "/neighborhoods/inspirada": {
      src: "/images/neighborhoods/henderson.jpg",
      alt: "Inspirada Henderson master-planned community homes",
    },
    "/neighborhoods/mountains-edge": {
      src: "/images/neighborhoods/skye-canyon.jpg",
      alt: "Mountains Edge southwest Las Vegas homes",
    },
    "/neighborhoods": {
      src: "/images/hero/iron-mountain-ranch.jpg",
      alt: "Iron Mountain Ranch and Las Vegas neighborhoods guide",
    },
    "/buyers": {
      src: "/images/page-heroes/buyers.jpg",
      alt: "Buy a home in Iron Mountain Ranch Las Vegas — inviting Mediterranean exterior",
    },
    "/sellers": {
      src: "/images/page-heroes/sellers.jpg",
      alt: "Sell your Iron Mountain Ranch home — staged Las Vegas curb appeal",
    },
    "/home-valuation": {
      src: "/images/page-heroes/home-valuation.jpg",
      alt: "Iron Mountain Ranch home valuation — Las Vegas single-family exterior",
    },
    "/relocation": {
      src: "/images/page-heroes/relocation.jpg",
      alt: "Relocating to Iron Mountain Ranch and the Las Vegas Valley",
    },
    "/investment-properties": {
      src: "/images/page-heroes/investment.jpg",
      alt: "Las Vegas and Iron Mountain Ranch investment rental homes",
    },
    "/luxury-homes": {
      src: "/images/neighborhoods/luxury-estate.jpg",
      alt: "Luxury homes in Iron Mountain Ranch and Las Vegas",
    },
    "/new-construction": {
      src: "/images/neighborhoods/skye-canyon.jpg",
      alt: "New construction near Iron Mountain Ranch in northwest Las Vegas",
    },
    "/about": {
      src: "/images/page-heroes/about-contact.jpg",
      alt: "Real estate consultation tools for Iron Mountain Ranch REALTOR® services",
    },
    "/contact": {
      src: "/images/page-heroes/about-contact.jpg",
      alt: "Contact your Iron Mountain Ranch REALTOR® — keys and home paperwork",
    },
    "/services": {
      src: "/images/neighborhoods/iron-mountain-ranch-home.jpg",
      alt: "REALTOR® services for Iron Mountain Ranch homes",
    },
    "/listings": {
      src: "/images/neighborhoods/iron-mountain-ranch-gate.jpg",
      alt: "Iron Mountain Ranch and Las Vegas homes for sale",
    },
    "/faq": {
      src: "/images/neighborhoods/iron-mountain-ranch-home.jpg",
      alt: "Iron Mountain Ranch real estate FAQ",
    },
    "/market-report": {
      src: "/images/neighborhoods/iron-mountain-ranch-pool.jpg",
      alt: "Iron Mountain Ranch Las Vegas market report",
    },
    "/market-update": {
      src: "/images/hero/iron-mountain-ranch.jpg",
      alt: "Iron Mountain Ranch market update",
    },
    "/market-insights": {
      src: "/images/neighborhoods/centennial-hills.jpg",
      alt: "Iron Mountain Ranch and Las Vegas market insights",
    },
    "/google-business": {
      src: "/images/page-heroes/about-contact.jpg",
      alt: "Dr. Jan Duffy Iron Mountain Ranch Google Business Profile",
    },
    "/why-berkshire-hathaway": {
      src: "/images/neighborhoods/luxury-estate.jpg",
      alt: "Berkshire Hathaway HomeServices for Iron Mountain Ranch real estate",
    },
    "/55-plus-communities": {
      src: "/images/neighborhoods/55-plus.jpg",
      alt: "55+ active adult communities near Iron Mountain Ranch Las Vegas",
    },
  };

  if (exact[path]) return exact[path];

  if (path.startsWith("/buyers/")) {
    if (path.includes("luxury")) {
      return {
        src: "/images/neighborhoods/luxury-estate.jpg",
        alt: "Luxury homes in Iron Mountain Ranch and Las Vegas for buyers",
      };
    }
    if (path.includes("california")) {
      return {
        src: "/images/page-heroes/relocation.jpg",
        alt: "California relocators moving to Iron Mountain Ranch Las Vegas",
      };
    }
    return {
      src: "/images/page-heroes/buyers.jpg",
      alt: "First-time homebuyers in Iron Mountain Ranch Las Vegas",
    };
  }

  if (path.startsWith("/sellers/")) {
    return {
      src: "/images/page-heroes/sellers.jpg",
      alt: "Selling your home in Iron Mountain Ranch Las Vegas",
    };
  }

  if (path.startsWith("/55-plus-communities/")) {
    return {
      src: "/images/neighborhoods/55-plus.jpg",
      alt: "55+ community homes near Iron Mountain Ranch Las Vegas",
    };
  }

  if (path.startsWith("/listings/")) {
    return FEATURED_PROPERTY_IMAGES.imrGated;
  }

  return HOME_HERO;
}
