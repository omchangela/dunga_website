'use client';

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle2,
  Headphones,
  ShieldCheck,
  Zap,
  Building2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { BRANCH_LOCATIONS } from '@/data/branches';

export default function ContactPage() {
  const { formatPrice } = useCurrency();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Hire Dedicated Developers (Hourly/Monthly)');
  const [budget, setBudget] = useState('₹50,000 - ₹1,50,000');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen py-12 sm:py-20 relative overflow-hidden">
      
      {/* Background Dot Pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#e6f4f7] border border-[#246e7f]/20 text-[#246e7f] text-xs font-bold px-3.5 py-1.5 rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E06527]" />
            <span>DIRECT ENGINEERING CONSULTATION & CUSTOM QUOTES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight font-heading leading-tight">
            Let&apos;s Build & Scale Your <span className="text-[#246E7F]">Digital Products</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Need to hire dedicated developers on rent, acquire proprietary source code, book a server deployment, or get bespoke enterprise software built? Reach out directly to our engineering headquarters.
          </p>
        </div>

        {/* Main Form & Direct Channels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 7 cols: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200/90 shadow-sm">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Custom Solutions Inquiry Received!</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Thank you, <strong>{name}</strong>. Our Principal Technical Architect will review your requirements and respond within 2 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="bg-[#246e7f] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h2 className="text-base font-bold text-slate-900">
                      Request a Custom Solution or Book Developers
                    </h2>
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      Fast 2h Response
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="rahul@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Service of Interest *
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
                      >
                        <option value="Hire Dedicated Developers (Hourly/Monthly)">1. Hire Dedicated Developers (Hourly / Monthly)</option>
                        <option value="Ready-Made Code Solutions">2. Ready-Made Source Code Solutions</option>
                        <option value="Code & Script Installation / CodeCanyon Setup">3. Code & Script Installation (CodeCanyon Setup)</option>
                        <option value="Tech Consultancy & Architecture">4. Tech Consultancy & Architecture Advisory</option>
                        <option value="Technical Maintenance & AMC">5. Technical Maintenance & Annual Support (AMC)</option>
                        <option value="Emergency Bug Fixing & Tuning">6. Emergency Bug Fixing & Performance Tuning</option>
                        <option value="Custom Application Development">7. Custom Application Development (Full Scope)</option>
                        <option value="Project Estimation & Scoping">8. Project Estimation & Scoping</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Estimated Budget Bracket
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
                      >
                        <option value="Hourly Developer Booking (₹999 / $15 per hr)">Hourly Developer Booking (₹999 / $15 per hr)</option>
                        <option value="Script Installation Fixed (₹999 / $15)">Script Installation Fixed (₹999 / $15)</option>
                        <option value="Source Code Package (₹2,499 - ₹25,000)">Source Code Package (₹2,499 - ₹25,000 / $39 - $350)</option>
                        <option value="Custom Development (₹50,000 - ₹2,00,000)">Custom Development (₹50,000 - ₹2,00,000 / $700 - $2,500)</option>
                        <option value="Enterprise Solution (₹2,00,000+)">Enterprise Solution (₹2,00,000+ / $2,500+)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Project Scope, Tech Stack & Target Timeline
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Briefly describe what you're building, target launch dates, or specific developer skill requirements..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#e06527] hover:bg-[#c9561c] text-white font-bold text-xs py-3.5 rounded-xl shadow-md shadow-[#e06527]/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Custom Solutions Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right 5 cols: Direct Contact & WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-slate-900">Direct Contact Channels</h3>

              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#e6f4f7] text-[#246e7f] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">General Sales & Custom Quotes</span>
                    <a href="mailto:contact@dungatechnologies.com" className="text-[#246e7f] hover:underline">
                      contact@dungatechnologies.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#fff3eb] text-[#e06527] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Direct Engineering Desk</span>
                    <a href="tel:+919876543210" className="text-slate-800 hover:underline">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Working Hours</span>
                    <span>Monday – Saturday: 9:30 AM – 7:30 PM IST</span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <div className="pt-4 border-t border-slate-100">
                <a
                  href="https://wa.me/919876543210?text=Hello%20Dunga%20Technologies,%20I%20need%20custom%20solutions%20or%20developer%20hiring."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition-all active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant WhatsApp Connect (+91 98765 43210)</span>
                </a>
              </div>
            </div>

            <div className="bg-slate-100 p-6 rounded-3xl border border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-[#246e7f]" />
                <span>NDA & Client Privacy Guaranteed</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                All inquiries and technical discussions are protected under standard non-disclosure terms. Your project details are strictly confidential.
              </p>
            </div>
          </div>
        </div>

        {/* Multiple Branch Locations Grid */}
        <div className="space-y-6 pt-8 border-t border-slate-200">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#246e7f]">
              <Building2 className="w-4 h-4" />
              <span>Multiple Branch Locations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Visit or Contact Our Regional Offices
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BRANCH_LOCATIONS.map((branch) => (
              <div
                key={branch.id}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md hover:border-[#246e7f]/40 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">
                    {branch.city}, {branch.country}
                  </h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${branch.isMain ? 'bg-[#246e7f] text-white' : 'bg-slate-100 text-slate-700'}`}>
                    {branch.type}
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-600">
                  <MapPin className="w-4 h-4 text-[#246e7f] flex-shrink-0 mt-0.5" />
                  <span>{branch.address}</span>
                </div>
                <div className="text-xs text-slate-500 space-y-1 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 font-mono text-[#246e7f] font-semibold">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{branch.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{branch.email}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Hours: {branch.hours}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
