"use client";

import React, { createContext, useContext, useState } from "react";
import { Product, CartItem, LicenseType } from "@/types";
import { calculateLicensePricePaise } from "@/lib/utils";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, license?: LicenseType) => void;
  removeFromCart: (productId: string, license: LicenseType) => void;
  updateItemLicense: (productId: string, oldLicense: LicenseType, newLicense: LicenseType) => void;
  clearCart: () => void;
  couponCode: string;
  couponDiscountPercent: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotalInPaise: number;
  discountAmountInPaise: number;
  totalAmountInPaise: number;
  subtotal: number;
  discountAmount: number;
  totalAmount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItemCount: number;
}

const DEFAULT_INITIAL_CART_ITEM: CartItem = {
  product: {
    id: "prod-1",
    slug: "independence-day-social-media-pack",
    title: "Independence Day Social Media Pack",
    category: "Festival Designs",
    assetType: "Template",
    tags: ["Independence Day"],
    description: "Fully editable social media templates for 15th August.",
    includedFilesText: "15 PSD files",
    priceInPaise: 14900,
    price: 149,
    originalPriceInPaise: 29900,
    originalPrice: 299,
    isPremium: true,
    fileFormats: ["PSD", "Canva"],
    softwareCompatibility: ["Photoshop", "Canva"],
    thumbnailUrl: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=800&q=80",
    galleryImages: [],
    lastUpdated: "2026-08-01",
    downloadCount: 1420,
    ratingPlaceholder: 4.9,
  },
  selectedLicense: "commercial",
  calculatedPriceInPaise: calculateLicensePricePaise(14900, "commercial"),
  quantity: 1,
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state directly without setState in useEffect
  const [cartItems, setCartItems] = useState<CartItem[]>([DEFAULT_INITIAL_CART_ITEM]);
  const [couponCode, setCouponCode] = useState<string>("");
  const [couponDiscountPercent, setCouponDiscountPercent] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const addToCart = (product: Product, license: LicenseType = "commercial") => {
    const basePaise = product.priceInPaise ?? Math.round(product.price * 100);
    const itemPricePaise = calculateLicensePricePaise(basePaise, license);

    setCartItems((prev) => {
      // Check if product is already in cart with the SAME license
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedLicense === license
      );
      if (existingIndex > -1) {
        return prev;
      }
      return [
        ...prev,
        {
          product,
          selectedLicense: license,
          calculatedPriceInPaise: itemPricePaise,
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, license: LicenseType) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedLicense === license)
      )
    );
  };

  const updateItemLicense = (productId: string, oldLicense: LicenseType, newLicense: LicenseType) => {
    setCartItems((prev) => {
      return prev.map((item) => {
        if (item.product.id === productId && item.selectedLicense === oldLicense) {
          const basePaise = item.product.priceInPaise ?? Math.round(item.product.price * 100);
          const newPricePaise = calculateLicensePricePaise(basePaise, newLicense);
          return {
            ...item,
            selectedLicense: newLicense,
            calculatedPriceInPaise: newPricePaise,
          };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setCouponCode("");
    setCouponDiscountPercent(0);
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "KALA20") {
      setCouponCode("KALA20");
      setCouponDiscountPercent(20);
      return { success: true, message: "Coupon 'KALA20' applied! (20% OFF)" };
    }
    if (cleanCode === "FESTIVE50") {
      setCouponCode("FESTIVE50");
      setCouponDiscountPercent(50);
      return { success: true, message: "Festival special! 50% OFF applied." };
    }
    return { success: false, message: "Invalid coupon code. Try 'KALA20'" };
  };

  const removeCoupon = () => {
    setCouponCode("");
    setCouponDiscountPercent(0);
  };

  const subtotalInPaise = cartItems.reduce(
    (sum, item) => sum + item.calculatedPriceInPaise,
    0
  );

  const discountAmountInPaise = Math.floor((subtotalInPaise * couponDiscountPercent) / 100);
  const totalAmountInPaise = Math.max(0, subtotalInPaise - discountAmountInPaise);

  const subtotal = Math.floor(subtotalInPaise / 100);
  const discountAmount = Math.floor(discountAmountInPaise / 100);
  const totalAmount = Math.floor(totalAmountInPaise / 100);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateItemLicense,
        clearCart,
        couponCode,
        couponDiscountPercent,
        applyCoupon,
        removeCoupon,
        subtotalInPaise,
        discountAmountInPaise,
        totalAmountInPaise,
        subtotal,
        discountAmount,
        totalAmount,
        isCartOpen,
        setIsCartOpen,
        totalItemCount: cartItems.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
