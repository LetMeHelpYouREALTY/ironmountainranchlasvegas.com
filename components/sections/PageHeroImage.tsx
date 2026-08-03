import Image from "next/image";
import { getPageHeroImage } from "@/lib/page-images";
import RealScoutListings from "@/components/realscout/RealScoutListings";

type PageHeroImageProps = {
  /** App route path, e.g. /buyers or /neighborhoods/summerlin */
  pathname: string;
  /** Optional override alt */
  alt?: string;
  className?: string;
  priority?: boolean;
  /** RealScout carousel directly under the hero (default: true) */
  showListings?: boolean;
};

/**
 * Content-matched hero photo band + RealScout MLS carousel.
 */
export default function PageHeroImage({
  pathname,
  alt,
  className = "",
  priority = true,
  showListings = true,
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
      {showListings ? <RealScoutListings compact /> : null}
    </>
  );
}
