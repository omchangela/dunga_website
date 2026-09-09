'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';

export function CtaBanner() {
  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner with split dark teal to orange gradient */}
        <div className="bg-gradient-to-r from-[#112a32] via-[#1a4b57] to-[#E06527] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Text */}
          <div className="space-y-4 max-w-2xl text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/10 text-teal-100 border border-white/20">
              <span>LET&apos;S BUILD TOGETHER</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Ready to Hire Developers or Build Your Next Project?
            </h2>

            <p className="text-xs sm:text-sm text-teal-100 leading-relaxed max-w-xl">
              Get started today and turn your ideas into reality with Dunga Technologies.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
            <Link
              href="/hire-developers"
              className="w-full sm:w-auto px-6 py-3.5 bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all text-center flex items-center justify-center gap-2 group"
            >
              <span>Hire Developers</span>
              <ArrowRight className="w-4 h-4 text-[#246E7F] group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/30 transition-all text-center flex items-center justify-center gap-2"
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
