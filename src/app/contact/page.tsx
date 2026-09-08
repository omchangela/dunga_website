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
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

export default function ContactPage() {
  const { formatPrice } = useCurrency();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Custom CRM / Telecalling System');
  const [budget, setBudget] = useState('₹50,000 - ₹1,50,000');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#e6f4f7] border border-[#246e7f]/20 text-[#246e7f] text-xs font-bold px-3 py-1 rounded-full">
            <Headphones className="w-3.5 h-3.5" />
            <span>Direct Engineering Consultation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Let&apos;s Build Something Remarkable
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Have questions about acquiring our proprietary source code, need custom engineering, or want to book an architecture review? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 7 cols: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Inquiry Received!</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Thank you for reaching out, <strong>{name}</strong>. Our senior technical consultant will contact you within 4 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="bg-[#246e7f] text-white font-bold text-xs px-4 py-2 rounded-lg"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                    Project Consultation & Scope Estimator
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
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
                        placeholder="john@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone / WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Service or Product of Interest
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
                      >
                        <option value="OmniFlow CRM & Telecalling">OmniFlow CRM & Telecalling Source Code</option>
                        <option value="DungaPay Gateway Engine">DungaPay Gateway Engine</option>
                        <option value="AetherBot AI SaaS">AetherBot AI SaaS Script</option>
                        <option value="Custom CRM / Telecalling System">Custom CRM / Telecalling System</option>
                        <option value="Enterprise Web App Development">Enterprise Web App Development</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="Cloud DevOps / Server Setup">Cloud DevOps / Server Setup</option>
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
                        <option value="₹5,000 - ₹25,000 (Source Code Only)">₹5,000 - ₹25,000 / $69 - $350 (Source Code Package)</option>
                        <option value="₹25,000 - ₹75,000">₹25,000 - ₹75,000 / $350 - $1,000</option>
                        <option value="₹75,000 - ₹2,00,000">₹75,000 - ₹2,00,000 / $1,000 - $2,500</option>
                        <option value="₹2,00,000+ (Custom Enterprise)">₹2,00,000+ / $2,500+ (Custom Enterprise Solution)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Tell us about your project requirements or timeline
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Briefly describe what you're building, existing tech stack, and target deployment date..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#246e7f] hover:bg-[#1a515e] text-white font-bold text-xs py-3.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Project Scope & Request Quote</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right 5 cols: Direct Contacts & WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <h3 className="text-sm font-bold text-slate-900">Direct Contact Points</h3>

              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#e6f4f7] text-[#246e7f] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">General Inquiries & Sales</span>
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
                    <span className="font-bold text-slate-900 block">Phone Support</span>
                    <a href="tel:+919999999999" className="text-slate-800 hover:underline">
                      +91 (80) 4567 8900
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Headquarters</span>
                    <span>Dunga Technologies Pvt Ltd, Tech Park, Bengaluru, India</span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <div className="pt-4 border-t border-slate-100">
                <a
                  href="https://wa.me/919999999999?text=Hello%20Dunga%20Technologies,%20I%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl shadow-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant WhatsApp Connect</span>
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
      </div>
    </div>
  );
}
