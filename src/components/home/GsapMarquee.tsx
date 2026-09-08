'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ShieldCheck, Zap, Code2, Server, Star, Sparkles, CheckCircle2 } from 'lucide-react';

export function GsapMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  const items = [
    { icon: ShieldCheck, text: '100% Unencrypted Full Source Code' },
    { icon: Zap, text: 'Zero Vendor Lock-in & No Recurring Royalties' },
    { icon: Server, text: 'Optional 24-48h VPS & SSL Deployment' },
    { icon: Star, text: '4.98/5 Average Enterprise Rating' },
    { icon: Code2, text: 'Next.js 15 + FastAPI + PostgreSQL + Docker' },
    { icon: Sparkles, text: 'Lifetime Updates & Free Security Patches' },
    { icon: CheckCircle2, text: 'Instant ZIP Download & Domain License Key' },
  ];

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        xPercent: -50,
        repeat: -1,
        duration: 28,
        ease: 'none',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative overflow-hidden bg-slate-950 py-3 border-y border-slate-800 text-white select-none">
      {/* Left/Right Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      <div ref={marqueeRef} className="flex items-center gap-6 whitespace-nowrap w-max">
        {[...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold text-slate-200 shadow-inner"
            >
              <Icon className="w-3.5 h-3.5 text-[#e06527]" />
              <span>{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
