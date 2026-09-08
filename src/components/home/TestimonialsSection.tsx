'use client';

import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/data/testimonials';

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Verified Customer Reviews</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Trusted by 120+ Companies & Engineering Teams
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Read real feedback from software buyers and enterprise partners who rely on Dunga Technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between hover-lift transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {t.verifiedBuyer && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Verified
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 italic leading-relaxed">
                  &ldquo;{t.content}&rdquo;
                </p>

                <div className="text-[10px] text-[#246e7f] font-semibold bg-[#e6f4f7] px-2 py-1 rounded">
                  Purchased: {t.productOrService}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 mt-4 border-t border-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.avatarUrl}
                  alt={t.name}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">{t.name}</div>
                  <div className="text-[11px] text-slate-500">
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
