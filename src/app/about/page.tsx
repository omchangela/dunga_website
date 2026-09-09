import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Code2,
  Users,
  Award,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Headphones,
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { ThreeDIcon } from '@/components/ui/ThreeDIcon';

export const metadata: Metadata = {
  title: 'About Us — Engineering Culture & Mission | Dunga Technologies',
  description:
    'Learn about Dunga Technologies, our software philosophy, leadership, and mission to deliver enterprise software and proprietary source code with zero vendor lock-in.',
};

export default function AboutPage() {
  const leadership = [
    {
      name: 'Om Dunga',
      role: 'Founder & Chief Technology Officer',
      bio: 'Visionary software engineer and architect dedicated to crafting high-performance enterprise systems and developer-first SaaS products.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    },
    {
      name: 'Lead Cloud Architect',
      role: 'DevOps & Distributed Systems',
      bio: 'Expert in Kubernetes, high-concurrency microservices, and automated 24-48h zero-downtime server deployments.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    },
    {
      name: 'Lead Solutions Architect',
      role: 'Full-Stack & AI Systems',
      bio: 'Specialist in Next.js App Router, React 19, FastAPI, and complex CRM database orchestration.',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    },
  ];

  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen py-12 sm:py-20 relative overflow-hidden">
      
      {/* Background Dot Pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* About Hero */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200/90 shadow-sm space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#e6f4f7] border border-[#246e7f]/20 text-[#246e7f] text-xs font-bold px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#E06527]" />
            <span>OUR MISSION & PHILOSOPHY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight font-heading leading-tight max-w-4xl">
            Engineering Enterprise Software With <span className="text-[#246E7F]">100% Source Code Ownership.</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed font-normal">
            Founded with a conviction that modern businesses shouldn&apos;t be trapped in perpetual per-user subscription lock-ins, <strong>Dunga Technologies</strong> creates production-grade in-house software scripts and provides pre-vetted senior software engineers on demand.
          </p>

          <div className="pt-3">
            <Logo size="lg" href="/" />
          </div>
        </div>

        {/* Company Core Values with 3D Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm hover-lift space-y-4">
            <div className="animate-float-slow">
              <ThreeDIcon name="code" size={54} />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 font-heading">100% Unencrypted Source Code</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              We never ship obfuscated or compiled black-box code. You receive full Next.js, Node.js, and database schemas with complete freedom to self-host and customize.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm hover-lift space-y-4">
            <div className="animate-float-slow" style={{ animationDelay: '0.3s' }}>
              <ThreeDIcon name="zap" size={54} />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 font-heading">24-48h Fast Deployment</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Our in-house senior engineers take care of deploying software packages to your VPS or cloud host with SSL configuration, saving you weeks of setup time.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm hover-lift space-y-4">
            <div className="animate-float-slow" style={{ animationDelay: '0.6s' }}>
              <ThreeDIcon name="shield" size={54} />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 font-heading">Lifetime Updates & Support</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Every source license comes with lifetime access to code updates, security patches, and dedicated engineering assistance whenever you need it.
            </p>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">Leadership & Engineering Core</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Meet the architects behind the Dunga Technologies engineering ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((member, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-7 border border-slate-200 text-center space-y-3 hover-lift">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-[#246e7f]/30 shadow-xs"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">{member.name}</h3>
                  <p className="text-xs font-semibold text-[#246e7f]">{member.role}</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-slate-950 via-[#133c46] to-[#e06527] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div className="space-y-2">
            <h3 className="text-2xl font-black font-heading">Interested in Partnering With Us?</h3>
            <p className="text-xs sm:text-sm text-teal-100/90 max-w-xl">
              Contact our sales engineering team in Rajkot, India or schedule a scoping call to discuss your software architecture.
            </p>
          </div>

          <Link
            href="/contact"
            className="bg-white text-slate-900 hover:bg-slate-100 text-xs sm:text-sm font-extrabold px-7 py-4 rounded-xl shadow-md transition-all shrink-0 hover:scale-105"
          >
            Get In Touch Today
          </Link>
        </div>
      </div>
    </div>
  );
}
