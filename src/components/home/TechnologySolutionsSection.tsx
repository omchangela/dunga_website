'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Code2, 
  Layers, 
  Cpu, 
  Cloud, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

const MAIN_SERVICES = [
  {
    id: 'hire-developers',
    title: 'Hire Developers',
    description: 'Get skilled developers on hourly, part-time or full-time basis. Scale your team quickly and cost-effectively.',
    icon: Code2,
    iconBg: 'bg-[#e6f4f7] text-[#246E7F]',
    ctaText: 'Hire Now',
    ctaLink: '/hire-developers',
  },
  {
    id: 'ready-made-codes',
    title: 'Ready Made Codes',
    description: 'Purchase verified, production-ready source codes for web, mobile and SaaS platforms.',
    icon: Layers,
    iconBg: 'bg-[#fff3eb] text-[#E06527]',
    ctaText: 'Browse Codes',
    ctaLink: '/products',
  },
  {
    id: 'custom-development',
    title: 'Custom Development',
    description: 'We build tailored web, mobile and SaaS solutions as per your business requirements.',
    icon: Cpu,
    iconBg: 'bg-purple-50 text-purple-600',
    ctaText: 'Get a Quote',
    ctaLink: '/contact',
  },
  {
    id: 'saas-products',
    title: 'SaaS Products',
    description: 'Explore our in-house SaaS tools and platforms to power your business.',
    icon: Cloud,
    iconBg: 'bg-emerald-50 text-emerald-600',
    ctaText: 'View Products',
    ctaLink: '/products',
  },
];

export function TechnologySolutionsSection() {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-100" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#e6f4f7] text-[#246E7F] border border-[#246E7F]/20">
            <span>OUR SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Complete Software Solutions<br />for Modern Businesses
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            From ready-made code to custom development, we provide everything you need to build, launch, and grow your digital products.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MAIN_SERVICES.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between hover:shadow-xl hover:border-[#246E7F]/40 transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${srv.iconBg} shadow-2xs group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#246E7F] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-2 border-t border-slate-100">
                  <Link
                    href={srv.ctaLink}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#246E7F] group-hover:text-[#E06527] transition-colors"
                  >
                    <span>{srv.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
