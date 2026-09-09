import React from 'react';
import { Sparkles } from 'lucide-react';
import { TechBrandIcon } from '@/components/ui/TechBrandIcons';

const TECH_ITEMS = [
  { name: 'Next.js 15', iconKey: 'next', category: 'Frontend & SSR', tag: 'Expert', iconBg: 'bg-black text-white p-2' },
  { name: 'React 19', iconKey: 'react', category: 'Web UI', tag: 'Expert', iconBg: 'bg-[#0f172a] p-2' },
  { name: 'Node.js', iconKey: 'node', category: 'Backend & APIs', tag: 'Expert', iconBg: 'bg-[#052e16] p-2' },
  { name: 'Laravel 11', iconKey: 'laravel', category: 'PHP & Enterprise', tag: 'Advanced', iconBg: 'bg-[#450a0a] p-2' },
  { name: 'Flutter', iconKey: 'flutter', category: 'iOS & Android', tag: 'Expert', iconBg: 'bg-[#082f49] p-2' },
  { name: 'Python & AI', iconKey: 'python', category: 'RAG & Automation', tag: 'Expert', iconBg: 'bg-[#1e293b] p-2' },
  { name: 'PostgreSQL', iconKey: 'postgres', category: 'Database & SQL', tag: 'Expert', iconBg: 'bg-[#0c4a6e] p-2' },
  { name: 'AWS & Docker', iconKey: 'aws', category: 'Cloud Infrastructure', tag: 'Expert', iconBg: 'bg-[#1c1917] p-2' },
  { name: 'TypeScript', iconKey: 'typescript', category: 'Type-Safe Web', tag: 'Expert', iconBg: 'bg-[#1e3a8a] p-2' },
  { name: 'Tailwind CSS', iconKey: 'tailwind', category: 'Design Systems', tag: 'Expert', iconBg: 'bg-[#083344] p-2' },
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
              className="bg-slate-50 hover:bg-white p-4.5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-[#246E7F]/40 transition-all duration-300 flex flex-col justify-between space-y-3.5 group hover-lift cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xs border border-slate-200/60 bg-white group-hover:scale-110 transition-transform duration-300`}>
                  <TechBrandIcon name={item.iconKey} className="w-6 h-6 object-contain" />
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/80">
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
