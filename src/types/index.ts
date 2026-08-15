export type LicenseType = 'personal' | 'commercial' | 'extended';

export interface LicenseOption {
  type: LicenseType;
  name: string;
  priceMultiplier: number;
  description: string;
  features: string[];
}

export interface ProductFile {
  format: string; // e.g. 'PSD', 'Canva', 'AI', 'EPS', 'SVG', 'PNG', 'PPTX', 'TTF'
  size: string;   // e.g. '45 MB'
  dimensions?: string; // e.g. '1080 x 1080 px' or 'Vector'
  software?: string; // e.g. 'Adobe Photoshop CC, Canva'
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: string; // e.g. 'Social Media', 'Festival Designs', 'Wedding', etc.
  subcategory?: string;
  assetType: 'Template' | 'Vector' | 'PNG' | 'Font' | 'Icon' | 'Presentation' | 'Bundle';
  tags: string[];
  description: string;
  includedFilesText: string;
  priceInPaise: number; // Integer paise e.g. 14900 = ₹149
  originalPriceInPaise?: number; // Integer paise e.g. 29900 = ₹299
  price: number; // Rupees fallback getter helper for backwards compatibility
  originalPrice?: number;
  isFree?: boolean;
  isPremium?: boolean;
  isBundle?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  itemCount?: number; // for bundles e.g. 250+
  fileFormats: string[]; // ['PSD', 'Canva', 'PNG']
  softwareCompatibility: string[]; // ['Photoshop', 'Canva', 'Illustrator']
  thumbnailUrl: string;
  galleryImages: string[];
  previewUrl?: string;
  dimensions?: string;
  fileSize?: string;
  lastUpdated: string;
  downloadCount: number;
  ratingPlaceholder: number; // e.g. 4.9
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  assetCount: number;
  thumbnailUrl: string;
  description: string;
  popularTopics?: string[];
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  assetCount: number;
  startingPriceInPaise: number;
  startingPrice: number;
  thumbnailUrl: string;
  previewImages: string[];
  isTrending?: boolean;
  badge?: string;
}

export interface CartItem {
  product: Product;
  selectedLicense: LicenseType;
  calculatedPriceInPaise: number;
  quantity: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  monthlyPriceInPaise: number;
  yearlyPriceInPaise: number;
  monthlyPrice: number;
  yearlyPrice: number;
  downloadsPerMonth: number;
  libraryAccess: string;
  licenseIncluded: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: {
    productId: string;
    productTitle: string;
    thumbnailUrl: string;
    license: LicenseType;
    priceInPaise: number;
    price: number;
    format: string;
  }[];
  subtotalInPaise: number;
  discountInPaise: number;
  totalInPaise: number;
  subtotal: number;
  discount: number;
  total: number;
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  paymentMethod: string;
  invoiceUrl?: string;
}

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  role?: 'admin' | 'customer';
  avatarUrl?: string;
  activePlan?: string;
  downloadsRemaining: number;
  totalDownloads: number;
  memberSince: string;
}

export interface AdminStats {
  totalRevenueInPaise: number;
  totalRevenue: number;
  totalOrders: number;
  totalDownloads: number;
  totalCustomers: number;
  conversionRate: number;
}
