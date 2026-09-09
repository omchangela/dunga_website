'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Star } from 'lucide-react';

export function GsapStats() {
  const containerRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      value: 500,
      suffix: '+',
      label: 'Happy Clients',
      isRating: false,
    },
    {
      value: 1200,
      suffix: '+',
      label: 'Projects Delivered',
      isRating: false,
    },
    {
      value: 50,
      suffix: '+',
      label: 'Expert Developers',
      isRating: false,
    },
    {
      value: 4.9,
      suffix: '/5',
      label: 'Client Satisfaction',
      isRating: true,
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    const counters = containerRef.current.querySelectorAll('.stat-counter');

    counters.forEach((counter) => {
      const target = parseFloat(counter.getAttribute('data-target') || '0');
      const isDecimal = target % 1 !== 0;
      const obj = { val: 0 };

      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
          counter.textContent = isDecimal ? obj.val.toFixed(1) : Math.floor(obj.val).toString();
        },
      });
    });
  }, []);

  return (
    <section ref={containerRef} className="py-12 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Eyebrow */}
        <div className="text-center">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            TRUSTED BY STARTUPS, SMES & ENTERPRISES
          </span>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-baseline justify-center gap-0.5">
                <span
                  className="stat-counter text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight"
                  data-target={stat.value}
                >
                  0
                </span>
                <span className="text-2xl sm:text-3xl font-black text-[#246E7F]">
                  {stat.suffix}
                </span>
              </div>

              {stat.isRating && (
                <div className="flex items-center justify-center gap-1 text-amber-400 py-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              )}

              <p className="text-xs sm:text-sm font-semibold text-slate-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
