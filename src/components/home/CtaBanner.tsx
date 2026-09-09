'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import { ThreeDIcon } from '@/components/ui/ThreeDIcon';

export function CtaBanner() {
  return (
    <section className="py-20 bg-white border-b border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner with split dark teal to orange gradient */}
        <div className="bg-gradient-to-r from-slate-950 via-[#133c46] to-[#e06527] rounded-3xl p-8 sm:p-14 text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden border border-slate-800">
          
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Left Text with 3D Rocket Icon */}
          <div className="space-y-4 max-w-2xl text-left relative z-10 flex flex-col sm:flex-row items-start gap-6">
            <div className="animate-float-slow shrink-0 hidden sm:block">
              <ThreeDIcon name="rocket" size={68} />
            </div>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/10 text-teal-200 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>LET&apos;S BUILD SOMETHING EXTRAORDINARY</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight font-heading">
                Ready to Hire Top Developers or Launch Your Next Platform?
              </h2>

              <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed max-w-xl font-normal">
                Onboard pre-vetted engineers in 24–48 hours, acquire ready-made Next.js codebases, or get custom enterprise software engineered with 100% source code ownership.
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto relative z-10">
            <Link
              href="/hire-developers"
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-sm rounded-2xl shadow-xl transition-all text-center flex items-center justify-center gap-2 group hover:scale-105 duration-300"
            >
              <span>Hire Developers</span>
              <ArrowRight className="w-4 h-4 text-[#246E7F] group-hover:translate-x-1.5 transition-transform" />
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm rounded-2xl border border-white/30 transition-all text-center flex items-center justify-center gap-2 backdrop-blur-xs"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Us</span>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
