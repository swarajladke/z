"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  Download,
  Check,
  ShieldCheck,
  FileCheck,
  Layers,
  Sparkles,
  ChevronRight,
  Info,
  Clock,
  HardDrive,
  Monitor,
  Zap,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { ProductCard } from "@/components/product/ProductCard";
import { SearchBarModal } from "@/components/catalog/SearchBarModal";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { LicenseType } from "@/types";
import { formatCurrency, calculateLicensePrice } from "@/lib/utils";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<LicenseType>("commercial");

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Find product by slug
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug) || MOCK_PRODUCTS[0];
  const [activeImage, setActiveImage] = useState(product.thumbnailUrl);

  const calculatedPrice = calculateLicensePrice(product.price, selectedLicense);
  const inWishlist = isInWishlist(product.id);

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
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200 py-3">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Media & Thumbnails Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Watermarked High-Res Preview Box */}
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl group">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-cover transition-all"
              />
              {/* Discrete Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <span className="text-4xl sm:text-6xl font-black text-white tracking-widest rotate-[-25deg] select-none">
                  KALASTOCK PREVIEW
                </span>
              </div>
            </div>

            {/* Gallery Thumbnails Row */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              <img
                src={product.thumbnailUrl}
                alt="Main cover"
                onClick={() => setActiveImage(product.thumbnailUrl)}
                className={`w-20 h-20 rounded-xl object-cover border-2 cursor-pointer transition-all ${
                  activeImage === product.thumbnailUrl ? "border-violet-600 ring-2 ring-violet-200" : "border-slate-200 opacity-70 hover:opacity-100"
                }`}
              />
              {product.galleryImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Preview ${idx + 1}`}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-xl object-cover border-2 cursor-pointer transition-all ${
                    activeImage === img ? "border-violet-600 ring-2 ring-violet-200" : "border-slate-200 opacity-70 hover:opacity-100"
                  }`}
                />
              ))}
            </div>

            {/* Software & File Specs Grid */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
              <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">
                Technical File Specifications
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-slate-400 font-semibold flex items-center gap-1 mb-1">
                    <FileCheck className="w-3.5 h-3.5 text-violet-600" /> Formats
                  </div>
                  <div className="font-bold text-slate-900">{product.fileFormats.join(", ")}</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-slate-400 font-semibold flex items-center gap-1 mb-1">
                    <Monitor className="w-3.5 h-3.5 text-cyan-600" /> Software
                  </div>
                  <div className="font-bold text-slate-900">{product.softwareCompatibility.join(", ")}</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-slate-400 font-semibold flex items-center gap-1 mb-1">
                    <HardDrive className="w-3.5 h-3.5 text-emerald-600" /> File Size
                  </div>
                  <div className="font-bold text-slate-900">{product.fileSize || "45 MB"}</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-slate-400 font-semibold flex items-center gap-1 mb-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" /> Last Updated
                  </div>
                  <div className="font-bold text-slate-900">{product.lastUpdated}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing, License Selector & Buy Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
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
                    formatCurrency(calculatedPrice)
                  )}
                </span>
                {product.originalPrice && !product.isFree && (
                  <span className="text-slate-400 text-lg line-through font-semibold">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* License Selector Option */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    Select License Usage:
                  </label>
                  <a href="#licensing-details" className="text-[11px] text-violet-700 font-semibold hover:underline">
                    License Comparison →
                  </a>
                </div>

                <div className="space-y-2">
                  {[
                    { id: "personal", title: "Personal License", desc: "For individual projects & personal social", mult: 1.0 },
                    { id: "commercial", title: "Commercial License", desc: "For client work, agency ads & social media", mult: 1.5 },
                    { id: "extended", title: "Extended Commercial", desc: "For broadcast, TV & mass merchandise", mult: 2.5 },
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
                        {product.isFree ? "Free" : formatCurrency(calculateLicensePrice(product.price, lic.id as LicenseType))}
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
                  <strong>Notice:</strong> This is a digital product. No physical item will be shipped. Access files instantly after checkout.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Product Description & Whats Included */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6">
          <h3 className="font-extrabold text-slate-900 text-xl">Product Details & Included Files</h3>
          <p className="text-slate-700 text-sm leading-relaxed">{product.description}</p>

          <div className="border-t pt-4 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">What&apos;s Included in this Download:</h4>
            <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-800 font-mono border border-slate-200">
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

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden sticky bottom-0 z-40 bg-white border-t border-slate-200 p-4 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-xs text-slate-400 block font-medium">Total</span>
          <span className="text-lg font-extrabold text-slate-900">
            {product.isFree ? "Free" : formatCurrency(calculatedPrice)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="bg-violet-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <SearchBarModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
