"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const galleryImages = [
  { id: 1, title: "Precision Stitching", src: "/gallery/1.jpg" },
  { id: 2, title: "Breathable Mesh", src: "/gallery/2.jpg" },
  { id: 3, title: "Dynamic Fit", src: "/gallery/3.jpg" },
  { id: 4, title: "Aerodynamic Profile", src: "/gallery/4.jpg" },
];

export default function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current || !scrollWrapperRef.current) return;
    
    const container = containerRef.current;
    const scrollWrapper = scrollWrapperRef.current;
    
    const ctx = gsap.context(() => {
      // Create the horizontal scroll animation
      gsap.to(scrollWrapper, {
        x: () => -(scrollWrapper.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: "top top",
          // Calculate the exact scrolling distance based on wrapper width
          end: () => "+=" + (scrollWrapper.scrollWidth - window.innerWidth),
          invalidateOnRefresh: true, // Recalculate values on resize
        }
      });
    });
    
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full overflow-hidden flex flex-col justify-center relative z-20 bg-[var(--secondary)] rounded-t-[3rem] md:rounded-t-[4rem] py-12 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-white/5">
      
      {/* Heading on Top Center */}
      <div className="w-full text-center mb-8 px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight drop-shadow-md">
          Explore the Details.
        </h2>
      </div>

      <div ref={scrollWrapperRef} className="flex h-[55vh] items-center gap-8 md:gap-12 px-[10vw] w-max">
        {galleryImages.map((img) => (
          <div 
            key={img.id} 
            className="shrink-0 relative h-full aspect-[4/3] bg-black/10 backdrop-blur-2xl rounded-[2.5rem] flex items-end p-8 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden group cursor-pointer transition-transform duration-700 hover:scale-[1.02]"
          >
            {/* Background Image */}
            <img 
              src={img.src} 
              alt={img.title} 
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700"
              // onError ensures it falls back gracefully if the image isn't placed yet
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            
            {/* Subtle hover overlay */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Gradient shadow for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            
            {/* Content */}
            <div className="relative z-10 w-full">
              <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-xl">
                {img.title}
              </h3>
              
              {/* Animated underline / link */}
              <div className="mt-4 overflow-hidden h-6">
                <p className="text-[var(--accent)] font-medium text-lg transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  View Feature &rarr;
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Description on Bottom Center */}
      <div className="w-full text-center mt-12 px-4 flex justify-center">
        <p className="text-[var(--foreground-muted)] text-lg md:text-xl font-medium max-w-3xl leading-relaxed">
          Every thread, every seam, and every fabric choice has been meticulously engineered for peak performance and unparalleled comfort.
        </p>
      </div>
    </section>
  );
}
