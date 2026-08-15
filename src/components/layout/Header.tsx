"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Layers,
  FileText,
  Package,
} from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand.config";
import { MegaMenu } from "./MegaMenu";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const pathname = usePathname();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { totalItemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen for Ctrl+K keyboard shortcut to open search
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
    { name: "Templates", href: "/assets?assetType=Template" },
    { name: "Graphics", href: "/assets?category=social-media" },
    { name: "Vectors", href: "/assets?assetType=Vector" },
    { name: "PNG", href: "/assets?assetType=PNG" },
    { name: "Fonts", href: "/assets?assetType=Font" },
    { name: "Bundles", href: "/assets?assetType=Bundle" },
    { name: "Pricing", href: "/#pricing" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 bg-white transition-all border-b ${
        isScrolled ? "border-slate-200 shadow-sm py-3" : "border-slate-100 py-4"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & MegaMenu Trigger */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-violet-700 flex items-center justify-center text-white font-black text-xl shadow-md shadow-violet-200 group-hover:scale-105 transition-transform">
              K
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 leading-tight">
                {BRAND_CONFIG.name}
              </span>
              <span className="text-[10px] text-slate-500 font-medium hidden sm:inline tracking-wider uppercase">
                Digital Assets
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 ml-4 relative">
            <button
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                isMegaMenuOpen
                  ? "bg-violet-50 text-violet-700"
                  : "text-slate-700 hover:text-violet-700 hover:bg-slate-50"
              }`}
            >
              <Sparkles className="w-4 h-4 text-violet-600" />
              Explore
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isMegaMenuOpen ? "rotate-180 text-violet-600" : "text-slate-400"
                }`}
              />
            </button>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname === link.href
                    ? "text-violet-700 font-semibold bg-violet-50/50"
                    : "text-slate-700 hover:text-violet-700 hover:bg-slate-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-600 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors border border-slate-200/60"
            aria-label="Search templates and assets"
          >
            <Search className="w-4 h-4 text-slate-500" />
            <span className="hidden md:inline text-slate-500">Search assets...</span>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[10px] font-semibold bg-white text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs ml-2">
              Ctrl K
            </kbd>
          </button>

          {/* Wishlist Icon */}
          <Link
            href="/account?tab=wishlist"
            className="relative p-2 text-slate-700 hover:text-violet-700 hover:bg-slate-50 rounded-xl transition-colors"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-slate-700 hover:text-violet-700 hover:bg-slate-50 rounded-xl transition-colors"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItemCount > 0 && (
              <span className="absolute top-1 right-1 w-4.5 h-4.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-extrabold flex items-center justify-center shadow-sm">
                {totalItemCount}
              </span>
            )}
          </button>

          {/* Account / Admin / Login Button */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <Link
                href="/account"
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-3 py-2 rounded-xl text-sm font-semibold transition-colors"
              >
                <User className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">{user?.name.split(" ")[0]}</span>
              </Link>
              <Link
                href="/admin"
                className="hidden xl:inline-flex text-xs font-semibold text-violet-700 bg-violet-50 hover:bg-violet-100 border border-violet-200 px-2.5 py-2 rounded-xl transition-colors"
              >
                Admin UI
              </Link>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-violet-700 hover:bg-violet-800 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-violet-200"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors ml-1"
            aria-label="Toggle Navigation Drawer"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Mega Menu Dropdown */}
      {isMegaMenuOpen && (
        <div onMouseLeave={() => setIsMegaMenuOpen(false)}>
          <MegaMenu onClose={() => setIsMegaMenuOpen(false)} />
        </div>
      )}

      {/* Mobile Slide-Out Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[73px] bottom-0 bg-slate-950/60 backdrop-blur-xs z-50 flex flex-col justify-between animate-in fade-in duration-200">
          <div className="bg-white p-6 max-h-[85vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-4">
              <span className="font-bold text-slate-900">Explore Categories</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <Link
                href="/assets"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl bg-violet-50 text-violet-700 font-semibold text-sm"
              >
                <Layers className="w-5 h-5" />
                Browse All Assets
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block p-3 rounded-xl hover:bg-slate-50 font-medium text-slate-700 text-sm border border-slate-100"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Popular Collections
              </span>
              <Link
                href="/assets?category=festival-designs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block p-2 text-sm text-slate-600 hover:text-violet-700"
              >
                🎉 Indian Festival Packs
              </Link>
              <Link
                href="/assets?category=wedding"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block p-2 text-sm text-slate-600 hover:text-violet-700"
              >
                💍 Royal Wedding Invitations
              </Link>
              <Link
                href="/assets?assetType=Bundle"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block p-2 text-sm text-slate-600 hover:text-violet-700"
              >
                📦 Mega Creative Bundles
              </Link>
            </div>

            <div className="border-t pt-4 space-y-2">
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 rounded-xl bg-slate-900 text-white text-sm font-semibold"
              >
                <Package className="w-4 h-4 text-cyan-400" />
                Admin Dashboard Demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
