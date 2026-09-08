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
} from 'lucide-react';
import { BookDevelopersWidget } from '@/components/developers/BookDevelopersWidget';

export const metadata: Metadata = {
  title: 'Hire Dedicated Developers Hourly — Next.js, Node.js, Flutter, Python & DevOps',
  description:
    'Book pre-vetted senior software engineers starting at ₹999/hr ($15/hr) on flexible hourly or dedicated monthly contracts. Zero recruitment fees and 24-48h onboarding with 100% IP ownership.',
};

export default function HireDevelopersPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-50 via-white to-white py-16 sm:py-20 border-b border-slate-200/80 bg-dot-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#e6f4f7] border border-[#246e7f]/20 text-[#246e7f] text-xs font-bold px-4 py-1 rounded-full shadow-xs">
              <Users className="w-3.5 h-3.5 text-[#e06527]" />
              <span>Dedicated Engineering Squad</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Hire Senior Developers On-Demand by the Hour
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Skip lengthy recruitment cycles. Onboard top 1% senior Next.js, Node.js, Flutter, Python, and DevOps talent within 24-48 hours with transparent hourly timesheets and daily Git commits.
            </p>

            {/* Guarantees */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-700 font-semibold">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Transparent Hourly Rates (₹999 / $15/hr)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#246e7f]" />
                <span>Direct Slack & Jira Communication</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#e06527]" />
                <span>100% IP & Source Code Transfer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Booking Widget */}
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
                    <span>No minimum commitment required</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="text-sm font-bold text-slate-900 mb-3">From ₹999 / $15 per hour</div>
                <Link
                  href="/contact"
                  className="block text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 rounded-xl transition-colors"
                >
                  Book Hourly Engineer
                </Link>
              </div>
            </div>

            {/* Model 2: Dedicated Full-Time (Featured) */}
            <div className="bg-white rounded-3xl p-8 border-2 border-[#246e7f] shadow-xl flex flex-col justify-between space-y-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#246e7f] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </div>

              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#e6f4f7] text-[#246e7f] flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Dedicated Monthly Developer</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A full-time senior engineer (160 hours/month) dedicated 100% exclusively to your product roadmap.
                </p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Full-time 8h/day dedicated allocation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Daily standups & direct Slack collaboration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Zero HR, payroll, or equipment overheads</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="text-sm font-bold text-slate-900 mb-3">From ₹1,20,000 / $1,600 / mo</div>
                <Link
                  href="/contact"
                  className="block text-center bg-[#246e7f] hover:bg-[#1a515e] text-white font-bold text-xs py-2.5 rounded-xl transition-colors shadow-md shadow-[#246e7f]/20"
                >
                  Hire Dedicated Engineer
                </Link>
              </div>
            </div>

            {/* Model 3: Custom Squad / Milestone */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#fff3eb] text-[#e06527] flex items-center justify-center font-bold">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Custom Squad / Fixed Milestone</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Full agile squad (Frontend + Backend + DevOps + QA) managing end-to-end milestone delivery.
                </p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Fixed-price milestone billing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Dedicated Technical Project Manager</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Guaranteed delivery timelines & QA SLA</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="text-sm font-bold text-slate-900 mb-3">Custom Milestone Quotes</div>
                <Link
                  href="/contact"
                  className="block text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 rounded-xl transition-colors"
                >
                  Request Custom Proposal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
