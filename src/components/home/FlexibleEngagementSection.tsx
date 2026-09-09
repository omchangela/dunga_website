'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ThreeDIcon, ThreeDIconType } from '@/components/ui/ThreeDIcon';

const ENGAGEMENT_MODELS: {
  id: string;
  title: string;
  badge: string;
  description: string;
  icon: ThreeDIconType;
  popular?: boolean;
  rateInfo: string;
}[] = [
  {
    id: 'hourly',
    title: 'Hourly Sprint Flex',
    badge: 'Fast Bug-Fixes & Tasks',
    description: 'Pay strictly for logged engineering hours. Ideal for urgent features, API integrations, and code audits.',
    icon: 'zap',
    rateInfo: 'Starting from ₹999 / $15/hr',
  },
  {
    id: 'dedicated',
    title: 'Dedicated Full-Time Squad',
    badge: 'Most Popular for Scale',
    description: '160 hours/month senior developer dedicated 100% to your codebase. Joins your daily standups and Slack.',
    icon: 'users',
    popular: true,
    rateInfo: 'Starting from ₹1,30,000 / $1,700/mo',
  },
  {
    id: 'fixed-scope',
    title: 'Fixed-Price Milestone',
    badge: 'Turnkey MVPs',
    description: 'Guaranteed delivery timeline and fixed budget with zero cost overruns. Includes QA and 30-day warranty.',
    icon: 'rocket',
    rateInfo: 'Custom Milestone Scope',
  },
];

export function FlexibleEngagementSection() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50/70 border-b border-slate-100 relative overflow-hidden" id="engagement-models">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Annotation (4 Cols) */}
          <div className="lg:col-span-4 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#e6f4f7] text-[#246E7F] border border-[#246E7F]/20">
              <Sparkles className="w-3.5 h-3.5 text-[#E06527]" />
              <span>FLEXIBLE ENGAGEMENT MODELS</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading leading-tight">
              Hire Developers<br />
              <span className="text-[#246E7F]">Your Way.</span>
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              Choose the exact engagement model that matches your product velocity. Switch or scale up anytime with zero friction.
            </p>

            {/* Handwritten Note / Badge */}
            <div className="pt-2">
              <div className="inline-block p-4 rounded-2xl bg-white border border-[#246E7F]/20 shadow-xs text-[#246E7F] text-xs font-bold space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>1-Week Risk-Free Trial Included</span>
                </div>
                <div className="text-slate-500 font-normal">
                  Overlaps seamlessly with your preferred timezone.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Model Cards (8 Cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {ENGAGEMENT_MODELS.map((model, idx) => (
              <div
                key={model.id}
                className={`bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 space-y-6 hover-lift relative overflow-hidden ${
                  model.popular
                    ? 'border-2 border-[#246E7F] shadow-lg ring-4 ring-[#246E7F]/10'
                    : 'border border-slate-200/90 shadow-sm'
                }`}
              >
                {model.popular && (
                  <div className="absolute top-0 right-0 bg-[#246E7F] text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-bl-xl shadow-xs">
                    POPULAR
                  </div>
                )}

                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center p-1.5 border border-slate-100 shadow-inner group-hover:scale-105 transition-transform duration-300 animate-float-slow" style={{ animationDelay: `${idx * 0.4}s` }}>
                    <ThreeDIcon name={model.icon} size={42} />
                  </div>

                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#E06527] block mb-1">
                      {model.badge}
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900 font-heading">
                      {model.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed font-normal">
                      {model.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg block text-center">
                      {model.rateInfo}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/hire-developers"
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold text-center block transition-all shadow-sm flex items-center justify-center gap-1.5 ${
                      model.popular
                        ? 'bg-[#246E7F] hover:bg-[#1a515e] text-white shadow-md'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
