export type Currency = 'INR' | 'USD';

export type LicenseType = 'REGULAR' | 'EXTENDED' | 'SAAS_MONTHLY' | 'SAAS_YEARLY';

export interface SetupAddon {
  id: string;
  name: string;
  description: string;
  priceINR: number;
  priceUSD: number;
  estimatedTurnaround: string;
  recommended?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  category: 'CRM & ERP' | 'AI & Automation' | 'E-Commerce' | 'Fintech & Payments' | 'Mobile Apps' | 'DevOps & Cloud';
  techStack: string[];
  version: string;
  lastUpdated: string;
  thumbnailUrl: string;
  bannerUrl: string;
  galleryImages: string[];
  previewUrl: string; // Live Demo Link
  adminDemoUrl?: string; // Admin Demo Link
  regularPriceINR: number;
  regularPriceUSD: number;
  extendedPriceINR: number;
  extendedPriceUSD: number;
  monthlySaasPriceINR?: number;
  monthlySaasPriceUSD?: number;
  yearlySaasPriceINR?: number;
  yearlySaasPriceUSD?: number;
  defaultSetupPriceINR: number;
  defaultSetupPriceUSD: number;
  availableAddons: SetupAddon[];
  highlights: string[];
  features: {
    title: string;
    description: string;
    icon?: string;
  }[];
  systemRequirements: {
    requirement: string;
    specification: string;
  }[];
  documentationUrl?: string;
  changelog: {
    version: string;
    date: string;
    changes: string[];
  }[];
  isFeatured: boolean;
  salesCount: number;
  rating: number;
  reviewCount: number;
  includedFiles: string[];
}

export interface CartItem {
  id: string; // product-id + license-type
  product: Product;
  licenseType: LicenseType;
  selectedAddons: SetupAddon[];
  licensePriceINR: number;
  licensePriceUSD: number;
  addonsTotalINR: number;
  addonsTotalUSD: number;
  subtotalINR: number;
  subtotalUSD: number;
}

export interface Service {
  id: string;
  slug: string;
  aliases?: string[];
  title: string;
  tagline: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
  techStack: string[];
  timeline: string;
  startingPriceINR: number;
  startingPriceUSD: number;
  benefits: { title: string; desc: string }[];
  processSteps: { step: number; title: string; description: string }[];
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  clientIndustry: string;
  category: string;
  clientLogo?: string;
  thumbnailUrl: string;
  bannerUrl: string;
  metrics: { label: string; value: string; change: string }[];
  challenge: string;
  solution: string;
  techStack: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
    avatarUrl: string;
  };
  liveUrl?: string;
}

export interface UserLicense {
  id: string;
  licenseKey: string;
  productId: string;
  productTitle: string;
  productSlug: string;
  thumbnailUrl: string;
  version: string;
  licenseType: LicenseType;
  boundDomain?: string;
  isActive: boolean;
  purchasedAt: string;
  expiresAt?: string;
  downloadPackageUrl: string;
  setupStatus: 'NOT_REQUESTED' | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  setupNotes?: string;
}

export interface OrderReceipt {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerCompany?: string;
  currency: Currency;
  items: CartItem[];
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: 'PAID' | 'PENDING' | 'FAILED';
  transactionId: string;
  paidAt: string;
  generatedLicenses: {
    productId: string;
    licenseKey: string;
    licenseType: LicenseType;
    downloadUrl: string;
  }[];
}
