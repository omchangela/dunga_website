'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, ExternalLink } from 'lucide-react';
import { GsapSvgBackground } from '@/components/ui/GsapSvgBackground';

const SHOWCASE_PROJECTS = [
  {
    title: 'OmniFlow AI CRM & Telecalling',
    category: 'Enterprise SaaS',
    tag: 'Next.js 15 & Node.js',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
    slug: 'scaling-fintech-payment-engine',
  },
  {
    title: 'DungaPay Multi-Gateway Engine',
    category: 'Fintech Billing',
    tag: 'Stripe, Razorpay & GST',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=600&auto=format&fit=crop',
    slug: 'scaling-fintech-payment-engine',
  },
  {
    title: 'AetherBot AI Knowledge Assistant',
    category: 'Autonomous RAG',
    tag: 'Python & pgvector',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop',
    slug: 'ai-knowledge-agent-edtech',
  },
  {
    title: 'FleetPulse Cold-Chain Mobile App',
    category: 'GPS & IoT Logistics',
    tag: 'Flutter & WebSockets',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop',
    slug: 'telecalling-automation-real-estate',
  },
];

export function OurWorkSection() {
  return (
    <section className="py-20 sm:py-24 bg-white border-b border-slate-100 relative overflow-hidden" id="portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark Slate Featured Banner with GSAP SVG background */}
        <div className="bg-gradient-to-br from-slate-950 via-[#0f2e37] to-[#1a515e] rounded-3xl p-8 sm:p-14 text-white shadow-2xl overflow-hidden relative border border-slate-800">
          
          <GsapSvgBackground variant="dark" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Content (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/10 text-teal-200 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-[#E06527]" />
                <span>PROVEN CASE STUDIES & DELIVERABLES</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading leading-tight">
                Real Projects.<br />
                <span className="text-[#E06527]">Transformative Results.</span>
              </h2>

              <p className="text-sm sm:text-base text-teal-100/90 leading-relaxed max-w-md font-normal">
                Explore our engineering portfolio. Over 1,200+ projects delivered with zero vendor lock-in, clean architectures, and sub-second performance.
              </p>

              <div className="pt-2">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-sm font-extrabold transition-all shadow-lg hover:shadow-xl group"
                >
                  <span>Explore Full Portfolio</span>
                  <ArrowRight className="w-4 h-4 text-[#246E7F] group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Mockup Grid (7 Cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {SHOWCASE_PROJECTS.map((proj, idx) => (
                <Link
                  key={idx}
                  href={`/projects/${proj.slug}`}
                  className="relative group rounded-2xl overflow-hidden border border-white/15 bg-slate-900 aspect-[16/11] shadow-xl hover-lift block"
                >
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-4 flex flex-col justify-end">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] text-teal-300 font-extrabold uppercase tracking-wider bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800/60">
                        {proj.category}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-white/70 group-hover:text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-white truncate font-heading group-hover:text-teal-200 transition-colors">
                      {proj.title}
                    </h3>
                    <span className="text-[11px] text-slate-300">
                      {proj.tag}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
