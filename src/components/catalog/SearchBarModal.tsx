"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, Tag, Sparkles } from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { BRAND_CONFIG } from "@/config/brand.config";
import { formatCurrency } from "@/lib/utils";

interface SearchBarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchBarModal: React.FC<SearchBarModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = query.trim()
    ? MOCK_PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
          p.fileFormats.some((f) => f.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/assets?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleChipClick = (keyword: string) => {
    router.push(`/assets?q=${encodeURIComponent(keyword)}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-slate-200 px-4 py-3.5 bg-slate-50/50">
          <Search className="w-5 h-5 text-violet-600 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search templates, vectors, PNGs, fonts..."
            className="w-full bg-transparent text-slate-900 text-base placeholder:text-slate-400 focus:outline-hidden font-medium"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            className="ml-2 bg-violet-700 hover:bg-violet-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
          >
            Search
          </button>
        </form>

        {/* Results or Popular keywords */}
        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-5">
          {query.trim() ? (
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>Matching Assets ({filteredProducts.length})</span>
                {filteredProducts.length > 0 && (
                  <Link
                    href={`/assets?q=${encodeURIComponent(query)}`}
                    onClick={onClose}
                    className="text-violet-700 text-xs hover:underline flex items-center gap-1 font-semibold"
                  >
                    View all results <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>

              {filteredProducts.length > 0 ? (
                <div className="space-y-2.5">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-violet-50/70 border border-slate-100 hover:border-violet-200 transition-all group"
                    >
                      <img
                        src={product.thumbnailUrl}
                        alt={product.title}
                        className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-200/60"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-slate-900 group-hover:text-violet-700 truncate">
                          {product.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                          <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-medium">
                            {product.category}
                          </span>
                          <span>•</span>
                          <span className="font-semibold text-slate-700">
                            {product.isFree ? (
                              <span className="text-emerald-600">FREE</span>
                            ) : (
                              formatCurrency(product.price)
                            )}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-violet-600 group-hover:translate-x-1 transition-all mr-1" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">
                  No direct matches found for &quot;{query}&quot;. Try popular keywords below.
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Popular Search Chips */}
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-cyan-600" />
                  Popular Keyword Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {BRAND_CONFIG.popularSearches.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => handleChipClick(chip)}
                      className="bg-slate-100 hover:bg-violet-50 text-slate-700 hover:text-violet-700 border border-slate-200 hover:border-violet-200 text-xs font-medium px-3 py-1.5 rounded-full transition-all flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-cyan-500" />
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Categories */}
              <div className="border-t pt-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
                  Featured Categories
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { name: "Festival Designs", count: "2,350 assets", href: "/assets?category=festival-designs" },
                    { name: "Social Media", count: "1,420 assets", href: "/assets?category=social-media" },
                    { name: "Wedding Suite", count: "860 assets", href: "/assets?category=wedding" },
                    { name: "3D Icons", count: "430 assets", href: "/assets?assetType=Icon" },
                    { name: "PowerPoint Decks", count: "520 assets", href: "/assets?assetType=Presentation" },
                    { name: "Free SVG/PNG", count: "Free", href: "/assets?filter=free" },
                  ].map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      onClick={onClose}
                      className="p-2.5 rounded-xl border border-slate-100 hover:border-violet-200 hover:bg-violet-50/50 transition-colors"
                    >
                      <div className="text-xs font-semibold text-slate-800">{cat.name}</div>
                      <div className="text-[10px] text-slate-400">{cat.count}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200/80 px-5 py-2.5 flex items-center justify-between text-[11px] text-slate-500">
          <span>Press <kbd className="font-sans font-semibold bg-white border px-1 rounded">ESC</kbd> to close</span>
          <span>Single-Seller Creative Store • KalaStock</span>
        </div>
      </div>
    </div>
  );
};
