"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Tag, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";

export const CartDrawer: React.FC = () => {
  const router = useRouter();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    taxAmount,
    totalAmount,
    isCartOpen,
    setIsCartOpen,
    couponCode,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ success: boolean; text: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponMsg({ success: res.success, text: res.message });
    if (res.success) setInputCoupon("");
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-violet-700" />
            <h3 className="font-bold text-slate-900 text-base">Shopping Cart</h3>
            <span className="bg-violet-100 text-violet-800 text-xs font-bold px-2 py-0.5 rounded-full">
              {cartItems.length}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedLicense}`}
                  className="flex gap-3 p-3 rounded-xl border border-slate-200/80 bg-white hover:border-violet-200 transition-all shadow-xs relative group"
                >
                  <img
                    src={item.product.thumbnailUrl}
                    alt={item.product.title}
                    className="w-16 h-16 rounded-lg object-cover bg-slate-100 border border-slate-100"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                      {item.product.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-semibold bg-violet-50 text-violet-700 uppercase px-1.5 py-0.5 rounded">
                        {item.selectedLicense} License
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 border border-slate-200 rounded-lg text-xs font-semibold px-2 py-0.5">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedLicense, item.quantity - 1)
                          }
                          className="text-slate-400 hover:text-slate-700 px-1"
                        >
                          -
                        </button>
                        <span className="px-1 text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedLicense, item.quantity + 1)
                          }
                          className="text-slate-400 hover:text-slate-700 px-1"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs font-extrabold text-slate-900">
                        {formatCurrency(item.calculatedPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedLicense)}
                    className="text-slate-300 hover:text-rose-600 p-1 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Coupon Box */}
              <div className="pt-2">
                {couponCode ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2 font-medium">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <span>
                        Coupon <strong>{couponCode}</strong> applied ({discountAmount > 0 && `-${formatCurrency(discountAmount)}`})
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-700 font-bold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. KALA20)"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-violet-600 font-medium"
                    />
                    <button
                      type="submit"
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponMsg && (
                  <p
                    className={`text-[11px] mt-1.5 font-medium ${
                      couponMsg.success ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {couponMsg.text}
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12 px-4 space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-base">Your cart is empty</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Browse our festival templates and creative bundles to add assets.
                </p>
              </div>
              <Link
                href="/assets"
                onClick={() => setIsCartOpen(false)}
                className="inline-flex items-center gap-1.5 bg-violet-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-violet-800 transition-colors shadow-sm"
              >
                Browse Assets <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout Button */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50/50 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800">{formatCurrency(subtotal)}</span>
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
              <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-bold text-slate-900">
                <span>Total</span>
                <span className="text-violet-700">{formatCurrency(totalAmount)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckoutClick}
              className="w-full bg-violet-700 hover:bg-violet-800 text-white font-bold text-sm py-3 rounded-xl transition-colors shadow-lg shadow-violet-200 flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Instant Digital Delivery • Commercial License</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
