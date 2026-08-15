"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { SearchBarModal } from "@/components/catalog/SearchBarModal";
import { ProductCard } from "@/components/product/ProductCard";
import { useCart } from "@/context/CartContext";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    taxAmount,
    totalAmount,
    couponCode,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ success: boolean; text: string } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponMsg({ success: res.success, text: res.message });
    if (res.success) setInputCoupon("");
  };

  const recommendedProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Header */}
      <div className="bg-slate-900 text-white py-8 border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">Shopping Cart</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Your Shopping Cart</h1>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-12">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Items Table */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <span>Product Details</span>
                  <span>Price</span>
                </div>

                <div className="divide-y divide-slate-100">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedLicense}`}
                      className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.product.thumbnailUrl}
                          alt={item.product.title}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <span className="text-[10px] font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded uppercase">
                            {item.selectedLicense} License
                          </span>
                          <h3 className="font-bold text-slate-900 text-sm sm:text-base mt-1">
                            {item.product.title}
                          </h3>
                          <div className="text-xs text-slate-500 mt-0.5">
                            Formats: {item.product.fileFormats.join(", ")}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                        <div className="flex items-center gap-2 border border-slate-200 rounded-xl p-1 text-xs font-semibold">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.selectedLicense, item.quantity - 1)
                            }
                            className="px-2 py-0.5 hover:bg-slate-100 rounded text-slate-500"
                          >
                            -
                          </button>
                          <span className="px-2 text-slate-800">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.selectedLicense, item.quantity + 1)
                            }
                            className="px-2 py-0.5 hover:bg-slate-100 rounded text-slate-500"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-base font-extrabold text-slate-900">
                          {formatCurrency(item.calculatedPrice * item.quantity)}
                        </span>

                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedLicense)}
                          className="text-slate-300 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/assets"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 hover:underline"
              >
                ← Continue Browsing Assets
              </Link>
            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-6">
                <h3 className="font-extrabold text-slate-900 text-lg border-b pb-3">Order Summary</h3>

                {/* Promo code form */}
                <div>
                  {couponCode ? (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2 font-medium">
                        <Tag className="w-4 h-4 text-emerald-600" />
                        <span>Code <strong>{couponCode}</strong> applied</span>
                      </div>
                      <button onClick={removeCoupon} className="font-bold underline text-emerald-700">
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Coupon (e.g. KALA20)"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-hidden"
                      />
                      <button
                        type="submit"
                        className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {couponMsg && (
                    <p className={`text-[11px] mt-1 font-medium ${couponMsg.success ? "text-emerald-600" : "text-rose-600"}`}>
                      {couponMsg.text}
                    </p>
                  )}
                </div>

                <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Discount</span>
                      <span>-{formatCurrency(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-500">
                    <span>Estimated GST (18%)</span>
                    <span>{formatCurrency(taxAmount)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t text-base font-black text-slate-900">
                    <span>Total Amount</span>
                    <span className="text-violet-700">{formatCurrency(totalAmount)}</span>
                  </div>
                </div>

                <button
                  onClick={() => router.push("/checkout")}
                  className="w-full bg-violet-700 hover:bg-violet-800 text-white font-extrabold text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-violet-200 flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart State with Recommendations */
          <div className="space-y-12">
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center max-w-lg mx-auto space-y-4 shadow-sm">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">Your Cart is Empty</h2>
              <p className="text-slate-500 text-xs">
                Explore thousands of editable Canva, PSD, SVG, and presentation templates.
              </p>
              <Link
                href="/assets"
                className="inline-flex items-center gap-2 bg-violet-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md"
              >
                Browse All Assets <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-6">
              <h3 className="font-extrabold text-slate-900 text-lg">Recommended for Indian Creators</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {recommendedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <SearchBarModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
