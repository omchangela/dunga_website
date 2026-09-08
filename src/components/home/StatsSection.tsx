'use client';

import React from 'react';
import { ShieldCheck, Code, Users, Award } from 'lucide-react';

export function StatsSection() {
  const stats = [
    {
      icon: Code,
      value: '45+',
      label: 'Production Software Modules',
      subtext: 'Built with Next.js & modern stacks',
      color: 'text-[#246e7f]',
      bg: 'bg-[#e6f4f7]',
    },
    {
      icon: Users,
      value: '120+',
      label: 'Enterprise Clients Worldwide',
      subtext: 'India, USA, UAE, Singapore & UK',
      color: 'text-[#e06527]',
      bg: 'bg-[#fff3eb]',
    },
    {
      icon: ShieldCheck,
      value: '99.9%',
      label: 'Server Deployment Success Rate',
      subtext: '24-48h turnaround guarantee',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      icon: Award,
      value: '4.95 / 5',
      label: 'Customer Rating Score',
      subtext: 'Based on verified code buyers',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
  ];

  return (
    <section className="bg-slate-50 py-12 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs hover-lift transition-all"
              >
                <div className={`w-11 h-11 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                  {stat.label}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">{stat.subtext}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
