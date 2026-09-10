'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { inquiryStore, Inquiry } from '@/lib/inquiryStore';
import { DEVELOPERS_DATA } from '@/data/developers';
import { PRODUCTS } from '@/data/products';
import { useAdminAuth } from '@/context/AdminAuthContext';
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
  const { adminUser } = useAdminAuth();
  const { formatPrice, currency } = useCurrency();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const refreshInquiries = async () => {
    const local = inquiryStore.getInquiries();
    setInquiries(local);
    try {
      const live = await inquiryStore.fetchFromApi();
      if (live) setInquiries(live);
    } catch {}
  };

  useEffect(() => {
    refreshInquiries();
    const interval = setInterval(refreshInquiries, 10000);
    window.addEventListener('dunga_inquiries_updated', refreshInquiries);
    return () => {
      clearInterval(interval);
      window.removeEventListener('dunga_inquiries_updated', refreshInquiries);
    };
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
      <div className="bg-white border border-slate-200 p-6 rounded-3xl relative overflow-hidden shadow-xs">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-[#246E7F]/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -left-10 -top-10 w-60 h-60 bg-[#E06527]/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#246E7F]/10 text-[#246E7F] border border-[#246E7F]/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>DUNGA TECHNOLOGIES COMMAND CENTER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Welcome back, {adminUser?.name || 'Super Admin'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Real-time telemetry: <span className="font-semibold text-slate-800">{newInquiries.length} new client inquiries</span> awaiting review • <span className="font-semibold text-slate-800">{availableDevs} developers</span> ready for 24h sprint kickoff.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href="/admin/inquiries"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#246E7F] hover:bg-[#1a5563] text-white text-xs font-bold rounded-xl shadow-md shadow-[#246E7F]/20 transition-all cursor-pointer"
            >
              <Inbox className="w-4 h-4" />
              <span>Manage Inquiries ({newInquiries.length})</span>
            </Link>

            <Link
              href="/admin/developers"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 transition-all cursor-pointer"
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
          className="bg-white border border-slate-200 hover:border-[#246E7F]/60 p-5 rounded-3xl transition-all shadow-xs hover:shadow-md group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Inquiries</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#246E7F]">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-black text-slate-900">{inquiries.length}</span>
            {newInquiries.length > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E06527] text-white animate-pulse">
                {newInquiries.length} NEW
              </span>
            )}
          </div>
          <div className="text-xs text-slate-500 flex items-center justify-between pt-2 border-t border-slate-100">
            <span>{inReviewInquiries.length} under scoping</span>
            <span className="text-[#246E7F] font-bold group-hover:translate-x-1 transition-transform">View all →</span>
          </div>
        </Link>

        {/* KPI 2: Active Developer Roster */}
        <Link
          href="/admin/developers"
          className="bg-white border border-slate-200 hover:border-amber-400 p-5 rounded-3xl transition-all shadow-xs hover:shadow-md group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Developer Roster</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-black text-slate-900">58+</span>
            <span className="text-xs font-bold text-emerald-600">14 Live Available</span>
          </div>
          <div className="text-xs text-slate-500 flex items-center justify-between pt-2 border-t border-slate-100">
            <span>38 active in client sprints</span>
            <span className="text-amber-600 font-bold group-hover:translate-x-1 transition-transform">Capacity →</span>
          </div>
        </Link>

        {/* KPI 3: Pipeline & Deal Value */}
        <div className="bg-white border border-slate-200 p-5 rounded-3xl transition-all shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estimated Pipeline</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600">
              {formatPrice(485000, 6200)}
            </span>
          </div>
          <div className="text-xs text-slate-500 flex items-center justify-between pt-2 border-t border-slate-100">
            <span>High client intent</span>
            <span className="text-emerald-600 font-bold">+18% this month</span>
          </div>
        </div>

        {/* KPI 4: Lead Conversion Rate */}
        <div className="bg-white border border-slate-200 p-5 rounded-3xl transition-all shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Conversion SLA</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-black text-slate-900">{conversionRate}%</span>
            <span className="text-xs text-slate-500">Avg Response &lt;15m</span>
          </div>
          <div className="text-xs text-slate-500 flex items-center justify-between pt-2 border-t border-slate-100">
            <span>{convertedInquiries.length} deals closed</span>
            <span className="text-purple-600 font-bold">99.4% SLA</span>
          </div>
        </div>

      </div>

      {/* Main Grid: Recent Inquiries Table & Developer Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 cols: Recent Inquiries Stream */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Inbox className="w-4 h-4 text-[#246E7F]" />
                <span>Recent Incoming Inquiries & Leads</span>
              </h3>
              <p className="text-xs text-slate-500">Live feed from website contact, developer booking & estimator forms.</p>
            </div>

            <Link
              href="/admin/inquiries"
              className="text-xs font-bold text-[#246E7F] hover:text-[#1a5563] flex items-center gap-1"
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
                className="p-4 rounded-2xl bg-slate-50/70 hover:bg-slate-100/90 border border-slate-200/80 hover:border-slate-300 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-[#246E7F]">{inq.id}</span>
                    <span className="text-xs font-bold text-slate-900 group-hover:text-[#246E7F] transition-colors">
                      {inq.name}
                    </span>
                    {inq.company && (
                      <span className="text-[11px] text-slate-500">({inq.company})</span>
                    )}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      inq.status === 'New' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : inq.status === 'In Review'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : inq.status === 'Converted'
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {inq.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 font-semibold truncate">
                    {inq.serviceOrProduct}
                  </p>

                  <p className="text-[11px] text-slate-500 truncate max-w-lg">
                    {inq.message}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between text-right shrink-0">
                  <span className="text-xs font-bold text-[#E06527]">
                    {inq.budget || 'Custom Scope'}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-center">
            <Link
              href="/admin/inquiries"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
            >
              <span>Manage all {inquiries.length} inquiries in detail</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right 4 cols: Live Capacity Breakdown & Quick Links */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Developer Capacity Gauge */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Roster Capacity Allocation</span>
              </h3>
              <span className="text-xs font-bold text-emerald-700">58+ Total</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-amber-700">Active Client Sprints (38)</span>
                  <span className="text-slate-500">65%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-emerald-700">Immediate Available (14)</span>
                  <span className="text-slate-500">24%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '24%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-teal-700">Freeing Soon / Pre-Book (6)</span>
                  <span className="text-slate-500">11%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full" style={{ width: '11%' }}></div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <Link
                href="/admin/developers"
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Manage Developer Availability</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Quick System Links */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#E06527]" />
              <span>Quick Management Shortcuts</span>
            </h3>

            <div className="space-y-2 text-xs">
              <Link
                href="/admin/products"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-colors border border-slate-200"
              >
                <span className="flex items-center gap-2 font-medium">
                  <Code2 className="w-3.5 h-3.5 text-[#246E7F]" />
                  Software Suites & Licenses
                </span>
                <span className="text-[10px] text-slate-500 font-mono font-bold">6 Products</span>
              </Link>

              <Link
                href="/admin/orders"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-colors border border-slate-200"
              >
                <span className="flex items-center gap-2 font-medium">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  Orders & License Keys
                </span>
                <span className="text-[10px] text-emerald-700 font-bold font-mono">Active</span>
              </Link>

              <Link
                href="/admin/settings"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-colors border border-slate-200"
              >
                <span className="flex items-center gap-2 font-medium">
                  <Activity className="w-3.5 h-3.5 text-purple-600" />
                  Settings & Configurations
                </span>
                <span className="text-[10px] text-slate-500 font-medium">v2.4.0</span>
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

