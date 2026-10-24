import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import SchemaScript from "@/components/SchemaScript";
import ImrCommunityAmenityMap from "@/components/maps/ImrCommunityAmenityMap";
import Link from "next/link";
import type { Metadata } from "next";
import { Phone, MapPin } from "lucide-react";
import {
  AMENITIES_FAQ,
  AMENITIES_PAGE_PATH,
  CURATED_AMENITIES,
  IMR_COMMUNITY_CENTER,
  amenitiesPageMetadata,
  generateAmenitiesPageSchemas,
  getAmenitiesTrustBlock,
} from "@/lib/imr-amenity-map";
import { combineSchemas } from "@/lib/schema";
import PageHeroImage from "@/components/sections/PageHeroImage";

export const metadata: Metadata = {
  title: amenitiesPageMetadata.title,
  description: amenitiesPageMetadata.description,
  alternates: {
    canonical: amenitiesPageMetadata.canonical,
  },
  openGraph: {
    title: amenitiesPageMetadata.ogTitle,
    description: amenitiesPageMetadata.ogDescription,
    url: amenitiesPageMetadata.canonical,
    type: "website",
  },
};

const pageSchema = combineSchemas(...generateAmenitiesPageSchemas());

const trust = getAmenitiesTrustBlock();

export default function AmenitiesPage() {
  return (
    <>
      <SchemaScript schema={pageSchema} id="imr-amenities-page" />
      <Navbar />
      <main>
        <PageHeroImage pathname={AMENITIES_PAGE_PATH} alt="Northwest Las Vegas landscape near Iron Mountain Ranch" showListings={false} />

        <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Nearby Amenities in Iron Mountain Ranch, Las Vegas
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-3xl">
            Hyperlocal map and guide to dining, parks, grocery, healthcare, schools, and commute times
            from northwest Las Vegas (89131 &amp; 89143).
          </p>
          <p id="tldr" className="text-lg text-slate-700 leading-relaxed mb-10 max-w-3xl">
            Iron Mountain Ranch sits in northwest Las Vegas along Iron Mountain Road with quick access
            to US-95 and the 215 Beltway. This page maps verified grocery, parks, healthcare, and
            retail anchors buyers ask about — plus approximate drive times to the Strip, Harry Reid
            International Airport, and Downtown Summerlin.
          </p>

          <section className="mb-16" aria-labelledby="amenities-map-heading">
            <h2 id="amenities-map-heading" className="text-2xl font-bold text-slate-900 mb-6">
              Interactive amenity map
            </h2>
            <ImrCommunityAmenityMap variant="large" showFilters />
          </section>

          <section className="mb-16 prose prose-slate max-w-none" aria-labelledby="dining-heading">
            <h2 id="dining-heading" className="text-2xl font-bold text-slate-900 not-prose mb-4">
              Dining &amp; everyday errands
            </h2>
            <p>
              Village life starts along the Iron Mountain Road commercial center for quick errands.
              For broader restaurant and retail selection, the Decatur &amp; Grand Teton corridor —
              including Dr. Jan&apos;s northwest office at 7960 N Decatur Blvd, Suite B — is about
              eight minutes east. Santa Fe Station on N Rancho Drive adds casino dining and
              entertainment roughly 15 minutes south in off-peak traffic.
            </p>
          </section>

          <section className="mb-16 prose prose-slate max-w-none" aria-labelledby="parks-heading">
            <h2 id="parks-heading" className="text-2xl font-bold text-slate-900 not-prose mb-4">
              Parks &amp; recreation
            </h2>
            <p>
              Inside Iron Mountain Ranch, landscaped parks, ponds, and walking paths connect the
              villages. Floyd Lamb Park at Tule Springs (9200 Tule Springs Rd) is the signature
              regional park — ponds, picnic areas, and trails about 10 minutes north for many IMR
              addresses. Red Rock Canyon and Mount Charleston are popular weekend drives for hiking
              and cooler temperatures.
            </p>
          </section>

          <section className="mb-16 prose prose-slate max-w-none" aria-labelledby="golf-heading">
            <h2 id="golf-heading" className="text-2xl font-bold text-slate-900 not-prose mb-4">
              Golf
            </h2>
            <p>
              Northwest Las Vegas is known for pay-and-play courses. Silverstone Ranch and Aliante
              Golf Club are common choices for IMR residents who want public golf without a private
              club buy-in. Use the map filters above to surface current golf listings near the
              community center ({IMR_COMMUNITY_CENTER.latitude.toFixed(4)},{" "}
              {IMR_COMMUNITY_CENTER.longitude.toFixed(4)} — {IMR_COMMUNITY_CENTER.coordinateSource}).
            </p>
          </section>

          <section className="mb-16 prose prose-slate max-w-none" aria-labelledby="health-heading">
            <h2 id="health-heading" className="text-2xl font-bold text-slate-900 not-prose mb-4">
              Healthcare &amp; pharmacies
            </h2>
            <p>
              Centennial Hills Hospital Medical Center (6900 N Durango Dr) anchors the southbound
              medical corridor — typically 10–15 minutes from Iron Mountain Ranch. Urgent care,
              primary care, and pharmacy chains cluster along Decatur, Buffalo, and Ann Road; use
              the Healthcare or Pharmacies filters on the map for nearby listings.
            </p>
          </section>

          <section className="mb-16 prose prose-slate max-w-none" aria-labelledby="shopping-heading">
            <h2 id="shopping-heading" className="text-2xl font-bold text-slate-900 not-prose mb-4">
              Grocery &amp; shopping
            </h2>
            <p>
              Smith&apos;s Food and Drug on N Durango Drive and Centennial Hills retail along Buffalo
              and Ann Road cover weekly grocery runs. Downtown Summerlin adds regional shopping and
              dining about 20 minutes south for buyers who want a second hub beyond the immediate
              northwest corridor.
            </p>
            <ul className="not-prose grid sm:grid-cols-2 gap-3 mt-6 text-sm text-slate-700">
              {CURATED_AMENITIES.filter((p) =>
                p.categories.some((c) => ["grocery", "shopping"].includes(c))
              ).map((place) => (
                <li key={place.id} className="border border-slate-200 rounded-lg p-4 bg-white">
                  <strong className="text-slate-900">{place.name}</strong>
                  <br />
                  {place.streetAddress}, {place.city}, {place.state} {place.zip}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-16 prose prose-slate max-w-none" aria-labelledby="schools-heading">
            <h2 id="schools-heading" className="text-2xl font-bold text-slate-900 not-prose mb-4">
              Schools
            </h2>
            <p>
              Iron Mountain Ranch is served by Clark County School District campuses in the northwest
              attendance zone, including Arbor View High School on Whispering Sands Drive. Assigned
              elementary and middle schools depend on the village address — verify zoning on CCSD&apos;s
              site or with Dr. Jan before you write an offer.
            </p>
          </section>

          <section className="mb-16" aria-labelledby="commute-heading">
            <h2 id="commute-heading" className="text-2xl font-bold text-slate-900 mb-4">
              Commute times (approximate, off-peak)
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Destination</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Typical drive</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-3">Downtown Summerlin</td>
                    <td className="px-4 py-3">~20 min</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3">Las Vegas Strip (mid-Strip)</td>
                    <td className="px-4 py-3">~25–30 min</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Harry Reid International Airport</td>
                    <td className="px-4 py-3">~30–35 min</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3">Centennial Hills Hospital</td>
                    <td className="px-4 py-3">~10–15 min</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Floyd Lamb Park at Tule Springs</td>
                    <td className="px-4 py-3">~10 min</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-500 text-sm mt-2">
              Times vary by village, route, and traffic — labeled approximate for planning only.
            </p>
          </section>

          <section id="faq" className="mb-16 max-w-4xl" aria-labelledby="amenities-faq-heading">
            <h2 id="amenities-faq-heading" className="text-2xl font-bold text-slate-900 mb-6">
              Iron Mountain Ranch amenities FAQ
            </h2>
            <dl className="space-y-4">
              {AMENITIES_FAQ.map((faq) => (
                <div key={faq.question} className="bg-white border border-slate-200 rounded-lg p-5">
                  <dt className="font-semibold text-slate-900 mb-1">{faq.question}</dt>
                  <dd className="text-slate-600 text-sm leading-relaxed">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section
            className="bg-blue-600 text-white rounded-2xl p-8 md:p-10 text-center"
            aria-labelledby="amenities-cta-heading"
          >
            <h2 id="amenities-cta-heading" className="text-2xl md:text-3xl font-bold mb-3">
              Tour Iron Mountain Ranch with a hyperlocal REALTOR®
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-6">
              {trust.agentName} ({trust.license}) maps amenities, villages, and live MLS comps for every
              Iron Mountain Ranch buyer and seller — {trust.brokerage}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a
                href={trust.phoneTel}
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-3 rounded-md font-bold hover:bg-blue-50 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" aria-hidden />
                Call {trust.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-md font-bold transition-colors"
              >
                Send a message
              </Link>
            </div>
            <p className="text-blue-200 text-sm flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden />
              {trust.office}
            </p>
            <p className="text-blue-200/80 text-xs mt-2">
              Also explore the{" "}
              <Link href="/neighborhoods/iron-mountain-ranch" className="underline hover:text-white">
                Iron Mountain Ranch community guide
              </Link>{" "}
              and{" "}
              <Link href="/listings" className="underline hover:text-white">
                live MLS search
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
