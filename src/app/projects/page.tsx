import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Briefcase, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { CASE_STUDIES } from '@/data/case-studies';

export const metadata: Metadata = {
  title: 'Client Case Studies & Enterprise Engineering Portfolio | Dunga Technologies',
  description:
    'Explore real-world case studies showcasing how Dunga Technologies engineered high-performance CRM suites, payment engines, and mobile applications.',
};

export default function ProjectsPage() {
  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen py-12 sm:py-20 relative overflow-hidden">
      
      {/* Background Dot Pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#e6f4f7] border border-[#246e7f]/20 text-[#246e7f] text-xs font-bold px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#E06527]" />
            <span>PROVEN ENGINEERING IMPACT & DELIVERABLES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight font-heading leading-tight">
            Client Case Studies & <span className="text-[#246E7F]">Engineering Portfolio</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Real enterprise case studies breaking down the technical challenges, architecture choices, and business ROI delivered by Dunga Technologies.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#246e7f]/40 hover-lift transition-all duration-300 flex flex-col justify-between group relative"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={study.thumbnailUrl}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-xs text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-xs">
                    {study.category}
                  </div>
                </div>

                <div className="p-6 space-y-3.5">
                  <div className="text-xs font-bold text-[#246e7f]">
                    {study.clientName} • <span className="text-slate-500 font-normal">{study.clientIndustry}</span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#246e7f] transition-colors leading-snug font-heading">
                    {study.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed font-normal">
                    {study.challenge}
                  </p>

                  {/* Impact metrics pill */}
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100">
                    {study.metrics.map((m, idx) => (
                      <div key={idx} className="bg-slate-50 p-2.5 rounded-xl text-center border border-slate-100">
                        <span className="text-xs font-black text-slate-900 block font-heading">{m.value}</span>
                        <span className="text-[10px] text-emerald-600 font-bold block">{m.change}</span>
                        <span className="text-[9px] text-slate-500 truncate block mt-0.5">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/projects/${study.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#e6f4f7] hover:bg-[#246e7f] text-[#246e7f] hover:text-white text-xs font-bold py-3 rounded-xl transition-all shadow-xs group"
                >
                  <span>Read Full Technical Breakdown</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
