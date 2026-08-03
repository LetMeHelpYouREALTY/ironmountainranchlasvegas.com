/**
 * Nearby places for Iron Mountain Ranch context (amenities / map pins).
 * These are NOT office NAP — do not use for LocalBusiness address.
 */

export type ImrNearbyPlace = {
  id: string;
  name: string;
  category: "retail" | "dining" | "park" | "healthcare" | "other";
  /** Street address for maps / NAP-style display of the place itself */
  streetAddress: string;
  city: string;
  state: "NV";
  zip: string;
  /** Approximate WGS84 from public map data — verify before using in legal docs */
  latitude: number;
  longitude: number;
  driveMinutesFromImr: number;
  description: string;
  highlights: string[];
};

/** Decatur & Grand Teton retail corridor — dining/shopping pin for IMR buyers */
export const DECATUR_RETAIL_CORRIDOR: ImrNearbyPlace = {
  id: "decatur-grand-teton-retail",
  name: "N Decatur Blvd Retail Corridor",
  category: "retail",
  streetAddress: "7962 N Decatur Blvd",
  city: "North Las Vegas",
  state: "NV",
  zip: "89085",
  // Public map pin near Decatur & W Grand Teton (Aug 2026 lookup)
  latitude: 36.305,
  longitude: -115.205,
  driveMinutesFromImr: 8,
  description:
    "Retail and dining strip on N Decatur Boulevard near W Grand Teton Drive — everyday shopping and restaurants a short drive from Iron Mountain Ranch villages.",
  highlights: [
    "Dining (including nearby Marco's Pizza, Taco Bell, McDonald's, Summit Tavern)",
    "Surface parking and arterial access on Decatur",
    "Links to Centennial Hills / Aliante shopping further south",
  ],
};

export const IMR_NEARBY_PLACES: ImrNearbyPlace[] = [DECATUR_RETAIL_CORRIDOR];

export function placeFullAddress(place: ImrNearbyPlace): string {
  return `${place.streetAddress}, ${place.city}, ${place.state} ${place.zip}`;
}

export function placeMapsEmbedUrl(place: ImrNearbyPlace): string {
  const q = encodeURIComponent(placeFullAddress(place));
  return `https://maps.google.com/maps?q=${q}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}

export function placeMapsDirectionsUrl(place: ImrNearbyPlace): string {
  const q = encodeURIComponent(placeFullAddress(place));
  return `https://www.google.com/maps/dir//${q}`;
}

export function placeMapsOpenUrl(place: ImrNearbyPlace): string {
  const q = encodeURIComponent(placeFullAddress(place));
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

/** Place schema for a nearby amenity pin (not the agent LocalBusiness) */
export function generateNearbyPlaceSchema(place: ImrNearbyPlace) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: place.name,
    description: place.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: place.streetAddress,
      addressLocality: place.city,
      addressRegion: place.state,
      postalCode: place.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: place.latitude,
      longitude: place.longitude,
    },
  };
}
