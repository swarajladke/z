"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  Check,
  FileCheck,
  ChevronRight,
  ChevronLeft,
  Info,
  Clock,
  HardDrive,
  Monitor,
  Zap,
  Maximize2,
  X,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { ProductCard } from "@/components/product/ProductCard";
import { SearchBarModal } from "@/components/catalog/SearchBarModal";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { LicenseType, Product } from "@/types";
import { formatPaiseToINR, calculateLicensePricePaise, FALLBACK_IMAGE_DATA_URL } from "@/lib/utils";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<LicenseType>("commercial");

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Find product by slug
  const product: Product = MOCK_PRODUCTS.find((p) => p.slug === slug) || MOCK_PRODUCTS[0];

  const allImages = [product.thumbnailUrl, ...(product.galleryImages || [])];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullscreenPreviewOpen, setIsFullscreenPreviewOpen] = useState(false);

  const basePaise = product.priceInPaise ?? Math.round(product.price * 100);
  const calculatedPaise = calculateLicensePricePaise(basePaise, selectedLicense);
  const inWishlist = isInWishlist(product.id);

  // Gallery Navigation Handlers
  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation for image gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "Escape") setIsFullscreenPreviewOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.assetType === product.assetType)
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedLicense);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedLicense);
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EC]">
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Breadcrumb Navigation */}
      <div className="bg-[#FCFAF6] border-b border-[rgba(23,23,23,0.12)] py-3">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/assets" className="hover:text-slate-900">Assets</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-violet-700 font-semibold truncate max-w-[200px] sm:max-w-[none]">
            {product.title}
          </span>
        </div>
      </div>

      {/* Main Product Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Gallery, Watermarked Preview & Tech Specs */}
          <div className="lg:col-span-7 space-y-4">
            {/* Watermarked High-Res Preview Box with Navigation Arrows */}
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl group">
              <img
                src={allImages[activeImageIndex] || FALLBACK_IMAGE_DATA_URL}
                alt={product.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                }}
                className="w-full h-full object-cover transition-all"
              />

              {/* Discrete Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <span className="text-4xl sm:text-6xl font-black text-white tracking-widest rotate-[-25deg] select-none">
                  KALASTOCK PREVIEW
                </span>
              </div>

              {/* Gallery Previous/Next Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-slate-900/70 hover:bg-slate-900 text-white p-2 rounded-full backdrop-blur-xs transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900/70 hover:bg-slate-900 text-white p-2 rounded-full backdrop-blur-xs transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Fullscreen Zoom Trigger */}
              <button
                onClick={() => setIsFullscreenPreviewOpen(true)}
                className="absolute bottom-3 right-3 bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl backdrop-blur-xs transition-colors flex items-center gap-1.5"
              >
                <Maximize2 className="w-3.5 h-3.5" /> Fullscreen View
              </button>
            </div>

            {/* Gallery Thumbnails Row */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img || FALLBACK_IMAGE_DATA_URL}
                  alt={`Preview ${idx + 1}`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                  }}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl object-cover border-2 cursor-pointer transition-all ${
                    activeImageIndex === idx
                      ? "border-violet-600 ring-2 ring-violet-200"
                      : "border-slate-200 opacity-70 hover:opacity-100"
                  }`}
                />
              ))}
            </div>

            {/* Software & File Specs Grid */}
            <div className="bg-white p-6 rounded-2xl border border-[rgba(23,23,23,0.12)] space-y-4 shadow-2xs">
              <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3 bg-[#F5F2EC] rounded-xl border border-[rgba(23,23,23,0.08)]">
                  <div className="text-slate-500 font-semibold flex items-center gap-1 mb-1">
                    <FileCheck className="w-3.5 h-3.5 text-violet-600" /> Formats
                  </div>
                  <div className="font-bold text-slate-900">{product.fileFormats.join(", ")}</div>
                </div>

                <div className="p-3 bg-[#F5F2EC] rounded-xl border border-[rgba(23,23,23,0.08)]">
                  <div className="text-slate-500 font-semibold flex items-center gap-1 mb-1">
                    <Monitor className="w-3.5 h-3.5 text-cyan-600" /> Software
                  </div>
                  <div className="font-bold text-slate-900">{product.softwareCompatibility.join(", ")}</div>
                </div>

                <div className="p-3 bg-[#F5F2EC] rounded-xl border border-[rgba(23,23,23,0.08)]">
                  <div className="text-slate-500 font-semibold flex items-center gap-1 mb-1">
                    <HardDrive className="w-3.5 h-3.5 text-emerald-600" /> File Size
                  </div>
                  <div className="font-bold text-slate-900">{product.fileSize || "45 MB"}</div>
                </div>

                <div className="p-3 bg-[#F5F2EC] rounded-xl border border-[rgba(23,23,23,0.08)]">
                  <div className="text-slate-500 font-semibold flex items-center gap-1 mb-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" /> Last Updated
                  </div>
                  <div className="font-bold text-slate-900">{product.lastUpdated}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Purchase Panel on Desktop */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[rgba(23,23,23,0.12)] shadow-xl space-y-6">
              {/* Category & Badge */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-violet-700 bg-violet-50 px-3 py-1 rounded-full border border-violet-200">
                  {product.category}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  ★ {product.ratingPlaceholder} ({product.downloadCount.toLocaleString()} downloads)
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {product.title}
              </h1>

              {/* Price display */}
              <div className="flex items-baseline gap-3 pb-4 border-b border-slate-100">
                <span className="text-3xl sm:text-4xl font-black text-slate-900">
                  {product.isFree ? (
                    <span className="text-emerald-600">FREE</span>
                  ) : (
                    formatPaiseToINR(calculatedPaise)
                  )}
                </span>
                {product.originalPriceInPaise && !product.isFree && (
                  <span className="text-slate-400 text-lg line-through font-semibold">
                    {formatPaiseToINR(product.originalPriceInPaise)}
                  </span>
                )}
              </div>

              {/* License Selector Option */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    Select License Usage:
                  </label>
                  <a href="#licensing" className="text-[11px] text-violet-700 font-semibold hover:underline">
                    Compare Licenses →
                  </a>
                </div>

                <div className="space-y-2">
                  {[
                    { id: "personal", title: "Personal License", desc: "For individual projects & personal social" },
                    { id: "commercial", title: "Commercial License", desc: "For client work, agency ads & social media" },
                    { id: "extended", title: "Extended Commercial", desc: "For broadcast, TV & mass merchandise" },
                  ].map((lic) => (
                    <button
                      key={lic.id}
                      type="button"
                      onClick={() => setSelectedLicense(lic.id as LicenseType)}
                      className={`w-full p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between ${
                        selectedLicense === lic.id
                          ? "border-violet-600 bg-violet-50/80 ring-2 ring-violet-600/20 text-slate-900"
                          : "border-slate-200 hover:border-slate-300 text-slate-600"
                      }`}
                    >
                      <div>
                        <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                          <span>{lic.title}</span>
                          {selectedLicense === lic.id && (
                            <span className="bg-violet-600 text-white rounded-full p-0.5">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{lic.desc}</div>
                      </div>
                      <span className="text-xs font-bold text-slate-800">
                        {product.isFree ? "Free" : formatPaiseToINR(calculateLicensePricePaise(basePaise, lic.id as LicenseType))}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-violet-700 hover:bg-violet-800 text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-violet-200 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {product.isFree ? "Download Free Source Files" : "Add to Shopping Cart"}
                </button>

                {!product.isFree && (
                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4 text-cyan-400" />
                    Buy Now — Instant Download
                  </button>
                )}

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-full py-2.5 rounded-xl border text-xs font-bold transition-colors flex items-center justify-center gap-2 ${
                    inWishlist
                      ? "bg-rose-50 border-rose-200 text-rose-600"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
                  {inWishlist ? "Saved in Wishlist" : "Add to Wishlist"}
                </button>
              </div>

              {/* Digital Disclaimer Notice */}
              <div className="bg-amber-50 border border-amber-200 text-amber-900 p-3.5 rounded-xl text-xs flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Notice:</strong> Digital download asset. Access source files instantly after checkout.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="bg-white p-8 rounded-3xl border border-[rgba(23,23,23,0.12)] space-y-6">
          <h3 className="font-extrabold text-slate-900 text-xl">Product Details & Included Files</h3>
          <p className="text-slate-700 text-sm leading-relaxed">{product.description}</p>

          <div className="border-t pt-4 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">What&apos;s Included in this Download:</h4>
            <div className="bg-[#F5F2EC] p-4 rounded-xl text-xs text-slate-800 font-mono border border-[rgba(23,23,23,0.08)]">
              {product.includedFilesText}
            </div>
          </div>
        </div>

        {/* Related Assets Row */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <h3 className="font-extrabold text-slate-900 text-xl">You Might Also Like</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Zoom Preview Modal */}
      {isFullscreenPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreenPreviewOpen(false)}
            className="absolute top-4 right-4 text-white bg-slate-800 p-2.5 rounded-full hover:bg-slate-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={allImages[activeImageIndex] || FALLBACK_IMAGE_DATA_URL}
            alt={product.title}
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
            }}
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden sticky bottom-0 z-40 bg-white border-t border-slate-200 p-4 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">{selectedLicense}</span>
          <span className="text-lg font-extrabold text-slate-900">
            {product.isFree ? "Free" : formatPaiseToINR(calculatedPaise)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="bg-violet-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <SearchBarModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
