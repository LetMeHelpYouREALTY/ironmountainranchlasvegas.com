/**
 * Iron Mountain Ranch — shared SEO / GEO / AEO signals
 * Single source for NAP, hub URLs, dated facts, and page FAQs.
 */

import { agentInfo, marketStats, officeInfo, siteConfig } from "@/lib/site-config";
import { generateFAQSchema, type FAQItem } from "@/lib/schema";

export const IMR_HUB_PATH = "/neighborhoods/iron-mountain-ranch";
export const IMR_HUB_URL = `${siteConfig.url}${IMR_HUB_PATH}`;

export const IMR_NAP = {
  name: "Iron Mountain Ranch | Homes by Dr. Jan Duffy",
  phoneDisplay: agentInfo.phone,
  phoneTel: agentInfo.phoneTel,
  email: agentInfo.email,
  addressFull: officeInfo.address.full,
  street: officeInfo.address.street,
  city: officeInfo.address.city,
  state: officeInfo.address.state,
  zip: officeInfo.address.zip,
  license: agentInfo.license,
  siteUrl: siteConfig.url,
} as const;

export const IMR_FACTS = {
  lastUpdated: marketStats.lastUpdated,
  acres: "850",
  villages: marketStats.ironMountainRanch.villages,
  totalHomes: marketStats.ironMountainRanch.totalHomes,
  zipCodes: marketStats.ironMountainRanch.zipCodes.join(" & "),
  medianPrice: marketStats.ironMountainRanch.medianPriceFormatted,
  pricePerSqFt: marketStats.ironMountainRanch.pricePerSqFtFormatted,
  daysOnMarket: marketStats.ironMountainRanch.daysOnMarket,
  activeListings: marketStats.ironMountainRanch.activeListings,
  lmaDues: marketStats.ironMountainRanch.lmaDues,
  homeSizeRange: marketStats.ironMountainRanch.homeSizeRange,
  priceRange: marketStats.ironMountainRanch.priceRange,
} as const;

/** One-sentence atomic answer for AI citation / Speakable */
export const IMR_TLDR = `Iron Mountain Ranch is an ${IMR_FACTS.acres}-acre master-planned community in northwest Las Vegas (ZIP ${IMR_FACTS.zipCodes}) with about ${IMR_FACTS.villages} villages and ${IMR_FACTS.totalHomes} homes. As of ${IMR_FACTS.lastUpdated}, the median list price is about ${IMR_FACTS.medianPrice} (~${IMR_FACTS.pricePerSqFt}), with roughly ${IMR_FACTS.activeListings} active listings and ${IMR_FACTS.daysOnMarket} median days on market. Dr. Jan Duffy (${IMR_NAP.license}) offers Homes by Dr. Jan Duffy in Iron Mountain Ranch (Berkshire Hathaway HomeServices Nevada Properties) — call ${IMR_NAP.phoneDisplay}.`;

export type ImrGeoTopic =
  | "general"
  | "buy"
  | "sell"
  | "value"
  | "relocate"
  | "invest"
  | "luxury"
  | "new-construction"
  | "55plus"
  | "neighborhood";

const TOPIC_FAQS: Record<ImrGeoTopic, FAQItem[]> = {
  general: [
    {
      question: "Who is the REALTOR® for Iron Mountain Ranch Las Vegas?",
      answer: `Dr. Jan Duffy (${IMR_NAP.license}) (Homes by Dr. Jan Duffy) specializes in Iron Mountain Ranch (89131 & 89143). Call ${IMR_NAP.phoneDisplay} for village-specific guidance.`,
    },
    {
      question: "What is the median home price in Iron Mountain Ranch?",
      answer: `As of ${IMR_FACTS.lastUpdated}, the median list price is about ${IMR_FACTS.medianPrice} at roughly ${IMR_FACTS.pricePerSqFt}. Most resale activity falls in the ${IMR_FACTS.priceRange} range for ${IMR_FACTS.homeSizeRange} homes.`,
    },
    {
      question: "Where is Iron Mountain Ranch located?",
      answer: `Iron Mountain Ranch sits in northwest Las Vegas / Centennial Hills, ZIP codes ${IMR_FACTS.zipCodes}, along Iron Mountain Road with access to US-95 and the 215 Beltway.`,
    },
    {
      question: "Where do Iron Mountain Ranch residents shop and dine nearby?",
      answer:
        "Daily needs are covered by the Iron Mountain Road commercial center. The northwest office is at 7960 N Decatur Blvd, Suite B (about 8 minutes) in the Decatur & Grand Teton retail corridor, with Centennial Hills retail and hospital about 10 minutes south.",
    },
  ],
  buy: [
    {
      question: "How do I buy a home in Iron Mountain Ranch?",
      answer: `Get pre-approved, pick target villages (gated vs open, lot size), then work with Dr. Jan for same-day MLS alerts — inventory is thin (~${IMR_FACTS.activeListings} listings). Call ${IMR_NAP.phoneDisplay}.`,
    },
    {
      question: "Are Iron Mountain Ranch villages gated?",
      answer:
        "Several of the 9 villages have gated access. Dr. Jan confirms gate status, LMA dues, and school zoning for any address before you offer.",
    },
    {
      question: "What are HOA or LMA dues in Iron Mountain Ranch?",
      answer: `Typical combined Landscape Maintenance Association (LMA) plus village dues run about ${IMR_FACTS.lmaDues} as of ${IMR_FACTS.lastUpdated} — confirm the exact assessment before offering.`,
    },
  ],
  sell: [
    {
      question: "How do I sell my Iron Mountain Ranch home?",
      answer: `Use village-specific comps (not zip averages), professional marketing, and precise pricing. Well-priced homes here often sell near ${IMR_FACTS.daysOnMarket} days on market. Call Dr. Jan at ${IMR_NAP.phoneDisplay} for a free village CMA.`,
    },
    {
      question: "What is my Iron Mountain Ranch home worth?",
      answer: `Value depends on village, lot, upgrades, and floor plan. Dr. Jan provides a free live CMA using recent Iron Mountain Ranch closed sales — call ${IMR_NAP.phoneDisplay}.`,
    },
    {
      question: "How fast do Iron Mountain Ranch homes sell?",
      answer: `Median days on market is about ${IMR_FACTS.daysOnMarket} with roughly ${IMR_FACTS.activeListings} active listings community-wide (${IMR_FACTS.lastUpdated}).`,
    },
  ],
  value: [
    {
      question: "How do I get an Iron Mountain Ranch home valuation?",
      answer: `Request a free village-specific CMA from Dr. Jan Duffy — adjusted for lot, upgrades, and floor plan, not an automated estimate. Call ${IMR_NAP.phoneDisplay} or use the home valuation form.`,
    },
    {
      question: "What is price per square foot in Iron Mountain Ranch?",
      answer: `About ${IMR_FACTS.pricePerSqFt} median as of ${IMR_FACTS.lastUpdated}. Premiums apply for larger lots, Gass Peak views, and upgraded villages.`,
    },
    {
      question: "Do automated home value estimates work for Iron Mountain Ranch?",
      answer:
        "Automated estimates often miss village and lot differences across the 9 villages. A live MLS comp pull is more accurate for pricing or offers.",
    },
  ],
  relocate: [
    {
      question: "Is Iron Mountain Ranch good for relocating to Las Vegas?",
      answer: `Yes for buyers who want northwest Las Vegas gated villages, larger lots, and ${IMR_FACTS.homeSizeRange} homes near Floyd Lamb Park and the 215 Beltway. Dr. Jan specializes in out-of-state moves — call ${IMR_NAP.phoneDisplay}.`,
    },
    {
      question: "What ZIP codes cover Iron Mountain Ranch?",
      answer: `Primarily ${IMR_FACTS.zipCodes} in northwest Las Vegas / Centennial Hills.`,
    },
    {
      question: "How far is Iron Mountain Ranch from the Strip and airport?",
      answer:
        "About 30 minutes to the Las Vegas Strip and about 35 minutes to Harry Reid International Airport in off-peak traffic via US-95 / 215.",
    },
  ],
  invest: [
    {
      question: "Is Iron Mountain Ranch good for investment properties?",
      answer: `Larger lots and ${IMR_FACTS.homeSizeRange} homes appeal to long-term tenants; inventory is limited (~${IMR_FACTS.activeListings} listings). Dr. Jan runs ROI analysis before purchase — call ${IMR_NAP.phoneDisplay}.`,
    },
    {
      question: "What do homes cost in Iron Mountain Ranch for investors?",
      answer: `Median list about ${IMR_FACTS.medianPrice} (${IMR_FACTS.lastUpdated}), with a typical range of ${IMR_FACTS.priceRange}.`,
    },
    {
      question: "What are carrying costs (HOA/LMA) for Iron Mountain Ranch rentals?",
      answer: `Combined LMA + village dues typically ${IMR_FACTS.lmaDues}. Confirm the exact assessment and rental rules per village before buying.`,
    },
  ],
  luxury: [
    {
      question: "Are there luxury homes in Iron Mountain Ranch?",
      answer: `Select estates exceed $1M within the community; most activity is ${IMR_FACTS.priceRange}. For ultra-luxury Summerlin alternatives, compare The Ridges — Dr. Jan covers both. Call ${IMR_NAP.phoneDisplay}.`,
    },
    {
      question: "What lot sizes are available in Iron Mountain Ranch?",
      answer:
        "Lots are larger than average for the Las Vegas Valley at this price point — many support pools, RV parking, and custom landscaping. Village varies.",
    },
    {
      question: "Does Iron Mountain Ranch have mountain views?",
      answer:
        "Many homes overlook Gass Peak and the Sheep Range. View premiums vary by village and lot orientation.",
    },
  ],
  "new-construction": [
    {
      question: "Is there new construction in Iron Mountain Ranch?",
      answer: `Iron Mountain Ranch was built primarily 2001–2008; most inventory is resale. Nearby northwest options include Skye Canyon new construction. Call ${IMR_NAP.phoneDisplay} for current builder incentives.`,
    },
    {
      question: "Should I buy resale in Iron Mountain Ranch or new nearby?",
      answer:
        "Resale IMR often delivers more square footage and larger lots per dollar; new builds nearby may offer modern floor plans and warranties. Dr. Jan compares both with live comps.",
    },
    {
      question: "What is the Iron Mountain Ranch market like right now?",
      answer: `${IMR_FACTS.lastUpdated}: median list ${IMR_FACTS.medianPrice}, ~${IMR_FACTS.activeListings} active listings, ~${IMR_FACTS.daysOnMarket} days on market.`,
    },
  ],
  "55plus": [
    {
      question: "Is Iron Mountain Ranch a 55+ community?",
      answer: `No — Iron Mountain Ranch is an all-ages master-planned community. For 55+ near northwest Las Vegas, ask about Sun City Aliante and other Del Webb options. Call ${IMR_NAP.phoneDisplay}.`,
    },
    {
      question: "Can active adults buy in Iron Mountain Ranch?",
      answer:
        "Yes. Many buyers choose IMR for single-story floor plans, gated villages, and lower LMA dues versus resort-style 55+ HOAs.",
    },
    {
      question: "How does Iron Mountain Ranch compare to Sun City communities?",
      answer: `IMR has no age restriction, larger lots in many villages, and typical dues around ${IMR_FACTS.lmaDues}. Sun City communities offer age-restricted amenities and clubhouses.`,
    },
  ],
  neighborhood: [
    {
      question: "How does this area compare to Iron Mountain Ranch?",
      answer: `Iron Mountain Ranch (ZIP ${IMR_FACTS.zipCodes}) offers ~${IMR_FACTS.villages} villages, ${IMR_FACTS.totalHomes} homes, and a ${IMR_FACTS.lastUpdated} median list near ${IMR_FACTS.medianPrice}. Compare village by village with Dr. Jan — ${IMR_NAP.phoneDisplay}.`,
    },
    {
      question: "Which northwest Las Vegas community has the best value?",
      answer: `Iron Mountain Ranch often delivers strong square-footage value at ~${IMR_FACTS.pricePerSqFt} with LMA dues around ${IMR_FACTS.lmaDues}. Skye Canyon and Centennial Hills are nearby alternatives.`,
    },
    {
      question: "Who should I call for Iron Mountain Ranch comps?",
      answer: `Dr. Jan Duffy, Iron Mountain Ranch REALTOR® — ${IMR_NAP.phoneDisplay} or ${IMR_HUB_URL}.`,
    },
  ],
};

export function getImrTopicFaqs(topic: ImrGeoTopic = "general"): FAQItem[] {
  return TOPIC_FAQS[topic] ?? TOPIC_FAQS.general;
}

export function getImrFaqSchema(topic: ImrGeoTopic = "general") {
  return generateFAQSchema(getImrTopicFaqs(topic));
}

export function getImrServiceSchema(serviceName: string, serviceType: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    serviceType,
    provider: {
      "@type": "RealEstateAgent",
      name: IMR_NAP.name,
      telephone: "+17025001942",
      email: IMR_NAP.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: IMR_NAP.street,
        addressLocality: IMR_NAP.city,
        addressRegion: IMR_NAP.state,
        postalCode: IMR_NAP.zip,
        addressCountry: "US",
      },
      url: IMR_NAP.siteUrl,
    },
    areaServed: [
      { "@type": "Place", name: "Iron Mountain Ranch, Las Vegas, NV 89131" },
      { "@type": "Place", name: "Iron Mountain Ranch, Las Vegas, NV 89143" },
      { "@type": "Place", name: "Centennial Hills, Las Vegas, NV" },
    ],
    description: IMR_TLDR,
  };
}
