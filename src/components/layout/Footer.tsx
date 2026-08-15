"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Globe } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand.config";
import { useAuth } from "@/context/AuthContext";

export const Footer: React.FC = () => {
  const [currency, setCurrency] = useState("INR (₹)");
  const [language, setLanguage] = useState("English (IN)");
  const { isAdmin } = useAuth();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-violet-900/50">
                K
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                {BRAND_CONFIG.name}
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {BRAND_CONFIG.positioning} High-resolution PSD, Canva, AI vectors, PNG elements & fonts built for fast modern creation.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-400">Support:</span>
              <a
                href={`mailto:${BRAND_CONFIG.supportEmail}`}
                className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
              >
                <Mail className="w-3.5 h-3.5" />
                {BRAND_CONFIG.supportEmail}
              </a>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
              Products
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/assets?assetType=Template" className="hover:text-cyan-400 transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/assets?assetType=Vector" className="hover:text-cyan-400 transition-colors">
                  Vectors
                </Link>
              </li>
              <li>
                <Link href="/assets?assetType=PNG" className="hover:text-cyan-400 transition-colors">
                  PNG Assets
                </Link>
              </li>
              <li>
                <Link href="/assets?assetType=Font" className="hover:text-cyan-400 transition-colors">
                  Fonts
                </Link>
              </li>
              <li>
                <Link href="/assets?assetType=Bundle" className="hover:text-cyan-400 transition-colors">
                  Creative Bundles
                </Link>
              </li>
              <li>
                <Link href="/assets?filter=free" className="hover:text-emerald-400 font-semibold transition-colors">
                  Free Assets
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/#pricing" className="hover:text-cyan-400 transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/#licensing" className="hover:text-cyan-400 transition-colors">
                  Licensing Guide
                </Link>
              </li>
              <li>
                <Link href="/assets?category=festival-designs" className="hover:text-cyan-400 transition-colors">
                  Festival Collection
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-cyan-400 transition-colors">
                  Customer Login
                </Link>
              </li>
              {/* Only render Admin UI link if user is logged in as admin */}
              {isAdmin && (
                <li>
                  <Link href="/admin" className="hover:text-violet-400 font-semibold transition-colors">
                    Admin UI
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#help" className="hover:text-cyan-400 transition-colors">
                  Help Centre
                </a>
              </li>
              <li>
                <a href="#download-help" className="hover:text-cyan-400 transition-colors">
                  Download Help
                </a>
              </li>
              <li>
                <a href="#license-guide" className="hover:text-cyan-400 transition-colors">
                  License Guide
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND_CONFIG.supportEmail}`} className="hover:text-cyan-400 transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#terms" className="hover:text-cyan-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#refund" className="hover:text-cyan-400 transition-colors">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="#download-policy" className="hover:text-cyan-400 transition-colors">
                  Download Policy
                </a>
              </li>
              <li>
                <a href="#license-terms" className="hover:text-cyan-400 transition-colors">
                  License Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {BRAND_CONFIG.name}. All rights reserved. Single-Seller Digital Asset Platform.
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-slate-400">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-slate-800 text-slate-300 rounded px-2 py-1 focus:outline-hidden text-xs"
              >
                <option value="English (IN)">English (IN)</option>
                <option value="Hindi">Hindi (हिंदी)</option>
              </select>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-slate-800 text-slate-300 rounded px-2 py-1 focus:outline-hidden text-xs"
              >
                <option value="INR (₹)">INR (₹)</option>
                <option value="USD ($)">USD ($)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
