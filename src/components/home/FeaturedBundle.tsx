"use client";

import React from "react";
import Link from "next/link";
import { Package, ArrowRight, Eye, ShieldCheck, CheckCircle2, Sparkles } from "lucide-react";
import { useQuickPreview } from "@/context/QuickPreviewContext";
import { MOCK_PRODUCTS } from "@/data/mock-products";

export const FeaturedBundle: React.FC = () => {
  const { openQuickPreview } = useQuickPreview();
  const bundleProduct = MOCK_PRODUCTS.find((p) => p.id === "prod-9") || MOCK_PRODUCTS[0];

  return (
    <section className="py-16 bg-white border-y border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-violet-950 to-slate-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-slate-800">
          {/* Background Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-cyan-500/20 text-cyan-300 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider border border-cyan-400/30">
                <Package className="w-4 h-4 text-cyan-400" />
                Limited-Time Bundle
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Indian Festival Design Mega Pack
              </h2>

              <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
                Get editable social posts, banners, vectors and transparent PNG elements for 15+ Indian festivals in one complete, production-ready collection.
              </p>

              {/* Feature Points */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  "250+ Source Files Included",
                  "PSD, Canva, AI, EPS & PNG",
                  "Commercial-use License Included",
                  "Free Lifetime Content Updates",
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Price & Action Row */}
              <div className="pt-4 flex flex-wrap items-center gap-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-cyan-400">₹799</span>
                  <span className="text-slate-400 text-base sm:text-lg line-through font-semibold">₹1,499</span>
                  <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-400/30">
                    SAVE 47%
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/product/${bundleProduct.slug}`}
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm px-6 py-3 rounded-xl transition-colors shadow-lg shadow-cyan-500/30 flex items-center gap-2"
                  >
                    Explore Bundle <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => openQuickPreview(bundleProduct)}
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-4 py-3 rounded-xl transition-colors flex items-center gap-2 border border-white/20"
                  >
                    <Eye className="w-4 h-4 text-cyan-400" />
                    Preview Contents
                  </button>
                </div>
              </div>
            </div>

            {/* Visual Collage Column */}
            <div className="lg:col-span-5">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80"
                  alt="Indian Festival Mega Pack Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-6 flex flex-col justify-end">
                  <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-700/80 text-xs space-y-1">
                    <div className="font-bold text-white flex items-center justify-between">
                      <span>Includes Festivals:</span>
                      <span className="text-cyan-400">15 Festivals</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      Independence Day, Diwali, Rakhi, Holi, Navratri, Eid, Ganesh Chaturthi & more.
                    </p>
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
