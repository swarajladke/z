"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { CategoryShortcuts } from "@/components/home/CategoryShortcuts";
import { ExploreAssets } from "@/components/home/ExploreAssets";
import { FeaturedBundle } from "@/components/home/FeaturedBundle";
import { CuratedCollections } from "@/components/home/CuratedCollections";
import { FreeAssetsCarousel } from "@/components/home/FreeAssetsCarousel";
import { LicensingInfo } from "@/components/home/LicensingInfo";
import { PricingSection } from "@/components/home/PricingSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { SearchBarModal } from "@/components/catalog/SearchBarModal";

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Category Shortcuts */}
        <CategoryShortcuts />

        {/* Explore Featured Assets */}
        <ExploreAssets />

        {/* Editorial Featured Mega-Pack Bundle */}
        <FeaturedBundle />

        {/* Curated Collections Collage */}
        <CuratedCollections />

        {/* Free Assets Strip */}
        <FreeAssetsCarousel />

        {/* Licensing & Assurance */}
        <LicensingInfo />

        {/* Pricing Comparison */}
        <PricingSection />

        {/* Newsletter Community */}
        <NewsletterSection />
      </main>

      <SearchBarModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
