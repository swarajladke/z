"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, ArrowRight, CheckCircle2, Layers, Download } from "lucide-react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { formatPaiseToINR, FALLBACK_IMAGE_DATA_URL } from "@/lib/utils";

const POPULAR_CHIPS = [
  "Independence Day",
  "Festival Bundles",
  "Wedding Invitations",
  "YouTube Thumbnails",
  "Restaurant Menus",
  "Free PNGs",
];

export const Hero: React.FC = () => {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/assets?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleChipClick = (chip: string) => {
    router.push(`/assets?q=${encodeURIComponent(chip)}`);
  };

  const featuredAssets = MOCK_PRODUCTS.slice(0, 3);

  // Framer Motion variants typed strictly
  const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const fadeInUpHeading: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const fadeInScaleArtwork: Variants = {
    hidden: { opacity: 0, scale: 0.97 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: "easeOut", delay: 0.1 } },
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white py-16 sm:py-24 border-b border-slate-800 bg-dot-pattern-dark">
      {/* Soft Ambient Radial Light Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Low-Opacity Geometric Motif Line Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Asymmetric Copy & Primary Search Bar */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Eyebrow */}
            <motion.div
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              variants={fadeInDown}
              className="inline-flex items-center gap-2 bg-slate-900/90 text-cyan-300 text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-slate-800 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Made for ambitious creators</span>
            </motion.div>

            {/* Editorial Heading */}
            <motion.h1
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              variants={fadeInUpHeading}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight"
            >
              Assets that make ideas <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-violet-400 via-cyan-300 to-white bg-clip-text text-transparent">
                impossible to ignore.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.2, duration: 0.4 } } }}
              className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed font-normal"
            >
              Editable templates, vectors and graphics crafted for Indian brands, creators and celebrations.
            </motion.p>

            {/* Primary Search Bar */}
            <motion.form
              onSubmit={handleSearchSubmit}
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.4 } } }}
              className="relative max-w-2xl group"
            >
              <div className="relative flex items-center bg-slate-900/90 border border-slate-700/80 rounded-2xl shadow-2xl focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20 transition-all p-1.5">
                <Search className="w-5 h-5 text-slate-400 ml-3.5 shrink-0" />
                <input
                  type="text"
                  placeholder="Search 2,500+ templates (e.g. Independence Day, PSD, Canva)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent px-3 py-3 text-sm text-white placeholder-slate-400 focus:outline-hidden font-medium"
                />
                <button
                  type="submit"
                  className="bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md shadow-violet-900/50 flex items-center gap-1.5 shrink-0"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.form>

            {/* Simplified Popular Search Chips */}
            <motion.div
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.35 } } }}
              className="flex items-center gap-2 flex-wrap text-xs pt-1"
            >
              <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">Trending:</span>
              {POPULAR_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleChipClick(chip)}
                  className="bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1 rounded-lg border border-slate-800 transition-colors text-[11px] font-medium"
                >
                  {chip}
                </button>
              ))}
            </motion.div>

            {/* Micro Highlights */}
            <div className="pt-4 flex items-center gap-6 text-xs text-slate-400 font-medium border-t border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Instant Digital Download</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>PSD & Canva Links</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Download className="w-4 h-4 text-violet-400" />
                <span>Commercial Rights</span>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Overlapping 3D Preview Stack */}
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={fadeInScaleArtwork}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-md aspect-[4/3]">
              {/* Back Layer Card */}
              <div className="absolute top-6 -right-3 w-4/5 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl opacity-60 rotate-6 transition-all hover:rotate-3">
                <img
                  src={featuredAssets[2]?.thumbnailUrl || FALLBACK_IMAGE_DATA_URL}
                  alt="Secondary asset preview"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Middle Layer Card */}
              <div className="absolute top-3 -left-3 w-4/5 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl opacity-80 -rotate-3 transition-all hover:rotate-0">
                <img
                  src={featuredAssets[1]?.thumbnailUrl || FALLBACK_IMAGE_DATA_URL}
                  alt="Secondary asset preview"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Front Main Featured Hero Artwork Card */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 shadow-2xl group transition-transform duration-300 hover:scale-[1.02]">
                <img
                  src={featuredAssets[0]?.thumbnailUrl || FALLBACK_IMAGE_DATA_URL}
                  alt={featuredAssets[0]?.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                  }}
                  className="w-full h-full object-cover"
                />
                
                {/* Floating Highlight Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-3.5 rounded-xl border border-slate-800/80 flex items-center justify-between shadow-xl">
                  <div>
                    <span className="text-[10px] text-cyan-400 font-extrabold uppercase tracking-wider block">
                      FEATURED ASSET PACK
                    </span>
                    <h3 className="font-bold text-white text-xs truncate max-w-[200px]">
                      {featuredAssets[0]?.title}
                    </h3>
                  </div>
                  <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    {featuredAssets[0]?.isFree ? "Free" : formatPaiseToINR(featuredAssets[0]?.priceInPaise || 14900)}
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
