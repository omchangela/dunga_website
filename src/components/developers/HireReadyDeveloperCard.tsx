'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DeveloperProfile } from '@/data/developers';
import { useCurrency } from '@/context/CurrencyContext';
import { 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Languages, 
  Briefcase,
  Star,
  Award,
  Activity,
  GitCommit,
  CheckCircle2,
  Zap,
  Timer
} from 'lucide-react';

interface HireReadyDeveloperCardProps {
  developer: DeveloperProfile;
  onHireClick: (dev: DeveloperProfile) => void;
  onRequestSimilarClick: (dev: DeveloperProfile) => void;
}

export const HireReadyDeveloperCard: React.FC<HireReadyDeveloperCardProps> = ({
  developer,
  onHireClick,
  onRequestSimilarClick,
}) => {
  const { currency, formatPrice } = useCurrency();

  const isWorking = developer.availability === 'In Project';
  const isAvailableSoon = developer.availability === 'Available Soon';
  const isAvailableNow = developer.availability === 'Available Now';

  const getAvailabilityBadge = () => {
    if (isAvailableNow) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Available Now (24h)
        </span>
      );
    }
    if (isAvailableSoon) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-50 text-cyan-700 border border-cyan-300 shadow-xs">
          <Clock className="w-3 h-3 text-cyan-600" />
          {developer.availabilityTimeline}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300 shadow-xs">
        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
        In Project (Active Client)
      </span>
    );
  };

  return (
    <div className={`bg-white rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
      isWorking 
        ? 'border-amber-200/90 hover:border-amber-400' 
        : isAvailableSoon 
        ? 'border-cyan-200/90 hover:border-cyan-400'
        : 'border-slate-200/90 hover:border-[#246E7F]/50'
    }`}>
      
      {/* Top Real-Time Status Ribbon */}
      {isWorking && (
        <div className="bg-amber-500/10 border-b border-amber-200 px-4 py-2 text-[11px] font-bold text-amber-800 flex items-center justify-between">
          <span className="flex items-center gap-1.5 truncate">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="truncate">Active Sprint ({developer.currentLoadPercentage || 85}% Bandwidth)</span>
          </span>
          <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider shrink-0 bg-amber-100 px-2 py-0.5 rounded">
            Reserve Next Slot
          </span>
        </div>
      )}

      {isAvailableSoon && (
        <div className="bg-cyan-500/10 border-b border-cyan-200 px-4 py-2 text-[11px] font-bold text-cyan-800 flex items-center justify-between">
          <span className="flex items-center gap-1.5 truncate">
            <Clock className="w-3 h-3 text-cyan-600 shrink-0" />
            <span className="truncate">Sprint Handover Phase • Opens Soon</span>
          </span>
          <span className="text-[10px] text-cyan-700 font-bold uppercase tracking-wider shrink-0 bg-cyan-100 px-2 py-0.5 rounded">
            Pre-Book Slot
          </span>
        </div>
      )}

      {isAvailableNow && (
        <div className="bg-emerald-500/10 border-b border-emerald-200 px-4 py-2 text-[11px] font-bold text-emerald-800 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>Active {developer.lastActiveAgo || '2m ago'} • Response &lt; {developer.responseTimeMinutes || 10}m</span>
          </span>
          <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded">
            1-Week Trial Ready
          </span>
        </div>
      )}

      {/* Card Top / Header */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-start gap-4">
          
          {/* Avatar with Status Ring */}
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 border-[#246E7F]/20 bg-slate-100 shadow-inner group-hover:scale-105 transition-transform duration-300">
            <Image
              src={developer.avatarUrl}
              alt={developer.name}
              fill
              className="object-cover"
            />
            {/* Live active dot on avatar */}
            <span className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-white ${
              isAvailableNow ? 'bg-emerald-500' : isWorking ? 'bg-amber-500' : 'bg-cyan-500'
            }`} />
          </div>

          {/* Identity & Badges */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
              <Link
                href={`/hire-developers/${developer.slug}`}
                className="text-base sm:text-lg font-bold text-slate-900 hover:text-[#246E7F] transition-colors truncate"
              >
                {developer.name}
              </Link>
            </div>

            <div className="mb-2">
              {getAvailabilityBadge()}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
              <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                {developer.experienceLabel}
              </span>
              {developer.isVerified && (
                <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Pro
                </span>
              )}
              {developer.isSkillsAssessed && (
                <span className="inline-flex items-center gap-1 text-[#E06527] font-medium">
                  <Award className="w-3.5 h-3.5" />
                  Assessed
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Card Middle: Real-Time Sprint Log, Skills, Specialization & Rates */}
      <div className="p-5 space-y-4 flex-1">
        
        {/* Real-Time Live Sprint / Focus Pill */}
        <div className={`p-2.5 rounded-xl border text-xs ${
          isWorking 
            ? 'bg-amber-50/70 border-amber-200/80 text-amber-900' 
            : isAvailableSoon
            ? 'bg-cyan-50/70 border-cyan-200/80 text-cyan-900'
            : 'bg-emerald-50/70 border-emerald-200/80 text-emerald-900'
        }`}>
          <div className="flex items-center gap-1.5 font-bold mb-0.5 text-[10px] uppercase tracking-wider opacity-80">
            <Activity className="w-3 h-3" />
            <span>{isWorking ? 'Current Active Sprint' : isAvailableSoon ? 'Closing Sprint Phase' : 'Immediate Sprint Focus'}</span>
          </div>
          <div className="font-medium text-[11px] line-clamp-1">
            {developer.currentSprintName || 'Full-Stack Architecture & High-Performance Web Apps'}
          </div>
        </div>

        {/* Technologies */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Core Technologies
          </span>
          <div className="flex flex-wrap gap-1.5">
            {developer.keyTechnologies.slice(0, 5).map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:bg-[#246E7F]/10 hover:text-[#246E7F] hover:border-[#246E7F]/30 transition-colors"
              >
                {tech}
              </span>
            ))}
            {developer.keyTechnologies.length > 5 && (
              <span className="px-2 py-1 text-xs font-semibold rounded-lg bg-slate-100 text-slate-500">
                +{developer.keyTechnologies.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Specialization */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Specialization
          </span>
          <p className="text-xs text-slate-600 leading-relaxed">
            {developer.specializations.join(' • ')}
          </p>
        </div>

        {/* Real-time Telemetry Stats: Commits, SLA, Languages */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Commits</span>
            <span className="font-extrabold text-slate-800 text-xs flex items-center justify-center gap-1">
              <GitCommit className="w-3 h-3 text-[#246E7F]" />
              {developer.weeklyCommits || 30}/wk
            </span>
          </div>
          <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">On-Time</span>
            <span className="font-extrabold text-emerald-600 text-xs flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              {developer.onTimeDeliveryRate || 99.8}%
            </span>
          </div>
          <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Response</span>
            <span className="font-extrabold text-slate-800 text-xs flex items-center justify-center gap-1">
              <Timer className="w-3 h-3 text-[#E06527]" />
              &lt;{developer.responseTimeMinutes || 10}m
            </span>
          </div>
        </div>

        {/* Rates / Cost at a Glance */}
        <div className="bg-gradient-to-r from-teal-50/70 to-emerald-50/70 border border-teal-100 rounded-xl p-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#246E7F] block">Starting Rate</span>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-extrabold text-slate-900">
                {formatPrice(developer.hourlyRateINR, developer.hourlyRateUSD)}
              </span>
              <span className="text-[11px] text-slate-500">/hr</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-emerald-700 block">Full Time</span>
            <span className="text-xs font-bold text-slate-700">
              {formatPrice(developer.monthlyRateINR, developer.monthlyRateUSD)}/mo
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer: Action Buttons */}
      <div className="p-4 bg-slate-50/80 border-t border-slate-100 space-y-2">
        
        {/* Main 2 CTA Buttons: View Profile & Hire / Reserve */}
        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/hire-developers/${developer.slug}`}
            className="w-full py-2.5 px-3 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-all text-center flex items-center justify-center gap-1 shadow-xs hover:border-slate-300"
          >
            View Profile
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => onHireClick(developer)}
            className={`w-full py-2.5 px-3 text-xs font-bold text-white rounded-xl transition-all text-center shadow-xs hover:shadow flex items-center justify-center gap-1 cursor-pointer ${
              isWorking
                ? 'bg-amber-600 hover:bg-amber-700'
                : isAvailableSoon
                ? 'bg-cyan-600 hover:bg-cyan-700'
                : 'bg-[#246E7F] hover:bg-[#1b5563]'
            }`}
          >
            {isWorking ? 'Reserve Slot' : isAvailableSoon ? 'Pre-Book Slot' : 'Hire Developer'}
          </button>
        </div>

        {/* Standout Feature: Request Similar Developer */}
        <button
          onClick={() => onRequestSimilarClick(developer)}
          className="w-full py-2 px-3 text-[11px] font-semibold text-[#E06527] bg-[#E06527]/5 hover:bg-[#E06527]/10 border border-[#E06527]/20 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          title={`Find another engineer with ${developer.keyTechnologies.slice(0, 3).join(', ')} experience`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E06527]" />
          Request Similar Available Dev
        </button>
      </div>

    </div>
  );
};
