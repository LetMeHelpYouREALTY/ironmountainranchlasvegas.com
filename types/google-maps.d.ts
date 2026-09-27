/** Minimal Google Maps JS API types for the amenity map (full @types/google.maps optional). */
declare namespace google.maps {
  class LatLng {
    constructor(lat: number, lng: number);
    lat(): number;
    lng(): number;
  }

  class LatLngBounds {
    extend(point: LatLng): void;
  }

  class Map {
    constructor(el: HTMLElement, opts: Record<string, unknown>);
    fitBounds(bounds: LatLngBounds, padding?: number): void;
    setCenter(center: LatLng | { lat: number; lng: number }): void;
    setZoom(zoom: number): void;
    getZoom(): number | undefined;
  }

  class Marker {
    constructor(opts: Record<string, unknown>);
    setMap(map: Map | null): void;
    addListener(event: string, handler: () => void): void;
  }

  class InfoWindow {
    constructor(opts?: Record<string, unknown>);
    open(opts: { map: Map; anchor?: Marker }): void;
    close(): void;
    setContent(content: string): void;
  }

  class Circle {
    constructor(opts: Record<string, unknown>);
    setMap(map: Map | null): void;
  }

  namespace marker {
    class AdvancedMarkerElement {
      constructor(opts: Record<string, unknown>);
      map: Map | null;
      addListener(event: string, handler: () => void): void;
    }
  }

  class PlacesService {
    constructor(map: Map);
    nearbySearch(
      request: Record<string, unknown>,
      callback: (results: PlacesServiceResult[] | null, status: string) => void
    ): void;
  }

  interface PlacesServiceResult {
    name?: string;
    geometry?: { location?: LatLng };
    vicinity?: string;
    formatted_address?: string;
    rating?: number;
    place_id?: string;
  }

  namespace places {
    class Place {
      static searchNearby(request: Record<string, unknown>): Promise<{ places: PlaceResult[] }>;
    }
    interface PlaceResult {
      displayName?: string;
      formattedAddress?: string;
      location?: LatLng;
      rating?: number;
      googleMapsURI?: string;
    }
  }

  function importLibrary(name: string): Promise<Record<string, unknown>>;
}

interface Window {
  google?: typeof google;
}
