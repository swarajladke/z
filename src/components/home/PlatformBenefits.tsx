"use client";

import React from "react";
import { Sparkles, Layers, ShieldCheck, Zap } from "lucide-react";

export const PlatformBenefits: React.FC = () => {
  const benefits = [
    {
      icon: Sparkles,
      title: "Original creative assets",
      desc: "Designed and sold directly by KalaStock. No generic stolen web templates.",
      color: "text-violet-600 bg-violet-50 border-violet-200",
    },
    {
      icon: Layers,
      title: "Fully editable files",
      desc: "Download organized, production-ready source files in PSD, Canva, AI, EPS & SVG.",
      color: "text-cyan-600 bg-cyan-50 border-cyan-200",
    },
    {
      icon: ShieldCheck,
      title: "Clear commercial licenses",
      desc: "Understand exactly where and how every asset can be used for your client work.",
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    {
      icon: Zap,
      title: "Instant access",
      desc: "Access purchased files anytime from your secure customer download library.",
      color: "text-amber-600 bg-amber-50 border-amber-200",
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why Indian creators choose KalaStock
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-2">
            Built from the ground up to solve real design and agency workflows in India.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item) => (
            <div
              key={item.title}
              className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">{item.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
