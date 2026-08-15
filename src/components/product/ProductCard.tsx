"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Eye, ShoppingBag, Download } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useQuickPreview } from "@/context/QuickPreviewContext";
import { formatPaiseToINR, FALLBACK_IMAGE_DATA_URL } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { openQuickPreview } = useQuickPreview();
  const [imgSrc, setImgSrc] = useState(product.thumbnailUrl || FALLBACK_IMAGE_DATA_URL);

  const inWishlist = isInWishlist(product.id);
  const pricePaise = product.priceInPaise ?? Math.round(product.price * 100);
  const originalPricePaise = product.originalPriceInPaise ?? (product.originalPrice ? Math.round(product.originalPrice * 100) : undefined);

  // Single Primary Badge Logic (Max 1 meaningful badge displayed per card)
  const renderPrimaryBadge = () => {
    if (product.isFree) {
      return (
        <span className="bg-emerald-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md shadow-xs tracking-wider">
          FREE
        </span>
      );
    }
    if (product.isBundle) {
      return (
        <span className="bg-cyan-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md shadow-xs tracking-wider">
          BUNDLE ({product.itemCount || 250}+)
        </span>
      );
    }
    if (product.isBestSeller) {
      return (
        <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md shadow-xs tracking-wider">
          BEST SELLER
        </span>
      );
    }
    if (product.isNew) {
      return (
        <span className="bg-violet-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md shadow-xs tracking-wider">
          NEW
        </span>
      );
    }
    return (
      <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-md">
        {product.assetType}
      </span>
    );
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/70 overflow-hidden shadow-xs hover:shadow-xl hover:shadow-slate-900/5 hover:border-violet-300 hover:-translate-y-1 transition-all duration-200 ease-out flex flex-col justify-between relative w-full h-full">
      {/* 4/3 Aspect Ratio Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950 shrink-0">
        <img
          src={imgSrc}
          alt={product.title}
          onError={() => setImgSrc(FALLBACK_IMAGE_DATA_URL)}
          className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-200 ease-out"
          loading="lazy"
        />

        {/* Soft Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

        {/* Single Primary Badge */}
        <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
          {renderPrimaryBadge()}
        </div>

        {/* Wishlist Heart Button — Visible on mobile; slides down on desktop hover */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-xl backdrop-blur-md transition-all duration-200 shadow-xs ${
            inWishlist
              ? "bg-rose-500 text-white opacity-100"
              : "bg-white/80 sm:bg-white/60 hover:bg-white text-slate-700 hover:text-rose-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:-translate-y-1 sm:group-hover:translate-y-0"
          }`}
          aria-label="Save to wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${inWishlist ? "fill-current" : ""}`} />
        </button>

        {/* Desktop Quick Preview Hover Action Bar */}
        <div className="absolute bottom-3 inset-x-3 z-10 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 ease-out">
          <button
            onClick={() => openQuickPreview(product)}
            className="w-full bg-white/95 hover:bg-white text-slate-900 text-xs font-bold py-2 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-violet-700" />
            Quick Preview
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-1">
            <span className="truncate max-w-[130px] text-slate-500">{product.category}</span>
            <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
              {product.fileFormats.slice(0, 2).join(", ")}
            </span>
          </div>

          <Link href={`/product/${product.slug}`} className="block group-hover:text-violet-700 transition-colors">
            <h3 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug line-clamp-2 min-h-[2.4rem]">
              {product.title}
            </h3>
          </Link>
        </div>

        {/* Price & Primary Action Row */}
        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-extrabold text-slate-900">
              {product.isFree ? (
                <span className="text-emerald-600 font-extrabold">Free</span>
              ) : (
                formatPaiseToINR(pricePaise)
              )}
            </span>
            {originalPricePaise && !product.isFree && (
              <span className="text-[11px] text-slate-400 line-through">
                {formatPaiseToINR(originalPricePaise)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className={`p-2 sm:px-3 sm:py-2 rounded-xl transition-all font-bold text-xs flex items-center gap-1.5 shrink-0 ${
              product.isFree
                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/80"
                : "bg-violet-700 text-white hover:bg-violet-800 shadow-xs shadow-violet-200"
            }`}
            aria-label="Add to shopping cart"
          >
            {product.isFree ? <Download className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{product.isFree ? "Free" : "Add"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
