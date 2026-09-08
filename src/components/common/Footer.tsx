'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Download,
  Star,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Globe,
  Users,
  Building2,
  Sparkles,
} from 'lucide-react';
import { Logo } from './Logo';
import { PRODUCTS } from '@/data/products';
import { SERVICES } from '@/data/services';
import { BRANCH_LOCATIONS } from '@/data/branches';

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setIsSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-700">
      {/* Trust Badges Strip */}
      <div className="border-b border-slate-200/80 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-[#e6f4f7] text-[#246e7f] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">100% Full Source Code</h4>
                <p className="text-[11px] text-slate-500">Zero vendor lock-in or seat fees</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-[#fff3eb] text-[#e06527] flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Hire Dedicated Developers</h4>
                <p className="text-[11px] text-slate-500">Hourly from ₹999 / $15 per hour</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">24-48h Script Installation</h4>
                <p className="text-[11px] text-slate-500">CodeCanyon & custom server setup</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 fill-amber-500" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">4.98 / 5 Rating</h4>
                <p className="text-[11px] text-slate-500">From 150+ enterprise clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Col 1: Company Info & Newsletter (Spans 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="lg" href="/" />
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              Dunga Technologies is an engineering-first software enterprise providing on-demand developer hiring, in-house source code suites, CodeCanyon server installations, custom application development, and 24/7 technical maintenance across India and the UAE.
            </p>

            <div className="pt-2">
              <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Subscribe to Product Updates & Discount Codes
              </h5>
              {isSubscribed ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Thank you! You will receive our next release updates.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Enter your work email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
                  />
                  <button
                    type="submit"
                    className="bg-[#246e7f] hover:bg-[#1a515e] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-1 flex-shrink-0"
                  >
                    Join <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#e06527] hover:bg-[#c9561c] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Request Custom Solutions</span>
              </Link>
            </div>
          </div>

          {/* Col 2: In-House Code Marketplace (Spans 2.5 cols) */}
          <div className="lg:col-span-2">
            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Ready-Made Source Code
            </h5>
            <ul className="space-y-2 text-xs">
              {PRODUCTS.map((prod) => (
                <li key={prod.id}>
                  <Link
                    href={`/products/${prod.slug}`}
                    className="text-slate-600 hover:text-[#246e7f] transition-colors flex items-center justify-between group"
                  >
                    <span className="line-clamp-1">{prod.title}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/products"
                  className="text-[#246e7f] font-bold hover:underline inline-flex items-center gap-1"
                >
                  Browse Full Catalog →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Core Focused Services (Spans 3 cols) */}
          <div className="lg:col-span-3">
            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Core Services & Talent
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/hire-developers" className="text-[#e06527] font-bold hover:underline flex items-center gap-1">
                  <span>★ Hire Dedicated Developers (Hourly)</span>
                </Link>
              </li>
              <li>
                <Link href="/services/codecanyon-script-installation" className="text-slate-600 hover:text-[#246e7f] transition-colors">
                  Code & Script Installation (CodeCanyon)
                </Link>
              </li>
              <li>
                <Link href="/services/custom-application-development" className="text-slate-600 hover:text-[#246e7f] transition-colors">
                  Custom Application Development
                </Link>
              </li>
              <li>
                <Link href="/services/tech-consultancy" className="text-slate-600 hover:text-[#246e7f] transition-colors">
                  Tech Consultancy & Architecture
                </Link>
              </li>
              <li>
                <Link href="/services/technical-maintenance-amc" className="text-slate-600 hover:text-[#246e7f] transition-colors">
                  Technical Maintenance & AMC Retainers
                </Link>
              </li>
              <li>
                <Link href="/services/bug-fixing-optimization" className="text-slate-600 hover:text-[#246e7f] transition-colors">
                  Emergency Bug Fixing & Speed Tuning
                </Link>
              </li>
              <li>
                <Link href="/project-estimation" className="text-[#246e7f] font-bold hover:underline flex items-center gap-1">
                  <span>Instant Project Estimator →</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Multiple Branch Locations (Spans 3 cols) */}
          <div className="lg:col-span-3">
            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#246e7f]" />
              <span>Multiple Branch Locations</span>
            </h5>
            <div className="space-y-3 text-xs text-slate-600">
              {BRANCH_LOCATIONS.map((branch) => (
                <div key={branch.id} className="border-b border-slate-200/80 pb-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 font-bold">{branch.city}, {branch.country}</strong>
                    <span className="text-[10px] bg-slate-200/70 text-slate-700 px-1.5 py-0.2 rounded">
                      {branch.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{branch.address}</p>
                  <div className="text-[11px] text-[#246e7f] font-mono mt-0.5">
                    {branch.phone}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Dunga Technologies Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-slate-900 transition-colors">
              About Us & Branches
            </Link>
            <Link href="/hire-developers" className="hover:text-slate-900 transition-colors">
              Hire Developers
            </Link>
            <Link href="/project-estimation" className="hover:text-slate-900 transition-colors">
              Cost Estimator
            </Link>
            <Link href="/account" className="hover:text-slate-900 transition-colors">
              Client Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
