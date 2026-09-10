'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { inquiryStore, Inquiry } from '@/lib/inquiryStore';
import { DEVELOPERS_DATA } from '@/data/developers';
import { PRODUCTS } from '@/data/products';
import { useCurrency } from '@/context/CurrencyContext';
import { InquiryDetailModal } from '@/components/admin/InquiryDetailModal';
import {
  Inbox,
  TrendingUp,
  Users,
  Briefcase,
  DollarSign,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldCheck,
  Flame,
  Zap,
  Code2,
  Activity,
  Plus
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { formatPrice, currency } = useCurrency();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const refreshInquiries = () => {
    setInquiries(inquiryStore.getInquiries());
  };

  useEffect(() => {
    refreshInquiries();
    window.addEventListener('dunga_inquiries_updated', refreshInquiries);
    return () => window.removeEventListener('dunga_inquiries_updated', refreshInquiries);
  }, []);

  const newInquiries = inquiries.filter((i) => i.status === 'New');
  const convertedInquiries = inquiries.filter((i) => i.status === 'Converted');
  const inReviewInquiries = inquiries.filter((i) => i.status === 'In Review');

  const conversionRate = inquiries.length > 0 
    ? Math.round((convertedInquiries.length / inquiries.length) * 100) 
    : 0;

  // Active developers counts
  const availableDevs = DEVELOPERS_DATA.filter((d) => d.availability === 'Available Now').length;
  const inProjectDevs = DEVELOPERS_DATA.filter((d) => d.availability === 'In Project').length;
  const upcomingDevs = DEVELOPERS_DATA.filter((d) => d.availability === 'Available Soon').length;

  return (
    <div className="space-y-6">
      
      {/* Top Welcome & Live Ops Status */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-6 rounded-3xl relative overflow-hidden shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-[#246E7F]/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -left-10 -top-10 w-60 h-60 bg-[#E06527]/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#246E7F]/20 text-teal-300 border border-[#246E7F]/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>DUNGA TECHNOLOGIES COMMAND CENTER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome back, Om Changela
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Real-time telemetry: {newInquiries.length} new client inquiries awaiting review • {availableDevs} developers ready for 24h sprint kickoff.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href="/admin/inquiries"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-[#246E7F] to-[#1b5563] text-white text-xs font-bold rounded-xl shadow-md shadow-[#246E7F]/20 hover:brightness-110 transition-all cursor-pointer"
            >
              <Inbox className="w-4 h-4" />
              <span>Manage Inquiries ({newInquiries.length})</span>
            </Link>

            <Link
              href="/admin/developers"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 transition-all cursor-pointer"
            >
              <Users className="w-4 h-4 text-[#E06527]" />
              <span>Developer Capacity</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Total Leads & Inquiries */}
        <Link
          href="/admin/inquiries"
          className="bg-slate-900 border border-slate-800 hover:border-[#246E7F]/60 p-5 rounded-3xl transition-all shadow-md group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Inquiries</span>
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-black text-white">{inquiries.length}</span>
            {newInquiries.length > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E06527] text-white animate-pulse">
                {newInquiries.length} NEW
              </span>
            )}
          </div>
          <div className="text-xs text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800/80">
            <span>{inReviewInquiries.length} under scoping</span>
            <span className="text-teal-400 group-hover:translate-x-1 transition-transform">View all →</span>
          </div>
        </Link>

        {/* KPI 2: Active Developer Roster */}
        <Link
          href="/admin/developers"
          className="bg-slate-900 border border-slate-800 hover:border-amber-500/60 p-5 rounded-3xl transition-all shadow-md group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Developer Roster</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-black text-white">58+</span>
            <span className="text-xs font-bold text-emerald-400">14 Live Available</span>
          </div>
          <div className="text-xs text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800/80">
            <span>38 active in client sprints</span>
            <span className="text-amber-400 group-hover:translate-x-1 transition-transform">Capacity →</span>
          </div>
        </Link>

        {/* KPI 3: Pipeline & Deal Value */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl transition-all shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Estimated Pipeline</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">
              {formatPrice(485000, 6200)}
            </span>
          </div>
          <div className="text-xs text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800/80">
            <span>High client intent</span>
            <span className="text-emerald-400 font-semibold">+18% this month</span>
          </div>
        </div>

        {/* KPI 4: Lead Conversion Rate */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl transition-all shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Conversion SLA</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-black text-white">{conversionRate}%</span>
            <span className="text-xs text-slate-400">Avg Response &lt;15m</span>
          </div>
          <div className="text-xs text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800/80">
            <span>{convertedInquiries.length} deals closed</span>
            <span className="text-purple-400 font-semibold">99.4% SLA</span>
          </div>
        </div>

      </div>

      {/* Main Grid: Recent Inquiries Table & Developer Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 cols: Recent Inquiries Stream */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Inbox className="w-4 h-4 text-[#246E7F]" />
                <span>Recent Incoming Inquiries & Leads</span>
              </h3>
              <p className="text-xs text-slate-400">Live feed from website contact, developer booking & estimator forms.</p>
            </div>

            <Link
              href="/admin/inquiries"
              className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1"
            >
              <span>View All ({inquiries.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {inquiries.slice(0, 5).map((inq) => (
              <div
                key={inq.id}
                onClick={() => setSelectedInquiry(inq)}
                className="p-4 rounded-2xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-teal-400">{inq.id}</span>
                    <span className="text-xs font-bold text-white group-hover:text-teal-300 transition-colors">
                      {inq.name}
                    </span>
                    {inq.company && (
                      <span className="text-[11px] text-slate-400">({inq.company})</span>
                    )}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      inq.status === 'New' 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : inq.status === 'In Review'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : inq.status === 'Converted'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {inq.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 font-medium truncate">
                    {inq.serviceOrProduct}
                  </p>

                  <p className="text-[11px] text-slate-500 truncate max-w-lg">
                    {inq.message}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between text-right shrink-0">
                  <span className="text-xs font-bold text-amber-400">
                    {inq.budget || 'Custom Scope'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-center">
            <Link
              href="/admin/inquiries"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
            >
              <span>Manage all {inquiries.length} inquiries in detail</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right 4 cols: Live Capacity Breakdown & Quick Links */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Developer Capacity Gauge */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Roster Capacity Allocation</span>
              </h3>
              <span className="text-xs font-bold text-emerald-400">58+ Total</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-amber-300">Active Client Sprints (38)</span>
                  <span className="text-slate-400">65%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-emerald-300">Immediate Available (14)</span>
                  <span className="text-slate-400">24%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: '24%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-cyan-300">Freeing Soon / Pre-Book (6)</span>
                  <span className="text-slate-400">11%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: '11%' }}></div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <Link
                href="/admin/developers"
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Manage Developer Availability</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Quick System Links */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#E06527]" />
              <span>Quick Management Shortcuts</span>
            </h3>

            <div className="space-y-2 text-xs">
              <Link
                href="/admin/products"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-800"
              >
                <span className="flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5 text-teal-400" />
                  Software Suites & Licenses
                </span>
                <span className="text-[10px] text-slate-500 font-mono">6 Products</span>
              </Link>

              <Link
                href="/admin/orders"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-800"
              >
                <span className="flex items-center gap-2">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  Orders & License Keys
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">Active</span>
              </Link>

              <Link
                href="/admin/settings"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-800"
              >
                <span className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-purple-400" />
                  Settings & Configurations
                </span>
                <span className="text-[10px] text-slate-500">v2.4.0</span>
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* Inquiry Detail Modal */}
      <InquiryDetailModal
        inquiry={selectedInquiry}
        isOpen={!!selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
        onStatusChanged={refreshInquiries}
      />

    </div>
  );
}
