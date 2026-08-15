import { AdminStats } from "@/types";

export const MOCK_ADMIN_STATS: AdminStats = {
  totalRevenue: 342800,
  totalOrders: 1240,
  totalDownloads: 8940,
  totalCustomers: 850,
  conversionRate: 4.2,
};

export const MOCK_REVENUE_CHART = [
  { month: "Jan", revenue: 18400, orders: 85 },
  { month: "Feb", revenue: 22100, orders: 102 },
  { month: "Mar", revenue: 27500, orders: 118 },
  { month: "Apr", revenue: 31200, orders: 135 },
  { month: "May", revenue: 28900, orders: 124 },
  { month: "Jun", revenue: 36400, orders: 156 },
  { month: "Jul", revenue: 42800, orders: 184 },
  { month: "Aug", revenue: 49500, orders: 210 },
];

export const MOCK_RECENT_CUSTOMERS = [
  { id: "c1", name: "Priya Sharma", email: "priya@designhub.in", spend: 4500, date: "10 mins ago", plan: "Creator" },
  { id: "c2", name: "Rahul Nair", email: "rahul@keralacreatives.com", spend: 799, date: "1 hour ago", plan: "Pay as you go" },
  { id: "c3", name: "Ananya Roy", email: "ananya.r@kolkatamedia.in", spend: 6990, date: "3 hours ago", plan: "Agency" },
  { id: "c4", name: "Vikas Gupta", email: "vikas@delhiprint.com", spend: 249, date: "5 hours ago", plan: "Pay as you go" },
];
