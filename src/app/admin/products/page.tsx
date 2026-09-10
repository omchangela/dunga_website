'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Code2,
  ExternalLink,
  DollarSign,
  Download,
  Star,
  CheckCircle2,
  Search,
  Sparkles,
  Zap,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function AdminProductsPage() {
  const { formatPrice } = useCurrency();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.techStack.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Source Code Suites & Products
          </h2>
          <p className="text-xs text-slate-400">
            Catalog of in-house unencrypted Next.js source code platforms, licenses, and sales analytics.
          </p>
        </div>

        <Link
          href="/products"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#E06527]" />
          <span>View Public Store</span>
        </Link>
      </div>

      {/* Search Input */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search software products by title, category, or tech stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#246E7F]"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Product Thumbnail */}
              <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                <Image
                  src={prod.thumbnailUrl}
                  alt={prod.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900/90 text-teal-300 border border-teal-500/30">
                  {prod.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-white truncate">
                    {prod.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2">
                  {prod.shortDescription}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1">
                  {prod.techStack.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-950 text-slate-300 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Pricing Breakdown */}
                <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Regular License:</span>
                    <span className="font-bold text-white">
                      {formatPrice(prod.regularPriceINR, prod.regularPriceUSD)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Extended License:</span>
                    <span className="font-bold text-amber-300">
                      {formatPrice(prod.extendedPriceINR, prod.extendedPriceUSD)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>{prod.salesCount} Verified Sales</span>
              </span>

              <Link
                href={`/products/${prod.slug}`}
                target="_blank"
                className="px-3.5 py-1.5 bg-[#246E7F] hover:bg-[#1b5563] text-white font-bold text-xs rounded-xl flex items-center gap-1 transition-colors"
              >
                <span>Live View</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
