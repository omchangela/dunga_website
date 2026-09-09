'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import {
  ArrowRight,
  ShieldCheck,
  Users,
  Clock,
  Sparkles,
  Code2
} from 'lucide-react';

export function GsapHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const heroImageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(leftContentRef.current?.children || [], {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
      })
      .from(
        heroImageContainerRef.current,
        {
          scale: 0.95,
          opacity: 0,
          duration: 0.9,
        },
        '-=0.5'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-white pt-8 pb-14 lg:pt-14 lg:pb-20 border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Headline, Description & CTAs (6-7 Cols) */}
          <div ref={leftContentRef} className="lg:col-span-6 space-y-6 text-left">
            
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#e6f4f7] text-[#246E7F] border border-[#246E7F]/20">
              <Sparkles className="w-3.5 h-3.5 text-[#E06527]" />
              <span>Your Technology Partner for a Smarter Tomorrow</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Build. Hire. Scale.<br />
              All in One <span className="text-[#E06527]">Place.</span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-normal">
              Dunga Technologies helps businesses build powerful digital products with zero vendor lock-in. Hire expert developers on <strong className="text-slate-800 font-semibold">rent</strong>, buy ready-to-use source codes, or get custom software developed for your unique needs.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/hire-developers"
                className="px-6 py-3.5 bg-[#246E7F] hover:bg-[#1b5563] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 group"
              >
                <span>Hire Developers</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/products"
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex items-center gap-2"
              >
                <Code2 className="w-4 h-4 text-[#246E7F]" />
                <span>Explore Ready Codes</span>
              </Link>
            </div>

            {/* 3 Trust Points Row */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-100 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>100% Source Code Ownership</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#e6f4f7] text-[#246E7F] flex items-center justify-center shrink-0 border border-[#246E7F]/20">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <span>Flexible Hiring Models</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#fff3eb] text-[#E06527] flex items-center justify-center shrink-0 border border-[#fbd8c4]">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span>On-Time Delivery & Support</span>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Full Hero Graphic from banner_1.png (6 Cols) */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
            <div
              ref={heroImageContainerRef}
              className="w-full max-w-[620px] transition-transform duration-500 hover:scale-[1.01]"
            >
              <Image
                src="/hero-developer.jpg"
                alt="Dunga Technologies Developer & Dedicated Team"
                width={1024}
                height={716}
                priority
                className="w-full h-auto object-contain block drop-shadow-md rounded-2xl select-none"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
