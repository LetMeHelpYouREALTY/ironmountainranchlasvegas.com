import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import Link from "next/link";
import { Phone, Mountain, Shield, Home as HomeIcon, TrendingUp, Calculator, Search } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iron Mountain Ranch Homes for Sale | REALTOR® Services | Las Vegas 89131",
  description:
    "Iron Mountain Ranch homes for sale in northwest Las Vegas (89131 & 89143). 9 gated villages, 2,000–4,500 sq ft homes, median $535K. Dr. Jan Duffy, your Iron Mountain Ranch REALTOR®. Call (702) 500-1942.",
  keywords: [
    "Iron Mountain Ranch homes for sale",
    "Iron Mountain Ranch Las Vegas",
    "Iron Mountain Ranch realtor",
    "Iron Mountain Ranch real estate agent",
    "89131 homes for sale",
    "89143 homes for sale",
    "northwest Las Vegas gated community",
    "Centennial Hills master planned community",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the current median home price in Iron Mountain Ranch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "As of mid-2026, the median list price in Iron Mountain Ranch is approximately $535,000 at about $235 per square foot. Homes range from around $400,000 to over $1 million, with most activity between $550,000 and $725,000 for 2,200–3,400 square foot homes.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Iron Mountain Ranch located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Iron Mountain Ranch is an 850-acre master-planned community in northwest Las Vegas, ZIP codes 89131 and 89143, within the Centennial Hills area north of Providence. It sits along Iron Mountain Road with quick access to US-95 and the 215 Beltway, minutes from Floyd Lamb Park and Tule Springs Fossil Beds National Monument.",
      },
    },
    {
      "@type": "Question",
      name: "Are Iron Mountain Ranch neighborhoods gated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Iron Mountain Ranch is organized into 9 villages and several of them have gated access. The community totals approximately 1,700 single-family homes and townhomes built primarily between 2001 and 2008 with Mediterranean and Tuscan architectural styling.",
      },
    },
    {
      "@type": "Question",
      name: "Does Iron Mountain Ranch have an HOA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Iron Mountain Ranch operates under a Landscape Maintenance Association (LMA) plus village-level associations. The LMA maintains parks, green belts, and common elements. Typical combined dues run about $95–$185 per month as of 2026 — lower than most Summerlin or Henderson master plans.",
      },
    },
    {
      "@type": "Question",
      name: "How quickly do Iron Mountain Ranch homes sell?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Median days on market is currently about 27 days, with roughly 28 active listings community-wide. Inventory is limited, so buyers benefit from real-time listing alerts and sellers benefit from village-specific pricing.",
      },
    },
    {
      "@type": "Question",
      name: "Why hire an Iron Mountain Ranch specialist REALTOR®?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With only about 28 active listings across 9 villages, hyperlocal knowledge matters: which villages are gated, what the LMA covers, how lot sizes vary, and what identical floor plans closed for last month. Dr. Jan Duffy tracks every Iron Mountain Ranch sale and provides free village-specific valuations.",
      },
    },
  ],
};

const agentSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Dr. Jan Duffy - Iron Mountain Ranch Real Estate",
  url: "https://heyberkshire.com/neighborhoods/iron-mountain-ranch",
  telephone: "+17025001942",
  address: {
    "@type": "PostalAddress",
    streetAddress: "9406 W Lake Mead Blvd, Suite 100",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89134",
  },
  areaServed: [
    { "@type": "Place", name: "Iron Mountain Ranch, Las Vegas, NV 89131" },
    { "@type": "Place", name: "Iron Mountain Ranch, Las Vegas, NV 89143" },
    { "@type": "Place", name: "Centennial Hills, Las Vegas, NV" },
  ],
  knowsAbout: [
    "Iron Mountain Ranch homes for sale",
    "Iron Mountain Ranch home valuations",
    "Northwest Las Vegas gated communities",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "200",
  },
};

const realtorServices = [
  {
    icon: Search,
    title: "Buyer Representation in Iron Mountain Ranch",
    description:
      "Real-time alerts the moment a home hits the market in any of the 9 villages — often before public portals update. Village-by-village guidance on gates, lot sizes, LMA dues, and floor plans. Offer strategy built from actual closed comps, not zip-code averages.",
  },
  {
    icon: TrendingUp,
    title: "Listing & Selling Services",
    description:
      "Village-specific pricing using every comparable sale in Iron Mountain Ranch, professional photography that showcases Gass Peak views and oversized lots, and BHHS global marketing reach. Well-priced homes here sell in about 27 days.",
  },
  {
    icon: Calculator,
    title: "Free Iron Mountain Ranch Home Valuation",
    description:
      "A live comp pull from your specific village — adjusted for lot size, upgrades, and floor plan — not an automated estimate. No obligation. Know what your home is worth in today's market within 24 hours.",
  },
  {
    icon: Shield,
    title: "Off-Market & Pre-Listing Access",
    description:
      "With only ~28 active listings at a time, the best opportunities often trade quietly. Dr. Jan's Iron Mountain Ranch owner network surfaces pre-listing and off-market homes for serious buyers.",
  },
];

export default function IronMountainRanchPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(agentSchema) }}
      />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="max-w-6xl mx-auto mb-6">
            <nav className="text-sm text-slate-500">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              {" / "}
              <Link href="/neighborhoods" className="hover:text-blue-600">Neighborhoods</Link>
              {" / "}
              <span className="text-slate-900">Iron Mountain Ranch</span>
            </nav>
          </div>

          {/* Hero */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Your Iron Mountain Ranch REALTOR® | Berkshire Hathaway HomeServices
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Iron Mountain Ranch Homes for Sale
            </h1>
            <p className="text-xl text-slate-600">
              9 gated villages, roughly 1,700 homes, and Gass Peak views in northwest Las Vegas
              (89131 &amp; 89143). Dr. Jan Duffy tracks every listing and every sale in{" "}
              <strong>Iron Mountain Ranch</strong> — buyer representation, listing services, and
              free village-specific valuations.
            </p>
          </div>

          {/* Market Stats */}
          <section className="mb-16 bg-slate-900 text-white rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Iron Mountain Ranch Real Estate Market | August 2026
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">$535,000</div>
                <div className="text-slate-300 text-sm">Median List Price</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">27 Days</div>
                <div className="text-slate-300 text-sm">Median Days on Market</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">~28</div>
                <div className="text-slate-300 text-sm">Active Listings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">$235</div>
                <div className="text-slate-300 text-sm">Price per Sq Ft</div>
              </div>
            </div>
            <p className="text-center text-slate-400 text-xs mt-6">
              Source: MLS and public market data, verified August 2026. Values vary by village, lot,
              and floor plan — call for a live comp pull.
            </p>
          </section>

          {/* REALTOR Services — the hyperfocus */}
          <section className="mb-16 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              REALTOR® Services in Iron Mountain Ranch
            </h2>
            <p className="text-slate-600 text-center max-w-3xl mx-auto mb-10">
              Iron Mountain Ranch is a low-inventory community — about 28 homes on the market at any
              time across 9 villages. That makes hyperlocal expertise the deciding factor for both
              buyers and sellers. Here is exactly what Dr. Jan Duffy delivers.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {realtorServices.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.title}
                    className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-lg hover:border-blue-300 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 rounded-lg p-3 flex-shrink-0">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                        <p className="text-slate-600 text-sm">{service.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-8">
              <a
                href="tel:+17025001942"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md font-bold text-lg transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call (702) 500-1942 for Iron Mountain Ranch Service
              </a>
            </div>
          </section>

          {/* Main Content */}
          <section className="mb-16 max-w-5xl mx-auto">
            <div className="prose prose-lg max-w-none text-slate-700">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Iron Mountain Ranch: Northwest Las Vegas Living at the Base of Gass Peak
              </h2>
              <p>
                <strong>Iron Mountain Ranch</strong> is an 850-acre master-planned community in the
                Centennial Hills area of northwest Las Vegas, developed primarily between 2001 and
                2008 with Mediterranean and Tuscan architectural styling. The community is organized
                into <strong>9 villages</strong> — several of them gated — totaling approximately
                1,700 single-family homes and townhomes, most with 3–4 bedrooms and 2,000 to 4,500
                square feet of living space on larger-than-average lots.
              </p>
              <p>
                The community&apos;s backdrop is <strong>Gass Peak</strong>, the 6,937-foot high
                point of the Las Vegas Range, and its northern edge borders open desert leading to
                the Tule Springs Fossil Beds National Monument. Floyd Lamb Park — 680 acres of
                lakes, lawns, and walking paths — is minutes away. A commercial center on Iron
                Mountain Road handles daily needs, with the Centennial Hills retail corridor and
                Centennial Hills Hospital a short drive south.
              </p>
              <p>
                Unlike most Las Vegas master plans, Iron Mountain Ranch villages operate under a{" "}
                <strong>Landscape Maintenance Association (LMA)</strong> plus village associations,
                keeping typical combined dues around <strong>$95–$185 per month</strong> — well
                below the carrying cost of comparable Summerlin or Henderson communities. Combined
                with roughly $235 per square foot pricing, Iron Mountain Ranch delivers some of the
                strongest square-footage value in the northwest valley.
              </p>

              {/* Community Highlights */}
              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Community Highlights</h3>
              <div className="grid md:grid-cols-2 gap-8 not-prose">
                <div className="bg-slate-50 p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <Shield className="h-8 w-8 text-blue-600 mr-3" />
                    <h4 className="font-bold text-slate-900 text-lg">Gated Villages &amp; Large Lots</h4>
                  </div>
                  <p className="text-slate-600">
                    Several of the 9 villages feature gated access with low-traffic interior
                    streets. Homes sit on generous lots — many with room for pools, RV parking, and
                    custom landscaping — a rarity at this price point in the Las Vegas Valley.
                  </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <Mountain className="h-8 w-8 text-blue-600 mr-3" />
                    <h4 className="font-bold text-slate-900 text-lg">Gass Peak Views &amp; Open Desert</h4>
                  </div>
                  <p className="text-slate-600">
                    Elevated northwest positioning gives many homes unobstructed views of Gass Peak
                    and the Sheep Range. Community parks, green belts, and walking paths are
                    maintained by the LMA, and Floyd Lamb Park and Tule Springs trails are minutes
                    from every village.
                  </p>
                </div>
              </div>

              {/* Schools */}
              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Schools Serving Iron Mountain Ranch</h3>
              <div className="not-prose bg-white border border-slate-200 rounded-xl p-6">
                <p className="text-slate-700">
                  Iron Mountain Ranch is served by the <strong>Clark County School District</strong>,
                  with several charter and private options in the surrounding Centennial Hills area.
                  School zoning is address-specific and can differ between villages — Dr. Jan
                  provides exact school assignments for any home you are considering before you
                  write an offer. Call (702) 500-1942 for zoning on a specific address.
                </p>
              </div>

              {/* Commute Times */}
              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Drive Times from Iron Mountain Ranch</h3>
              <div className="not-prose overflow-x-auto">
                <table className="w-full bg-white border border-slate-200 rounded-lg">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Destination</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Approx. Drive Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr><td className="px-4 py-3">Floyd Lamb Park</td><td className="px-4 py-3">~5 min</td></tr>
                    <tr className="bg-slate-50"><td className="px-4 py-3">Centennial Hills Hospital &amp; retail corridor</td><td className="px-4 py-3">~10 min</td></tr>
                    <tr><td className="px-4 py-3">Downtown Summerlin</td><td className="px-4 py-3">~20 min</td></tr>
                    <tr className="bg-slate-50"><td className="px-4 py-3">Las Vegas Strip</td><td className="px-4 py-3">~30 min</td></tr>
                    <tr><td className="px-4 py-3">Harry Reid International Airport</td><td className="px-4 py-3">~35 min</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-slate-500 mt-2">
                Approximate off-peak drive times via US-95 and the 215 Beltway.
              </p>

              <p className="mt-8">
                The current Iron Mountain Ranch market shows roughly <strong>28 active listings</strong>{" "}
                with a median of <strong>27 days on market</strong> and a median list price of{" "}
                <strong>$535,000</strong>. Most resale activity falls between $550,000 and $725,000
                for 2,200–3,400 square foot homes, with select estates exceeding $1 million.
                Because inventory is thin and villages price differently, both buyers and sellers
                gain a measurable edge from village-level comparable data — exactly what Dr. Jan
                Duffy provides on every Iron Mountain Ranch transaction.
              </p>
            </div>
          </section>

          {/* Expert Quote */}
          <section className="mb-16 max-w-4xl mx-auto">
            <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-8">
              <blockquote className="text-lg text-slate-700 italic mb-4">
                &quot;Iron Mountain Ranch is the best-kept secret in northwest Las Vegas. Nine
                villages, gated streets, big lots, and LMA dues under $200 a month — you get more
                square footage per dollar here than almost anywhere in the valley. With only about
                28 homes on the market at a time, you need an agent watching it daily.&quot;
              </blockquote>
              <cite className="text-slate-900 font-semibold">
                — Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties
              </cite>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Iron Mountain Ranch FAQ
            </h2>
            <div className="space-y-6">
              {faqSchema.mainEntity.map((faq) => (
                <div key={faq.name} className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="font-bold text-slate-900 mb-2">{faq.name}</h3>
                  <p className="text-slate-600">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Nearby areas */}
          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Comparing Nearby Northwest Las Vegas Communities
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/neighborhoods/centennial-hills" className="bg-white border border-slate-200 rounded-lg p-5 hover:shadow-lg hover:border-blue-300 transition-all">
                <h3 className="font-bold text-slate-900 mb-1">Centennial Hills</h3>
                <p className="text-slate-600 text-sm">The surrounding northwest district — retail, hospital, and established neighborhoods.</p>
              </Link>
              <Link href="/neighborhoods/skye-canyon" className="bg-white border border-slate-200 rounded-lg p-5 hover:shadow-lg hover:border-blue-300 transition-all">
                <h3 className="font-bold text-slate-900 mb-1">Skye Canyon</h3>
                <p className="text-slate-600 text-sm">Newer construction and resort amenities, ~10 minutes west of Iron Mountain Ranch.</p>
              </Link>
              <Link href="/neighborhoods/north-las-vegas" className="bg-white border border-slate-200 rounded-lg p-5 hover:shadow-lg hover:border-blue-300 transition-all">
                <h3 className="font-bold text-slate-900 mb-1">North Las Vegas</h3>
                <p className="text-slate-600 text-sm">Aliante and Craig Ranch — lower entry prices east of Iron Mountain Ranch.</p>
              </Link>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-blue-600 text-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Buy or Sell in Iron Mountain Ranch
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Live comps, off-market alerts, and village-by-village expertise from Dr. Jan Duffy —
              your Iron Mountain Ranch REALTOR® at Berkshire Hathaway HomeServices Nevada
              Properties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+17025001942"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-50 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call (702) 500-1942
              </a>
              <Link
                href="/home-valuation"
                className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-md font-bold text-lg transition-colors"
              >
                <HomeIcon className="h-5 w-5 mr-2" />
                Free Home Valuation
              </Link>
            </div>
            <p className="mt-4 text-blue-200 text-sm">
              Berkshire Hathaway HomeServices Nevada Properties | License S.0197614.LLC
            </p>
          </section>
        </div>
        <div className="text-center text-sm text-slate-500 mt-8">Last Updated: August 2026</div>
      </main>
      <RealScoutListings />
      <Footer />
    </>
  );
}
