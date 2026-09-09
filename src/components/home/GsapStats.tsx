'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Star } from 'lucide-react';
import { ThreeDIcon, ThreeDIconType } from '@/components/ui/ThreeDIcon';

export function GsapStats() {
  const containerRef = useRef<HTMLDivElement>(null);

  const stats: {
    value: number;
    suffix: string;
    label: string;
    isRating: boolean;
    icon: ThreeDIconType;
  }[] = [
    {
      value: 500,
      suffix: '+',
      label: 'Happy Global Clients',
      isRating: false,
      icon: 'users',
    },
    {
      value: 1200,
      suffix: '+',
      label: 'Projects Delivered',
      isRating: false,
      icon: 'rocket',
    },
    {
      value: 50,
      suffix: '+',
      label: 'Expert Developers',
      isRating: false,
      icon: 'code',
    },
    {
      value: 4.9,
      suffix: '/5',
      label: 'Client Satisfaction',
      isRating: true,
      icon: 'trophy',
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
    <section ref={containerRef} className="py-14 bg-gradient-to-b from-white via-slate-50/50 to-white border-y border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        
        {/* Eyebrow */}
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#246E7F] bg-[#e6f4f7] px-4 py-1.5 rounded-full border border-[#246E7F]/15">
            TRUSTED BY 500+ STARTUPS, SMES & ENTERPRISES GLOBALLY
          </span>
        </div>

        {/* 4 Stats Grid with 3D Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover-lift text-center space-y-3 flex flex-col items-center justify-between"
            >
              <div className="animate-float-slow" style={{ animationDelay: `${idx * 0.4}s` }}>
                <ThreeDIcon name={stat.icon} size={52} />
              </div>

              <div className="space-y-1 w-full">
                <div className="flex items-baseline justify-center gap-0.5">
                  <span
                    className="stat-counter text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading"
                    data-target={stat.value}
                  >
                    0
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#246E7F] font-heading">
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
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
