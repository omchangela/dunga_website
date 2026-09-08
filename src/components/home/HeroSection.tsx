'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Code2,
  Download,
  Terminal,
  Play,
  CheckCircle2,
  Server,
  Layers,
  Bot,
  CreditCard,
  PhoneCall,
  ChevronRight,
  Star,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/products';
import { useCurrency } from '@/context/CurrencyContext';

export function HeroSection() {
  const { openLiveDemo, addItem } = useCart();
  const { formatPrice } = useCurrency();
  const [selectedHeroIndex, setSelectedHeroIndex] = useState(0);

  const heroProducts = [
    {
      ...PRODUCTS[0], // OmniFlow CRM
      badge: 'Bestseller CRM',
      badgeColor: 'bg-[#e6f4f7] text-[#246e7f] border-[#246e7f]/20',
      icon: PhoneCall,
      headline: 'Next.js 15 Telecalling & Automated WhatsApp CRM',
    },
    {
      ...PRODUCTS[1], // DungaPay
      badge: 'Fintech Engine',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      icon: CreditCard,
      headline: 'Multi-Gateway Billing & Razorpay/Stripe Orchestrator',
    },
    {
      ...PRODUCTS[2], // AetherBot AI
      badge: 'AI SaaS Platform',
      badgeColor: 'bg-[#fff3eb] text-[#e06527] border-[#fbd8c4]',
      icon: Bot,
      headline: 'Multi-Tenant RAG Knowledge Base & Autonomous Agent',
    },
  ];

  const activeProduct = heroProducts[selectedHeroIndex];

  return (
    <section className="relative overflow-hidden bg-white pt-6 pb-16 lg:pt-12 lg:pb-24 bg-dot-pattern">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-gradient-to-tr from-[#246e7f]/10 via-[#e6f4f7]/50 to-[#e06527]/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Release Badge */}
          <div className="inline-flex items-center gap-2 bg-[#e6f4f7] border border-[#246e7f]/30 px-4 py-1.5 rounded-full text-xs font-bold text-[#1a515e] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#e06527] animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-[#246e7f]" />
            <span>Official Dunga Technologies Code Marketplace & SaaS Hub</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
            Enterprise Software & Source Code With{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#246e7f] via-[#1a515e] to-[#e06527]">
              Zero Vendor Lock-in.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Acquire production-ready source code, CRM systems, and SaaS engines built exclusively in-house by Dunga Technologies. Enjoy <strong>100% code ownership</strong>, lifetime updates, and optional <strong>24-48h server setup</strong>.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#246e7f] hover:bg-[#1a515e] text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-[#246e7f]/20 transition-all hover:-translate-y-0.5 active:scale-95"
            >
              <Code2 className="w-4 h-4" />
              <span>Explore Marketplace Scripts</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={() => openLiveDemo(activeProduct)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm px-6 py-3.5 rounded-xl border border-slate-300 shadow-xs transition-all hover:border-slate-400"
            >
              <Play className="w-4 h-4 text-[#e06527] fill-[#e06527]" />
              <span>Launch Live Simulator</span>
            </button>
          </div>

          {/* Trust Pillars */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% Unencrypted Source Code</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#246e7f]" />
              <span>Optional 24-48h Server Setup</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#e06527]" />
              <span>Lifetime Updates & Free Fixes</span>
            </div>
          </div>
        </div>

        {/* Interactive Hero Showcase Frame */}
        <div className="mt-10 max-w-5xl mx-auto">
          {/* Interactive Script Switcher Tabs */}
          <div className="flex items-center justify-center gap-2 mb-3 overflow-x-auto pb-1">
            {heroProducts.map((p, idx) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedHeroIndex(idx)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
                    selectedHeroIndex === idx
                      ? 'bg-[#246e7f] text-white border-[#246e7f] shadow-md scale-105'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{p.title.split(' ')[0]} {p.title.split(' ')[1]}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${selectedHeroIndex === idx ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    {formatPrice(p.regularPriceINR, p.regularPriceUSD)}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="bg-white rounded-3xl p-3 sm:p-4 shadow-2xl border border-slate-200/90 relative">
            {/* Top Browser Bar */}
            <div className="bg-slate-950 rounded-2xl px-4 py-3 text-white flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-400 ml-2 font-mono hidden sm:inline">
                  https://demo.dungatechnologies.com/{activeProduct.slug}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded">
                  LIVE WORKSPACE
                </span>
                <button
                  type="button"
                  onClick={() => openLiveDemo(activeProduct)}
                  className="bg-[#e06527] hover:bg-[#c9561c] text-white text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>Test Simulator</span>
                </button>
              </div>
            </div>

            {/* Showcase Visual Area */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden mt-3 bg-slate-950 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeProduct.bannerUrl}
                alt={activeProduct.title}
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              {/* Floating Top Left Pill */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-white/95 backdrop-blur-md border border-slate-200 text-slate-900 p-3 rounded-2xl shadow-lg hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#e6f4f7] text-[#246e7f] flex items-center justify-center font-bold">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{activeProduct.title}</div>
                  <div className="text-[11px] text-[#246e7f] font-semibold">100% Source Code + Docker + Migrations</div>
                </div>
              </div>

              {/* Floating Bottom Right Pill */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white/95 backdrop-blur-md border border-slate-200 text-slate-900 p-3 rounded-2xl shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#fff3eb] text-[#e06527] flex items-center justify-center font-bold">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Optional 24-48h Server Setup</div>
                  <div className="text-[11px] text-emerald-600 font-bold">
                    Senior Engineer VPS & SSL Deployment (+{formatPrice(activeProduct.defaultSetupPriceINR, activeProduct.defaultSetupPriceUSD)})
                  </div>
                </div>
              </div>

              {/* Bottom Left Info */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white max-w-md">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-[#246e7f] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {activeProduct.category}
                  </span>
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-slate-950" /> {activeProduct.rating}
                  </span>
                </div>
                <h3 className="text-base sm:text-xl font-bold text-white">
                  {activeProduct.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">{activeProduct.tagline}</p>
              </div>
            </div>

            {/* Quick-action bar below banner */}
            <div className="mt-3 bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Instant ZIP Download Link • Unique Domain Activation License Key</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href={`/products/${activeProduct.slug}`}
                  className="flex-1 sm:flex-initial text-center bg-white hover:bg-slate-100 text-slate-800 font-bold px-4 py-2 rounded-lg border border-slate-200 transition-colors"
                >
                  View Details & Features
                </Link>
                <button
                  type="button"
                  onClick={() => addItem(activeProduct, 'REGULAR', [])}
                  className="flex-1 sm:flex-initial text-center bg-[#246e7f] hover:bg-[#1a515e] text-white font-bold px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-1"
                >
                  <span>Buy Code ({formatPrice(activeProduct.regularPriceINR, activeProduct.regularPriceUSD)})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
