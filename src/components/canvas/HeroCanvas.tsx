"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FrameManager } from "@/lib/canvas/FrameManager";

// Persist the manager outside the component so hot-reloads 
// or re-mounts don't destroy the cache and network state.
let globalFrameManager: FrameManager | null = null;

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }); 
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- Sizing ---
    const updateSize = () => {
      // High-DPI Retina scaling (clamped to 2 to save GPU on 3x/4x screens)
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    updateSize();

    let currentRenderIndex = -1;

    /**
     * Renders a specific image onto the canvas, handling "cover" aspect ratio maths.
     */
    const drawFrame = (img: HTMLImageElement) => {
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
    };

    const renderIndex = (frameIndex: number) => {
      if (!globalFrameManager) return;
      if (frameIndex === currentRenderIndex) return; // Skip redundant renders
      
      const img = globalFrameManager.getFrame(frameIndex);
      if (img) {
        drawFrame(img);
        currentRenderIndex = frameIndex;
      }
    };

    // --- Initialization ---
    let timeline: gsap.core.Timeline | null = null;

    if (!globalFrameManager) {
      // Initialize the advanced streaming engine
      globalFrameManager = new FrameManager(
        240, // total frames
        (loadedIndex) => {
          // Fade in immediately on frame 1
          if (loadedIndex === 1) setIsLoaded(true);

          // If the user happens to be scrubbing exactly over a frame that was missing, 
          // instantly re-render it when it arrives.
          if (timeline && !prefersReducedMotion) {
            const currentTarget = Math.max(1, Math.min(240, Math.floor(timeline.progress() * 240) + 1));
            if (currentTarget === loadedIndex) {
              renderIndex(currentTarget);
            }
          }
        }
      );

      // Trigger instant FCP priority load
      globalFrameManager.loadPriorityStartup().then(() => {
        renderIndex(1);
      });
    } else {
      // If returning to page, just render instantly
      setIsLoaded(true);
      renderIndex(1);
    }

    // --- GSAP ScrollTrigger Configuration ---
    // Disable scrolling animation if reduced motion is preferred
    if (!prefersReducedMotion) {
      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#main-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            if (!globalFrameManager) return;
            const frameIndex = Math.max(1, Math.min(240, Math.floor(self.progress * 240) + 1));
            
            // Render the canvas
            renderIndex(frameIndex);

            // Tell the engine to predict the next frames and manage memory
            globalFrameManager.onScrollUpdate(frameIndex);
          }
        }
      });

      timeline.to({ progress: 0 }, {
        progress: 1,
        duration: 1,
        ease: "none"
      });
    }

    const handleResize = () => {
      updateSize();
      if (timeline && !prefersReducedMotion) {
        const frameIndex = Math.max(1, Math.min(240, Math.floor(timeline.progress() * 240) + 1));
        renderIndex(frameIndex);
      } else {
        renderIndex(1); // Re-draw static poster
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div 
      className="sticky top-0 left-0 w-full h-screen z-0 pointer-events-none bg-black" 
      style={{ marginBottom: "-100vh" }}
    >
      <canvas 
        ref={canvasRef} 
        className={`w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
      />
    </div>
  );
}
