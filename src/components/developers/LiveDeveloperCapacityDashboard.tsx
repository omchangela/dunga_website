'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Briefcase, 
  Clock, 
  TrendingUp, 
  Zap, 
  ShieldCheck,
  Flame,
  ArrowRight,
  RefreshCw,
  Activity,
  Radio,
  Sparkles
} from 'lucide-react';

interface LiveCapacityDashboardProps {
  currentFilter: string;
  onSelectAvailabilityFilter: (status: string) => void;
  initialAvailableCount?: number;
  initialWorkingCount?: number;
  initialUpcomingCount?: number;
  initialTotalCount?: number;
}

const LIVE_SPRINT_EVENTS = [
  { id: 1, text: 'Senior Full-Stack Engineer (#DEV-101) passed milestone — Ready for immediate 24h sprint', time: 'Just now', type: 'avail' },
  { id: 2, text: 'Senior Backend Architect (#DEV-103) deployed high-concurrency Redis queue for US FinTech client', time: '2m ago', type: 'work' },
  { id: 3, text: 'Client Inquiry: Dedicated Next.js 15 & Tailwind CSS squad booked for 3-month contract', time: '4m ago', type: 'book' },
  { id: 4, text: 'Senior Flutter Developer (#DEV-104) entering handover phase — Next slot opening in 6 days', time: '7m ago', type: 'soon' },
  { id: 5, text: 'Senior AI Engineer (#DEV-105) completed RAG knowledge pipeline benchmark (0.2s latency)', time: '11m ago', type: 'avail' },
  { id: 6, text: 'Senior DevOps Specialist (#DEV-106) completed AWS multi-region Kubernetes hardening', time: '14m ago', type: 'work' },
];

export const LiveDeveloperCapacityDashboard: React.FC<LiveCapacityDashboardProps> = ({
  currentFilter,
  onSelectAvailabilityFilter,
  initialAvailableCount = 14,
  initialWorkingCount = 38,
  initialUpcomingCount = 6,
  initialTotalCount = 58,
}) => {
  // Live dynamic real-time states
  const [availableCount, setAvailableCount] = useState(initialAvailableCount);
  const [workingCount, setWorkingCount] = useState(initialWorkingCount);
  const [upcomingCount, setUpcomingCount] = useState(initialUpcomingCount);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  
  const [activeClientsLooking, setActiveClientsLooking] = useState(19);
  const [secondsAgo, setSecondsAgo] = useState(4);
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeEventIndex, setActiveEventIndex] = useState(0);

  // Timer: Seconds ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsAgo((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Timer: Event ticker rotation
  useEffect(() => {
    const eventTimer = setInterval(() => {
      setActiveEventIndex((prev) => (prev + 1) % LIVE_SPRINT_EVENTS.length);
    }, 4500);
    return () => clearInterval(eventTimer);
  }, []);

  // Periodic Real-Time Micro-Fluctuation simulation
  useEffect(() => {
    const syncInterval = setInterval(() => {
      setIsSyncing(true);
      setSecondsAgo(0);

      // Subtle dynamic changes to simulate active real-time booking operations
      setTimeout(() => {
        const jitter = Math.random();
        if (jitter > 0.6) {
          setAvailableCount((prev) => {
            const next = prev === 14 ? 13 : prev === 13 ? 15 : 14;
            return next;
          });
          setWorkingCount((prev) => {
            const next = prev === 38 ? 39 : prev === 39 ? 37 : 38;
            return next;
          });
          setActiveClientsLooking(Math.floor(18 + Math.random() * 8));
        } else if (jitter < 0.3) {
          setUpcomingCount((prev) => (prev === 6 ? 7 : prev === 7 ? 5 : 6));
          setActiveClientsLooking(Math.floor(19 + Math.random() * 6));
        }
        setIsSyncing(false);
      }, 700);
    }, 14000);

    return () => clearInterval(syncInterval);
  }, []);

  // Derived real-time calculations
  const total = availableCount + workingCount + upcomingCount;
  const workingPercent = Math.round((workingCount / total) * 100);
  const availablePercent = Math.round((availableCount / total) * 100);
  const upcomingPercent = 100 - workingPercent - availablePercent;
  const bookedRosterPercentage = workingPercent;

  const currentEvent = LIVE_SPRINT_EVENTS[activeEventIndex];

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 relative overflow-hidden mb-10">
      
      {/* Dynamic Background Glows */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#246E7F]/25 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#E06527]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 space-y-6">
        
        {/* Top Header & Real-Time Sync Indicator */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/90 pb-5">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>LIVE TALENT CAPACITY & STATUS DASHBOARD</span>
              </div>

              {/* Real-Time Sync status pill */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800/90 text-slate-300 border border-slate-700">
                <RefreshCw className={`w-3 h-3 text-emerald-400 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>Auto-synced {secondsAgo}s ago</span>
              </div>

              {/* Live concurrent clients viewing */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#246E7F]/20 text-teal-300 border border-[#246E7F]/30">
                <Radio className="w-3 h-3 text-teal-400 animate-pulse" />
                <span>{activeClientsLooking} active clients looking now</span>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Real-Time Developer Availability & Active Deployments
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Live engineering roster capacity. Click any metric card below to filter available, booked, or upcoming talent.
            </p>
          </div>

          {/* Live Demand Gauge Badge */}
          <div className="flex items-center gap-3.5 bg-gradient-to-br from-slate-800/90 to-slate-800/50 border border-slate-700/80 px-4 py-3 rounded-2xl shrink-0 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 text-[#E06527] animate-bounce" />
            </div>
            <div className="text-left">
              <div className="text-sm font-extrabold text-white flex items-center gap-1.5">
                <span>{bookedRosterPercentage}% Roster Currently Booked</span>
              </div>
              <div className="text-[11px] text-slate-400">
                High Client Demand • Instant 24h Onboarding
              </div>
            </div>
          </div>
        </div>

        {/* 4 Interactive Live Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Available Developers */}
          <button
            onClick={() => onSelectAvailabilityFilter(currentFilter === 'Available Now' ? 'all' : 'Available Now')}
            className={`p-5 rounded-2xl text-left transition-all duration-300 border relative overflow-hidden group cursor-pointer ${
              currentFilter === 'Available Now'
                ? 'bg-emerald-950/80 border-emerald-500 ring-2 ring-emerald-500/50 shadow-xl shadow-emerald-950/60'
                : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 hover:border-emerald-500/50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Instant Start
              </span>
              <Zap className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight transition-all duration-300">
                {availableCount}
              </span>
              <span className="text-[11px] font-semibold text-emerald-300/80 uppercase">Devs Live</span>
            </div>
            <div className="text-sm font-bold text-white mb-0.5">Available Developers</div>
            <div className="text-[11px] text-slate-400">Ready to onboard in 24–48 hours</div>
            <div className="mt-3 pt-3 border-t border-slate-700/60 text-[11px] font-semibold text-emerald-400 flex items-center justify-between group-hover:translate-x-0.5 transition-transform">
              <span>{currentFilter === 'Available Now' ? '✓ Showing Available' : 'Filter Available Devs'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Card 2: On Working Developers */}
          <button
            onClick={() => onSelectAvailabilityFilter(currentFilter === 'In Project' ? 'all' : 'In Project')}
            className={`p-5 rounded-2xl text-left transition-all duration-300 border relative overflow-hidden group cursor-pointer ${
              currentFilter === 'In Project'
                ? 'bg-amber-950/80 border-amber-500 ring-2 ring-amber-500/50 shadow-xl shadow-amber-950/60'
                : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 hover:border-amber-500/50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                Active Sprints
              </span>
              <Briefcase className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight transition-all duration-300">
                {workingCount}
              </span>
              <span className="text-[11px] font-semibold text-amber-300/80 uppercase">In Sprints</span>
            </div>
            <div className="text-sm font-bold text-white mb-0.5">Working Developers</div>
            <div className="text-[11px] text-slate-400">Currently building client projects</div>
            <div className="mt-3 pt-3 border-t border-slate-700/60 text-[11px] font-semibold text-amber-400 flex items-center justify-between group-hover:translate-x-0.5 transition-transform">
              <span>{currentFilter === 'In Project' ? '✓ Showing Working' : 'View Booked Specialists'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Card 3: Upcoming Slots */}
          <button
            onClick={() => onSelectAvailabilityFilter(currentFilter === 'Available Soon' ? 'all' : 'Available Soon')}
            className={`p-5 rounded-2xl text-left transition-all duration-300 border relative overflow-hidden group cursor-pointer ${
              currentFilter === 'Available Soon'
                ? 'bg-cyan-950/80 border-cyan-500 ring-2 ring-cyan-500/50 shadow-xl shadow-cyan-950/60'
                : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 hover:border-cyan-500/50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                <Clock className="w-3 h-3 text-cyan-400" />
                Next Sprint
              </span>
              <TrendingUp className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl sm:text-4xl font-black text-cyan-400 tracking-tight transition-all duration-300">
                {upcomingCount}
              </span>
              <span className="text-[11px] font-semibold text-cyan-300/80 uppercase">Freeing Soon</span>
            </div>
            <div className="text-sm font-bold text-white mb-0.5">Freeing Up Soon</div>
            <div className="text-[11px] text-slate-400">Opening in 6–14 days (Pre-book)</div>
            <div className="mt-3 pt-3 border-t border-slate-700/60 text-[11px] font-semibold text-cyan-400 flex items-center justify-between group-hover:translate-x-0.5 transition-transform">
              <span>{currentFilter === 'Available Soon' ? '✓ Showing Upcoming' : 'Pre-Book Next Slots'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Card 4: Total Talent Roster */}
          <button
            onClick={() => onSelectAvailabilityFilter('all')}
            className={`p-5 rounded-2xl text-left transition-all duration-300 border relative overflow-hidden group cursor-pointer ${
              currentFilter === 'all'
                ? 'bg-slate-800 border-[#246E7F] ring-2 ring-[#246E7F]/50 shadow-xl'
                : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 hover:border-slate-500'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/10 text-slate-200 border border-white/20">
                <ShieldCheck className="w-3 h-3 text-[#E06527]" />
                Pre-Vetted
              </span>
              <Users className="w-4 h-4 text-slate-400" />
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {totalCount}+
              </span>
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Engineers</span>
            </div>
            <div className="text-sm font-bold text-white mb-0.5">Total Talent Pool</div>
            <div className="text-[11px] text-slate-400">Full-Stack, Mobile, AI, DevOps</div>
            <div className="mt-3 pt-3 border-t border-slate-700/60 text-[11px] font-semibold text-slate-300 flex items-center justify-between group-hover:translate-x-0.5 transition-transform">
              <span>View All 58+ Engineers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

        </div>

        {/* Live Visual Capacity Bar */}
        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between text-xs font-semibold gap-2">
            <div className="flex items-center gap-2 text-slate-300">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Current Engineering Capacity Allocation:</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] flex-wrap">
              <span className="flex items-center gap-1.5 text-amber-300">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                {workingPercent}% Working on Client Projects ({workingCount})
              </span>
              <span className="flex items-center gap-1.5 text-emerald-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                {availablePercent}% Immediate Available ({availableCount})
              </span>
              <span className="flex items-center gap-1.5 text-cyan-300">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                {upcomingPercent}% Freeing Soon ({upcomingCount})
              </span>
            </div>
          </div>

          <div className="w-full h-3.5 rounded-full bg-slate-700/80 overflow-hidden flex shadow-inner p-0.5">
            <div 
              style={{ width: `${workingPercent}%` }} 
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-l-full transition-all duration-700" 
              title={`Working on Client Projects: ${workingPercent}%`}
            ></div>
            <div 
              style={{ width: `${availablePercent}%` }} 
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700" 
              title={`Available Now: ${availablePercent}%`}
            ></div>
            <div 
              style={{ width: `${upcomingPercent}%` }} 
              className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-r-full transition-all duration-700" 
              title={`Freeing Soon: ${upcomingPercent}%`}
            ></div>
          </div>
        </div>

        {/* Real-Time Live Activity Event Ticker */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl px-4 py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-bold text-emerald-400 text-[11px] uppercase tracking-wider">
              LIVE ACTIVITY FEED:
            </span>
          </div>
          <div className="flex-1 min-w-0 text-slate-300 truncate transition-all duration-500">
            <span className="text-white font-medium">{currentEvent.text}</span>
          </div>
          <div className="text-[10px] text-slate-400 font-semibold shrink-0 bg-slate-900/60 px-2 py-0.5 rounded-md border border-slate-700">
            {currentEvent.time}
          </div>
        </div>

      </div>
    </div>
  );
};
