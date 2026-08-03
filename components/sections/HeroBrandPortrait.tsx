import Image from "next/image";
import { AGENT_PORTRAIT } from "@/lib/agent-photos";
import { siteConfig } from "@/lib/site-config";

type HeroBrandPortraitProps = {
  /** Visual size of the portrait */
  size?: "sm" | "md" | "lg";
  /** Show site byline under the image */
  showByline?: boolean;
  /** Light text for dark heroes */
  onDark?: boolean;
  className?: string;
  priority?: boolean;
};

const SIZE_PX = {
  sm: 72,
  md: 112,
  lg: 144,
} as const;

/**
 * Dr. Jan Duffy branded portrait for hero sections — brand awareness without
 * floating promo stickers on the hero photo.
 */
export default function HeroBrandPortrait({
  size = "md",
  showByline = true,
  onDark = false,
  className = "",
  priority = false,
}: HeroBrandPortraitProps) {
  const px = SIZE_PX[size];

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        className="relative shrink-0 overflow-hidden rounded-full ring-2 ring-white/90 shadow-lg"
        style={{ width: px, height: px }}
      >
        <Image
          src={AGENT_PORTRAIT.src}
          alt={AGENT_PORTRAIT.alt}
          width={px}
          height={px}
          priority={priority}
          className="h-full w-full object-cover"
          sizes={`${px}px`}
        />
      </div>
      {showByline ? (
        <p
          className={`mt-3 text-sm md:text-base font-medium ${
            onDark ? "text-white/90" : "text-slate-700"
          }`}
        >
          {siteConfig.byline}
        </p>
      ) : null}
    </div>
  );
}
