"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { FALLBACK_IMAGE_DATA_URL } from "@/lib/utils";

const SHOWCASE_ITEMS = [
  {
    title: "Diwali Sale Campaign Graphic",
    industry: "E-Commerce & Retail",
    assetsUsed: "Diwali Festival Banner & Post Kit",
    image: MOCK_PRODUCTS[6]?.thumbnailUrl || FALLBACK_IMAGE_DATA_URL,
    slug: MOCK_PRODUCTS[6]?.slug || "diwali-festival-banner-kit",
  },
  {
    title: "15th August Celebration Post",
    industry: "Corporate & Social Media",
    assetsUsed: "Independence Day Social Media Pack",
    image: MOCK_PRODUCTS[0]?.thumbnailUrl || FALLBACK_IMAGE_DATA_URL,
    slug: MOCK_PRODUCTS[0]?.slug || "independence-day-social-media-pack",
  },
  {
    title: "Haldi & Shadi Invitation Card",
    industry: "Wedding & Events",
    assetsUsed: "Indian Wedding Invitation Collection",
    image: MOCK_PRODUCTS[2]?.thumbnailUrl || FALLBACK_IMAGE_DATA_URL,
    slug: MOCK_PRODUCTS[2]?.slug || "indian-wedding-invitation-collection",
  },
];

export const MadeWithKalaStock: React.FC = () => {
  return (
    <section className="py-20 bg-[#FCFAF6] border-b border-[rgba(23,23,23,0.12)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#6D28D9] block mb-2">
              Creative Gallery
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#171717] tracking-tight">
              Made with KalaStock
            </h2>
            <p className="text-sm text-[#6F6A63] mt-1">
              Explore finished campaigns created using source assets from our catalog.
            </p>
          </div>

          <Link
            href="/assets"
            className="text-xs font-bold text-[#6D28D9] hover:underline flex items-center gap-1 shrink-0"
          >
            Browse all templates <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Showcase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SHOWCASE_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-[rgba(23,23,23,0.12)] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                    }}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#171717]/90 backdrop-blur-xs text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md">
                    {item.industry}
                  </span>
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="font-extrabold text-[#171717] text-base">{item.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#6F6A63]">
                    <Layers className="w-3.5 h-3.5 text-[#6D28D9]" />
                    <span>Assets: <strong>{item.assetsUsed}</strong></span>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100">
                <Link
                  href={`/product/${item.slug}`}
                  className="text-xs font-bold text-[#6D28D9] hover:underline inline-flex items-center gap-1"
                >
                  View Collection Assets →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
