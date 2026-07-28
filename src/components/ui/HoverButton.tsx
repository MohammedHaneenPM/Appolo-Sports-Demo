import React from "react";
import { cn } from "@/lib/utils";

interface HoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "accent";
}

export default function HoverButton({ 
  children, 
  className, 
  variant = "primary", 
  ...props 
}: HoverButtonProps) {
  
  let baseStyles = "relative overflow-hidden font-bold rounded-full group transition-all duration-300 hover:scale-105 active:scale-95";
  let textStyles = "relative z-10 flex items-center justify-center gap-2 transition-colors duration-500";
  let fillStyles = "absolute left-[-10%] top-[-10%] w-[120%] h-[120%] -translate-y-[100%] rounded-[0_0_50%_50%] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-y-0 group-hover:rounded-none z-0";
  
  if (variant === "primary") {
    // White button, black fill
    baseStyles += " bg-white text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]";
    textStyles += " group-hover:text-white";
    fillStyles += " bg-black";
  } else if (variant === "secondary") {
    // Transparent button, white fill
    baseStyles += " bg-transparent border border-white/20 text-white";
    textStyles += " group-hover:text-black";
    fillStyles += " bg-white";
  } else if (variant === "accent") {
    // Accent button, black fill
    baseStyles += " bg-[var(--accent)] text-white hover:shadow-[0_0_25px_rgba(255,138,0,0.5)]";
    textStyles += " group-hover:text-white";
    fillStyles += " bg-black";
  } else if (variant === "dark") {
    // Dark button, white fill
    baseStyles += " bg-[#1A1A1A] text-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]";
    textStyles += " group-hover:text-black";
    fillStyles += " bg-white";
  }

  return (
    <button className={cn(baseStyles, className)} {...props}>
      <span className={fillStyles}></span>
      <span className={textStyles}>{children}</span>
    </button>
  );
}
