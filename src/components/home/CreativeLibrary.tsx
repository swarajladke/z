"use client";

import React from "react";
import { HardDrive, FolderHeart, History, ShieldCheck, Zap, Users } from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { FALLBACK_IMAGE_DATA_URL } from "@/lib/utils";

export const CreativeLibrary: React.FC = () => {
  const sampleProduct = MOCK_PRODUCTS[0];

  const features = [
    { icon: HardDrive, title: "Editable Source Files", desc: "PSD, AI, SVG, PNG & Canva" },
    { icon: FolderHeart, title: "Saved Collections", desc: "Organize project shortlists" },
    { icon: History, title: "Download History", desc: "Unlimited re-downloads anytime" },
    { icon: ShieldCheck, title: "License Certificates", desc: "Verified commercial PDF records" },
    { icon: Zap, title: "Product Updates", desc: "Free updates on bought items" },
    { icon: Users, title: "Team Seat Access", desc: "Collaborate across agency teams" },
  ];

  return (
    <section className="py-20 bg-[#171717] text-white border-b border-slate-800 bg-dot-pattern-dark">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">
            Digital Asset Workspace
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Everything your creative workflow needs.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            Manage downloads, license records, project shortlists, and source files in one centralized library.
          </p>
        </div>

        {/* Large Creative-Library Preview Composition */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Artwork Composition Left */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
                <img
                  src={sampleProduct.thumbnailUrl || FALLBACK_IMAGE_DATA_URL}
                  alt="Creative library interface"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                  }}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-cyan-400 border border-slate-800">
                  ⚡ Unlimited Vault Access
                </div>
              </div>
            </div>

            {/* Feature Points Grid Right */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feat, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-cyan-400 flex items-center justify-center font-bold">
                    <feat.icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-extrabold text-xs text-white">{feat.title}</h4>
                  <p className="text-[11px] text-slate-400">{feat.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
