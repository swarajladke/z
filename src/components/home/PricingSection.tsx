"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Zap, ArrowRight } from "lucide-react";
import { MOCK_PRICING_PLANS } from "@/data/mock-pricing";
import { formatPaiseToINR } from "@/lib/utils";

export const PricingSection: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-violet-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Zap className="w-4 h-4 text-cyan-600" />
            Simple Transparent Subscription
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Choose how you create
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-2">
            Save time and costs with flat monthly or annual download plans.
          </p>

          {/* Monthly / Yearly Billing Toggle */}
          <div className="mt-6 inline-flex items-center bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                !isYearly
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                isYearly
                  ? "bg-violet-700 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Yearly Billing
              <span className="bg-emerald-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                SAVE 2 MONTHS
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {MOCK_PRICING_PLANS.map((plan) => {
            const monthlyPaise = plan.monthlyPriceInPaise || plan.monthlyPrice * 100;
            const yearlyPaise = plan.yearlyPriceInPaise || plan.yearlyPrice * 100;
            const pricePaise = isYearly ? Math.floor(yearlyPaise / 12) : monthlyPaise;

            return (
              <div
                key={plan.id}
                className={`bg-white rounded-3xl p-8 border flex flex-col justify-between transition-all duration-300 relative ${
                  plan.isPopular
                    ? "border-violet-600 shadow-2xl ring-2 ring-violet-600/20 md:scale-105 z-10"
                    : "border-slate-200/80 shadow-md hover:border-slate-300"
                }`}
              >
                {plan.isPopular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-violet-700 text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                    MOST POPULAR FOR CREATORS
                  </span>
                )}

                <div>
                  <h3 className="font-extrabold text-slate-900 text-xl">{plan.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{plan.libraryAccess}</p>

                  <div className="my-6 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900">
                      {formatPaiseToINR(pricePaise)}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">/month</span>
                    {isYearly && (
                      <span className="text-[11px] text-slate-400 block ml-2">
                        (Billed {formatPaiseToINR(yearlyPaise)}/yr)
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                      Included in {plan.name}:
                    </span>
                    {plan.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <Check className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    href="/register"
                    className={`w-full text-center py-3 px-4 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 ${
                      plan.isPopular
                        ? "bg-violet-700 hover:bg-violet-800 text-white shadow-lg shadow-violet-200"
                        : "bg-slate-900 hover:bg-slate-800 text-white"
                    }`}
                  >
                    {plan.buttonText} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pay-as-you-go alternative notice */}
        <div className="mt-12 text-center text-xs sm:text-sm text-slate-600 bg-white p-4 rounded-2xl border border-slate-200/80 max-w-2xl mx-auto shadow-xs">
          💡 <strong>Prefer buying only what you need?</strong> Individual products and bundles are available without a subscription.
        </div>
      </div>
    </section>
  );
};
