"use client";

import React from "react";
import Link from "next/link";
import { Mail, Globe, ShieldCheck } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand.config";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#171717] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center text-white font-black text-lg">
                K
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                {BRAND_CONFIG.name}
              </span>
            </Link>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-normal">
              {BRAND_CONFIG.positioning} Instant commercial digital file access for Indian creators and agencies.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <a href="mailto:support@kalastock.in" className="hover:text-white transition-colors">
                  support@kalastock.in
                </a>
              </div>
              <div className="flex items-center gap-1 bg-slate-900 px-2.5 py-1.5 rounded-xl border border-slate-800 text-[11px] font-bold">
                <Globe className="w-3.5 h-3.5 text-violet-400" />
                <span>INR (₹)</span>
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">
              Asset Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/assets?category=Social+Media" className="hover:text-white transition-colors">
                  Social Media Templates
                </Link>
              </li>
              <li>
                <Link href="/assets?category=Festival+Designs" className="hover:text-white transition-colors">
                  Festival Designs & Rangoli
                </Link>
              </li>
              <li>
                <Link href="/assets?category=Wedding" className="hover:text-white transition-colors">
                  Indian Wedding Collection
                </Link>
              </li>
              <li>
                <Link href="/assets?assetType=Vector" className="hover:text-white transition-colors">
                  Mandala & Vectors
                </Link>
              </li>
              <li>
                <Link href="/assets?assetType=Presentation" className="hover:text-white transition-colors">
                  Pitch Decks & Presentations
                </Link>
              </li>
              <li>
                <Link href="/assets?filter=free" className="hover:text-emerald-400 font-semibold transition-colors">
                  Free Asset Vault
                </Link>
              </li>
            </ul>
          </div>

          {/* Supported Applications */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">
              Source Formats
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/assets?format=PSD" className="hover:text-white transition-colors">
                  Photoshop PSD Files
                </Link>
              </li>
              <li>
                <Link href="/assets?format=Canva" className="hover:text-white transition-colors">
                  Canva Template Links
                </Link>
              </li>
              <li>
                <Link href="/assets?format=AI" className="hover:text-white transition-colors">
                  Adobe Illustrator AI
                </Link>
              </li>
              <li>
                <Link href="/assets?format=SVG" className="hover:text-white transition-colors">
                  Scalable Vector SVG
                </Link>
              </li>
              <li>
                <Link href="/assets?format=PNG" className="hover:text-white transition-colors">
                  Transparent PNG Elements
                </Link>
              </li>
            </ul>
          </div>

          {/* Licensing & Trust */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">
              Licensing & Support
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/#licensing" className="hover:text-white transition-colors">
                  Commercial Rights Overview
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-white transition-colors">
                  Subscription Plans
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  Customer Download Vault
                </Link>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} {BRAND_CONFIG.name}. All rights reserved. Made for Indian Creators.</p>
          <div className="flex items-center gap-1.5 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Commercial Rights Guaranteed</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
