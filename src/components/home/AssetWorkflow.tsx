"use client";

import React, { useState } from "react";
import { Monitor, Smartphone, Image, Tv } from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { FALLBACK_IMAGE_DATA_URL } from "@/lib/utils";

const WORKFLOW_FORMATS = [
  { id: "post", name: "Instagram Post", ratio: "1:1 Square", icon: Smartphone },
  { id: "story", name: "Instagram Story", ratio: "9:16 Vertical", icon: Smartphone },
  { id: "poster", name: "Print Poster", ratio: "A3 / Print", icon: Image },
  { id: "youtube", name: "YouTube Thumbnail", ratio: "16:9 HD", icon: Tv },
  { id: "banner", name: "Store Header", ratio: "Wide Web Banner", icon: Monitor },
];

export const AssetWorkflow: React.FC = () => {
  const [activeFormat, setActiveFormat] = useState("post");
  const sampleProduct = MOCK_PRODUCTS[0];

  return (
    <section className="py-20 bg-[#F5F2EC] border-b border-[rgba(23,23,23,0.12)] text-[#171717]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#6D28D9]">
            Campaign Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            From one asset to a complete campaign.
          </h2>
          <p className="text-sm sm:text-base text-[#6F6A63] leading-relaxed max-w-2xl mx-auto">
            Choose a design, customize typography, export high-res files, and publish across every marketing channel.
          </p>
        </div>

        {/* Workflow Steps Indicator */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { step: "01", title: "Choose Asset", desc: "Select coordinated PSD or Canva templates" },
            { step: "02", title: "Customize", desc: "Edit text, colors & brand logos in minutes" },
            { step: "03", title: "Export", desc: "Download print-ready CMYK or Web PNGs" },
            { step: "04", title: "Publish", desc: "Launch social ads & campaign graphics" },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#FCFAF6] border border-[rgba(23,23,23,0.12)] space-y-1">
              <span className="text-xs font-black text-[#6D28D9]">{item.step}</span>
              <h4 className="font-extrabold text-xs text-[#171717]">{item.title}</h4>
              <p className="text-[11px] text-[#6F6A63]">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Format Selector Preview Box */}
        <div className="bg-[#171717] text-white rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] text-cyan-400 font-extrabold uppercase tracking-wider block">
                ONE SOURCE FILE • ALL FORMATS
              </span>
              <h3 className="text-xl font-bold text-white">{sampleProduct.title}</h3>
            </div>

            {/* Format Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {WORKFLOW_FORMATS.map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => setActiveFormat(fmt.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                    activeFormat === fmt.id
                      ? "bg-[#6D28D9] text-white shadow-xs"
                      : "bg-slate-900 text-slate-300 hover:text-white"
                  }`}
                >
                  {fmt.name}
                </button>
              ))}
            </div>
          </div>

          {/* Adapted Canvas Preview */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
            <img
              src={sampleProduct.thumbnailUrl || FALLBACK_IMAGE_DATA_URL}
              alt={sampleProduct.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs text-cyan-300 font-bold border border-slate-800">
              Format: {WORKFLOW_FORMATS.find((f) => f.id === activeFormat)?.name} ({WORKFLOW_FORMATS.find((f) => f.id === activeFormat)?.ratio})
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
