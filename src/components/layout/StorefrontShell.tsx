"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AnnouncementBar } from "./AnnouncementBar";
import { Footer } from "./Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { QuickPreviewModal } from "@/components/product/QuickPreviewModal";

export const StorefrontShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isCheckoutRoute = pathname?.startsWith("/checkout");

  return (
    <>
      {!isAdminRoute && !isCheckoutRoute && <AnnouncementBar />}
      <div className="flex-1">{children}</div>
      {!isAdminRoute && !isCheckoutRoute && <Footer />}
      {!isAdminRoute && <CartDrawer />}
      {!isAdminRoute && <QuickPreviewModal />}
    </>
  );
};
