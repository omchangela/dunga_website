'use client';

import React from 'react';
import { Cpu, CheckCircle } from 'lucide-react';

export function TechStackShowcase() {
  const technologies = [
    { name: 'Next.js 15 App Router', category: 'Frontend & SSR' },
    { name: 'TypeScript & React 19', category: 'Type Safety' },
    { name: 'Tailwind CSS v4', category: 'Styling' },
    { name: 'Python FastAPI', category: 'High-Performance APIs' },
    { name: 'Flutter & Dart', category: 'Cross-Platform Mobile' },
    { name: 'PostgreSQL & pgvector', category: 'Relational & AI Vector' },
    { name: 'Docker & Kubernetes', category: 'Cloud Containerization' },
    { name: 'Redis & WebSockets', category: 'Real-time Queues' },
    { name: 'Razorpay & Stripe', category: 'Fintech Billing' },
    { name: 'AWS & Cloudflare', category: 'Infrastructure & CDN' },
  ];

  return (
    <section className="py-14 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#246e7f]">
            Production Architecture
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Engineered With Cutting-Edge Technology Stacks
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {technologies.map((tech, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200/90 rounded-xl p-3.5 text-center hover:bg-white hover:border-[#246e7f]/40 hover:shadow-md transition-all group"
            >
              <div className="text-xs font-bold text-slate-900 group-hover:text-[#246e7f]">
                {tech.name}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">{tech.category}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
