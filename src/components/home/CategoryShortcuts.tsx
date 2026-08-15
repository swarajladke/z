"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MOCK_CATEGORIES } from "@/data/mock-categories";
import { FALLBACK_IMAGE_DATA_URL } from "@/lib/utils";

export const CategoryShortcuts: React.FC = () => {
  return (
    <section className="py-12 bg-white border-b border-slate-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-violet-700 text-xs font-bold uppercase tracking-wider block mb-1">
              Popular Categories
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Browse by Industry & Asset Type
            </h2>
          </div>
          <Link
            href="/assets"
            className="text-xs sm:text-sm font-bold text-violet-700 hover:text-violet-800 flex items-center gap-1 hover:underline shrink-0"
          >
            All categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Horizontal Scroll Row */}
        <div className="flex items-center gap-4 overflow-x-auto pb-3 scrollbar-none">
          {MOCK_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/assets?category=${cat.slug}`}
              className="group flex items-center gap-3 p-2.5 pr-5 bg-slate-50 hover:bg-violet-50/70 border border-slate-200/80 hover:border-violet-200 rounded-2xl transition-all duration-200 shrink-0"
            >
              <img
                src={cat.thumbnailUrl || FALLBACK_IMAGE_DATA_URL}
                alt={cat.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                }}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200 group-hover:scale-105 transition-transform shrink-0"
              />
              <div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-violet-700 transition-colors">
                  {cat.title}
                </h3>
                <span className="text-[11px] text-slate-500 font-medium">{cat.assetCount} assets</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
