import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Briefcase, TrendingUp, Sparkles } from 'lucide-react';
import { CASE_STUDIES } from '@/data/case-studies';

export const metadata: Metadata = {
  title: 'Client Case Studies & Enterprise Engineering Portfolio | Dunga Technologies',
  description:
    'Explore real-world case studies showcasing how Dunga Technologies engineered high-performance CRM suites, payment engines, and mobile applications.',
};

export default function ProjectsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#e6f4f7] border border-[#246e7f]/20 text-[#246e7f] text-xs font-bold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Engineering Impact</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Client Case Studies & Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Real enterprise case studies breaking down the technical challenges, architecture choices, and business ROI achieved with Dunga Technologies.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover-lift transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={study.thumbnailUrl}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded">
                    {study.category}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="text-[11px] font-bold text-[#246e7f]">
                    {study.clientName} • {study.clientIndustry}
                  </div>
                  <h2 className="text-sm font-bold text-slate-900 group-hover:text-[#246e7f] transition-colors leading-snug">
                    {study.title}
                  </h2>
                  <p className="text-xs text-slate-600 line-clamp-2">{study.challenge}</p>

                  {/* Impact metrics pill */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                    {study.metrics.map((m, idx) => (
                      <div key={idx} className="bg-slate-50 p-2 rounded-lg text-center">
                        <span className="text-xs font-black text-slate-900 block">{m.value}</span>
                        <span className="text-[9px] text-emerald-600 font-bold block">{m.change}</span>
                        <span className="text-[9px] text-slate-500 truncate block mt-0.5">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href={`/projects/${study.slug}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-[#e6f4f7] hover:text-[#246e7f] text-slate-700 text-xs font-bold py-2 rounded-lg transition-colors"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
