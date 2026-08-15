"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Download, CheckCircle2 } from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { FALLBACK_IMAGE_DATA_URL } from "@/lib/utils";

export const BentoDiscovery: React.FC = () => {
  const sampleProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <section className="py-20 bg-[#FCFAF6] border-b border-[rgba(23,23,23,0.12)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-2xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#6D28D9] block mb-2">
            Asymmetric Discovery
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#171717] tracking-tight">
            Start with an asset. Build the whole campaign.
          </h2>
          <p className="text-sm text-[#6F6A63] mt-2 leading-relaxed">
            Coordinated source files built for posts, stories, pitch decks and print packaging.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Large Item 1: Everything for your next campaign */}
          <div className="md:col-span-8 bg-[#171717] text-white rounded-3xl p-8 border border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-3 z-10 max-w-md">
              <span className="bg-[#6D28D9] text-white text-xs font-extrabold uppercase px-3 py-1 rounded-md tracking-wider">
                FEATURED WORKFLOW
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Everything for your next campaign
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Layered Photoshop PSD files and instant Canva template links designed for high CTR performance.
              </p>
            </div>

            <div className="mt-8 relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
              <img
                src={sampleProducts[0]?.thumbnailUrl || FALLBACK_IMAGE_DATA_URL}
                alt="Campaign template mockup"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                }}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>

            <div className="mt-6 flex items-center justify-between z-10 pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-300 font-semibold">15 PSDs + Canva Editable Links</span>
              <Link
                href="/assets"
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 hover:-translate-y-[1px]"
              >
                Explore Campaign Kits →
              </Link>
            </div>
          </div>

          {/* Medium Item 2: Festival-ready design packs */}
          <div className="md:col-span-4 bg-white rounded-3xl p-6 border border-[rgba(23,23,23,0.12)] shadow-xs flex flex-col justify-between group">
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-[#6D28D9] uppercase tracking-wider block">
                FESTIVAL SPECIALS
              </span>
              <h3 className="text-xl font-bold text-[#171717]">Festival-ready design packs</h3>
              <p className="text-xs text-[#6F6A63] leading-relaxed">
                Diwali, 15 August, Rakhi and wedding season creatives ready for instant download.
              </p>
            </div>

            <div className="my-6 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={sampleProducts[1]?.thumbnailUrl || FALLBACK_IMAGE_DATA_URL}
                alt="Festival design preview"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <Link href="/assets?category=Festival+Designs" className="text-xs font-bold text-[#6D28D9] hover:underline">
              Browse Festival Packs →
            </Link>
          </div>

          {/* Medium Item 3: One template, every format */}
          <div className="md:col-span-4 bg-[#0F172A] text-white rounded-3xl p-6 border border-slate-800 shadow-lg flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider block">
                MULTI-FORMAT ACCESS
              </span>
              <h3 className="text-xl font-bold text-white">One template, every format</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Open source PSDs, Figma UI kits, vectors, PNG elements and Canva links included in one seat.
              </p>
            </div>

            <div className="my-4 space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Photoshop PSD Layered Files</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Canva One-Click Link Access</span>
              </div>
            </div>
          </div>

          {/* Small Item 4: Commercial License Guaranteed */}
          <div className="md:col-span-4 bg-white rounded-3xl p-6 border border-[rgba(23,23,23,0.12)] shadow-xs flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-violet-50 text-[#6D28D9] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-[#171717]">Commercial Rights Included</h4>
                <p className="text-xs text-[#6F6A63]">Use in client ads & commercial YouTube videos.</p>
              </div>
            </div>
          </div>

          {/* Small Item 5: Instant Downloads */}
          <div className="md:col-span-4 bg-white rounded-3xl p-6 border border-[rgba(23,23,23,0.12)] shadow-xs flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-[#171717]">Instant File Access</h4>
                <p className="text-xs text-[#6F6A63]">Download ZIP files directly in your customer vault.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
