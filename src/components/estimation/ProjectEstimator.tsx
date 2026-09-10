'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Calculator,
  CheckCircle2,
  Clock,
  Send,
  Code2,
  Smartphone,
  Server,
  Layers,
  Zap,
  ShieldCheck,
  ArrowRight,
  DollarSign,
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { inquiryStore } from '@/lib/inquiryStore';

interface FeatureOption {
  id: string;
  name: string;
  priceINR: number;
  priceUSD: number;
  days: number;
}

export function ProjectEstimator() {
  const { formatPrice } = useCurrency();
  const [projectType, setProjectType] = useState<'webapp' | 'mobile' | 'crm' | 'codecanyon' | 'bugfix'>('webapp');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['auth', 'database']);
  const [timelineSpeed, setTimelineSpeed] = useState<'standard' | 'express'>('standard');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const basePrices: Record<string, { inr: number; usd: number; days: number; label: string; icon: any }> = {
    webapp: { inr: 65000, usd: 899, days: 18, label: 'Custom Next.js Web App / SaaS', icon: Code2 },
    mobile: { inr: 85000, usd: 1150, days: 25, label: 'Flutter / React Native Mobile App', icon: Smartphone },
    crm: { inr: 75000, usd: 999, days: 20, label: 'Custom CRM & Telecalling Suite', icon: Layers },
    codecanyon: { inr: 999, usd: 15, days: 2, label: 'CodeCanyon Script / VPS Setup', icon: Server },
    bugfix: { inr: 1499, usd: 25, days: 1, label: 'Emergency Bug Fixing & Tuning', icon: Zap },
  };

  const featureOptions: FeatureOption[] = [
    { id: 'auth', name: 'User Authentication & RBAC Roles', priceINR: 8000, priceUSD: 110, days: 3 },
    { id: 'database', name: 'PostgreSQL Database & Migrations', priceINR: 10000, priceUSD: 140, days: 4 },
    { id: 'payment', name: 'Payment Gateways (Razorpay / Stripe)', priceINR: 12000, priceUSD: 160, days: 3 },
    { id: 'whatsapp', name: 'WhatsApp Automation & Webhooks', priceINR: 15000, priceUSD: 199, days: 4 },
    { id: 'ai', name: 'AI LLM Chatbot / RAG Knowledge', priceINR: 25000, priceUSD: 320, days: 7 },
    { id: 'admin', name: 'Executive BI Analytics Dashboard', priceINR: 18000, priceUSD: 240, days: 5 },
    { id: 'docker', name: 'Docker & Auto-Deploy CI/CD', priceINR: 10000, priceUSD: 130, days: 3 },
  ];

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const [estName, setEstName] = useState('');
  const [estContact, setEstContact] = useState('');

  // Calculations
  const currentBase = basePrices[projectType];
  const featuresCostINR = selectedFeatures.reduce((acc, fId) => {
    const feat = featureOptions.find((f) => f.id === fId);
    return acc + (feat ? feat.priceINR : 0);
  }, 0);
  const featuresCostUSD = selectedFeatures.reduce((acc, fId) => {
    const feat = featureOptions.find((f) => f.id === fId);
    return acc + (feat ? feat.priceUSD : 0);
  }, 0);
  const featuresDays = selectedFeatures.reduce((acc, fId) => {
    const feat = featureOptions.find((f) => f.id === fId);
    return acc + (feat ? feat.days : 0);
  }, 0);

  const speedMultiplier = timelineSpeed === 'express' ? 1.25 : 1.0;
  const daysMultiplier = timelineSpeed === 'express' ? 0.65 : 1.0;

  const totalCostINR = Math.round((currentBase.inr + (projectType === 'codecanyon' || projectType === 'bugfix' ? 0 : featuresCostINR)) * speedMultiplier);
  const totalCostUSD = Math.round((currentBase.usd + (projectType === 'codecanyon' || projectType === 'bugfix' ? 0 : featuresCostUSD)) * speedMultiplier);
  const totalDays = Math.max(1, Math.round((currentBase.days + (projectType === 'codecanyon' || projectType === 'bugfix' ? 0 : featuresDays)) * daysMultiplier));

  const handleSubmitEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    inquiryStore.addInquiry({
      name: estName || 'Project Lead',
      email: estContact.includes('@') ? estContact : `${estName.toLowerCase().replace(/\s+/g, '')}@estimate.lead`,
      phone: !estContact.includes('@') ? estContact : '+91 98765 00000',
      type: 'Project Estimation',
      serviceOrProduct: `${currentBase.label} (${timelineSpeed.toUpperCase()})`,
      budget: `${formatPrice(totalCostINR, totalCostUSD)} (~${totalDays} Days)`,
      message: `Interactive Estimate Request: Scope: ${currentBase.label}. Speed: ${timelineSpeed}. Selected Addons: ${selectedFeatures.length > 0 ? selectedFeatures.join(', ') : 'None'}. Projected Cost: ${formatPrice(totalCostINR, totalCostUSD)} in ${totalDays} working days.`,
      priority: 'High',
      sourcePage: '/project-estimation',
      status: 'New'
    });
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3500);
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200/80" id="project-estimator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#fff3eb] border border-[#fbd8c4] text-[#e06527] text-xs font-bold px-3.5 py-1 rounded-full shadow-xs">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Cost Calculator</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Instant Project Cost & Timeline Estimator
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Select your project type and desired integrations to receive a transparent real-time cost and milestone projection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Configuration Controls */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Project Type Selection */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#246e7f]">
                Step 1: Choose Project Scope
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(basePrices).map(([key, data]) => {
                  const Icon = data.icon;
                  const isSelected = projectType === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setProjectType(key as any)}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'bg-[#246e7f] text-white border-[#246e7f] shadow-md shadow-[#246e7f]/20 scale-[1.02]'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`p-2 rounded-xl flex-shrink-0 ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#246e7f]'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-snug">{data.label}</div>
                        <div className={`text-[11px] mt-1 font-mono ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                          From {formatPrice(data.inr, data.usd)}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Feature Addons (for custom software) */}
            {projectType !== 'codecanyon' && projectType !== 'bugfix' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#246e7f]">
                  Step 2: Select Modules & Integrations
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {featureOptions.map((feat) => {
                    const isChecked = selectedFeatures.includes(feat.id);
                    return (
                      <button
                        key={feat.id}
                        type="button"
                        onClick={() => toggleFeature(feat.id)}
                        className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-2 text-xs font-semibold ${
                          isChecked
                            ? 'bg-[#e6f4f7] border-[#246e7f] text-[#246e7f]'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${isChecked ? 'text-[#246e7f]' : 'text-slate-300'}`} />
                          <span>{feat.name}</span>
                        </div>
                        <span className="font-mono text-[11px] text-slate-500">
                          +{formatPrice(feat.priceINR, feat.priceUSD)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Speed Preference */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#246e7f]">
                Step 3: Delivery Velocity
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTimelineSpeed('standard')}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all text-center ${
                    timelineSpeed === 'standard'
                      ? 'bg-[#246e7f] text-white border-[#246e7f]'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  Standard Sprint (Optimal Budget)
                </button>
                <button
                  type="button"
                  onClick={() => setTimelineSpeed('express')}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all text-center ${
                    timelineSpeed === 'express'
                      ? 'bg-[#e06527] text-white border-[#e06527]'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  ⚡ Express Delivery (Dedicated Squad)
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Live Calculation Summary & Instant Request Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-900 shadow-2xl space-y-6 sticky top-24">
            <div>
              <span className="text-[10px] font-mono text-[#e06527] uppercase tracking-wider font-bold block mb-1">
                Estimated Project Investment
              </span>
              <div className="text-3xl sm:text-4xl font-black text-slate-900">
                {formatPrice(totalCostINR, totalCostUSD)}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#246e7f]" />
                <span>Estimated Timeline: <strong>{totalDays} Working Days</strong></span>
              </div>
            </div>

            {/* Scope Summary */}
            <div className="bg-slate-50 rounded-2xl p-4 space-y-2 text-xs border border-slate-200/80">
              <div className="font-bold text-slate-900 border-b border-slate-200 pb-2">
                Included in This Estimate:
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Base Scope:</span>
                <strong className="text-slate-900">{basePrices[projectType].label}</strong>
              </div>
              {projectType !== 'codecanyon' && projectType !== 'bugfix' && (
                <div className="flex justify-between text-slate-600">
                  <span>Selected Addons:</span>
                  <strong className="text-[#246e7f]">{selectedFeatures.length} Modules</strong>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Code Ownership:</span>
                <strong className="text-emerald-600">100% Full IP Transfer</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Support Guarantee:</span>
                <strong className="text-slate-900">30 Days Free Warranty</strong>
              </div>
            </div>

            {/* Instant Estimate Submission Form */}
            {formSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs space-y-1 text-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                <div className="font-bold text-sm">Estimate Sent to Your Email!</div>
                <p>Our Technical Architect will review your scope and follow up with a detailed proposal.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitEstimate} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amit Patel"
                    value={estName}
                    onChange={(e) => setEstName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Work Email / WhatsApp</label>
                  <input
                    type="text"
                    required
                    placeholder="amit@company.com or +91 98765..."
                    value={estContact}
                    onChange={(e) => setEstContact(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#246e7f] hover:bg-[#1a515e] text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md shadow-[#246e7f]/20 flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Lock In This Free Estimate</span>
                </button>
              </form>
            )}

            <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Confidential & Non-Binding</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
