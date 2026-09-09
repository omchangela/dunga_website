'use client';

import React from 'react';
import { 
  Users, 
  CheckCircle2, 
  Briefcase, 
  Clock, 
  Sparkles, 
  TrendingUp, 
  Zap, 
  ShieldCheck,
  Flame,
  ArrowRight
} from 'lucide-react';

interface LiveCapacityDashboardProps {
  currentFilter: string;
  onSelectAvailabilityFilter: (status: string) => void;
  availableCount?: number;
  workingCount?: number;
  upcomingCount?: number;
  totalCount?: number;
}

export const LiveDeveloperCapacityDashboard: React.FC<LiveCapacityDashboardProps> = ({
  currentFilter,
  onSelectAvailabilityFilter,
  availableCount = 14,
  workingCount = 38,
  upcomingCount = 6,
  totalCount = 58,
}) => {
  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden mb-10">
      
      {/* Background Glows */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#246E7F]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#E06527]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 space-y-6">
        
        {/* Top Header & Live Pulse */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-emerald-300 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-3"></span>
              <span>LIVE TALENT CAPACITY & STATUS DASHBOARD</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Real-Time Developer Availability & Active Deployments
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              See who is available for immediate onboarding versus actively building client products.
            </p>
          </div>

          {/* Live Demand Badge */}
          <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700/80 px-4 py-2.5 rounded-2xl shrink-0">
            <Flame className="w-5 h-5 text-[#E06527] animate-bounce" />
            <div className="text-left">
              <div className="text-xs font-bold text-white">73% Roster Currently Booked</div>
              <div className="text-[11px] text-slate-400">High Client Demand • Limited Immediate Slots</div>
            </div>
          </div>
        </div>

        {/* 4 Interactive Live Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* 1: Available Developers */}
          <button
            onClick={() => onSelectAvailabilityFilter(currentFilter === 'Available Now' ? 'all' : 'Available Now')}
            className={`p-5 rounded-2xl text-left transition-all duration-300 border relative overflow-hidden group ${
              currentFilter === 'Available Now'
                ? 'bg-emerald-950/80 border-emerald-500 ring-2 ring-emerald-500/50 shadow-lg shadow-emerald-950/50'
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
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 mb-1">
              {availableCount}
            </div>
            <div className="text-sm font-bold text-white mb-0.5">Available Developers</div>
            <div className="text-[11px] text-slate-400">Ready to onboard in 24–48 hours</div>
            <div className="mt-3 pt-3 border-t border-slate-700/60 text-[11px] font-semibold text-emerald-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>{currentFilter === 'Available Now' ? '✓ Showing Available' : 'Filter Available Devs'}</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </button>

          {/* 2: On Working Developers */}
          <button
            onClick={() => onSelectAvailabilityFilter(currentFilter === 'In Project' ? 'all' : 'In Project')}
            className={`p-5 rounded-2xl text-left transition-all duration-300 border relative overflow-hidden group ${
              currentFilter === 'In Project'
                ? 'bg-amber-950/80 border-amber-500 ring-2 ring-amber-500/50 shadow-lg shadow-amber-950/50'
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
            <div className="text-3xl sm:text-4xl font-black text-amber-400 mb-1">
              {workingCount}
            </div>
            <div className="text-sm font-bold text-white mb-0.5">Working Developers</div>
            <div className="text-[11px] text-slate-400">Currently building client projects</div>
            <div className="mt-3 pt-3 border-t border-slate-700/60 text-[11px] font-semibold text-amber-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>{currentFilter === 'In Project' ? '✓ Showing Working' : 'View Booked Specialists'}</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </button>

          {/* 3: Upcoming Slots */}
          <button
            onClick={() => onSelectAvailabilityFilter(currentFilter === 'Available Soon' ? 'all' : 'Available Soon')}
            className={`p-5 rounded-2xl text-left transition-all duration-300 border relative overflow-hidden group ${
              currentFilter === 'Available Soon'
                ? 'bg-cyan-950/80 border-cyan-500 ring-2 ring-cyan-500/50 shadow-lg shadow-cyan-950/50'
                : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 hover:border-cyan-500/50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                <Clock className="w-3 h-3" />
                Next Sprint
              </span>
              <TrendingUp className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-cyan-400 mb-1">
              {upcomingCount}
            </div>
            <div className="text-sm font-bold text-white mb-0.5">Freeing Up Soon</div>
            <div className="text-[11px] text-slate-400">Opening in 6–14 days (Pre-book)</div>
            <div className="mt-3 pt-3 border-t border-slate-700/60 text-[11px] font-semibold text-cyan-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>{currentFilter === 'Available Soon' ? '✓ Showing Upcoming' : 'Pre-Book Next Slots'}</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </button>

          {/* 4: Total Talent Roster */}
          <button
            onClick={() => onSelectAvailabilityFilter('all')}
            className={`p-5 rounded-2xl text-left transition-all duration-300 border relative overflow-hidden group ${
              currentFilter === 'all'
                ? 'bg-slate-800 border-[#246E7F] ring-2 ring-[#246E7F]/50 shadow-lg'
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
            <div className="text-3xl sm:text-4xl font-black text-white mb-1">
              {totalCount}+
            </div>
            <div className="text-sm font-bold text-white mb-0.5">Total Talent Pool</div>
            <div className="text-[11px] text-slate-400">Full-Stack, Mobile, AI, DevOps</div>
            <div className="mt-3 pt-3 border-t border-slate-700/60 text-[11px] font-semibold text-slate-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>View All 58+ Engineers</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </button>

        </div>

        {/* Live Visual Capacity Bar */}
        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 space-y-2">
          <div className="flex flex-wrap items-center justify-between text-xs font-semibold gap-2">
            <span className="text-slate-300">
              Current Engineering Capacity Allocation:
            </span>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5 text-amber-300">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                65% Working on Client Projects ({workingCount})
              </span>
              <span className="flex items-center gap-1.5 text-emerald-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                24% Immediate Available ({availableCount})
              </span>
              <span className="flex items-center gap-1.5 text-cyan-300">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                11% Freeing Soon ({upcomingCount})
              </span>
            </div>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-700 overflow-hidden flex shadow-inner">
            <div style={{ width: '65%' }} className="h-full bg-amber-400 transition-all duration-500" title="Working on Client Projects"></div>
            <div style={{ width: '24%' }} className="h-full bg-emerald-400 transition-all duration-500" title="Available Now"></div>
            <div style={{ width: '11%' }} className="h-full bg-cyan-400 transition-all duration-500" title="Freeing Soon"></div>
          </div>
        </div>

      </div>
    </div>
  );
};
