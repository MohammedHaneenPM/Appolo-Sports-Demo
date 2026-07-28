"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import HoverButton from "@/components/ui/HoverButton";

const NAV_ITEMS = ["Home", "Features", "Technology", "Gallery", "Specifications"];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-6 transition-colors duration-500",
          isScrolled ? "bg-black/60 backdrop-blur-md border-b border-white/5" : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Left Side: Hamburger Menu */}
        <div className="flex-1 flex justify-start">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center justify-center p-2 text-white hover:text-[var(--accent)] transition-colors duration-300"
          >
            <Menu size={28} strokeWidth={2.5} />
          </button>
        </div>
        
        {/* Center: Brand Logo */}
        <div 
          className="flex-1 flex justify-center text-3xl font-black tracking-widest text-white uppercase select-none"
          style={{ fontFamily: "'The Black Marrow', serif" }}
        >
          Apollo
        </div>

        {/* Right Side: Order Button */}
        <div className="flex-1 flex justify-end">
          <HoverButton variant="primary" className="px-5 py-2.5 text-sm">
            Order Now
          </HoverButton>
        </div>
      </motion.header>

      {/* Card Popup Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
            />
            
            {/* Menu Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-6 left-6 md:left-8 z-[100] w-[320px] bg-[#0A0A0A] rounded-[24px] shadow-2xl border border-white/5 overflow-hidden font-sans"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                {/* Logo Text */}
                <div 
                  className="text-xl font-black tracking-widest text-white uppercase select-none"
                  style={{ fontFamily: "'The Black Marrow', serif" }}
                >
                  Apollo
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white/50 hover:text-white transition-colors p-1"
                >
                  <X size={20} strokeWidth={2} />
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col px-2 py-4">
                {NAV_ITEMS.map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                    className="flex items-center justify-between px-6 py-4 hover:bg-white/5 rounded-xl transition-colors group"
                  >
                    <span className="text-xl font-bold text-white tracking-wide group-hover:text-[#00E5FF] transition-colors">
                      {item}
                    </span>
                    <span className="text-xs font-mono text-white/30 tracking-widest">
                      0{index + 1}
                    </span>
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
