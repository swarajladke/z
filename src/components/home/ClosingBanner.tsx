"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Download } from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { FALLBACK_IMAGE_DATA_URL } from "@/lib/utils";

export const ClosingBanner: React.FC = () => {
  const sampleArtwork = MOCK_PRODUCTS[0]?.thumbnailUrl || FALLBACK_IMAGE_DATA_URL;

  return (
    <section className="relative overflow-hidden bg-[#171717] text-white py-20 border-b border-slate-800 bg-dot-pattern-dark">
      {/* Background Graphic Vignette */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img
          src={sampleArtwork}
          alt="Creative artwork composition"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
          }}
          className="w-full h-full object-cover blur-md"
        />
        <div className="absolute inset-0 bg-[#171717]/80" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 bg-slate-900/90 text-cyan-300 text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-slate-800">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>KalaStock Creative Community</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight max-w-3xl mx-auto leading-tight">
          Make something unmistakably yours.
        </h2>

        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-normal">
          Explore over 2,500+ editable templates, vectors, icons and creative bundles for Indian creators.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/assets"
            className="bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-bold text-xs px-8 py-4 rounded-xl transition-all shadow-lg shadow-violet-900/50 flex items-center gap-2 hover:-translate-y-[1px] group"
          >
            <span>Explore Asset Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-[3px] transition-transform" />
          </Link>
          <Link
            href="/assets?filter=free"
            className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 font-bold text-xs px-6 py-4 rounded-xl transition-colors flex items-center gap-2 hover:-translate-y-[1px]"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>View Free Downloads</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
