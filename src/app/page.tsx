"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import HeroCanvas from "@/components/canvas/HeroCanvas";

import HorizontalGallery from "@/components/ui/HorizontalGallery";
import HorizontalTextScroll from "@/components/ui/HorizontalTextScroll";
import BrandMarquee from "@/components/ui/BrandMarquee";
import WhyWeDoCard from "@/components/ui/WhyWeDoCard";
import Footer from "@/components/ui/Footer";
import HoverButton from "@/components/ui/HoverButton";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate storytelling sections
    const sections = gsap.utils.toArray<HTMLElement>(".story-section");
    
    sections.forEach((section) => {
      const texts = section.querySelectorAll(".reveal-text");
      
      gsap.fromTo(texts, 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main className="bg-black text-white z-10">
      
      {/* The scrolling container for the Hero 3D Model animation */}
      <div id="main-container" ref={containerRef} className="relative w-full z-0 pb-[30vh]">
        <HeroCanvas />
      
      {/* SECTION 01: Hero Reveal */}
      <section className="story-section h-screen flex flex-col items-center justify-center relative z-10 px-8 pt-20">
        <h1 
          className="reveal-text text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-center mb-6 leading-tight text-white"
          style={{ textShadow: "0px 8px 32px rgba(0,0,0,0.8), 0px 2px 8px rgba(0,0,0,0.5)" }}
        >
          Designed to Perform.<br/>Built to Stand Out.
        </h1>
        <p 
          className="reveal-text text-xl md:text-2xl text-[var(--foreground)] max-w-2xl text-center mb-12 font-medium"
          style={{ textShadow: "0px 4px 16px rgba(0,0,0,0.9), 0px 1px 4px rgba(0,0,0,0.6)" }}
        >
          A premium football jersey engineered for athletes who demand performance without sacrificing style.
        </p>
        <div className="reveal-text flex flex-col sm:flex-row items-center gap-6 drop-shadow-2xl">
          <HoverButton variant="primary" className="px-8 py-4">
            Explore the Jersey
          </HoverButton>
          <HoverButton variant="secondary" className="px-8 py-4">
            View Specifications
          </HoverButton>
        </div>
      </section>

      {/* SECTION 02: Premium Materials */}
      <section id="features" className="story-section h-screen flex items-center justify-start relative z-10 px-8 md:px-24">
        <div className="max-w-xl p-10 md:p-12 bg-black/5 backdrop-blur-xl border border-white/5 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
          <h2 className="reveal-text text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-white">
            Crafted for <span className="text-[var(--accent)] drop-shadow-[0_0_15px_rgba(0,80,255,0.5)]">Champions.</span>
          </h2>
          <ul className="reveal-text space-y-6 text-xl md:text-2xl text-[var(--foreground)] font-medium">
            <li>Breathable mesh</li>
            <li>Lightweight construction</li>
            <li>Premium stitching</li>
            <li>Moisture-wicking technology</li>
          </ul>
        </div>
      </section>

      {/* SECTION 03: Design Details */}
      <section id="technology" className="story-section h-screen flex items-center justify-end relative z-10 px-8 md:px-24">
        <div className="max-w-xl text-right">
          <h2 className="reveal-text text-5xl md:text-7xl font-bold tracking-tighter mb-8">
            Every Detail Matters.
          </h2>
          <p className="reveal-text text-xl md:text-2xl text-[var(--foreground-muted)]">
            From the precision-engineered collar to the aerodynamic side panels, 
            every stitch serves a purpose.
          </p>
        </div>
      </section>

      {/* SECTION 04: Performance */}
      <section id="gallery" className="story-section h-screen flex items-center justify-center relative z-10 px-8 text-center">
        <div className="max-w-4xl">
          <h2 className="reveal-text text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-tight">
            Designed for Performance.<br/>Built for Victory.
          </h2>
        </div>
      </section>

      {/* SECTION 05: Back View */}
      <section id="specifications" className="story-section h-screen flex items-center justify-start relative z-10 px-8 md:px-24">
        <div className="max-w-xl">
          <h2 className="reveal-text text-5xl md:text-7xl font-bold tracking-tighter mb-8">
            Engineered from Every Angle.
          </h2>
          <p className="reveal-text text-xl md:text-2xl text-[var(--foreground-muted)] mb-8">
            Name, number, and back panel construction optimized for absolute airflow.
          </p>
        </div>
      </section>

      {/* FINAL SECTION */}
      <section className="story-section h-screen flex flex-col items-center justify-center relative z-10 px-8 text-center">
        <h2 
          className="reveal-text text-6xl md:text-9xl font-black tracking-tighter mb-4 text-white"
          style={{ textShadow: "0px 6px 24px rgba(0,0,0,0.7), 0px 2px 6px rgba(0,0,0,0.4)" }}
        >
          Own the <span className="text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">Game.</span>
        </h2>
        <p 
          className="reveal-text text-xl md:text-3xl text-[var(--foreground)] mb-12 font-medium"
          style={{ textShadow: "0px 4px 16px rgba(0,0,0,0.8), 0px 1px 4px rgba(0,0,0,0.6)" }}
        >
          Premium Quality. Professional Finish.<br/>Designed for Every Athlete.
        </p>
        <div className="reveal-text flex flex-col sm:flex-row items-center gap-6 drop-shadow-xl">
          <HoverButton variant="accent" className="px-12 py-5 text-xl">
            Buy Now
          </HoverButton>
          <HoverButton variant="secondary" className="px-12 py-5 text-xl">
            View Collection
          </HoverButton>
        </div>
      </section>
      </div>

      {/* The rest of the page starts here, with the player scrolling up and out of view */}
      <div className="relative z-20 bg-black">
        <HorizontalGallery />
        <HorizontalTextScroll />
        <BrandMarquee />
        <WhyWeDoCard />
        <Footer />
      </div>
    </main>
  );
}
