'use client';

import React from 'react';

const TECH_ITEMS = [
  { name: 'Next.js', color: 'bg-black text-white', icon: 'N' },
  { name: 'Laravel', color: 'bg-red-500 text-white', icon: 'L' },
  { name: 'React', color: 'bg-cyan-500 text-white', icon: 'R' },
  { name: 'Node.js', color: 'bg-emerald-600 text-white', icon: 'N' },
  { name: 'Flutter', color: 'bg-sky-500 text-white', icon: 'F' },
  { name: 'Vue.js', color: 'bg-emerald-500 text-white', icon: 'V' },
  { name: 'Python', color: 'bg-yellow-500 text-white', icon: 'P' },
  { name: 'PHP', color: 'bg-indigo-600 text-white', icon: 'PHP' },
  { name: 'WordPress', color: 'bg-blue-600 text-white', icon: 'W' },
  { name: 'More...', color: 'bg-slate-800 text-white', icon: '•••' },
];

export function TechStackShowcase() {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#e6f4f7] text-[#246E7F] border border-[#246E7F]/20">
            <span>TECH STACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            We Work With the Best Technologies
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Our developers are skilled in modern and in-demand technologies to deliver high-performance solutions.
          </p>
        </div>

        {/* Tech Icon Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {TECH_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shadow-md border border-slate-200 group-hover:scale-110 transition-transform duration-300 ${item.color}`}
              >
                {item.icon}
              </div>
              <span className="text-xs font-semibold text-slate-700 group-hover:text-[#246E7F] transition-colors">
                {item.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
