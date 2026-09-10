'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DEVELOPERS_DATA, DeveloperProfile } from '@/data/developers';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Users,
  ShieldCheck,
  Zap,
  Clock,
  Briefcase,
  ExternalLink,
  Edit,
  CheckCircle2,
  Search,
  Filter,
  Flame,
  Award,
  DollarSign
} from 'lucide-react';

export default function AdminDevelopersPage() {
  const { formatPrice } = useCurrency();
  const [developers, setDevelopers] = useState<DeveloperProfile[]>(DEVELOPERS_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAvailability, setFilterAvailability] = useState('all');

  const handleStatusToggle = (id: string, newAvailability: 'Available Now' | 'In Project' | 'Available Soon') => {
    setDevelopers((prev) =>
      prev.map((dev) => {
        if (dev.id === id) {
          return {
            ...dev,
            availability: newAvailability,
            liveStatusText:
              newAvailability === 'Available Now'
                ? 'Available for Immediate Onboarding'
                : newAvailability === 'In Project'
                ? 'Active in Client Sprint (85% Bandwidth)'
                : 'Sprint Handover Phase'
          };
        }
        return dev;
      })
    );
  };

  const filteredDevs = developers.filter((dev) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        dev.name.toLowerCase().includes(q) ||
        dev.role.toLowerCase().includes(q) ||
        dev.keyTechnologies.some((t) => t.toLowerCase().includes(q));
      if (!match) return false;
    }
    if (filterAvailability !== 'all' && dev.availability !== filterAvailability) {
      return false;
    }
    return true;
  });

  const availableCount = developers.filter((d) => d.availability === 'Available Now').length;
  const inProjectCount = developers.filter((d) => d.availability === 'In Project').length;
  const upcomingCount = developers.filter((d) => d.availability === 'Available Soon').length;

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Developer Roster & Live Capacity
          </h2>
          <p className="text-xs text-slate-400">
            Manage engineer availability states, active client sprint assignments, and rates.
          </p>
        </div>

        <Link
          href="/hire-developers"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#E06527]" />
          <span>View Public Roster</span>
        </Link>
      </div>

      {/* Roster Capacity Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
              Available Now (24h)
            </span>
            <span className="text-2xl font-black text-white">{availableCount} Engineers</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Zap className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
              In Active Client Sprints
            </span>
            <span className="text-2xl font-black text-white">{inProjectCount} Engineers</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
              Freeing Up Soon
            </span>
            <span className="text-2xl font-black text-white">{upcomingCount} Engineers</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by engineer name, role, tech stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#246E7F]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={filterAvailability}
            onChange={(e) => setFilterAvailability(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 font-bold focus:outline-none focus:ring-2 focus:ring-[#246E7F] cursor-pointer"
          >
            <option value="all">All Statuses ({developers.length})</option>
            <option value="Available Now">🟢 Available Now</option>
            <option value="In Project">🟡 In Project</option>
            <option value="Available Soon">🔵 Available Soon</option>
          </select>
        </div>
      </div>

      {/* Developer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDevs.map((dev) => {
          const isAvailable = dev.availability === 'Available Now';
          const isWorking = dev.availability === 'In Project';

          return (
            <div
              key={dev.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start gap-3.5">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-800 border-2 border-slate-700 shrink-0">
                    <Image src={dev.avatarUrl} alt={dev.name} fill className="object-cover" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <Link
                        href={`/hire-developers/${dev.slug}`}
                        target="_blank"
                        className="text-sm font-bold text-white hover:text-teal-400 transition-colors truncate"
                      >
                        {dev.name}
                      </Link>
                    </div>
                    <p className="text-xs text-slate-400 truncate">{dev.role}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span>{dev.experienceLabel}</span>
                      <span>•</span>
                      <span className="text-emerald-400">⭐ {dev.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Status Switcher Dropdown */}
                <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800 space-y-1">
                  <label className="block text-[10px] uppercase font-bold text-slate-400">
                    Live Status & Availability
                  </label>
                  <select
                    value={dev.availability}
                    onChange={(e) =>
                      handleStatusToggle(
                        dev.id,
                        e.target.value as 'Available Now' | 'In Project' | 'Available Soon'
                      )
                    }
                    className={`w-full text-xs font-bold px-2.5 py-1.5 rounded-lg border focus:outline-none cursor-pointer ${
                      isAvailable
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : isWorking
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    }`}
                  >
                    <option value="Available Now">🟢 Available Now (24h Start)</option>
                    <option value="In Project">🟡 In Project (Active Client)</option>
                    <option value="Available Soon">🔵 Available Soon (Next Sprint)</option>
                  </select>
                </div>

                {/* Current Sprint Focus */}
                <div className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80 text-[11px] text-slate-300 space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Current Active Sprint</span>
                  <p className="font-medium truncate">{dev.currentSprintName || 'Full-Stack Architecture'}</p>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1">
                  {dev.keyTechnologies.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-mono font-medium rounded-md bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                  {dev.keyTechnologies.length > 4 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-md bg-slate-800 text-slate-400">
                      +{dev.keyTechnologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Rates & Actions Footer */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Rates</span>
                  <span className="font-bold text-teal-300">
                    {formatPrice(dev.hourlyRateINR, dev.hourlyRateUSD)}/hr
                  </span>
                </div>

                <Link
                  href={`/hire-developers/${dev.slug}`}
                  target="_blank"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center gap-1 transition-colors"
                >
                  <span>Public View</span>
                  <ExternalLink className="w-3 h-3 text-[#E06527]" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
