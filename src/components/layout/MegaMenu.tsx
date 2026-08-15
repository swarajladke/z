"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Layers,
  Calendar,
  HeartHandshake,
  Utensils,
  Briefcase,
  Video,
  Image as ImageIcon,
  Type,
  Layout,
  Download,
  ArrowRight,
} from "lucide-react";

interface MegaMenuProps {
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ onClose }) => {
  const categories = [
    { title: "Social Media Templates", slug: "Social+Media", count: "1,240+", icon: Layers, desc: "Instagram posts, reels, carousel & ads" },
    { title: "Festival Designs & Rangoli", slug: "Festival+Designs", count: "850+", icon: Calendar, desc: "Diwali, 15th August, Rakhi & Holi" },
    { title: "Indian Wedding Collection", slug: "Wedding", count: "420+", icon: HeartHandshake, desc: "Haldi, Mehendi, Sangeet & Shadi cards" },
    { title: "Food & Restaurant Branding", slug: "Food+%26+Restaurant", count: "310+", icon: Utensils, desc: "Menus, cafe stories & delivery ads" },
    { title: "Business & Corporate Kits", slug: "Business", count: "540+", icon: Briefcase, desc: "Pitch decks, brochures & flyers" },
    { title: "YouTube Channel Packs", slug: "YouTube", count: "290+", icon: Video, desc: "Thumbnails, channel art & intros" },
  ];

  const assetTypes = [
    { title: "Photoshop PSDs", type: "PSD", icon: ImageIcon },
    { title: "Canva Edit Links", type: "Canva", icon: Layout },
    { title: "Mandala & SVG Vectors", type: "Vector", icon: Sparkles },
    { title: "Transparent PNGs", type: "PNG", icon: Download },
    { title: "Display Serif Fonts", type: "Font", icon: Type },
    { title: "Presentation Decks", type: "Presentation", icon: Layout },
  ];

  return (
    <div className="absolute top-full left-0 w-[780px] bg-[#FCFAF6] rounded-3xl border border-[rgba(23,23,23,0.12)] shadow-2xl p-6 text-xs text-slate-800 z-50 animate-in fade-in duration-150">
      <div className="grid grid-cols-12 gap-6">
        
        {/* Industry Categories */}
        <div className="col-span-7 space-y-3 border-r border-slate-200/80 pr-6">
          <div className="flex items-center justify-between text-[10px] font-black uppercase text-[#6D28D9] tracking-wider">
            <span>By Industry & Use-Case</span>
            <span>2,500+ Assets</span>
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/assets?category=${cat.slug}`}
                onClick={onClose}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-white hover:shadow-2xs transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-violet-50 text-[#6D28D9] flex items-center justify-center shrink-0 group-hover:bg-[#6D28D9] group-hover:text-white transition-colors">
                  <cat.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-slate-900 group-hover:text-[#6D28D9] transition-colors flex items-center justify-between">
                    <span>{cat.title}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{cat.count}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-normal truncate">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Source File Formats */}
        <div className="col-span-5 space-y-4">
          <div className="text-[10px] font-black uppercase text-[#6D28D9] tracking-wider">
            By Source Format
          </div>

          <div className="space-y-1">
            {assetTypes.map((item) => (
              <Link
                key={item.type}
                href={`/assets?format=${item.type}`}
                onClick={onClose}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-white hover:shadow-2xs transition-all text-slate-700 hover:text-[#6D28D9] font-bold"
              >
                <div className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-slate-400" />
                  <span>{item.title}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200/80">
            <Link
              href="/assets?filter=free"
              onClick={onClose}
              className="block p-3 rounded-2xl bg-emerald-50 text-emerald-800 font-extrabold border border-emerald-200/80 hover:bg-emerald-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span>Free Downloads Vault</span>
                <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full">FREE</span>
              </div>
              <p className="text-[10px] font-normal text-emerald-700 mt-0.5">Vector mandalas & PNG graphics</p>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
