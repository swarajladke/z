"use client";

import React from "react";
import Link from "next/link";
import { Download, ArrowRight } from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { ProductCard } from "@/components/product/ProductCard";

export const FreeAssetsCarousel: React.FC = () => {
  const freeProducts = MOCK_PRODUCTS.filter((p) => p.isFree).slice(0, 4);

  return (
    <section className="py-16 bg-emerald-950/20 border-y border-emerald-900/20 bg-dot-pattern">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
              <Download className="w-4 h-4 text-emerald-600" />
              100% Free Asset Vault
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Free Downloads for Indian Creators
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              High-resolution vector artwork, Rangoli designs, and festival PNGs free to download.
            </p>
          </div>

          <Link
            href="/assets?filter=free"
            className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline shrink-0"
          >
            Explore all free assets <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {freeProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
};
