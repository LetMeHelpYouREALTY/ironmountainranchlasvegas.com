"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  
  const images = [
    {
      src: "/images/hero/iron-mountain-ranch.jpg",
      alt: "Iron Mountain Ranch neighborhood street with Mediterranean homes in northwest Las Vegas",
    },
    {
      src: "/images/neighborhoods/iron-mountain-ranch-pool.jpg",
      alt: "Iron Mountain Ranch backyard pool with desert mountain views",
    },
    {
      src: "/images/neighborhoods/luxury-estate.jpg",
      alt: "Luxury Las Vegas estate home with desert landscaping",
    },
  ];

  useEffect(() => {
    // Don't animate if user prefers reduced motion
    if (prefersReducedMotion) return;
    
    const intervalId = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(intervalId);
    // images is a stable constant in this component
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 ${
              prefersReducedMotion 
                ? '' 
                : 'transition-opacity duration-1000'
            } ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Find Your Home in
          <br />
          <span className="text-blue-400">Iron Mountain Ranch, Las Vegas</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
          Hyperlocal REALTOR® services for Iron Mountain Ranch and northwest Las Vegas — buying,
          selling, and investing with village-by-village expertise.
        </p>

        {/* RealScout Search Widget */}
        <div className="realscout-wrapper mb-4">
          <div
            dangerouslySetInnerHTML={{
              __html: `<realscout-simple-search agent-encoded-id="QWdlbnQtMjI1MDUw"></realscout-simple-search>`,
            }}
          />
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/90 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold">500+</span>
            <span>Properties Sold</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Since 2008</span>
            <span>Serving Las Vegas</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">4.9★</span>
            <span>Average Rating</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 ${
          prefersReducedMotion ? '' : 'animate-bounce'
        }`}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </div>
  );
}
