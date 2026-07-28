"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CursorTrail({ text = "APOLLO" }: { text?: string }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use GSAP quickTo for highly performant, buttery-smooth trailing animation
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.8, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.8, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference hidden md:flex items-center justify-center"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      {/* 
        The text floats slightly offset from the actual cursor center.
        mix-blend-difference ensures the white text intelligently inverts 
        over both dark and light backgrounds seamlessly.
      */}
      <span 
        className="text-white text-[20px] font-bold tracking-[0.2em] uppercase whitespace-nowrap ml-12 mt-12 opacity-80"
        style={{ fontFamily: "'The Black Marrow', serif" }}
      >
        {text}
      </span>
    </div>
  );
}
