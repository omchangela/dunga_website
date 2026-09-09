'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DeveloperProfile } from '@/data/developers';
import { useCurrency } from '@/context/CurrencyContext';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Languages, 
  Briefcase,
  Star,
  Layers,
  Award
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

  const hourlyRate = currency === 'INR' ? developer.hourlyRateINR : developer.hourlyRateUSD;
  const monthlyRate = currency === 'INR' ? developer.monthlyRateINR : developer.monthlyRateUSD;

  const getAvailabilityBadge = () => {
    switch (developer.availability) {
      case 'Available Now':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Available Now (24h)
          </span>
        );
      case 'Available Soon':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-50 text-cyan-700 border border-cyan-300 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
            {developer.availabilityTimeline}
          </span>
        );
      case 'In Project':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            In Project (Active Client)
          </span>
        );
    }
  };

  const isWorking = developer.availability === 'In Project';

  return (
    <div className={`bg-white rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
      isWorking ? 'border-amber-200/90 hover:border-amber-400' : 'border-slate-200/90 hover:border-[#246E7F]/40'
    }`}>
      
      {/* Top Workload Ribbon if In Project */}
      {isWorking && (
        <div className="bg-amber-500/10 border-b border-amber-200 px-4 py-1.5 text-[11px] font-bold text-amber-800 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Currently In Active Sprint with Client
          </span>
          <span className="text-[10px] text-amber-700 font-semibold">Reserve for Next Slot</span>
        </div>
      )}

      {/* Card Top / Header */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-start gap-4">
          
          {/* Avatar with Verified Ring */}
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 border-[#246E7F]/20 bg-slate-100 shadow-inner group-hover:scale-105 transition-transform duration-300">
            <Image
              src={developer.avatarUrl}
              alt={developer.name}
              fill
              className="object-cover"
            />
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

      {/* Card Middle: Skills, Specialization & Engagement */}
      <div className="p-5 space-y-4 flex-1">
        
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

        {/* Engagement & Spoken Languages */}
        <div className="grid grid-cols-2 gap-2 pt-1 text-xs text-slate-600">
          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Engagement</span>
            <span className="font-semibold text-slate-800 line-clamp-1">
              {developer.engagementModels.slice(0, 2).join(' • ')}
            </span>
          </div>
          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Languages</span>
            <span className="font-semibold text-slate-800 line-clamp-1">
              {developer.languages.join(', ')}
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
            className="w-full py-2.5 px-3 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-all text-center flex items-center justify-center gap-1 shadow-sm"
          >
            View Profile
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => onHireClick(developer)}
            className={`w-full py-2.5 px-3 text-xs font-bold text-white rounded-xl transition-all text-center shadow-sm hover:shadow flex items-center justify-center gap-1 ${
              isWorking
                ? 'bg-amber-600 hover:bg-amber-700'
                : 'bg-[#246E7F] hover:bg-[#1b5563]'
            }`}
          >
            {isWorking ? 'Reserve Slot' : 'Hire Developer'}
          </button>
        </div>

        {/* ⭐ Standout Feature: Request Similar Developer */}
        <button
          onClick={() => onRequestSimilarClick(developer)}
          className="w-full py-2 px-3 text-[11px] font-semibold text-[#E06527] bg-[#E06527]/5 hover:bg-[#E06527]/10 border border-[#E06527]/20 rounded-xl transition-all flex items-center justify-center gap-1.5"
          title={`Find another engineer with ${developer.keyTechnologies.slice(0, 3).join(', ')} experience`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E06527]" />
          Request Similar Available Dev
        </button>
      </div>

    </div>
  );
};
