"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand.config";

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-violet-900 via-slate-900 to-violet-950 text-white relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center mx-auto border border-cyan-400/30">
            <Mail className="w-6 h-6" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Fresh assets, delivered occasionally.
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Get new releases, free resources and seasonal collection updates directly in your inbox. No spam ever.
          </p>

          {isSubscribed ? (
            <div className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 p-4 rounded-2xl flex items-center justify-center gap-2 text-sm font-semibold animate-in fade-in duration-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Awesome! You&apos;ve been subscribed to KalaStock updates. Check your inbox soon!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 bg-slate-800/90 text-white placeholder:text-slate-400 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-cyan-400 font-medium"
              />
              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm px-6 py-3 rounded-xl transition-colors shadow-lg shadow-cyan-500/30 shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}

          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>We respect your privacy. Unsubscribe anytime with 1-click.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
