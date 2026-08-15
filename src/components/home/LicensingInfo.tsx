"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Check } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand.config";

export const LicensingInfo: React.FC = () => {
  return (
    <section id="licensing" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Licensing Context */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-violet-700 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-cyan-600" />
              Clear & Transparent Licensing
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Simple licenses for Indian agencies, freelancers & creators
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed">
              Every digital asset on {BRAND_CONFIG.name} comes with lifetime commercial usage rights. Use them in client social media graphics, YouTube videos, print ads, and brand packaging with complete peace of mind.
            </p>

            <div className="space-y-3 pt-2">
              {[
                { title: "Personal License (1x)", desc: "Ideal for personal projects, portfolios and individual social accounts." },
                { title: "Commercial License (1.5x)", desc: "Perfect for agency client work, Instagram ads, food menus & YouTube." },
                { title: "Extended Commercial (2.5x)", desc: "For mass merchandise, OTT video broadcast, and TV commercial ads." },
              ].map((lic, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs">{lic.title}</h4>
                    <p className="text-slate-500 text-xs mt-0.5">{lic.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual License Comparison Box */}
          <div className="lg:col-span-6 bg-slate-950 text-white p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] text-cyan-400 font-extrabold uppercase tracking-wider block">
                  COMMERCIAL ASSURANCE
                </span>
                <h3 className="font-extrabold text-lg text-white">What You Can & Cannot Do</h3>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                Verified Single-Seller Assets
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <span className="font-extrabold text-emerald-400 block uppercase tracking-wider text-[10px]">
                  ✓ Allowed Usage
                </span>
                <ul className="space-y-2 text-slate-300">
                  <li>• Client social media posts</li>
                  <li>• Client branding & logos</li>
                  <li>• YouTube & Instagram reels</li>
                  <li>• Print menus & posters</li>
                </ul>
              </div>

              <div className="space-y-2 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <span className="font-extrabold text-rose-400 block uppercase tracking-wider text-[10px]">
                  ✕ Prohibited Usage
                </span>
                <ul className="space-y-2 text-slate-400">
                  <li>• Re-selling raw PSD/Canva links</li>
                  <li>• Uploading to other stock sites</li>
                  <li>• Claiming raw vectors as original</li>
                  <li>• Redistribution in open drives</li>
                </ul>
              </div>
            </div>

            <div className="pt-2 text-center text-xs text-slate-400">
              Need custom enterprise licensing?{" "}
              <Link href="/assets" className="text-cyan-400 font-bold hover:underline">
                Explore catalog →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
