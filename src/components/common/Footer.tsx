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
  ExternalLink,
  Globe,
  Share2,
} from 'lucide-react';
import { Logo } from './Logo';
import { PRODUCTS } from '@/data/products';

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
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">24-48h Server Setup</h4>
                <p className="text-[11px] text-slate-500">Direct VPS & cPanel installation</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Instant Digital Delivery</h4>
                <p className="text-[11px] text-slate-500">Instant zip & license activation</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 fill-amber-500" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">4.95 / 5 Rating</h4>
                <p className="text-[11px] text-slate-500">From 250+ enterprise buyers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1 & 2: Company Info & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" href="/" />
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              Dunga Technologies is an engineering-first software company building proprietary enterprise source code, full-stack CRM systems, SaaS engines, and bespoke digital solutions for ambitious brands worldwide.
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
                    className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#246e7f] focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="bg-[#246e7f] hover:bg-[#1a515e] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-1 flex-shrink-0"
                  >
                    Join <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:text-slate-900 hover:border-slate-400 transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:text-slate-900 hover:border-slate-400 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.46 1.46 0 1 0 0-2.92 1.46 1.46 0 0 0 0 2.92M5.07 18.5h2.79v-8.37H5.07v8.37z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:text-slate-900 hover:border-slate-400 transition-colors"
                aria-label="Twitter X"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 3: Proprietary Software Marketplace */}
          <div>
            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Proprietary Marketplace
            </h5>
            <ul className="space-y-2 text-xs">
              {PRODUCTS.map((prod) => (
                <li key={prod.id}>
                  <Link
                    href={`/products/${prod.slug}`}
                    className="text-slate-600 hover:text-[#246e7f] transition-colors flex items-center justify-between group"
                  >
                    <span className="line-clamp-1">{prod.title}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#246e7f] flex-shrink-0 ml-1" />
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/products"
                  className="text-[#246e7f] font-semibold hover:underline inline-flex items-center gap-1"
                >
                  Browse Full Catalog →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Services & Solutions */}
          <div>
            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Custom Engineering
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services/custom-web-applications" className="text-slate-600 hover:text-[#246e7f] transition-colors">
                  Enterprise Web Applications
                </Link>
              </li>
              <li>
                <Link href="/services/cross-platform-mobile-apps" className="text-slate-600 hover:text-[#246e7f] transition-colors">
                  Mobile App Development (iOS & Android)
                </Link>
              </li>
              <li>
                <Link href="/services/custom-crm-erp-development" className="text-slate-600 hover:text-[#246e7f] transition-colors">
                  Custom CRM & Telecaller Suites
                </Link>
              </li>
              <li>
                <Link href="/services/cloud-architecture-devops" className="text-slate-600 hover:text-[#246e7f] transition-colors">
                  Cloud DevOps & Docker Scaling
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-slate-600 hover:text-[#246e7f] transition-colors">
                  Client Case Studies
                </Link>
              </li>
              <li>
                <Link href="/account" className="text-[#246e7f] font-semibold hover:underline">
                  Client License Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Company & Contact */}
          <div>
            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Get in Touch
            </h5>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#246e7f] flex-shrink-0 mt-0.5" />
                <span>Dunga Technologies HQ, Tech Hub, Bengaluru & Global Remote Delivery</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#246e7f] flex-shrink-0" />
                <a href="mailto:contact@dungatechnologies.com" className="hover:text-[#246e7f] transition-colors">
                  contact@dungatechnologies.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#246e7f] flex-shrink-0" />
                <a href="tel:+919999999999" className="hover:text-[#246e7f] transition-colors">
                  +91 (80) 4567 8900
                </a>
              </div>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#e06527] hover:bg-[#c9561c] px-3 py-1.5 rounded-lg shadow-xs transition-colors"
                >
                  Schedule Tech Call <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Dunga Technologies Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-slate-900 transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/license-terms" className="hover:text-slate-900 transition-colors">
              License Agreement
            </Link>
            <Link href="/refund-policy" className="hover:text-slate-900 transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
