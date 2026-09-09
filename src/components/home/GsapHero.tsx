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
  Code2,
  CheckCircle2,
  Terminal,
  Plus
} from 'lucide-react';

const TECH_PILLS = [
  { name: 'Next.js', iconBg: 'bg-black text-white' },
  { name: 'Laravel', iconBg: 'bg-red-500 text-white' },
  { name: 'React', iconBg: 'bg-cyan-500 text-white' },
  { name: 'Node.js', iconBg: 'bg-emerald-600 text-white' },
  { name: 'Flutter', iconBg: 'bg-sky-500 text-white' },
  { name: 'More...', iconBg: 'bg-slate-700 text-white' },
];

export function GsapHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const heroImageContainerRef = useRef<HTMLDivElement>(null);
  const floatingCodeRef = useRef<HTMLDivElement>(null);
  const floatingDevsRef = useRef<HTMLDivElement>(null);
  const techStackColumnRef = useRef<HTMLDivElement>(null);

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
          scale: 0.94,
          opacity: 0,
          duration: 0.9,
        },
        '-=0.5'
      )
      .from(
        [floatingCodeRef.current, floatingDevsRef.current, techStackColumnRef.current],
        {
          y: 20,
          opacity: 0,
          stagger: 0.15,
          duration: 0.7,
        },
        '-=0.4'
      );

      // Continuous gentle floating physics
      if (floatingCodeRef.current) {
        gsap.to(floatingCodeRef.current, {
          y: -8,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (floatingDevsRef.current) {
        gsap.to(floatingDevsRef.current, {
          y: 8,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.3,
        });
      }

      if (techStackColumnRef.current) {
        gsap.to(techStackColumnRef.current, {
          y: -6,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.6,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-white pt-8 pb-14 lg:pt-14 lg:pb-20 border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Description & CTAs (7 Cols) */}
          <div ref={leftContentRef} className="lg:col-span-7 space-y-6 text-left">
            
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

          {/* Right Column: Hero Visual with Developer, Code Snippet, Tech Column & Badges (5 Cols) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            
            <div
              ref={heroImageContainerRef}
              className="relative w-full max-w-[460px] aspect-[4/4.2] sm:aspect-[4/4] rounded-3xl overflow-visible flex items-center justify-center"
            >
              {/* Soft background glow backdrop */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#e6f4f7] via-slate-50 to-[#fff3eb] rounded-3xl -z-10 border border-slate-200/80 shadow-sm" />

              {/* Developer Image */}
              <div className="relative w-[92%] h-[92%] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop"
                  alt="Dunga Technologies Senior Developer"
                  fill
                  priority
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Code Snippet Card (Top Left) */}
              <div
                ref={floatingCodeRef}
                className="absolute -top-4 -left-4 sm:-left-6 bg-[#0f172a]/95 text-white p-3 rounded-2xl shadow-xl border border-slate-700/80 backdrop-blur-md max-w-[210px] z-20"
              >
                <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-slate-800 text-[10px] text-slate-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="ml-1 text-[9px] text-slate-400">solution.ts</span>
                </div>
                <p className="text-[11px] font-mono text-emerald-400 leading-tight">
                  <span className="text-purple-400">const</span> success = <span className="text-cyan-300">useProduct</span>();
                </p>
                <p className="text-[10px] font-mono text-slate-400 mt-1">
                  // Build your idea together 🚀
                </p>
              </div>

              {/* Floating Dedicated Developers Card (Bottom Left) */}
              <div
                ref={floatingDevsRef}
                className="absolute -bottom-4 -left-3 sm:-left-6 bg-white p-3 rounded-2xl shadow-xl border border-slate-200 z-20 flex items-center gap-3"
              >
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden bg-slate-200 relative">
                    <Image
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
                      alt="Developer"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden bg-slate-200 relative">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
                      alt="Developer"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden bg-slate-200 relative">
                    <Image
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop"
                      alt="Developer"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="inline-flex h-8 w-8 rounded-full ring-2 ring-white bg-[#E06527] text-white text-[11px] font-bold items-center justify-center">
                    <Plus className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Dedicated</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Developers</p>
                </div>
              </div>

              {/* Floating Tech Stack Column (Right Edge) */}
              <div
                ref={techStackColumnRef}
                className="absolute -right-3 sm:-right-6 top-6 bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-slate-200 z-20 space-y-2"
              >
                {TECH_PILLS.map((tech, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-semibold transition-all shadow-2xs"
                  >
                    <span className={`w-2 h-2 rounded-full ${tech.iconBg}`} />
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

        {/* Hand-Drawn Annotation "Let's build something amazing!" */}
        <div className="mt-8 pt-4 flex items-center justify-end pr-8 sm:pr-24 text-slate-400 font-mono text-xs italic">
          <span>Let&apos;s build something amazing! ➔</span>
        </div>

      </div>
    </section>
  );
}
