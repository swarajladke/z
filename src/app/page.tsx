"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { OpenIntro } from "@/components/home/OpenIntro";
import { CategoryShortcuts } from "@/components/home/CategoryShortcuts";
import { ExploreAssets } from "@/components/home/ExploreAssets";
import { FeaturedBundle } from "@/components/home/FeaturedBundle";
import { BentoDiscovery } from "@/components/home/BentoDiscovery";
import { CuratedCollections } from "@/components/home/CuratedCollections";
import { FreeAssetsCarousel } from "@/components/home/FreeAssetsCarousel";
import { AssetWorkflow } from "@/components/home/AssetWorkflow";
import { MadeWithKalaStock } from "@/components/home/MadeWithKalaStock";
import { PlatformBenefits } from "@/components/home/PlatformBenefits";
import { CreativeLibrary } from "@/components/home/CreativeLibrary";
import { PricingSection } from "@/components/home/PricingSection";
import { LicensingInfo } from "@/components/home/LicensingInfo";
import { FAQAccordion } from "@/components/home/FAQAccordion";
import { ClosingBanner } from "@/components/home/ClosingBanner";
import { SearchBarModal } from "@/components/catalog/SearchBarModal";

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EC]">
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      <main className="flex-1">
        {/* 1. Cinematic Seasonal Hero */}
        <Hero />

        {/* 2. Open Editorial Introduction */}
        <OpenIntro />

        {/* 3. Category Carousel */}
        <CategoryShortcuts />

        {/* 4. Explore Assets */}
        <ExploreAssets />

        {/* 5. Featured Campaign Bundle */}
        <FeaturedBundle />

        {/* 6. Editorial Bento Discovery */}
        <BentoDiscovery />

        {/* 7. Curated Use-Case Collections */}
        <CuratedCollections />

        {/* 8. Free Assets Strip */}
        <FreeAssetsCarousel />

        {/* 9. Asset-to-Campaign Workflow */}
        <AssetWorkflow />

        {/* 10. Made with KalaStock Showcase */}
        <MadeWithKalaStock />

        {/* 11. Platform Benefits */}
        <PlatformBenefits />

        {/* 12. Dark Creative-Library Section */}
        <CreativeLibrary />

        {/* 13. Pricing Comparison */}
        <PricingSection />

        {/* 14. Licensing & Assurance */}
        <LicensingInfo />

        {/* 15. FAQ Accordion */}
        <FAQAccordion />

        {/* 16. Closing Campaign Banner */}
        <ClosingBanner />
      </main>

      <SearchBarModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
