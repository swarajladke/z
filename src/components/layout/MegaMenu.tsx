"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Layers, Flame, Gift, Package, ArrowRight } from "lucide-react";

interface MegaMenuProps {
  onClose?: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ onClose }) => {
  return (
    <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl py-8 px-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Asset Types */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            <Layers className="w-4 h-4 text-violet-600" />
            Asset Types
          </div>
          <ul className="space-y-2.5">
            {[
              { name: "Social Media Templates", href: "/assets?assetType=Template&category=social-media" },
              { name: "Print Templates", href: "/assets?assetType=Template&category=business" },
              { name: "Presentation Templates", href: "/assets?assetType=Presentation" },
              { name: "Vectors & Line Art", href: "/assets?assetType=Vector" },
              { name: "PNG Graphics (Transparent)", href: "/assets?assetType=PNG" },
              { name: "3D Icons & Glyphs", href: "/assets?assetType=Icon" },
              { name: "Display & Serif Fonts", href: "/assets?assetType=Font" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="text-sm font-medium text-slate-700 hover:text-violet-700 hover:translate-x-1 transition-all flex items-center justify-between group"
                >
                  <span>{item.name}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-violet-600">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Popular Topics */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            <Flame className="w-4 h-4 text-cyan-600" />
            Popular Topics
          </div>
          <ul className="space-y-2.5">
            {[
              { name: "Indian Festivals (Independence Day, Diwali)", href: "/assets?category=festival-designs" },
              { name: "Business & Pitch Decks", href: "/assets?category=business" },
              { name: "Food & Restaurant Menus", href: "/assets?category=food-restaurant" },
              { name: "Royal Wedding Cards", href: "/assets?category=wedding" },
              { name: "Education & Course Slides", href: "/assets?category=presentations" },
              { name: "Marketing & Ad Creatives", href: "/assets?category=social-media" },
              { name: "YouTube Thumbnails & Banners", href: "/assets?category=youtube" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="text-sm font-medium text-slate-700 hover:text-cyan-700 hover:translate-x-1 transition-all flex items-center justify-between group"
                >
                  <span>{item.name}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-600">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Featured Collections */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Featured
          </div>
          <ul className="space-y-2.5">
            {[
              { name: "New Releases", badge: "Fresh", href: "/assets?filter=new" },
              { name: "Free Assets Library", badge: "Free", href: "/assets?filter=free" },
              { name: "Premium Mega Bundles", badge: "Save 50%", href: "/assets?assetType=Bundle" },
              { name: "Best Sellers (Most Popular)", badge: "Top Rated", href: "/assets?filter=bestseller" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="text-sm font-medium text-slate-700 hover:text-emerald-700 flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <span>{item.name}</span>
                  <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Promotional Spotlight */}
        <div className="bg-gradient-to-br from-violet-900 to-slate-900 rounded-xl p-5 text-white flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-violet-600/30 rounded-full blur-2xl group-hover:bg-violet-600/50 transition-all" />
          <div>
            <div className="inline-flex items-center gap-1 bg-cyan-500/20 text-cyan-300 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-cyan-400/30 mb-3">
              <Package className="w-3.5 h-3.5" />
              Limited-Time Bundle
            </div>
            <h4 className="font-semibold text-base mb-1 text-white">Indian Festival Design Mega Pack</h4>
            <p className="text-slate-300 text-xs line-clamp-2">
              Over 250+ PSD, Canva, AI & SVG files for 15+ Indian festivals.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 line-through mr-1.5">₹1,499</span>
              <span className="text-lg font-bold text-cyan-400">₹799</span>
            </div>
            <Link
              href="/product/indian-festival-design-mega-pack"
              onClick={onClose}
              className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors flex items-center gap-1 shadow-md shadow-violet-900/50"
            >
              View Bundle <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
