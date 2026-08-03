/**
 * Nearby places for Iron Mountain Ranch context (amenities / map pins).
 * Office NAP lives in lib/site-config.ts / lib/gbp-schema.ts — keep in sync.
 */

import { officeInfo, siteConfig } from "@/lib/site-config";

export type ImrNearbyPlace = {
  id: string;
  name: string;
  category: "office" | "retail" | "dining" | "park" | "healthcare" | "other";
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

/** Northwest office + Decatur & Grand Teton retail corridor pin */
export const DECATUR_RETAIL_CORRIDOR: ImrNearbyPlace = {
  id: "decatur-office-suite-b",
  name: `${siteConfig.name} Office`,
  category: "office",
  streetAddress: officeInfo.address.street,
  city: officeInfo.address.city,
  state: "NV",
  zip: officeInfo.address.zip,
  latitude: officeInfo.coordinates.lat,
  longitude: officeInfo.coordinates.lng,
  driveMinutesFromImr: 8,
  description:
    "Homes by Dr. Jan Duffy — northwest office in Suite B at the N Decatur Blvd retail corridor near W Grand Teton Drive. Dining and everyday shopping are steps away; Iron Mountain Ranch villages are about eight minutes west.",
  highlights: [
    "Office: 7960 N Decatur Blvd, Suite B",
    "Retail corridor dining nearby (Marco's Pizza, Summit Tavern, and more)",
    "Quick access from Iron Mountain Ranch via Decatur / Grand Teton",
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

/** Place schema for the office / amenity pin */
export function generateNearbyPlaceSchema(place: ImrNearbyPlace) {
  return {
    "@context": "https://schema.org",
    "@type": place.category === "office" ? "RealEstateAgent" : "Place",
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
