'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Code2,
  Star,
  Play,
  ShoppingBag,
  Server,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  Download,
  Terminal,
  Cpu,
  Layers,
  Check,
  HelpCircle,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  LayoutGrid,
  List,
  Eye,
  Lock,
  Flame,
  MessageCircle,
  FileCode,
  Globe,
  Database,
  RefreshCw,
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import { productStore } from '@/lib/productStore';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';

const CATEGORIES = [
  'All Categories',
  'CRM & ERP',
  'AI & Automation',
  'Fintech & Payments',
  'E-Commerce',
  'Mobile Apps',
  'DevOps & Cloud',
];

const POPULAR_TECH_STACKS = [
  'All Stacks',
  'Next.js 15',
  'FastAPI',
  'PostgreSQL',
  'Tailwind CSS',
  'Flutter',
  'TypeScript',
  'Docker',
  'Python',
];

export default function ProductsPage() {
  const { openLiveDemo, addItem } = useCart();
  const { formatPrice, currency } = useCurrency();

  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedTech, setSelectedTech] = useState('All Stacks');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'price-low' | 'price-high'>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  useEffect(() => {
    setProductsList(productStore.getProducts());
    productStore.fetchFromApi().then((data) => {
      if (data && data.length > 0) setProductsList(data);
    });

    const handleUpdate = () => {
      setProductsList(productStore.getProducts());
    };

    window.addEventListener('dunga_products_updated', handleUpdate);
    return () => window.removeEventListener('dunga_products_updated', handleUpdate);
  }, []);

  const filteredProducts = useMemo(() => {
    return (productsList || [])
      .filter((product) => {
        if (!product) return false;
        const title = (product.title || '').toLowerCase();
        const shortDesc = (product.shortDescription || '').toLowerCase();
        const techStack = Array.isArray(product.techStack) ? product.techStack : [];
        const q = searchQuery.toLowerCase().trim();

        const matchesSearch =
          !q ||
          title.includes(q) ||
          shortDesc.includes(q) ||
          techStack.some((t) => t.toLowerCase().includes(q));

        const matchesCategory =
          selectedCategory === 'All Categories' || product.category === selectedCategory;

        const matchesTech =
          selectedTech === 'All Stacks' || techStack.includes(selectedTech);

        return matchesSearch && matchesCategory && matchesTech;
      })
      .sort((a, b) => {
        const aSales = Number(a.salesCount) || 0;
        const bSales = Number(b.salesCount) || 0;
        const aRating = Number(a.rating) || 0;
        const bRating = Number(b.rating) || 0;
        const aPrice = Number(a.regularPriceINR) || 0;
        const bPrice = Number(b.regularPriceINR) || 0;

        if (sortBy === 'popular') return bSales - aSales;
        if (sortBy === 'rating') return bRating - aRating;
        if (sortBy === 'price-low') return aPrice - bPrice;
        if (sortBy === 'price-high') return bPrice - aPrice;
        return 0;
      });
  }, [productsList, searchQuery, selectedCategory, selectedTech, sortBy]);

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { 'All Categories': productsList.length };
    productsList.forEach((p) => {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1;
      }
    });
    return counts;
  }, [productsList]);

  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-900">
      
      {/* ============================================================ */}
      {/* 1. HERO SECTION: Modern SaaS Marketplace Banner (Diploy-inspired) */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-slate-100/90 pt-10 pb-16 sm:pt-14 sm:pb-24 border-b border-slate-200/60">
        {/* Ambient Subtle Gradients */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-orange-200/25 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-teal-200/20 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f040_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f040_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-60 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
            
            {/* Left Column: Heading, Animated Rotator, CTAs & Social Proof */}
            <div className="w-full lg:w-6/12 flex flex-col gap-6 max-w-xl">
              
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs w-fit">
                <ShieldCheck className="w-4 h-4 text-[#e06527]" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Helping Businesses Launch Faster
                </span>
              </div>

              {/* Dynamic Sliding Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.16] font-heading">
                <span className="block">Production-ready</span>
                <span className="block">
                  software,{' '}
                  <span className="bento-sliding-text-container">
                    <span className="bento-sliding-text-inner">
                      <span className="bento-sliding-text bento-accent-text">beautifully shipped.</span>
                      <span className="bento-sliding-text bento-accent-text">ready to launch.</span>
                      <span className="bento-sliding-text bento-accent-text">built to scale.</span>
                      <span className="bento-sliding-text bento-accent-text">beautifully shipped.</span>
                    </span>
                  </span>
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Skip months of costly agency development. Launch with our ready-made SaaS applications — fully customizable, unencrypted source code, expertly supported, and built to scale.
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 pt-1">
                <a
                  href="#marketplace-grid"
                  className="bg-[#e06527] hover:bg-[#c9561c] text-white px-7 py-3.5 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/35 hover:-translate-y-0.5 no-underline"
                >
                  Explore products
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="/contact"
                  className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-6 py-3.5 rounded-xl font-semibold text-base transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-[#246e7f]" />
                  Talk to sales
                </a>
              </div>

              {/* Verified Rating & Social Proof Bar */}
              <div className="flex items-center gap-4 pt-2 border-t border-slate-200/80">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">
                    AK
                  </div>
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-[#246e7f] text-white text-[10px] font-bold flex items-center justify-center">
                    PS
                  </div>
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-[#e06527] text-white text-[10px] font-bold flex items-center justify-center">
                    VM
                  </div>
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                    RD
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    <span className="text-slate-900 font-bold text-sm ml-1">4.9 rating</span>
                  </div>
                  <div className="text-xs text-slate-500">from 500+ verified founders & CTOs</div>
                </div>
              </div>

              {/* 4 Feature Value Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                <div className="bg-white border border-slate-200/90 rounded-xl px-2.5 py-2 text-center shadow-xs">
                  <strong className="block text-[11px] font-bold text-slate-900">100% Full Code</strong>
                  <span className="text-[10px] text-slate-500">Unencrypted</span>
                </div>
                <div className="bg-white border border-slate-200/90 rounded-xl px-2.5 py-2 text-center shadow-xs">
                  <strong className="block text-[11px] font-bold text-slate-900">24-48h Setup</strong>
                  <span className="text-[10px] text-slate-500">VPS Installation</span>
                </div>
                <div className="bg-white border border-slate-200/90 rounded-xl px-2.5 py-2 text-center shadow-xs">
                  <strong className="block text-[11px] font-bold text-slate-900">White-Label</strong>
                  <span className="text-[10px] text-slate-500">100% Your IP</span>
                </div>
                <div className="bg-white border border-slate-200/90 rounded-xl px-2.5 py-2 text-center shadow-xs">
                  <strong className="block text-[11px] font-bold text-slate-900">Zero Monthly</strong>
                  <span className="text-[10px] text-slate-500">One-time Buy</span>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive SaaS Showcase Terminal */}
            <div className="w-full lg:w-6/12 relative">
              
              {/* Main Showcase Browser Card */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300">
                {/* Browser Mockup Top Bar */}
                <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-full text-[11px] text-slate-300 font-mono">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span>marketplace.dungatech.com/preview</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Demo
                  </div>
                </div>

                {/* Showcase Content */}
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Active Featured Product Banner Preview */}
                  {productsList && productsList[0] ? (
                    <div className="space-y-4">
                      <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 group border border-slate-100 shadow-inner">
                        <Image
                          src={productsList[0].image || '/banner_1.png'}
                          alt={productsList[0].title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                        
                        {/* Overlay Tags */}
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="bg-[#e06527] text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-sm">
                            ⭐ Top Rated Codebase
                          </span>
                          <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-1 rounded-lg">
                            {productsList[0].category}
                          </span>
                        </div>

                        {/* Overlay Actions */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <div>
                            <h3 className="text-white text-sm sm:text-base font-bold line-clamp-1 drop-shadow-sm">
                              {productsList[0].title}
                            </h3>
                            <p className="text-slate-300 text-xs line-clamp-1">
                              {productsList[0].shortDescription}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => openLiveDemo(productsList[0])}
                            className="shrink-0 bg-white/95 hover:bg-white text-slate-900 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-lg transition-all hover:scale-105"
                          >
                            <Play className="w-3.5 h-3.5 fill-[#e06527] text-[#e06527]" />
                            Test Live
                          </button>
                        </div>
                      </div>

                      {/* Tech Stack Chips & Price Summary */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                        <div className="flex flex-wrap gap-1.5">
                          {productsList[0].techStack?.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <div className="text-xs text-slate-400 line-through">
                              {formatPrice(productsList[0].originalPriceINR)}
                            </div>
                            <div className="text-base sm:text-lg font-black text-slate-900">
                              {formatPrice(productsList[0].regularPriceINR)}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => addItem(productsList[0], false)}
                            className="bg-[#246e7f] hover:bg-[#1a515e] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            Get Code
                          </button>
                        </div>
                      </div>

                      {/* Quick Switcher of other top items */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-medium">Explore popular turnkeys:</span>
                        <div className="flex items-center gap-2 font-semibold">
                          {productsList.slice(1, 4).map((p) => (
                            <Link
                              key={p.id}
                              href={`/products/${p.slug}`}
                              className="text-slate-700 hover:text-[#e06527] transition-colors truncate max-w-[90px]"
                            >
                              • {p.title.split(' ')[0]}
                            </Link>
                          ))}
                        </div>
                      </div>

                    </div>
                  ) : null}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* ============================================================ */}
      {/* 2. DYNAMIC FILTER & CONTROLS BAR (Sticky & Responsive) */}
      {/* ============================================================ */}
      <section id="marketplace-grid" className="relative -mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20 scroll-mt-24">
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xl space-y-3.5">
          
          {/* Top Row: Search Input + Sorting + View Switcher */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            
            {/* Search Box */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search SaaS products, CRM, AI, tech stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-2xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f] focus:bg-white transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-700 bg-slate-200 px-1.5 py-0.5 rounded-full"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Right Controls: Sort & Grid/List View */}
            <div className="flex items-center justify-between md:justify-end gap-2.5 w-full md:w-auto">
              {/* Sort By Dropdown */}
              <div className="relative flex-1 md:flex-none flex items-center">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full md:w-auto bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl pl-8 pr-8 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#246e7f] cursor-pointer appearance-none"
                >
                  <option value="popular">Most Popular & Best Sellers</option>
                  <option value="rating">Highest Customer Rating</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white text-[#246e7f] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-white text-[#246e7f] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Category Tabs Pill Carousel */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none border-t border-slate-100 pt-3 -mx-1 px-1 sm:mx-0 sm:px-0">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = categoryCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 shrink-0 ${
                    isSelected
                      ? 'bg-[#246e7f] text-white shadow-sm ring-1 ring-[#246e7f]'
                      : 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 border border-slate-200/60'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Tech Stack Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto sm:flex-wrap text-xs text-slate-500 pt-1 pb-1 scrollbar-none -mx-1 px-1 sm:mx-0 sm:px-0">
            <span className="font-semibold text-slate-400 text-[11px] mr-1 shrink-0">Filter Stack:</span>
            {POPULAR_TECH_STACKS.map((tech) => (
              <button
                key={tech}
                type="button"
                onClick={() => setSelectedTech(tech)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all shrink-0 ${
                  selectedTech === tech
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {tech}
              </button>
            ))}

            {(selectedCategory !== 'All Categories' || selectedTech !== 'All Stacks' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All Categories');
                  setSelectedTech('All Stacks');
                  setSearchQuery('');
                }}
                className="text-[11px] font-bold text-rose-600 hover:underline ml-auto flex items-center gap-1 shrink-0"
              >
                Reset Filters
              </button>
            )}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. PRODUCT CATALOG: Redesigned Ultra-Attractive Cards */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-6">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              {selectedCategory === 'All Categories' ? 'All Ready-Made Software & SaaS Suites' : selectedCategory}
            </h2>
            <span className="bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shrink-0 shadow-2xs inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {filteredProducts.length} Available
            </span>
          </div>

          <span className="text-xs text-slate-500 hidden md:inline-block">
            All codebases tested for Next.js 15 & Node 20+ LTS
          </span>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs max-w-lg mx-auto space-y-4 my-8">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No matching software codebases found</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We couldn&apos;t find any script matching &quot;{searchQuery}&quot; under {selectedCategory}. Try searching for another keyword or reset your filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All Categories');
                setSelectedTech('All Stacks');
                setSearchQuery('');
              }}
              className="bg-[#246e7f] hover:bg-[#1a515e] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-xs"
            >
              Clear All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* ============================================================ */
          /* GRID VIEW: 3-Column Modern Diploy-Style Cards */
          /* ============================================================ */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-2xl hover:border-slate-300 transition-all duration-300 flex flex-col group relative"
              >
                {/* Visual Thumbnail & Live Demo Hover Overlay */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={product.thumbnailUrl}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* Badges on Thumbnail */}
                  <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-1.5">
                    <span className="bg-[#246e7f] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm backdrop-blur-xs">
                      {product.category}
                    </span>
                    {product.isFeatured && (
                      <span className="bg-[#e06527] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
                        <Flame className="w-3 h-3 fill-current" />
                        Best Seller
                      </span>
                    )}
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3.5 right-3.5 bg-slate-950/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-xl flex items-center gap-1.5 border border-white/10 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-[10px] text-slate-400">({product.reviewCount})</span>
                  </div>

                  {/* Hover Quick Action Buttons */}
                  <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-2xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 p-4">
                    <button
                      type="button"
                      onClick={() => openLiveDemo(product)}
                      className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 transform hover:scale-105 active:scale-95 transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-[#e06527] text-[#e06527]" />
                      <span>Live Demo</span>
                    </button>

                    <Link
                      href={`/products/${product.slug}`}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-1.5 transform hover:scale-105 active:scale-95 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Specs</span>
                    </Link>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div>
                    {/* Version & Sales Count Row */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
                      <span className="font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                        v{product.version}
                      </span>
                      <span className="flex items-center gap-1 text-emerald-700 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {product.salesCount} Licenses Distributed
                      </span>
                    </div>

                    {/* Product Title */}
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 hover:text-[#246e7f] transition-colors leading-snug line-clamp-1">
                        {product.title}
                      </h3>
                    </Link>

                    {/* Short Description */}
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
                      {product.shortDescription}
                    </p>

                    {/* Technical Highlights (Checklist) */}
                    <div className="mt-3.5 space-y-1.5 border-t border-slate-100 pt-3">
                      {(product.highlights && product.highlights.length > 0
                        ? product.highlights.slice(0, 2)
                        : ['100% Full Unencrypted Source Code', 'Production-ready PostgreSQL & Docker']
                      ).map((h, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mt-3.5">
                      {product.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="bg-slate-50 text-slate-700 text-[10px] font-mono px-2 py-0.5 rounded-md border border-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                      {product.techStack.length > 4 && (
                        <span className="bg-slate-50 text-slate-400 text-[10px] px-1.5 py-0.5 rounded-md border border-slate-200">
                          +{product.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pricing & Call to Actions */}
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    
                    {/* Setup Add-on Badge */}
                    <div className="flex items-center justify-between text-[11px] bg-[#e6f4f7] border border-[#246e7f]/20 text-[#1a515e] px-3 py-1.5 rounded-xl">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Server className="w-3.5 h-3.5 text-[#246e7f]" />
                        <span>Optional VPS Server Setup:</span>
                      </span>
                      <strong className="font-bold text-[#246e7f]">
                        +{formatPrice(product.defaultSetupPriceINR, product.defaultSetupPriceUSD)}
                      </strong>
                    </div>

                    {/* Price and Actions */}
                    <div className="pt-3 border-t border-slate-100 space-y-2.5">
                      {/* Price header row */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                            {formatPrice(product.regularPriceINR, product.regularPriceUSD)}
                          </span>
                          <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full whitespace-nowrap">
                            Zero Monthly Fees
                          </span>
                        </div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 whitespace-nowrap">
                          One-Time License
                        </span>
                      </div>

                      {/* Action buttons row */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <Link
                          href={`/products/${product.slug}`}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 rounded-xl transition-colors text-center flex items-center justify-center gap-1"
                        >
                          Details
                        </Link>

                        <button
                          type="button"
                          onClick={() => addItem(product, 'REGULAR', [])}
                          className="bg-[#246e7f] hover:bg-[#1a515e] text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-md shadow-[#246e7f]/20 flex items-center justify-center gap-1.5 active:scale-95 whitespace-nowrap"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                          <span>Buy Code</span>
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ============================================================ */
          /* LIST VIEW: Detailed Horizontal Rows */
          /* ============================================================ */
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group"
              >
                {/* Left: Thumbnail + Main Info */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-1">
                  <div className="w-full sm:w-48 h-32 rounded-2xl overflow-hidden relative shrink-0 bg-slate-900">
                    <img
                      src={product.thumbnailUrl}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-[#246e7f] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {product.category}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                        v{product.version}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{product.rating}</span>
                        <span className="text-slate-400 font-normal">({product.reviewCount})</span>
                      </div>
                      <span className="text-xs text-slate-400">• {product.salesCount} Sales</span>
                    </div>

                    <Link href={`/products/${product.slug}`}>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 hover:text-[#246e7f] transition-colors">
                        {product.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-600 line-clamp-2 max-w-xl">
                      {product.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {product.techStack.map((t) => (
                        <span key={t} className="bg-slate-50 border border-slate-200 text-[10px] font-mono px-2 py-0.5 rounded text-slate-600">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Price & CTA Actions */}
                <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 flex flex-col justify-between shrink-0 space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Single License Price</span>
                    <span className="text-2xl font-black text-slate-900">
                      {formatPrice(product.regularPriceINR, product.regularPriceUSD)}
                    </span>
                    <span className="text-[11px] text-slate-500 block">100% full source code ownership</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openLiveDemo(product)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
                    >
                      <Play className="w-3 h-3 text-[#e06527] fill-[#e06527]" />
                      <span>Demo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => addItem(product, 'REGULAR', [])}
                      className="flex-1 bg-[#246e7f] hover:bg-[#1a515e] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Buy Code</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </section>

      {/* ============================================================ */}
      {/* 4. VALUE COMPARISON BENTO GRID (Why Buy Source Code vs Agency) */}
      {/* ============================================================ */}
      <section className="bg-white border-y border-slate-200/80 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-1.5 bg-[#e6f4f7] border border-[#246e7f]/20 text-[#246e7f] text-xs font-bold px-3.5 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#e06527]" />
              <span>THE DUNGA ADVANTAGE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Why Launch With Dunga Technologies Source Codes?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Compare the cost, speed, and ownership of ready-made software against traditional agency development or vendor subscriptions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Column 1: Traditional Agency */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-4">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Option A</div>
              <h3 className="text-lg font-bold text-slate-900">Hiring an Agency from Scratch</h3>
              <div className="text-2xl font-black text-slate-800">$15,000 - $45,000+</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Requires months of requirement gathering, design revisions, sprint delays, and uncertain delivery timelines.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-200">
                <li className="flex items-center gap-2 text-rose-600">✕ 4 to 9 Months time to market</li>
                <li className="flex items-center gap-2 text-rose-600">✕ Expensive scope change charges</li>
                <li className="flex items-center gap-2 text-rose-600">✕ High risk of technical bugs</li>
              </ul>
            </div>

            {/* Column 2: Dunga Technologies (Featured) */}
            <div className="bg-gradient-to-b from-[#e6f4f7] to-[#d3ebef] border-2 border-[#246e7f] rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl relative transform md:-translate-y-2">
              <div className="absolute -top-3.5 right-6 bg-[#e06527] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md">
                Recommended Choice
              </div>
              <div className="text-xs font-bold text-[#246e7f] uppercase tracking-wider">Option B</div>
              <h3 className="text-lg font-bold text-slate-900">Dunga Ready-Made Codebases</h3>
              <div className="text-2xl font-black text-[#246e7f]">
                {currency === 'INR' ? '₹4,999' : '$69'} <span className="text-xs font-normal text-slate-600">One-time</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Instant delivery of 100% unencrypted full stack repository. Deploy on your own VPS within 24-48 hours with full ownership.
              </p>
              <ul className="space-y-2 text-xs text-slate-800 pt-2 border-t border-[#246e7f]/20 font-medium">
                <li className="flex items-center gap-2 text-emerald-700 font-bold">✓ Launch in 24 - 48 Hours</li>
                <li className="flex items-center gap-2 text-emerald-700 font-bold">✓ 100% Unencrypted Source Code</li>
                <li className="flex items-center gap-2 text-emerald-700 font-bold">✓ Zero monthly vendor fees</li>
                <li className="flex items-center gap-2 text-emerald-700 font-bold">✓ Complete database schemas & Docker</li>
              </ul>
            </div>

            {/* Column 3: SaaS Vendor Subscriptions */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-4">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Option C</div>
              <h3 className="text-lg font-bold text-slate-900">SaaS Monthly Subscription</h3>
              <div className="text-2xl font-black text-slate-800">$299 - $899 / mo</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pay per user or per contact month after month without ever owning the software or database.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-200">
                <li className="flex items-center gap-2 text-rose-600">✕ Zero source code ownership</li>
                <li className="flex items-center gap-2 text-rose-600">✕ Endless recurring costs</li>
                <li className="flex items-center gap-2 text-rose-600">✕ Customer data stored on 3rd party servers</li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. 3-STEP DEPLOYMENT ROADMAP */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            How Deployment & Ownership Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            From checkout to live production in 3 frictionless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs relative space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#e6f4f7] text-[#246e7f] flex items-center justify-center font-black text-lg">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900">Acquire & Instant Download</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete your checkout with instant UPI, Razorpay, or Stripe. Receive immediate access to the full source code ZIP archive and digital license key.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs relative space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#fff3eb] text-[#e06527] flex items-center justify-center font-black text-lg">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900">Self-Host or Engineer Setup</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Deploy yourself using our step-by-step Docker compose and environment configs, or opt for our 24-48h VPS installation add-on managed by Dunga engineers.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs relative space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-lg">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900">White-Label & Scale</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Replace logos, bind custom domain SSL, connect payment webhooks, and start onboarding your paying clients with 100% margin retention.
            </p>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. FAQ ACCORDION SECTION */}
      {/* ============================================================ */}
      <section className="bg-white border-t border-slate-200/80 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Everything you need to know about purchasing, licensing, and deploying our codebases.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'What is included with my source code package purchase?',
                a: 'You receive 100% full, unencrypted frontend (Next.js/React), backend API routes (FastAPI/Node), complete PostgreSQL database schemas, Prisma migrations, Docker compose deployment scripts, and detailed architectural PDF documentation.',
              },
              {
                q: 'Do I have to pay any monthly or annual subscription fees?',
                a: 'No. All Dunga Technologies source codes are sold under one-time commercial licenses. There are zero recurring vendor royalties or monthly platform fees.',
              },
              {
                q: 'Can I rebrand and white-label this software for my own clients?',
                a: 'Yes. With the Extended Commercial License, you can customize the branding, logo, color palette, and deploy multi-tenant instances for your paying SaaS clients with 100% revenue retention.',
              },
              {
                q: 'How does the 24-48 Hour VPS Server Setup Add-on work?',
                a: 'If you choose our standard setup service (+₹999 / +$15), our senior infrastructure engineers will configure your Ubuntu VPS (Hostinger, AWS, DigitalOcean, Hetzner), setup PostgreSQL, domain SSL certificates, and test all webhooks within 24 to 48 hours.',
              },
              {
                q: 'Can your team build custom features or tailor the code to my needs?',
                a: 'Yes. Dunga Technologies provides dedicated full-stack engineers and custom sprint development if you require proprietary integrations or bespoke modules.',
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 font-bold text-xs sm:text-sm text-slate-900 bg-slate-50/50 hover:bg-slate-50 flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      activeFaq === idx ? 'rotate-180 text-[#246e7f]' : ''
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="p-4 sm:p-5 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. BOTTOM CTA BANNER: WhatsApp & Custom Tech Advisory */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-r from-[#1a515e] via-[#246e7f] to-[#123945] text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Need a Custom Feature, Integration or Dedicated Team?
              </h2>
              <p className="text-xs sm:text-sm text-teal-100">
                Talk directly with our lead solution architects. We provide full customization, API integrations, and dedicated developer teams starting at ₹499/hr.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link
                href="/contact"
                className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-lg flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#246e7f]" />
                <span>Talk to Solutions Engineer</span>
              </Link>

              <Link
                href="/hire-developers"
                className="bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all flex items-center gap-2"
              >
                <span>Hire Dedicated Developers</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
