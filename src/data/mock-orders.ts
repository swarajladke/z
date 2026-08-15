import { Order, CustomerUser } from "@/types";

export const MOCK_CUSTOMER: CustomerUser = {
  id: "cust-101",
  name: "Arjun Verma",
  email: "arjun.verma@designstudio.in",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  activePlan: "Creator (Monthly)",
  downloadsRemaining: 34,
  totalDownloads: 116,
  memberSince: "March 2026",
};

export const MOCK_ORDERS: Order[] = [
  {
    id: "ord-8001",
    orderNumber: "KS-2026-8001",
    date: "12 Aug 2026",
    items: [
      {
        productId: "prod-1",
        productTitle: "Independence Day Social Media Pack",
        thumbnailUrl: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=400&q=80",
        license: "commercial",
        price: 223,
        format: "PSD, Canva",
      },
    ],
    subtotal: 223,
    discount: 0,
    tax: 40,
    total: 263,
    paymentStatus: "Paid",
    paymentMethod: "UPI (Google Pay)",
    invoiceUrl: "#",
  },
  {
    id: "ord-7942",
    orderNumber: "KS-2026-7942",
    date: "28 Jul 2026",
    items: [
      {
        productId: "prod-9",
        productTitle: "Indian Festival Design Mega Pack",
        thumbnailUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80",
        license: "extended",
        price: 1997,
        format: "PSD, AI, Canva",
      },
    ],
    subtotal: 1997,
    discount: 200,
    tax: 323,
    total: 2120,
    paymentStatus: "Paid",
    paymentMethod: "Credit Card (HDFC)",
    invoiceUrl: "#",
  },
  {
    id: "ord-7810",
    orderNumber: "KS-2026-7810",
    date: "15 Jun 2026",
    items: [
      {
        productId: "prod-3",
        productTitle: "Indian Wedding Invitation Collection",
        thumbnailUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80",
        license: "commercial",
        price: 598,
        format: "AI, PSD",
      },
    ],
    subtotal: 598,
    discount: 0,
    tax: 107,
    total: 705,
    paymentStatus: "Paid",
    paymentMethod: "NetBanking (SBI)",
    invoiceUrl: "#",
  },
];
