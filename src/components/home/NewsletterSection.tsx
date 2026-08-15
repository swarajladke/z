"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 bg-slate-800 text-cyan-300 text-xs font-bold px-3 py-1 rounded-full border border-slate-700">
            <Mail className="w-3.5 h-3.5" />
            <span>Creative Insider Newsletter</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Get weekly free design assets & festival drops
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Join 14,000+ Indian creators receiving curated PSD templates, vectors and Canva design drops every Tuesday.
          </p>
        </div>

        {isSubscribed ? (
          <div className="bg-emerald-950/80 border border-emerald-700 text-emerald-300 p-4 rounded-2xl max-w-md mx-auto text-xs font-bold flex items-center justify-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Thank you! You are now subscribed to weekly KalaStock drops.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-cyan-400 font-medium"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md shadow-violet-900/50 shrink-0"
            >
              Subscribe Free
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
