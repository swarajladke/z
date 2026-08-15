"use client";

import React from "react";
import { Sparkles, Layers, ShieldCheck, Download } from "lucide-react";

export const PlatformBenefits: React.FC = () => {
  const benefits = [
    {
      icon: Sparkles,
      title: "Original Creative Assets",
      desc: "Thoughtfully designed for Indian festivals, regional brands, celebrations and everyday marketing campaigns.",
    },
    {
      icon: Layers,
      title: "Fully Editable Source Files",
      desc: "Includes layered Photoshop PSDs, Figma UI components, vectors, transparent PNGs and Canva editable links.",
    },
    {
      icon: ShieldCheck,
      title: "Clear Commercial Licenses",
      desc: "Use assets freely in client agency graphics, Instagram ads, broadcast videos, menus and print packaging.",
    },
    {
      icon: Download,
      title: "Instant Account Access",
      desc: "Files are instantly unlocked in your personal digital vault after checkout. No delays, no waiting.",
    },
  ];

  return (
    <section className="py-20 bg-[#F5F2EC] border-b border-[rgba(23,23,23,0.12)] text-[#171717]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left 1 Introduction Column */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#6D28D9]">
              Why Choose KalaStock
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Designed for creators who value quality and speed.
            </h2>
            <p className="text-sm text-[#6F6A63] leading-relaxed">
              We eliminate template chaos with curated source files ready to edit and publish immediately.
            </p>
          </div>

          {/* Right 4 Open Benefit Items with Thin Dividers */}
          <div className="lg:col-span-7 divide-y divide-[rgba(23,23,23,0.12)]">
            {benefits.map((item, idx) => (
              <div key={idx} className="py-6 first:pt-0 last:pb-0 flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white border border-[rgba(23,23,23,0.12)] text-[#6D28D9] flex items-center justify-center font-extrabold shrink-0 shadow-2xs">
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-base text-[#171717]">{item.title}</h3>
                  <p className="text-xs text-[#6F6A63] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
