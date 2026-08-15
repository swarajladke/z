"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Zap, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MOCK_PRICING_PLANS } from "@/data/mock-pricing";
import { formatPaiseToINR } from "@/lib/utils";

export const PricingSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-20 bg-[#F5F2EC] border-b border-[rgba(23,23,23,0.12)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-[#6D28D9] text-xs font-extrabold uppercase tracking-wider mb-2">
            <Zap className="w-4 h-4 text-[#06B6D4]" />
            Simple Transparent Subscription
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#171717] tracking-tight">
            Choose how you create
          </h2>
          <p className="text-[#6F6A63] text-xs sm:text-sm mt-2 font-normal">
            Save time and costs with flat monthly or annual download plans for your agency.
          </p>

          {/* Monthly / Yearly Billing Toggle */}
          <div className="mt-6 inline-flex items-center bg-[#FCFAF6] p-1.5 rounded-2xl border border-[rgba(23,23,23,0.12)] shadow-2xs">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                !isYearly
                  ? "bg-[#171717] text-white shadow-xs"
                  : "text-[#6F6A63] hover:text-[#171717]"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                isYearly
                  ? "bg-[#6D28D9] text-white shadow-xs"
                  : "text-[#6F6A63] hover:text-[#171717]"
              }`}
            >
              Yearly Billing
              <span className="bg-[#10B981] text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
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
                    ? "border-[#6D28D9] shadow-2xl ring-2 ring-violet-600/20 md:scale-105 z-10"
                    : "border-[rgba(23,23,23,0.12)] shadow-xs hover:border-slate-300"
                }`}
              >
                {plan.isPopular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#6D28D9] text-white text-xs font-extrabold uppercase px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                    MOST POPULAR FOR CREATORS
                  </span>
                )}

                <div>
                  <h3 className="font-extrabold text-[#171717] text-xl">{plan.name}</h3>
                  <p className="text-xs text-[#6F6A63] mt-1">{plan.libraryAccess}</p>

                  {/* Vertical Price Crossfade with AnimatePresence */}
                  <div className="my-6 min-h-[56px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={isYearly ? "yearly" : "monthly"}
                        initial={shouldReduceMotion ? false : { opacity: 0, y: isYearly ? 8 : -8 }}
                        animate="visible"
                        exit={shouldReduceMotion ? undefined : { opacity: 0, y: isYearly ? -8 : 8 }}
                        variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.2 } } }}
                        className="flex items-baseline gap-1"
                      >
                        <span className="text-4xl font-black text-[#171717]">
                          {formatPaiseToINR(pricePaise)}
                        </span>
                        <span className="text-xs text-[#6F6A63] font-semibold">/month</span>
                        {isYearly && (
                          <span className="text-xs text-slate-400 block ml-2">
                            (Billed {formatPaiseToINR(yearlyPaise)}/yr)
                          </span>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <span className="text-xs font-extrabold text-[#171717] uppercase tracking-wider block">
                      Included in {plan.name}:
                    </span>
                    {plan.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <Check className="w-4 h-4 text-[#6D28D9] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    href="/register"
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 hover:-translate-y-[1px] group ${
                      plan.isPopular
                        ? "bg-[#6D28D9] hover:bg-[#5B21B6] text-white shadow-lg shadow-violet-200"
                        : "bg-[#171717] hover:bg-slate-800 text-white"
                    }`}
                  >
                    <span>{plan.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-[3px] transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pay-as-you-go alternative notice */}
        <div className="mt-12 text-center text-xs sm:text-sm text-slate-700 bg-white p-4 rounded-2xl border border-[rgba(23,23,23,0.12)] max-w-2xl mx-auto shadow-2xs">
          💡 <strong>Prefer buying only what you need?</strong> Individual products and bundles are available without a subscription.
        </div>
      </div>
    </section>
  );
};
