"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { MOCK_COLLECTIONS } from "@/data/mock-collections";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { formatPaiseToINR, FALLBACK_IMAGE_DATA_URL } from "@/lib/utils";

export const CuratedCollections: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Helper to retrieve supporting previews from matching products
  const getCollectionArtwork = (colSlug: string, fallbackThumb: string) => {
    const matchingProducts = MOCK_PRODUCTS.filter(
      (p) => p.category.toLowerCase().includes(colSlug.toLowerCase()) || p.tags.some((t) => t.toLowerCase().includes(colSlug.toLowerCase()))
    );
    const images = matchingProducts.map((p) => p.thumbnailUrl);
    return {
      main: images[0] || fallbackThumb,
      sub1: images[1] || MOCK_PRODUCTS[1]?.thumbnailUrl || fallbackThumb,
      sub2: images[2] || MOCK_PRODUCTS[2]?.thumbnailUrl || fallbackThumb,
      sub3: images[3] || MOCK_PRODUCTS[3]?.thumbnailUrl || fallbackThumb,
    };
  };

  return (
    <section className="py-20 bg-[#F5F2EC] border-b border-[rgba(23,23,23,0.12)] text-[#171717]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#6D28D9] block mb-1">
              Curated Creative Vaults
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#171717] tracking-tight">
              Use-Case & Industry Collections
            </h2>
          </div>

          <Link
            href="/assets"
            className="text-xs font-bold text-[#6D28D9] hover:underline flex items-center gap-1 shrink-0 hover:-translate-y-[1px] group"
          >
            Browse all collections <ArrowRight className="w-4 h-4 group-hover:translate-x-[3px] transition-transform" />
          </Link>
        </div>

        {/* 6 Collage Collection Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_COLLECTIONS.map((col) => {
            const artwork = getCollectionArtwork(col.slug, col.thumbnailUrl);

            return (
              <motion.div
                key={col.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="group bg-white rounded-2xl border border-[rgba(23,23,23,0.12)] p-3.5 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Collage Header: Single Optional Trending Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    {col.isTrending ? (
                      <span className="bg-[#6D28D9] text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> TRENDING
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        COLLECTION
                      </span>
                    )}
                    <span className="text-xs font-extrabold text-[#6D28D9] bg-violet-50 px-2.5 py-0.5 rounded-full border border-violet-100">
                      {col.assetCount}+ Assets
                    </span>
                  </div>

                  {/* 4-Image Collage Container (~65% Main + 3 Sub-thumbnails below) */}
                  <div className="space-y-1.5 overflow-hidden rounded-xl bg-slate-100 p-1.5">
                    {/* Main Primary Image (~65% height) */}
                    <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-slate-900">
                      <img
                        src={artwork.main}
                        alt={col.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* 3 Supporting Thumbnails in 1 Row */}
                    <div className="grid grid-cols-3 gap-1.5">
                      {[artwork.sub1, artwork.sub2, artwork.sub3].map((img, idx) => (
                        <div key={idx} className="aspect-[4/3] rounded-md overflow-hidden bg-slate-200">
                          <img
                            src={img}
                            alt={`${col.title} preview ${idx + 1}`}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                            }}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Collection Title & Price Metadata */}
                  <div className="mt-3.5 space-y-1">
                    <h3 className="font-extrabold text-[#171717] text-base group-hover:text-[#6D28D9] transition-colors">
                      {col.title}
                    </h3>
                    <div className="text-xs text-[#6F6A63] font-medium flex items-center justify-between">
                      <span>Starting from {formatPaiseToINR(col.startingPriceInPaise || 19900)}</span>
                    </div>
                  </div>
                </div>

                {/* View Collection Action Revealed on Hover */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/assets?category=${encodeURIComponent(col.title)}`}
                    className="w-full bg-[#171717] group-hover:bg-[#6D28D9] text-white font-extrabold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span>View Collection Vault</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-[3px] transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
