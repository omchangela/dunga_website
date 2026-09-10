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
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Source Code Suites & Products
          </h2>
          <p className="text-xs text-slate-500">
            Catalog of in-house unencrypted Next.js source code platforms, licenses, and sales analytics.
          </p>
        </div>

        <Link
          href="/products"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 rounded-xl transition-colors shadow-xs"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#E06527]" />
          <span>View Public Store</span>
        </Link>
      </div>

      {/* Search Input */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search software products by title, category, or tech stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#246E7F]"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Product Thumbnail */}
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                <Image
                  src={prod.thumbnailUrl}
                  alt={prod.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/95 text-[#246E7F] border border-teal-200 shadow-xs">
                  {prod.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-slate-900 truncate">
                    {prod.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2">
                  {prod.shortDescription}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1">
                  {prod.techStack.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Pricing Breakdown */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Regular License:</span>
                    <span className="font-bold text-slate-900">
                      {formatPrice(prod.regularPriceINR, prod.regularPriceUSD)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Extended License:</span>
                    <span className="font-bold text-[#E06527]">
                      {formatPrice(prod.extendedPriceINR, prod.extendedPriceUSD)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                <Download className="w-3.5 h-3.5 text-emerald-600" />
                <span>{prod.salesCount} Verified Sales</span>
              </span>

              <Link
                href={`/products/${prod.slug}`}
                target="_blank"
                className="px-3.5 py-1.5 bg-[#246E7F] hover:bg-[#1a5563] text-white font-bold text-xs rounded-xl flex items-center gap-1 transition-colors shadow-xs"
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

