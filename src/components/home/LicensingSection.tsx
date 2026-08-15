"use client";

import React, { useState } from "react";
import { ShieldCheck, Check, X, Info } from "lucide-react";

export const LicensingSection: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section id="licensing" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-violet-700 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Transparent Licensing
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Simple, stress-free rights
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Clear rules so you can design for clients, brands, and personal projects with confidence.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors self-start md:self-auto"
          >
            Compare Licenses Matrix
          </button>
        </div>

        {/* License Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Personal */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-lg">Personal Use</h3>
              <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                1x Price
              </span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Ideal for personal social profiles, student projects, non-commercial blogs, and internal practice.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-200">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" /> Personal social accounts
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" /> Personal portfolio display
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <X className="w-4 h-4 text-rose-500" /> No client work rights
              </li>
            </ul>
          </div>

          {/* Card 2: Commercial */}
          <div className="bg-violet-50/50 p-6 rounded-2xl border border-violet-200 space-y-4 relative">
            <span className="absolute -top-3 right-4 bg-violet-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
              RECOMMENDED FOR AGENCIES
            </span>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-lg">Commercial Use</h3>
              <span className="bg-violet-100 text-violet-800 text-[10px] font-bold px-2 py-0.5 rounded">
                1.5x Price
              </span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Use for client work, commercial social media management, brand promotion, paid ads, and digital prints.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-violet-200">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 font-bold" /> Client social media campaigns
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 font-bold" /> Up to 10,000 physical print runs
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 font-bold" /> Digital ads & YouTube videos
              </li>
            </ul>
          </div>

          {/* Card 3: Extended Commercial */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-lg">Extended Commercial</h3>
              <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                2.5x Price
              </span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              For mass merchandise sales, TV/OTT broadcast ads, or unlimited print runs across multiple client projects.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-200">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" /> Unlimited physical merchandise
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" /> Broadcast & OTT media usage
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" /> Enterprise multi-team access
              </li>
            </ul>
          </div>
        </div>

        {/* Redistribution Notice */}
        <div className="mt-8 bg-rose-50 border border-rose-200 text-rose-900 p-4 rounded-2xl text-xs flex items-start gap-3">
          <Info className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <strong>Strict Redistribution Prohibition:</strong> Reselling, sub-licensing, or sharing raw PSD/Canva source files on public drives or third-party marketplaces is strictly prohibited under all license tiers.
          </div>
        </div>
      </div>

      {/* Comparison Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">License Terms Comparison Matrix</h3>
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b bg-slate-50 text-slate-700">
                    <th className="p-2">Feature</th>
                    <th className="p-2">Personal</th>
                    <th className="p-2">Commercial</th>
                    <th className="p-2">Extended</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-slate-600">
                  <tr>
                    <td className="p-2 font-medium text-slate-900">Client Work</td>
                    <td className="p-2 text-rose-600">No</td>
                    <td className="p-2 text-emerald-600">Yes</td>
                    <td className="p-2 text-emerald-600">Yes</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium text-slate-900">Print Runs</td>
                    <td className="p-2">0</td>
                    <td className="p-2">10,000</td>
                    <td className="p-2">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium text-slate-900">Digital Ads</td>
                    <td className="p-2 text-rose-600">No</td>
                    <td className="p-2 text-emerald-600">Yes</td>
                    <td className="p-2 text-emerald-600">Yes</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium text-slate-900">Merchandise Sale</td>
                    <td className="p-2 text-rose-600">No</td>
                    <td className="p-2 text-rose-600">No</td>
                    <td className="p-2 text-emerald-600">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-slate-900 text-white font-bold py-2 rounded-xl text-xs"
            >
              Close Comparison
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
