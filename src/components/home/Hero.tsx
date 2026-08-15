"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Sparkles, ArrowRight, Monitor, Smartphone, Image } from "lucide-react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { formatPaiseToINR, FALLBACK_IMAGE_DATA_URL } from "@/lib/utils";

const POPULAR_SEARCH_TERMS = [
  "Instagram Post",
  "Independence Day",
  "Wedding",
  "Restaurant",
  "Business",
  "YouTube Thumbnail",
];

export const Hero: React.FC = () => {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState("");

  // Pointer parallax coordinates for desktop
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Calculate normalized offset -1 to +1, max 6px shift
    const x = ((clientX / innerWidth) - 0.5) * 12;
    const y = ((clientY / innerHeight) - 0.5) * 12;
    setParallax({ x, y });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/assets?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSearchTermClick = (term: string) => {
    router.push(`/assets?q=${encodeURIComponent(term)}`);
  };

  const heroAsset = MOCK_PRODUCTS[0]; // Independence Day Pack
  const secondaryAsset = MOCK_PRODUCTS[6]; // Diwali Banner Kit
  const thirdAsset = MOCK_PRODUCTS[2]; // Wedding Collection

  // Framer Motion Typed Variants
  const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const fadeInUpHeading: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0, 0, 0.58, 1] } },
  };

  const fadeInScaleArtwork: Variants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0, 0, 0.58, 1], delay: 0.1 } },
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-[#171717] text-white py-16 sm:py-24 border-b border-slate-800 bg-dot-pattern-dark"
    >
      {/* Film Grain Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Soft Ambient Saffron & Violet Light Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Eyebrow, Heading, Description, Integrated Search */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Eyebrow */}
            <motion.div
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              variants={fadeInDown}
              className="inline-flex items-center gap-2 bg-slate-900/90 text-cyan-300 text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-slate-800 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Curated for Indian creators & agencies</span>
            </motion.div>

            {/* Dominant Headline */}
            <motion.h1
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              variants={fadeInUpHeading}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight"
            >
              Design assets with <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-violet-400 via-cyan-300 to-amber-200 bg-clip-text text-transparent">
                a point of view.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.15, duration: 0.4 } } }}
              className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed font-normal"
            >
              Layered Photoshop PSDs, Canva template edit links and vector graphics tailored for Indian brands, celebrations and campaigns.
            </motion.p>

            {/* Integrated Dominant Search Bar */}
            <motion.form
              onSubmit={handleSearchSubmit}
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.4 } } }}
              className="relative max-w-2xl group"
            >
              <div className="relative flex items-center bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20 transition-all p-1.5">
                <Search className="w-5 h-5 text-slate-400 ml-3.5 shrink-0" />
                <input
                  type="text"
                  placeholder="Search 2,500+ templates, PSDs, vectors and fonts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent px-3 py-3 text-sm text-white placeholder-slate-400 focus:outline-hidden font-medium"
                />
                <button
                  type="submit"
                  className="bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md shadow-violet-900/50 flex items-center gap-1.5 shrink-0 hover:-translate-y-[1px] group/btn"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-[3px] transition-transform" />
                </button>
              </div>
            </motion.form>

            {/* Popular Search Chips (Minimum 12px text) */}
            <motion.div
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.3 } } }}
              className="flex items-center gap-2 flex-wrap text-xs pt-1"
            >
              <span className="text-slate-400 font-semibold text-xs uppercase tracking-wider">Popular:</span>
              {POPULAR_SEARCH_TERMS.map((term) => (
                <button
                  key={term}
                  onClick={() => handleSearchTermClick(term)}
                  className="bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 transition-colors text-xs font-medium"
                >
                  {term}
                </button>
              ))}
            </motion.div>

            {/* Primary & Secondary Action CTAs with 1px Lift & 3px Arrow Shift */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 border-t border-slate-800/80">
              <Link
                href="/assets"
                className="bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-violet-900/50 flex items-center justify-center gap-2 hover:-translate-y-[1px] group"
              >
                <span>Explore Asset Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-[3px] transition-transform" />
              </Link>
              <Link
                href="/assets?category=Festival+Designs"
                className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 font-bold text-xs px-5 py-3.5 rounded-xl transition-colors text-center hover:-translate-y-[1px]"
              >
                Browse Festival Collections
              </Link>
            </div>
          </div>

          {/* Right Column: Coordinated Multi-Format Campaign Wall Artwork with Pointer Parallax */}
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={fadeInScaleArtwork}
            className="lg:col-span-5 relative flex justify-center items-center"
            style={{
              transform: shouldReduceMotion
                ? "none"
                : `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
              transition: "transform 0.15s ease-out",
            }}
          >
            <div className="relative w-full max-w-lg aspect-[4/3] flex items-center justify-center">
              
              {/* Back Top Banner Mockup (21:9 Web/Billboard Banner) */}
              <div className="absolute -top-4 left-2 right-2 h-20 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl opacity-75 transform -rotate-1 transition-transform hover:rotate-0">
                <img
                  src={secondaryAsset?.thumbnailUrl || FALLBACK_IMAGE_DATA_URL}
                  alt="Billboard banner mockup preview"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-bold text-cyan-400 border border-slate-800 flex items-center gap-1">
                  <Monitor className="w-3 h-3" /> Store Header Banner
                </div>
              </div>

              {/* Left Vertical Mockup Card (9:16 Instagram Story) */}
              <div className="absolute left-0 top-12 w-2/5 aspect-[9/16] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl opacity-90 -rotate-6 transition-all hover:rotate-0 hover:z-30">
                <img
                  src={thirdAsset?.thumbnailUrl || FALLBACK_IMAGE_DATA_URL}
                  alt="Instagram story mockup"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-bold text-amber-400 border border-slate-800 flex items-center gap-1">
                  <Smartphone className="w-3 h-3" /> Story (9:16)
                </div>
              </div>

              {/* Right Vertical Print Poster Mockup Card (3:4 Poster) */}
              <div className="absolute right-0 top-8 w-2/5 aspect-[3/4] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl opacity-85 rotate-6 transition-all hover:rotate-0 hover:z-30">
                <img
                  src={secondaryAsset?.thumbnailUrl || FALLBACK_IMAGE_DATA_URL}
                  alt="Print poster mockup"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-bold text-violet-400 border border-slate-800 flex items-center gap-1">
                  <Image className="w-3 h-3" /> A3 Poster (3:4)
                </div>
              </div>

              {/* Front Main Center Card (1:1 Instagram Post Campaign Mockup) */}
              <div className="relative z-20 w-3/4 aspect-[1/1] rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 shadow-2xl group transition-transform duration-300 hover:scale-[1.02]">
                <img
                  src={heroAsset?.thumbnailUrl || FALLBACK_IMAGE_DATA_URL}
                  alt={heroAsset?.title || "Campaign mockup"}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                  }}
                  className="w-full h-full object-cover"
                />
                
                {/* Floating Coordinated Campaign Badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 flex items-center justify-between shadow-xl">
                  <div>
                    <span className="text-[11px] text-cyan-400 font-extrabold uppercase tracking-wider block">
                      COORDINATED CAMPAIGN PACK
                    </span>
                    <h3 className="font-bold text-white text-xs truncate max-w-[180px]">
                      {heroAsset?.title}
                    </h3>
                  </div>
                  <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 shrink-0">
                    {heroAsset?.isFree ? "Free" : formatPaiseToINR(heroAsset?.priceInPaise || 14900)}
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
