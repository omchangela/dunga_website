'use client';

import React from 'react';
import { ThreeDIcon, ThreeDIconType } from '@/components/ui/ThreeDIcon';
import { Sparkles, CheckCircle2 } from 'lucide-react';

const WHY_CHOOSE_ITEMS: {
  id: string;
  title: string;
  description: string;
  icon: ThreeDIconType;
  points: string[];
}[] = [
  {
    id: 'zero-vendor-lockin',
    title: 'Zero Vendor Lock-In',
    description: '100% full intellectual property & clean source code ownership without recurring per-seat licensing fees.',
    icon: 'shield',
    points: ['Clean GitHub Repo Transfer', 'Commercial Usage Rights', 'Self-Hosted Anywhere'],
  },
  {
    id: 'pre-vetted-developers',
    title: 'Pre-Vetted Senior Engineers',
    description: 'Top 1% assessed software engineers ready for instant 24-48h deployment with a 1-week risk-free trial.',
    icon: 'users',
    points: ['Technical Code Vetting', 'Direct Communication', 'Free Replacement Guarantee'],
  },
  {
    id: 'cost-effective',
    title: 'Transparent, Cost-Effective',
    description: 'Predictable transparent rates starting at ₹999 / $15/hr with zero hidden recruitment or overhead costs.',
    icon: 'wallet',
    points: ['Weekly Transparent Timesheets', 'Save up to 60% vs In-House', 'Flexible Milestone Sprints'],
  },
  {
    id: 'lifetime-support',
    title: 'Lifetime Code Updates & Support',
    description: 'Comprehensive post-launch technical support, automated security updates, and dedicated engineering assistance.',
    icon: 'trophy',
    points: ['30 Days Free Bug-Fix Support', 'DevOps & Server Hardening', 'Direct WhatsApp / Slack'],
  },
];

export function WhyChooseDungaSection() {
  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-white via-slate-50/40 to-white border-b border-slate-100 relative overflow-hidden" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#e6f4f7] text-[#246E7F] border border-[#246E7F]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#E06527]" />
            <span>THE DUNGA ADVANTAGE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading leading-tight">
            More Than a Service Provider.<br />
            We Are Your <span className="text-[#246E7F]">Engineering Force.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We eliminate software development friction with radical transparency, pre-vetted senior talent, and 100% code ownership.
          </p>
        </div>

        {/* 4 Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {WHY_CHOOSE_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-7 flex flex-col justify-between hover:shadow-2xl hover:border-[#246E7F]/40 transition-all duration-300 space-y-5 group hover-lift relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center p-2 border border-slate-100 shadow-inner group-hover:scale-105 transition-transform duration-300 animate-float-slow" style={{ animationDelay: `${idx * 0.35}s` }}>
                  <ThreeDIcon name={item.icon} size={48} />
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#246E7F] transition-colors font-heading">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Trust Points */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                {item.points.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
