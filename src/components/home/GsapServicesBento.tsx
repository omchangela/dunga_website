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
  Users,
  Wrench,
  Calculator,
  Zap,
  Clock,
} from 'lucide-react';
import { SERVICES } from '@/data/services';
import { useCurrency } from '@/context/CurrencyContext';

export function GsapServicesBento() {
  const { formatPrice } = useCurrency();

  return (
    <section className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#e6f4f7] border border-[#246e7f]/20 text-[#246e7f] text-xs font-bold px-4 py-1 rounded-full shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#e06527]" />
              <span>Full-Spectrum Software Engineering</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Our Core Services & Solutions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              From on-demand developer hiring to ready-made code suites, script installations, and technical maintenance — we cover your entire product lifecycle.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#e06527] hover:bg-[#c9561c] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-[#e06527]/20 flex-shrink-0"
            >
              <span>Request Custom Solutions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 7 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Service 1: Hire Dedicated Developers (Hourly) */}
          <BentoSpotlightCard className="bg-gradient-to-br from-slate-950 to-slate-900 text-white p-7 rounded-3xl flex flex-col justify-between group shadow-xl border border-slate-800">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-amber-400 flex items-center justify-center font-bold border border-white/10">
                  <Users className="w-6 h-6" />
                </div>
                <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-400/30">
                  Hourly / Dedicated
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#e06527] font-bold uppercase tracking-wider block mb-1">
                  1. Dedicated Talent
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  Hire Dedicated Developers
                </h3>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  Book pre-vetted senior Next.js, Node.js, Flutter, Python, and DevOps talent starting at <strong>₹999 / $15 per hour</strong> with 24-48h onboarding.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Direct Slack/Jira integration</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Daily Git commits & transparent timesheets</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-400">
                From <strong className="text-white text-sm">₹999 / $15 / hr</strong>
              </div>
              <Link
                href="/hire-developers"
                className="bg-[#246e7f] hover:bg-[#1a515e] text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1 group-hover:translate-x-1"
              >
                <span>Book Hourly</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </BentoSpotlightCard>

          {/* Service 2: Ready-Made Code Solutions */}
          <BentoSpotlightCard className="bg-white border border-slate-200/90 p-7 rounded-3xl flex flex-col justify-between group hover:border-[#246e7f]/40 hover:shadow-xl transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#e6f4f7] text-[#246e7f] flex items-center justify-center font-bold">
                  <Code2 className="w-6 h-6" />
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full">
                  100% Unencrypted
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#246e7f] font-bold uppercase tracking-wider block mb-1">
                  2. In-House Marketplace
                </span>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#246e7f] transition-colors">
                  Ready-Made Code Solutions
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Turnkey CRM platforms, payment gateway routers, and AI SaaS codebases with lifetime updates and zero per-seat subscription overheads.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Instant ZIP Download & DB schema</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Optional 24-48h senior server setup</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                From <strong className="text-slate-900 text-sm">₹2,499 / $39</strong>
              </div>
              <Link
                href="/products"
                className="text-xs font-bold text-[#246e7f] hover:underline flex items-center gap-1"
              >
                Browse Code <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </BentoSpotlightCard>

          {/* Service 3: Code & Script Installation / CodeCanyon Setup */}
          <BentoSpotlightCard className="bg-white border border-slate-200/90 p-7 rounded-3xl flex flex-col justify-between group hover:border-[#246e7f]/40 hover:shadow-xl transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#fff3eb] text-[#e06527] flex items-center justify-center font-bold">
                  <Server className="w-6 h-6" />
                </div>
                <span className="bg-[#fff3eb] text-[#e06527] border border-[#fbd8c4] text-[10px] font-bold px-2.5 py-1 rounded-full">
                  24-48h SLA
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#e06527] font-bold uppercase tracking-wider block mb-1">
                  3. Deployment Services
                </span>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#246e7f] transition-colors">
                  Code & Script Installation
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Bought a script from CodeCanyon, GitHub, or an external developer? Our DevOps team configures your VPS, SSL, Nginx, and database seamlessly.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>AWS, DigitalOcean, Contabo, cPanel</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Free SSL & SMTP email testing</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                Fixed ₹999 / $15
              </span>
              <Link
                href="/services/codecanyon-script-installation"
                className="text-xs font-bold text-[#246e7f] hover:underline flex items-center gap-1"
              >
                Book Setup <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </BentoSpotlightCard>

          {/* Service 4: Tech Consultancy & Architecture */}
          <BentoSpotlightCard className="bg-white border border-slate-200/90 p-7 rounded-3xl flex flex-col justify-between group hover:border-[#246e7f]/40 hover:shadow-xl transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
                  Architecture Audit
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-indigo-600 font-bold uppercase tracking-wider block mb-1">
                  4. Advisory & Strategy
                </span>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#246e7f] transition-colors">
                  Tech Consultancy & Scaling
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Strategic architecture reviews, database query indexing, security audits, and cloud cost reduction to prevent downtime and scale cleanly.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Cut cloud hosting bills by up to 40%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>High-concurrency roadmap design</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                From <strong className="text-slate-900 text-sm">₹25,000 / $349</strong>
              </div>
              <Link
                href="/services/tech-consultancy"
                className="text-xs font-bold text-[#246e7f] hover:underline flex items-center gap-1"
              >
                Learn More <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </BentoSpotlightCard>

          {/* Service 5: Technical Maintenance & AMC */}
          <BentoSpotlightCard className="bg-white border border-slate-200/90 p-7 rounded-3xl flex flex-col justify-between group hover:border-[#246e7f]/40 hover:shadow-xl transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full">
                  Monthly Retainer
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-wider block mb-1">
                  5. Continuous Care
                </span>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#246e7f] transition-colors">
                  Technical Maintenance & AMC
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  24/7 server uptime telemetry, security patch releases, daily automated backups, and guaranteed priority emergency support channels.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>24/7 Proactive health monitoring</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Guaranteed 99.9% application uptime</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                From <strong className="text-slate-900 text-sm">₹15,000 / $199 / mo</strong>
              </div>
              <Link
                href="/services/technical-maintenance-amc"
                className="text-xs font-bold text-[#246e7f] hover:underline flex items-center gap-1"
              >
                View Plans <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </BentoSpotlightCard>

          {/* Service 6: Emergency Bug Fixing & Optimization */}
          <BentoSpotlightCard className="bg-white border border-slate-200/90 p-7 rounded-3xl flex flex-col justify-between group hover:border-[#246e7f]/40 hover:shadow-xl transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="bg-rose-50 text-rose-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
                  Emergency 4-24h
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-rose-600 font-bold uppercase tracking-wider block mb-1">
                  6. Rapid On-Demand
                </span>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#246e7f] transition-colors">
                  Bug Fixing & Speed Tuning
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Resolve fatal crashes, payment webhook failures, JavaScript errors, slow SQL queries, and Core Web Vitals bottlenecks within hours.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Immediate root-cause diagnosis</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Sub-second page speed optimization</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                From <strong className="text-slate-900 text-sm">₹1,499 / $25</strong>
              </div>
              <Link
                href="/services/bug-fixing-optimization"
                className="text-xs font-bold text-[#246e7f] hover:underline flex items-center gap-1"
              >
                Fix a Bug <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </BentoSpotlightCard>

          {/* Service 7: Custom Application Development (Full Span) */}
          <BentoSpotlightCard className="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-[#246e7f] via-[#1a515e] to-[#0f172a] text-white p-8 sm:p-10 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="space-y-4 max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-white/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Custom Application Engineering</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Need a Bespoke Digital Platform Built from Scratch?
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                We engineer tailor-made web applications, mobile apps, and enterprise SaaS systems from interactive Figma wireframes to cloud release with 100% intellectual property transfer.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-200">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Next.js 15 & Node/FastAPI</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Cross-Platform Flutter Mobile</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Automated CI/CD & Cloud SLA</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto relative z-10 flex-shrink-0">
              <Link
                href="/project-estimation"
                className="bg-[#e06527] hover:bg-[#c9561c] text-white text-center font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl transition-all shadow-lg shadow-[#e06527]/30 flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                <span>Instant Project Estimator</span>
              </Link>
              <Link
                href="/contact"
                className="bg-white/10 hover:bg-white/20 text-white text-center font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl transition-all border border-white/20 flex items-center justify-center gap-2"
              >
                <span>Request Custom Solutions</span>
                <ArrowRight className="w-4 h-4" />
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
