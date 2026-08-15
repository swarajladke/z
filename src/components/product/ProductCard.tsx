"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useQuickPreview } from "@/context/QuickPreviewContext";
import { formatPaiseToINR, FALLBACK_IMAGE_DATA_URL } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const shouldReduceMotion = useReducedMotion();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { openQuickPreview } = useQuickPreview();

  const [imageError, setImageError] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const pricePaise = product.priceInPaise ?? Math.round(product.price * 100);

  // Single Primary Badge Resolution (Free > New > Best Seller > Bundle)
  const getPrimaryBadge = () => {
    if (product.isFree) return { label: "FREE DOWNLOAD", type: "free" };
    if (product.isNew) return { label: "NEW RELEASE", type: "new" };
    if (product.isBestSeller) return { label: "BEST SELLER", type: "bestseller" };
    if (product.isBundle) return { label: `${product.itemCount || "250+"} ASSETS BUNDLE`, type: "bundle" };
    return null;
  };

  const badge = getPrimaryBadge();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="group relative flex flex-col justify-between bg-white rounded-2xl border border-[rgba(23,23,23,0.12)] overflow-hidden shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Top Artwork Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
        <img
          src={imageError ? FALLBACK_IMAGE_DATA_URL : product.thumbnailUrl}
          alt={product.title}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-500"
        />

        {/* Strictly 1 Primary Badge inside Image Container */}
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`text-xs font-extrabold px-2.5 py-1 rounded-md shadow-xs uppercase tracking-wider ${
                badge.type === "free"
                  ? "bg-emerald-600 text-white"
                  : badge.type === "new"
                  ? "bg-cyan-500 text-slate-950"
                  : badge.type === "bestseller"
                  ? "bg-[#6D28D9] text-white"
                  : "bg-[#171717] text-amber-300"
              }`}
            >
              {badge.label}
            </span>
          </div>
        )}

        {/* Top-Right Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          aria-label="Save to wishlist"
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all ${
            inWishlist
              ? "bg-rose-500 text-white"
              : "bg-slate-900/60 text-white hover:bg-rose-600 opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
          }`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
        </button>

        {/* Quick Preview Slide-Up Overlay on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => openQuickPreview(product)}
            className="bg-white/90 hover:bg-white text-slate-900 text-xs font-extrabold px-4 py-2 rounded-xl backdrop-blur-xs transition-colors flex items-center gap-1.5 shadow-md hover:-translate-y-[1px]"
          >
            <Eye className="w-3.5 h-3.5 text-violet-700" />
            <span>Quick Preview</span>
          </button>
        </div>
      </div>

      {/* Card Body Content */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          {/* Category & Asset Type */}
          <div className="flex items-center justify-between text-xs text-[#6F6A63] font-semibold">
            <span className="truncate max-w-[140px]">{product.category}</span>
            <span className="uppercase text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
              {product.assetType}
            </span>
          </div>

          {/* Product Title (Truncated 2 lines without overlap) */}
          <Link href={`/product/${product.slug}`} className="block group-hover:text-[#6D28D9] transition-colors">
            <h3 className="font-extrabold text-[#171717] text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
              {product.title}
            </h3>
          </Link>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            {product.isFree ? (
              <span className="text-sm font-black text-emerald-600">FREE</span>
            ) : (
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-black text-[#171717]">
                  {formatPaiseToINR(pricePaise)}
                </span>
                {product.originalPriceInPaise && (
                  <span className="text-xs text-slate-400 line-through font-medium">
                    {formatPaiseToINR(product.originalPriceInPaise)}
                  </span>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product, "commercial")}
            className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shrink-0 ${
              product.isFree
                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white"
                : "bg-violet-50 text-[#6D28D9] hover:bg-[#6D28D9] hover:text-white"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
