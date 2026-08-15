"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { MOCK_COLLECTIONS } from "@/data/mock-collections";
import { formatPaiseToINR, FALLBACK_IMAGE_DATA_URL } from "@/lib/utils";

export const CuratedCollections: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const festiveCol = MOCK_COLLECTIONS.find((c) => c.id === "col-festive") || MOCK_COLLECTIONS[0];
  const socialCol = MOCK_COLLECTIONS.find((c) => c.id === "col-social") || MOCK_COLLECTIONS[1];
  const businessCol = MOCK_COLLECTIONS.find((c) => c.id === "col-business") || MOCK_COLLECTIONS[2];
  const weddingCol = MOCK_COLLECTIONS.find((c) => c.id === "col-wedding") || MOCK_COLLECTIONS[3];
  const foodCol = MOCK_COLLECTIONS.find((c) => c.id === "col-food") || MOCK_COLLECTIONS[4];

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

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* 1. Large Feature Card: Festive India (Spans 8 cols on desktop) */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="md:col-span-8 bg-[#171717] text-white rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative group flex flex-col justify-between p-8 sm:p-10 min-h-[380px]"
          >
            {/* Background Image with Dark Gradient Vignette */}
            <div className="absolute inset-0 z-0 opacity-40 group-hover:scale-105 transition-transform duration-700">
              <img
                src={festiveCol.thumbnailUrl || FALLBACK_IMAGE_DATA_URL}
                alt={festiveCol.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                }}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/60 to-transparent z-0" />

            {/* Top Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="bg-[#6D28D9] text-white text-xs font-extrabold uppercase px-3 py-1 rounded-full tracking-wider">
                FEATURED COLLECTION
              </span>
              <span className="text-xs font-bold text-cyan-300 bg-slate-900/80 backdrop-blur-xs px-3 py-1 rounded-full border border-slate-800">
                {festiveCol.assetCount}+ Assets Included
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 space-y-4 max-w-lg mt-12">
              <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                {festiveCol.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {festiveCol.description}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold">
                  From {formatPaiseToINR(festiveCol.startingPriceInPaise || 34900)}
                </span>
                <Link
                  href={`/assets?category=Festival+Designs`}
                  className="bg-white text-[#171717] hover:bg-cyan-300 font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5 hover:-translate-y-[1px] group/btn"
                >
                  <span>Explore Vault</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-[3px] transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* 2. Medium Card 1: Social Media Essentials (Spans 4 cols) */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="md:col-span-4 bg-white rounded-3xl p-6 border border-[rgba(23,23,23,0.12)] shadow-xs flex flex-col justify-between group min-h-[380px]"
          >
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-[#6D28D9] uppercase tracking-wider block">
                CREATOR ESSENTIALS
              </span>
              <h3 className="text-xl font-extrabold text-[#171717]">{socialCol.title}</h3>
              <p className="text-xs text-[#6F6A63] leading-relaxed">{socialCol.description}</p>
            </div>

            <div className="my-4 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={socialCol.thumbnailUrl || FALLBACK_IMAGE_DATA_URL}
                alt={socialCol.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-xs text-[#6F6A63] font-medium">{socialCol.assetCount}+ Templates</span>
              <Link href={`/assets?category=Social+Media`} className="text-xs font-bold text-[#6D28D9] hover:underline">
                View Assets →
              </Link>
            </div>
          </motion.div>

          {/* 3. Medium Card 2: Modern Business (Spans 4 cols) */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="md:col-span-4 bg-white rounded-3xl p-6 border border-[rgba(23,23,23,0.12)] shadow-xs flex flex-col justify-between group min-h-[340px]"
          >
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-[#06B6D4] uppercase tracking-wider block">
                CORPORATE & STARTUPS
              </span>
              <h3 className="text-xl font-extrabold text-[#171717]">{businessCol.title}</h3>
              <p className="text-xs text-[#6F6A63] leading-relaxed">{businessCol.description}</p>
            </div>

            <div className="my-4 aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={businessCol.thumbnailUrl || FALLBACK_IMAGE_DATA_URL}
                alt={businessCol.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-xs text-[#6F6A63] font-medium">{businessCol.assetCount}+ Decks</span>
              <Link href={`/assets?category=Business`} className="text-xs font-bold text-[#6D28D9] hover:underline">
                Explore Business Kits →
              </Link>
            </div>
          </motion.div>

          {/* 4. Small Card: Wedding Season (Spans 4 cols) */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="md:col-span-4 bg-white rounded-3xl p-6 border border-[rgba(23,23,23,0.12)] shadow-xs flex flex-col justify-between group min-h-[340px]"
          >
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-[#6D28D9] uppercase tracking-wider block">
                ROYAL CELEBRATIONS
              </span>
              <h3 className="text-xl font-extrabold text-[#171717]">{weddingCol.title}</h3>
              <p className="text-xs text-[#6F6A63] leading-relaxed">{weddingCol.description}</p>
            </div>

            <div className="my-4 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={weddingCol.thumbnailUrl || FALLBACK_IMAGE_DATA_URL}
                alt={weddingCol.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-xs text-[#6F6A63] font-medium">{weddingCol.assetCount}+ Cards</span>
              <Link href={`/assets?category=Wedding`} className="text-xs font-bold text-[#6D28D9] hover:underline">
                Explore Wedding Suite →
              </Link>
            </div>
          </motion.div>

          {/* 5. Small Card: Food & Restaurant (Spans 4 cols) */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="md:col-span-4 bg-white rounded-3xl p-6 border border-[rgba(23,23,23,0.12)] shadow-xs flex flex-col justify-between group min-h-[340px]"
          >
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-amber-600 uppercase tracking-wider block">
                MENUS & CAFE ADS
              </span>
              <h3 className="text-xl font-extrabold text-[#171717]">{foodCol.title}</h3>
              <p className="text-xs text-[#6F6A63] leading-relaxed">{foodCol.description}</p>
            </div>

            <div className="my-4 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={foodCol.thumbnailUrl || FALLBACK_IMAGE_DATA_URL}
                alt={foodCol.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-xs text-[#6F6A63] font-medium">{foodCol.assetCount}+ Menu Designs</span>
              <Link href={`/assets?category=Food+%26+Restaurant`} className="text-xs font-bold text-[#6D28D9] hover:underline">
                Explore Food Kits →
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
