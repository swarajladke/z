"use client";

import React from "react";
import Link from "next/link";
import { Heart, Eye, ShoppingBag, Download, Sparkles, Check } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useQuickPreview } from "@/context/QuickPreviewContext";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { openQuickPreview } = useQuickPreview();

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-violet-300 transition-all duration-300 flex flex-col justify-between relative">
      {/* Top Image Preview Box */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
        <img
          src={product.thumbnailUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          {product.isFree ? (
            <span className="bg-emerald-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-xs">
              FREE
            </span>
          ) : product.isBundle ? (
            <span className="bg-cyan-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-xs">
              BUNDLE ({product.itemCount}+)
            </span>
          ) : (
            <span className="bg-slate-900/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-md">
              {product.assetType}
            </span>
          )}

          {product.isBestSeller && (
            <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
              BEST SELLER
            </span>
          )}
          {product.isNew && !product.isBestSeller && (
            <span className="bg-violet-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
              NEW
            </span>
          )}
        </div>

        {/* Top Right Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-xl backdrop-blur-md transition-all shadow-xs ${
            inWishlist
              ? "bg-rose-500 text-white"
              : "bg-white/80 hover:bg-white text-slate-700 hover:text-rose-500 opacity-90 group-hover:opacity-100"
          }`}
          aria-label="Wishlist toggle"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
        </button>

        {/* Quick Preview Hover Overlay Action */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 p-4">
          <button
            onClick={() => openQuickPreview(product)}
            className="bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold px-3.5 py-2 rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-violet-700" />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mb-1">
            <span className="truncate max-w-[120px]">{product.category}</span>
            <span className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase">
              {product.fileFormats.slice(0, 2).join(", ")}
            </span>
          </div>

          <Link href={`/product/${product.slug}`} className="block group-hover:text-violet-700 transition-colors">
            <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
              {product.title}
            </h3>
          </Link>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-extrabold text-slate-900">
              {product.isFree ? (
                <span className="text-emerald-600">Free</span>
              ) : (
                formatCurrency(product.price)
              )}
            </span>
            {product.originalPrice && !product.isFree && (
              <span className="text-xs text-slate-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className={`p-2 rounded-xl transition-all font-semibold text-xs flex items-center gap-1 ${
              product.isFree
                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                : "bg-violet-700 text-white hover:bg-violet-800 shadow-xs shadow-violet-200"
            }`}
            aria-label="Add product to cart"
          >
            {product.isFree ? <Download className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
