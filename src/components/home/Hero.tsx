"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Sparkles, ArrowRight } from "lucide-react";
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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/assets?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSearchTermClick = (term: string) => {
    router.push(`/assets?q=${encodeURIComponent(term)}`);
  };

  const featuredAssets = MOCK_PRODUCTS.slice(0, 3);

  // Framer Motion Typed Variants
  const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const fadeInUpHeading: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.58, 1] } },
  };

  const fadeInScaleArtwork: Variants = {
    hidden: { opacity: 0, scale: 0.97 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: [0, 0, 0.58, 1], delay: 0.1 } },
  };

  return (
    <section className="relative overflow-hidden bg-[#171717] text-white py-16 sm:py-24 border-b border-slate-800 bg-dot-pattern-dark">
      {/* Soft Ambient Warm Saffron & Violet Light Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Geometric Motif Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

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
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Curated for Indian creators</span>
            </motion.div>

            {/* Heading */}
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
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.2, duration: 0.4 } } }}
              className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed font-normal"
            >
              Editable templates, vectors and graphics created for brands, celebrations and everyday ideas.
            </motion.p>

            {/* Integrated Search Bar */}
            <motion.form
              onSubmit={handleSearchSubmit}
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.4 } } }}
              className="relative max-w-2xl group"
            >
              <div className="relative flex items-center bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20 transition-all p-1.5">
                <Search className="w-5 h-5 text-slate-400 ml-3.5 shrink-0" />
                <input
                  type="text"
                  placeholder="Search templates, vectors, PNGs and fonts..."
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

            {/* Popular Search Chips */}
            <motion.div
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.35 } } }}
              className="flex items-center gap-2 flex-wrap text-xs pt-1"
            >
              <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">Popular:</span>
              {POPULAR_SEARCH_TERMS.map((term) => (
                <button
                  key={term}
                  onClick={() => handleSearchTermClick(term)}
                  className="bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1 rounded-lg border border-slate-800 transition-colors text-[11px] font-medium"
                >
                  {term}
                </button>
              ))}
            </motion.div>

            {/* Primary & Secondary Action CTAs */}
            <div className="pt-4 flex items-center gap-4 border-t border-slate-800/80">
              <Link
                href="/assets"
                className="bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-violet-900/50 flex items-center gap-2"
              >
                <span>Explore Assets</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/assets?category=festival-designs"
                className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 font-bold text-xs px-5 py-3.5 rounded-xl transition-colors"
              >
                Browse Festival Collections
              </Link>
            </div>
          </div>

          {/* Right Column: Layered Overlapping Campaign Mockups */}
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={fadeInScaleArtwork}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-md aspect-[4/3]">
              {/* Back Layer Card (Poster Mockup) */}
              <div className="absolute top-6 -right-3 w-4/5 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl opacity-60 rotate-6 transition-all hover:rotate-3">
                <img
                  src={featuredAssets[2]?.thumbnailUrl || FALLBACK_IMAGE_DATA_URL}
                  alt="Poster mockup preview"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Middle Layer Card (Story Mockup) */}
              <div className="absolute top-3 -left-3 w-4/5 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl opacity-80 -rotate-3 transition-all hover:rotate-0">
                <img
                  src={featuredAssets[1]?.thumbnailUrl || FALLBACK_IMAGE_DATA_URL}
                  alt="Instagram story mockup"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Front Main Featured Hero Artwork Card (Post Mockup) */}
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
                      SEASONAL CAMPAIGN
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
