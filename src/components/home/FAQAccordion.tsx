"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "What files are included in a download?",
    a: "Every product includes layered source files such as Photoshop PSDs, Canva template edit links, Adobe Illustrator AI/EPS vectors, transparent PNGs, or PowerPoint slides as specified on the product page.",
  },
  {
    q: "Can products be used commercially for client projects?",
    a: "Yes! All purchases include lifetime commercial rights for client graphics, agency ads, Instagram reels, food menus, YouTube channels, and print packaging.",
  },
  {
    q: "Is a subscription required to buy individual assets?",
    a: "No. Subscription plans offer flat monthly allowances, but individual templates, vectors and bundles can be purchased anytime without a subscription.",
  },
  {
    q: "How do digital downloads work after checkout?",
    a: "Immediately after demo payment, your files unlock automatically in your Customer Account Vault with instant ZIP download links.",
  },
  {
    q: "Which applications are supported?",
    a: "We support Adobe Photoshop CC, Canva, Adobe Illustrator, CorelDraw, Figma, Figma 3D, and Microsoft PowerPoint.",
  },
  {
    q: "Can assets be re-sold or redistributed?",
    a: "No. Re-selling or redistributing raw PSD/Canva links in open drives or stock platforms is strictly prohibited.",
  },
];

export const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-[#FCFAF6] border-b border-[rgba(23,23,23,0.12)] text-[#171717]">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-[#6D28D9] text-xs font-extrabold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-[#06B6D4]" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Got questions? We have answers.
          </h2>
          <p className="text-xs sm:text-sm text-[#6F6A63]">
            Learn how licensing, source files, and digital downloads work on KalaStock.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[rgba(23,23,23,0.12)] overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full p-5 text-left font-extrabold text-sm sm:text-base text-[#171717] flex items-center justify-between gap-4 hover:text-[#6D28D9] transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#6F6A63] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#6D28D9]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#6F6A63] leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-200">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
