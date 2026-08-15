"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton";

type TabType = "featured" | "latest" | "popular" | "free" | "premium";

export const ExploreAssets: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<TabType>("featured");
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (tab: TabType) => {
    setIsLoading(true);
    setActiveTab(tab);
    setTimeout(() => setIsLoading(false), 200);
  };

  const getFilteredProducts = () => {
    switch (activeTab) {
      case "latest":
        return MOCK_PRODUCTS.filter((p) => p.isNew || p.id === "prod-1" || p.id === "prod-6");
      case "popular":
        return MOCK_PRODUCTS.filter((p) => p.isBestSeller || p.downloadCount > 1500);
      case "free":
        return MOCK_PRODUCTS.filter((p) => p.isFree);
      case "premium":
        return MOCK_PRODUCTS.filter((p) => !p.isFree);
      case "featured":
      default:
        return MOCK_PRODUCTS.slice(0, 12);
    }
  };

  const filteredProducts = getFilteredProducts();

  return (
    <section className="py-20 bg-[#FCFAF6] border-b border-[rgba(23,23,23,0.12)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[#6D28D9] text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#06B6D4]" />
              Digital Asset Catalog
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#171717] tracking-tight">
              Explore Fresh Creative Assets
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none bg-[#F5F2EC] p-1.5 rounded-2xl border border-[rgba(23,23,23,0.12)]">
            {[
              { id: "featured" as const, label: "Featured" },
              { id: "latest" as const, label: "Latest Drops" },
              { id: "popular" as const, label: "Popular" },
              { id: "free" as const, label: "Free Vault" },
              { id: "premium" as const, label: "Pro PSDs" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[#6D28D9] text-white shadow-xs"
                    : "text-[#6F6A63] hover:text-[#171717]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 5-6 Column Responsive Product Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {Array.from({ length: 12 }).map((_, idx) => (
                <ProductCardSkeleton key={idx} />
              ))}
            </div>
          ) : (
            <motion.div
              key={activeTab}
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4"
            >
              {filteredProducts.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFeatured={activeTab === "featured" && idx === 0}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* View Catalog Footer CTA */}
        <div className="text-center pt-4">
          <Link
            href="/assets"
            className="inline-flex items-center gap-2 bg-[#171717] hover:bg-[#6D28D9] text-white font-extrabold text-xs px-8 py-3.5 rounded-xl transition-all shadow-md hover:-translate-y-[1px] group"
          >
            <span>Browse All 2,500+ Assets</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-[3px] transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};
