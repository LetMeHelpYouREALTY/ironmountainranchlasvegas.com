import Navbar from "@/components/layouts/Navbar";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ReviewsSection from "@/components/sections/ReviewsSection";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import { Phone, Home as HomeIcon, TrendingUp, Shield, Users } from "lucide-react";
import { getPageDomainConfig } from "@/lib/get-domain-config";
import { getFaqsForDomain } from "@/lib/faq-config";
import { agentInfo, agentStats, marketStats, officeInfo, siteConfig } from "@/lib/site-config";
import { generateFAQSchema } from "@/lib/schema";
import ImrHyperlocalBand from "@/components/sections/ImrHyperlocalBand";

// Maps pageType → human-readable FAQ section title/subtitle
const FAQ_SECTION_COPY: Record<
  string,
  { title: string; subtitle: string }
> = {
  community: {
    title: "Community Real Estate FAQ",
    subtitle: "Common questions from buyers and sellers in this neighborhood",
  },
  luxury: {
    title: "Luxury Las Vegas Real Estate FAQ",
    subtitle: "What high-end buyers and sellers ask Dr. Jan most",
  },
  "55plus": {
    title: "55+ Community FAQ",
    subtitle: "Everything active-adult buyers need to know before moving",
  },
  search: {
    title: "Las Vegas Home Search FAQ",
    subtitle: "Straight answers from a Las Vegas market expert since 2008",
  },
  lifestyle: {
    title: "Moving to Las Vegas FAQ",
    subtitle: "What relocating buyers ask Dr. Jan most often",
  },
  investment: {
    title: "Las Vegas Investment Property FAQ",
    subtitle: "Numbers, strategy, and market insight for investors",
  },
};

export default async function Home() {
  const config = await getPageDomainConfig();

  const faqs = getFaqsForDomain(config.pageType, config.domain);
  const faqCopy = FAQ_SECTION_COPY[config.pageType] ?? FAQ_SECTION_COPY["search"];

  const faqTitle =
    config.pageType === "community" || config.pageType === "55plus"
      ? `${config.neighborhood} FAQ`
      : faqCopy.title;

  const siteUrl =
    config.domain !== "default"
      ? `https://www.${config.domain}`
      : siteConfig.url;

  const isIMR = config.neighborhood === "Iron Mountain Ranch";
  const imr = marketStats.ironMountainRanch;
  const lv = marketStats.lasVegas;

  const marketStatCards = isIMR
    ? [
        { value: imr.medianPriceFormatted, label: "Median List Price", sub: marketStats.lastUpdated },
        { value: String(imr.daysOnMarket), label: "Avg Days on Market", sub: "" },
        { value: `~${imr.activeListings}`, label: "Active Listings", sub: "Community-wide" },
        { value: imr.pricePerSqFtFormatted, label: "Price per Sq Ft", sub: "" },
      ]
    : [
        { value: lv.medianPriceFormatted, label: "Median Price", sub: lv.yearOverYearChange },
        { value: String(lv.daysOnMarket), label: "Avg Days on Market", sub: "" },
        { value: lv.activeListings.toLocaleString(), label: "Active Listings", sub: "" },
        { value: String(lv.inventoryMonths), label: "Months Inventory", sub: "" },
      ];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${siteUrl}#local-agent`,
    name: `Dr. Jan Duffy - ${config.neighborhood} Real Estate`,
    url: siteUrl,
    telephone: agentInfo.phoneTel.replace("tel:", ""),
    email: agentInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: officeInfo.address.street,
      addressLocality: officeInfo.address.city,
      addressRegion: officeInfo.address.state,
      postalCode: officeInfo.address.zip,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "Place",
      name: `${config.neighborhood}, Las Vegas, NV`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(agentStats.averageRating),
      reviewCount: String(agentStats.reviewCount),
    },
  };

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main>
        {/* Domain-Aware Hero */}
        <section className="relative bg-slate-900 text-white py-24 md:py-32 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: "url('/Image/hero_bg_1.jpg')" }}
          />
          <div className="relative z-10 container mx-auto px-4 text-center">
            {config.ctaBadge && (
              <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-6">
                {config.ctaBadge}
              </span>
            )}
            <h1 id="tldr" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {config.heroHeadline}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto">
              {config.heroSubheadline}
            </p>

            {/* RealScout Search Widget */}
            <div className="mb-8 flex justify-center">
              <div
                dangerouslySetInnerHTML={{
                  __html: `<realscout-simple-search agent-encoded-id="${config.realscoutAgentId}"></realscout-simple-search>`,
                }}
              />
            </div>

            {/* Trust Indicators — aligned with agentStats for E-E-A-T */}
            <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">{agentStats.transactionsClosed}+</span>
                <span>Families Helped</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">Since {agentStats.servingSince}</span>
                <span>Las Vegas Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">{agentStats.averageRating}★</span>
                <span>Client Rating</span>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Why Work With Dr. Jan Duffy?
              </h2>
              <p className="text-lg text-slate-600">
                Berkshire Hathaway HomeServices Nevada Properties — the most trusted name in Las Vegas real estate.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                { icon: Shield, title: "Trusted Brand", desc: "Backed by Warren Buffett's Berkshire Hathaway — unmatched integrity" },
                { icon: Users, title: "50K+ Network", desc: "Global referral network for seamless moves to or from any market" },
                { icon: TrendingUp, title: "$127M+ Sold", desc: "Proven results across every Las Vegas neighborhood since 2008" },
                { icon: HomeIcon, title: "Full Service", desc: "Buying, selling, 55+, luxury, investment — one expert handles it all" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="text-center p-6">
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{title}</h3>
                  <p className="text-slate-600 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Market Stats — IMR-accurate when primary area is Iron Mountain Ranch */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">
                {config.neighborhood} Real Estate Market
              </h2>
              <p className="text-slate-400">
                {isIMR
                  ? `MLS and public market data — ${marketStats.lastUpdated}`
                  : "Current data — updated regularly"}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {marketStatCards.map(({ value, label, sub }) => (
                <div key={label} className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-1">{value}</div>
                  <div className="text-slate-300 text-sm">{label}</div>
                  {sub && <div className="text-green-400 text-xs mt-1">{sub}</div>}
                </div>
              ))}
            </div>
            {isIMR && (
              <p className="text-center text-slate-500 text-xs mt-8 max-w-2xl mx-auto">
                Source: MLS and public market data for Iron Mountain Ranch (89131 &amp; 89143),
                verified {marketStats.lastUpdated}. Values vary by village —{" "}
                <Link href="/neighborhoods/iron-mountain-ranch" className="text-blue-400 hover:underline">
                  full community guide
                </Link>
                .
              </p>
            )}
            <div className="text-center mt-8">
              <Link href="/market-report" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition-colors">
                Full Market Report
              </Link>
            </div>
          </div>
        </section>

        <RealScoutListings />
        <WhyChooseUs />
        <ReviewsSection />

        <div id="faq">
          <FAQSection
            faqs={faqs}
            title={faqTitle}
            subtitle={faqCopy.subtitle}
          />
        </div>

        {/* Domain-Specific CTA — NAP phone from site-config */}
        <section className="py-16 md:py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {config.ctaHeadline}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {config.ctaSubheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={agentInfo.phoneTel}
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-50 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call {agentInfo.phone}
              </a>
              <Link
                href="/contact"
                className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-md font-bold text-lg transition-colors"
              >
                Send a Message
              </Link>
            </div>
            <p className="mt-6 text-blue-200 text-sm">
              Dr. Jan Duffy | License {agentInfo.license} | Berkshire Hathaway HomeServices Nevada Properties
            </p>
            <p className="mt-2 text-blue-200/80 text-xs">
              {officeInfo.address.full} · {agentInfo.phone}
            </p>
          </div>
        </section>
      </main>
      <ImrHyperlocalBand topic="general" />
      <Footer />
    </>
  );
}
