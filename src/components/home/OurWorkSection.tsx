'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

const SHOWCASE_PROJECTS = [
  {
    title: 'OmniFlow AI CRM',
    category: 'SaaS Platform',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'DungaPay Billing Orchestrator',
    category: 'Fintech Engine',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'AetherBot AI Multi-Tenant',
    category: 'AI Knowledge Base',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'FoodCart Multi-Vendor App',
    category: 'Mobile & Web',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop',
  },
];

export function OurWorkSection() {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-100" id="portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark Slate Featured Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-[#102a31] to-[#1e5b6a] rounded-3xl p-8 sm:p-12 text-white shadow-2xl overflow-hidden relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-teal-100 border border-white/20">
                <span>OUR WORK</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Real Projects.<br />Real Results.
              </h2>

              <p className="text-xs sm:text-sm text-teal-100 leading-relaxed max-w-md">
                Explore our latest work and see how we&apos;ve helped businesses turn ideas into powerful digital products.
              </p>

              <div className="pt-2">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold transition-all shadow-md group"
                >
                  <span>View Portfolio</span>
                  <ArrowRight className="w-4 h-4 text-[#246E7F] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Mockup Grid (7 Cols) */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              {SHOWCASE_PROJECTS.map((proj, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-2xl overflow-hidden border border-white/20 bg-slate-800/60 aspect-[16/10] shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end">
                    <span className="text-[10px] text-teal-300 font-semibold uppercase">{proj.category}</span>
                    <h3 className="text-xs font-bold text-white truncate">{proj.title}</h3>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
