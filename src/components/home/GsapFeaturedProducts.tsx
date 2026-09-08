'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import {
  Sparkles,
  Play,
  ShoppingBag,
  Star,
  Server,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Terminal,
  Zap,
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';


const CATEGORIES = ['All Products', 'CRM & ERP', 'Fintech & Payments', 'AI & Automation', 'Mobile Apps'];

export function GsapFeaturedProducts() {
  const { openLiveDemo, addItem } = useCart();
  const { formatPrice } = useCurrency();
  const [activeCategory, setActiveCategory] = useState('All Products');
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeCategory === 'All Products'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  // GSAP animation when category changes
  useEffect(() => {
    if (!cardsContainerRef.current) return;
    const cards = cardsContainerRef.current.querySelectorAll('.product-card');

    gsap.fromTo(
      cards,
      { opacity: 0, y: 30, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
      }
    );
  }, [activeCategory]);

  return (
    <section className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#fff3eb] border border-[#fbd8c4] text-[#e06527] text-xs font-bold px-3.5 py-1 rounded-full shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>In-House Software Portfolio</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Proprietary Source Code Marketplace
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
              Every codebase is engineered by Dunga Technologies with 100% full unencrypted rights, database migrations, and optional senior engineer server deployment.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#246e7f] hover:text-[#1a515e] bg-[#e6f4f7] hover:bg-[#d8eef3] px-5 py-2.5 rounded-xl transition-all group flex-shrink-0"
          >
            <span>Browse Full 2026 Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap border ${
                activeCategory === cat
                  ? 'bg-[#246e7f] text-white border-[#246e7f] shadow-lg shadow-[#246e7f]/20 scale-105'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filtered.slice(0, 6).map((product) => (
            <ProductCardItem
              key={product.id}
              product={product}
              openLiveDemo={openLiveDemo}
              addItem={addItem}
              formatPrice={formatPrice}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCardItem({
  product,
  openLiveDemo,
  addItem,
  formatPrice,
}: {
  product: Product;
  openLiveDemo: (product: Product) => void;
  addItem: (product: Product, licenseType: any, addons: any[]) => void;
  formatPrice: (inr: number, usd: number) => string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(cardRef.current, {
      rotationY: x * 0.015,
      rotationX: -y * 0.015,
      transformPerspective: 800,
      ease: 'power1.out',
      duration: 0.4,
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotationY: 0,
      rotationX: 0,
      ease: 'power2.out',
      duration: 0.6,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="product-card bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#246e7f]/40 transition-all duration-300 flex flex-col group"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.thumbnailUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
          <span className="bg-[#246e7f] text-white text-[10px] font-bold px-3 py-1 rounded-lg shadow-sm backdrop-blur-xs">
            {product.category}
          </span>
          {product.isFeatured && (
            <span className="bg-[#e06527] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
              Bestseller
            </span>
          )}
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-md">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{product.rating}</span>
          <span className="text-[10px] text-slate-400">({product.reviewCount})</span>
        </div>

        {/* Quick Simulator Launch Button */}
        <div className="absolute bottom-3.5 right-3.5">
          <button
            type="button"
            onClick={() => openLiveDemo(product)}
            className="bg-white/95 hover:bg-white text-slate-900 font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-lg transition-all flex items-center gap-1.5 hover:scale-105 active:scale-95"
          >
            <Play className="w-3 h-3 text-[#e06527] fill-[#e06527]" />
            <span>Live Demo</span>
          </button>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
            <span className="font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
              v{product.version}
            </span>
            <span className="font-medium text-slate-500">{product.salesCount} Direct Licenses Sold</span>
          </div>

          <Link href={`/products/${product.slug}`}>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 hover:text-[#246e7f] transition-colors line-clamp-1">
              {product.title}
            </h3>
          </Link>
          <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {product.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="bg-slate-100 text-slate-700 text-[10px] font-mono px-2 py-0.5 rounded-md"
              >
                {tech}
              </span>
            ))}
            {product.techStack.length > 4 && (
              <span className="bg-slate-50 text-slate-500 text-[10px] px-1.5 py-0.5 rounded-md">
                +{product.techStack.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-4 border-t border-slate-100 space-y-3.5">
          {/* Optional Server Setup Callout */}
          <div className="flex items-center justify-between text-[11px] bg-emerald-50/90 border border-emerald-200/80 text-emerald-950 px-3 py-1.5 rounded-xl">
            <span className="flex items-center gap-1.5 font-medium">
              <Server className="w-3.5 h-3.5 text-emerald-600" />
              Optional VPS Setup:
            </span>
            <strong className="font-bold text-emerald-700">
              +{formatPrice(product.defaultSetupPriceINR, product.defaultSetupPriceUSD)}
            </strong>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Regular License
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg sm:text-xl font-black text-slate-900">
                  {formatPrice(product.regularPriceINR, product.regularPriceUSD)}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">one-time</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/products/${product.slug}`}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-3.5 py-2.5 rounded-xl transition-colors"
              >
                Details
              </Link>
              <button
                type="button"
                onClick={() => addItem(product, 'REGULAR', [])}
                className="bg-[#246e7f] hover:bg-[#1a515e] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-[#246e7f]/20 active:scale-95"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Buy Code</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
