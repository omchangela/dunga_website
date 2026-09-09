'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Rahul Mehta',
    role: 'CEO, Startupli',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    quote:
      'Amazing experience working with Dunga Technologies. The developers are skilled, professional and deliver on time.',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Founder, 36Grow',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop',
    quote:
      'We hired a dedicated team for our SaaS project and the results exceeded our expectations. Highly recommended!',
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'CTO, ScaleIT',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    quote:
      'The ready-made code helped us launch our product 3x faster. Great support and documentation.',
  },
];

export function GsapTestimonials() {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-100" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#e6f4f7] text-[#246E7F] border border-[#246E7F]/20">
            <span>CLIENT FEEDBACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What Our Clients Say
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Trusted by businesses across the globe.
          </p>
        </div>

        {/* 3 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between hover:shadow-lg hover:border-[#246E7F]/40 transition-all duration-300 space-y-5"
            >
              <div className="space-y-3">
                <Quote className="w-8 h-8 text-[#246E7F]/30" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-200">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{review.name}</h4>
                    <p className="text-[11px] text-slate-500">{review.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
