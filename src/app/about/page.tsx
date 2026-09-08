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

export const metadata: Metadata = {
  title: 'About Us — Engineering Culture & Mission | Dunga Technologies',
  description:
    'Learn about Dunga Technologies, our software philosophy, leadership, and mission to deliver enterprise software and proprietary source code with zero vendor lock-in.',
};

export default function AboutPage() {
  const leadership = [
    {
      name: 'Om Dunga',
      role: 'Founder & Chief Executive Officer',
      bio: 'Visionary software engineer and architect dedicated to crafting high-performance enterprise systems and developer-first SaaS products.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    },
    {
      name: 'Arjun Nair',
      role: 'Head of Cloud & DevOps Architecture',
      bio: 'Expert in Kubernetes, high-concurrency microservices, and automated 24-48h zero-downtime server deployments.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    },
    {
      name: 'Priyanka Sen',
      role: 'Lead Full-Stack Engineer',
      bio: 'Specialist in Next.js App Router, React 19, FastAPI, and complex CRM database orchestration.',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* About Hero */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200 shadow-xs space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#e6f4f7] border border-[#246e7f]/20 text-[#246e7f] text-xs font-bold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Company Story</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight max-w-3xl leading-tight">
            Engineering Enterprise Software With Complete Source Code Ownership.
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Founded with a conviction that modern businesses shouldn&apos;t be trapped in perpetual per-user subscription lock-ins, <strong>Dunga Technologies</strong> creates production-grade in-house software scripts and offers enterprise engineering services.
          </p>

          <div className="pt-2">
            <Logo size="lg" href="/" />
          </div>
        </div>

        {/* Company Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#e6f4f7] text-[#246e7f] flex items-center justify-center font-bold">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">100% Unencrypted Code</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We never ship obfuscated or compiled black-box code. You receive full Next.js, FastAPI, and database schemas with complete freedom to scale.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#fff3eb] text-[#e06527] flex items-center justify-center font-bold">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">24-48h Server Deployment</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our in-house senior engineers take care of deploying software packages to your VPS or cloud host with SSL configuration, saving you weeks of setup.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Lifetime Updates & Support</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every source license comes with lifetime access to minor updates, patches, and dedicated engineering support.
            </p>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Leadership & Engineering Core</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Meet the architects behind Dunga Technologies software ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((member, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center space-y-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-[#246e7f]/30"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{member.name}</h3>
                  <p className="text-[11px] font-semibold text-[#246e7f]">{member.role}</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#1e5b6a] to-[#246e7f] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold">Interested in Partnering With Us?</h3>
            <p className="text-xs sm:text-sm text-white/80 mt-1">
              Contact our sales engineering team to discuss customized software solutions.
            </p>
          </div>

          <Link
            href="/contact"
            className="bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold px-6 py-3.5 rounded-xl shadow-xs transition-colors flex-shrink-0"
          >
            Get In Touch Today
          </Link>
        </div>
      </div>
    </div>
  );
}
