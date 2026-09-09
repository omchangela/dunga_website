import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import {
  Users,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Clock,
  Code2,
  Headphones,
  ArrowRight,
  Star,
  Globe2,
  Calendar,
  Briefcase,
  Layers,
  HelpCircle
} from 'lucide-react';
import { HireDevelopersDirectory } from '@/components/developers/HireDevelopersDirectory';
import { BookDevelopersWidget } from '@/components/developers/BookDevelopersWidget';

export const metadata: Metadata = {
  title: 'Hire Verified Developers On-Demand — Next.js, React, Node.js, Python, Flutter | Dunga Technologies',
  description:
    'Hire pre-vetted senior software engineers starting at transparent hourly rates. View hire-ready profiles, skill proficiencies, GitHub code history, and request similar developers with 1-week risk-free trial.',
};

export default function HireDevelopersPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-50 via-white to-white py-16 sm:py-20 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#e6f4f7] border border-[#246e7f]/20 text-[#246e7f] text-xs font-bold px-4 py-1 rounded-full shadow-xs">
              <Users className="w-3.5 h-3.5 text-[#e06527]" />
              <span>Hire-Ready Developer Profiles</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Hire Top 1% Senior Developers On-Demand
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              No guesswork or lengthy recruitment. Browse verified engineering profiles with transparent rates, assessed skill proficiency levels, and instant onboarding with a 1-week risk-free trial.
            </p>

            {/* Quick Badges */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-700 font-semibold">
              <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Transparent Hourly & Monthly Rates</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#246e7f]" />
                <span>100% Skills Assessed & Verified</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs">
                <Zap className="w-4 h-4 text-[#e06527]" />
                <span>24–48h Fast Onboarding</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Developer Directory with Search, Multi-Filters, and Cards */}
      <HireDevelopersDirectory />

      {/* Interactive Booking Calculator / Custom Squad Request */}
      <BookDevelopersWidget />

      {/* Engagement Models Comparison */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#246e7f]">
              Flexible Hiring Models
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Choose the Engagement That Fits Your Velocity
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Switch engagement models anytime as your project requirements evolve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Model 1: Hourly Sprint */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Hourly Flex Booking</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Best for quick feature implementations, bug fixes, third-party API integrations, and code reviews.
                </p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Pay only for tracked working hours</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Detailed weekly timesheet reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Direct WhatsApp/Slack chat with developer</span>
                  </li>
                </ul>
              </div>
              <a
                href="#developer-directory"
                className="w-full py-2.5 text-center text-xs font-bold text-[#246e7f] bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
              >
                Browse Hourly Developers
              </a>
            </div>

            {/* Model 2: Dedicated Full-Time (Popular) */}
            <div className="bg-white rounded-3xl p-8 border-2 border-[#246e7f] shadow-lg relative flex flex-col justify-between space-y-6">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#246e7f] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-sm tracking-wider">
                Most Popular for Startups
              </div>
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#e6f4f7] text-[#246e7f] flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Dedicated Full-Time Dev</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A full-time engineer (160 hours/month) dedicated solely to your product, joining your daily standups and sprint planning.
                </p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#246e7f]" />
                    <span>160 hours/month dedicated focus</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#246e7f]" />
                    <span>Overlaps with your preferred time zone</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#246e7f]" />
                    <span>Free backup engineer replacement guarantee</span>
                  </li>
                </ul>
              </div>
              <a
                href="#developer-directory"
                className="w-full py-2.5 text-center text-xs font-bold text-white bg-[#246e7f] hover:bg-[#1b5563] rounded-xl shadow transition-all"
              >
                Hire Dedicated Developer
              </a>
            </div>

            {/* Model 3: Fixed Project Scope */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#fff3eb] text-[#e06527] flex items-center justify-center font-bold">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Fixed-Price Milestone</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ideal for turnkey application builds, MVP launches, or complete refactors with clearly defined specifications.
                </p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Fixed timeline and guaranteed milestones</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Includes QA testing and deployment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>30 days complimentary post-launch support</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/contact"
                className="w-full py-2.5 text-center text-xs font-bold text-[#e06527] bg-[#fff3eb] hover:bg-[#ffe6d6] rounded-xl border border-[#e06527]/20 transition-colors"
              >
                Request Custom Scope Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hiring Process / 4 Step Workflow */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#246e7f]">
              Frictionless Hiring
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              How You Onboard in Under 48 Hours
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Four simple steps from selecting your developer profile to pushing the first commit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative">
              <span className="text-3xl font-black text-[#246e7f]/20">01</span>
              <h4 className="text-sm font-bold text-slate-900">Select Profile / Post Needs</h4>
              <p className="text-xs text-slate-600">
                Choose an available developer profile or submit your stack requirements for a tailored match.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative">
              <span className="text-3xl font-black text-[#246e7f]/20">02</span>
              <h4 className="text-sm font-bold text-slate-900">30-Min Tech Alignment Call</h4>
              <p className="text-xs text-slate-600">
                Meet the developer directly on Google Meet or Zoom to discuss your architecture, codebase, and goals.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative">
              <span className="text-3xl font-black text-[#246e7f]/20">03</span>
              <h4 className="text-sm font-bold text-slate-900">1-Week Risk-Free Trial</h4>
              <p className="text-xs text-slate-600">
                Start working immediately. If you are not 100% satisfied during the first 7 days, pay $0.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative">
              <span className="text-3xl font-black text-[#246e7f]/20">04</span>
              <h4 className="text-sm font-bold text-slate-900">Scale & Sprint Seamlessly</h4>
              <p className="text-xs text-slate-600">
                Developer pushes daily commits to your Git repo, joins standups, and scales with your backlog.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Everything you need to know about hiring dedicated developers with Dunga Technologies.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#246e7f]" />
                How does the 1-week risk-free trial work?
              </h4>
              <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                When you hire an engineer on a dedicated or hourly model, the first 7 calendar days serve as a trial sprint. If you find the developer does not meet your expectations, you can cancel without any lock-in or notice period.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#246e7f]" />
                Who owns the code and intellectual property?
              </h4>
              <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                You retain 100% intellectual property rights, source code ownership, and database control. All commits are made directly to your private GitHub/GitLab repositories under signed NDA agreements.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#246e7f]" />
                Can I switch developers or request a replacement?
              </h4>
              <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                Yes. If your project requirements shift (e.g. from frontend Next.js to backend Python/DevOps) or you need an alternative developer, our tech team transitions a qualified engineer within 48 hours with full handover.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#246e7f]" />
                How are hourly timesheets tracked?
              </h4>
              <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                We provide transparent time-tracking logs with commit links, daily task notes, and weekly summaries. You only pay for productive engineering hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
