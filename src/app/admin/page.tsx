"use client";

import React, { useState, useMemo } from "react";
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
  Search,
  ExternalLink,
  Copy,
  Archive,
  ChevronLeft,
  ChevronRight,
  Menu,
  LogOut,
  Info,
} from "lucide-react";
import { MOCK_REVENUE_CHART, MOCK_RECENT_CUSTOMERS } from "@/data/mock-admin";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { MOCK_ORDERS } from "@/data/mock-orders";
import { formatPaiseToINR } from "@/lib/utils";
import { Product } from "@/types";
import { useAuth } from "@/context/AuthContext";

export default function AdminDashboardPage() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [productsList, setProductsList] = useState<Product[]>(MOCK_PRODUCTS);
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "quarter" | "ytd">("30d");

  // Mobile sidebar state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Chart Tooltip state
  const [hoveredPoint, setHoveredPoint] = useState<{ month: string; revenue: number; orders: number; x: number; y: number } | null>(null);

  // Asset Management Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedTier, setSelectedTier] = useState("All");
  const [sortBy, setSortBy] = useState<"revenue" | "downloads" | "price" | "updated">("revenue");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Bulk Selection
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  // Modals state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  const [archiveTargetProduct, setArchiveTargetProduct] = useState<Product | null>(null);

  // Single Source of Truth Metrics (Computed Dynamically)
  const dynamicMetrics = useMemo(() => {
    const totalDownloads = productsList.reduce((acc, p) => acc + (p.downloadCount || 0), 0);
    const totalRevenueInPaise = productsList.reduce(
      (acc, p) => acc + (p.isFree ? 0 : (p.downloadCount || 0) * (p.priceInPaise || p.price * 100)),
      0
    );
    const totalOrders = 1240;
    const totalCustomers = 850;
    const conversionRate = 4.2;

    return {
      totalDownloads,
      totalRevenueInPaise,
      totalOrders,
      totalCustomers,
      conversionRate,
    };
  }, [productsList]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return productsList
      .filter((prod) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = prod.title.toLowerCase().includes(q);
          const matchesCat = prod.category.toLowerCase().includes(q);
          if (!matchesTitle && !matchesCat) return false;
        }
        if (selectedCategory !== "All" && prod.category !== selectedCategory) return false;
        if (selectedStatus !== "All" && (prod.status || "Published") !== selectedStatus) return false;
        if (selectedTier === "Free" && !prod.isFree) return false;
        if (selectedTier === "Paid" && prod.isFree) return false;
        return true;
      })
      .sort((a, b) => {
        const revA = a.isFree ? 0 : a.downloadCount * (a.priceInPaise || a.price * 100);
        const revB = b.isFree ? 0 : b.downloadCount * (b.priceInPaise || b.price * 100);
        if (sortBy === "revenue") return revB - revA;
        if (sortBy === "downloads") return b.downloadCount - a.downloadCount;
        if (sortBy === "price") return (b.priceInPaise || b.price) - (a.priceInPaise || a.price);
        if (sortBy === "updated") return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        return 0;
      });
  }, [productsList, searchQuery, selectedCategory, selectedStatus, selectedTier, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Bulk Actions
  const toggleSelectAll = () => {
    if (selectedProductIds.length === paginatedProducts.length) {
      setSelectedProductIds([]);
    } else {
      setSelectedProductIds(paginatedProducts.map((p) => p.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkStatusChange = (newStatus: "Published" | "Archived") => {
    setProductsList((prev) =>
      prev.map((p) => (selectedProductIds.includes(p.id) ? { ...p, status: newStatus } : p))
    );
    setSelectedProductIds([]);
  };

  // Product Duplication
  const handleDuplicateProduct = (prod: Product) => {
    const duplicated: Product = {
      ...prod,
      id: `prod-${Date.now()}`,
      slug: `${prod.slug}-copy-${Date.now().toString().slice(-4)}`,
      title: `${prod.title} (Copy)`,
      status: "Draft",
      downloadCount: 0,
      lastUpdated: new Date().toISOString().split("T")[0],
    };
    setProductsList([duplicated, ...productsList]);
  };

  // Single Action Handler for Product Modal
  const handleOpenNewProduct = () => {
    setEditingProduct({
      title: "",
      category: "Festival Designs",
      assetType: "Template",
      status: "Published",
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
        status: editingProduct.status || "Published",
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

  const handleConfirmArchive = () => {
    if (!archiveTargetProduct) return;
    setProductsList((prev) =>
      prev.map((p) => (p.id === archiveTargetProduct.id ? { ...p, status: "Archived" } : p))
    );
    setArchiveTargetProduct(null);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 text-slate-100 font-sans">
      {/* Desktop Sticky & Independently Scrollable Sidebar */}
      <aside className="hidden md:flex w-64 bg-slate-900 border-r border-slate-800 p-6 flex-col justify-between shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-violet-900/50">
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
              { id: "products", label: "Asset Management", icon: Package, count: productsList.length },
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

        {/* Compact Admin Footer Links */}
        <div className="pt-4 border-t border-slate-800 space-y-2 text-[11px] text-slate-500">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-400">KalaStock v1.4.0</span>
            <Link href="/" className="hover:text-cyan-400 text-[10px]">Storefront →</Link>
          </div>
          <div className="flex items-center gap-3">
            <a href="#support" className="hover:text-slate-300">Support</a>
            <span>•</span>
            <a href="#privacy" className="hover:text-slate-300">Privacy</a>
            <span>•</span>
            <button onClick={logout} className="hover:text-rose-400 flex items-center gap-1 font-semibold">
              <LogOut className="w-3 h-3" /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header Bar & Drawer */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-white font-black text-sm">
            K
          </div>
          <span className="font-bold text-white text-sm">KalaStock Admin</span>
        </div>
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg"
          aria-label="Toggle admin drawer"
        >
          {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {isMobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex flex-col p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-bold text-white">Admin Navigation</span>
            <button onClick={() => setIsMobileSidebarOpen(false)} className="text-slate-400">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-1">
            {["dashboard", "products", "orders", "customers", "settings"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setIsMobileSidebarOpen(false);
                }}
                className="w-full text-left p-3 rounded-xl bg-slate-900 text-white font-bold text-xs capitalize"
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Admin Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8">
        {/* Page Top Header — Single Creation Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-violet-400" />
              <h1 className="text-xl sm:text-2xl font-black text-white">Single-Seller Admin Panel</h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Store overview, asset management, and metrics computed from live mock data.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Single Primary Creation Action */}
            <button
              onClick={handleOpenNewProduct}
              className="bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-md shadow-violet-900/50 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Asset Listing
            </button>
          </div>
        </div>

        {/* Security & Backend Integration Reminder Notice */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-xs space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <Info className="w-4 h-4" /> Security & Pre-Backend Integration Architecture Checklist
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Hiding client links is UI-only. During backend deployment, <code>/admin</code> routes and API endpoints must enforce: <strong>(1) Authenticated Session</strong>, <strong>(2) Server-Side Role Verification</strong>, <strong>(3) Per-Route API Authorization</strong>, and <strong>(4) Audit Logging for all Price/Product changes</strong>.
          </p>
        </div>

        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Date-Range Filter Controls */}
            <div className="flex items-center justify-between flex-wrap gap-4 bg-slate-900 p-3 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Metrics Period:
              </span>
              <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-xl">
                {[
                  { id: "7d", label: "Last 7 Days" },
                  { id: "30d", label: "Last 30 Days" },
                  { id: "quarter", label: "This Quarter" },
                  { id: "ytd", label: "Year to Date" },
                ].map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setDateRange(range.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      dateRange === range.id
                        ? "bg-violet-600 text-white shadow-xs"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* KPI Metric Cards — Computed Dynamically with Consistent % Comparisons */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                <span className="text-xs text-slate-400 font-semibold">Total Revenue</span>
                <div className="text-xl sm:text-2xl font-black text-white">
                  {formatPaiseToINR(dynamicMetrics.totalRevenueInPaise)}
                </div>
                <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +18.4% vs prev period
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                <span className="text-xs text-slate-400 font-semibold">Total Orders</span>
                <div className="text-xl sm:text-2xl font-black text-cyan-400">{dynamicMetrics.totalOrders}</div>
                <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +12.1% vs prev period
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                <span className="text-xs text-slate-400 font-semibold">Total Downloads</span>
                <div className="text-xl sm:text-2xl font-black text-violet-400">{dynamicMetrics.totalDownloads.toLocaleString()}</div>
                <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +24.8% vs prev period
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                <span className="text-xs text-slate-400 font-semibold">Active Customers</span>
                <div className="text-xl sm:text-2xl font-black text-white">{dynamicMetrics.totalCustomers}</div>
                <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +8.3% vs prev period
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                <span className="text-xs text-slate-400 font-semibold">Conversion Rate</span>
                <div className="text-xl sm:text-2xl font-black text-emerald-400">{dynamicMetrics.conversionRate}%</div>
                <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +2.1% vs prev period
                </div>
              </div>
            </div>

            {/* Interactive Responsive SVG Area/Line Revenue Chart */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-base">Revenue & Sales Trends</h3>
                  <span className="text-xs text-slate-400">Interactive SVG Area Chart with grid axes and hover details</span>
                </div>
                {hoveredPoint && (
                  <div className="bg-slate-800 text-cyan-400 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-700 animate-in fade-in">
                    {hoveredPoint.month}: {formatPaiseToINR(hoveredPoint.revenue * 100)} ({hoveredPoint.orders} orders)
                  </div>
                )}
              </div>

              {/* Responsive SVG Area Chart Render */}
              <div className="relative w-full h-64 pt-4">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid Axes Lines */}
                  {[0, 50, 100, 150].map((y) => (
                    <line key={y} x1="40" y1={y} x2="680" y2={y} stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                  ))}

                  {/* SVG Gradient Area Fill */}
                  <polygon
                    points="40,180 40,130 130,110 220,90 310,70 400,85 490,50 580,30 670,10 670,180"
                    fill="url(#revenueGradient)"
                  />

                  {/* SVG Trend Line */}
                  <polyline
                    fill="none"
                    stroke="#06B6D4"
                    strokeWidth="3"
                    points="40,130 130,110 220,90 310,70 400,85 490,50 580,30 670,10"
                  />

                  {/* Data Point Circles with Tooltip Handlers */}
                  {MOCK_REVENUE_CHART.map((item, idx) => {
                    const x = 40 + idx * 90;
                    const y = 180 - (item.revenue / 50000) * 170;
                    return (
                      <g key={item.month}>
                        <circle
                          cx={x}
                          cy={y}
                          r="5"
                          className="fill-cyan-400 stroke-slate-900 stroke-2 hover:r-8 transition-all cursor-pointer"
                          onMouseEnter={() => setHoveredPoint({ month: item.month, revenue: item.revenue, orders: item.orders, x, y })}
                          onMouseLeave={() => setHoveredPoint(null)}
                        />
                        <text x={x} y="195" textAnchor="middle" fill="#94A3B8" fontSize="11" fontWeight="600">
                          {item.month}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Top Performing Assets with Explicit Metric Labels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="font-bold text-white text-base">Top Performing Assets</h3>
                <div className="space-y-3">
                  {productsList.slice(0, 4).map((p) => {
                    const revPaise = p.isFree ? 0 : p.downloadCount * (p.priceInPaise || p.price * 100);
                    return (
                      <div
                        key={p.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-800 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <img src={p.thumbnailUrl} alt={p.title} className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <div className="font-bold text-white">{p.title}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              Price: <strong>{p.isFree ? "Free" : formatPaiseToINR(p.priceInPaise || p.price * 100)}</strong> • Downloads: <strong>{p.downloadCount.toLocaleString()}</strong>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-extrabold text-cyan-400 block">{formatPaiseToINR(revPaise)}</span>
                          <span className="text-[10px] text-slate-500 uppercase font-bold">Total Revenue</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Customer Activity */}
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
                        <div className="text-[10px] text-slate-400">{c.email} • Plan: {c.plan}</div>
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

        {/* ASSET MANAGEMENT TAB (Full Features: Search, Filters, Bulk Selection, Archive Dialog, Tooltips) */}
        {(activeTab === "products" || activeTab === "dashboard") && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="font-black text-white text-lg">Asset Management</h2>
                <p className="text-xs text-slate-400">Search, filter, edit, archive or duplicate digital product listings.</p>
              </div>
            </div>

            {/* Filter & Toolbar Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Search input */}
              <div className="relative lg:col-span-2">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search assets by title or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-violet-500 font-medium"
                />
              </div>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-medium"
              >
                <option value="All">Status: All</option>
                <option value="Published">Status: Published</option>
                <option value="Draft">Status: Draft</option>
                <option value="Archived">Status: Archived</option>
              </select>

              {/* Tier Filter */}
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-medium"
              >
                <option value="All">Tier: All</option>
                <option value="Free">Tier: Free Only</option>
                <option value="Paid">Tier: Paid Only</option>
              </select>

              {/* Sort selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-medium"
              >
                <option value="revenue">Sort by Revenue</option>
                <option value="downloads">Sort by Downloads</option>
                <option value="price">Sort by Price</option>
                <option value="updated">Sort by Last Updated</option>
              </select>
            </div>

            {/* Bulk Selection Toolbar */}
            {selectedProductIds.length > 0 && (
              <div className="bg-violet-950/80 border border-violet-800 text-white p-3 rounded-xl flex items-center justify-between text-xs animate-in fade-in">
                <span className="font-bold">{selectedProductIds.length} assets selected</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleBulkStatusChange("Published")}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                  >
                    Bulk Publish
                  </button>
                  <button
                    onClick={() => handleBulkStatusChange("Archived")}
                    className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                  >
                    Bulk Archive
                  </button>
                </div>
              </div>
            )}

            {/* Desktop Table View */}
            {paginatedProducts.length > 0 ? (
              <>
                <div className="hidden md:block overflow-x-auto text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase">
                        <th className="p-3 w-8">
                          <input
                            type="checkbox"
                            checked={selectedProductIds.length === paginatedProducts.length}
                            onChange={toggleSelectAll}
                            className="rounded bg-slate-800 border-slate-700"
                          />
                        </th>
                        <th className="p-3">Asset Title & Type</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">Revenue</th>
                        <th className="p-3">Downloads</th>
                        <th className="p-3">Last Updated</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      {paginatedProducts.map((prod) => {
                        const revPaise = prod.isFree ? 0 : prod.downloadCount * (prod.priceInPaise || prod.price * 100);
                        const isSelected = selectedProductIds.includes(prod.id);

                        return (
                          <tr key={prod.id} className={`hover:bg-slate-800/40 ${isSelected ? "bg-violet-950/30" : ""}`}>
                            <td className="p-3">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleSelectOne(prod.id)}
                                className="rounded bg-slate-800 border-slate-700"
                              />
                            </td>
                            <td className="p-3 flex items-center gap-3">
                              <img src={prod.thumbnailUrl} alt={prod.title} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                              <div>
                                <div className="font-bold text-white leading-snug">{prod.title}</div>
                                <span className="text-[10px] text-slate-500 uppercase">{prod.assetType} • {prod.fileFormats.join(", ")}</span>
                              </div>
                            </td>
                            <td className="p-3">{prod.category}</td>
                            <td className="p-3">
                              <span
                                className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                                  prod.status === "Published" || !prod.status
                                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                    : prod.status === "Draft"
                                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                    : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                }`}
                              >
                                {prod.status || "Published"}
                              </span>
                            </td>
                            <td className="p-3 font-bold text-cyan-400">
                              {prod.isFree ? "FREE" : formatPaiseToINR(prod.priceInPaise || prod.price * 100)}
                            </td>
                            <td className="p-3 font-bold text-emerald-400">{formatPaiseToINR(revPaise)}</td>
                            <td className="p-3 font-semibold">{prod.downloadCount.toLocaleString()}</td>
                            <td className="p-3 text-slate-400">{prod.lastUpdated}</td>
                            <td className="p-3 text-right space-x-1">
                              {/* Preview Storefront link */}
                              <Link
                                href={`/product/${prod.slug}`}
                                target="_blank"
                                title="Preview storefront page"
                                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg inline-block"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Link>
                              {/* Duplicate Action */}
                              <button
                                onClick={() => handleDuplicateProduct(prod)}
                                title="Duplicate product listing"
                                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-violet-300 rounded-lg inline-block"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                              {/* Edit Action */}
                              <button
                                onClick={() => {
                                  setEditingProduct(prod);
                                  setIsEditorOpen(true);
                                }}
                                title="Edit product parameters"
                                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg inline-block"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              {/* Protected Archive Dialog Trigger */}
                              <button
                                onClick={() => setArchiveTargetProduct(prod)}
                                title="Archive product"
                                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg inline-block"
                              >
                                <Archive className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards View */}
                <div className="md:hidden space-y-3">
                  {paginatedProducts.map((prod) => {
                    const revPaise = prod.isFree ? 0 : prod.downloadCount * (prod.priceInPaise || prod.price * 100);
                    return (
                      <div key={prod.id} className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl space-y-3">
                        <div className="flex items-center gap-3">
                          <img src={prod.thumbnailUrl} alt={prod.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-white text-xs truncate">{prod.title}</div>
                            <span className="text-[10px] text-slate-400">{prod.category} • {prod.assetType}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs border-t border-slate-700 pt-2">
                          <div>
                            <span className="text-[10px] text-slate-400 block">Price</span>
                            <span className="font-bold text-cyan-400">
                              {prod.isFree ? "Free" : formatPaiseToINR(prod.priceInPaise || prod.price * 100)}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block">Revenue</span>
                            <span className="font-bold text-emerald-400">{formatPaiseToINR(revPaise)}</span>
                          </div>
                          <div className="flex gap-1">
                            <Link href={`/product/${prod.slug}`} target="_blank" className="p-1.5 bg-slate-700 text-slate-300 rounded-lg">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                            <button onClick={() => setArchiveTargetProduct(prod)} className="p-1.5 bg-slate-700 text-amber-400 rounded-lg">
                              <Archive className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination Toolbar */}
                <div className="flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-400">
                  <span>Showing page {currentPage} of {totalPages}</span>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg text-white font-bold flex items-center gap-1"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" /> Prev
                    </button>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg text-white font-bold flex items-center gap-1"
                    >
                      Next <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Empty Search / No Results State */
              <div className="text-center py-12 bg-slate-800/40 rounded-2xl border border-slate-800 space-y-3">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <Search className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white text-sm">No assets match your search or filters</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Try adjusting search keywords or resetting status & category dropdown filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setSelectedStatus("All");
                    setSelectedTier("All");
                  }}
                  className="bg-violet-600 text-white font-bold text-xs px-4 py-2 rounded-xl"
                >
                  Reset Admin Filters
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Product Editor Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-6 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-lg">
                {editingProduct?.id ? "Edit Asset Listing" : "Add New Asset Listing"}
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
                  <label className="block mb-1">Listing Status</label>
                  <select
                    value={editingProduct?.status || "Published"}
                    onChange={(e) => setEditingProduct({ ...editingProduct, status: e.target.value as any })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>

                <div className="col-span-2">
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

      {/* Protected Archive Confirmation Modal */}
      {archiveTargetProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 text-white shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Archive className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg">Archive Asset Listing?</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Are you sure you want to archive <strong>&quot;{archiveTargetProduct.title}&quot;</strong>?
              </p>
              <div className="bg-slate-800 p-3 rounded-xl text-[11px] text-slate-400 mt-3 border border-slate-700">
                💡 <strong>Archive Behavior:</strong> Archiving hides this asset from public discovery on the storefront while preserving historical purchase records and download access for past buyers.
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setArchiveTargetProduct(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmArchive}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md"
              >
                Confirm Archive Asset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
