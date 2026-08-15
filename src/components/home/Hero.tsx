"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Sparkles, Tag, ArrowRight, ShieldCheck, Download, Layers } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand.config";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { formatCurrency } from "@/lib/utils";

interface HeroProps {
  onOpenSearch: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSearch }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/assets?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      onOpenSearch();
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-12 pb-20 overflow-hidden">
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Search & Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-violet-500/15 text-cyan-300 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-violet-500/30">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Creative assets for every idea
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Find the perfect asset. <br />
              <span className="bg-gradient-to-r from-cyan-400 via-violet-300 to-emerald-400 bg-clip-text text-transparent">
                Make it your own.
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Discover editable templates, vectors, graphics and creative bundles built for modern creators and Indian businesses.
            </p>

            {/* Primary Search Bar Box */}
            <form
              onSubmit={handleHeroSearch}
              className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center gap-2 border border-white/20"
            >
              <div className="flex items-center gap-3 px-3 py-2 w-full flex-1">
                <Search className="w-5 h-5 text-violet-600 shrink-0" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search templates, vectors, PNGs, fonts…"
                  className="w-full text-slate-900 text-sm sm:text-base font-medium placeholder:text-slate-400 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onOpenSearch}
                  className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-slate-100 hover:bg-slate-200 px-2.5 py-2 rounded-xl transition-colors"
                >
                  <kbd className="font-sans">Ctrl K</kbd>
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-violet-700 hover:bg-violet-800 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors shadow-lg shadow-violet-900/50 flex items-center justify-center gap-2 shrink-0"
                >
                  Search <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Popular Search Chips */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-cyan-400" /> Popular searches:
              </span>
              <div className="flex flex-wrap gap-2">
                {BRAND_CONFIG.popularSearches.map((chip) => (
                  <Link
                    key={chip}
                    href={`/assets?q=${encodeURIComponent(chip)}`}
                    className="bg-slate-800/80 hover:bg-violet-900/60 text-slate-300 hover:text-cyan-300 text-xs font-medium px-3 py-1.5 rounded-full border border-slate-700/80 transition-colors"
                  >
                    {chip}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Original Visual Composition Grid */}
          <div className="lg:col-span-5 relative">
            <div className="grid grid-cols-2 gap-4 relative">
              {/* Product Card Showcase 1 */}
              <div className="space-y-4">
                <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-3 shadow-xl backdrop-blur-xs transform hover:-translate-y-1 transition-all">
                  <img
                    src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=600&q=80"
                    alt="Independence Day Social Pack"
                    className="w-full aspect-4/3 object-cover rounded-xl mb-3"
                  />
                  <div className="text-xs font-bold text-white truncate">Independence Day Social Media Pack</div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                    <span className="bg-violet-500/20 text-violet-300 px-1.5 py-0.5 rounded font-semibold">PSD • Canva</span>
                    <span className="font-extrabold text-cyan-400">₹149</span>
                  </div>
                </div>

                <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-3 shadow-xl backdrop-blur-xs transform hover:-translate-y-1 transition-all">
                  <img
                    src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80"
                    alt="Floral Mandala Vector"
                    className="w-full aspect-4/3 object-cover rounded-xl mb-3"
                  />
                  <div className="text-xs font-bold text-white truncate">Floral Mandala Vectors</div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                    <span className="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-semibold">SVG • EPS</span>
                    <span className="font-extrabold text-emerald-400">FREE</span>
                  </div>
                </div>
              </div>

              {/* Product Card Showcase 2 */}
              <div className="space-y-4 pt-6">
                <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-3 shadow-xl backdrop-blur-xs transform hover:-translate-y-1 transition-all">
                  <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80"
                    alt="Indian Wedding Invitation"
                    className="w-full aspect-4/3 object-cover rounded-xl mb-3"
                  />
                  <div className="text-xs font-bold text-white truncate">Indian Wedding Invitation Suite</div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                    <span className="bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-semibold">AI • PSD</span>
                    <span className="font-extrabold text-cyan-400">₹399</span>
                  </div>
                </div>

                {/* Floating Badge Card */}
                <div className="bg-gradient-to-r from-violet-800 to-cyan-800 rounded-2xl p-4 text-white shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-cyan-300" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">Commercial License</div>
                    <div className="text-[11px] text-slate-200">100% production ready</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
