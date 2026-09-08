'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import {
  Code2,
  Server,
  ShieldCheck,
  Star,
  Users,
  Zap,
  Globe2,
  Headphones,
} from 'lucide-react';

export function GsapStats() {
  const containerRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      value: 50,
      suffix: '+',
      label: 'In-House Codebases',
      sublabel: 'CRM, SaaS, Fintech & Mobile',
      icon: Code2,
      color: 'text-[#246e7f]',
      bg: 'bg-[#e6f4f7]',
    },
    {
      value: 100,
      suffix: '%',
      label: 'Unencrypted Source Code',
      sublabel: 'Full ownership & zero lock-in',
      icon: ShieldCheck,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      value: 48,
      prefix: '<',
      suffix: 'h',
      label: 'Server Setup SLA',
      sublabel: 'Senior DevOps deployment',
      icon: Server,
      color: 'text-[#e06527]',
      bg: 'bg-[#fff3eb]',
    },
    {
      value: 99,
      suffix: '.9%',
      label: 'Customer Satisfaction',
      sublabel: '4.98★ Average rating from 150+ clients',
      icon: Star,
      color: 'text-amber-500',
      bg: 'bg-amber-50',
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    const counters = containerRef.current.querySelectorAll('.stat-counter');

    counters.forEach((counter) => {
      const target = Number(counter.getAttribute('data-target') || 0);
      const obj = { val: 0 };

      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
          counter.textContent = Math.floor(obj.val).toString();
        },
      });
    });
  }, []);

  return (
    <section ref={containerRef} className="py-12 sm:py-16 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center font-bold`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    VERIFIED
                  </span>
                </div>

                <div>
                  <div className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-baseline gap-0.5">
                    {stat.prefix && <span>{stat.prefix}</span>}
                    <span className="stat-counter" data-target={stat.value}>
                      {stat.value}
                    </span>
                    <span className={stat.color}>{stat.suffix}</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">{stat.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{stat.sublabel}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
