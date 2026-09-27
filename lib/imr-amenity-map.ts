/**
 * Iron Mountain Ranch — interactive amenity map config & curated places.
 * Community center: OpenStreetMap residential landuse centroid (Iron Mountain Ranch, Las Vegas).
 */

import { siteConfig, agentInfo, officeInfo } from "@/lib/site-config";
import { generateBreadcrumbSchema, generateFAQSchema, generateRealEstateAgentSchema } from "@/lib/schema";
import type { FAQItem } from "@/lib/schema";

export const AMENITIES_PAGE_PATH = "/amenities";

/** Documented community center — OSM landuse "Iron Mountain Ranch" (Sept 2026) */
export const IMR_COMMUNITY_CENTER = {
  name: "Iron Mountain Ranch",
  streetAddress: "Iron Mountain Rd & Farm Rd area",
  city: "Las Vegas",
  state: "NV" as const,
  zip: "89131",
  latitude: 36.3073292,
  longitude: -115.2198454,
  coordinateSource: "OpenStreetMap residential landuse centroid (Iron Mountain Ranch, Las Vegas)",
};

export type AmenityCategoryId =
  | "restaurants"
  | "cafes"
  | "grocery"
  | "parks"
  | "golf"
  | "healthcare"
  | "pharmacies"
  | "shopping"
  | "parking"
  | "fitness"
  | "schools";

export type AmenityCategory = {
  id: AmenityCategoryId;
  label: string;
  /** Places API (New) includedPrimaryTypes */
  primaryTypes: string[];
  ariaLabel: string;
};

/** Family master-planned community — schools included; grocery & parks near top */
export const AMENITY_CATEGORIES: AmenityCategory[] = [
  {
    id: "grocery",
    label: "Grocery",
    primaryTypes: ["grocery_store", "supermarket"],
    ariaLabel: "Show grocery stores near Iron Mountain Ranch",
  },
  {
    id: "parks",
    label: "Parks",
    primaryTypes: ["park"],
    ariaLabel: "Show parks near Iron Mountain Ranch",
  },
  {
    id: "restaurants",
    label: "Restaurants",
    primaryTypes: ["restaurant"],
    ariaLabel: "Show restaurants near Iron Mountain Ranch",
  },
  {
    id: "cafes",
    label: "Cafes",
    primaryTypes: ["cafe", "coffee_shop"],
    ariaLabel: "Show cafes near Iron Mountain Ranch",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    primaryTypes: ["hospital", "doctor"],
    ariaLabel: "Show healthcare near Iron Mountain Ranch",
  },
  {
    id: "pharmacies",
    label: "Pharmacies",
    primaryTypes: ["pharmacy", "drugstore"],
    ariaLabel: "Show pharmacies near Iron Mountain Ranch",
  },
  {
    id: "shopping",
    label: "Shopping",
    primaryTypes: ["shopping_mall", "department_store"],
    ariaLabel: "Show shopping near Iron Mountain Ranch",
  },
  {
    id: "golf",
    label: "Golf",
    primaryTypes: ["golf_course"],
    ariaLabel: "Show golf courses near Iron Mountain Ranch",
  },
  {
    id: "fitness",
    label: "Fitness",
    primaryTypes: ["gym", "fitness_center"],
    ariaLabel: "Show fitness centers near Iron Mountain Ranch",
  },
  {
    id: "schools",
    label: "Schools",
    primaryTypes: ["school", "primary_school", "secondary_school"],
    ariaLabel: "Show schools near Iron Mountain Ranch",
  },
  {
    id: "parking",
    label: "Parking",
    primaryTypes: ["parking"],
    ariaLabel: "Show parking near Iron Mountain Ranch",
  },
];

export type CuratedAmenity = {
  id: string;
  name: string;
  schemaType:
    | "Restaurant"
    | "Park"
    | "Hospital"
    | "GolfCourse"
    | "School"
    | "Library"
    | "GroceryStore"
    | "Place";
  categories: AmenityCategoryId[];
  streetAddress: string;
  city: string;
  state: "NV";
  zip: string;
  latitude?: number;
  longitude?: number;
  driveMinutesApprox?: number;
  note?: string;
};

/** Verified names & mailing addresses; coordinates only when sourced from OSM geocoding */
export const CURATED_AMENITIES: CuratedAmenity[] = [
  {
    id: "floyd-lamb-park",
    name: "Floyd Lamb Park at Tule Springs",
    schemaType: "Park",
    categories: ["parks"],
    streetAddress: "9200 Tule Springs Rd",
    city: "Las Vegas",
    state: "NV",
    zip: "89131",
    latitude: 36.3189985,
    longitude: -115.2716459,
    driveMinutesApprox: 10,
    note: "City park with ponds, picnic areas, and trails — a northwest Las Vegas staple minutes from IMR.",
  },
  {
    id: "centennial-hills-library",
    name: "Centennial Hills Library",
    schemaType: "Library",
    categories: ["parks", "shopping"],
    streetAddress: "6711 N Buffalo Dr",
    city: "Las Vegas",
    state: "NV",
    zip: "89131",
    latitude: 36.2833522,
    longitude: -115.2620074,
    driveMinutesApprox: 12,
  },
  {
    id: "smiths-durango",
    name: "Smith's Food and Drug",
    schemaType: "GroceryStore",
    categories: ["grocery"],
    streetAddress: "7130 N Durango Dr",
    city: "Las Vegas",
    state: "NV",
    zip: "89149",
    latitude: 36.2906659,
    longitude: -115.2856790,
    driveMinutesApprox: 12,
  },
  {
    id: "centennial-hills-hospital",
    name: "Centennial Hills Hospital Medical Center",
    schemaType: "Hospital",
    categories: ["healthcare"],
    streetAddress: "6570 N Decatur Blvd",
    city: "Las Vegas",
    state: "NV",
    zip: "89131",
    driveMinutesApprox: 12,
    note: "Full-service hospital south of IMR in the Centennial Hills medical corridor.",
  },
  {
    id: "arbor-view-high",
    name: "Arbor View High School",
    schemaType: "School",
    categories: ["schools"],
    streetAddress: "7465 W Washington Ave",
    city: "Las Vegas",
    state: "NV",
    zip: "89128",
    latitude: 36.3025289,
    longitude: -115.2574062,
    driveMinutesApprox: 10,
  },
  {
    id: "santa-fe-station",
    name: "Santa Fe Station Hotel & Casino",
    schemaType: "Place",
    categories: ["restaurants", "shopping"],
    streetAddress: "4949 N Rancho Dr",
    city: "Las Vegas",
    state: "NV",
    zip: "89130",
    latitude: 36.2498865,
    longitude: -115.2448221,
    driveMinutesApprox: 15,
    note: "Dining, entertainment, and hotel south of IMR via Rancho Drive.",
  },
  {
    id: "decatur-retail",
    name: "Decatur & Grand Teton retail corridor",
    schemaType: "Place",
    categories: ["shopping", "restaurants", "pharmacies"],
    streetAddress: "7960 N Decatur Blvd",
    city: "North Las Vegas",
    state: "NV",
    zip: "89085",
    latitude: officeInfo.coordinates.lat,
    longitude: officeInfo.coordinates.lng,
    driveMinutesApprox: 8,
    note: "Everyday shopping and dining near Dr. Jan's northwest office (Suite B).",
  },
];

export const DEFAULT_AMENITY_CATEGORY: AmenityCategoryId = "grocery";

export const MAP_SEARCH_RADIUS_METERS = 8000;

export function curatedAddress(place: CuratedAmenity): string {
  return `${place.streetAddress}, ${place.city}, ${place.state} ${place.zip}`;
}

export function mapsDirectionsUrl(address: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}

export function mapsEmbedUrl(lat: number, lng: number, zoom = 13): string {
  return `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
}

export function getCuratedForCategory(category: AmenityCategoryId): CuratedAmenity[] {
  return CURATED_AMENITIES.filter((p) => p.categories.includes(category));
}

export const AMENITIES_FAQ: FAQItem[] = [
  {
    question: "What grocery stores are near Iron Mountain Ranch?",
    answer:
      "Smith's Food and Drug on N Durango Drive and additional grocers along the Centennial Hills retail corridor are typically about 10–15 minutes from Iron Mountain Ranch villages, depending on traffic and which village you leave from.",
  },
  {
    question: "How far is Iron Mountain Ranch from the Las Vegas Strip?",
    answer:
      "Iron Mountain Ranch is roughly 25–30 minutes from the Las Vegas Strip in off-peak traffic via US-95, depending on your village and time of day.",
  },
  {
    question: "Are there hospitals near Iron Mountain Ranch?",
    answer:
      "Centennial Hills Hospital Medical Center on N Decatur Boulevard is the closest full-service hospital south of IMR — commonly about 10–15 minutes by car.",
  },
  {
    question: "What parks are close to Iron Mountain Ranch?",
    answer:
      "Floyd Lamb Park at Tule Springs is the flagship northwest park near IMR, with ponds, trails, and picnic areas; IMR also has its own landscaped parks and walking paths inside the master plan.",
  },
  {
    question: "How far is Iron Mountain Ranch from Harry Reid International Airport?",
    answer:
      "Plan on roughly 30–35 minutes to Harry Reid International Airport in typical off-peak traffic via US-95 and the 215 Beltway.",
  },
  {
    question: "How long does it take to reach Downtown Summerlin from Iron Mountain Ranch?",
    answer:
      "Downtown Summerlin is approximately 20 minutes south in off-peak traffic — useful for dining, shopping, and medical appointments beyond the immediate Centennial Hills corridor.",
  },
  {
    question: "What schools serve Iron Mountain Ranch?",
    answer:
      "Clark County School District schools such as Arbor View High School and northwest elementary campuses serve the IMR area; confirm assigned schools for a specific address with CCSD or Dr. Jan before you write an offer.",
  },
  {
    question: "Where do Iron Mountain Ranch residents shop and dine day to day?",
    answer:
      "The Iron Mountain Road commercial center covers many daily errands; the Decatur & Grand Teton corridor (including Dr. Jan's Suite B office at 7960 N Decatur Blvd) adds restaurants and services about eight minutes east.",
  },
];

export function generateImrCommunityPlaceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: IMR_COMMUNITY_CENTER.name,
    description:
      "Master-planned residential community in northwest Las Vegas (ZIP 89131 & 89143), served by Dr. Jan Duffy — Homes by Dr. Jan Duffy.",
    address: {
      "@type": "PostalAddress",
      addressLocality: IMR_COMMUNITY_CENTER.city,
      addressRegion: IMR_COMMUNITY_CENTER.state,
      postalCode: IMR_COMMUNITY_CENTER.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: IMR_COMMUNITY_CENTER.latitude,
      longitude: IMR_COMMUNITY_CENTER.longitude,
    },
    containedInPlace: {
      "@type": "City",
      name: "Las Vegas",
      addressRegion: "NV",
    },
  };
}

export function generateAmenitiesItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured places near Iron Mountain Ranch, Las Vegas",
    itemListElement: CURATED_AMENITIES.map((place, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": place.schemaType,
        name: place.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: place.streetAddress,
          addressLocality: place.city,
          addressRegion: place.state,
          postalCode: place.zip,
          addressCountry: "US",
        },
        ...(place.latitude != null &&
          place.longitude != null && {
            geo: {
              "@type": "GeoCoordinates",
              latitude: place.latitude,
              longitude: place.longitude,
            },
          }),
      },
    })),
  };
}

export function generateAmenitiesPageSchemas() {
  const agent = generateRealEstateAgentSchema();
  return [
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Nearby Amenities", url: AMENITIES_PAGE_PATH },
    ]),
    generateImrCommunityPlaceSchema(),
    generateAmenitiesItemListSchema(),
    generateFAQSchema(AMENITIES_FAQ),
    {
      ...agent,
      areaServed: [
        {
          "@type": "Place",
          name: "Iron Mountain Ranch, Las Vegas, NV 89131",
          geo: {
            "@type": "GeoCoordinates",
            latitude: IMR_COMMUNITY_CENTER.latitude,
            longitude: IMR_COMMUNITY_CENTER.longitude,
          },
        },
        {
          "@type": "Place",
          name: "Iron Mountain Ranch, Las Vegas, NV 89143",
        },
        ...(Array.isArray(agent.areaServed) ? agent.areaServed : []),
      ],
    },
  ];
}

export const amenitiesPageMetadata = {
  title: "Nearby Amenities in Iron Mountain Ranch, Las Vegas | Maps & Local Guide",
  description:
    "Interactive map of restaurants, parks, grocery, healthcare, schools, and shopping near Iron Mountain Ranch (89131 & 89143). Hyperlocal guide from Dr. Jan Duffy. Call (702) 500-1942.",
  canonical: `${siteConfig.url}${AMENITIES_PAGE_PATH}`,
  ogTitle: "Nearby Amenities in Iron Mountain Ranch, Las Vegas",
  ogDescription:
    "Explore parks, grocery, dining, healthcare, and schools around Iron Mountain Ranch with Dr. Jan Duffy's hyperlocal amenity map.",
};

export function getAmenitiesTrustBlock() {
  return {
    agentName: agentInfo.name,
    license: agentInfo.license,
    phone: agentInfo.phone,
    phoneTel: agentInfo.phoneTel,
    email: agentInfo.email,
    brokerage: agentInfo.brokerage,
    office: officeInfo.address.full,
  };
}
