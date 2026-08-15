"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Info, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { BRAND_CONFIG } from "@/config/brand.config";
import { formatPaiseToINR, FALLBACK_IMAGE_DATA_URL } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, subtotalInPaise, discountAmountInPaise, totalAmountInPaise, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "Arjun Verma",
    email: "arjun.verma@designstudio.in",
    phone: "+91 98765 43210",
    state: "Maharashtra",
    agreeTerms: true,
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      clearCart();
      router.push("/account?success=1");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Clean Distraction-Free Header — No Promotional Navigation */}
      <header className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-violet-700 flex items-center justify-center text-white font-black text-lg">
              K
            </div>
            <span className="font-extrabold text-xl text-slate-900">{BRAND_CONFIG.name}</span>
          </Link>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Demo Digital Checkout</span>
          </div>
        </div>
      </header>

      {/* Prominent Demo Notice Banner */}
      <div className="bg-cyan-900 text-white py-3 px-4 text-center text-xs font-bold border-b border-cyan-800">
        <div className="max-w-[1200px] mx-auto flex items-center justify-center gap-2">
          <Info className="w-4 h-4 text-cyan-300 shrink-0" />
          <span>Demo checkout — no real payment will be processed. Digital files will be unlocked in your account vault.</span>
        </div>
      </div>

      {/* Main Checkout Grid */}
      <div className="max-w-[1200px] mx-auto px-4 py-10 flex-1 w-full">
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form Panel */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h2 className="font-extrabold text-slate-900 text-base sm:text-lg border-b pb-3">
                Customer Delivery Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
                <div>
                  <label className="block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-violet-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block mb-1">Email Address (Source File Delivery) *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-violet-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block mb-1">Mobile Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-violet-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block mb-1">State / Province *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-violet-600 font-medium"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                    className="rounded text-violet-600 mt-0.5"
                  />
                  <span>
                    I confirm that digital assets are delivered instantly online to my customer download vault.
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              <h3 className="font-extrabold text-slate-900 text-lg border-b pb-3">Order Summary</h3>

              {/* Cart Items List */}
              <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedLicense}`}
                    className="flex items-center justify-between text-xs pb-3 border-b border-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.thumbnailUrl || FALLBACK_IMAGE_DATA_URL}
                        alt={item.product.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                        }}
                        className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-slate-900 line-clamp-1">{item.product.title}</div>
                        <span className="text-[10px] text-violet-700 uppercase font-semibold">
                          {item.selectedLicense} License
                        </span>
                      </div>
                    </div>
                    <span className="font-extrabold text-slate-900 shrink-0">
                      {formatPaiseToINR(item.calculatedPriceInPaise)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-xs text-slate-600 pt-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatPaiseToINR(subtotalInPaise)}</span>
                </div>
                {discountAmountInPaise > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount</span>
                    <span>-{formatPaiseToINR(discountAmountInPaise)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t text-lg font-black text-slate-900">
                  <span>Total Amount</span>
                  <span className="text-violet-700">{formatPaiseToINR(totalAmountInPaise)}</span>
                </div>
              </div>

              {/* Renamed Action Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-violet-700 hover:bg-violet-800 text-white font-extrabold text-sm py-4 rounded-xl transition-all shadow-lg shadow-violet-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Processing Demo Order...</span>
                ) : (
                  <>
                    <span>Continue to Demo Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-slate-400">
                🔒 Safe Demo Simulation • Instant File Unlock
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Clean Distraction-Free Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {BRAND_CONFIG.name} Digital Asset Store • Demo Environment
      </footer>
    </div>
  );
}
