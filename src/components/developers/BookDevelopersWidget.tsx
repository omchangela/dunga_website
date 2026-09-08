'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Clock,
  CheckCircle2,
  Star,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Code2,
  DollarSign,
  Send,
  X,
} from 'lucide-react';
import { DEVELOPER_ROLES, DeveloperRole } from '@/data/developers';
import { useCurrency } from '@/context/CurrencyContext';

const DEV_CATEGORIES = ['All Specialists', 'Frontend', 'Full-Stack', 'Mobile', 'AI & ML', 'DevOps', 'CMS & Scripts'];

export function BookDevelopersWidget() {
  const { formatPrice } = useCurrency();
  const [selectedCategory, setSelectedCategory] = useState('All Specialists');
  const [bookingHours, setBookingHours] = useState(20); // default 20 hrs/week
  const [activeModalDev, setActiveModalDev] = useState<DeveloperRole | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Filter developers
  const filteredDevs =
    selectedCategory === 'All Specialists'
      ? DEVELOPER_ROLES
      : DEVELOPER_ROLES.filter((d) => d.category === selectedCategory);

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setActiveModalDev(null);
    }, 2500);
  };

  return (
    <section className="py-16 sm:py-24 bg-white relative" id="hire-developers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#e6f4f7] border border-[#246e7f]/20 text-[#246e7f] text-xs font-bold px-3.5 py-1 rounded-full shadow-xs">
              <Users className="w-3.5 h-3.5 text-[#e06527]" />
              <span>On-Demand Engineering Squad</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Hire Dedicated Developers by the Hour
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Scale your team with pre-vetted senior Next.js, Flutter, Python, and DevOps talent. Flexible hourly booking from <strong>₹999 / $15 per hour</strong> with zero recruitment overheads and 24-48h onboarding.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/hire-developers"
              className="bg-[#246e7f] hover:bg-[#1a515e] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-[#246e7f]/20 flex items-center gap-1.5"
            >
              <span>View All Engineer Profiles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Interactive Hourly Estimator Bar */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#246e7f]">
              Interactive Hourly Cost Estimator
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Select Estimated Weekly Hours:
            </h3>
            <p className="text-xs text-slate-500">
              Timesheet logged via Jira/Toggl with transparent weekly milestone reviews.
            </p>
          </div>

          <div className="w-full lg:w-96 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>{bookingHours} Hours / Week</span>
              <span className="text-[#246e7f] font-mono font-black text-sm">
                ~{bookingHours * 4} Hours / Month
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="40"
              step="5"
              value={bookingHours}
              onChange={(e) => setBookingHours(Number(e.target.value))}
              className="w-full accent-[#246e7f] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>10h (Part-Time)</span>
              <span>20h (Half-Time)</span>
              <span>40h (Full-Time Dedicated)</span>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {DEV_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                selectedCategory === cat
                  ? 'bg-[#246e7f] text-white border-[#246e7f] shadow-md shadow-[#246e7f]/20 scale-105'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Developer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDevs.map((dev) => {
            const weeklyEstINR = dev.hourlyRateINR * bookingHours;
            const weeklyEstUSD = dev.hourlyRateUSD * bookingHours;

            return (
              <div
                key={dev.id}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-xl hover:border-[#246e7f]/40 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="bg-[#e6f4f7] text-[#246e7f] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        {dev.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-2 group-hover:text-[#246e7f] transition-colors">
                        {dev.role}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                        <span>{dev.experience} Exp</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          {dev.rating}
                        </span>
                        <span>•</span>
                        <span>{dev.completedProjects} Projects</span>
                      </div>
                    </div>

                    <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-[#246e7f] group-hover:text-white transition-colors flex-shrink-0">
                      <Code2 className="w-5 h-5" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {dev.description}
                  </p>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {dev.skills.slice(0, 5).map((skill) => (
                      <span
                        key={skill}
                        className="bg-slate-50 text-slate-700 border border-slate-200/80 text-[10px] font-mono px-2 py-0.5 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                    {dev.skills.length > 5 && (
                      <span className="bg-slate-100 text-slate-500 text-[10px] px-1.5 py-0.5 rounded-md">
                        +{dev.skills.length - 5}
                      </span>
                    )}
                  </div>

                  {/* Availability Badge */}
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium bg-emerald-50/80 px-2.5 py-1 rounded-xl border border-emerald-200/60">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Availability: <strong>{dev.availability}</strong></span>
                  </div>
                </div>

                {/* Pricing & Booking Action */}
                <div className="pt-5 mt-5 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Hourly Rate
                      </span>
                      <div className="text-lg font-black text-slate-900">
                        {formatPrice(dev.hourlyRateINR, dev.hourlyRateUSD)}
                        <span className="text-xs text-slate-500 font-normal"> / hour</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Est. for {bookingHours}h/wk
                      </span>
                      <div className="text-xs font-bold text-[#246e7f]">
                        {formatPrice(weeklyEstINR, weeklyEstUSD)} / wk
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveModalDev(dev)}
                    className="w-full bg-[#246e7f] hover:bg-[#1a515e] text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Developer (Hourly / Monthly)</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Booking Modal */}
      {activeModalDev && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setActiveModalDev(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {formSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Developer Booking Request Received!</h3>
                <p className="text-xs text-slate-600">
                  Our Technical Lead will contact you within 2 hours to confirm onboarding and setup direct communication.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookSubmit} className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-[#e06527] uppercase tracking-wider block">
                    Direct Engineer Booking
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                    Book {activeModalDev.role}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Rate: <strong>{formatPrice(activeModalDev.hourlyRateINR, activeModalDev.hourlyRateUSD)}/hr</strong> • {activeModalDev.availability}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@company.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Engagement Model</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f]">
                      <option>Hourly ({bookingHours} Hours/Week)</option>
                      <option>Dedicated Full-Time (160 Hours/Month)</option>
                      <option>Ad-Hoc Bug Fixing Sprint (10 Hours)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Project Brief / Key Requirements (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your current tech stack, task priorities, and ideal start date..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Non-Disclosure Agreement (NDA) Protected</span>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#246e7f] hover:bg-[#1a515e] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md shadow-[#246e7f]/20 flex items-center gap-1.5"
                  >
                    <span>Confirm & Book</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
