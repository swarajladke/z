"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Layers,
  Calendar,
  HeartHandshake,
  Utensils,
  Briefcase,
  Video,
  Sparkles,
  Type,
} from "lucide-react";
import { FALLBACK_IMAGE_DATA_URL } from "@/lib/utils";

const CATEGORIES = [
  {
    id: "social-media",
    title: "Social Media Templates",
    count: "1,240+ assets",
    slug: "Social+Media",
    icon: Layers,
    thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "festival-designs",
    title: "Festival & Rangoli Packs",
    count: "850+ assets",
    slug: "Festival+Designs",
    icon: Calendar,
    thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "wedding",
    title: "Indian Wedding Suite",
    count: "420+ assets",
    slug: "Wedding",
    icon: HeartHandshake,
    thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "food-restaurant",
    title: "Food & Restaurant Branding",
    count: "310+ assets",
    slug: "Food+%26+Restaurant",
    icon: Utensils,
    thumbnail: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "business",
    title: "Business & Pitch Decks",
    count: "540+ assets",
    slug: "Business",
    icon: Briefcase,
    thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "youtube",
    title: "YouTube Channel Packs",
    count: "290+ assets",
    slug: "YouTube",
    icon: Video,
    thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "vectors",
    title: "Mandalas & SVG Vectors",
    count: "680+ assets",
    slug: "Vector",
    icon: Sparkles,
    thumbnail: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "fonts",
    title: "Heritage & Modern Fonts",
    count: "150+ assets",
    slug: "Font",
    icon: Type,
    thumbnail: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=600&q=80",
  },
];

export const CategoryShortcuts: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-[#F5F2EC] border-b border-[rgba(23,23,23,0.12)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header with Navigation Arrows */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#6D28D9] block mb-1">
              Browse by Asset Category
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#171717] tracking-tight">
              Curated for every creative workflow
            </h2>
          </div>

          {/* Accessible Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2.5 rounded-xl bg-white border border-[rgba(23,23,23,0.12)] text-[#171717] hover:bg-slate-100 hover:text-[#6D28D9] transition-colors shadow-2xs"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2.5 rounded-xl bg-white border border-[rgba(23,23,23,0.12)] text-[#171717] hover:bg-slate-100 hover:text-[#6D28D9] transition-colors shadow-2xs"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 25–35% Larger Category Cards with Touch Dragging & Snapping */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
        >
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/assets?category=${cat.slug}`}
              className="snap-start shrink-0 w-[280px] sm:w-[320px] bg-white rounded-2xl border border-[rgba(23,23,23,0.12)] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Prominent Aspect-[4/3] Thumbnail Box */}
              <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                <img
                  src={cat.thumbnail || FALLBACK_IMAGE_DATA_URL}
                  alt={cat.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#171717]/90 backdrop-blur-xs p-2 rounded-xl text-white shadow-md">
                  <cat.icon className="w-5 h-5 text-cyan-400" />
                </div>
              </div>

              {/* Card Label & Count (Minimum 12px text) */}
              <div className="p-5 space-y-1">
                <h3 className="font-extrabold text-[#171717] text-base group-hover:text-[#6D28D9] transition-colors">
                  {cat.title}
                </h3>
                <span className="text-xs font-semibold text-[#6F6A63] block">
                  {cat.count}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
