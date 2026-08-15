"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  User,
  Download,
  ShoppingBag,
  Heart,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { SearchBarModal } from "@/components/catalog/SearchBarModal";
import { ProductCard } from "@/components/product/ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { MOCK_CUSTOMER, MOCK_ORDERS } from "@/data/mock-orders";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPaiseToINR, FALLBACK_IMAGE_DATA_URL } from "@/lib/utils";

function AccountContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "overview";
  const successOrder = searchParams.get("success");

  const [activeTab, setActiveTab] = useState(initialTab);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  const { user, logout } = useAuth();
  const { wishlistIds } = useWishlist();

  const wishlistProducts = MOCK_PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const handleSimulateDownload = (title: string) => {
    setDownloadMsg(`Downloading source files for "${title}"... (ZIP Archive)`);
    setTimeout(() => setDownloadMsg(null), 3000);
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "downloads", label: "My Downloads", icon: Download, count: MOCK_ORDERS.length },
    { id: "orders", label: "Orders History", icon: ShoppingBag },
    { id: "wishlist", label: "Saved Wishlist", icon: Heart, count: wishlistProducts.length },
    { id: "subscription", label: "Subscription Plan", icon: Zap },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "profile", label: "Profile Settings", icon: Settings },
    { id: "support", label: "Support & Help", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Hero Header */}
      <div className="bg-slate-900 text-white py-8 sm:py-10 border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={user?.avatarUrl || MOCK_CUSTOMER.avatarUrl}
                alt={user?.name}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover border-2 border-violet-500 shadow-md shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-2xl font-extrabold text-white">{user?.name || MOCK_CUSTOMER.name}</h1>
                  <span className="bg-violet-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase shrink-0">
                    PRO CREATOR
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{user?.email || MOCK_CUSTOMER.email} • Member since {MOCK_CUSTOMER.memberSince}</p>
              </div>
            </div>

            <div className="bg-slate-800/90 border border-slate-700/80 p-3.5 rounded-2xl flex items-center justify-between sm:justify-start gap-4 sm:gap-6 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Active Plan</span>
                <span className="font-extrabold text-cyan-400">{MOCK_CUSTOMER.activePlan}</span>
              </div>
              <div className="border-l border-slate-700 pl-4 sm:pl-6">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Monthly Downloads</span>
                <span className="font-extrabold text-white">{MOCK_CUSTOMER.downloadsRemaining} / 50 Left</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Toast if just ordered */}
      {successOrder && (
        <div className="bg-emerald-600 text-white py-3 px-4 text-center text-xs font-bold flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Order Successful! Your digital source files have been unlocked in your My Downloads library below.
        </div>
      )}

      {/* Main Account Tabs Layout */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        {/* Mobile Horizontal Scrollable Tab Menu */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-colors ${
                activeTab === tab.id
                  ? "bg-violet-700 text-white shadow-xs"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Navigation */}
          <aside className="hidden lg:block w-64 shrink-0 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs h-fit space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-violet-700 text-white shadow-xs"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      activeTab === tab.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}

            <div className="pt-2 border-t mt-2">
              <Link
                href="/login"
                onClick={logout}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Link>
            </div>
          </aside>

          {/* Right Tab Content Body */}
          <main className="flex-1 space-y-6">
            {downloadMsg && (
              <div className="bg-cyan-50 border border-cyan-200 text-cyan-900 p-4 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <Download className="w-4 h-4 text-cyan-600 animate-bounce" />
                {downloadMsg}
              </div>
            )}

            {/* TAB 1: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                    <span className="text-xs font-semibold text-slate-400 block">Total Downloaded</span>
                    <span className="text-2xl font-black text-slate-900 mt-1 block">
                      {MOCK_CUSTOMER.totalDownloads} Files
                    </span>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                    <span className="text-xs font-semibold text-slate-400 block">Monthly Allowance</span>
                    <span className="text-2xl font-black text-violet-700 mt-1 block">
                      {MOCK_CUSTOMER.downloadsRemaining} / 50
                    </span>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                    <span className="text-xs font-semibold text-slate-400 block">Saved Wishlist</span>
                    <span className="text-2xl font-black text-slate-900 mt-1 block">
                      {wishlistProducts.length} Items
                    </span>
                  </div>
                </div>

                {/* Recent Purchases List */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <h3 className="font-extrabold text-slate-900 text-base">Recent Downloads & Purchases</h3>
                    <button
                      onClick={() => setActiveTab("downloads")}
                      className="text-xs font-bold text-violet-700 hover:underline"
                    >
                      View All Downloads →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {MOCK_ORDERS.map((ord) =>
                      ord.items.map((item) => (
                        <div
                          key={item.productId}
                          className="flex items-center justify-between gap-4 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.thumbnailUrl || FALLBACK_IMAGE_DATA_URL}
                              alt={item.productTitle}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                              }}
                              className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                            />
                            <div>
                              <h4 className="font-bold text-slate-900 text-xs">{item.productTitle}</h4>
                              <span className="text-[10px] text-slate-400">
                                Purchased {ord.date} • {item.format}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleSimulateDownload(item.productTitle)}
                            className="bg-violet-700 hover:bg-violet-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shrink-0"
                          >
                            <Download className="w-3.5 h-3.5" /> Download
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: MY DOWNLOADS */}
            {activeTab === "downloads" && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="font-extrabold text-slate-900 text-lg border-b pb-3">
                  Unlocked Source File Library
                </h3>

                <div className="divide-y divide-slate-100">
                  {MOCK_ORDERS.map((ord) =>
                    ord.items.map((item) => (
                      <div
                        key={item.productId}
                        className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={item.thumbnailUrl || FALLBACK_IMAGE_DATA_URL}
                            alt={item.productTitle}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URL;
                            }}
                            className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <span className="text-[10px] font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded uppercase">
                              {item.license} License Verified
                            </span>
                            <h4 className="font-bold text-slate-900 text-sm mt-1">{item.productTitle}</h4>
                            <div className="text-xs text-slate-500 mt-0.5">
                              Formats: {item.format} • Purchased on {ord.date}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSimulateDownload(item.productTitle)}
                            className="bg-violet-700 hover:bg-violet-800 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-xs"
                          >
                            <Download className="w-4 h-4" /> Download Source (ZIP)
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: ORDERS */}
            {activeTab === "orders" && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="font-extrabold text-slate-900 text-lg border-b pb-3">Order History</h3>
                <div className="overflow-x-auto text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b bg-slate-50 text-slate-500 font-bold uppercase">
                        <th className="p-3">Order #</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Payment Method</th>
                        <th className="p-3">Total</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-slate-700">
                      {MOCK_ORDERS.map((ord) => (
                        <tr key={ord.id}>
                          <td className="p-3 font-bold text-slate-900">{ord.orderNumber}</td>
                          <td className="p-3">{ord.date}</td>
                          <td className="p-3">{ord.paymentMethod}</td>
                          <td className="p-3 font-bold">{formatPaiseToINR(ord.totalInPaise || ord.total * 100)}</td>
                          <td className="p-3">
                            <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                              {ord.paymentStatus}
                            </span>
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => setActiveTab("downloads")}
                              className="text-violet-700 font-bold hover:underline"
                            >
                              View Files
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: WISHLIST */}
            {activeTab === "wishlist" && (
              <div className="space-y-4">
                <h3 className="font-extrabold text-slate-900 text-lg">Saved Wishlist Products</h3>
                {wishlistProducts.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {wishlistProducts.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    title="Your wishlist is empty"
                    description="Save templates and vectors to your wishlist for quick access later."
                    actionText="Browse Assets"
                    actionHref="/assets"
                  />
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      <SearchBarModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500 text-sm">Loading customer account...</div>}>
      <AccountContent />
    </Suspense>
  );
}
