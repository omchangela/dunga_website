'use client';

import React from 'react';
import Link from 'next/link';
import {
  Code2,
  Smartphone,
  Layers,
  Cloud,
  Users,
  Server,
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Headphones,
  Calculator,
  Wrench,
} from 'lucide-react';
import { SERVICES } from '@/data/services';
import { useCurrency } from '@/context/CurrencyContext';
import { ThreeDIcon, ThreeDIconType } from '@/components/ui/ThreeDIcon';

const serviceIconMap: Record<string, ThreeDIconType> = {
  'hire-developers': 'users',
  'ready-made-code-solutions': 'code',
  'codecanyon-script-installation': 'cloud',
  'custom-web-development': 'layers',
  'mobile-app-development': 'phone',
  'saas-mvp-development': 'rocket',
  'database-performance-tuning': 'cpu',
  'security-code-audit': 'shield',
};

export default function ServicesPage() {
  const { formatPrice } = useCurrency();

  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen py-12 sm:py-20 relative overflow-hidden">
      
      {/* Background Dot Pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#e6f4f7] border border-[#246e7f]/20 text-[#246e7f] text-xs font-bold px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#E06527]" />
            <span>ENTERPRISE ENGINEERING & ARCHITECTURE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight font-heading leading-tight">
            Custom Software Solutions & <span className="text-[#246E7F]">Engineering Roster</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
            From high-velocity full-stack Next.js web applications to cross-platform mobile apps and cloud infrastructure, we build robust systems tailored to your technical requirements with 100% IP ownership.
          </p>
        </div>

        {/* Services List Grid with 3D Icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, idx) => {
            const iconName = serviceIconMap[service.slug] || 'layers';
            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-9 shadow-sm hover:shadow-2xl hover:border-[#246e7f]/40 transition-all duration-300 flex flex-col justify-between hover-lift relative overflow-hidden group"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center p-2 border border-slate-100 shadow-inner group-hover:scale-105 transition-transform duration-300 animate-float-slow" style={{ animationDelay: `${idx * 0.25}s` }}>
                      <ThreeDIcon name={iconName} size={48} />
                    </div>
                    <span className="text-xs font-extrabold text-[#246e7f] bg-[#e6f4f7] px-3.5 py-1 rounded-full border border-[#246e7f]/20">
                      ⏱ {service.timeline}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-[#246e7f] transition-colors font-heading">
                      {service.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-normal">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                      Included Deliverables:
                    </span>
                    <ul className="space-y-2 text-xs font-medium text-slate-700">
                      {service.deliverables.map((d, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {service.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-slate-50 text-slate-700 text-[11px] font-semibold px-3 py-1 rounded-lg border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Starting Investment
                    </span>
                    <span className="text-lg font-black text-slate-900 font-heading">
                      {formatPrice(service.startingPriceINR, service.startingPriceUSD)}
                    </span>
                  </div>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#246e7f] hover:bg-[#1b5563] px-5 py-2.5 rounded-xl shadow-xs transition-all group"
                  >
                    <span>View Full Scope</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <h3 className="text-xl font-extrabold text-white font-heading">Have a custom technical challenge?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-normal">
              Schedule a 30-minute scoping call with our lead technical architect to discuss your database modeling, scaling roadmap, and API requirements.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#E06527] hover:bg-[#c95318] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-lg shrink-0 relative z-10 hover:scale-105"
          >
            <Headphones className="w-4 h-4" />
            <span>Book Free Architecture Session</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
