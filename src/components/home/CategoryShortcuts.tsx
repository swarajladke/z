"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { MOCK_CATEGORIES } from "@/data/mock-categories";

export const CategoryShortcuts: React.FC = () => {
  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Popular Asset Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Browse hand-curated categories tailored for Indian brands & creators.
            </p>
          </div>
          <Link
            href="/assets"
            className="text-xs sm:text-sm font-bold text-violet-700 hover:text-violet-800 flex items-center gap-1 hover:underline"
          >
            All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Horizontally Scrollable Container */}
        <div className="flex items-center gap-4 overflow-x-auto pb-4 pt-1 scrollbar-none">
          {MOCK_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/assets?category=${cat.slug}`}
              className="group min-w-[200px] sm:min-w-[220px] bg-slate-50 hover:bg-white rounded-2xl p-3 border border-slate-200/80 hover:border-violet-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between shrink-0"
            >
              <div className="aspect-16/10 rounded-xl overflow-hidden mb-3 bg-slate-200 relative">
                <img
                  src={cat.thumbnailUrl}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-violet-700 transition-colors">
                  {cat.title}
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {cat.assetCount.toLocaleString()} assets
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
