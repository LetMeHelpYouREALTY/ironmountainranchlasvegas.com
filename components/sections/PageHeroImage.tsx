import Image from "next/image";
import { getPageHeroImage } from "@/lib/page-images";

type PageHeroImageProps = {
  /** App route path, e.g. /buyers or /neighborhoods/summerlin */
  pathname: string;
  /** Optional override alt */
  alt?: string;
  className?: string;
  priority?: boolean;
};

/**
 * Full-bleed content-matched photo band for interior pages.
 * Maps route → Iron Mountain Ranch / Las Vegas photography.
 */
export default function PageHeroImage({
  pathname,
  alt,
  className = "",
  priority = true,
}: PageHeroImageProps) {
  const image = getPageHeroImage(pathname);

  return (
    <div className={`relative w-full overflow-hidden mb-12 ${className}`}>
      <div className="relative aspect-[21/9] min-h-[200px] max-h-[420px] w-full">
        <Image
          src={image.src}
          alt={alt ?? image.alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover object-center brightness-110 contrast-105"
        />
      </div>
    </div>
  );
}
