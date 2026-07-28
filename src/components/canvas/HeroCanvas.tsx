"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameCount = 240;
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const currentFrame = (index: number) => 
      `/frames/ezgif-frame-${index.toString().padStart(3, '0')}.webp`;

    const images: HTMLImageElement[] = [];

    // Preload images
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    const render = (progress: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(progress * frameCount)
      );
      
      const img = images[frameIndex];
      
      if (img && img.complete && img.naturalWidth > 0) {
        // Calculate dimensions to maintain aspect ratio and cover the screen
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let renderWidth = canvas.width;
        let renderHeight = canvas.height;
        let x = 0;
        let y = 0;

        if (canvasRatio > imgRatio) {
          renderWidth = canvas.width;
          renderHeight = canvas.width / imgRatio;
          y = (canvas.height - renderHeight) / 2;
        } else {
          renderHeight = canvas.height;
          renderWidth = canvas.height * imgRatio;
          x = (canvas.width - renderWidth) / 2;
        }
        
        ctx.drawImage(img, x, y, renderWidth, renderHeight);
      }
    };

    // Render first frame as soon as it loads
    images[0].onload = () => {
      render(0);
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#main-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      }
    });

    tl.to({ progress: 0 }, {
      progress: 1,
      duration: 1,
      ease: "none",
      onUpdate: function() {
        render(this.targets()[0].progress);
      }
    });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(tl.progress());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div 
      className="sticky top-0 left-0 w-full h-screen z-0 pointer-events-none" 
      style={{ marginBottom: "-100vh" }}
    >
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
    </div>
  );
}
