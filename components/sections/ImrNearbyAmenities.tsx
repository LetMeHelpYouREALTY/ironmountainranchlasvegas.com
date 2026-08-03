import { MapPin, ExternalLink } from "lucide-react";
import SchemaScript from "@/components/SchemaScript";
import {
  DECATUR_RETAIL_CORRIDOR,
  generateNearbyPlaceSchema,
  placeFullAddress,
  placeMapsDirectionsUrl,
  placeMapsEmbedUrl,
  placeMapsOpenUrl,
} from "@/lib/imr-nearby";

type ImrNearbyAmenitiesProps = {
  /** Show only the Decatur retail pin (default) or expand later */
  placeId?: string;
};

/**
 * Nearby amenity map pin for Iron Mountain Ranch context.
 * Does not change office NAP / LocalBusiness address.
 */
export default function ImrNearbyAmenities({
  placeId = DECATUR_RETAIL_CORRIDOR.id,
}: ImrNearbyAmenitiesProps) {
  const place =
    placeId === DECATUR_RETAIL_CORRIDOR.id ? DECATUR_RETAIL_CORRIDOR : DECATUR_RETAIL_CORRIDOR;
  const address = placeFullAddress(place);
  const schema = generateNearbyPlaceSchema(place);

  return (
    <section
      className="mb-16 max-w-5xl mx-auto"
      aria-labelledby="imr-nearby-retail-heading"
    >
      <SchemaScript schema={schema} id={`imr-nearby-${place.id}`} />

      <h2
        id="imr-nearby-retail-heading"
        className="text-3xl font-bold text-slate-900 mb-3"
      >
        Visit our northwest office on N Decatur Blvd
      </h2>
      <p className="text-lg text-slate-600 mb-8 max-w-3xl">
        Suite B at 7960 N Decatur Blvd — about {place.driveMinutesFromImr} minutes from Iron
        Mountain Ranch, in the Decatur &amp; Grand Teton retail corridor.
      </p>

      <div className="relative w-full overflow-hidden border border-slate-200 bg-slate-100 aspect-[21/9] min-h-[240px] max-h-[420px]">
        <iframe
          title={`Map of ${place.name} at ${address}`}
          src={placeMapsEmbedUrl(place)}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      <div className="mt-6 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div>
          <p className="flex items-start gap-2 text-slate-900 font-semibold">
            <MapPin className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" aria-hidden />
            <span>
              {place.name}
              <br />
              <span className="font-normal text-slate-600">{address}</span>
            </span>
          </p>
          <p className="mt-3 text-slate-600 max-w-xl">{place.description}</p>
          <ul className="mt-4 space-y-2 text-slate-700 text-sm">
            {place.highlights.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-blue-600" aria-hidden>
                  ·
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
          <a
            href={placeMapsDirectionsUrl(place)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-md font-semibold transition-colors"
          >
            Get directions
            <ExternalLink className="h-4 w-4 ml-2" aria-hidden />
          </a>
          <a
            href={placeMapsOpenUrl(place)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-slate-300 bg-white hover:bg-slate-50 text-slate-900 px-5 py-3 rounded-md font-semibold transition-colors"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
