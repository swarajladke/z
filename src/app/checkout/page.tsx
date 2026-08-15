"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, CheckCircle2, Lock, ArrowRight, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { BRAND_CONFIG } from "@/config/brand.config";
import { formatCurrency } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, subtotal, discountAmount, taxAmount, totalAmount, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "Arjun Verma",
    email: "arjun.verma@designstudio.in",
    phone: "+91 98765 43210",
    country: "India",
    state: "Maharashtra",
    gstin: "27AAAAA0000A1Z5", // Optional GSTIN
    paymentMethod: "upi",
    agreeTerms: true,
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      clearCart();
      router.push("/account?success=1");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Distraction-Free Header */}
      <header className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-violet-700 flex items-center justify-center text-white font-black text-lg">
              K
            </div>
            <span className="font-extrabold text-xl text-slate-900">{BRAND_CONFIG.name}</span>
          </Link>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>256-Bit SSL Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Checkout Form (8 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Customer Details Box */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h2 className="font-extrabold text-slate-900 text-lg border-b pb-3">
                1. Customer & Billing Details
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
                  <label className="block mb-1">Email Address (For File Delivery) *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-violet-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block mb-1">Mobile Number *</label>
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

                <div className="sm:col-span-2">
                  <label className="block mb-1 text-slate-500">
                    GSTIN Number (Optional - For Tax Invoice Claim)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 27AAAAA0000A1Z5"
                    value={formData.gstin}
                    onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-violet-600 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector Box */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h2 className="font-extrabold text-slate-900 text-lg border-b pb-3">
                2. Select Payment Option (Simulated)
              </h2>

              <div className="space-y-3">
                {[
                  { id: "upi", name: "UPI Instant (Google Pay, PhonePe, Paytm)", badge: "Fastest" },
                  { id: "card", name: "Credit / Debit Card (Visa, Mastercard, RuPay)", badge: "All Cards" },
                  { id: "netbanking", name: "NetBanking (SBI, HDFC, ICICI, Axis)", badge: "Instant" },
                ].map((pm) => (
                  <label
                    key={pm.id}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.paymentMethod === pm.id
                        ? "border-violet-600 bg-violet-50/70 text-slate-900 font-bold shadow-xs"
                        : "border-slate-200 text-slate-600 font-medium hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3 text-xs">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === pm.id}
                        onChange={() => setFormData({ ...formData, paymentMethod: pm.id })}
                        className="text-violet-600 focus:ring-violet-500"
                      />
                      <span>{pm.name}</span>
                    </div>
                    <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                      {pm.badge}
                    </span>
                  </label>
                ))}
              </div>

              {/* Agreement Checkbox */}
              <div className="pt-4 flex items-start gap-2 text-xs text-slate-600">
                <input
                  type="checkbox"
                  required
                  id="agree"
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="rounded text-violet-600 mt-0.5"
                />
                <label htmlFor="agree">
                  I agree to the Commercial Digital License terms and confirm that source files will be delivered digitally to my account library.
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              <h3 className="font-extrabold text-slate-900 text-lg border-b pb-3">Order Summary</h3>

              {/* Cart Items List */}
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedLicense}`}
                    className="flex items-center justify-between text-xs pb-3 border-b border-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.thumbnailUrl}
                        alt={item.product.title}
                        className="w-12 h-12 rounded-lg object-cover bg-slate-100"
                      />
                      <div>
                        <div className="font-bold text-slate-900 line-clamp-1">{item.product.title}</div>
                        <span className="text-[10px] text-violet-700 uppercase font-semibold">
                          {item.selectedLicense} License
                        </span>
                      </div>
                    </div>
                    <span className="font-extrabold text-slate-900">
                      {formatCurrency(item.calculatedPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-xs text-slate-600 pt-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount Applied</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500">
                  <span>GST Tax (18%)</span>
                  <span>{formatCurrency(taxAmount)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t text-lg font-black text-slate-900">
                  <span>Total Payable</span>
                  <span className="text-violet-700">{formatCurrency(totalAmount)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm py-4 rounded-xl transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Simulating Secure Order Payment...</span>
                ) : (
                  <>
                    <span>Complete Order & Download Files</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-slate-400">
                🔒 Instant File Unlock • Commercial License Guaranteed
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
