'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
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
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';

const CATEGORIES = [
  'All Categories',
  'CRM & ERP',
  'AI & Automation',
  'Fintech & Payments',
  'E-Commerce',
  'Mobile Apps',
];

const ALL_TECH_STACKS = [
  'All Stacks',
  'Next.js 15',
  'FastAPI',
  'PostgreSQL',
  'Tailwind CSS',
  'Flutter',
  'TypeScript',
  'Docker',
];

export default function ProductsPage() {
  const { openLiveDemo, addItem } = useCart();
  const { formatPrice } = useCurrency();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedTech, setSelectedTech] = useState('All Stacks');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'price-low' | 'price-high'>('popular');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'All Categories' || product.category === selectedCategory;

      const matchesTech =
        selectedTech === 'All Stacks' || product.techStack.includes(selectedTech);

      return matchesSearch && matchesCategory && matchesTech;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.salesCount - a.salesCount;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-low') return a.regularPriceINR - b.regularPriceINR;
      if (sortBy === 'price-high') return b.regularPriceINR - a.regularPriceINR;
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedTech, sortBy]);

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#e6f4f7] border border-[#246e7f]/30 text-[#246e7f] text-xs font-bold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proprietary Marketplace</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Proprietary Software & Source Code
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Acquire fully-built, battle-tested source code and SaaS scripts developed in-house by Dunga Technologies. Includes complete database schemas, unencrypted codebases, and optional server installation.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search scripts, keywords, or tech stacks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f] focus:bg-white transition-all"
              />
            </div>

            {/* Category Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Tech Stack Dropdown */}
            <div className="md:col-span-2">
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
              >
                {ALL_TECH_STACKS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Filter Badges */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
            <span>
              Showing <strong>{filteredProducts.length}</strong> of {PRODUCTS.length} in-house software products
            </span>
            {(selectedCategory !== 'All Categories' || selectedTech !== 'All Stacks' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All Categories');
                  setSelectedTech('All Stacks');
                  setSearchQuery('');
                }}
                className="text-[#246e7f] hover:underline font-bold"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs space-y-3">
            <Code2 className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No products match your criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms or filters, or contact our engineering team to request a custom build.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All Categories');
                setSelectedTech('All Stacks');
                setSearchQuery('');
              }}
              className="bg-[#246e7f] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#1a515e] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-slate-300 transition-all flex flex-col group"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.thumbnailUrl}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Badges on Thumbnail */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-[#246e7f] text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                      {product.category}
                    </span>
                    {product.isFeatured && (
                      <span className="bg-[#e06527] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                        Best Seller
                      </span>
                    )}
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-slate-900 text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-[10px] text-slate-400">({product.reviewCount})</span>
                  </div>

                  {/* Live Demo Quick Action */}
                  <div className="absolute bottom-3 right-3">
                    <button
                      type="button"
                      onClick={() => openLiveDemo(product)}
                      className="bg-white/95 hover:bg-white text-slate-900 font-bold text-xs px-3 py-1.5 rounded-lg shadow-md transition-all flex items-center gap-1.5 hover:scale-105 active:scale-95"
                    >
                      <Play className="w-3 h-3 text-[#e06527] fill-[#e06527]" />
                      <span>Live Demo</span>
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span>Version {product.version}</span>
                      <span>{product.salesCount} Direct Sales</span>
                    </div>

                    <Link href={`/products/${product.slug}`}>
                      <h3 className="text-base font-bold text-slate-900 hover:text-[#246e7f] transition-colors line-clamp-1">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
                      {product.shortDescription}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {product.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="bg-slate-100 text-slate-700 text-[10px] font-mono px-2 py-0.5 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {product.techStack.length > 4 && (
                        <span className="bg-slate-50 text-slate-500 text-[10px] px-1.5 py-0.5 rounded">
                          +{product.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pricing & Actions */}
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    {/* Setup Add-on Badge */}
                    <div className="flex items-center justify-between text-[11px] bg-emerald-50/70 border border-emerald-200/60 text-emerald-900 px-2.5 py-1.5 rounded-lg">
                      <span className="flex items-center gap-1 font-medium">
                        <Server className="w-3 h-3 text-emerald-600" />
                        Optional Server Setup:
                      </span>
                      <strong className="font-bold text-emerald-700">
                        +{formatPrice(product.defaultSetupPriceINR, product.defaultSetupPriceUSD)}
                      </strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Source License
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-black text-slate-900">
                            {formatPrice(product.regularPriceINR, product.regularPriceUSD)}
                          </span>
                          <span className="text-[11px] text-slate-500">one-time</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/products/${product.slug}`}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3 py-2 rounded-lg transition-colors"
                        >
                          Details
                        </Link>
                        <button
                          type="button"
                          onClick={() => addItem(product, 'REGULAR', [])}
                          className="bg-[#246e7f] hover:bg-[#1a515e] text-white font-bold text-xs px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 shadow-xs active:scale-95"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Buy Code</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
