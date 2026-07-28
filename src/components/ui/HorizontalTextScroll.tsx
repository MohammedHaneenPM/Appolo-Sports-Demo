"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function HorizontalTextScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLHeadingElement>(null);
  const textRef2 = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current || !textRef1.current || !textRef2.current) return;
    
    const container = containerRef.current;
    
    const ctx = gsap.context(() => {
      // First line moves left as you scroll down
      gsap.to(textRef1.current, {
        xPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

      // Second line moves right as you scroll down
      gsap.to(textRef2.current, {
        xPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });
    }, containerRef);
    
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="py-32 md:py-48 w-full overflow-hidden bg-[var(--secondary)] relative z-20 flex flex-col justify-center gap-6"
    >
      <h2 
        ref={textRef1} 
        className="text-[10vw] md:text-[7vw] font-black tracking-tighter text-transparent uppercase whitespace-nowrap leading-none pl-[10vw]"
        style={{ WebkitTextStroke: "2px rgba(255,255,255,0.15)" }}
      >
        Redefining The Standard. Redefining The Standard.
      </h2>
      <h2 
        ref={textRef2} 
        className="text-[10vw] md:text-[7vw] font-black tracking-tighter text-white uppercase whitespace-nowrap leading-none -ml-[50vw]"
      >
        Beyond Expectations. Beyond Expectations.
      </h2>
    </section>
  );
}
