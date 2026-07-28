import React from "react";
import { Truck, HeadphonesIcon, ShieldCheck, Star, BadgeCheck, Quote } from "lucide-react";
import HoverButton from "@/components/ui/HoverButton";

export default function WhyWeDoCard() {
  return (
    <section className="w-full bg-white pt-24 md:pt-32 px-4 md:px-8 lg:px-12 flex flex-col items-center rounded-[3rem] md:rounded-[4rem] relative z-30 mt-[-2rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] pb-12 md:pb-20">
      
      {/* 1. The Image & Text Card */}
      <div className="w-full max-w-[1500px] bg-white rounded-[2rem] md:rounded-[3rem] shadow-[0_15px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col lg:flex-row border border-black/5 mb-24 md:mb-32">
        {/* Left Side: Image */}
        <div className="w-full lg:w-[45%] h-[400px] lg:h-auto lg:min-h-[650px] relative">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop" 
            alt="Store Interior" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Content */}
        <div className="w-full lg:w-[55%] p-10 md:p-16 lg:p-24 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl lg:text-[64px] font-medium tracking-tight mb-8 leading-[1.15] font-sans">
            <span className="text-[#FF8A00]">WHY WE DO,</span><br />
            <span className="text-[#1A1A1A]">WHAT WE DO</span>
          </h2>
          
          <p className="text-gray-500 text-sm md:text-[15px] leading-[1.8] mb-12 font-medium max-w-lg">
            Apollo Sports is a premium athletic brand known for{' '}
            <span className="text-[#FF8A00]">high-performance, moisture-wicking</span> sportswear with unparalleled expertise in the art and science of athletic apparel. Apollo jerseys, engineered with{' '}
            <span className="text-[#FF8A00]">advanced breathable fabrics</span> keep you cool in the most intense conditions. Our experts guide athletes to not just select the right fit, but also provide them with the unique experience of custom styling to create a{' '}
            <span className="text-[#FF8A00]">fully personalised athletic identity.</span>
          </p>
          
          <div>
            <HoverButton variant="dark" className="px-8 py-3.5 text-xs tracking-widest flex items-center gap-3">
              ABOUT US 
              <span className="text-lg group-hover:translate-x-1 transition-transform z-10 relative">→</span>
            </HoverButton>
          </div>
        </div>
      </div>

      {/* 2. Testimonial Section */}
      <div className="w-full max-w-[900px] flex flex-col items-center mb-24">
        <h3 className="text-2xl md:text-[28px] font-serif text-black uppercase tracking-widest mb-4">
          CUSTOMERS ARE SAYING
        </h3>
        <div className="flex items-center gap-2 mb-10">
          <div className="flex gap-1 text-[#FF8A00]">
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
          </div>
          <span className="text-sm font-semibold text-gray-700 ml-1">4.93 (191)</span>
          <div className="flex items-center gap-1.5 ml-2">
            <BadgeCheck className="w-[18px] h-[18px] fill-[#00A98F] text-white" />
            <span className="text-sm font-medium text-gray-600">Verified</span>
          </div>
        </div>

        <div className="w-full bg-[#FAFAFA] rounded-2xl p-10 md:p-14 flex flex-col items-center text-center relative shadow-sm border border-black/[0.03]">
          <Quote className="w-10 h-10 text-[#FF8A00] mb-6 opacity-80" fill="currentColor" stroke="none" />
          <p className="text-base md:text-[17px] text-gray-800 leading-relaxed font-medium mb-8 max-w-2xl">
            This was my first purchase after reading the ad on Google. Amazing jersey. Just what I was looking for...
          </p>
          <div className="flex gap-1 text-[#FF8A00] mb-4">
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-bold text-black uppercase tracking-wider">Gisela carvalho</span>
            <BadgeCheck className="w-4 h-4 fill-black text-white" />
          </div>
        </div>
      </div>

      {/* 3. Features Section */}
      <div className="w-full max-w-[1500px] border-t border-gray-200 pt-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
        
        {/* Feature 1 */}
        <div className="flex gap-5 md:pr-12 lg:pr-20">
          <div className="mt-1 flex-shrink-0">
            <Truck className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <div className="relative inline-block mb-3 w-fit">
              <h4 className="text-[15px] font-bold tracking-widest uppercase text-black relative z-10">FREE SHIPPING</h4>
              {/* Hand-drawn style underline */}
              <div className="absolute bottom-[2px] left-[-5%] w-[110%] h-[6px] bg-[#FF8A00]/20 rounded-full -rotate-1"></div>
            </div>
            <p className="text-sm text-gray-500 font-medium leading-[1.7]">
              Free shipping on orders above ₹599 across India
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex gap-5 md:border-l md:border-gray-200 md:px-12 lg:px-20">
          <div className="mt-1 flex-shrink-0">
            <HeadphonesIcon className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <div className="relative inline-block mb-3 w-fit">
              <h4 className="text-[15px] font-bold tracking-widest uppercase text-black relative z-10">EASY RETURNS</h4>
              {/* Hand-drawn style underline */}
              <div className="absolute bottom-[2px] left-[-5%] w-[110%] h-[6px] bg-[#FF8A00]/20 rounded-full rotate-1"></div>
            </div>
            <p className="text-sm text-gray-500 font-medium leading-[1.7]">
              Simple return process with the jerseys
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex gap-5 md:border-l md:border-gray-200 md:pl-12 lg:pl-20">
          <div className="mt-1 flex-shrink-0">
            <ShieldCheck className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <div className="relative inline-block mb-3 w-fit">
              <h4 className="text-[15px] font-bold tracking-widest uppercase text-black relative z-10">SECURE PAYMENT</h4>
              {/* Hand-drawn style underline */}
              <div className="absolute bottom-[2px] left-[-5%] w-[110%] h-[6px] bg-[#FF8A00]/20 rounded-full -rotate-1"></div>
            </div>
            <p className="text-sm text-gray-500 font-medium leading-[1.7]">
              Your payment information is processed through secure payment gateway
            </p>
          </div>
        </div>

      </div>

    </section>
  );
}
