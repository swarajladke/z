"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  SlidersHorizontal,
  X,
  ChevronRight,
  Filter,
  RotateCcw,
  Tag,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { ProductCard } from "@/components/product/ProductCard";
import { SearchBarModal } from "@/components/catalog/SearchBarModal";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProductGridSkeleton } from "@/components/ui/LoadingSkeleton";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { MOCK_CATEGORIES } from "@/data/mock-categories";

function AssetsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read URL query parameters
  const queryParam = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "";
  const assetTypeParam = searchParams.get("assetType") || "";
  const tierParam = searchParams.get("tier") || searchParams.get("filter") || "all";
  const formatParam = searchParams.get("format") || "";
  const sortParam = searchParams.get("sort") || "relevant";

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync state with URL params
  const [selectedAssetTypes, setSelectedAssetTypes] = useState<string[]>(
    assetTypeParam ? assetTypeParam.split(",") : []
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [MOCK_CATEGORIES.find((c) => c.slug === categoryParam)?.title || categoryParam] : []
  );
  const [selectedFormats, setSelectedFormats] = useState<string[]>(
    formatParam ? formatParam.split(",") : []
  );
  const [pricingType, setPricingType] = useState<"all" | "free" | "premium">(
    tierParam === "free" ? "free" : tierParam === "premium" ? "premium" : "all"
  );
  const [sortBy, setSortBy] = useState<"relevant" | "newest" | "popular" | "price-asc" | "price-desc">(
    (sortParam as any) || "relevant"
  );

  // Synchronize state changes to URL query parameters
  const updateUrlParams = (
    types: string[],
    cats: string[],
    formats: string[],
    tier: string,
    sort: string
  ) => {
    const params = new URLSearchParams();
    if (queryParam) params.set("q", queryParam);
    if (types.length > 0) params.set("assetType", types.join(","));
    if (cats.length > 0) {
      const slug = MOCK_CATEGORIES.find((c) => c.title === cats[0])?.slug || cats[0];
      params.set("category", slug);
    }
    if (formats.length > 0) params.set("format", formats.join(","));
    if (tier !== "all") params.set("tier", tier);
    if (sort !== "relevant") params.set("sort", sort);

    router.replace(`/assets?${params.toString()}`, { scroll: false });
  };

  // Computed Filtered Products
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // Query filter
      if (queryParam) {
        const q = queryParam.toLowerCase();
        const matchesQuery =
          product.title.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // Asset Type Filter
      if (selectedAssetTypes.length > 0) {
        if (!selectedAssetTypes.includes(product.assetType)) return false;
      }

      // Category Filter
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(product.category)) return false;
      }

      // Format Filter
      if (selectedFormats.length > 0) {
        const hasFormat = product.fileFormats.some((f) => selectedFormats.includes(f));
        if (!hasFormat) return false;
      }

      // Pricing Type Filter
      if (pricingType === "free" && !product.isFree) return false;
      if (pricingType === "premium" && product.isFree) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === "popular") return b.downloadCount - a.downloadCount;
      if (sortBy === "price-asc") return (a.priceInPaise || a.price) - (b.priceInPaise || b.price);
      if (sortBy === "price-desc") return (b.priceInPaise || b.price) - (a.priceInPaise || a.price);
      return 0; // Most relevant default
    });
  }, [queryParam, selectedAssetTypes, selectedCategories, selectedFormats, pricingType, sortBy]);

  const activeFilterCount =
    selectedAssetTypes.length +
    selectedCategories.length +
    selectedFormats.length +
    (pricingType !== "all" ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedAssetTypes([]);
    setSelectedCategories([]);
    setSelectedFormats([]);
    setPricingType("all");
    setSortBy("relevant");
    router.replace("/assets", { scroll: false });
  };

  const toggleAssetType = (type: string) => {
    const next = selectedAssetTypes.includes(type)
      ? selectedAssetTypes.filter((t) => t !== type)
      : [...selectedAssetTypes, type];
    setSelectedAssetTypes(next);
    updateUrlParams(next, selectedCategories, selectedFormats, pricingType, sortBy);
  };

  const toggleFormat = (fmt: string) => {
    const next = selectedFormats.includes(fmt)
      ? selectedFormats.filter((f) => f !== fmt)
      : [...selectedFormats, fmt];
    setSelectedFormats(next);
    updateUrlParams(selectedAssetTypes, selectedCategories, next, pricingType, sortBy);
  };

  const handlePricingTypeChange = (tier: "all" | "free" | "premium") => {
    setPricingType(tier);
    updateUrlParams(selectedAssetTypes, selectedCategories, selectedFormats, tier, sortBy);
  };

  const handleSortChange = (sort: any) => {
    setSortBy(sort);
    updateUrlParams(selectedAssetTypes, selectedCategories, selectedFormats, pricingType, sort);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Hero Header Banner */}
      <div className="bg-slate-900 text-white py-8 sm:py-10 border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-3">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">Assets</span>
            {categoryParam && (
              <>
                <ChevronRight className="w-3 h-3" />
                <span className="text-cyan-400 font-medium capitalize">{categoryParam.replace("-", " ")}</span>
              </>
            )}
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {queryParam
                  ? `Search Results for "${queryParam}"`
                  : categoryParam
                  ? `${categoryParam.replace("-", " ").toUpperCase()} Templates & Assets`
                  : "All Digital Assets & Creative Packs"}
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Browse production-ready PSD, Canva, AI vectors, PNGs and fonts for Indian creators.
              </p>
            </div>

            <div className="text-xs text-slate-400 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700 font-medium shrink-0 self-start md:self-auto">
              Showing <strong className="text-white">{filteredProducts.length}</strong> items
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-violet-700" /> Filters
                {activeFilterCount > 0 && (
                  <span className="bg-violet-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </span>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-violet-700 hover:underline flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3 h-3" /> Clear All
                </button>
              )}
            </div>

            {/* Asset Types Filter */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Asset Type
              </span>
              <div className="space-y-1.5 text-xs font-medium text-slate-700">
                {["Template", "Vector", "PNG", "Font", "Icon", "Presentation", "Bundle"].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer hover:text-violet-700">
                    <input
                      type="checkbox"
                      checked={selectedAssetTypes.includes(type)}
                      onChange={() => toggleAssetType(type)}
                      className="rounded text-violet-600 focus:ring-violet-500"
                    />
                    <span>{type}s</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Access Tier Filter */}
            <div className="space-y-2 pt-4 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Access Tier
              </span>
              <div className="space-y-1.5 text-xs font-medium text-slate-700">
                {[
                  { id: "all", label: "All Items" },
                  { id: "free", label: "Free Downloads Only" },
                  { id: "premium", label: "Premium Paid Assets" },
                ].map((tier) => (
                  <label key={tier.id} className="flex items-center gap-2 cursor-pointer hover:text-violet-700">
                    <input
                      type="radio"
                      name="pricingType"
                      checked={pricingType === tier.id}
                      onChange={() => handlePricingTypeChange(tier.id as any)}
                      className="text-violet-600 focus:ring-violet-500"
                    />
                    <span>{tier.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* File Formats Filter */}
            <div className="space-y-2 pt-4 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Source File Format
              </span>
              <div className="space-y-1.5 text-xs font-medium text-slate-700">
                {["PSD", "Canva", "AI", "EPS", "SVG", "PNG", "PPTX", "TTF"].map((fmt) => (
                  <label key={fmt} className="flex items-center gap-2 cursor-pointer hover:text-violet-700">
                    <input
                      type="checkbox"
                      checked={selectedFormats.includes(fmt)}
                      onChange={() => toggleFormat(fmt)}
                      className="rounded text-violet-600 focus:ring-violet-500"
                    />
                    <span>{fmt} Source</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Product Grid Area */}
          <main className="flex-1 space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors"
              >
                <Filter className="w-4 h-4 text-violet-700" />
                Filter Assets
                {activeFilterCount > 0 && (
                  <span className="bg-violet-700 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Active Filter Chips */}
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="text-slate-400 font-medium">Active:</span>
                {selectedAssetTypes.map((t) => (
                  <span key={t} className="bg-violet-50 text-violet-700 font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 border border-violet-200">
                    {t} <X className="w-3 h-3 cursor-pointer" onClick={() => toggleAssetType(t)} />
                  </span>
                ))}
                {pricingType !== "all" && (
                  <span className="bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 border border-emerald-200">
                    {pricingType === "free" ? "Free Only" : "Premium Only"}{" "}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => handlePricingTypeChange("all")} />
                  </span>
                )}
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-rose-600 font-bold hover:underline ml-1"
                  >
                    Clear All
                  </button>
                )}
                {activeFilterCount === 0 && <span className="text-slate-400 italic">None</span>}
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-xs font-bold text-slate-600">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-violet-600"
                >
                  <option value="relevant">Most Relevant</option>
                  <option value="newest">Newest Releases</option>
                  <option value="popular">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Product Grid or Loading Skeleton or Empty State */}
            {isLoading ? (
              <ProductGridSkeleton count={8} />
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No matching digital assets found"
                description={`No assets match your active filters or query "${queryParam}". Try clearing active filters or searching for broader keywords like "Independence Day" or "Vector".`}
                onReset={clearAllFilters}
              />
            )}
          </main>
        </div>
      </div>

      {/* Accessible Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-xs h-full flex flex-col justify-between p-6 overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-slate-900 text-base">Filter Assets</h3>
                  {activeFilterCount > 0 && (
                    <span className="bg-violet-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Asset Types Filter */}
              <div className="space-y-2 mb-6">
                <span className="text-xs font-bold text-slate-900 uppercase">Asset Types</span>
                {["Template", "Vector", "PNG", "Font", "Icon", "Presentation", "Bundle"].map((t) => (
                  <label key={t} className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedAssetTypes.includes(t)}
                      onChange={() => toggleAssetType(t)}
                      className="rounded text-violet-600"
                    />
                    <span>{t}s</span>
                  </label>
                ))}
              </div>

              {/* Access Tier */}
              <div className="space-y-2 mb-6 border-t pt-4">
                <span className="text-xs font-bold text-slate-900 uppercase">Access Tier</span>
                {[
                  { id: "all", label: "All Items" },
                  { id: "free", label: "Free Downloads Only" },
                  { id: "premium", label: "Premium Paid Assets" },
                ].map((tier) => (
                  <label key={tier.id} className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="mobilePricingType"
                      checked={pricingType === tier.id}
                      onChange={() => handlePricingTypeChange(tier.id as any)}
                      className="text-violet-600"
                    />
                    <span>{tier.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t">
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="w-full border border-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs hover:bg-slate-50"
                >
                  Clear All Filters
                </button>
              )}
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-violet-700 text-white font-bold py-3 rounded-xl text-xs shadow-xs"
              >
                Show {filteredProducts.length} Results
              </button>
            </div>
          </div>
        </div>
      )}

      <SearchBarModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}

export default function AssetsPage() {
  return (
    <Suspense fallback={<ProductGridSkeleton count={8} />}>
      <AssetsContent />
    </Suspense>
  );
}
