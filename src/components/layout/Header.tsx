"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Layers,
  Sparkles,
  ShieldAlert,
  LogOut,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { BRAND_CONFIG } from "@/config/brand.config";
import { MegaMenu } from "./MegaMenu";

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const { totalItemCount, setIsCartOpen } = useCart();
  const { wishlistIds } = useWishlist();
  const { user, isAdmin, toggleAdminRole, logout } = useAuth();

  const totalWishlistCount = wishlistIds.length;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenSearch]);

  const navLinks = [
    { label: "Explore", href: "/assets" },
    { label: "Templates", href: "/assets?assetType=Template" },
    { label: "Graphics", href: "/assets?category=Social+Media" },
    { label: "Vectors", href: "/assets?assetType=Vector" },
    { label: "PNG", href: "/assets?assetType=PNG" },
    { label: "Fonts", href: "/assets?assetType=Font" },
    { label: "Bundles", href: "/assets?assetType=Bundle" },
    { label: "Pricing", href: "/#pricing" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b border-[rgba(23,23,23,0.12)] ${
        isScrolled ? "bg-[#FCFAF6]/95 backdrop-blur-md shadow-xs" : "bg-[#FCFAF6]"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Left: Brand Logo & Navigation */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-8 h-8 rounded-xl bg-violet-700 flex items-center justify-center text-white font-black text-lg shadow-xs group-hover:bg-violet-800 transition-colors">
                K
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-slate-900 text-lg leading-none tracking-tight">
                  {BRAND_CONFIG.name}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase mt-0.5 hidden sm:inline">
                  {BRAND_CONFIG.tagline}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 text-xs font-bold text-slate-700">
              <div
                className="relative"
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
              >
                <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-violet-700 hover:bg-slate-100/60 transition-colors">
                  <span>Categories</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {isMegaMenuOpen && <MegaMenu onClose={() => setIsMegaMenuOpen(false)} />}
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2 rounded-lg hover:text-violet-700 hover:bg-slate-100/60 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Search, Wishlist, Cart & Profile */}
          <div className="flex items-center gap-3">
            {/* Search Trigger with Ctrl+K shortcut indicator */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-600 px-3 py-2 rounded-xl text-xs font-semibold border border-[rgba(23,23,23,0.08)] transition-colors"
              aria-label="Search templates"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden md:inline-block text-[10px] font-mono bg-white text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Wishlist Link */}
            <Link
              href="/account?tab=wishlist"
              className="relative p-2 text-slate-700 hover:text-rose-600 hover:bg-slate-100/60 rounded-xl transition-colors"
              aria-label="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {totalWishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalWishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-700 hover:text-violet-700 hover:bg-slate-100/60 rounded-xl transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemCount > 0 && (
                <span className="absolute top-1 right-1 bg-violet-700 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Customer Profile / Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-1.5 p-1.5 rounded-xl hover:bg-slate-100/60 transition-colors border border-transparent hover:border-slate-200"
              >
                <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-extrabold">
                  {user?.name?.[0] || "U"}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:inline" />
              </button>

              {/* Dropdown Menu */}
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-[rgba(23,23,23,0.12)] shadow-xl py-2 text-xs font-semibold text-slate-700 z-50 animate-in fade-in duration-150">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="font-extrabold text-slate-900">{user?.name || "Demo Creator"}</p>
                    <p className="text-[11px] text-slate-400 font-normal truncate">{user?.email}</p>
                  </div>

                  <Link
                    href="/account"
                    onClick={() => setIsUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 hover:text-violet-700"
                  >
                    <User className="w-4 h-4" /> My Account Vault
                  </Link>

                  <Link
                    href="/account?tab=downloads"
                    onClick={() => setIsUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 hover:text-violet-700"
                  >
                    <Layers className="w-4 h-4" /> My Downloads
                  </Link>

                  {/* Single Admin Link Scoped ONLY inside User Menu for Admin Role */}
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 bg-violet-50 text-violet-700 font-extrabold hover:bg-violet-100"
                    >
                      <ShieldAlert className="w-4 h-4 text-violet-700" /> Admin Dashboard
                    </Link>
                  )}

                  <div className="border-t border-slate-100 pt-1 mt-1">
                    <button
                      onClick={toggleAdminRole}
                      className="w-full text-left px-4 py-1.5 text-[11px] text-slate-500 hover:text-slate-900 flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                      Role: <strong>{isAdmin ? "Admin" : "Customer"}</strong> (Toggle)
                    </button>

                    <button
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Navigation Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[rgba(23,23,23,0.12)] bg-[#FCFAF6] px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
