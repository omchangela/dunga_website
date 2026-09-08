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
  Calculator,
  Wrench,
} from 'lucide-react';
import { SERVICES } from '@/data/services';
import { useCurrency } from '@/context/CurrencyContext';

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Smartphone,
  Layers,
  Cloud,
  Users,
  Server,
  ShieldCheck,
  Zap,
  Sparkles,
  Calculator,
  Wrench,
};


export function ServicesGrid() {
  const { formatPrice } = useCurrency();

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#e6f4f7] border border-[#246e7f]/20 text-[#246e7f] text-xs font-bold px-3 py-1 rounded-full">
            <Zap className="w-3.5 h-3.5" />
            <span>Custom Engineering & Consulting</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Tailored Enterprise Software Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Need custom architecture, mobile apps, or proprietary SaaS platforms built from scratch? Dunga Technologies pairs senior engineers with your business vision.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon] || Code2;
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs hover-lift transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#e6f4f7] text-[#246e7f] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                      Timeline: {service.timeline}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{service.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Core Deliverables:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {service.deliverables.slice(0, 4).map((d, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
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
                        className="bg-slate-50 text-slate-600 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-200"
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
                      Starting From
                    </span>
                    <span className="text-base font-black text-slate-900">
                      {formatPrice(service.startingPriceINR, service.startingPriceUSD)}
                    </span>
                  </div>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#246e7f] hover:text-[#1a515e] bg-[#e6f4f7] hover:bg-[#d8eef3] px-3.5 py-2 rounded-lg transition-colors group"
                  >
                    <span>View Service Scope</span>
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
