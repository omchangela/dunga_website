'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Code2,
  Sparkles,
  Play,
  ShoppingBag,
  Star,
  Download,
  Server,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';

const QUICK_CATEGORIES = ['All Scripts', 'CRM & ERP', 'Fintech & Payments', 'AI & Automation', 'Mobile Apps'];

export function FeaturedProducts() {
  const { openLiveDemo, addItem } = useCart();
  const { formatPrice } = useCurrency();
  const [activeCategory, setActiveCategory] = useState('All Scripts');

  const filtered = activeCategory === 'All Scripts'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#fff3eb] border border-[#fbd8c4] text-[#e06527] text-xs font-bold px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Proprietary In-House Scripts</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Featured Software & Code Marketplace
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              100% full source code, lifetime updates, and complete database migrations. Tested & ready to deploy.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#246e7f] hover:text-[#1a515e] underline group flex-shrink-0"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {QUICK_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                activeCategory === cat
                  ? 'bg-[#246e7f] text-white border-[#246e7f] shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.slice(0, 6).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-slate-300 transition-all flex flex-col group"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.thumbnailUrl}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />

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
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-slate-900 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs">
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
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                    <span className="font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold">
                      v{product.version}
                    </span>
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
                  <div className="flex items-center justify-between text-[11px] bg-emerald-50/80 border border-emerald-200/70 text-emerald-900 px-2.5 py-1.5 rounded-xl">
                    <span className="flex items-center gap-1 font-medium">
                      <Server className="w-3.5 h-3.5 text-emerald-600" />
                      Optional Server Setup:
                    </span>
                    <strong className="font-bold text-emerald-700">
                      +{formatPrice(product.defaultSetupPriceINR, product.defaultSetupPriceUSD)}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Source License
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-black text-slate-900">
                          {formatPrice(product.regularPriceINR, product.regularPriceUSD)}
                        </span>
                        <span className="text-[10px] text-slate-500">one-time</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-3 py-2 rounded-xl transition-colors"
                      >
                        Details
                      </Link>
                      <button
                        type="button"
                        onClick={() => addItem(product, 'REGULAR', [])}
                        className="bg-[#246e7f] hover:bg-[#1a515e] text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-xs active:scale-95"
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
      </div>
    </section>
  );
}
