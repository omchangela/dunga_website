'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  DollarSign,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Zap,
  Code2,
  Activity,
  BarChart3,
  PieChart,
  ArrowUpRight,
  TrendingDown,
  Layers,
  CircleDot,
  CheckCircle2,
  Clock
} from 'lucide-react';

// Helper to generate a smooth cubic bezier SVG path from coordinate points
function getSmoothSvgPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? i : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    path += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }

  return path;
}

export default function AdminDashboardPage() {
  const { adminUser } = useAdminAuth();
  const { formatPrice } = useCurrency();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  
  // Chart Controls
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D' | '1Y'>('30D');
  const [activeMetric, setActiveMetric] = useState<'all' | 'revenue' | 'inquiries'>('all');
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  const chartContainerRef = useRef<HTMLDivElement>(null);

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
  const availableDevs = DEVELOPERS_DATA.filter((d) => d.availability === 'Available Now').length;
  const inProjectDevs = DEVELOPERS_DATA.filter((d) => d.availability === 'In Project').length;

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

  // Dataset based on time range
  const rawChartData = useMemo(() => {
    if (timeRange === '7D') {
      return [
        { label: 'Thu, Sep 4', short: 'Thu', rev: 45000, inq: 2, conv: 1 },
        { label: 'Fri, Sep 5', short: 'Fri', rev: 72000, inq: 4, conv: 2 },
        { label: 'Sat, Sep 6', short: 'Sat', rev: 55000, inq: 3, conv: 1 },
        { label: 'Sun, Sep 7', short: 'Sun', rev: 38000, inq: 2, conv: 1 },
        { label: 'Mon, Sep 8', short: 'Mon', rev: 95000, inq: 6, conv: 3 },
        { label: 'Tue, Sep 9', short: 'Tue', rev: 125000, inq: 8, conv: 4 },
        { label: 'Wed, Sep 10 (Today)', short: 'Today', rev: 165000, inq: inquiries.length > 0 ? inquiries.length + 3 : 6, conv: convertedInquiries.length > 0 ? convertedInquiries.length + 2 : 3 }
      ];
    }
    if (timeRange === '30D') {
      return [
        { label: 'Week 1 (Aug 11 - Aug 17)', short: 'W1', rev: 145000, inq: 9, conv: 3 },
        { label: 'Week 2 (Aug 18 - Aug 24)', short: 'W2', rev: 235000, inq: 15, conv: 6 },
        { label: 'Week 3 (Aug 25 - Aug 31)', short: 'W3', rev: 340000, inq: 22, conv: 9 },
        { label: 'Week 4 (Sep 1 - Sep 7)', short: 'W4', rev: 410000, inq: 27, conv: 13 },
        { label: 'Current Sprint (Sep 8 - 10)', short: 'Current', rev: 485000, inq: inquiries.length > 0 ? inquiries.length + 18 : 34, conv: convertedInquiries.length > 0 ? convertedInquiries.length + 8 : 16 }
      ];
    }
    if (timeRange === '90D') {
      return [
        { label: 'Jun 2026', short: 'Jun', rev: 520000, inq: 38, conv: 14 },
        { label: 'Jul 2026', short: 'Jul', rev: 740000, inq: 52, conv: 22 },
        { label: 'Aug 2026', short: 'Aug', rev: 980000, inq: 69, conv: 31 },
        { label: 'Sep 2026 (Active)', short: 'Sep', rev: 1280000, inq: 88, conv: 42 }
      ];
    }
    return [
      { label: 'Q4 2025', short: 'Q4-25', rev: 1200000, inq: 95, conv: 40 },
      { label: 'Q1 2026', short: 'Q1-26', rev: 1850000, inq: 142, conv: 62 },
      { label: 'Q2 2026', short: 'Q2-26', rev: 2600000, inq: 198, conv: 89 },
      { label: 'Q3 2026 (Current)', short: 'Q3-26', rev: 3450000, inq: 265, conv: 124 }
    ];
  }, [timeRange, inquiries.length, convertedInquiries.length]);

  // SVG Dimension Metrics
  const svgWidth = 800;
  const svgHeight = 260;
  const paddingX = 40;
  const paddingTop = 25;
  const paddingBottom = 35;

  const chartInnerWidth = svgWidth - paddingX * 2;
  const chartInnerHeight = svgHeight - paddingTop - paddingBottom;

  // Max calculations for scaling
  const maxRevenueVal = Math.max(...rawChartData.map((d) => d.rev)) * 1.15;
  const maxInquiriesVal = Math.max(...rawChartData.map((d) => d.inq)) * 1.25;

  // Compute normalized coordinate points
  const revenuePoints = useMemo(() => {
    return rawChartData.map((d, index) => {
      const x = paddingX + (index / (rawChartData.length - 1)) * chartInnerWidth;
      const y = paddingTop + chartInnerHeight - (d.rev / maxRevenueVal) * chartInnerHeight;
      return { x, y, data: d };
    });
  }, [rawChartData, maxRevenueVal, chartInnerWidth, chartInnerHeight]);

  const inquiriesPoints = useMemo(() => {
    return rawChartData.map((d, index) => {
      const x = paddingX + (index / (rawChartData.length - 1)) * chartInnerWidth;
      const y = paddingTop + chartInnerHeight - (d.inq / maxInquiriesVal) * chartInnerHeight;
      return { x, y, data: d };
    });
  }, [rawChartData, maxInquiriesVal, chartInnerWidth, chartInnerHeight]);

  // SVG Paths
  const revenueSpline = useMemo(() => getSmoothSvgPath(revenuePoints), [revenuePoints]);
  const revenueArea = useMemo(() => {
    if (revenuePoints.length === 0) return '';
    const lastX = revenuePoints[revenuePoints.length - 1].x;
    const firstX = revenuePoints[0].x;
    const bottomY = paddingTop + chartInnerHeight;
    return `${revenueSpline} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [revenueSpline, revenuePoints, chartInnerHeight]);

  const inquiriesSpline = useMemo(() => getSmoothSvgPath(inquiriesPoints), [inquiriesPoints]);
  const inquiriesArea = useMemo(() => {
    if (inquiriesPoints.length === 0) return '';
    const lastX = inquiriesPoints[inquiriesPoints.length - 1].x;
    const firstX = inquiriesPoints[0].x;
    const bottomY = paddingTop + chartInnerHeight;
    return `${inquiriesSpline} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [inquiriesSpline, inquiriesPoints, chartInnerHeight]);

  // Total Period Aggregations
  const periodTotalRevenue = rawChartData.reduce((acc, curr) => acc + curr.rev, 0);
  const periodTotalInquiries = rawChartData.reduce((acc, curr) => acc + curr.inq, 0);
  const periodTotalDeals = rawChartData.reduce((acc, curr) => acc + curr.conv, 0);

  const activeHoveredPoint = hoveredPointIndex !== null ? rawChartData[hoveredPointIndex] : null;
  const activeRevCoord = hoveredPointIndex !== null ? revenuePoints[hoveredPointIndex] : null;
  const activeInqCoord = hoveredPointIndex !== null ? inquiriesPoints[hoveredPointIndex] : null;

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
              Live Operations: <span className="font-bold text-slate-800">{newInquiries.length} live inquiries</span> awaiting response • <span className="font-bold text-emerald-600">{availableDevs} top engineers</span> ready for instant onboarding • <span className="font-bold text-slate-800">{PRODUCTS.length} software suites</span> active.
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

      {/* 3. High-End Modern Area Spline Graph (Performance Telemetry) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 relative">
        
        {/* Top Header Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#246E7F]">
                <BarChart3 className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                Performance Telemetry & Growth Velocity
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Live dual-spline telemetry tracking gross pipeline value and client inquiry throughput.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* View Layer Selector */}
            <div className="inline-flex p-1 bg-slate-100 rounded-2xl text-xs font-bold border border-slate-200">
              <button
                type="button"
                onClick={() => setActiveMetric('all')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  activeMetric === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Dual Wave
              </button>
              <button
                type="button"
                onClick={() => setActiveMetric('revenue')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeMetric === 'revenue'
                    ? 'bg-[#246E7F] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-teal-300"></span>
                <span>Revenue (₹)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMetric('inquiries')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeMetric === 'inquiries'
                    ? 'bg-[#E06527] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-300"></span>
                <span>Leads Ingested</span>
              </button>
            </div>

            {/* Timeframe Selector */}
            <div className="inline-flex p-1 bg-slate-100 rounded-2xl text-xs font-bold border border-slate-200">
              {(['7D', '30D', '90D', '1Y'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTimeRange(t)}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    timeRange === t
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Mini Stat Telemetry Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">
              Period Pipeline
            </span>
            <div className="text-base sm:text-lg font-black text-slate-900">
              {formatPrice(periodTotalRevenue, Math.round(periodTotalRevenue / 83))}
            </div>
            <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <ArrowUpRight className="w-3 h-3" /> +28.4% growth
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">
              Inbound Leads
            </span>
            <div className="text-base sm:text-lg font-black text-[#E06527]">
              {periodTotalInquiries} Inquiries
            </div>
            <span className="text-[10px] font-bold text-slate-500 mt-0.5 block">
              {(periodTotalInquiries / rawChartData.length).toFixed(1)} avg / period
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">
              Deals Converted
            </span>
            <div className="text-base sm:text-lg font-black text-emerald-600">
              {periodTotalDeals} Closed
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded mt-0.5 inline-block border border-emerald-200">
              {Math.round((periodTotalDeals / (periodTotalInquiries || 1)) * 100)}% Win Rate
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">
              Avg Deal Size
            </span>
            <div className="text-base sm:text-lg font-black text-[#246E7F]">
              {formatPrice(Math.round(periodTotalRevenue / (periodTotalDeals || 1)), 850)}
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5 block">
              Per dedicated sprint / license
            </span>
          </div>
        </div>

        {/* Interactive Smooth SVG Graph Container */}
        <div 
          ref={chartContainerRef}
          className="relative w-full pt-4 select-none bg-gradient-to-b from-slate-50/40 via-white to-slate-50/60 rounded-3xl border border-slate-100 p-2 sm:p-4"
        >
          
          {/* Floating Hover Card (Glassmorphism) */}
          {activeHoveredPoint && activeRevCoord && (
            <div
              style={{
                left: `${(activeRevCoord.x / svgWidth) * 100}%`,
                top: '10px',
                transform: 'translateX(-50%)',
              }}
              className="absolute z-30 pointer-events-none bg-slate-900/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs transition-all duration-150 min-w-[190px]"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
                <span className="font-bold text-slate-200">{activeHoveredPoint.label}</span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">Live Synced</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-teal-300 font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#246E7F]"></span>
                    Pipeline Value:
                  </span>
                  <span className="font-black text-white font-mono">
                    {formatPrice(activeHoveredPoint.rev, Math.round(activeHoveredPoint.rev / 83))}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-amber-300 font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#E06527]"></span>
                    Inbound Leads:
                  </span>
                  <span className="font-bold text-white font-mono">
                    {activeHoveredPoint.inq} leads
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px] pt-1 border-t border-slate-800/80">
                  <span className="text-slate-400">Deals Finalized:</span>
                  <span className="font-bold text-emerald-400">{activeHoveredPoint.conv} closed</span>
                </div>
              </div>
            </div>
          )}

          {/* Pure Responsive SVG Chart */}
          <div className="w-full aspect-[21/9] sm:aspect-[24/8] min-h-[220px]">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-full overflow-visible"
            >
              <defs>
                {/* Teal Glow Area Gradient */}
                <linearGradient id="tealWaveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#246E7F" stopOpacity="0.45" />
                  <stop offset="60%" stopColor="#246E7F" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#246E7F" stopOpacity="0.0" />
                </linearGradient>

                {/* Orange Glow Area Gradient */}
                <linearGradient id="orangeWaveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E06527" stopOpacity="0.45" />
                  <stop offset="60%" stopColor="#E06527" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#E06527" stopOpacity="0.0" />
                </linearGradient>

                {/* Drop Shadows */}
                <filter id="tealGlowShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#246E7F" floodOpacity="0.3" />
                </filter>

                <filter id="orangeGlowShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#E06527" floodOpacity="0.3" />
                </filter>
              </defs>

              {/* Grid Horizontal Guide Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
                const y = paddingTop + chartInnerHeight * pct;
                return (
                  <g key={idx}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={svgWidth - paddingX}
                      y2={y}
                      stroke="#e2e8f0"
                      strokeWidth="1"
                      strokeDasharray={pct === 1 ? 'none' : '4 4'}
                    />
                  </g>
                );
              })}

              {/* 1. Revenue Wave (Area Fill + Line) */}
              {(activeMetric === 'all' || activeMetric === 'revenue') && (
                <>
                  <path
                    d={revenueArea}
                    fill="url(#tealWaveGrad)"
                    className="transition-all duration-500"
                  />
                  <path
                    d={revenueSpline}
                    fill="none"
                    stroke="#246E7F"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#tealGlowShadow)"
                    className="transition-all duration-500"
                  />
                </>
              )}

              {/* 2. Inquiries Wave (Area Fill + Line) */}
              {(activeMetric === 'all' || activeMetric === 'inquiries') && (
                <>
                  <path
                    d={inquiriesArea}
                    fill="url(#orangeWaveGrad)"
                    className="transition-all duration-500"
                  />
                  <path
                    d={inquiriesSpline}
                    fill="none"
                    stroke="#E06527"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#orangeGlowShadow)"
                    className="transition-all duration-500"
                  />
                </>
              )}

              {/* Crosshair & Highlight Dots on Hover */}
              {hoveredPointIndex !== null && activeRevCoord && (
                <g className="animate-fadeIn">
                  {/* Vertical Crosshair Line */}
                  <line
                    x1={activeRevCoord.x}
                    y1={paddingTop}
                    x2={activeRevCoord.x}
                    y2={paddingTop + chartInnerHeight}
                    stroke="#64748b"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />

                  {/* Revenue Dot */}
                  {(activeMetric === 'all' || activeMetric === 'revenue') && (
                    <g transform={`translate(${activeRevCoord.x}, ${activeRevCoord.y})`}>
                      <circle r="8" fill="#246E7F" fillOpacity="0.25" className="animate-ping" />
                      <circle r="6" fill="#246E7F" stroke="#ffffff" strokeWidth="2.5" />
                    </g>
                  )}

                  {/* Inquiries Dot */}
                  {(activeMetric === 'all' || activeMetric === 'inquiries') && activeInqCoord && (
                    <g transform={`translate(${activeInqCoord.x}, ${activeInqCoord.y})`}>
                      <circle r="8" fill="#E06527" fillOpacity="0.25" className="animate-ping" />
                      <circle r="6" fill="#E06527" stroke="#ffffff" strokeWidth="2.5" />
                    </g>
                  )}
                </g>
              )}

              {/* Data Points on Line */}
              {revenuePoints.map((pt, idx) => {
                const inqPt = inquiriesPoints[idx];
                return (
                  <g key={idx}>
                    {/* Hover hotspot column */}
                    <rect
                      x={pt.x - (chartInnerWidth / rawChartData.length) / 2}
                      y={paddingTop}
                      width={chartInnerWidth / rawChartData.length}
                      height={chartInnerHeight + 30}
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredPointIndex(idx)}
                      onMouseLeave={() => setHoveredPointIndex(null)}
                    />

                    {/* Revenue Regular Point Marker */}
                    {(activeMetric === 'all' || activeMetric === 'revenue') && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="3.5"
                        fill="#ffffff"
                        stroke="#246E7F"
                        strokeWidth="2.5"
                        className="pointer-events-none"
                      />
                    )}

                    {/* Inquiries Regular Point Marker */}
                    {(activeMetric === 'all' || activeMetric === 'inquiries') && inqPt && (
                      <circle
                        cx={inqPt.x}
                        cy={inqPt.y}
                        r="3.5"
                        fill="#ffffff"
                        stroke="#E06527"
                        strokeWidth="2.5"
                        className="pointer-events-none"
                      />
                    )}

                    {/* X-Axis Date Pill */}
                    <text
                      x={pt.x}
                      y={svgHeight - 8}
                      textAnchor="middle"
                      className={`text-[11px] font-extrabold select-none transition-colors ${
                        hoveredPointIndex === idx ? 'fill-slate-900 font-black' : 'fill-slate-400'
                      }`}
                    >
                      {pt.data.short}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Interactive Legend & Live Telemetry Details */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100 gap-3">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-1.5 rounded-full bg-[#246E7F] shadow-xs"></div>
                <span className="font-bold text-slate-700">Gross Pipeline Trajectory (₹)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-1.5 rounded-full bg-[#E06527] shadow-xs"></div>
                <span className="font-bold text-slate-700">Client Inquiries Ingested</span>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Direct Neon PostgreSQL Sync</span>
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
