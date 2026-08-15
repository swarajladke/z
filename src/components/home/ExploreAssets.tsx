"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Flame, Sparkles, Star, Download, Zap } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { MOCK_PRODUCTS } from "@/data/mock-products";

type TabType = "featured" | "latest" | "popular" | "free" | "premium";

export const ExploreAssets: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("featured");

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    if (activeTab === "free") return product.isFree;
    if (activeTab === "premium") return !product.isFree;
    if (activeTab === "latest") return product.isNew;
    if (activeTab === "popular") return product.isBestSeller;
    return true; // featured shows all curated assets
  }).slice(0, 8);

  const tabs: { id: TabType; label: string; icon?: React.ElementType }[] = [
    { id: "featured", label: "Featured Assets", icon: Sparkles },
    { id: "popular", label: "Best Sellers", icon: Flame },
    { id: "latest", label: "New Releases", icon: Star },
    { id: "free", label: "Free Downloads", icon: Download },
    { id: "premium", label: "Premium Bundles", icon: Zap },
  ];

  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-violet-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-cyan-600" />
              Curated Asset Vault
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore Top Digital Assets
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              PSD templates, Canva links, vectors and 3D icons built for high conversion.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-violet-700 text-white shadow-md shadow-violet-200"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyan-300" : "text-slate-400"}`} />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/assets"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl transition-all shadow-md hover:shadow-lg"
          >
            Explore All 2,500+ Assets in Catalog
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </Link>
        </div>
      </div>
    </section>
  );
};
