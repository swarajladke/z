"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { ProductCard } from "@/components/product/ProductCard";

export const ExploreAssets: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"featured" | "latest" | "popular" | "free" | "premium">("featured");

  const getFilteredProducts = () => {
    switch (activeTab) {
      case "featured":
        return MOCK_PRODUCTS.slice(0, 10);
      case "latest":
        return MOCK_PRODUCTS.filter((p) => p.isNew || p.id === "prod-1" || p.id === "prod-6").slice(0, 10);
      case "popular":
        return MOCK_PRODUCTS.filter((p) => p.isBestSeller).slice(0, 10);
      case "free":
        return MOCK_PRODUCTS.filter((p) => p.isFree).slice(0, 10);
      case "premium":
        return MOCK_PRODUCTS.filter((p) => p.isPremium).slice(0, 10);
      default:
        return MOCK_PRODUCTS.slice(0, 10);
    }
  };

  const displayedProducts = getFilteredProducts();

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-violet-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-cyan-600" />
              Curated Catalog
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore creative assets
            </h2>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Filter Tabs */}
            <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-xs flex items-center gap-1">
              {[
                { id: "featured", label: "Featured" },
                { id: "latest", label: "Latest" },
                { id: "popular", label: "Popular" },
                { id: "free", label: "Free" },
                { id: "premium", label: "Premium" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? "bg-violet-700 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <Link
              href="/assets"
              className="text-xs sm:text-sm font-bold text-violet-700 hover:text-violet-800 flex items-center gap-1 hover:underline ml-auto md:ml-0"
            >
              View all assets <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Responsive Product Grid: 5 cols LG, 4 cols MD, 3 cols SM/Tablet, 2 cols Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
