import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, MapPinned } from "lucide-react";
import { AMENITIES_PAGE_PATH } from "@/lib/imr-amenity-map";

const ImrCommunityAmenityMap = dynamic(
  () => import("@/components/maps/ImrCommunityAmenityMap"),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full rounded-lg border border-slate-200 bg-slate-100 animate-pulse"
        style={{ height: 420 }}
        aria-hidden
      />
    ),
  }
);

type ImrLifeNearbySectionProps = {
  /** Shorter copy for secondary pages */
  compact?: boolean;
};

export default function ImrLifeNearbySection({ compact = false }: ImrLifeNearbySectionProps) {
  return (
    <section
      className="py-16 md:py-20 bg-slate-50 border-y border-slate-200"
      aria-labelledby="imr-life-nearby-heading"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="max-w-3xl mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-2 flex items-center gap-2">
            <MapPinned className="h-4 w-4" aria-hidden />
            What&apos;s nearby
          </p>
          <h2 id="imr-life-nearby-heading" className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Life near Iron Mountain Ranch
          </h2>
          <p className="text-lg text-slate-600">
            {compact
              ? "Grocery, parks, healthcare, and schools within a short drive of northwest Las Vegas villages."
              : "Explore grocery, parks, dining, healthcare, schools, and shopping around Iron Mountain Ranch — the same hyperlocal lens Dr. Jan uses for buyer tours and listing pricing."}
          </p>
        </div>

        <ImrCommunityAmenityMap showFilters={!compact} />

        <div className="mt-8 text-center">
          <Link
            href={AMENITIES_PAGE_PATH}
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition-colors"
          >
            Full nearby amenities guide
            <ArrowRight className="h-4 w-4 ml-2" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
