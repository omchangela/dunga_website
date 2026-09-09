'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, User, Users, ArrowRight } from 'lucide-react';

const ENGAGEMENT_MODELS = [
  {
    id: 'hourly',
    title: 'Hourly Hiring',
    description: 'Pay only for what you use. Best for small tasks & short term projects.',
    icon: Clock,
    iconBg: 'bg-[#e6f4f7] text-[#246E7F]',
  },
  {
    id: 'part-time',
    title: 'Part-Time',
    description: 'Dedicated developers for part of your day. Great for ongoing development.',
    icon: User,
    iconBg: 'bg-[#e6f4f7] text-[#246E7F]',
  },
  {
    id: 'full-time',
    title: 'Full-Time',
    description: 'A dedicated team working exclusively on your project.',
    icon: Users,
    iconBg: 'bg-[#e6f4f7] text-[#246E7F]',
  },
];

export function FlexibleEngagementSection() {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-100" id="engagement-models">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Heading & Annotation (5 Cols) */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#e6f4f7] text-[#246E7F] border border-[#246E7F]/20">
              <span>FLEXIBLE ENGAGEMENT</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Hire Developers<br />Your Way
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm">
              Choose the engagement model that fits your project needs. Scale up or down anytime.
            </p>

            {/* Handwritten Note / Badge */}
            <div className="pt-2">
              <div className="inline-block p-3 rounded-2xl bg-[#fff3eb] border border-[#fbd8c4] text-[#E06527] font-mono text-xs font-bold">
                Flexible • Transparent • Hassle-Free ➔
              </div>
            </div>
          </div>

          {/* Right Column: 3 Model Cards (8 Cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {ENGAGEMENT_MODELS.map((model) => {
              const Icon = model.icon;
              return (
                <div
                  key={model.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between hover:shadow-lg hover:border-[#246E7F]/40 transition-all duration-300 space-y-4"
                >
                  <div className="space-y-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${model.iconBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-base font-bold text-slate-900">
                      {model.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {model.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/hire-developers"
                      className="w-full py-2.5 px-3 rounded-xl bg-[#246E7F] hover:bg-[#1b5563] text-white text-xs font-bold text-center block transition-colors shadow-2xs"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
