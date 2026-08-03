"use client";

import { Button } from "@/components/ui/button";
import {
  REALSCOUT_AGENT_ENCODED_ID,
  REALSCOUT_LISTINGS_URL,
} from "@/lib/realscout-config";

type RealScoutListingsProps = {
  /** Optional section heading override */
  title?: string;
  subtitle?: string;
  /** Tighter spacing when placed directly under the page hero */
  compact?: boolean;
};

/**
 * RealScout Office Listings carousel (MLS).
 * Requires the global script in app/layout.tsx.
 */
export default function RealScoutListings({
  title = "Homes for Sale Near Iron Mountain Ranch",
  subtitle = "Live MLS listings across northwest Las Vegas — newest first",
  compact = false,
}: RealScoutListingsProps) {
  return (
    <section
      className={`${compact ? "py-10 md:py-14" : "py-16 md:py-24"} bg-slate-50`}
      aria-label="Featured MLS listings"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              {title}
            </h2>
            <p className="text-slate-600 text-lg">{subtitle}</p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <a
              href={REALSCOUT_LISTINGS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              View All Properties
            </a>
          </Button>
        </div>

        <div
          dangerouslySetInnerHTML={{
            __html: `<realscout-office-listings 
              agent-encoded-id="${REALSCOUT_AGENT_ENCODED_ID}" 
              sort-order="NEWEST" 
              listing-status="For Sale" 
              property-types=",SFR,MF,TC" 
              price-min="350000" 
              price-max="1200000"
            ></realscout-office-listings>`,
          }}
        />
      </div>
    </section>
  );
}
