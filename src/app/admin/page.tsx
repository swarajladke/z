"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Layers,
  ShoppingBag,
  Users,
  Tag,
  Award,
  Star,
  Image as ImageIcon,
  Settings,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  X,
  ShieldAlert,
} from "lucide-react";
import { MOCK_ADMIN_STATS, MOCK_REVENUE_CHART, MOCK_RECENT_CUSTOMERS } from "@/data/mock-admin";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { MOCK_ORDERS } from "@/data/mock-orders";
import { formatPaiseToINR } from "@/lib/utils";
import { Product } from "@/types";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [productsList, setProductsList] = useState<Product[]>(MOCK_PRODUCTS);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  const handleOpenNewProduct = () => {
    setEditingProduct({
      title: "",
      category: "Festival Designs",
      assetType: "Template",
      priceInPaise: 19900,
      price: 199,
      isPremium: true,
      fileFormats: ["PSD", "Canva"],
      softwareCompatibility: ["Photoshop", "Canva"],
      description: "Editable digital asset template built for Indian creators.",
      includedFilesText: "Source PSD files, Canva links",
    });
    setIsEditorOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.title) return;

    const rupees = editingProduct.price || Math.floor((editingProduct.priceInPaise || 0) / 100);
    const paise = editingProduct.priceInPaise || rupees * 100;

    if (editingProduct.id) {
      setProductsList((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? ({
                ...p,
                ...editingProduct,
                priceInPaise: paise,
                price: rupees,
              } as Product)
            : p
        )
      );
    } else {
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        slug: editingProduct.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title: editingProduct.title,
        category: editingProduct.category || "Festival Designs",
        assetType: editingProduct.assetType || "Template",
        tags: ["New Release"],
        description: editingProduct.description || "",
        includedFilesText: editingProduct.includedFilesText || "",
        priceInPaise: paise,
        price: rupees,
        isFree: paise === 0,
        isPremium: paise > 0,
        fileFormats: editingProduct.fileFormats || ["PSD"],
        softwareCompatibility: editingProduct.softwareCompatibility || ["Photoshop"],
        thumbnailUrl:
          editingProduct.thumbnailUrl ||
          "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=800&q=80",
        galleryImages: [],
        lastUpdated: new Date().toISOString().split("T")[0],
        downloadCount: 0,
        ratingPlaceholder: 5.0,
      };
      setProductsList([newProd, ...productsList]);
    }
    setIsEditorOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    setProductsList((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100 font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0 hidden md:flex">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center text-white font-black text-lg">
              K
            </div>
            <div>
              <span className="font-black text-lg text-white">KalaStock</span>
              <span className="text-[10px] text-cyan-400 block font-semibold uppercase">Single-Seller Admin</span>
            </div>
          </Link>

          <nav className="space-y-1 text-xs font-semibold">
            {[
              { id: "dashboard", label: "Dashboard Overview", icon: LayoutDashboard },
              { id: "products", label: "Products Catalog", icon: Package, count: productsList.length },
              { id: "categories", label: "Categories", icon: FolderTree },
              { id: "collections", label: "Curated Packs", icon: Layers },
              { id: "orders", label: "Orders Feed", icon: ShoppingBag, count: MOCK_ORDERS.length },
              { id: "customers", label: "Customer List", icon: Users },
              { id: "coupons", label: "Coupons & Discounts", icon: Tag },
              { id: "plans", label: "Pricing Plans", icon: Award },
              { id: "reviews", label: "Asset Reviews", icon: Star },
              { id: "banners", label: "Hero Banners", icon: ImageIcon },
              { id: "settings", label: "Store Settings", icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === item.id
                    ? "bg-violet-600 text-white font-bold shadow-md shadow-violet-900/50"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800 text-xs text-slate-500">
          <Link href="/" className="hover:text-cyan-400 font-semibold flex items-center gap-1">
            ← Exit to Storefront
          </Link>
        </div>
      </aside>

      {/* Main Body */}
      <main className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-violet-400" />
              <h1 className="text-2xl font-black text-white">Single-Seller Admin Panel</h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Manage product listings, monitor revenue, track customer downloads and issue coupons.
            </p>
          </div>

          <button
            onClick={handleOpenNewProduct}
            className="bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-md shadow-violet-900/50 flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" /> Add New Asset Listing
          </button>
        </div>

        {/* Dashboard Overview Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* KPI Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                <span className="text-xs text-slate-400 font-semibold">Total Revenue</span>
                <div className="text-2xl font-black text-white">
                  {formatPaiseToINR(MOCK_ADMIN_STATS.totalRevenueInPaise || MOCK_ADMIN_STATS.totalRevenue * 100)}
                </div>
                <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +18.4% vs last month
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                <span className="text-xs text-slate-400 font-semibold">Total Orders</span>
                <div className="text-2xl font-black text-cyan-400">{MOCK_ADMIN_STATS.totalOrders}</div>
                <div className="text-[11px] text-slate-400">1,240 completed orders</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                <span className="text-xs text-slate-400 font-semibold">File Downloads</span>
                <div className="text-2xl font-black text-violet-400">{MOCK_ADMIN_STATS.totalDownloads}</div>
                <div className="text-[11px] text-slate-400">ZIP packages downloaded</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                <span className="text-xs text-slate-400 font-semibold">Active Customers</span>
                <div className="text-2xl font-black text-white">{MOCK_ADMIN_STATS.totalCustomers}</div>
                <div className="text-[11px] text-slate-400">Creators & agencies</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                <span className="text-xs text-slate-400 font-semibold">Conversion Rate</span>
                <div className="text-2xl font-black text-emerald-400">{MOCK_ADMIN_STATS.conversionRate}%</div>
                <div className="text-[11px] text-slate-400">High engagement</div>
              </div>
            </div>

            {/* Custom SVG Revenue Bar Chart Visual */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-base">Monthly Store Revenue (2026)</h3>
                  <span className="text-xs text-slate-400">Steady revenue growth driven by festival season demand</span>
                </div>
                <span className="bg-violet-500/20 text-violet-300 text-xs font-bold px-3 py-1 rounded-full border border-violet-500/30">
                  Peak: ₹49,500 in Aug
                </span>
              </div>

              <div className="pt-6 pb-2">
                <div className="flex items-end justify-between gap-3 h-48 px-4">
                  {MOCK_REVENUE_CHART.map((item) => {
                    const heightPercent = Math.round((item.revenue / 50000) * 100);
                    return (
                      <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                        <div className="text-[10px] font-bold text-slate-400 group-hover:text-cyan-400">
                          ₹{(item.revenue / 1000).toFixed(1)}k
                        </div>
                        <div className="w-full bg-slate-800 rounded-t-lg overflow-hidden flex items-end h-full">
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className="w-full bg-gradient-to-t from-violet-700 to-cyan-400 group-hover:from-violet-600 group-hover:to-cyan-300 transition-all rounded-t-lg"
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-400 group-hover:text-white">
                          {item.month}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom 2 Columns: Best Sellers & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Best Selling Products */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="font-bold text-white text-base">Top Performing Assets</h3>
                <div className="space-y-3">
                  {productsList.slice(0, 4).map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-800"
                    >
                      <div className="flex items-center gap-3">
                        <img src={p.thumbnailUrl} alt={p.title} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <div className="text-xs font-bold text-white">{p.title}</div>
                          <span className="text-[10px] text-slate-400">{p.downloadCount} downloads</span>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-cyan-400">
                        {p.isFree ? "Free" : formatPaiseToINR(p.priceInPaise || p.price * 100)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Customers Activity */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="font-bold text-white text-base">Recent Customer Activity</h3>
                <div className="space-y-3">
                  {MOCK_RECENT_CUSTOMERS.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-800 text-xs"
                    >
                      <div>
                        <div className="font-bold text-white">{c.name}</div>
                        <div className="text-[10px] text-slate-400">{c.email}</div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-emerald-400 block">{formatPaiseToINR(c.spend * 100)}</span>
                        <span className="text-[10px] text-slate-500">{c.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Management Tab */}
        {(activeTab === "products" || activeTab === "dashboard") && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-bold text-white text-base">Store Assets Management ({productsList.length})</h3>
              <button
                onClick={handleOpenNewProduct}
                className="bg-violet-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Product
              </button>
            </div>

            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase">
                    <th className="p-3">Asset</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Formats</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Downloads</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {productsList.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-800/40">
                      <td className="p-3 flex items-center gap-3">
                        <img src={prod.thumbnailUrl} alt={prod.title} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <div className="font-bold text-white">{prod.title}</div>
                          <span className="text-[10px] text-slate-500">{prod.assetType}</span>
                        </div>
                      </td>
                      <td className="p-3">{prod.category}</td>
                      <td className="p-3">{prod.fileFormats.join(", ")}</td>
                      <td className="p-3 font-bold text-cyan-400">
                        {prod.isFree ? "FREE" : formatPaiseToINR(prod.priceInPaise || prod.price * 100)}
                      </td>
                      <td className="p-3">{prod.downloadCount}</td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingProduct(prod);
                            setIsEditorOpen(true);
                          }}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-rose-400 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Product Editor Modal Overlay */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-6 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-lg">
                {editingProduct?.id ? "Edit Product Listing" : "Add New Asset Listing"}
              </h3>
              <button onClick={() => setIsEditorOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-semibold text-slate-300">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct?.title || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:outline-hidden focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block mb-1">Category</label>
                  <select
                    value={editingProduct?.category || "Festival Designs"}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                  >
                    <option value="Festival Designs">Festival Designs</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Business">Business</option>
                    <option value="Food & Restaurant">Food & Restaurant</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Illustrations">Illustrations</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Price (₹ INR - 0 for Free)</label>
                  <input
                    type="number"
                    value={editingProduct?.price || 0}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: Number(e.target.value),
                        priceInPaise: Number(e.target.value) * 100,
                      })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingProduct?.description || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-500 shadow-md"
                >
                  Save Asset Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
