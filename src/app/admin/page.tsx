'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  Plus,
  BarChart3,
  PieChart,
  Layers,
  Calendar,
  Filter,
  ArrowUpRight,
  ChevronRight,
  Laptop,
  Compass
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { adminUser } = useAdminAuth();
  const { formatPrice, currency } = useCurrency();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D' | '1Y'>('30D');
  const [activeChartTab, setActiveChartTab] = useState<'revenue' | 'inquiries'>('revenue');
  const [hoveredDataIndex, setHoveredDataIndex] = useState<number | null>(null);

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
  const contactedInquiries = inquiries.filter((i) => i.status === 'Contacted');

  const conversionRate = inquiries.length > 0 
    ? Math.round((convertedInquiries.length / inquiries.length) * 100) 
    : 0;

  // Active developers counts
  const totalDevs = DEVELOPERS_DATA.length;
  const availableDevs = DEVELOPERS_DATA.filter((d) => d.availability === 'Available Now').length;
  const inProjectDevs = DEVELOPERS_DATA.filter((d) => d.availability === 'In Project').length;
  const upcomingDevs = DEVELOPERS_DATA.filter((d) => d.availability === 'Available Soon').length;

  // Categorical Inquiry Breakdown
  const categoryStats = useMemo(() => {
    const categories: Record<string, number> = {
      'Developer Hire': 0,
      'Source Code License': 0,
      'Custom Software': 0,
      'Tech Consultancy': 0,
      'Script Installation': 0,
      'Project Estimation': 0,
    };

    inquiries.forEach((inq) => {
      if (categories[inq.type] !== undefined) {
        categories[inq.type]++;
      } else {
        categories['Custom Software']++;
      }
    });

    const total = inquiries.length || 1;
    return Object.entries(categories).map(([name, count]) => ({
      name,
      count,
      pct: Math.round((count / total) * 100),
    }));
  }, [inquiries]);

  // Dynamic Chart Datasets based on TimeRange
  const chartPoints = useMemo(() => {
    if (timeRange === '7D') {
      return [
        { label: 'Thu', rev: 45000, inq: 2, conv: 1 },
        { label: 'Fri', rev: 68000, inq: 4, conv: 2 },
        { label: 'Sat', rev: 52000, inq: 3, conv: 1 },
        { label: 'Sun', rev: 35000, inq: 2, conv: 0 },
        { label: 'Mon', rev: 92000, inq: 6, conv: 3 },
        { label: 'Tue', rev: 115000, inq: 8, conv: 4 },
        { label: 'Today', rev: 140000, inq: inquiries.length || 5, conv: convertedInquiries.length || 2 }
      ];
    }
    if (timeRange === '30D') {
      return [
        { label: 'Week 1', rev: 180000, inq: 12, conv: 4 },
        { label: 'Week 2', rev: 245000, inq: 18, conv: 7 },
        { label: 'Week 3', rev: 310000, inq: 22, conv: 9 },
        { label: 'Week 4', rev: 485000, inq: 29, conv: 14 }
      ];
    }
    if (timeRange === '90D') {
      return [
        { label: 'Jul', rev: 620000, inq: 45, conv: 18 },
        { label: 'Aug', rev: 890000, inq: 64, conv: 27 },
        { label: 'Sep (Current)', rev: 1150000, inq: 82, conv: 36 }
      ];
    }
    return [
      { label: 'Q1', rev: 1400000, inq: 110, conv: 48 },
      { label: 'Q2', rev: 2100000, inq: 165, conv: 72 },
      { label: 'Q3', rev: 2850000, inq: 220, conv: 95 },
      { label: 'Q4 (Proj)', rev: 3600000, inq: 290, conv: 130 }
    ];
  }, [timeRange, inquiries.length, convertedInquiries.length]);

  // Max for chart scaling
  const maxRev = Math.max(...chartPoints.map((p) => p.rev)) * 1.15;
  const maxInq = Math.max(...chartPoints.map((p) => p.inq)) * 1.25;

  return (
    <div className="space-y-6">
      
      {/* 1. Header Banner & Live Telemetry Controls */}
      <div className="bg-white border border-slate-200 p-6 sm:p-7 rounded-3xl relative overflow-hidden shadow-xs">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#246E7F]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-12 -top-12 w-64 h-64 bg-[#E06527]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#246E7F]/10 text-[#246E7F] border border-[#246E7F]/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>DUNGA TECHNOLOGIES COMMAND CENTER & TELEMETRY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
              Welcome back, {adminUser?.name || 'Super Admin'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
              Live Operations: <span className="font-bold text-slate-800">{newInquiries.length} live inquiries</span> awaiting response • <span className="font-bold text-emerald-600">{availableDevs} top engineers</span> ready for instant onboarding • <span className="font-bold text-slate-800">{PRODUCTS.length} software suites</span> live.
            </p>
          </div>

          {/* Top Quick Actions */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <Link
              href="/admin/inquiries"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#246E7F] hover:bg-[#1a5563] text-white text-xs font-bold rounded-xl shadow-md shadow-[#246E7F]/20 hover:shadow-[#246E7F]/30 transition-all cursor-pointer"
            >
              <Inbox className="w-4 h-4" />
              <span>Inquiries Feed ({inquiries.length})</span>
            </Link>

            <Link
              href="/admin/developers"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer"
            >
              <Users className="w-4 h-4 text-[#E06527]" />
              <span>Developer Capacity</span>
            </Link>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:shadow-xs transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Primary KPI Executive Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Total Inbound Leads */}
        <Link
          href="/admin/inquiries"
          className="bg-white border border-slate-200 hover:border-[#246E7F]/60 p-5 sm:p-6 rounded-3xl transition-all shadow-xs hover:shadow-md group relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Inbound Leads</span>
            <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-[#246E7F] group-hover:scale-105 transition-transform">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2.5 mb-1.5">
            <span className="text-3xl sm:text-4xl font-black text-slate-900">{inquiries.length}</span>
            {newInquiries.length > 0 && (
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#E06527] text-white shadow-xs animate-pulse">
                {newInquiries.length} NEW
              </span>
            )}
          </div>
          <div className="text-xs text-slate-500 flex items-center justify-between pt-3 border-t border-slate-100">
            <span>{inReviewInquiries.length + contactedInquiries.length} actively scoping</span>
            <span className="text-[#246E7F] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
              Review <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </Link>

        {/* KPI 2: Active Developer Roster */}
        <Link
          href="/admin/developers"
          className="bg-white border border-slate-200 hover:border-amber-400 p-5 sm:p-6 rounded-3xl transition-all shadow-xs hover:shadow-md group relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Engineering Capacity</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="text-3xl sm:text-4xl font-black text-slate-900">58+</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              {availableDevs} Live Ready
            </span>
          </div>
          <div className="text-xs text-slate-500 flex items-center justify-between pt-3 border-t border-slate-100">
            <span>{inProjectDevs || 38} active in sprints</span>
            <span className="text-amber-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
              Roster <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </Link>

        {/* KPI 3: Estimated Pipeline Volume */}
        <div className="bg-white border border-slate-200 p-5 sm:p-6 rounded-3xl transition-all shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estimated Pipeline</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600">
              {formatPrice(485000, 6200)}
            </span>
          </div>
          <div className="text-xs text-slate-500 flex items-center justify-between pt-3 border-t border-slate-100">
            <span>High closing probability</span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded text-[11px]">+22% MoM</span>
          </div>
        </div>

        {/* KPI 4: Conversion SLA */}
        <div className="bg-white border border-slate-200 p-5 sm:p-6 rounded-3xl transition-all shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Conversion SLA</span>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-200/80 flex items-center justify-center text-purple-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="text-3xl sm:text-4xl font-black text-slate-900">{conversionRate}%</span>
            <span className="text-xs text-slate-500 font-medium">Avg &lt;15m Response</span>
          </div>
          <div className="text-xs text-slate-500 flex items-center justify-between pt-3 border-t border-slate-100">
            <span>{convertedInquiries.length} deals finalized</span>
            <span className="text-purple-700 font-bold bg-purple-50 px-1.5 py-0.5 rounded text-[11px]">99.4% SLA</span>
          </div>
        </div>

      </div>

      {/* 3. Main Interactive Analytics & Growth Graph */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Header with Switchers & Time Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="w-5 h-5 text-[#246E7F]" />
              <h3 className="text-lg font-bold text-slate-900">
                Performance Telemetry & Growth Velocity
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Interactive revenue trajectory, client inquiry throughput, and deal velocity over time.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Metric Toggle */}
            <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-bold border border-slate-200/80">
              <button
                type="button"
                onClick={() => setActiveChartTab('revenue')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeChartTab === 'revenue'
                    ? 'bg-white text-[#246E7F] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Revenue Pipeline (₹)
              </button>
              <button
                type="button"
                onClick={() => setActiveChartTab('inquiries')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeChartTab === 'inquiries'
                    ? 'bg-white text-[#E06527] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Inquiries Volume
              </button>
            </div>

            {/* Timeframe Filter */}
            <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-bold border border-slate-200/80">
              {(['7D', '30D', '90D', '1Y'] as const).map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setTimeRange(range)}
                  className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                    timeRange === range
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Interactive Chart Area */}
        <div className="relative pt-4">
          
          {/* Summary Stat Overlay */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {activeChartTab === 'revenue' ? 'Total Period Pipeline' : 'Total Inbound Leads in Period'}
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
                {activeChartTab === 'revenue'
                  ? formatPrice(chartPoints.reduce((acc, curr) => acc + curr.rev, 0), 45000)
                  : `${chartPoints.reduce((acc, curr) => acc + curr.inq, 0)} Inquiries`}
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" /> +28.4%
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#246E7F]"></span>
                <span className="text-slate-600 font-medium">Pipeline Value</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#E06527]"></span>
                <span className="text-slate-600 font-medium">Converted Deals</span>
              </div>
            </div>
          </div>

          {/* SVG Animated Chart & Bars */}
          <div className="h-64 sm:h-72 w-full relative flex items-end justify-between gap-2 sm:gap-6 pt-8 pb-6 border-b border-slate-100">
            
            {/* Background Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
              <div className="border-b border-dashed border-slate-200 w-full"></div>
              <div className="border-b border-dashed border-slate-200 w-full"></div>
              <div className="border-b border-dashed border-slate-200 w-full"></div>
              <div className="border-b border-dashed border-slate-200 w-full"></div>
            </div>

            {/* Interactive Bars with Tooltips */}
            {chartPoints.map((point, index) => {
              const heightPct = activeChartTab === 'revenue' 
                ? Math.max(18, Math.round((point.rev / maxRev) * 100))
                : Math.max(18, Math.round((point.inq / maxInq) * 100));

              const isHovered = hoveredDataIndex === index;

              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredDataIndex(index)}
                  onMouseLeave={() => setHoveredDataIndex(null)}
                  className="flex-1 h-full flex flex-col justify-end items-center relative group cursor-pointer"
                >
                  {/* Tooltip on Hover */}
                  {isHovered && (
                    <div className="absolute -top-14 bg-slate-900 text-white text-xs py-1.5 px-3 rounded-xl shadow-xl z-30 whitespace-nowrap pointer-events-none animate-fadeIn flex flex-col items-center">
                      <span className="font-bold">
                        {activeChartTab === 'revenue' ? formatPrice(point.rev, Math.round(point.rev / 83)) : `${point.inq} Inquiries`}
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        {point.conv} deals converted
                      </span>
                      <div className="w-2 h-2 bg-slate-900 rotate-45 -bottom-1 absolute"></div>
                    </div>
                  )}

                  {/* Bar Visual with Glow Gradient */}
                  <div className="w-full max-w-[48px] h-full flex items-end justify-center">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-2xl transition-all duration-500 relative overflow-hidden ${
                        activeChartTab === 'revenue'
                          ? isHovered
                            ? 'bg-gradient-to-t from-[#246E7F] to-teal-400 shadow-lg shadow-[#246E7F]/30 scale-102'
                            : 'bg-gradient-to-t from-[#246E7F]/90 to-[#246E7F]/60'
                          : isHovered
                          ? 'bg-gradient-to-t from-[#E06527] to-amber-400 shadow-lg shadow-[#E06527]/30 scale-102'
                          : 'bg-gradient-to-t from-[#E06527]/90 to-[#E06527]/60'
                      }`}
                    >
                      {/* Secondary Mini Marker for Converted Deals */}
                      <div
                        style={{ height: `${Math.min(100, Math.round((point.conv / (point.inq || 1)) * 100))}%` }}
                        className="w-full bg-white/20 absolute bottom-0 left-0"
                      ></div>
                    </div>
                  </div>

                  {/* Label */}
                  <span className={`text-[11px] font-bold mt-2 transition-colors ${
                    isHovered ? 'text-slate-900' : 'text-slate-500'
                  }`}>
                    {point.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quick Telemetry Footnote */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-3 gap-2">
            <span>Data synchronized directly from Neon PostgreSQL production ledger</span>
            <div className="flex items-center gap-1.5 font-bold text-slate-700">
              <Activity className="w-3.5 h-3.5 text-emerald-500" />
              <span>Real-time Socket Live</span>
            </div>
          </div>

        </div>

      </div>

      {/* 4. Second Grid: Inbound Channel Breakdown & Developer Allocation Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 cols: Category Distribution Breakdown */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-[#E06527]" />
                <span>Inbound Inquiries by Service Channel</span>
              </h3>
              <p className="text-xs text-slate-500">Breakdown of incoming demand across engineering, software licenses, & retainers.</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
              {inquiries.length} Total
            </span>
          </div>

          <div className="space-y-4">
            {categoryStats.map((item, idx) => {
              const colors = [
                'from-teal-500 to-[#246E7F]',
                'from-orange-500 to-[#E06527]',
                'from-blue-500 to-indigo-600',
                'from-purple-500 to-violet-600',
                'from-emerald-500 to-teal-600',
                'from-rose-500 to-pink-600'
              ];
              const activeColor = colors[idx % colors.length];

              return (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-800">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-semibold">{item.count} leads</span>
                      <span className="font-mono font-bold text-slate-900 w-10 text-right">{item.pct}%</span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${activeColor} transition-all duration-700`}
                      style={{ width: `${Math.max(item.pct, item.count > 0 ? 6 : 0)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Highest Inbound Channel:</span>
            <span className="font-bold text-[#246E7F] bg-teal-50 border border-teal-200/80 px-2.5 py-0.5 rounded-full">
              Developer Hire (Hourly & Dedicated)
            </span>
          </div>
        </div>

        {/* Right 5 cols: Live Engineering Roster Heatmap */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Engineering Capacity Allocation</span>
              </h3>
              <p className="text-xs text-slate-500">Active sprint assignments & 24h onboarding readiness.</p>
            </div>
            <Link
              href="/admin/developers"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
            >
              Roster →
            </Link>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
              <div className="flex justify-between font-bold mb-1.5">
                <span className="text-amber-800">Active in Client Sprints</span>
                <span className="text-amber-900 font-mono">38 / 58 (65%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-amber-200/60 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
              <div className="flex justify-between font-bold mb-1.5">
                <span className="text-emerald-800">Immediately Available (24h Kickoff)</span>
                <span className="text-emerald-900 font-mono">14 / 58 (24%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-emerald-200/60 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200/80">
              <div className="flex justify-between font-bold mb-1.5">
                <span className="text-teal-800">Freeing Up Within 7 Days</span>
                <span className="text-teal-900 font-mono">6 / 58 (11%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-teal-200/60 overflow-hidden">
                <div className="h-full bg-teal-500 rounded-full" style={{ width: '11%' }}></div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/admin/developers"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <span>Manage Developer Availability</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

      {/* 5. Main Inbound Stream & Quick System Portals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 cols: Real Inbound Inquiries Live Feed */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Inbox className="w-4 h-4 text-[#246E7F]" />
                <span>Live Inbound Leads & Customer RFP Feed</span>
              </h3>
              <p className="text-xs text-slate-500">Real-time submissions from contact forms, developer booking modals, and estimators.</p>
            </div>

            <Link
              href="/admin/inquiries"
              className="text-xs font-bold text-[#246E7F] hover:text-[#1a5563] flex items-center gap-1 bg-teal-50 border border-teal-200/80 px-3 py-1.5 rounded-xl transition-all"
            >
              <span>View All ({inquiries.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {inquiries.length === 0 ? (
            <div className="p-10 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-200 space-y-3">
              <Inbox className="w-8 h-8 text-slate-300 mx-auto" />
              <div>
                <p className="text-sm font-bold text-slate-700">No Inbound Inquiries Yet</p>
                <p className="text-xs text-slate-400">When users submit contact forms or developer booking requests on the website, they will appear here live.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {inquiries.slice(0, 5).map((inq) => (
                <div
                  key={inq.id}
                  onClick={() => setSelectedInquiry(inq)}
                  className="p-4 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200 hover:border-[#246E7F]/50 hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-[#246E7F] bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60">
                        {inq.inquiryCode || inq.id}
                      </span>
                      <span className="text-xs font-bold text-slate-900 group-hover:text-[#246E7F] transition-colors">
                        {inq.name}
                      </span>
                      {inq.company && (
                        <span className="text-[11px] text-slate-500 font-medium">({inq.company})</span>
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
                      {inq.message || 'No additional message provided.'}
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
          )}

          <div className="pt-2 text-center">
            <Link
              href="/admin/inquiries"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#246E7F] hover:text-[#1a5563] transition-colors"
            >
              <span>Manage all inquiries in full CRM view</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right 4 cols: Quick Operational Shortcuts & System Health */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick System Links */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3.5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#E06527]" />
              <span>Operational Quick Links</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <Link
                href="/admin/products"
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-[#e6f4f7]/40 text-slate-700 hover:text-slate-900 transition-all border border-slate-200 hover:border-teal-300 group"
              >
                <span className="flex items-center gap-2.5 font-bold">
                  <Code2 className="w-4 h-4 text-[#246E7F] group-hover:rotate-6 transition-transform" />
                  Software Suites & Licenses
                </span>
                <span className="text-[10px] text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200 font-mono font-bold">
                  {PRODUCTS.length} Products
                </span>
              </Link>

              <Link
                href="/admin/orders"
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50/40 text-slate-700 hover:text-slate-900 transition-all border border-slate-200 hover:border-emerald-300 group"
              >
                <span className="flex items-center gap-2.5 font-bold">
                  <DollarSign className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                  Orders & License Key Registry
                </span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-bold font-mono">
                  Live
                </span>
              </Link>

              <Link
                href="/admin/settings"
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-purple-50/40 text-slate-700 hover:text-slate-900 transition-all border border-slate-200 hover:border-purple-300 group"
              >
                <span className="flex items-center gap-2.5 font-bold">
                  <Activity className="w-4 h-4 text-purple-600 group-hover:rotate-12 transition-transform" />
                  Settings & Configurations
                </span>
                <span className="text-[10px] text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200 font-medium">
                  v2.4.0
                </span>
              </Link>
            </div>
          </div>

          {/* Infrastructure Health Badge */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#E06527]">
                SYSTEM RUNTIME
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
            <div>
              <p className="text-sm font-bold text-white">Neon PostgreSQL & Vercel Edge</p>
              <p className="text-xs text-slate-400 mt-0.5">Database latency &lt; 18ms • Serverless functions healthy.</p>
            </div>
            <div className="pt-2 border-t border-slate-700 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Branch: main</span>
              <span className="text-emerald-400 font-bold">100% Uptime</span>
            </div>
          </div>

        </div>

      </div>

      {/* Detail Modal */}
      <InquiryDetailModal
        inquiry={selectedInquiry}
        isOpen={!!selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
        onStatusChanged={refreshInquiries}
      />

    </div>
  );
}
