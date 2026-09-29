'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { productStore, performSeoAudit } from '@/lib/productStore';
import { ProductFormModal } from '@/components/admin/ProductFormModal';
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
  ArrowRight,
  Plus,
  Edit,
  Trash2,
  Globe,
  ShieldCheck,
  Tag,
  AlertCircle,
  RotateCcw,
  DownloadCloud,
} from 'lucide-react';

export default function AdminProductsPage() {
  const { formatPrice } = useCurrency();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const loadProducts = async () => {
    const list = productStore.getProducts();
    setProducts(list);
    try {
      const apiList = await productStore.fetchFromApi();
      if (apiList && apiList.length > 0) {
        setProducts(apiList);
      }
    } catch {}
  };

  useEffect(() => {
    loadProducts();

    const handleUpdate = () => {
      setProducts(productStore.getProducts());
    };

    window.addEventListener('dunga_products_updated', handleUpdate);
    return () => window.removeEventListener('dunga_products_updated', handleUpdate);
  }, []);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const [isSeeding, setIsSeeding] = useState(false);
  const [seedSuccessMsg, setSeedSuccessMsg] = useState('');

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"? This will remove it from the public store and sitemap.`)) {
      productStore.deleteProduct(id);
      loadProducts();
    }
  };

  const handleSeedDemoProducts = async () => {
    setIsSeeding(true);
    try {
      const seeded = productStore.seedAllDemoProducts();
      setProducts(seeded);
      setSeedSuccessMsg('All 6 software code packages & SEO profiles loaded successfully!');
      setTimeout(() => setSeedSuccessMsg(''), 5000);
    } catch (err: any) {
      alert('Error loading demo products: ' + err.message);
    } finally {
      setIsSeeding(false);
    }
  };

  const categories = ['All', 'CRM & ERP', 'AI & Automation', 'Fintech & Payments', 'E-Commerce', 'Mobile Apps', 'DevOps & Cloud'];

  const filteredProducts = products.filter((p) => {
    if (!p) return false;
    const title = (p.title || '').toLowerCase();
    const cat = (p.category || '').toLowerCase();
    const tech = Array.isArray(p.techStack) ? p.techStack : [];
    const q = searchQuery.toLowerCase().trim();

    const matchesSearch =
      !q ||
      title.includes(q) ||
      cat.includes(q) ||
      tech.some((t) => t.toLowerCase().includes(q)) ||
      Boolean(p.seo?.primaryKeyword && p.seo.primaryKeyword.toLowerCase().includes(q));

    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Calculate SEO Health Aggregate
  const totalProducts = products.length;
  const highSeoCount = products.filter((p) => performSeoAudit(p).totalScore >= 85).length;
  const avgSeoScore = totalProducts > 0 
    ? Math.round(products.reduce((acc, p) => acc + performSeoAudit(p).totalScore, 0) / totalProducts)
    : 0;

  return (
    <div className="space-y-6">
      
      {/* Header Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#e6f4f7] border border-[#246e7f]/20 text-[#246e7f] text-[11px] font-bold px-3 py-0.5 rounded-full mb-1.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#e06527]" />
            <span>100% DYNAMIC CATALOG & SEO AUTOMATION</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Source Code Products & SEO Manager
          </h2>
          <p className="text-xs text-slate-500">
            Publish dynamic source code platforms, customize dual-currency pricing, configure package ZIP downloads, and audit SEO in real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleSeedDemoProducts}
            disabled={isSeeding}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold text-[#246e7f] hover:text-[#1a515e] bg-[#e6f4f7] hover:bg-[#d8eef3] border border-[#246e7f]/30 rounded-xl transition-all shadow-xs active:scale-95 disabled:opacity-50"
            title="Import all 6 pre-built software suites with complete codebases, demos, and SEO metadata"
          >
            <DownloadCloud className="w-4 h-4 text-[#e06527]" />
            <span>{isSeeding ? 'Importing Codes...' : 'Load All Demo Products (6)'}</span>
          </button>

          <Link
            href="/products"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 rounded-xl transition-colors shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#E06527]" />
            <span>Live Store</span>
          </Link>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#246E7F] hover:bg-[#1a515e] rounded-xl transition-all shadow-md shadow-[#246e7f]/20 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {seedSuccessMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-3 rounded-2xl flex items-center gap-2.5 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-bold">{seedSuccessMsg}</span>
        </div>
      )}

      {/* Real-time SEO Analytics Top Stat Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-[#246e7f] shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 block uppercase">Total Products</span>
            <span className="text-xl font-black text-slate-900">{totalProducts} Active</span>
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 block uppercase">A+ SEO Ready</span>
            <span className="text-xl font-black text-emerald-700">{highSeoCount} / {totalProducts} Products</span>
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center text-[#246e7f] shrink-0 border border-teal-100">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 block uppercase">Avg SEO Health</span>
            <span className="text-xl font-black text-[#246e7f]">{avgSeoScore}% Score</span>
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0 border border-amber-100">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 block uppercase">License Sales</span>
            <span className="text-xl font-black text-slate-900">
              {products.reduce((acc, p) => acc + (p.salesCount || 0), 0)} Distributed
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search products by title, target SEO keyword, tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#246E7F]"
            />
          </div>

          <div className="md:col-span-4 flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:bg-white cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => {
          const seoAudit = performSeoAudit(prod);

          return (
            <div
              key={prod.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Product Thumbnail */}
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                  <Image
                    src={prod.thumbnailUrl}
                    alt={prod.seo?.imageAlt || prod.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/95 text-[#246E7F] border border-teal-200 shadow-xs">
                    {prod.category}
                  </span>

                  {/* SEO Score Badge */}
                  <span className={`absolute top-3 left-3 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1 ${
                    seoAudit.totalScore >= 85
                      ? 'bg-emerald-500 text-white'
                      : seoAudit.totalScore >= 70
                      ? 'bg-amber-500 text-white'
                      : 'bg-rose-500 text-white'
                  }`}>
                    <Globe className="w-3 h-3" />
                    <span>SEO {seoAudit.totalScore}% ({seoAudit.grade})</span>
                  </span>
                </div>

                {/* Body */}
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-slate-900 line-clamp-1">
                      {prod.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    {prod.shortDescription}
                  </p>

                  {/* Primary Target Keyword Tag */}
                  {prod.seo?.primaryKeyword && (
                    <div className="flex items-center gap-1 text-[11px] text-teal-800 bg-teal-50 border border-teal-200/80 px-2 py-0.5 rounded-lg">
                      <Tag className="w-3 h-3 text-[#246e7f]" />
                      <span className="font-semibold truncate">Target: {prod.seo.primaryKeyword}</span>
                    </div>
                  )}

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1">
                    {(prod.techStack || []).slice(0, 4).map((tech, idx) => (
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

              {/* Footer with Edit, Live View & Delete */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(prod)}
                    className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 font-bold border border-slate-200 rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <Edit className="w-3.5 h-3.5 text-[#246e7f]" />
                    <span>Edit & SEO</span>
                  </button>

                  <button
                    onClick={() => handleDelete(prod.id, prod.title)}
                    className="p-1.5 hover:bg-rose-100 text-slate-400 hover:text-rose-600 rounded-xl transition-colors"
                    title="Delete Product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <Link
                  href={`/products/${prod.slug}`}
                  target="_blank"
                  className="px-3.5 py-1.5 bg-[#246E7F] hover:bg-[#1a5563] text-white font-bold text-xs rounded-xl flex items-center gap-1 transition-colors shadow-xs"
                >
                  <span>Live Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Product Form / SEO Modal */}
      <ProductFormModal
        product={editingProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={loadProducts}
      />

    </div>
  );
}
