'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  X,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  RotateCw,
  Lock,
  ChevronRight,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';

export function LiveDemoModal() {
  const { liveDemoProduct, closeLiveDemo, addItem } = useCart();
  const { formatPrice } = useCurrency();
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeView, setActiveView] = useState<'frontend' | 'admin'>('frontend');
  const [isLoading, setIsLoading] = useState(false);

  if (!liveDemoProduct) return null;

  const demoUrl =
    activeView === 'admin' && liveDemoProduct.adminDemoUrl
      ? liveDemoProduct.adminDemoUrl
      : liveDemoProduct.previewUrl;

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleBuyNow = () => {
    addItem(liveDemoProduct, 'REGULAR', []);
    closeLiveDemo();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-6xl h-[92vh] flex flex-col shadow-2xl overflow-hidden text-white">
        {/* Top Control Bar */}
        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between gap-4 flex-shrink-0">
          {/* Product Info */}
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-bold truncate text-white">
                  {liveDemoProduct.title}
                </h3>
                <span className="hidden sm:inline-block bg-[#246e7f]/40 text-[#79d5e9] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[#246e7f]/60">
                  v{liveDemoProduct.version}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate hidden md:block">
                {liveDemoProduct.tagline}
              </p>
            </div>
          </div>

          {/* View Mode Switcher (Frontend / Admin) */}
          <div className="flex items-center bg-slate-800/90 p-0.5 rounded-lg border border-slate-700 text-xs">
            <button
              type="button"
              onClick={() => setActiveView('frontend')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                activeView === 'frontend'
                  ? 'bg-[#246e7f] text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              User Portal
            </button>
            {liveDemoProduct.adminDemoUrl && (
              <button
                type="button"
                onClick={() => setActiveView('admin')}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  activeView === 'admin'
                    ? 'bg-[#e06527] text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Admin Panel
              </button>
            )}
          </div>

          {/* Device Switcher */}
          <div className="hidden md:flex items-center bg-slate-800/90 p-0.5 rounded-lg border border-slate-700">
            <button
              type="button"
              onClick={() => setDeviceMode('desktop')}
              className={`p-1.5 rounded-md transition-colors ${
                deviceMode === 'desktop' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop (1920px)"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setDeviceMode('tablet')}
              className={`p-1.5 rounded-md transition-colors ${
                deviceMode === 'tablet' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Tablet (768px)"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setDeviceMode('mobile')}
              className={`p-1.5 rounded-md transition-colors ${
                deviceMode === 'mobile' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile (390px)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleBuyNow}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shadow-md active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>
                Buy Code ({formatPrice(liveDemoProduct.regularPriceINR, liveDemoProduct.regularPriceUSD)})
              </span>
            </button>

            <button
              type="button"
              onClick={closeLiveDemo}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Address Bar Simulation */}
        <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center gap-3 text-xs text-slate-400">
          <button
            type="button"
            onClick={handleRefresh}
            className="text-slate-400 hover:text-white transition-colors"
            title="Reload Demo"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#246e7f]' : ''}`} />
          </button>
          <div className="flex-1 bg-slate-950 border border-slate-800 rounded-md px-3 py-1 flex items-center gap-2 text-[11px] text-slate-300 overflow-hidden font-mono">
            <Lock className="w-3 h-3 text-emerald-400 flex-shrink-0" />
            <span className="truncate">{demoUrl}</span>
          </div>
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1"
          >
            <span className="hidden sm:inline">Open in New Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Interactive Device Viewport & Interactive Interactive Interactive Frame */}
        <div className="flex-1 bg-slate-950 p-3 sm:p-6 overflow-auto flex items-center justify-center relative">
          <div
            className={`transition-all duration-300 bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-700/80 flex flex-col h-full w-full ${
              deviceMode === 'tablet'
                ? 'max-w-[768px] h-[95%]'
                : deviceMode === 'mobile'
                ? 'max-w-[390px] h-[95%] rounded-3xl'
                : 'max-w-full h-full'
            }`}
          >
            {/* Interactive Demo Content Preview Screen */}
            <div className="flex-1 bg-slate-900 text-white flex flex-col">
              {/* Header simulation */}
              <div className="bg-slate-950/90 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xs text-[#79d5e9]">
                  <Sparkles className="w-4 h-4 text-[#e06527]" />
                  {liveDemoProduct.title} — {activeView === 'admin' ? 'Admin Suite' : 'Live Client Workspace'}
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                  DEMO ACTIVE
                </span>
              </div>

              {/* Main Demo Workspace simulation with interactive preview tabs */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-900 text-slate-100">
                <div className="relative rounded-2xl overflow-hidden border border-slate-700 aspect-video group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      activeView === 'admin'
                        ? liveDemoProduct.galleryImages[1] || liveDemoProduct.bannerUrl
                        : liveDemoProduct.thumbnailUrl
                    }
                    alt={liveDemoProduct.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex flex-col justify-end p-6">
                    <span className="bg-[#e06527] text-white text-xs font-bold px-2.5 py-1 rounded-md inline-block w-fit mb-2">
                      {liveDemoProduct.category}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-white">{liveDemoProduct.title}</h2>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">{liveDemoProduct.tagline}</p>
                  </div>
                </div>

                {/* Live Feature Highlights in Demo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {liveDemoProduct.features.map((feat, idx) => (
                    <div key={idx} className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4">
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#246e7f]" />
                        {feat.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">{feat.description}</p>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/60">
                  <span className="text-xs font-semibold text-slate-400 block mb-2">
                    Included Source Architecture:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {liveDemoProduct.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-slate-900 border border-slate-700 text-[#79d5e9] text-xs font-mono px-2.5 py-1 rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Quick-Action Bar */}
              <div className="bg-slate-950 border-t border-slate-800 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Full Next.js Source Code + Lifetime Updates + Optional Installation</span>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/products/${liveDemoProduct.slug}`}
                    onClick={closeLiveDemo}
                    className="text-xs font-semibold text-slate-300 hover:text-white underline flex items-center gap-1"
                  >
                    View Product Details <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="bg-[#e06527] hover:bg-[#c9561c] text-white font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    Get License ({formatPrice(liveDemoProduct.regularPriceINR, liveDemoProduct.regularPriceUSD)})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
