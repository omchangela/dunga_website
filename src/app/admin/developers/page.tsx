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
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Developer Roster & Live Capacity
          </h2>
          <p className="text-xs text-slate-500">
            Manage engineer availability states, active client sprint assignments, and rates.
          </p>
        </div>

        <Link
          href="/hire-developers"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 rounded-xl transition-colors shadow-xs"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#E06527]" />
          <span>View Public Roster</span>
        </Link>
      </div>

      {/* Roster Capacity Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
              Available Now (24h)
            </span>
            <span className="text-2xl font-black text-slate-900">{availableCount} Engineers</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <Zap className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
              In Active Client Sprints
            </span>
            <span className="text-2xl font-black text-slate-900">{inProjectCount} Engineers</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider block">
              Freeing Up Soon
            </span>
            <span className="text-2xl font-black text-slate-900">{upcomingCount} Engineers</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#246E7F]">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by engineer name, role, tech stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#246E7F]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={filterAvailability}
            onChange={(e) => setFilterAvailability(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-bold focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#246E7F] cursor-pointer"
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
              className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start gap-3.5">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-200 shrink-0">
                    <Image src={dev.avatarUrl} alt={dev.name} fill className="object-cover" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <Link
                        href={`/hire-developers/${dev.slug}`}
                        target="_blank"
                        className="text-sm font-bold text-slate-900 hover:text-[#246E7F] transition-colors truncate"
                      >
                        {dev.name}
                      </Link>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{dev.role}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span>{dev.experienceLabel}</span>
                      <span>•</span>
                      <span className="text-emerald-600 font-semibold">⭐ {dev.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Status Switcher Dropdown */}
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1">
                  <label className="block text-[10px] uppercase font-bold text-slate-500">
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
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : isWorking
                        ? 'bg-amber-50 text-amber-700 border-amber-300'
                        : 'bg-teal-50 text-teal-700 border-teal-300'
                    }`}
                  >
                    <option value="Available Now">🟢 Available Now (24h Start)</option>
                    <option value="In Project">🟡 In Project (Active Client)</option>
                    <option value="Available Soon">🔵 Available Soon (Next Sprint)</option>
                  </select>
                </div>

                {/* Current Sprint Focus */}
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[11px] text-slate-700 space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Current Active Sprint</span>
                  <p className="font-semibold truncate">{dev.currentSprintName || 'Full-Stack Architecture'}</p>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1">
                  {dev.keyTechnologies.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-mono font-medium rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                  {dev.keyTechnologies.length > 4 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-md bg-slate-100 text-slate-500">
                      +{dev.keyTechnologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Rates & Actions Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Rates</span>
                  <span className="font-bold text-[#246E7F]">
                    {formatPrice(dev.hourlyRateINR, dev.hourlyRateUSD)}/hr
                  </span>
                </div>

                <Link
                  href={`/hire-developers/${dev.slug}`}
                  target="_blank"
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1 transition-colors border border-slate-200"
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

