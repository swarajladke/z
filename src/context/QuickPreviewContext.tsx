"use client";

import React, { createContext, useContext, useState } from "react";
import { Product } from "@/types";

interface QuickPreviewContextType {
  previewProduct: Product | null;
  openQuickPreview: (product: Product) => void;
  closeQuickPreview: () => void;
}

const QuickPreviewContext = createContext<QuickPreviewContextType | undefined>(undefined);

export const QuickPreviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);

  const openQuickPreview = (product: Product) => {
    setPreviewProduct(product);
  };

  const closeQuickPreview = () => {
    setPreviewProduct(null);
  };

  return (
    <QuickPreviewContext.Provider
      value={{
        previewProduct,
        openQuickPreview,
        closeQuickPreview,
      }}
    >
      {children}
    </QuickPreviewContext.Provider>
  );
};

export const useQuickPreview = () => {
  const context = useContext(QuickPreviewContext);
  if (!context) {
    throw new Error("useQuickPreview must be used within a QuickPreviewProvider");
  }
  return context;
};
