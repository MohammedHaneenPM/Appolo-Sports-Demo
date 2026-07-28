import React from "react";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white pt-24 pb-12 px-4 md:px-8 relative z-30 overflow-hidden">
      
      {/* Top Border */}
      <div className="w-full max-w-[1400px] mx-auto border-t border-white/10 mb-20" />

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24 relative z-10">
        
        {/* Brand Info */}
        <div className="flex flex-col">
          <h3 className="text-3xl font-black tracking-tighter mb-6 text-white">APOLLO</h3>
          <p className="text-[var(--foreground-muted)] text-sm md:text-base max-w-sm mb-8 leading-relaxed">
            Engineered for champions. Apollo Sports crafts premium athletic wear that bridges the gap between peak performance and modern aesthetics.
          </p>
          <div className="flex items-center gap-4">
            <MagneticButton strength={15}>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300 font-bold text-xs">
                IG
              </a>
            </MagneticButton>
            <MagneticButton strength={15}>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300 font-bold text-xs">
                TW
              </a>
            </MagneticButton>
            <MagneticButton strength={15}>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300 font-bold text-xs">
                FB
              </a>
            </MagneticButton>
            <MagneticButton strength={15}>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300 font-bold text-xs">
                YT
              </a>
            </MagneticButton>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col lg:pl-12">
          <h4 className="text-lg font-bold mb-6">Shop</h4>
          <ul className="space-y-4">
            <li><a href="#" className="text-[var(--foreground-muted)] hover:text-white transition-colors duration-300 text-sm">New Arrivals</a></li>
            <li><a href="#" className="text-[var(--foreground-muted)] hover:text-white transition-colors duration-300 text-sm">Jerseys</a></li>
            <li><a href="#" className="text-[var(--foreground-muted)] hover:text-white transition-colors duration-300 text-sm">Training Gear</a></li>
            <li><a href="#" className="text-[var(--foreground-muted)] hover:text-white transition-colors duration-300 text-sm">Accessories</a></li>
            <li><a href="#" className="text-[var(--foreground-muted)] hover:text-white transition-colors duration-300 text-sm">Sale</a></li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h4 className="text-lg font-bold mb-6">Support</h4>
          <ul className="space-y-4">
            <li><a href="#" className="text-[var(--foreground-muted)] hover:text-white transition-colors duration-300 text-sm">FAQ</a></li>
            <li><a href="#" className="text-[var(--foreground-muted)] hover:text-white transition-colors duration-300 text-sm">Shipping & Returns</a></li>
            <li><a href="#" className="text-[var(--foreground-muted)] hover:text-white transition-colors duration-300 text-sm">Size Guide</a></li>
            <li><a href="#" className="text-[var(--foreground-muted)] hover:text-white transition-colors duration-300 text-sm">Track Order</a></li>
            <li><a href="#" className="text-[var(--foreground-muted)] hover:text-white transition-colors duration-300 text-sm">Contact Us</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col">
          <h4 className="text-lg font-bold mb-6">Stay in the loop</h4>
          <p className="text-[var(--foreground-muted)] text-sm mb-6 leading-relaxed">
            Sign up for exclusive offers, original stories, events and more.
          </p>
          <div className="relative w-full">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-14 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors duration-300"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-[var(--accent)] hover:text-white transition-colors duration-300">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>

      {/* Massive Brand Text */}
      <div className="w-full flex justify-center items-center overflow-hidden relative z-0 opacity-5 pointer-events-none select-none mb-12">
        <h1 className="text-[20vw] font-black tracking-tighter leading-none whitespace-nowrap">
          APOLLO
        </h1>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
        <p className="text-[var(--foreground-muted)] text-sm mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Apollo Sports. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-[var(--foreground-muted)] hover:text-white transition-colors duration-300 text-sm">Privacy Policy</a>
          <a href="#" className="text-[var(--foreground-muted)] hover:text-white transition-colors duration-300 text-sm">Terms of Service</a>
        </div>
      </div>

    </footer>
  );
}
