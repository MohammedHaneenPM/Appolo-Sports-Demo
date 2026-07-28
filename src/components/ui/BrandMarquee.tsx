"use client";

import React from "react";

const BRANDS = [
  { name: "1", logo: "/logo/1.png" },
  { name: "2", logo: "/logo/2.png" },
  { name: "3", logo: "/logo/3.png" },
  { name: "4", logo: "/logo/4.png" },
  { name: "5", logo: "/logo/5.png" },
  { name: "6", logo: "/logo/6.png" },
  { name: "7", logo: "/logo/7.png" }
];

function BrandItem({ brand, isGray }: { brand: any; isGray?: boolean }) {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className={`flex items-center justify-center h-10 md:h-16 ${isGray ? 'opacity-30' : ''}`}>
      {!imgError ? (
        <img
          src={brand.logo}
          alt={brand.name}
          className={`h-full w-auto object-contain min-w-[80px] md:min-w-[120px] ${isGray ? 'filter grayscale' : ''}`}
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="text-2xl md:text-4xl font-serif font-bold text-black tracking-tight whitespace-nowrap">
          {brand.name}
        </span>
      )}
    </div>
  );
}

export default function BrandMarquee() {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--secondary)] py-24 md:py-32 flex flex-col items-center justify-center z-20">
      {/* Marquee Container */}
      <div className="relative w-full flex flex-col items-center justify-center h-[200px] md:h-[300px]">

        {/* Yellow Banner - Tilted slightly up */}
        <div className="marquee-wrapper absolute w-[110vw] md:w-[120vw] bg-[#FCE588] py-5 md:py-8 flex overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] z-20 transform -rotate-[3deg] -translate-y-8 md:-translate-y-12">
          <div className="animate-marquee flex whitespace-nowrap items-center">
            {/* Repeat to ensure seamless loop */}
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 md:gap-24 px-6 md:px-12">
                {BRANDS.map((brand, j) => (
                  <BrandItem key={j} brand={brand} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* White/Gray Banner - Tilted slightly down */}
        <div className="marquee-wrapper absolute w-[110vw] md:w-[120vw] bg-[#F8F8F8] py-5 md:py-8 flex overflow-hidden z-10 transform rotate-[2deg] translate-y-12 border-y border-black/5">
          <div className="animate-marquee-reverse flex whitespace-nowrap items-center">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 md:gap-24 px-6 md:px-12">
                {BRANDS.map((brand, j) => (
                  <BrandItem key={j} brand={brand} isGray={true} />
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Styles for Infinite Marquee */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
          width: max-content;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
          width: max-content;
        }
        .marquee-wrapper:hover .animate-marquee,
        .marquee-wrapper:hover .animate-marquee-reverse {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}
