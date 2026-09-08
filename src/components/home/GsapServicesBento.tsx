'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import {
  Code2,
  Server,
  Smartphone,
  Bot,
  Layers,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Database,
  Cloud,
} from 'lucide-react';
import { SERVICES } from '@/data/services';
import { useCurrency } from '@/context/CurrencyContext';

export function GsapServicesBento() {
  const { formatPrice } = useCurrency();

  return (
    <section className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#e6f4f7] border border-[#246e7f]/20 text-[#246e7f] text-xs font-bold px-4 py-1 rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#e06527]" />
            <span>Custom Engineering & Deployments</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            End-to-End Enterprise Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Need custom extensions or bespoke enterprise software? Our full-stack engineering team delivers world-class custom development and cloud architecture.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Custom SaaS Development (Spans 2 cols) */}
          <BentoSpotlightCard className="md:col-span-2 bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#246e7f]/30 to-[#e06527]/20 blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-emerald-400 flex items-center justify-center border border-white/10 backdrop-blur-md">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#e06527]">
                Flagship Custom Service
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Bespoke SaaS & Web Application Development
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Full-cycle architecture from Figma prototyping to production release. Clean multi-tenant database design, RBAC permissions, and payment gateway integration.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {['Next.js 15 App Router', 'FastAPI & Node.js', 'PostgreSQL & Redis', 'Docker & Kubernetes', 'Automated CI/CD', 'SOC-2 Ready'].map((tech) => (
                  <div key={tech} className="flex items-center gap-1.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between relative z-10">
              <div className="text-xs text-slate-400">
                Starting from <strong className="text-white text-sm">₹1,50,000 / $2,000</strong>
              </div>
              <Link
                href="/services/custom-saas-development"
                className="bg-[#246e7f] hover:bg-[#1a515e] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-lg group-hover:translate-x-1"
              >
                <span>Explore Architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </BentoSpotlightCard>

          {/* Card 2: 24-48h Server Setup & VPS Deployment */}
          <BentoSpotlightCard className="bg-slate-50 border border-slate-200 p-8 rounded-3xl flex flex-col justify-between group hover:border-[#246e7f]/40 hover:shadow-xl transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#fff3eb] text-[#e06527] flex items-center justify-center font-bold">
                <Server className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#246e7f]">
                Rapid Deployment
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                24-48h Server & VPS Installation
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Senior DevOps engineers deploy your purchased Dunga script onto your AWS, DigitalOcean, or Contabo VPS with Nginx, SSL, Docker, and automatic backups.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                Fixed ₹999 / $15
              </span>
              <Link
                href="/services/server-setup-installation"
                className="text-xs font-bold text-[#246e7f] hover:underline flex items-center gap-1"
              >
                Book Setup <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </BentoSpotlightCard>

          {/* Card 3: Mobile App Development */}
          <BentoSpotlightCard className="bg-slate-50 border border-slate-200 p-8 rounded-3xl flex flex-col justify-between group hover:border-[#246e7f]/40 hover:shadow-xl transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#e6f4f7] text-[#246e7f] flex items-center justify-center font-bold">
                <Smartphone className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                iOS & Android
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Cross-Platform Mobile Apps
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Native performance using Flutter and React Native. Smooth 60FPS UI, offline caching, push notifications, and App Store / Play Store release handling.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">3-6 Weeks Timeline</span>
              <Link
                href="/services/mobile-app-development"
                className="text-xs font-bold text-[#246e7f] hover:underline flex items-center gap-1"
              >
                Learn More <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </BentoSpotlightCard>

          {/* Card 4: AI & Autonomous Agents (Spans 2 cols) */}
          <BentoSpotlightCard className="md:col-span-2 bg-gradient-to-br from-[#246e7f] to-[#1a515e] text-white p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between group">
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/15 text-amber-300 flex items-center justify-center border border-white/20 backdrop-blur-md">
                <Bot className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Generative AI Engineering
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Enterprise AI, LLM RAG & Autonomous Agents
              </h3>
              <p className="text-xs sm:text-sm text-slate-100 max-w-xl leading-relaxed">
                Connect your enterprise databases to custom fine-tuned models with pgvector, Pinecone, and LangChain. Build autonomous customer support and automated document parsing workflows.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/20 flex items-center justify-between relative z-10">
              <span className="text-xs text-slate-200">Zero Hallucination Architecture</span>
              <Link
                href="/services/ai-workflow-automation"
                className="bg-white text-[#246e7f] hover:bg-slate-100 font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-lg group-hover:translate-x-1"
              >
                <span>View AI Solutions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </BentoSpotlightCard>
        </div>
      </div>
    </section>
  );
}

function BentoSpotlightCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
