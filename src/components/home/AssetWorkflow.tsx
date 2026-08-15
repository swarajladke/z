"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Smartphone, Image, Tv, Monitor, CheckCircle2, Layers } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { FALLBACK_IMAGE_DATA_URL } from "@/lib/utils";

const WORKFLOW_FORMATS = [
  { id: "post", name: "Instagram Post", ratio: "1:1 Square", aspect: "aspect-[1/1]", icon: Smartphone, image: MOCK_PRODUCTS[0]?.thumbnailUrl },
  { id: "story", name: "Instagram Story", ratio: "9:16 Vertical", aspect: "aspect-[9/16]", icon: Smartphone, image: MOCK_PRODUCTS[1]?.thumbnailUrl },
  { id: "poster", name: "Print Poster", ratio: "3:4 A3 Print", aspect: "aspect-[3/4]", icon: Image, image: MOCK_PRODUCTS[6]?.thumbnailUrl },
  { id: "youtube", name: "YouTube Thumbnail", ratio: "16:9 HD", aspect: "aspect-[16/9]", icon: Tv, image: MOCK_PRODUCTS[5]?.thumbnailUrl },
  { id: "banner", name: "Store Header", ratio: "21:9 Wide Web", aspect: "aspect-[21/9]", icon: Monitor, image: MOCK_PRODUCTS[3]?.thumbnailUrl },
];

export const AssetWorkflow: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeFormat, setActiveFormat] = useState("post");
  const sampleProduct = MOCK_PRODUCTS[0];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="py-20 bg-[#F5F2EC] border-b border-[rgba(23,23,23,0.12)] text-[#171717]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#6D28D9]">
            Campaign Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            From asset to a complete campaign.
          </h2>
          <p className="text-sm sm:text-base text-[#6F6A63] leading-relaxed max-w-2xl mx-auto">
            Transform one master source file into Instagram posts, stories, print posters, YouTube thumbnails and store banners.
          </p>
        </div>

        {/* Visually Connected 4 Steps (Choose → Customize → Export → Publish) */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-[rgba(23,23,23,0.12)] -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            {[
              { step: "01", title: "Choose Asset", desc: "Select coordinated master PSD or Canva template" },
              { step: "02", title: "Customize", desc: "Edit text, colors & brand logos in minutes" },
              { step: "03", title: "Export", desc: "Download CMYK print files or Web PNGs" },
              { step: "04", title: "Publish", desc: "Launch social ads & multi-channel graphics" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-[rgba(23,23,23,0.12)] space-y-1.5 shadow-2xs hover:border-[#6D28D9] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#6D28D9] bg-violet-50 px-2.5 py-0.5 rounded-full border border-violet-100">
                    Step {item.step}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <h4 className="font-extrabold text-sm text-[#171717]">{item.title}</h4>
                <p className="text-xs text-[#6F6A63] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Coordinated Campaign Wall Box */}
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true }}
          variants={containerVariants}
          className="bg-[#171717] text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs text-cyan-400 font-extrabold uppercase tracking-wider block">
                ONE SOURCE FILE • 5 CAMPAIGN FORMATS
              </span>
              <h3 className="text-xl font-bold text-white mt-1">{sampleProduct.title}</h3>
            </div>

            {/* Format Selector Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {WORKFLOW_FORMATS.map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => setActiveFormat(fmt.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeFormat === fmt.id
                      ? "bg-[#6D28D9] text-white shadow-xs"
                      : "bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
                  }`}
                >
                  {fmt.name}
                </button>
              ))}
            </div>
          </div>

          {/* Staggered Format Campaign Grid Wall */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Main Interactive Format Preview Canvas (Spans 8 cols) */}
            <div className="md:col-span-8 relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
              <img
                src={WORKFLOW_FORMATS.find((f) => f.id === activeFormat)?.image || sampleProduct.thumbnailUrl || FALLBACK_IMAGE_DATA_URL}
                alt="Campaign format preview"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                }}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute bottom-4 right-4 bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs text-cyan-300 font-bold border border-slate-800 flex items-center gap-1.5">
                <span>Active Format: <strong>{WORKFLOW_FORMATS.find((f) => f.id === activeFormat)?.name}</strong></span>
                <span className="text-slate-400">({WORKFLOW_FORMATS.find((f) => f.id === activeFormat)?.ratio})</span>
              </div>
            </div>

            {/* Side Coordinated Format Miniatures (Spans 4 cols) */}
            <div className="md:col-span-4 grid grid-cols-2 gap-3">
              {WORKFLOW_FORMATS.map((fmt) => (
                <motion.div
                  key={fmt.id}
                  variants={itemVariants}
                  onClick={() => setActiveFormat(fmt.id)}
                  className={`relative p-2.5 rounded-xl border cursor-pointer transition-all ${
                    activeFormat === fmt.id
                      ? "border-cyan-400 bg-slate-900 ring-2 ring-cyan-400/20"
                      : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                  }`}
                >
                  <div className={`relative w-full ${fmt.aspect} rounded-lg overflow-hidden bg-slate-900 mb-1.5`}>
                    <img
                      src={fmt.image || FALLBACK_IMAGE_DATA_URL}
                      alt={fmt.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-[11px] font-extrabold text-white truncate">{fmt.name}</div>
                  <div className="text-[10px] text-slate-400">{fmt.ratio}</div>
                </motion.div>
              ))}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
