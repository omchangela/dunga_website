'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import {
  Star,
  Quote,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { TESTIMONIALS } from '@/data/testimonials';

export function GsapTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out' }
    );
  }, [currentIndex]);

  const t = TESTIMONIALS[currentIndex];

  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#fff3eb] border border-[#fbd8c4] text-[#e06527] text-xs font-bold px-3.5 py-1 rounded-full shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Enterprise Reviews</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Trusted by 150+ Founders & CTOs
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
              Read how fast-growing startups and enterprises leverage Dunga Technologies source code and deployment services to accelerate time-to-market.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevTestimonial}
              className="p-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors shadow-xs"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextTestimonial}
              className="p-3 rounded-2xl bg-[#246e7f] hover:bg-[#1a515e] text-white transition-colors shadow-md shadow-[#246e7f]/20"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Testimonial Card */}
        <div
          ref={cardRef}
          className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-lg relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              {/* Star Rating & Verified Purchase */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Buyer • {t.productOrService}
                </span>
              </div>

              {/* Review Text */}
              <p className="text-base sm:text-2xl font-bold text-slate-900 leading-snug tracking-tight">
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Author & Company */}
              <div className="flex items-center gap-4 pt-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.avatarUrl}
                  alt={t.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-md"
                />
                <div>
                  <div className="text-sm font-bold text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}, <strong className="text-slate-700">{t.company}</strong></div>
                </div>
              </div>
            </div>

            {/* Right Metric Box */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Verified Outcome
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#246e7f]">
                3x Faster Delivery
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Deployed within 36 hours using Dunga&apos;s senior server setup add-on with zero configuration issues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
