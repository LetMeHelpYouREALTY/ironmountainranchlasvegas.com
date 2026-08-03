import Link from "next/link";
import { Phone, MapPin, ArrowRight } from "lucide-react";
import SchemaScript from "@/components/SchemaScript";
import {
  IMR_FACTS,
  IMR_HUB_PATH,
  IMR_NAP,
  IMR_TLDR,
  getImrFaqSchema,
  getImrTopicFaqs,
  type ImrGeoTopic,
} from "@/lib/imr-geo";

type ImrHyperlocalBandProps = {
  /** Topic selects answer-ready FAQs for AEO/GEO */
  topic?: ImrGeoTopic;
  /** Optional eyebrow above the band */
  eyebrow?: string;
  /** Hide FAQ list (still useful for NAP + hub link) */
  showFaq?: boolean;
};

/**
 * Sitewide Iron Mountain Ranch GEO/AEO band:
 * Speakable TLDR, hub CTA, NAP, and FAQPage schema — drop before Footer on every page.
 */
export default function ImrHyperlocalBand({
  topic = "general",
  eyebrow = "Iron Mountain Ranch hyperlocal focus",
  showFaq = true,
}: ImrHyperlocalBandProps) {
  const faqs = getImrTopicFaqs(topic);
  const faqSchema = getImrFaqSchema(topic);

  return (
    <section
      className="border-t border-slate-200 bg-slate-50 py-14 md:py-16"
      aria-labelledby="imr-geo-heading"
    >
      <SchemaScript schema={faqSchema} id={`imr-faq-${topic}`} />
      <div className="container mx-auto px-4 max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-3">
          {eyebrow}
        </p>
        <h2 id="imr-geo-heading" className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          Your Iron Mountain Ranch REALTOR® in northwest Las Vegas
        </h2>
        <p id="imr-tldr" className="text-slate-700 text-lg leading-relaxed mb-6">
          {IMR_TLDR}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <Link
            href={IMR_HUB_PATH}
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition-colors"
          >
            Iron Mountain Ranch homes &amp; services
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
          <a
            href={IMR_NAP.phoneTel}
            className="inline-flex items-center justify-center border border-slate-300 bg-white hover:bg-slate-100 text-slate-900 px-6 py-3 rounded-md font-semibold transition-colors"
          >
            <Phone className="h-4 w-4 mr-2" />
            Call {IMR_NAP.phoneDisplay}
          </a>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 text-sm text-slate-600 mb-10">
          <p>
            <span className="font-semibold text-slate-900">Market ({IMR_FACTS.lastUpdated}):</span>{" "}
            {IMR_FACTS.medianPrice} median · ~{IMR_FACTS.activeListings} listings ·{" "}
            {IMR_FACTS.daysOnMarket} DOM
          </p>
          <p>
            <span className="font-semibold text-slate-900">Community:</span> {IMR_FACTS.villages}{" "}
            villages · ZIP {IMR_FACTS.zipCodes} · LMA ~{IMR_FACTS.lmaDues}
          </p>
          <p className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-blue-600" aria-hidden />
            <span>
              {IMR_NAP.addressFull}
              <br />
              License {IMR_NAP.license}
            </span>
          </p>
        </div>

        {showFaq && (
          <div id="imr-faq">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Iron Mountain Ranch questions buyers ask
            </h3>
            <dl className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="bg-white border border-slate-200 rounded-lg p-5">
                  <dt className="font-semibold text-slate-900 mb-1">{faq.question}</dt>
                  <dd className="text-slate-600 text-sm leading-relaxed">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </section>
  );
}
