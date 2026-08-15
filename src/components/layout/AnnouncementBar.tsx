"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, X, ArrowRight } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand.config";

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800 relative transition-all">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 mx-auto">
          <span className="inline-flex items-center gap-1 bg-violet-600/30 text-violet-300 px-2 py-0.5 rounded-full font-medium text-[11px] border border-violet-500/30">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            Announcement
          </span>
          <span className="text-slate-200 hidden sm:inline">{BRAND_CONFIG.announcement}</span>
          <span className="text-slate-200 sm:hidden">Explore new festival & creative bundles</span>
          <Link
            href="/assets?category=festival-designs"
            className="inline-flex items-center gap-1 text-cyan-400 font-semibold hover:text-cyan-300 transition-colors ml-1 underline decoration-cyan-400/40 hover:decoration-cyan-300"
          >
            Explore now <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-white transition-colors p-0.5 rounded-md hover:bg-slate-800"
          aria-label="Close announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
