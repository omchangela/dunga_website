'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Product, ProductSeo, ProductFaq } from '@/types';
import { productStore, generateAutoSeo, performSeoAudit, SeoAuditResult } from '@/lib/productStore';
import {
  X,
  Sparkles,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  DollarSign,
  Code2,
  Globe,
  Layers,
  FileCode,
  Tag,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Eye,
  Smartphone,
  Monitor,
  Zap,
  Check,
  ArrowRight
} from 'lucide-react';

interface ProductFormModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

const CATEGORIES = [
  'CRM & ERP',
  'AI & Automation',
  'Fintech & Payments',
  'E-Commerce',
  'Mobile Apps',
  'DevOps & Cloud',
];

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  product,
  isOpen,
  onClose,
  onSaved,
}) => {
  const isEditing = Boolean(product?.id);

  // Tab State: 'general' | 'pricing' | 'seo' | 'audit'
  const [activeTab, setActiveTab] = useState<'general' | 'pricing' | 'seo' | 'audit'>('general');

  // Form Fields
  const [title, setTitle] = useState(product?.title || '');
  const [slug, setSlug] = useState(product?.slug || '');
  const [tagline, setTagline] = useState(product?.tagline || '');
  const [category, setCategory] = useState<string>(product?.category || 'CRM & ERP');
  const [shortDescription, setShortDescription] = useState(product?.shortDescription || '');
  const [fullDescription, setFullDescription] = useState(product?.fullDescription || '');
  const [version, setVersion] = useState(product?.version || '1.0.0');
  const [techStackInput, setTechStackInput] = useState(product?.techStack?.join(', ') || 'Next.js 15, PostgreSQL, Tailwind CSS, TypeScript');
  const [thumbnailUrl, setThumbnailUrl] = useState(product?.thumbnailUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop');
  const [bannerUrl, setBannerUrl] = useState(product?.bannerUrl || '');
  const [previewUrl, setPreviewUrl] = useState(product?.previewUrl || 'https://demo.dungatechnologies.com');
  const [adminDemoUrl, setAdminDemoUrl] = useState(product?.adminDemoUrl || '');
  const [packageZipUrl, setPackageZipUrl] = useState(product?.packageZipUrl || '');

  // Pricing Fields
  const [regularPriceINR, setRegularPriceINR] = useState<number>(product?.regularPriceINR || 4999);
  const [regularPriceUSD, setRegularPriceUSD] = useState<number>(product?.regularPriceUSD || 69);
  const [extendedPriceINR, setExtendedPriceINR] = useState<number>(product?.extendedPriceINR || 14999);
  const [extendedPriceUSD, setExtendedPriceUSD] = useState<number>(product?.extendedPriceUSD || 199);
  const [monthlySaasPriceINR, setMonthlySaasPriceINR] = useState<number>(product?.monthlySaasPriceINR || 999);
  const [monthlySaasPriceUSD, setMonthlySaasPriceUSD] = useState<number>(product?.monthlySaasPriceUSD || 15);
  const [defaultSetupPriceINR, setDefaultSetupPriceINR] = useState<number>(product?.defaultSetupPriceINR || 999);
  const [defaultSetupPriceUSD, setDefaultSetupPriceUSD] = useState<number>(product?.defaultSetupPriceUSD || 15);

  // SEO Fields
  const [seoTitle, setSeoTitle] = useState(product?.seo?.seoTitle || '');
  const [metaDescription, setMetaDescription] = useState(product?.seo?.metaDescription || '');
  const [primaryKeyword, setPrimaryKeyword] = useState(product?.seo?.primaryKeyword || '');
  const [secondaryKeywordsInput, setSecondaryKeywordsInput] = useState(product?.seo?.secondaryKeywords?.join(', ') || '');
  const [canonicalUrl, setCanonicalUrl] = useState(product?.seo?.canonicalUrl || '');
  const [indexFollow, setIndexFollow] = useState<{ index: boolean; follow: boolean }>({
    index: product?.seo?.index ?? true,
    follow: product?.seo?.follow ?? true,
  });
  const [imageAlt, setImageAlt] = useState(product?.seo?.imageAlt || '');
  const [faqs, setFaqs] = useState<ProductFaq[]>(
    product?.faqs || [
      {
        question: `What is included in this source code package?`,
        answer: 'You receive 100% full unencrypted Next.js frontend, backend API routes, database schemas, Docker compose, and complete setup documentation.',
      },
      {
        question: 'How do lifetime updates and bug fixes work?',
        answer: 'All buyers get lifetime access to repository updates and security patches released by Dunga Technologies.',
      },
    ]
  );

  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Auto generate SEO when title or short description changes and user hasn't overridden
  const handleAutoGenerateSeo = () => {
    const auto = generateAutoSeo({
      title,
      slug,
      category,
      shortDescription,
      fullDescription,
      techStack: techStackInput.split(',').map((s) => s.trim()).filter(Boolean),
    });

    setSeoTitle(auto.seoTitle);
    setMetaDescription(auto.metaDescription);
    setPrimaryKeyword(auto.primaryKeyword);
    setSecondaryKeywordsInput(auto.secondaryKeywords.join(', '));
    setCanonicalUrl(auto.canonicalUrl);
    setImageAlt(auto.imageAlt);
    if (!slug) {
      setSlug(auto.seoSlug);
    }
  };

  // Sync initial state if editing
  useEffect(() => {
    if (product) {
      setTitle(product.title || '');
      setSlug(product.slug || '');
      setTagline(product.tagline || '');
      setCategory(product.category || 'CRM & ERP');
      setShortDescription(product.shortDescription || '');
      setFullDescription(product.fullDescription || '');
      setVersion(product.version || '1.0.0');
      setTechStackInput(product.techStack?.join(', ') || '');
      setThumbnailUrl(product.thumbnailUrl || '');
      setBannerUrl(product.bannerUrl || '');
      setPreviewUrl(product.previewUrl || '');
      setAdminDemoUrl(product.adminDemoUrl || '');
      setPackageZipUrl(product.packageZipUrl || '');
      setRegularPriceINR(product.regularPriceINR || 4999);
      setRegularPriceUSD(product.regularPriceUSD || 69);
      setExtendedPriceINR(product.extendedPriceINR || 14999);
      setExtendedPriceUSD(product.extendedPriceUSD || 199);
      setMonthlySaasPriceINR(product.monthlySaasPriceINR || 999);
      setMonthlySaasPriceUSD(product.monthlySaasPriceUSD || 15);
      setDefaultSetupPriceINR(product.defaultSetupPriceINR || 999);
      setDefaultSetupPriceUSD(product.defaultSetupPriceUSD || 15);

      if (product.seo) {
        setSeoTitle(product.seo.seoTitle || '');
        setMetaDescription(product.seo.metaDescription || '');
        setPrimaryKeyword(product.seo.primaryKeyword || '');
        setSecondaryKeywordsInput(product.seo.secondaryKeywords?.join(', ') || '');
        setCanonicalUrl(product.seo.canonicalUrl || '');
        setImageAlt(product.seo.imageAlt || '');
        setIndexFollow({
          index: product.seo.index ?? true,
          follow: product.seo.follow ?? true,
        });
      } else {
        handleAutoGenerateSeo();
      }

      setFaqs(product.faqs && product.faqs.length > 0 ? product.faqs : [
        { question: `What is included in this source code package?`, answer: 'You receive 100% full unencrypted Next.js frontend, backend API routes, database schemas, Docker compose, and complete setup documentation.' },
        { question: 'How do lifetime updates work?', answer: 'All buyers get lifetime access to repository updates and security patches released by Dunga Technologies.' }
      ]);
    } else {
      // New Product Defaults
      setTitle('');
      setSlug('');
      setTagline('Production-grade enterprise software script');
      setShortDescription('');
      setFullDescription('');
      setVersion('1.0.0');
      setTechStackInput('Next.js 15, PostgreSQL, Tailwind CSS, TypeScript');
      setThumbnailUrl('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop');
      setBannerUrl('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop');
      setPreviewUrl('https://demo.dungatechnologies.com');
      setAdminDemoUrl('');
      setPackageZipUrl('');
      setRegularPriceINR(4999);
      setRegularPriceUSD(69);
      setExtendedPriceINR(14999);
      setExtendedPriceUSD(199);
      setMonthlySaasPriceINR(999);
      setMonthlySaasPriceUSD(15);
      setDefaultSetupPriceINR(999);
      setDefaultSetupPriceUSD(15);
      setSeoTitle('');
      setMetaDescription('');
      setPrimaryKeyword('');
      setSecondaryKeywordsInput('');
      setCanonicalUrl('');
      setImageAlt('');
      setFaqs([
        { question: `What is included in this source code package?`, answer: 'You receive 100% full unencrypted Next.js frontend, backend API routes, database schemas, Docker compose, and complete setup documentation.' },
        { question: 'How do lifetime updates work?', answer: 'All buyers get lifetime access to repository updates and security patches released by Dunga Technologies.' }
      ]);
    }
  }, [product, isOpen]);

  // Current State for SEO Audit
  const currentProductState: Partial<Product> = useMemo(() => {
    return {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: category as any,
      shortDescription,
      fullDescription,
      version,
      techStack: techStackInput.split(',').map((s) => s.trim()).filter(Boolean),
      regularPriceINR,
      regularPriceUSD,
      faqs,
      seo: {
        seoTitle: seoTitle || `${title} — Full Source Code & Server Setup | Dunga Technologies`,
        metaDescription: metaDescription || shortDescription,
        primaryKeyword,
        secondaryKeywords: secondaryKeywordsInput.split(',').map((s) => s.trim()).filter(Boolean),
        seoSlug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        canonicalUrl: canonicalUrl || `https://dungatechnologies.com/products/${slug || 'software'}`,
        index: indexFollow.index,
        follow: indexFollow.follow,
        imageAlt: imageAlt || `${title} — Full Source Code`,
      },
    };
  }, [title, slug, category, shortDescription, fullDescription, version, techStackInput, regularPriceINR, regularPriceUSD, faqs, seoTitle, metaDescription, primaryKeyword, secondaryKeywordsInput, canonicalUrl, indexFollow, imageAlt]);

  // Real-Time SEO Audit Result
  const auditResult: SeoAuditResult = useMemo(() => {
    return performSeoAudit(currentProductState);
  }, [currentProductState]);

  // Handle FAQ Add / Remove
  const handleAddFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  const handleUpdateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);
  };

  const handleRemoveFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  // Form Submit Handler
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError('');
    setIsSaving(true);

    if (!title.trim()) {
      setSaveError('Product title is required.');
      setIsSaving(false);
      return;
    }

    try {
      const techStack = techStackInput.split(',').map((s) => s.trim()).filter(Boolean);
      const secondaryKeywords = secondaryKeywordsInput.split(',').map((s) => s.trim()).filter(Boolean);

      const finalSlug = (slug || title)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const payload: Partial<Product> = {
        id: product?.id,
        title: title.trim(),
        slug: finalSlug,
        tagline: tagline.trim() || 'Production-grade enterprise software script',
        category: category as any,
        shortDescription: shortDescription.trim(),
        fullDescription: fullDescription.trim(),
        version: version.trim() || '1.0.0',
        techStack,
        thumbnailUrl: thumbnailUrl.trim(),
        bannerUrl: bannerUrl.trim() || thumbnailUrl.trim(),
        previewUrl: previewUrl.trim(),
        adminDemoUrl: adminDemoUrl.trim() || undefined,
        packageZipUrl: packageZipUrl.trim() || undefined,
        regularPriceINR: Number(regularPriceINR),
        regularPriceUSD: Number(regularPriceUSD),
        extendedPriceINR: Number(extendedPriceINR),
        extendedPriceUSD: Number(extendedPriceUSD),
        monthlySaasPriceINR: Number(monthlySaasPriceINR),
        monthlySaasPriceUSD: Number(monthlySaasPriceUSD),
        defaultSetupPriceINR: Number(defaultSetupPriceINR),
        defaultSetupPriceUSD: Number(defaultSetupPriceUSD),
        faqs,
        seo: {
          seoTitle: seoTitle.trim() || `${title} — Full Source Code & Server Setup | Dunga Technologies`,
          metaDescription: metaDescription.trim() || shortDescription.trim(),
          primaryKeyword: primaryKeyword.trim(),
          secondaryKeywords,
          seoSlug: finalSlug,
          canonicalUrl: canonicalUrl.trim() || `https://dungatechnologies.com/products/${finalSlug}`,
          index: indexFollow.index,
          follow: indexFollow.follow,
          imageAlt: imageAlt.trim() || `${title} — Full Source Code`,
        },
      };

      productStore.saveProduct(payload);
      onSaved();
      onClose();
    } catch (err: any) {
      setSaveError(err?.message || 'Error saving product.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#246E7F] to-[#1a515e] text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                {isEditing ? `Edit Product: ${product?.title}` : 'Add New Source Code Product'}
              </h3>
              <p className="text-teal-100 text-xs">
                Includes automated SEO generation, Google Snippet live preview & 100% dynamic website publishing.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live SEO Score Pill */}
            <div className="hidden sm:flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full text-xs">
              <span className="text-teal-200 font-medium">SEO Score:</span>
              <span className={`font-black px-2 py-0.5 rounded-full ${
                auditResult.totalScore >= 85 ? 'bg-emerald-400 text-slate-900' : auditResult.totalScore >= 70 ? 'bg-amber-400 text-slate-900' : 'bg-rose-400 text-white'
              }`}>
                {auditResult.totalScore}/100 ({auditResult.grade})
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 pt-3 flex flex-wrap gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'general'
                ? 'bg-white text-[#246e7f] border-t-2 border-[#246e7f] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>1. General & Codebase</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pricing')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'pricing'
                ? 'bg-white text-[#246e7f] border-t-2 border-[#246e7f] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>2. Pricing & Licenses</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('seo')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'seo'
                ? 'bg-white text-[#246e7f] border-t-2 border-[#246e7f] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>3. SEO & Structured Data</span>
            <span className="bg-[#246e7f] text-white text-[10px] px-1.5 py-0.2 rounded-full ml-1">
              Auto
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'audit'
                ? 'bg-white text-[#246e7f] border-t-2 border-[#246e7f] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>4. Real-Time SEO Audit ({auditResult.totalScore}%)</span>
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* ============================================================ */}
          {/* TAB 1: GENERAL & CODEBASE SPECIFICATIONS */}
          {/* ============================================================ */}
          {activeTab === 'general' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Product Name / H1 Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. OmniFlow AI CRM & Telecalling Suite"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (!slug) {
                        setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                      }
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:bg-white"
                  />
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    Automatically generates the page &lt;h1&gt;, breadcrumb, and SoftwareApplication schema name.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:bg-white cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Software Version *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2.4.0"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tagline / One-Liner Value Proposition
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Enterprise-grade lead distribution, automatic dialer & WhatsApp API automation."
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Short Description (Used in Cards & Meta Description Fallback) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Describe the main capabilities and business benefit in 1-2 clear sentences..."
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Product Description & Architecture Specs (Markdown Supported) *
                  </label>
                  <textarea
                    rows={6}
                    required
                    placeholder="Detail the complete module breakdown, database architecture, third-party integrations, and why clients should purchase..."
                    value={fullDescription}
                    onChange={(e) => setFullDescription(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tech Stack Badges (Comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Next.js 15, FastAPI, PostgreSQL, Tailwind CSS, Redis"
                    value={techStackInput}
                    onChange={(e) => setTechStackInput(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Live Demo Frontend URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://demo.dungatechnologies.com/app"
                    value={previewUrl}
                    onChange={(e) => setPreviewUrl(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Live Demo Admin URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://demo.dungatechnologies.com/app/admin"
                    value={adminDemoUrl}
                    onChange={(e) => setAdminDemoUrl(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Source Code Package Download URL (ZIP / Cloud Storage Link)
                  </label>
                  <input
                    type="text"
                    placeholder="https://downloads.dungatechnologies.com/packages/omniflow-v2.4.0.zip"
                    value={packageZipUrl}
                    onChange={(e) => setPackageZipUrl(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:bg-white"
                  />
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    Issued to clients on the checkout success receipt and invoice after payment confirmation.
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Featured Thumbnail Image URL *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 2: PRICING & LICENSING SPECIFICATIONS */}
          {/* ============================================================ */}
          {activeTab === 'pricing' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              
              <div className="bg-[#e6f4f7] border border-[#246e7f]/20 rounded-2xl p-4 flex items-center justify-between text-xs text-[#246e7f]">
                <div>
                  <span className="font-bold block">Dual-Currency Pricing Engine</span>
                  <span>Set both INR (for Indian UPI/Razorpay) and USD (for Stripe global clients).</span>
                </div>
                <DollarSign className="w-6 h-6 text-[#246e7f]" />
              </div>

              {/* Regular License */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <span className="text-xs font-bold text-slate-900 block">
                  1. Regular Commercial License (Single Domain / Client Deploy)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-600 mb-1 font-semibold">Price in INR (₹) *</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={regularPriceINR}
                      onChange={(e) => setRegularPriceINR(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246E7F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-1 font-semibold">Price in USD ($) *</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={regularPriceUSD}
                      onChange={(e) => setRegularPriceUSD(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246E7F]"
                    />
                  </div>
                </div>
              </div>

              {/* Extended License */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <span className="text-xs font-bold text-slate-900 block">
                  2. Extended Commercial License (Multi-Tenant / Unlimited Re-Sale)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-600 mb-1 font-semibold">Price in INR (₹) *</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={extendedPriceINR}
                      onChange={(e) => setExtendedPriceINR(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246E7F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-1 font-semibold">Price in USD ($) *</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={extendedPriceUSD}
                      onChange={(e) => setExtendedPriceUSD(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246E7F]"
                    />
                  </div>
                </div>
              </div>

              {/* Cloud SaaS Subscription */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <span className="text-xs font-bold text-slate-900 block">
                  3. Cloud Hosted SaaS Subscription (Monthly)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-600 mb-1 font-semibold">Monthly SaaS in INR (₹)</label>
                    <input
                      type="number"
                      min={0}
                      value={monthlySaasPriceINR}
                      onChange={(e) => setMonthlySaasPriceINR(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246E7F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-1 font-semibold">Monthly SaaS in USD ($)</label>
                    <input
                      type="number"
                      min={0}
                      value={monthlySaasPriceUSD}
                      onChange={(e) => setMonthlySaasPriceUSD(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246E7F]"
                    />
                  </div>
                </div>
              </div>

              {/* Setup Add-on */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <span className="text-xs font-bold text-slate-900 block">
                  4. Default Server Installation Add-on
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-600 mb-1 font-semibold">Setup Addon INR (₹)</label>
                    <input
                      type="number"
                      min={0}
                      value={defaultSetupPriceINR}
                      onChange={(e) => setDefaultSetupPriceINR(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246E7F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-1 font-semibold">Setup Addon USD ($)</label>
                    <input
                      type="number"
                      min={0}
                      value={defaultSetupPriceUSD}
                      onChange={(e) => setDefaultSetupPriceUSD(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246E7F]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 3: COMPLETE AUTOMATED SEO SUITE */}
          {/* ============================================================ */}
          {activeTab === 'seo' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Auto Generate SEO Header Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-2xl p-4">
                <div>
                  <h4 className="text-xs font-bold text-teal-950 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#246e7f]" />
                    <span>Automatic SEO Engine</span>
                  </h4>
                  <p className="text-[11px] text-teal-700 mt-0.5">
                    Extracts keywords, generates meta tags, canonical URL, and rich schema markup automatically.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAutoGenerateSeo}
                  className="px-3.5 py-1.5 bg-[#246e7f] hover:bg-[#1a515e] text-white text-xs font-bold rounded-xl transition-colors shadow-xs shrink-0 flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  <span>Re-Generate Auto SEO</span>
                </button>
              </div>

              {/* Google Search Snippet Live Preview */}
              <div className="bg-slate-900 text-white rounded-2xl p-4 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs font-bold text-slate-200">Google SERP Snippet Preview</span>
                  </div>

                  <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('desktop')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                        previewDevice === 'desktop' ? 'bg-slate-700 text-white' : 'text-slate-400'
                      }`}
                    >
                      <Monitor className="w-3 h-3" />
                      <span>Desktop</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('mobile')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                        previewDevice === 'mobile' ? 'bg-slate-700 text-white' : 'text-slate-400'
                      }`}
                    >
                      <Smartphone className="w-3 h-3" />
                      <span>Mobile</span>
                    </button>
                  </div>
                </div>

                <div className={`p-3 bg-white text-slate-900 rounded-xl space-y-1 shadow-inner ${
                  previewDevice === 'mobile' ? 'max-w-sm mx-auto' : ''
                }`}>
                  <div className="text-[11px] text-slate-600 flex items-center gap-1 truncate font-mono">
                    <span className="text-emerald-700 font-bold">https://dungatechnologies.com</span>
                    <span>› products › {slug || 'software'}</span>
                  </div>
                  <h5 className="text-sm font-semibold text-[#1a0dab] hover:underline line-clamp-1 leading-snug cursor-pointer">
                    {seoTitle || `${title || 'Software Product'} — Full Source Code & Server Setup | Dunga Technologies`}
                  </h5>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {metaDescription || shortDescription || 'Production ready unencrypted software suite with full database migrations and Docker setup.'}
                  </p>
                </div>
              </div>

              {/* SEO Title & Meta Description Inputs with Character Counters */}
              <div className="space-y-4">
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-700">SEO Meta Title *</label>
                    <span className={`text-[11px] font-mono font-bold ${
                      seoTitle.length >= 45 && seoTitle.length <= 65 ? 'text-emerald-600' : 'text-amber-600'
                    }`}>
                      {seoTitle.length} / 60 chars {seoTitle.length >= 45 && seoTitle.length <= 65 ? '(Optimal)' : '(Adjust)'}
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="e.g. OmniFlow AI CRM & Telecaller Suite — Full Source Code | Dunga Technologies"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:bg-white"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-700">SEO Meta Description *</label>
                    <span className={`text-[11px] font-mono font-bold ${
                      metaDescription.length >= 130 && metaDescription.length <= 165 ? 'text-emerald-600' : 'text-amber-600'
                    }`}>
                      {metaDescription.length} / 160 chars {metaDescription.length >= 130 && metaDescription.length <= 165 ? '(Optimal)' : '(Adjust)'}
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    required
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Provide a compelling 150-160 char summary with primary keyword to maximize Google CTR..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:bg-white"
                  />
                </div>

                {/* Keywords & Slug */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Target Keyword *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. OmniFlow AI CRM Source Code"
                      value={primaryKeyword}
                      onChange={(e) => setPrimaryKeyword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      SEO URL Slug *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. omniflow-ai-crm-telecaller-suite"
                      value={slug}
                      onChange={(e) => {
                        const sanitized = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
                        setSlug(sanitized);
                        setCanonicalUrl(`https://dungatechnologies.com/products/${sanitized}`);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Secondary LSI Keywords (Comma-separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. telecaller script, Next.js CRM codebase, buy CRM source code, self hosted dialer"
                      value={secondaryKeywordsInput}
                      onChange={(e) => setSecondaryKeywordsInput(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Canonical URL Tag *
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://dungatechnologies.com/products/omniflow-ai-crm-telecaller-suite"
                      value={canonicalUrl}
                      onChange={(e) => setCanonicalUrl(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Featured Image ALT Text (For Image SEO & Screen Readers) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. OmniFlow AI CRM Telecaller Dashboard Architecture & Source Code"
                      value={imageAlt}
                      onChange={(e) => setImageAlt(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:bg-white"
                    />
                  </div>

                  {/* Index / Follow Toggles */}
                  <div className="sm:col-span-2 flex items-center gap-6 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-900">
                      <input
                        type="checkbox"
                        checked={indexFollow.index}
                        onChange={(e) => setIndexFollow({ ...indexFollow, index: e.target.checked })}
                        className="rounded text-[#246e7f] focus:ring-[#246e7f]"
                      />
                      <span>Index (Allow Google Search Indexing)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-900">
                      <input
                        type="checkbox"
                        checked={indexFollow.follow}
                        onChange={(e) => setIndexFollow({ ...indexFollow, follow: e.target.checked })}
                        className="rounded text-[#246e7f] focus:ring-[#246e7f]"
                      />
                      <span>Follow (Allow Search Crawlers to Follow Links)</span>
                    </label>
                  </div>
                </div>

                {/* Structured FAQs for Google FAQPage Rich Snippet */}
                <div className="space-y-3 pt-3 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-[#246e7f]" />
                        <span>Structured Product FAQs (Generates Google FAQ Rich Snippets)</span>
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Rendered on public page and parsed into JSON-LD FAQPage Schema automatically.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddFaq}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add FAQ</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            placeholder="Question (e.g. Can I host this on my own AWS/VPS server?)"
                            value={faq.question}
                            onChange={(e) => handleUpdateFaq(idx, 'question', e.target.value)}
                            className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#246E7F]"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveFaq(idx)}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          placeholder="Answer (e.g. Yes, you get complete Docker and manual deployment scripts for unlimited self-hosting.)"
                          value={faq.answer}
                          onChange={(e) => handleUpdateFaq(idx, 'answer', e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#246E7F]"
                        />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 4: REAL-TIME SEO AUDIT & SCORE METER */}
          {/* ============================================================ */}
          {activeTab === 'audit' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Score Header Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 border border-slate-700 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-0.5 rounded-full text-xs font-bold text-emerald-300">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Real-Time On-Page SEO Engine</span>
                  </div>
                  <h4 className="text-2xl font-black text-white">
                    SEO Health Grade: <span className="text-emerald-400">{auditResult.grade}</span>
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md">
                    Live evaluation of Google Indexing factors, keyword prominence, rich schema completeness, and content depth.
                  </p>
                </div>

                {/* Circular Score Visual */}
                <div className="relative w-28 h-28 rounded-full border-4 border-emerald-500/30 bg-slate-800 flex flex-col items-center justify-center text-center shadow-lg shrink-0">
                  <span className="text-3xl font-black text-white">{auditResult.totalScore}</span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Out of 100</span>
                </div>
              </div>

              {/* Word Count & Metric Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Word Count</span>
                  <span className="text-base font-black text-slate-900">{auditResult.wordCount} words</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Keyword Density</span>
                  <span className="text-base font-black text-[#246e7f]">{auditResult.keywordDensity}%</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Structured FAQs</span>
                  <span className="text-base font-black text-emerald-600">{faqs.length} Items</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Rich Schemas</span>
                  <span className="text-base font-black text-purple-600">4 Types</span>
                </div>
              </div>

              {/* Dynamic Checklist */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Audit Checklist & Recommendations
                </h5>

                <div className="space-y-2">
                  {auditResult.checks.map((chk) => (
                    <div
                      key={chk.id}
                      className={`p-3.5 rounded-2xl border flex items-start gap-3 transition-all ${
                        chk.status === 'PASS'
                          ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                          : chk.status === 'WARN'
                          ? 'bg-amber-50/60 border-amber-200 text-amber-950'
                          : 'bg-rose-50/60 border-rose-200 text-rose-950'
                      }`}
                    >
                      <div className="shrink-0 mt-0.5">
                        {chk.status === 'PASS' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : chk.status === 'WARN' ? (
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                        ) : (
                          <X className="w-4 h-4 text-rose-600" />
                        )}
                      </div>

                      <div className="flex-1 text-xs">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold">{chk.label}</span>
                          <span className="font-mono text-[11px] font-extrabold">
                            {chk.score} / {chk.maxScore} pts
                          </span>
                        </div>
                        <p className="text-[11px] opacity-80 mt-0.5">{chk.feedback}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {saveError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{saveError}</span>
            </div>
          )}

          {/* Modal Bottom Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 shrink-0">
            <div className="text-xs text-slate-500">
              <span className="font-bold text-slate-800">Dunga SEO Engine:</span> Changes reflect dynamically across website store & sitemap.
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 rounded-xl transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 bg-[#246E7F] hover:bg-[#1a515e] disabled:opacity-75 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving & Indexing...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{isEditing ? 'Update & Re-Index Product' : 'Publish Product to Store'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
