import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { BRAND_CONFIG } from "@/config/brand.config";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import { QuickPreviewProvider } from "@/context/QuickPreviewContext";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { QuickPreviewModal } from "@/components/product/QuickPreviewModal";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline}`,
  description: BRAND_CONFIG.positioning,
  openGraph: {
    title: BRAND_CONFIG.name,
    description: BRAND_CONFIG.positioning,
    url: "https://kalastock.in",
    siteName: BRAND_CONFIG.name,
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="font-sans bg-[#F8FAFC] text-[#0F172A] antialiased selection:bg-violet-600 selection:text-white flex flex-col min-h-screen">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <QuickPreviewProvider>
                <AnnouncementBar />
                <div className="flex-1">{children}</div>
                <Footer />
                <CartDrawer />
                <QuickPreviewModal />
              </QuickPreviewProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
