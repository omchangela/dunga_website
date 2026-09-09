'use client';

import React from 'react';
import { ShieldCheck, UserCheck, Rocket, Award } from 'lucide-react';

const WHY_CHOOSE_ITEMS = [
  {
    id: 'zero-vendor-lockin',
    title: 'Zero Vendor Lock-In',
    description: 'You get 100% source code ownership.',
    icon: ShieldCheck,
    iconBg: 'bg-emerald-50 text-emerald-600',
  },
  {
    id: 'pre-vetted-developers',
    title: 'Pre-Vetted Developers',
    description: 'Work with experienced & trusted talent.',
    icon: UserCheck,
    iconBg: 'bg-[#fff3eb] text-[#E06527]',
  },
  {
    id: 'cost-effective',
    title: 'Cost-Effective',
    description: 'High-quality solutions at competitive rates.',
    icon: Rocket,
    iconBg: 'bg-blue-50 text-blue-600',
  },
  {
    id: 'lifetime-support',
    title: 'Lifetime Support',
    description: 'Ongoing updates and reliable assistance.',
    icon: Award,
    iconBg: 'bg-purple-50 text-purple-600',
  },
];

export function WhyChooseDungaSection() {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-100" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#e6f4f7] text-[#246E7F] border border-[#246E7F]/20">
            <span>WHY CHOOSE DUNGA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            More Than a Service Provider<br />We&apos;re Your Technology Partner
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We focus on long-term relationships and your success.
          </p>
        </div>

        {/* 4 Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-start hover:shadow-lg hover:border-[#246E7F]/40 transition-all duration-300 space-y-4 group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${item.iconBg} shadow-2xs group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#246E7F] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
