"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Layers } from "lucide-react";
import { MOCK_COLLECTIONS } from "@/data/mock-collections";
import { formatPaiseToINR, FALLBACK_IMAGE_DATA_URL } from "@/lib/utils";

export const CuratedCollections: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-violet-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-cyan-600" />
              Inspiration Packs
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Collections made to inspire
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Curated themed asset bundles ready for fast launch.
            </p>
          </div>

          <Link
            href="/assets"
            className="text-xs sm:text-sm font-bold text-violet-700 hover:text-violet-800 flex items-center gap-1 hover:underline"
          >
            Explore all collections <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_COLLECTIONS.map((col) => (
            <Link
              key={col.id}
              href={`/assets?category=${col.slug}`}
              className="group bg-white rounded-2xl border border-slate-200/80 p-5 overflow-hidden shadow-xs hover:shadow-xl hover:border-violet-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-slate-100">
                  <img
                    src={col.thumbnailUrl || FALLBACK_IMAGE_DATA_URL}
                    alt={col.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {col.badge && (
                    <span className="absolute top-2.5 right-2.5 bg-violet-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
                      {col.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-1">
                  <Layers className="w-3.5 h-3.5 text-violet-600" />
                  <span>{col.assetCount} assets</span>
                </div>

                <h3 className="font-bold text-slate-900 text-lg group-hover:text-violet-700 transition-colors">
                  {col.title}
                </h3>

                <p className="text-slate-500 text-xs mt-1 line-clamp-2">
                  {col.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Starting at <strong className="text-slate-900 font-bold">{formatPaiseToINR(col.startingPriceInPaise || col.startingPrice * 100)}</strong>
                </span>
                <span className="text-xs font-bold text-violet-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Collection →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
