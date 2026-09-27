"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ExternalLink, MapPin, Navigation } from "lucide-react";
import {
  AMENITY_CATEGORIES,
  CURATED_AMENITIES,
  DEFAULT_AMENITY_CATEGORY,
  IMR_COMMUNITY_CENTER,
  type AmenityCategoryId,
  type CuratedAmenity,
  curatedAddress,
  getCuratedForCategory,
  mapsDirectionsUrl,
  mapsEmbedUrl,
} from "@/lib/imr-amenity-map";
import { imrSearchCenter, searchCategory } from "@/lib/imr-amenity-places";
import { loadGoogleMaps, mapsAuthFailed } from "@/lib/google-maps-loader";

const MAP_HEIGHT_PX = 420;
const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;

type MapPlace = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
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
  variant?: "default" | "large";
  initialCategory?: AmenityCategoryId;
  showFilters?: boolean;
  className?: string;
};

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

function buildInfoWindowContent(place: MapPlace): HTMLElement {
  const root = document.createElement("div");
  root.style.maxWidth = "240px";
  root.style.fontFamily = "system-ui, sans-serif";

  const title = document.createElement("strong");
  title.textContent = place.name;
  root.appendChild(title);

  const addr = document.createElement("p");
  addr.style.margin = "6px 0 8px";
  addr.style.fontSize = "13px";
  addr.style.color = "#475569";
  addr.textContent = place.address;
  root.appendChild(addr);

  const link = document.createElement("a");
  link.href = place.directionsUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.style.color = "#2563eb";
  link.style.fontWeight = "600";
  link.style.fontSize = "13px";
  link.textContent = "Directions";
  root.appendChild(link);

  return root;
}

function placeFromGoogleResult(
  place: google.maps.places.Place,
  index: number
): MapPlace | null {
  const loc = place.location;
  if (!loc) return null;
  const { lat, lng } = loc.toJSON();
  const address = place.formattedAddress ?? "";
  const name = place.displayName ?? "Place";
  return {
    id: place.id ?? `places-new-${index}`,
    name,
    address,
    lat,
    lng,
    directionsUrl: place.googleMapsURI ?? mapsDirectionsUrl(address || `${lat},${lng}`),
  };
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
  const [useFallback, setUseFallback] = useState(!MAPS_API_KEY || mapsAuthFailed);
  const [loadingPlaces, setLoadingPlaces] = useState(false);

  const height = variant === "large" ? 520 : MAP_HEIGHT_PX;
  const curatedForCategory = getCuratedForCategory(category);
  const staticList =
    curatedForCategory.length > 0 ? curatedForCategory : CURATED_AMENITIES;
  const categoryLabel =
    AMENITY_CATEGORIES.find((c) => c.id === category)?.label ?? "Amenities";

  useEffect(() => {
    const onAuthFailure = () => {
      mapRef.current = null;
      setMapReady(false);
      setUseFallback(true);
    };
    if (mapsAuthFailed) {
      onAuthFailure();
    }
    window.addEventListener("gmaps:auth-failure", onAuthFailure);
    return () => window.removeEventListener("gmaps:auth-failure", onAuthFailure);
  }, []);

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
      if (!map) return;
      clearMarkers();
      const bounds = new google.maps.LatLngBounds();
      const info = infoRef.current ?? new google.maps.InfoWindow();
      infoRef.current = info;

      const all = [COMMUNITY_MAP_PLACE, ...places.filter((p) => !p.isCommunity)];

      all.forEach((place) => {
        const position = { lat: place.lat, lng: place.lng };
        bounds.extend(position);
        const marker = new google.maps.Marker({
          map,
          position,
          title: place.name,
          ...(place.isCommunity && { zIndex: 1000 }),
        });
        marker.addListener("click", () => {
          info.setContent(buildInfoWindowContent(place));
          info.open({ map, anchor: marker });
        });
        markersRef.current.push(marker);
      });

      map.fitBounds(bounds, 48);
    },
    [clearMarkers]
  );

  const fallbackCuratedMarkers = useCallback(
    (cat: AmenityCategoryId) =>
      getCuratedForCategory(cat)
        .map(curatedToMapPlace)
        .filter((p): p is MapPlace => p != null),
    []
  );

  const fetchPlaces = useCallback(
    async (cat: AmenityCategoryId) => {
      if (!mapRef.current || useFallback) return;

      const categoryDef = AMENITY_CATEGORIES.find((c) => c.id === cat);
      const fallbackCurated = fallbackCuratedMarkers(cat);
      const types = categoryDef?.primaryTypes ?? ["restaurant"];

      setLoadingPlaces(true);
      try {
        const places = await searchCategory(imrSearchCenter(), cat, types);
        const results = places
          .map((p, i) => placeFromGoogleResult(p, i))
          .filter((p): p is MapPlace => p != null);
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
    [fallbackCuratedMarkers, renderMarkers, useFallback]
  );

  useEffect(() => {
    if (!shouldLoad || useFallback || !mapDivRef.current || !MAPS_API_KEY) return;

    if (mapsAuthFailed) {
      setUseFallback(true);
      return;
    }

    let cancelled = false;

    loadGoogleMaps(MAPS_API_KEY)
      .then(async () => {
        if (cancelled || !mapDivRef.current) return;
        const map = new google.maps.Map(mapDivRef.current, {
          center: imrSearchCenter(),
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
        if (!cancelled) {
          mapRef.current = null;
          setMapReady(false);
          setUseFallback(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [shouldLoad, useFallback]);

  useEffect(() => {
    if (!mapReady || useFallback) return;
    void fetchPlaces(category);
  }, [mapReady, category, fetchPlaces, useFallback]);

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
          <div
            ref={mapDivRef}
            className="absolute inset-0 h-full w-full"
            role="application"
            aria-label="Interactive Google Map of nearby amenities"
          />
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
          Featured places near {IMR_COMMUNITY_CENTER.name}
          <span className="sr-only"> — {categoryLabel}</span>
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
      </div>
    </div>
  );
}
