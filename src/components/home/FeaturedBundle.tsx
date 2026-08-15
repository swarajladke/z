"use client";

import React from "react";
import Link from "next/link";
import { Layers, ArrowRight, Eye, CheckCircle2, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { useQuickPreview } from "@/context/QuickPreviewContext";
import { formatPaiseToINR, FALLBACK_IMAGE_DATA_URL } from "@/lib/utils";

export const FeaturedBundle: React.FC = () => {
  const { openQuickPreview } = useQuickPreview();
  const shouldReduceMotion = useReducedMotion();

  // Find the bundle product
  const bundleProduct = MOCK_PRODUCTS.find((p) => p.isBundle) || MOCK_PRODUCTS[8];

  const secondaryPreviews = MOCK_PRODUCTS.slice(0, 3);

  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800 bg-dot-pattern-dark">
      {/* Subtle Low-Opacity Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 bg-violet-900/40 text-violet-300 text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-violet-700/50">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Editorial Mega-Pack Collection</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                Indian Festival Design Mega Pack
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                {bundleProduct.description}
              </p>

              {/* Feature Points */}
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 pt-2 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>250+ Editable PSD & Canva Files</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Diwali, Holi, Independence Day</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Commercial Agency Rights</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Lifetime Cloud Updates</span>
                </div>
              </div>

              {/* Price & Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4 border-t border-slate-800">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">
                    {formatPaiseToINR(bundleProduct.priceInPaise || 79900)}
                  </span>
                  {bundleProduct.originalPriceInPaise && (
                    <span className="text-slate-500 line-through text-sm font-semibold">
                      {formatPaiseToINR(bundleProduct.originalPriceInPaise)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/product/${bundleProduct.slug}`}
                    className="bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-violet-900/50 flex items-center gap-2 hover:-translate-y-[1px] group"
                  >
                    <span>Get Mega Pack</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-[3px] transition-transform" />
                  </Link>
                  <button
                    onClick={() => openQuickPreview(bundleProduct)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs px-4 py-3.5 rounded-xl transition-colors flex items-center gap-1.5 border border-slate-700 hover:-translate-y-[1px]"
                  >
                    <Eye className="w-4 h-4 text-cyan-400" />
                    <span>Quick View</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Overlapping Layered Preview Artwork */}
            <div className="lg:col-span-6 relative flex justify-center items-center">
              <div className="relative w-full aspect-[4/3] max-w-lg">
                {/* Secondary overlapping background cards */}
                <div className="absolute top-4 -right-4 w-3/4 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl opacity-70 rotate-6">
                  <img
                    src={secondaryPreviews[1]?.thumbnailUrl || FALLBACK_IMAGE_DATA_URL}
                    alt="Bundle item preview"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute -top-4 -left-4 w-3/4 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl opacity-70 -rotate-6">
                  <img
                    src={secondaryPreviews[2]?.thumbnailUrl || FALLBACK_IMAGE_DATA_URL}
                    alt="Bundle item preview"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Primary Bundle Artwork Card */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-700 shadow-2xl group transition-transform duration-300 hover:scale-[1.02]">
                  <img
                    src={bundleProduct.thumbnailUrl || FALLBACK_IMAGE_DATA_URL}
                    alt={bundleProduct.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-cyan-600 text-white text-xs font-extrabold uppercase px-3 py-1 rounded-md shadow-md tracking-wider">
                    250+ FILES BUNDLE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
