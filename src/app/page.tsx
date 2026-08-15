"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { CategoryShortcuts } from "@/components/home/CategoryShortcuts";
import { ExploreAssets } from "@/components/home/ExploreAssets";
import { FeaturedBundle } from "@/components/home/FeaturedBundle";
import { CuratedCollections } from "@/components/home/CuratedCollections";
import { FreeAssetsCarousel } from "@/components/home/FreeAssetsCarousel";
import { PlatformBenefits } from "@/components/home/PlatformBenefits";
import { PricingSection } from "@/components/home/PricingSection";
import { LicensingSection } from "@/components/home/LicensingSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { SearchBarModal } from "@/components/catalog/SearchBarModal";

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col">
      <Header onOpenSearch={() => setIsSearchOpen(true)} />
      
      {/* 11 Homepage Sections */}
      <Hero onOpenSearch={() => setIsSearchOpen(true)} />
      <CategoryShortcuts />
      <ExploreAssets />
      <FeaturedBundle />
      <CuratedCollections />
      <FreeAssetsCarousel />
      <PlatformBenefits />
      <PricingSection />
      <LicensingSection />
      <NewsletterSection />

      {/* Global Search Autocomplete Modal */}
      <SearchBarModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </main>
  );
}
