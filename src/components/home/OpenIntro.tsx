"use client";

import React, { useState } from "react";
import Link from "next/link";

const INTRO_CATEGORIES = [
  { id: "Social", label: "Social", slug: "Social+Media" },
  { id: "Festivals", label: "Festivals", slug: "Festival+Designs" },
  { id: "Business", label: "Business", slug: "Business" },
  { id: "Wedding", label: "Wedding", slug: "Wedding" },
  { id: "Food", label: "Food", slug: "Food+%26+Restaurant" },
  { id: "YouTube", label: "YouTube", slug: "YouTube" },
];

export const OpenIntro: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("Social");

  return (
    <section className="py-20 bg-[#F5F2EC] text-[#171717] border-b border-[rgba(23,23,23,0.12)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#6D28D9]">
            Coordinated Creative Assets
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171717] tracking-tight leading-tight">
            One place to create campaigns that feel complete.
          </h2>
          <p className="text-sm sm:text-base text-[#6F6A63] leading-relaxed max-w-2xl mx-auto font-normal">
            Find coordinated templates, vectors and editable source files for every channel.
          </p>
        </div>

        {/* Compact Category Switcher Pills */}
        <div className="inline-flex items-center gap-2 flex-wrap justify-center p-1.5 bg-[#FCFAF6] border border-[rgba(23,23,23,0.12)] rounded-2xl shadow-2xs">
          {INTRO_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/assets?category=${cat.slug}`}
              onMouseEnter={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                activeCategory === cat.id
                  ? "bg-[#6D28D9] text-white shadow-xs"
                  : "text-[#6F6A63] hover:text-[#171717]"
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
