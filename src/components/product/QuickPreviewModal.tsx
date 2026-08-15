"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, Heart, ShoppingBag, Check, FileCheck, Layers } from "lucide-react";
import { useQuickPreview } from "@/context/QuickPreviewContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { LicenseType } from "@/types";
import { formatPaiseToINR, calculateLicensePricePaise, FALLBACK_IMAGE_DATA_URL } from "@/lib/utils";

export const QuickPreviewModal: React.FC = () => {
  const { previewProduct, closeQuickPreview } = useQuickPreview();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedLicense, setSelectedLicense] = useState<LicenseType>("commercial");

  // Lock body scroll and handle Escape key while modal is open
  useEffect(() => {
    if (previewProduct) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeQuickPreview();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [previewProduct, closeQuickPreview]);

  if (!previewProduct) return null;

  const basePaise = previewProduct.priceInPaise ?? Math.round(previewProduct.price * 100);
  const currentPaise = calculateLicensePricePaise(basePaise, selectedLicense);
  const inWishlist = isInWishlist(previewProduct.id);

  const handleAddToCart = () => {
    addToCart(previewProduct, selectedLicense);
    closeQuickPreview();
  };

  return (
    <div
      onClick={closeQuickPreview}
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
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
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
            <img
              src={previewProduct.thumbnailUrl || FALLBACK_IMAGE_DATA_URL}
              alt={previewProduct.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
              }}
              className="w-full h-full object-cover"
            />
            {/* Watermark overlay placeholder */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <span className="text-3xl font-black text-white tracking-widest rotate-[-25deg] select-none">
                KALASTOCK PREVIEW
              </span>
            </div>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {(previewProduct.galleryImages || []).map((img, idx) => (
              <img
                key={idx}
                src={img || FALLBACK_IMAGE_DATA_URL}
                alt="preview thumbnail"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                }}
                className="w-14 h-14 rounded-lg object-cover border border-slate-700 opacity-80 hover:opacity-100 cursor-pointer"
              />
            ))}
          </div>

          <div className="mt-4 text-xs text-slate-400 flex items-center gap-3">
            <span className="flex items-center gap-1 font-semibold text-cyan-300">
              <FileCheck className="w-3.5 h-3.5" />
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
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#6D28D9] bg-violet-50 px-2.5 py-0.5 rounded-full border border-violet-100">
                {previewProduct.category}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                ★ {previewProduct.ratingPlaceholder} rating
              </span>
            </div>

            <h2 className="text-xl font-extrabold text-[#171717] leading-snug">
              {previewProduct.title}
            </h2>

            <p className="text-slate-600 text-xs mt-2 leading-relaxed line-clamp-3">
              {previewProduct.description}
            </p>

            {/* License Selector */}
            <div className="mt-5 space-y-2">
              <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block">
                Select License Usage:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "personal", name: "Personal Use", desc: "Individual projects & social" },
                  { id: "commercial", name: "Commercial Use", desc: "Client work, agency & ads" },
                ].map((lic) => (
                  <button
                    key={lic.id}
                    onClick={() => setSelectedLicense(lic.id as LicenseType)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      selectedLicense === lic.id
                        ? "border-[#6D28D9] bg-violet-50/80 text-slate-900 ring-2 ring-violet-600/20"
                        : "border-slate-200 hover:border-slate-300 text-slate-600"
                    }`}
                  >
                    <div className="text-xs font-extrabold text-[#171717] flex items-center justify-between">
                      <span>{lic.name}</span>
                      {selectedLicense === lic.id && (
                        <Check className="w-3.5 h-3.5 text-[#6D28D9]" />
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{lic.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Box */}
            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#171717]">
                {previewProduct.isFree ? (
                  <span className="text-[#10B981]">FREE</span>
                ) : (
                  formatPaiseToINR(currentPaise)
                )}
              </span>
              {previewProduct.originalPriceInPaise && !previewProduct.isFree && (
                <span className="text-sm text-slate-400 line-through font-medium">
                  {formatPaiseToINR(previewProduct.originalPriceInPaise)}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-slate-200 space-y-3">
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-extrabold text-xs py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
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
              className="block text-center text-xs font-bold text-[#6D28D9] hover:underline"
            >
              View Full Product Details & File Specs →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
