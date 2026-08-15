"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Heart, ShoppingBag, Check, Shield, FileCheck, Layers, Sparkles } from "lucide-react";
import { useQuickPreview } from "@/context/QuickPreviewContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { LicenseType } from "@/types";
import { formatCurrency, calculateLicensePrice } from "@/lib/utils";

export const QuickPreviewModal: React.FC = () => {
  const { previewProduct, closeQuickPreview } = useQuickPreview();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedLicense, setSelectedLicense] = useState<LicenseType>("commercial");

  if (!previewProduct) return null;

  const currentPrice = calculateLicensePrice(previewProduct.price, selectedLicense);
  const inWishlist = isInWishlist(previewProduct.id);

  const handleAddToCart = () => {
    addToCart(previewProduct, selectedLicense);
    closeQuickPreview();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col md:flex-row relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickPreview}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-900/60 hover:bg-slate-900 text-white rounded-full backdrop-blur-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left: Product Media Preview */}
        <div className="md:w-1/2 bg-slate-950 p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
            <img
              src={previewProduct.thumbnailUrl}
              alt={previewProduct.title}
              className="w-full h-full object-cover"
            />
            {/* Watermark overlay placeholder */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <span className="text-4xl font-extrabold text-white tracking-widest rotate-[-25deg] select-none">
                KALASTOCK PREVIEW
              </span>
            </div>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {previewProduct.galleryImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="preview thumbnail"
                className="w-14 h-14 rounded-lg object-cover border border-slate-700 opacity-80 hover:opacity-100 cursor-pointer"
              />
            ))}
          </div>

          <div className="mt-4 text-[11px] text-slate-400 flex items-center gap-3">
            <span className="flex items-center gap-1">
              <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
              {previewProduct.fileFormats.join(", ")}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-violet-400" />
              {previewProduct.dimensions || "Vector & Print"}
            </span>
          </div>
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto max-h-[80vh] md:max-h-[none]">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded-full">
                {previewProduct.category}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                ★ {previewProduct.ratingPlaceholder} rating
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 leading-snug">
              {previewProduct.title}
            </h2>

            <p className="text-slate-600 text-xs mt-2 line-clamp-3">
              {previewProduct.description}
            </p>

            {/* License Selector */}
            <div className="mt-5 space-y-2">
              <label className="text-xs font-bold text-slate-900 block">
                Select License Type:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "personal", name: "Personal Use", desc: "Individual projects & social" },
                  { id: "commercial", name: "Commercial Use", desc: "Client work, ads & business" },
                ].map((lic) => (
                  <button
                    key={lic.id}
                    onClick={() => setSelectedLicense(lic.id as LicenseType)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      selectedLicense === lic.id
                        ? "border-violet-600 bg-violet-50/70 text-slate-900 shadow-xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-600"
                    }`}
                  >
                    <div className="text-xs font-bold flex items-center justify-between">
                      <span>{lic.name}</span>
                      {selectedLicense === lic.id && (
                        <Check className="w-3.5 h-3.5 text-violet-600" />
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{lic.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Box */}
            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">
                {previewProduct.isFree ? (
                  <span className="text-emerald-600">FREE</span>
                ) : (
                  formatCurrency(currentPrice)
                )}
              </span>
              {previewProduct.originalPrice && !previewProduct.isFree && (
                <span className="text-sm text-slate-400 line-through">
                  {formatCurrency(previewProduct.originalPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-slate-200 space-y-3">
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-violet-700 hover:bg-violet-800 text-white font-bold text-sm py-3 rounded-xl transition-colors shadow-md shadow-violet-200 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                {previewProduct.isFree ? "Download Free Asset" : "Add to Cart"}
              </button>
              <button
                onClick={() => toggleWishlist(previewProduct.id)}
                className={`p-3 rounded-xl border transition-colors ${
                  inWishlist
                    ? "bg-rose-50 border-rose-200 text-rose-600"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
              </button>
            </div>

            <Link
              href={`/product/${previewProduct.slug}`}
              onClick={closeQuickPreview}
              className="block text-center text-xs font-semibold text-violet-700 hover:underline"
            >
              View Full Product Details & File Specs →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
