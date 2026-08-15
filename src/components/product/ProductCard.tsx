"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Eye, ShoppingBag, Download } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useQuickPreview } from "@/context/QuickPreviewContext";
import { formatPaiseToINR, FALLBACK_IMAGE_DATA_URL } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
  isFeatured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = "",
  isFeatured = false,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { openQuickPreview } = useQuickPreview();

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isWishlistAnimating, setIsWishlistAnimating] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const pricePaise = product.priceInPaise ?? Math.round(product.price * 100);

  // Enforce strictly ONE status badge following priority: Free > New > Best Seller > Bundle
  const getPrimaryBadge = () => {
    if (product.isFree) return { label: "FREE", colorClass: "bg-[#10B981] text-white" };
    if (product.isNew) return { label: "NEW", colorClass: "bg-[#6D28D9] text-white" };
    if (product.isBestSeller) return { label: "BEST SELLER", colorClass: "bg-[#F59E0B] text-slate-950" };
    if (product.isBundle) return { label: `${product.itemCount || "BUNDLE"}`, colorClass: "bg-[#06B6D4] text-slate-950" };
    return null;
  };

  const badge = getPrimaryBadge();

  // Compact inline format string (e.g. "PSD · Canva")
  const formatString = product.fileFormats && product.fileFormats.length > 0
    ? product.fileFormats.slice(0, 2).join(" · ")
    : "PSD · Canva";

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    setIsWishlistAnimating(true);
    setTimeout(() => setIsWishlistAnimating(false), 300);
  };

  const handleQuickPreviewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickPreview(product);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, "commercial");
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25 }}
      className={`group relative flex flex-col justify-between bg-white rounded-xl border border-[rgba(23,23,23,0.12)] overflow-hidden shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ${
        isFeatured ? "col-span-2 row-span-2" : ""
      } ${className}`}
    >
      {/* Edge-to-Edge 4:5 Portrait Ratio Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100">
        
        {/* Blur Skeleton Placeholder while image loads */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-slate-200 animate-pulse" />
        )}

        <img
          src={imageError ? FALLBACK_IMAGE_DATA_URL : product.thumbnailUrl}
          alt={product.title}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-200 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* 1. Status Badge Top-Left (Inset 8-10px) */}
        {badge && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span
              className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md shadow-xs uppercase tracking-wider ${badge.colorClass}`}
            >
              {badge.label}
            </span>
          </div>
        )}

        {/* 2. Wishlist Circular Action Top-Right */}
        <button
          onClick={handleWishlistClick}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-xs transition-all ${
            inWishlist
              ? "bg-[#6D28D9] text-white shadow-md"
              : "bg-slate-900/60 text-white hover:bg-rose-600 hover:text-white"
          } ${isWishlistAnimating ? "scale-125" : "scale-100"}`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
        </button>

        {/* 3. Desktop Hover Action Overlay inside Image */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-slate-950/85 via-slate-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2 z-10">
          <button
            onClick={handleQuickPreviewClick}
            className="flex-1 bg-white/90 hover:bg-white text-slate-900 text-xs font-extrabold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm"
          >
            <Eye className="w-3.5 h-3.5 text-[#6D28D9]" />
            <span>Preview</span>
          </button>
          <button
            onClick={handleAddToCartClick}
            className={`flex-1 text-xs font-extrabold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm ${
              product.isFree
                ? "bg-[#10B981] hover:bg-emerald-600 text-white"
                : "bg-[#6D28D9] hover:bg-violet-600 text-white"
            }`}
          >
            {product.isFree ? (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Metadata Area Below Preview */}
      <div className="p-3 sm:p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          {/* Category & Format Text */}
          <div className="flex items-center justify-between text-xs text-[#6F6A63] font-medium">
            <span className="truncate max-w-[120px]">{product.category}</span>
            <span className="text-[11px] font-bold text-slate-400">{formatString}</span>
          </div>

          {/* Product Title (Max 2 lines, never overlapping preview) */}
          <Link href={`/product/${product.slug}`} className="block group-hover:text-[#6D28D9] transition-colors">
            <h3 className="font-extrabold text-[#171717] text-xs sm:text-sm leading-snug line-clamp-2 min-h-[2.25rem]">
              {product.title}
            </h3>
          </Link>
        </div>

        {/* Pricing & Mobile Quick Action */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1 mt-auto">
          <div>
            {product.isFree ? (
              <span className="text-xs sm:text-sm font-black text-[#10B981]">FREE</span>
            ) : (
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs sm:text-sm font-black text-[#171717]">
                  {formatPaiseToINR(pricePaise)}
                </span>
                {product.originalPriceInPaise && product.originalPriceInPaise > pricePaise && (
                  <span className="text-[11px] text-slate-400 line-through font-medium">
                    {formatPaiseToINR(product.originalPriceInPaise)}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Mobile Cart Action (Min 44px touch target area) */}
          <button
            onClick={handleAddToCartClick}
            aria-label={product.isFree ? "Download asset" : "Add asset to cart"}
            className="sm:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-[#6D28D9] hover:bg-violet-50 rounded-lg"
          >
            {product.isFree ? <Download className="w-5 h-5 text-[#10B981]" /> : <ShoppingBag className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
