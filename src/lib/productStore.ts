import { Product, ProductSeo, ProductFaq } from '@/types';
import { PRODUCTS } from '@/data/products';

const STORAGE_KEY = 'dunga_dynamic_products_v1';

// Automated SEO Generator Helper
export function generateAutoSeo(product: Partial<Product>): ProductSeo {
  const title = product.title?.trim() || 'New Software Product';
  const rawSlug = (product.slug || title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const category = product.category || 'Software';
  const shortDesc = product.shortDescription?.trim() || `${title} is an unencrypted, full source code software suite by Dunga Technologies.`;
  
  // Clean meta description (optimal 150-160 chars)
  let metaDescription = shortDesc;
  if (metaDescription.length < 120) {
    metaDescription = `${shortDesc} Includes unencrypted Next.js source code, lifetime updates, and 24-48h server setup by Dunga Technologies.`;
  }
  if (metaDescription.length > 160) {
    metaDescription = metaDescription.substring(0, 157).trim() + '...';
  }

  // SEO Title (optimal 50-60 chars)
  const seoTitle = `${title} — Full Source Code & Server Setup | Dunga Technologies`;

  // Primary Keyword auto extraction
  const primaryKeyword = `${title} Source Code`;
  const secondaryKeywords = [
    `${category} script`,
    `buy ${title.toLowerCase()}`,
    'unencrypted source code',
    'Next.js software script',
    'self-hosted SaaS code',
    ...(product.techStack || []),
  ];

  const canonicalUrl = `https://dungatechnologies.com/products/${rawSlug}`;
  const imageAlt = `${title} — Full Source Code & System Architecture Preview`;

  return {
    seoTitle,
    metaDescription,
    primaryKeyword,
    secondaryKeywords,
    seoSlug: rawSlug,
    canonicalUrl,
    index: true,
    follow: true,
    imageAlt,
  };
}

// Real-Time SEO Audit & Score Calculator
export interface SeoAuditItem {
  id: string;
  label: string;
  category: 'Critical' | 'Recommended' | 'Bonus';
  status: 'PASS' | 'WARN' | 'FAIL';
  score: number;
  maxScore: number;
  feedback: string;
}

export interface SeoAuditResult {
  totalScore: number; // 0 - 100
  grade: 'A+' | 'A' | 'B' | 'C' | 'Needs Improvement';
  checks: SeoAuditItem[];
  wordCount: number;
  keywordDensity: number;
}

export function performSeoAudit(product: Partial<Product>): SeoAuditResult {
  const seo = product.seo || generateAutoSeo(product);
  const title = product.title || '';
  const seoTitle = seo.seoTitle || '';
  const metaDesc = seo.metaDescription || '';
  const primaryKw = seo.primaryKeyword?.toLowerCase().trim() || '';
  const slug = seo.seoSlug || product.slug || '';
  const fullDesc = product.fullDescription || '';
  const imageAlt = seo.imageAlt || '';
  const faqs = product.faqs || [];

  const checks: SeoAuditItem[] = [];

  // 1. SEO Title Length & Presence (Max: 15 pts)
  if (!seoTitle) {
    checks.push({
      id: 'title-presence',
      label: 'SEO Title Presence',
      category: 'Critical',
      status: 'FAIL',
      score: 0,
      maxScore: 15,
      feedback: 'Missing SEO Title tag. Search engines require a descriptive title.',
    });
  } else if (seoTitle.length >= 45 && seoTitle.length <= 65) {
    checks.push({
      id: 'title-presence',
      label: 'SEO Title Length',
      category: 'Critical',
      status: 'PASS',
      score: 15,
      maxScore: 15,
      feedback: `Optimal title length (${seoTitle.length} characters). Avoids SERP truncation.`,
    });
  } else if (seoTitle.length < 45) {
    checks.push({
      id: 'title-presence',
      label: 'SEO Title Length',
      category: 'Recommended',
      status: 'WARN',
      score: 10,
      maxScore: 15,
      feedback: `Title is somewhat short (${seoTitle.length} chars). Aim for 50–60 characters.`,
    });
  } else {
    checks.push({
      id: 'title-presence',
      label: 'SEO Title Length',
      category: 'Recommended',
      status: 'WARN',
      score: 10,
      maxScore: 15,
      feedback: `Title is long (${seoTitle.length} chars) and will be truncated on Google desktop/mobile.`,
    });
  }

  // 2. Meta Description (Max: 15 pts)
  if (!metaDesc) {
    checks.push({
      id: 'meta-desc',
      label: 'Meta Description',
      category: 'Critical',
      status: 'FAIL',
      score: 0,
      maxScore: 15,
      feedback: 'No meta description provided. Google will extract arbitrary snippets.',
    });
  } else if (metaDesc.length >= 120 && metaDesc.length <= 165) {
    checks.push({
      id: 'meta-desc',
      label: 'Meta Description Length',
      category: 'Critical',
      status: 'PASS',
      score: 15,
      maxScore: 15,
      feedback: `Perfect meta description length (${metaDesc.length} chars).`,
    });
  } else {
    checks.push({
      id: 'meta-desc',
      label: 'Meta Description Length',
      category: 'Recommended',
      status: 'WARN',
      score: 10,
      maxScore: 15,
      feedback: `Current description is ${metaDesc.length} chars. Optimal is 140–160 chars.`,
    });
  }

  // 3. Keyword in Title & Description (Max: 15 pts)
  if (primaryKw) {
    const inTitle = seoTitle.toLowerCase().includes(primaryKw) || title.toLowerCase().includes(primaryKw.split(' ')[0]);
    const inDesc = metaDesc.toLowerCase().includes(primaryKw) || metaDesc.toLowerCase().includes(primaryKw.split(' ')[0]);

    if (inTitle && inDesc) {
      checks.push({
        id: 'kw-placement',
        label: 'Primary Keyword Placement',
        category: 'Critical',
        status: 'PASS',
        score: 15,
        maxScore: 15,
        feedback: `Primary keyword "${primaryKw}" detected in Title and Meta Description.`,
      });
    } else if (inTitle || inDesc) {
      checks.push({
        id: 'kw-placement',
        label: 'Primary Keyword Placement',
        category: 'Recommended',
        status: 'WARN',
        score: 10,
        maxScore: 15,
        feedback: `Keyword found in ${inTitle ? 'Title only' : 'Description only'}. Include in both.`,
      });
    } else {
      checks.push({
        id: 'kw-placement',
        label: 'Primary Keyword Placement',
        category: 'Recommended',
        status: 'FAIL',
        score: 5,
        maxScore: 15,
        feedback: `Keyword "${primaryKw}" not found in Title or Meta Description.`,
      });
    }
  } else {
    checks.push({
      id: 'kw-placement',
      label: 'Primary Keyword Defined',
      category: 'Recommended',
      status: 'WARN',
      score: 5,
      maxScore: 15,
      feedback: 'Define a primary target keyword for focus rank tracking.',
    });
  }

  // 4. URL Slug Format (Max: 10 pts)
  const isCleanSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
  if (slug && isCleanSlug && !slug.includes('_') && slug.length < 75) {
    checks.push({
      id: 'slug-check',
      label: 'SEO-Friendly Clean Slug',
      category: 'Critical',
      status: 'PASS',
      score: 10,
      maxScore: 10,
      feedback: `Clean lowercase hyphenated URL: /products/${slug}`,
    });
  } else {
    checks.push({
      id: 'slug-check',
      label: 'SEO-Friendly Slug',
      category: 'Critical',
      status: 'FAIL',
      score: 3,
      maxScore: 10,
      feedback: 'Slug contains uppercase, special characters, or underscores. Clean it up.',
    });
  }

  // 5. Canonical URL (Max: 10 pts)
  if (seo.canonicalUrl && seo.canonicalUrl.startsWith('https://')) {
    checks.push({
      id: 'canonical-check',
      label: 'Self-Referencing Canonical URL',
      category: 'Critical',
      status: 'PASS',
      score: 10,
      maxScore: 10,
      feedback: `Valid HTTPS canonical URL prevents duplicate content issues.`,
    });
  } else {
    checks.push({
      id: 'canonical-check',
      label: 'Canonical URL',
      category: 'Critical',
      status: 'WARN',
      score: 5,
      maxScore: 10,
      feedback: 'Ensure canonical URL starts with https://dungatechnologies.com',
    });
  }

  // 6. Content Depth & Word Count (Max: 15 pts)
  const words = `${title} ${product.shortDescription || ''} ${fullDesc}`.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  if (wordCount >= 250) {
    checks.push({
      id: 'content-depth',
      label: 'Content Depth & Word Count',
      category: 'Recommended',
      status: 'PASS',
      score: 15,
      maxScore: 15,
      feedback: `Rich, high-depth product copy (${wordCount} words). Strong indexability.`,
    });
  } else if (wordCount >= 100) {
    checks.push({
      id: 'content-depth',
      label: 'Content Depth',
      category: 'Recommended',
      status: 'WARN',
      score: 10,
      maxScore: 15,
      feedback: `Moderate content (${wordCount} words). Add feature specs or modules to reach 250+ words.`,
    });
  } else {
    checks.push({
      id: 'content-depth',
      label: 'Content Depth',
      category: 'Recommended',
      status: 'FAIL',
      score: 4,
      maxScore: 15,
      feedback: `Thin content (${wordCount} words). Google may penalize thin product pages.`,
    });
  }

  // 7. Image ALT Text (Max: 5 pts)
  if (imageAlt && imageAlt.length >= 10) {
    checks.push({
      id: 'image-alt',
      label: 'Featured Image ALT Text',
      category: 'Recommended',
      status: 'PASS',
      score: 5,
      maxScore: 5,
      feedback: 'Descriptive ALT text present for Google Image Search indexing.',
    });
  } else {
    checks.push({
      id: 'image-alt',
      label: 'Image ALT Text',
      category: 'Recommended',
      status: 'FAIL',
      score: 0,
      maxScore: 5,
      feedback: 'Missing or too short image ALT text.',
    });
  }

  // 8. FAQ Structured Schema Count (Max: 10 pts)
  if (faqs && faqs.length >= 2) {
    checks.push({
      id: 'faq-structured',
      label: 'Structured FAQs & FAQPage Schema',
      category: 'Bonus',
      status: 'PASS',
      score: 10,
      maxScore: 10,
      feedback: `${faqs.length} FAQ questions configured. Generates Google Rich Snippet FAQ accordion.`,
    });
  } else if (faqs && faqs.length === 1) {
    checks.push({
      id: 'faq-structured',
      label: 'Structured FAQs',
      category: 'Bonus',
      status: 'WARN',
      score: 5,
      maxScore: 10,
      feedback: 'Add at least 2 FAQs to qualify for Google FAQ rich snippet results.',
    });
  } else {
    checks.push({
      id: 'faq-structured',
      label: 'Structured FAQs',
      category: 'Bonus',
      status: 'WARN',
      score: 0,
      maxScore: 10,
      feedback: 'No FAQs added. FAQs significantly boost SERP real estate.',
    });
  }

  // 9. Schema Readiness (Max: 5 pts)
  const hasPricing = (product.regularPriceINR || 0) > 0;
  if (hasPricing && product.version) {
    checks.push({
      id: 'schema-readiness',
      label: 'SoftwareApplication & Offer Schema',
      category: 'Critical',
      status: 'PASS',
      score: 5,
      maxScore: 5,
      feedback: 'Pricing, software version, and ratings are ready for JSON-LD schema generation.',
    });
  } else {
    checks.push({
      id: 'schema-readiness',
      label: 'Schema Readiness',
      category: 'Critical',
      status: 'WARN',
      score: 2,
      maxScore: 5,
      feedback: 'Ensure pricing and version are set for Google Product & Offer Schema.',
    });
  }

  // Calculate Total Score
  const totalScore = checks.reduce((acc, curr) => acc + curr.score, 0);
  let grade: SeoAuditResult['grade'] = 'Needs Improvement';
  if (totalScore >= 95) grade = 'A+';
  else if (totalScore >= 85) grade = 'A';
  else if (totalScore >= 70) grade = 'B';
  else if (totalScore >= 50) grade = 'C';

  // Calculate keyword density
  let keywordDensity = 0;
  if (primaryKw && wordCount > 0) {
    const occurrences = (fullDesc.toLowerCase().match(new RegExp(primaryKw, 'g')) || []).length;
    keywordDensity = Number(((occurrences / wordCount) * 100).toFixed(1));
  }

  return {
    totalScore,
    grade,
    checks,
    wordCount,
    keywordDensity,
  };
}

export function normalizeProduct(raw: any): Product {
  if (!raw || typeof raw !== 'object') {
    raw = {};
  }
  // Try finding original static data for extra enriched specs
  const matchedStatic = PRODUCTS.find((p) => p.slug === raw.slug || p.id === raw.id);

  const title = raw.title || matchedStatic?.title || 'New Software Suite';
  const slug = (raw.slug || matchedStatic?.slug || title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const id = raw.id || matchedStatic?.id || `prod_${slug}`;
  const category = raw.category || matchedStatic?.category || 'CRM & ERP';
  const shortDescription = raw.shortDescription || matchedStatic?.shortDescription || 'Full stack source code with complete database migrations and Docker setup.';
  const fullDescription = raw.fullDescription || matchedStatic?.fullDescription || shortDescription;
  const techStack = Array.isArray(raw.techStack) && raw.techStack.length > 0 
    ? raw.techStack 
    : matchedStatic?.techStack || ['Next.js 15', 'PostgreSQL', 'Tailwind CSS'];

  const regularPriceINR = Number(raw.regularPriceINR ?? matchedStatic?.regularPriceINR ?? 4999) || 4999;
  const regularPriceUSD = Number(raw.regularPriceUSD ?? matchedStatic?.regularPriceUSD ?? 69) || 69;
  const extendedPriceINR = Number(raw.extendedPriceINR ?? matchedStatic?.extendedPriceINR ?? 14999) || 14999;
  const extendedPriceUSD = Number(raw.extendedPriceUSD ?? matchedStatic?.extendedPriceUSD ?? 199) || 199;
  const defaultSetupPriceINR = Number(raw.defaultSetupPriceINR ?? matchedStatic?.defaultSetupPriceINR ?? 999) || 999;
  const defaultSetupPriceUSD = Number(raw.defaultSetupPriceUSD ?? matchedStatic?.defaultSetupPriceUSD ?? 15) || 15;

  const thumbnailUrl = raw.thumbnailUrl || matchedStatic?.thumbnailUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop';
  const bannerUrl = raw.bannerUrl || matchedStatic?.bannerUrl || thumbnailUrl;
  const previewUrl = raw.previewUrl || raw.liveDemoUrl || matchedStatic?.previewUrl || 'https://demo.dungatechnologies.com';

  const autoSeo = generateAutoSeo({ title, slug, category, shortDescription, fullDescription, techStack });
  const seo: ProductSeo = {
    ...autoSeo,
    ...(matchedStatic?.seo || {}),
    ...(raw.seo || {}),
    seoSlug: slug,
    canonicalUrl: raw.seo?.canonicalUrl || matchedStatic?.seo?.canonicalUrl || `https://dungatechnologies.com/products/${slug}`,
  };

  return {
    id,
    slug,
    title,
    tagline: raw.tagline || matchedStatic?.tagline || 'Production-grade enterprise software script',
    shortDescription,
    fullDescription,
    category,
    techStack,
    version: raw.version || matchedStatic?.version || '1.0.0',
    lastUpdated: raw.lastUpdated || matchedStatic?.lastUpdated || new Date().toISOString().slice(0, 10),
    thumbnailUrl,
    bannerUrl,
    galleryImages: Array.isArray(raw.galleryImages) && raw.galleryImages.length > 0 ? raw.galleryImages : matchedStatic?.galleryImages || [thumbnailUrl],
    previewUrl,
    adminDemoUrl: raw.adminDemoUrl || matchedStatic?.adminDemoUrl,
    packageZipUrl: raw.packageZipUrl || matchedStatic?.packageZipUrl || `https://downloads.dungatechnologies.com/packages/${slug}.zip`,
    regularPriceINR,
    regularPriceUSD,
    extendedPriceINR,
    extendedPriceUSD,
    monthlySaasPriceINR: Number(raw.monthlySaasPriceINR ?? matchedStatic?.monthlySaasPriceINR ?? 999) || 999,
    monthlySaasPriceUSD: Number(raw.monthlySaasPriceUSD ?? matchedStatic?.monthlySaasPriceUSD ?? 15) || 15,
    yearlySaasPriceINR: Number(raw.yearlySaasPriceINR ?? matchedStatic?.yearlySaasPriceINR ?? 9999) || 9999,
    yearlySaasPriceUSD: Number(raw.yearlySaasPriceUSD ?? matchedStatic?.yearlySaasPriceUSD ?? 149) || 149,
    defaultSetupPriceINR,
    defaultSetupPriceUSD,
    availableAddons: Array.isArray(raw.availableAddons) ? raw.availableAddons : matchedStatic?.availableAddons || [],
    highlights: Array.isArray(raw.highlights) && raw.highlights.length > 0 ? raw.highlights : matchedStatic?.highlights || ['100% Full Unencrypted Source Code', 'Production Ready Architecture'],
    features: Array.isArray(raw.features) && raw.features.length > 0 ? raw.features : matchedStatic?.features || [],
    systemRequirements: Array.isArray(raw.systemRequirements) && raw.systemRequirements.length > 0 ? raw.systemRequirements : matchedStatic?.systemRequirements || [
      { requirement: 'Operating System', specification: 'Ubuntu 20.04+ / Debian 11+ / macOS / Windows' },
      { requirement: 'Runtime', specification: 'Node.js 18+ or 20+ LTS' },
      { requirement: 'Database', specification: 'PostgreSQL 14+ or MySQL 8.0+' },
    ],
    documentationUrl: raw.documentationUrl || matchedStatic?.documentationUrl,
    changelog: Array.isArray(raw.changelog) && raw.changelog.length > 0 ? raw.changelog : matchedStatic?.changelog || [{ version: '1.0.0', date: new Date().toISOString().slice(0, 10), changes: ['Initial Release'] }],
    faqs: Array.isArray(raw.faqs) && raw.faqs.length > 0 ? raw.faqs : matchedStatic?.faqs || [
      { question: `What is included in the ${title} source code?`, answer: 'You get 100% unencrypted frontend, backend API, database migrations, Docker setup, and complete setup documentation.' },
      { question: 'How does the server setup add-on work?', answer: 'Our senior engineers will configure your VPS server, database, domain SSL, and test all webhooks within 24 to 48 hours.' }
    ],
    seo,
    relatedProductIds: Array.isArray(raw.relatedProductIds) ? raw.relatedProductIds : matchedStatic?.relatedProductIds || [],
    isFeatured: Boolean(raw.isFeatured ?? raw.featured ?? matchedStatic?.isFeatured),
    salesCount: Number(raw.salesCount ?? matchedStatic?.salesCount ?? 28),
    rating: Number(raw.rating ?? matchedStatic?.rating ?? 4.9),
    reviewCount: Number(raw.reviewCount ?? matchedStatic?.reviewCount ?? 18),
    includedFiles: Array.isArray(raw.includedFiles) && raw.includedFiles.length > 0 ? raw.includedFiles : matchedStatic?.includedFiles || ['Full Next.js Codebase', 'FastAPI / Node API', 'Prisma Schema & Migrations', 'Docker Compose', 'Setup PDF Guide'],
  };
}

export const productStore = {
  getProducts(): Product[] {
    if (typeof window === 'undefined') return PRODUCTS.map(normalizeProduct);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: any[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(normalizeProduct);
        }
      }
      // Initialize with default PRODUCTS
      const defaults = PRODUCTS.map(normalizeProduct);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
      return defaults;
    } catch {
      return PRODUCTS.map(normalizeProduct);
    }
  },

  async fetchFromApi(): Promise<Product[]> {
    try {
      const res = await fetch('/api/products');
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const normalized = json.data.map(normalizeProduct);
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
          window.dispatchEvent(new Event('dunga_products_updated'));
        }
        return normalized;
      }
    } catch (err) {
      console.warn('Could not fetch products from DB API, using local cache:', err);
    }
    return this.getProducts();
  },

  getProductBySlug(slug: string): Product | undefined {
    const all = this.getProducts();
    return all.find((p) => p.slug === slug || p.id === slug);
  },

  saveProduct(productData: Partial<Product>): Product {
    const products = this.getProducts();
    const isEdit = Boolean(productData.id);
    
    const id = productData.id || `prod_${Date.now()}`;
    const slug = (productData.slug || productData.title || 'software')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Auto-generate or preserve SEO
    const autoSeo = generateAutoSeo({ ...productData, id, slug });
    const finalSeo: ProductSeo = {
      ...autoSeo,
      ...(productData.seo || {}),
      seoSlug: slug,
      canonicalUrl: productData.seo?.canonicalUrl || `https://dungatechnologies.com/products/${slug}`,
    };

    const fullProduct: Product = {
      id,
      slug,
      title: productData.title || 'New Software Suite',
      tagline: productData.tagline || 'Production-grade enterprise software script',
      shortDescription: productData.shortDescription || 'Full stack source code with complete database migrations and Docker setup.',
      fullDescription: productData.fullDescription || 'Production-grade, unencrypted software platform.',
      category: productData.category || 'CRM & ERP',
      techStack: productData.techStack && productData.techStack.length > 0 ? productData.techStack : ['Next.js 15', 'PostgreSQL', 'Tailwind CSS'],
      version: productData.version || '1.0.0',
      lastUpdated: new Date().toISOString().slice(0, 10),
      thumbnailUrl: productData.thumbnailUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      bannerUrl: productData.bannerUrl || productData.thumbnailUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop',
      galleryImages: productData.galleryImages && productData.galleryImages.length > 0 ? productData.galleryImages : [productData.thumbnailUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop'],
      previewUrl: productData.previewUrl || 'https://demo.dungatechnologies.com',
      adminDemoUrl: productData.adminDemoUrl,
      packageZipUrl: productData.packageZipUrl || `https://downloads.dungatechnologies.com/packages/${slug}-v${productData.version || '1.0.0'}.zip`,
      regularPriceINR: Number(productData.regularPriceINR) || 4999,
      regularPriceUSD: Number(productData.regularPriceUSD) || 69,
      extendedPriceINR: Number(productData.extendedPriceINR) || 14999,
      extendedPriceUSD: Number(productData.extendedPriceUSD) || 199,
      monthlySaasPriceINR: productData.monthlySaasPriceINR ? Number(productData.monthlySaasPriceINR) : 999,
      monthlySaasPriceUSD: productData.monthlySaasPriceUSD ? Number(productData.monthlySaasPriceUSD) : 15,
      yearlySaasPriceINR: productData.yearlySaasPriceINR ? Number(productData.yearlySaasPriceINR) : 9999,
      yearlySaasPriceUSD: productData.yearlySaasPriceUSD ? Number(productData.yearlySaasPriceUSD) : 149,
      defaultSetupPriceINR: Number(productData.defaultSetupPriceINR) || 999,
      defaultSetupPriceUSD: Number(productData.defaultSetupPriceUSD) || 15,
      availableAddons: productData.availableAddons || [],
      highlights: productData.highlights && productData.highlights.length > 0 ? productData.highlights : ['100% Full Unencrypted Source Code', 'Production Ready Architecture'],
      features: productData.features || [],
      systemRequirements: productData.systemRequirements || [
        { requirement: 'Operating System', specification: 'Ubuntu 20.04+ / Debian 11+ / macOS / Windows' },
        { requirement: 'Runtime', specification: 'Node.js 18+ or 20+ LTS' },
        { requirement: 'Database', specification: 'PostgreSQL 14+ or MySQL 8.0+' },
      ],
      documentationUrl: productData.documentationUrl,
      changelog: productData.changelog || [{ version: productData.version || '1.0.0', date: new Date().toISOString().slice(0, 10), changes: ['Initial Release'] }],
      faqs: productData.faqs || [
        { question: `What is included in the ${productData.title || 'software'} source code?`, answer: 'You get 100% unencrypted frontend, backend API, database migrations, Docker setup, and complete setup documentation.' },
        { question: 'How does the server setup add-on work?', answer: 'Our senior engineers will configure your VPS server, database, domain SSL, and test all webhooks within 24 to 48 hours.' }
      ],
      seo: finalSeo,
      relatedProductIds: productData.relatedProductIds || [],
      isFeatured: Boolean(productData.isFeatured),
      salesCount: productData.salesCount ?? Math.floor(10 + Math.random() * 50),
      rating: productData.rating ?? 4.9,
      reviewCount: productData.reviewCount ?? Math.floor(15 + Math.random() * 30),
      includedFiles: productData.includedFiles || ['Full Next.js Codebase', 'FastAPI / Node API', 'Prisma Schema & Migrations', 'Docker Compose', 'Setup PDF Guide'],
    };

    let updatedList: Product[];
    if (isEdit) {
      updatedList = products.map((p) => (p.id === id ? fullProduct : p));
    } else {
      updatedList = [fullProduct, ...products];
    }

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
        window.dispatchEvent(new Event('dunga_products_updated'));
      } catch (err) {
        console.error('Failed to save product locally:', err);
      }

      // Sync to DB API in background
      fetch('/api/products', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullProduct),
      }).catch((e) => console.warn('Could not sync product to server DB:', e));
    }

    return fullProduct;
  },

  deleteProduct(id: string): void {
    const products = this.getProducts();
    const updated = products.filter((p) => p.id !== id && p.slug !== id);

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('dunga_products_updated'));

      fetch(`/api/products/${id}`, {
        method: 'DELETE',
      }).catch(() => {});
    }
  },
};
