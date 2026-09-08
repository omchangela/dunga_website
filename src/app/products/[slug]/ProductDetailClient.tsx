'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Star,
  Play,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  Server,
  Download,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Terminal,
  Cpu,
  FileCheck,
  Zap,
  HelpCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { Product, LicenseType, SetupAddon } from '@/types';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';

interface Props {
  product: Product;
}

export function ProductDetailClient({ product }: Props) {
  const router = useRouter();
  const { addItem, openLiveDemo } = useCart();
  const { currency, formatPrice } = useCurrency();

  const [selectedLicense, setSelectedLicense] = useState<LicenseType>('REGULAR');
  const [selectedAddons, setSelectedAddons] = useState<SetupAddon[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'requirements' | 'changelog' | 'reviews'>('overview');

  // Toggle Add-on in local selector
  const handleToggleAddon = (addon: SetupAddon) => {
    setSelectedAddons((prev) => {
      const exists = prev.some((a) => a.id === addon.id);
      if (exists) {
        return prev.filter((a) => a.id !== addon.id);
      }
      return [...prev, addon];
    });
  };

  // Pricing calculations
  let basePriceINR = product.regularPriceINR;
  let basePriceUSD = product.regularPriceUSD;

  if (selectedLicense === 'EXTENDED') {
    basePriceINR = product.extendedPriceINR;
    basePriceUSD = product.extendedPriceUSD;
  } else if (selectedLicense === 'SAAS_MONTHLY' && product.monthlySaasPriceINR) {
    basePriceINR = product.monthlySaasPriceINR;
    basePriceUSD = product.monthlySaasPriceUSD || 15;
  } else if (selectedLicense === 'SAAS_YEARLY' && product.yearlySaasPriceINR) {
    basePriceINR = product.yearlySaasPriceINR;
    basePriceUSD = product.yearlySaasPriceUSD || 149;
  }

  const addonsTotalINR = selectedAddons.reduce((sum, a) => sum + a.priceINR, 0);
  const addonsTotalUSD = selectedAddons.reduce((sum, a) => sum + a.priceUSD, 0);

  const totalCalculatedINR = basePriceINR + addonsTotalINR;
  const totalCalculatedUSD = basePriceUSD + addonsTotalUSD;

  const handleAddToCart = () => {
    addItem(product, selectedLicense, selectedAddons);
  };

  const handleBuyNow = () => {
    addItem(product, selectedLicense, selectedAddons);
    router.push('/checkout');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/products" className="hover:text-slate-900 transition-colors">
            Marketplace
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-medium truncate max-w-xs">{product.title}</span>
        </nav>

        {/* Product Hero Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="bg-[#246e7f] text-white text-xs font-bold px-3 py-1 rounded-md">
                  {product.category}
                </span>
                <span className="bg-[#fff3eb] text-[#e06527] border border-[#fbd8c4] text-xs font-bold px-2.5 py-0.5 rounded-md">
                  v{product.version}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> Updated {product.lastUpdated}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {product.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {product.tagline}
              </p>

              {/* Rating & Sales Meta */}
              <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                <div className="flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200/80 px-2.5 py-1 rounded-lg font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-amber-700 font-normal">({product.reviewCount} reviews)</span>
                </div>
                <div className="text-slate-500">
                  <strong className="text-slate-900 font-bold">{product.salesCount}</strong> Licenses Issued
                </div>
                <div className="text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Dunga Official Verified In-House Code
                </div>
              </div>
            </div>

            {/* Live Demo Trigger Bar */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 flex-shrink-0">
              <button
                type="button"
                onClick={() => openLiveDemo(product)}
                className="inline-flex items-center justify-center gap-2 bg-[#246e7f] hover:bg-[#1a515e] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-all active:scale-95"
              >
                <Play className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>Live Interactive Demo</span>
              </button>

              {product.adminDemoUrl && (
                <button
                  type="button"
                  onClick={() => openLiveDemo(product)}
                  className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl border border-slate-300 transition-colors"
                >
                  <span>Admin Panel Preview</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Grid: Left Details & Right Sticky Pricing Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (8 cols): Media Gallery, Description, Features, Specs */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            {/* Gallery Viewport */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.galleryImages[activeImageIndex] || product.thumbnailUrl}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails row */}
              {product.galleryImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#246e7f] ring-2 ring-[#246e7f]/20'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt="Thumbnail preview" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-2xl border border-slate-200 p-2 flex gap-1 overflow-x-auto text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'bg-[#246e7f] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Product Overview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('features')}
                className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === 'features'
                    ? 'bg-[#246e7f] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Key Architecture & Features
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('requirements')}
                className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === 'requirements'
                    ? 'bg-[#246e7f] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                System Requirements
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('changelog')}
                className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === 'changelog'
                    ? 'bg-[#246e7f] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Changelog (v{product.version})
              </button>
            </div>

            {/* Tab Contents */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">Product Description</h3>
                    <div className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line space-y-3">
                      {product.fullDescription}
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-sm font-bold text-slate-900 mb-3">Core Technical Highlights</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Included Files */}
                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-sm font-bold text-slate-900 mb-3">Included in Download Package</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.includedFiles.map((file, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 bg-[#e6f4f7] text-[#1a515e] border border-[#246e7f]/20 text-xs font-medium px-3 py-1.5 rounded-lg"
                        >
                          <FileCheck className="w-3.5 h-3.5 text-[#246e7f]" />
                          {file}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'features' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-900">Module & Feature Breakdown</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.features.map((feat, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-1.5">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#246e7f]" />
                          {feat.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{feat.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'requirements' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-900">Server & Environment Requirements</h3>
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3">Environment Requirement</th>
                          <th className="px-4 py-3">Recommended Specification</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {product.systemRequirements.map((req, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            <td className="px-4 py-3 font-semibold text-slate-800">{req.requirement}</td>
                            <td className="px-4 py-3 text-slate-600 font-mono">{req.specification}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-[#e6f4f7] border border-[#246e7f]/20 p-4 rounded-xl flex items-start gap-3 text-xs text-[#1a515e]">
                    <Server className="w-5 h-5 text-[#246e7f] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold block text-slate-900">Don&apos;t want to handle server setup yourself?</strong>
                      <span>Check the &quot;Standard Server Setup & Configuration&quot; add-on in the right pricing sidebar, and our senior engineering team will deploy it on your VPS within 24-48 hours.</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'changelog' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-900">Version History & Release Notes</h3>
                  <div className="space-y-4">
                    {product.changelog.map((entry, idx) => (
                      <div key={idx} className="border-l-2 border-[#246e7f] pl-4 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                            v{entry.version}
                          </span>
                          <span className="text-xs text-slate-400">{entry.date}</span>
                        </div>
                        <ul className="space-y-1 text-xs text-slate-600">
                          {entry.changes.map((c, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-[#246e7f] font-bold">•</span>
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (5 cols): Sticky Dynamic License & Add-on Calculator */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 shadow-lg p-5 sm:p-6 space-y-5">
              {/* License Tier Selector */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  1. Select License Model
                </span>

                <div className="space-y-2">
                  {/* Regular License */}
                  <label
                    className={`block p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedLicense === 'REGULAR'
                        ? 'border-[#246e7f] bg-[#e6f4f7]/40 ring-1 ring-[#246e7f]'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        <input
                          type="radio"
                          name="license"
                          value="REGULAR"
                          checked={selectedLicense === 'REGULAR'}
                          onChange={() => setSelectedLicense('REGULAR')}
                          className="mt-1 text-[#246e7f] focus:ring-[#246e7f]"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900">Regular Source License</div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Single commercial project or company usage. 100% full source code.
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-black text-slate-900">
                        {formatPrice(product.regularPriceINR, product.regularPriceUSD)}
                      </span>
                    </div>
                  </label>

                  {/* Extended License */}
                  <label
                    className={`block p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedLicense === 'EXTENDED'
                        ? 'border-[#246e7f] bg-[#e6f4f7]/40 ring-1 ring-[#246e7f]'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        <input
                          type="radio"
                          name="license"
                          value="EXTENDED"
                          checked={selectedLicense === 'EXTENDED'}
                          onChange={() => setSelectedLicense('EXTENDED')}
                          className="mt-1 text-[#246e7f] focus:ring-[#246e7f]"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            Extended License
                            <span className="bg-[#fff3eb] text-[#e06527] text-[9px] font-bold px-1.5 rounded">
                              SaaS / Resell
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            End-users pay to access. Unlimited domain deployments.
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-black text-slate-900">
                        {formatPrice(product.extendedPriceINR, product.extendedPriceUSD)}
                      </span>
                    </div>
                  </label>

                  {/* SaaS Monthly Option */}
                  {product.monthlySaasPriceINR && (
                    <label
                      className={`block p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedLicense === 'SAAS_MONTHLY'
                          ? 'border-[#246e7f] bg-[#e6f4f7]/40 ring-1 ring-[#246e7f]'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            name="license"
                            value="SAAS_MONTHLY"
                            checked={selectedLicense === 'SAAS_MONTHLY'}
                            onChange={() => setSelectedLicense('SAAS_MONTHLY')}
                            className="mt-1 text-[#246e7f] focus:ring-[#246e7f]"
                          />
                          <div>
                            <div className="text-xs font-bold text-slate-900">Cloud Hosted SaaS (Monthly)</div>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              Hosted on Dunga Cloud. Zero server maintenance.
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-black text-slate-900">
                          {formatPrice(product.monthlySaasPriceINR, product.monthlySaasPriceUSD || 15)}/mo
                        </span>
                      </div>
                    </label>
                  )}
                </div>
              </div>

              {/* Add-ons Checkbox List */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    2. Optional Setup Add-ons
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold">24-48h Delivery</span>
                </div>

                <div className="space-y-2">
                  {product.availableAddons.map((addon) => {
                    const isChecked = selectedAddons.some((a) => a.id === addon.id);
                    return (
                      <label
                        key={addon.id}
                        className={`flex items-start justify-between gap-3 p-2.5 rounded-xl border cursor-pointer transition-all text-xs ${
                          isChecked
                            ? 'bg-[#e6f4f7]/80 border-[#246e7f]/50 text-[#1a515e]'
                            : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <div className="flex items-start gap-2 min-w-0">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleAddon(addon)}
                            className="mt-0.5 rounded border-slate-300 text-[#246e7f] focus:ring-[#246e7f]"
                          />
                          <div>
                            <div className="font-bold text-slate-900 flex items-center gap-1">
                              {addon.name}
                              {addon.recommended && (
                                <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1 rounded">
                                  Popular
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-500 block leading-tight mt-0.5">
                              {addon.description}
                            </span>
                            <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                              Turnaround: {addon.estimatedTurnaround}
                            </span>
                          </div>
                        </div>
                        <span className="font-black text-slate-900 flex-shrink-0">
                          +{formatPrice(addon.priceINR, addon.priceUSD)}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Price Summary Box */}
              <div className="pt-4 border-t border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Selected License</span>
                  <span className="font-semibold text-slate-900">{formatPrice(basePriceINR, basePriceUSD)}</span>
                </div>
                {addonsTotalINR > 0 && (
                  <div className="flex justify-between text-[#246e7f] font-medium">
                    <span>Setup & Deployment Add-ons ({selectedAddons.length})</span>
                    <span>+{formatPrice(addonsTotalINR, addonsTotalUSD)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-900 font-black text-lg pt-2 border-t border-slate-200">
                  <span>Total Investment</span>
                  <span className="text-[#246e7f]">
                    {formatPrice(totalCalculatedINR, totalCalculatedUSD)}
                  </span>
                </div>
              </div>

              {/* Primary Purchase Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full bg-[#246e7f] hover:bg-[#1a515e] text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <Download className="w-4 h-4" />
                  <span>Buy Now & Instant Download</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm py-3 rounded-xl border border-slate-300 shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-slate-600" />
                  <span>Add to Cart</span>
                </button>
              </div>

              {/* Guarantee badges */}
              <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>100% Unencrypted Source Code Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#e06527] flex-shrink-0" />
                  <span>Free Future Minor Version Updates & Bug Fixes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#246e7f] flex-shrink-0" />
                  <span>GST-Compliant Tax Invoice Included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
