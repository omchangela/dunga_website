'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

const TECH_ITEMS = [
  { name: 'Next.js 15', category: 'Frontend & SSR', tag: 'Expert', bg: 'bg-black text-white' },
  { name: 'React 19', category: 'Web UI', tag: 'Expert', bg: 'bg-sky-950 text-sky-400 border border-sky-800' },
  { name: 'Node.js', category: 'Backend & APIs', tag: 'Expert', bg: 'bg-emerald-950 text-emerald-400 border border-emerald-800' },
  { name: 'Laravel 11', category: 'PHP & Enterprise', tag: 'Advanced', bg: 'bg-red-950 text-red-400 border border-red-800' },
  { name: 'Flutter', category: 'iOS & Android', tag: 'Expert', bg: 'bg-blue-950 text-blue-400 border border-blue-800' },
  { name: 'Python & AI', category: 'RAG & Automation', tag: 'Expert', bg: 'bg-amber-950 text-amber-400 border border-amber-800' },
  { name: 'PostgreSQL', category: 'Database & SQL', tag: 'Expert', bg: 'bg-indigo-950 text-indigo-400 border border-indigo-800' },
  { name: 'AWS & Docker', category: 'Cloud Infrastructure', tag: 'Expert', bg: 'bg-orange-950 text-orange-400 border border-orange-800' },
  { name: 'TypeScript', category: 'Type-Safe Web', tag: 'Expert', bg: 'bg-blue-900 text-blue-300 border border-blue-700' },
  { name: 'Tailwind CSS', category: 'Design Systems', tag: 'Expert', bg: 'bg-teal-950 text-teal-400 border border-teal-800' },
];

export function TechStackShowcase() {
  return (
    <section className="py-20 sm:py-24 bg-white border-b border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#e6f4f7] text-[#246E7F] border border-[#246E7F]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#E06527]" />
            <span>MODERN FULL-STACK CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading leading-tight">
            Engineered with the World&apos;s Best <span className="text-[#246E7F]">Tech Stack</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Our engineers build with battle-tested modern architectures ensuring lightning performance, 99.99% uptime, and clean maintainable code.
          </p>
        </div>

        {/* Tech Icon Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {TECH_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 hover:bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-[#246E7F]/40 transition-all duration-300 flex flex-col justify-between space-y-3 group hover-lift cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shadow-xs ${item.bg}`}>
                  {item.name.charAt(0)}
                </span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {item.tag}
                </span>
              </div>

              <div>
                <div className="text-sm font-extrabold text-slate-900 group-hover:text-[#246E7F] transition-colors font-heading">
                  {item.name}
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  {item.category}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
