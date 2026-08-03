import Image from "next/image";
import { getPageHeroImage } from "@/lib/page-images";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import HeroBrandPortrait from "@/components/sections/HeroBrandPortrait";
import { siteConfig } from "@/lib/site-config";

type PageHeroImageProps = {
  /** App route path, e.g. /buyers or /neighborhoods/summerlin */
  pathname: string;
  /** Optional override alt */
  alt?: string;
  className?: string;
  priority?: boolean;
  /** RealScout carousel directly under the hero (default: true) */
  showListings?: boolean;
  /** Show Dr. Jan portrait brand strip under the hero photo (default: true) */
  showAgentPortrait?: boolean;
};

/**
 * Content-matched hero photo band + agent brand portrait + RealScout MLS carousel.
 */
export default function PageHeroImage({
  pathname,
  alt,
  className = "",
  priority = true,
  showListings = true,
  showAgentPortrait = true,
}: PageHeroImageProps) {
  const image = getPageHeroImage(pathname);

  return (
    <>
      <div className={`relative w-full overflow-hidden mb-0 ${className}`}>
        <div className="relative aspect-[21/9] min-h-[200px] max-h-[420px] w-full">
          <Image
            src={image.src}
            alt={alt ?? image.alt}
            fill
            priority={priority}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
      {showAgentPortrait ? (
        <div className="bg-slate-50 border-b border-slate-200 py-6 md:py-8">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center sm:text-left">
            <HeroBrandPortrait size="md" showByline={false} priority={false} />
            <div>
              <p className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                {siteConfig.name}
              </p>
              <p className="text-base md:text-lg text-slate-600 font-medium">
                {siteConfig.byline}
              </p>
            </div>
          </div>
        </div>
      ) : null}
      {showListings ? <RealScoutListings compact /> : null}
    </>
  );
}
