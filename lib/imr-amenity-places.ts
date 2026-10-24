import { IMR_COMMUNITY_CENTER, MAP_SEARCH_RADIUS_METERS } from "@/lib/imr-amenity-map";

const cache = new Map<string, Promise<google.maps.places.Place[]>>();

export function searchCategory(
  center: google.maps.LatLngLiteral,
  categoryId: string,
  types: string[]
): Promise<google.maps.places.Place[]> {
  let p = cache.get(categoryId);
  if (!p) {
    p = (async () => {
      const { Place } = (await google.maps.importLibrary("places")) as google.maps.PlacesLibrary;
      const { places } = await Place.searchNearby({
        fields: ["displayName", "location", "formattedAddress", "googleMapsURI"],
        locationRestriction: { center, radius: MAP_SEARCH_RADIUS_METERS },
        includedPrimaryTypes: types,
        maxResultCount: 10,
        rankPreference: "POPULARITY" as any,
      });
      return places ?? [];
    })();
    p.catch(() => cache.delete(categoryId));
    cache.set(categoryId, p);
  }
  return p;
}

export function imrSearchCenter(): google.maps.LatLngLiteral {
  return {
    lat: IMR_COMMUNITY_CENTER.latitude,
    lng: IMR_COMMUNITY_CENTER.longitude,
  };
}
