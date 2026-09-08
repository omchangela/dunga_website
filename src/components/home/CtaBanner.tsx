'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Headphones, MessageSquare, ShieldCheck, Zap } from 'lucide-react';

export function CtaBanner() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1e5b6a] via-[#246e7f] to-[#e06527] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          {/* Ambient background circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded-full">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              Direct Engineering Consultation
            </span>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Ready to Accelerate Your Software Delivery or Acquire Proprietary Code?
            </h2>

            <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl">
              Talk directly with our senior software architects. Whether you need an immediate server setup for one of our scripts or a bespoke enterprise solution, we are here to assist.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all active:scale-95"
              >
                <Headphones className="w-4 h-4 text-[#246e7f]" />
                <span>Book Free 30-Min Architecture Call</span>
              </Link>

              <a
                href="https://wa.me/919999999999?text=Hello%20Dunga%20Technologies,%20I%20would%20like%20to%20inquire%20about%20your%20software%20solutions."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md transition-all active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <div className="pt-2 flex flex-wrap gap-6 text-xs text-white/80">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-300" /> Strict Non-Disclosure Agreement (NDA)
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-300" /> Guaranteed 24-48h Deployment
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
