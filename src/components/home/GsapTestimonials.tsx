'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Quote, Sparkles, CheckCircle2 } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Rahul Mehta',
    role: 'CEO, Startupli (Fintech)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    quote:
      'Amazing experience working with Dunga Technologies. We hired 2 senior Next.js full-stack developers for our core payment engine. Delivered 3 weeks ahead of schedule with 100% test coverage.',
    verifiedProject: 'Multi-Gateway Billing Engine',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Founder, 36Grow SaaS',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop',
    quote:
      'We acquired the OmniFlow CRM source code and hired a dedicated Dunga engineer for custom WhatsApp triggers. Zero vendor lock-in gave us complete freedom to host on our own AWS infrastructure.',
    verifiedProject: 'OmniFlow CRM Deployment',
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'CTO, ScaleIT Logistics',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    quote:
      'The ready-made Flutter codebase and backend microservices saved our company over ₹12 Lakhs in initial development costs. Post-launch support and documentation are exceptional.',
    verifiedProject: 'Logistics GPS Mobile App',
  },
];

export function GsapTestimonials() {
  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-white via-slate-50/50 to-white border-b border-slate-100 relative overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#e6f4f7] text-[#246E7F] border border-[#246E7F]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#E06527]" />
            <span>VERIFIED CLIENT STORIES & REVIEWS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading leading-tight">
            Trusted by Builders & <span className="text-[#246E7F]">Founders Worldwide</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Read how global founders and engineering leaders accelerate their time-to-market with Dunga Technologies.
          </p>
        </div>

        {/* 3 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-8 flex flex-col justify-between hover:shadow-2xl hover:border-[#246E7F]/40 transition-all duration-300 space-y-6 hover-lift relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Quote className="w-10 h-10 text-[#246E7F]/20" />
                  <div className="flex items-center gap-1 text-amber-400 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-normal">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              <div className="pt-5 border-t border-slate-100 space-y-3">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden shrink-0 border-2 border-[#246E7F]/20 shadow-xs">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 font-heading">{review.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">{review.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">Verified: {review.verifiedProject}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
