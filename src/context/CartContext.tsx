"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem, LicenseType } from "@/types";
import { calculateLicensePrice } from "@/lib/utils";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, license?: LicenseType) => void;
  removeFromCart: (productId: string, license: LicenseType) => void;
  updateQuantity: (productId: string, license: LicenseType, quantity: number) => void;
  clearCart: () => void;
  couponCode: string;
  couponDiscountPercent: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string>("");
  const [couponDiscountPercent, setCouponDiscountPercent] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Initialize cart from initial mock item if empty
  useEffect(() => {
    // Add default item for demonstration
    setCartItems([
      {
        product: {
          id: "prod-1",
          slug: "independence-day-social-media-pack",
          title: "Independence Day Social Media Pack",
          category: "Festival Designs",
          assetType: "Template",
          tags: ["Independence Day"],
          description: "Fully editable social media templates for 15th August.",
          includedFilesText: "15 PSD files",
          price: 149,
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
        calculatedPrice: 223, // 149 * 1.5
        quantity: 1,
      },
    ]);
  }, []);

  const addToCart = (product: Product, license: LicenseType = "commercial") => {
    const itemPrice = calculateLicensePrice(product.price, license);
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedLicense === license
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [
        ...prev,
        {
          product,
          selectedLicense: license,
          calculatedPrice: itemPrice,
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

  const updateQuantity = (productId: string, license: LicenseType, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, license);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedLicense === license) {
          return { ...item, quantity };
        }
        return item;
      })
    );
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

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.calculatedPrice * item.quantity,
    0
  );

  const discountAmount = Math.round((subtotal * couponDiscountPercent) / 100);
  const taxableSubtotal = Math.max(0, subtotal - discountAmount);
  const taxAmount = Math.round(taxableSubtotal * 0.18); // 18% GST standard in India
  const totalAmount = taxableSubtotal + taxAmount;
  const totalItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        couponCode,
        couponDiscountPercent,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        taxAmount,
        totalAmount,
        isCartOpen,
        setIsCartOpen,
        totalItemCount,
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
