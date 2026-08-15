"use client";

import React from "react";
import Link from "next/link";
import { Download, Gift, ArrowRight } from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { useCart } from "@/context/CartContext";

export const FreeAssetsCarousel: React.FC = () => {
  const { addToCart } = useCart();
  const freeProducts = MOCK_PRODUCTS.filter((p) => p.isFree);

  return (
    <section className="py-16 bg-emerald-950 text-white relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Gift className="w-4 h-4" />
              100% Free Resources
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Start creating for free
            </h2>
            <p className="text-emerald-200/80 text-xs sm:text-sm mt-1">
              No subscription required. Download high quality vectors, PNGs, and templates instantly.
            </p>
          </div>

          <Link
            href="/assets?filter=free"
            className="text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 hover:underline"
          >
            Explore all free assets <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Free Asset Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {freeProducts.map((product) => (
            <div
              key={product.id}
              className="bg-emerald-900/40 border border-emerald-700/50 rounded-2xl p-4 hover:border-emerald-400 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-16/10 rounded-xl overflow-hidden mb-3 bg-emerald-950">
                  <img
                    src={product.thumbnailUrl}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 bg-emerald-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                    FREE DOWNLOAD
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-emerald-300 mb-1 font-medium">
                  <span>{product.category}</span>
                  <span>•</span>
                  <span className="uppercase font-bold">{product.fileFormats.join(", ")}</span>
                </div>

                <h3 className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">
                  {product.title}
                </h3>

                <p className="text-emerald-200/70 text-xs mt-1 line-clamp-2">
                  {product.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-emerald-800/80 flex items-center justify-between">
                <span className="text-xs text-emerald-300/80">
                  {product.downloadCount.toLocaleString()} downloads
                </span>

                <button
                  onClick={() => addToCart(product)}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-900/50"
                >
                  <Download className="w-3.5 h-3.5" />
                  Free Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
