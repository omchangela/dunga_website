'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ThreeDIcon, ThreeDIconType } from '@/components/ui/ThreeDIcon';

const MAIN_SERVICES: {
  id: string;
  title: string;
  description: string;
  icon: ThreeDIconType;
  badge: string;
  ctaText: string;
  ctaLink: string;
}[] = [
  {
    id: 'hire-developers',
    title: 'Hire Developers On Rent',
    description: 'Rent pre-vetted full-stack, backend, AI & mobile developers on hourly, part-time or full-time basis with 1-week risk-free trial.',
    icon: 'users',
    badge: 'From ₹999 / $15/hr',
    ctaText: 'Explore Talent Pool',
    ctaLink: '/hire-developers',
  },
  {
    id: 'ready-made-codes',
    title: 'Ready-Made Source Codes',
    description: '100% full source code ownership. Production-tested Next.js, Node.js, and Laravel codebases with zero vendor lock-in.',
    icon: 'code',
    badge: '100% Ownership',
    ctaText: 'Browse Ready Codes',
    ctaLink: '/products',
  },
  {
    id: 'custom-development',
    title: 'Custom Engineering & MVP',
    description: 'End-to-end bespoke software engineering. We build high-throughput fintech engines, SaaS platforms, and enterprise CRM suites.',
    icon: 'layers',
    badge: 'Turnkey Delivery',
    ctaText: 'Get Project Estimate',
    ctaLink: '/project-estimation',
  },
  {
    id: 'saas-products',
    title: 'Proprietary SaaS Platforms',
    description: 'Explore our in-house enterprise SaaS platforms (OmniFlow CRM, DungaPay Multi-Gateway, AetherBot AI) built for immediate deployment.',
    icon: 'rocket',
    badge: 'Live Demos Ready',
    ctaText: 'Explore SaaS Suites',
    ctaLink: '/products',
  },
];

export function TechnologySolutionsSection() {
  return (
    <section className="py-20 sm:py-24 bg-white border-b border-slate-100 relative overflow-hidden" id="services">
      {/* Subtle Dot Grid Background */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#e6f4f7] text-[#246E7F] border border-[#246E7F]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#E06527]" />
            <span>ENTERPRISE CAPABILITIES & PRODUCTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading leading-tight">
            Complete Technology Solutions<br />
            Built for <span className="text-[#E06527]">Unstoppable Scale</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            From ready-to-deploy source code to dedicated senior engineering squads, choose the model that fuels your roadmap with zero vendor lock-in.
          </p>
        </div>

        {/* 4 Cards Grid with 3D Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {MAIN_SERVICES.map((srv, idx) => (
            <div
              key={srv.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-7 flex flex-col justify-between hover:shadow-2xl hover:border-[#246E7F]/40 transition-all duration-300 group hover-lift relative overflow-hidden"
            >
              {/* Card Corner Ambient Gradient */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full pointer-events-none group-hover:bg-[#e6f4f7] transition-colors duration-300"></div>

              <div className="space-y-5 relative z-10">
                
                {/* 3D Icon Container with Float Animation */}
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center p-2 border border-slate-100 shadow-inner group-hover:scale-105 group-hover:border-[#246E7F]/20 transition-all duration-300 animate-float-slow" style={{ animationDelay: `${idx * 0.3}s` }}>
                    <ThreeDIcon name={srv.icon} size={48} />
                  </div>

                  <span className="text-[11px] font-extrabold text-[#246E7F] bg-[#e6f4f7] px-2.5 py-1 rounded-full border border-[#246E7F]/20">
                    {srv.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#246E7F] transition-colors font-heading">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed font-normal">
                    {srv.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 relative z-10">
                <Link
                  href={srv.ctaLink}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#246E7F] group-hover:text-[#E06527] transition-colors"
                >
                  <span>{srv.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
