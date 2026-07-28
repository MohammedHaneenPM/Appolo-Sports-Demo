import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/ui/LenisProvider";
import Navigation from "@/components/ui/Navigation";
import CursorTrail from "@/components/ui/CursorTrail";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Apollo Sports | Ultra-Premium Jersey",
  description: "A premium football jersey engineered for athletes who demand performance without sacrificing style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)] selection:text-white">
        <CustomCursor />
        <Navigation />
        <CursorTrail text="APOLLO" />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
