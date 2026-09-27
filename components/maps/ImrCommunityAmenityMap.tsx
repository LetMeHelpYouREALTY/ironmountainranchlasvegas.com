"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ExternalLink, MapPin, Navigation } from "lucide-react";
import {
  AMENITY_CATEGORIES,
  CURATED_AMENITIES,
  DEFAULT_AMENITY_CATEGORY,
  IMR_COMMUNITY_CENTER,
  MAP_SEARCH_RADIUS_METERS,
  type AmenityCategoryId,
  type CuratedAmenity,
  curatedAddress,
  getCuratedForCategory,
  mapsDirectionsUrl,
  mapsEmbedUrl,
} from "@/lib/imr-amenity-map";

const MAP_HEIGHT_PX = 420;
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;

type MapPlace = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  rating?: number;
  isCommunity?: boolean;
  directionsUrl: string;
};

const COMMUNITY_MAP_PLACE: MapPlace = {
  id: "imr-center",
  name: IMR_COMMUNITY_CENTER.name,
  address: `${IMR_COMMUNITY_CENTER.city}, ${IMR_COMMUNITY_CENTER.state} ${IMR_COMMUNITY_CENTER.zip}`,
  lat: IMR_COMMUNITY_CENTER.latitude,
  lng: IMR_COMMUNITY_CENTER.longitude,
  isCommunity: true,
  directionsUrl: mapsDirectionsUrl(
    `${IMR_COMMUNITY_CENTER.name}, ${IMR_COMMUNITY_CENTER.city}, ${IMR_COMMUNITY_CENTER.state}`
  ),
};

type ImrCommunityAmenityMapProps = {
  /** Taller map on the dedicated amenities page */
  variant?: "default" | "large";
  /** Initial filter */
  initialCategory?: AmenityCategoryId;
  /** Hide category chips (homepage teaser) */
  showFilters?: boolean;
  className?: string;
};

function loadGoogleMapsScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("no window"));
  }
  if (window.google?.maps) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const existing = document.getElementById("google-maps-js");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("maps script error")));
      return;
    }
    if (!API_KEY) {
      reject(new Error("missing api key"));
      return;
    }
    const script = document.createElement("script");
    script.id = "google-maps-js";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&loading=async`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("maps script error"));
    document.head.appendChild(script);
  });
}

function curatedToMapPlace(place: CuratedAmenity): MapPlace | null {
  if (place.latitude == null || place.longitude == null) {
    return null;
  }
  const address = curatedAddress(place);
  return {
    id: place.id,
    name: place.name,
    address,
    lat: place.latitude,
    lng: place.longitude,
    directionsUrl: mapsDirectionsUrl(address),
  };
}

function infoWindowHtml(place: MapPlace): string {
  const rating =
    place.rating != null
      ? `<p style="margin:4px 0;font-size:13px">Rating: ${place.rating.toFixed(1)}</p>`
      : "";
  return `<div style="max-width:240px;font-family:system-ui,sans-serif">
    <strong>${place.name}</strong>
    ${rating}
    <p style="margin:6px 0 8px;font-size:13px;color:#475569">${place.address}</p>
    <a href="${place.directionsUrl}" target="_blank" rel="noopener noreferrer" style="color:#2563eb;font-weight:600;font-size:13px">Directions</a>
  </div>`;
}

export default function ImrCommunityAmenityMap({
  variant = "default",
  initialCategory = DEFAULT_AMENITY_CATEGORY,
  showFilters = true,
  className = "",
}: ImrCommunityAmenityMapProps) {
  const listId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoRef = useRef<google.maps.InfoWindow | null>(null);
  const observerStarted = useRef(false);

  const [category, setCategory] = useState<AmenityCategoryId>(initialCategory);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [apiFailed, setApiFailed] = useState(!API_KEY);
  const [loadingPlaces, setLoadingPlaces] = useState(false);

  const height = variant === "large" ? 520 : MAP_HEIGHT_PX;
  const curatedForCategory = getCuratedForCategory(category);
  const staticList = curatedForCategory.length > 0 ? curatedForCategory : CURATED_AMENITIES;

  useEffect(() => {
    const el = containerRef.current;
    if (!el || observerStarted.current) return;
    observerStarted.current = true;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
    infoRef.current?.close();
  }, []);

  const renderMarkers = useCallback(
    (places: MapPlace[]) => {
      const map = mapRef.current;
      if (!map || !window.google?.maps) return;
      clearMarkers();
      const bounds = new google.maps.LatLngBounds();
      const info = infoRef.current ?? new google.maps.InfoWindow();
      infoRef.current = info;

      const all = [COMMUNITY_MAP_PLACE, ...places.filter((p) => !p.isCommunity)];

      all.forEach((place) => {
        const position = new google.maps.LatLng(place.lat, place.lng);
        bounds.extend(position);
        const marker = new google.maps.Marker({
          map,
          position,
          title: place.name,
          ...(place.isCommunity && { zIndex: 1000 }),
        });
        marker.addListener("click", () => {
          info.setContent(infoWindowHtml(place));
          info.open({ map, anchor: marker });
        });
        markersRef.current.push(marker);
      });

      map.fitBounds(bounds, 48);
    },
    [clearMarkers]
  );

  const fetchPlaces = useCallback(
    async (cat: AmenityCategoryId) => {
      const map = mapRef.current;
      if (!map || !window.google?.maps) return;

      const categoryDef = AMENITY_CATEGORIES.find((c) => c.id === cat);
      const fallbackCurated = getCuratedForCategory(cat)
        .map(curatedToMapPlace)
        .filter((p): p is MapPlace => p != null);

      if (!API_KEY || apiFailed) {
        renderMarkers(fallbackCurated);
        return;
      }

      setLoadingPlaces(true);
      try {
        const center = new google.maps.LatLng(
          IMR_COMMUNITY_CENTER.latitude,
          IMR_COMMUNITY_CENTER.longitude
        );
        const types = categoryDef?.primaryTypes ?? ["restaurant"];
        let results: MapPlace[] = [];

        try {
          const placesLib = await google.maps.importLibrary("places");
          const PlaceCtor = placesLib.Place as typeof google.maps.places.Place;
          if (PlaceCtor?.searchNearby) {
            const { places } = await PlaceCtor.searchNearby({
              fields: ["displayName", "location", "formattedAddress", "rating", "googleMapsURI"],
              locationRestriction: {
                center,
                radius: MAP_SEARCH_RADIUS_METERS,
              },
              includedPrimaryTypes: types,
              maxResultCount: 18,
            });
            results = (places ?? []).map((p, i) => {
              const loc = p.location;
              const lat = loc?.lat?.() ?? IMR_COMMUNITY_CENTER.latitude;
              const lng = loc?.lng?.() ?? IMR_COMMUNITY_CENTER.longitude;
              const address = p.formattedAddress ?? "";
              return {
                id: `places-new-${i}`,
                name: p.displayName ?? "Place",
                address,
                lat,
                lng,
                rating: p.rating,
                directionsUrl: p.googleMapsURI ?? mapsDirectionsUrl(address || `${lat},${lng}`),
              };
            });
          }
        } catch {
          // Fall through to legacy Nearby Search
        }

        if (results.length === 0) {
          await new Promise<void>((resolve) => {
            const service = new google.maps.PlacesService(map);
            service.nearbySearch(
              {
                location: center,
                radius: MAP_SEARCH_RADIUS_METERS,
                type: types[0],
              },
              (raw, status) => {
                if (status === "OK" && raw) {
                  results = raw.slice(0, 18).map((r, i) => {
                    const loc = r.geometry?.location;
                    const lat = loc?.lat() ?? IMR_COMMUNITY_CENTER.latitude;
                    const lng = loc?.lng() ?? IMR_COMMUNITY_CENTER.longitude;
                    const address = r.vicinity ?? r.formatted_address ?? "";
                    const name = r.name ?? "Place";
                    return {
                      id: r.place_id ?? `legacy-${i}`,
                      name,
                      address,
                      lat,
                      lng,
                      rating: r.rating,
                      directionsUrl: mapsDirectionsUrl(`${name} ${address}`),
                    };
                  });
                }
                resolve();
              }
            );
          });
        }

        if (results.length === 0) {
          renderMarkers(fallbackCurated);
        } else {
          renderMarkers(results);
        }
      } catch {
        renderMarkers(fallbackCurated);
      } finally {
        setLoadingPlaces(false);
      }
    },
    [apiFailed, renderMarkers]
  );

  useEffect(() => {
    if (!shouldLoad || apiFailed || !mapDivRef.current) return;

    let cancelled = false;

    loadGoogleMapsScript()
      .then(() => {
        if (cancelled || !mapDivRef.current || !window.google?.maps) return;
        const map = new google.maps.Map(mapDivRef.current, {
          center: {
            lat: IMR_COMMUNITY_CENTER.latitude,
            lng: IMR_COMMUNITY_CENTER.longitude,
          },
          zoom: 13,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          ...(MAP_ID ? { mapId: MAP_ID } : {}),
        });
        mapRef.current = map;
        setMapReady(true);
      })
      .catch(() => {
        setApiFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [shouldLoad, apiFailed]);

  useEffect(() => {
    if (!mapReady) return;
    void fetchPlaces(category);
  }, [mapReady, category, fetchPlaces]);

  const useFallback = apiFailed || !API_KEY;

  return (
    <div ref={containerRef} className={className}>
      {showFilters && (
        <div
          className="flex flex-wrap gap-2 mb-4"
          role="tablist"
          aria-label="Amenity categories near Iron Mountain Ranch"
        >
          {AMENITY_CATEGORIES.map((cat) => {
            const selected = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${listId}-panel`}
                id={`${listId}-tab-${cat.id}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                  selected
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-blue-300"
                }`}
                onClick={() => setCategory(cat.id)}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      )}

      <div
        className="relative w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
        style={{ height, minHeight: MAP_HEIGHT_PX }}
        aria-busy={loadingPlaces}
      >
        {useFallback ? (
          <iframe
            title={`Map centered on ${IMR_COMMUNITY_CENTER.name}, Las Vegas`}
            src={mapsEmbedUrl(IMR_COMMUNITY_CENTER.latitude, IMR_COMMUNITY_CENTER.longitude)}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div ref={mapDivRef} className="absolute inset-0 h-full w-full" role="application" aria-label="Interactive Google Map of nearby amenities" />
        )}
        {loadingPlaces && !useFallback && (
          <div className="absolute inset-x-0 top-0 bg-slate-900/70 text-white text-xs text-center py-1">
            Loading places…
          </div>
        )}
      </div>

      <div
        id={`${listId}-panel`}
        role="tabpanel"
        aria-labelledby={`${listId}-tab-${category}`}
        className="mt-6"
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-3">
          {useFallback ? "Featured nearby places" : "Curated picks & fallback list"}
          <span className="sr-only"> for {AMENITY_CATEGORIES.find((c) => c.id === category)?.label}</span>
        </h3>
        <ul className="grid sm:grid-cols-2 gap-4">
          {staticList.map((place) => {
            const address = curatedAddress(place);
            return (
              <li
                key={place.id}
                className="bg-white border border-slate-200 rounded-lg p-4 text-sm"
              >
                <p className="font-semibold text-slate-900 flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" aria-hidden />
                  {place.name}
                </p>
                <p className="text-slate-600 mt-1 ml-6">{address}</p>
                {place.driveMinutesApprox != null && (
                  <p className="text-slate-500 mt-1 ml-6 text-xs">
                    Approx. {place.driveMinutesApprox} min from IMR
                  </p>
                )}
                {place.note && <p className="text-slate-600 mt-2 ml-6">{place.note}</p>}
                <a
                  href={mapsDirectionsUrl(address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 font-medium mt-2 ml-6 hover:underline"
                >
                  <Navigation className="h-3.5 w-3.5" aria-hidden />
                  Directions
                  <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              </li>
            );
          })}
        </ul>
        {useFallback && (
          <p className="text-slate-500 text-xs mt-4">
            Set <code className="text-slate-700">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> in Vercel for
            the full interactive map with live Places results.
          </p>
        )}
      </div>
    </div>
  );
}
