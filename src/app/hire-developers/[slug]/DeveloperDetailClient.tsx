'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DeveloperProfile, DEVELOPERS_DATA } from '@/data/developers';
import { useCurrency } from '@/context/CurrencyContext';
import { HireDeveloperModal } from '@/components/developers/HireDeveloperModal';
import { RequestSimilarDeveloperModal } from '@/components/developers/RequestSimilarDeveloperModal';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  MapPin, 
  Globe2, 
  Briefcase, 
  ArrowLeft, 
  Sparkles, 
  Layers, 
  FolderGit2, 
  GraduationCap, 
  Check, 
  Send,
  Zap
} from 'lucide-react';

interface DeveloperDetailClientProps {
  developer: DeveloperProfile;
}

export const DeveloperDetailClient: React.FC<DeveloperDetailClientProps> = ({ developer }) => {
  const { currency, formatPrice } = useCurrency();
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [isSimilarModalOpen, setIsSimilarModalOpen] = useState(false);

  const hourlyRate = currency === 'INR' ? developer.hourlyRateINR : developer.hourlyRateUSD;
  const monthlyRate = currency === 'INR' ? developer.monthlyRateINR : developer.monthlyRateUSD;

  // Level color helper
  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Advanced':
        return 'bg-teal-50 text-[#246E7F] border-teal-200';
      case 'Intermediate':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link & Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/hire-developers"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#246E7F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Developers
          </Link>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Hire Developers</span>
            <span>/</span>
            <span className="font-semibold text-slate-900">{developer.name}</span>
          </div>
        </div>

        {/* Profile Top Banner / Header */}
        <div className="bg-gradient-to-r from-slate-900 via-[#1b5563] to-[#246E7F] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          
          {/* Subtle geometric background patterns */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            
            {/* Left: Avatar + Details */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl shrink-0 bg-slate-800">
                <Image
                  src={developer.avatarUrl}
                  alt={developer.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#E06527] text-white uppercase tracking-wider">
                    Hire-Ready
                  </span>
                  {developer.isVerified && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                      <ShieldCheck className="w-4 h-4 text-emerald-300" />
                      Profile Verified
                    </span>
                  )}
                  {developer.isSkillsAssessed && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-teal-100 border border-white/20">
                      <Award className="w-4 h-4 text-teal-300" />
                      Skills Assessed
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-white">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                    {developer.availability}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {developer.name}
                </h1>

                <p className="text-teal-100 font-medium text-base sm:text-lg flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#E06527]" />
                  {developer.role} • <span className="text-white font-semibold">{developer.experienceLabel}</span>
                </p>
              </div>
            </div>

            {/* Right: Quick Action Buttons & Pricing */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 sm:min-w-[280px] w-full md:w-auto space-y-4">
              <div>
                <span className="text-xs text-teal-100 uppercase tracking-wider block font-medium">Hiring Rate</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-black text-white">
                    {formatPrice(developer.hourlyRateINR, developer.hourlyRateUSD)}
                  </span>
                  <span className="text-teal-200 text-xs">/ hour</span>
                  <span className="text-white/40">•</span>
                  <span className="text-xs font-semibold text-teal-100">
                    {formatPrice(developer.monthlyRateINR, developer.monthlyRateUSD)} / mo
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setIsHireModalOpen(true)}
                  className="w-full py-3 px-4 bg-[#E06527] hover:bg-[#c95318] text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Hire {developer.shortName} Now
                </button>
                <button
                  onClick={() => setIsSimilarModalOpen(true)}
                  className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 text-teal-100 font-semibold text-xs rounded-xl border border-white/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  Request Similar Developer
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 2-Column Main Layout: Left = Bio, Skills, Projects. Right = Snapshot Stats & Booking */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (2 Cols wide) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. About Developer */}
            <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="w-2 h-2 rounded-full bg-[#246E7F]"></span>
                About Developer
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {developer.bio}
              </p>
              
              <div className="pt-2 flex flex-wrap gap-2">
                {developer.specializations.map((spec, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200"
                  >
                    ✓ {spec}
                  </span>
                ))}
              </div>
            </section>

            {/* 2. Technical Skills with Proficiency Levels & Progress Bars */}
            <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E06527]"></span>
                  Assessed Technical Skills & Proficiency
                </h2>
                <span className="text-xs text-slate-500 font-medium">Verified by Technical Benchmarks</span>
              </div>

              {/* Frontend */}
              {developer.technicalSkills.frontend.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Frontend Engineering
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {developer.technicalSkills.frontend.map((skill, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">{skill.name}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getLevelBadge(skill.level)}`}>
                            {skill.level}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-[#246E7F] h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${skill.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Backend */}
              {developer.technicalSkills.backend.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Backend & API Architecture
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {developer.technicalSkills.backend.map((skill, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">{skill.name}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getLevelBadge(skill.level)}`}>
                            {skill.level}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-[#246E7F] h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${skill.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Database */}
              {developer.technicalSkills.database.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Databases & Caching
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {developer.technicalSkills.database.map((skill, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">{skill.name}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getLevelBadge(skill.level)}`}>
                            {skill.level}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-[#246E7F] h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${skill.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cloud & DevOps */}
              {developer.technicalSkills.cloudAndDevOps.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Cloud, CI/CD & Deployment
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {developer.technicalSkills.cloudAndDevOps.map((skill, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">{skill.name}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getLevelBadge(skill.level)}`}>
                            {skill.level}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-[#246E7F] h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${skill.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* 3. Featured Projects Contributed */}
            <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-[#246E7F]" />
                  Featured Project Contributions
                </h2>
                <p className="text-xs text-slate-500">Real enterprise applications, SaaS platforms, and mobile apps built</p>
              </div>

              <div className="space-y-4">
                {developer.featuredProjects.map((project, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{project.title}</h3>
                      <span className="text-xs font-medium text-[#246E7F] bg-[#246E7F]/10 px-2.5 py-0.5 rounded-md">
                        {project.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techStack.map((t, tidx) => (
                        <span key={tidx} className="text-[11px] px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Education & Certifications */}
            <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <GraduationCap className="w-5 h-5 text-[#246E7F]" />
                Education & Professional Certifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {developer.educationAndCerts.map((cert, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-slate-800">{cert}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column: Developer Snapshot & Quick Hiring Sidebar */}
          <div className="space-y-6">
            
            {/* Developer Snapshot Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
                Developer Snapshot
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Experience</span>
                  <span className="font-bold text-slate-900">{developer.experienceYears}+ Years</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Completed Projects</span>
                  <span className="font-bold text-slate-900">{developer.completedProjectsCount}+ Projects</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Primary Role</span>
                  <span className="font-bold text-[#246E7F]">{developer.role}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Availability</span>
                  <span className="font-bold text-emerald-600">{developer.availability}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Engagement</span>
                  <span className="font-bold text-slate-900">{developer.engagementModels.join(' / ')}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Location</span>
                  <span className="font-bold text-slate-900">{developer.location}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Time Zone</span>
                  <span className="font-bold text-slate-900">{developer.timeZone}</span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-500">Spoken Languages</span>
                  <span className="font-bold text-slate-900">{developer.languages.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Quick Hiring Action Box */}
            <div className="bg-gradient-to-br from-teal-50 to-white rounded-2xl border-2 border-[#246E7F]/30 p-6 space-y-4 shadow-sm">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#246E7F] uppercase tracking-wider">Instant Onboarding</span>
                <h3 className="text-base font-bold text-slate-900">
                  Hire {developer.name}
                </h3>
                <p className="text-xs text-slate-600">
                  Start with a 1-week risk-free trial. 100% IP ownership & direct communication.
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Hourly Engagement:</span>
                  <span className="font-bold text-[#246E7F]">{formatPrice(developer.hourlyRateINR, developer.hourlyRateUSD)} / hr</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Dedicated Full-Time:</span>
                  <span className="font-bold text-slate-900">{formatPrice(developer.monthlyRateINR, developer.monthlyRateUSD)} / mo</span>
                </div>
              </div>

              <button
                onClick={() => setIsHireModalOpen(true)}
                className="w-full py-3 bg-[#246E7F] hover:bg-[#1b5563] text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Proceed to Hire {developer.shortName}
              </button>

              <button
                onClick={() => setIsSimilarModalOpen(true)}
                className="w-full py-2.5 bg-white hover:bg-slate-50 text-[#E06527] font-semibold text-xs rounded-xl border border-[#E06527]/30 transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Request Similar Developer
              </button>
            </div>

            {/* Guarantees Box */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3 text-xs text-slate-600">
              <h4 className="font-bold text-slate-900">Dunga Guarantee Included:</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>7-Day Risk-Free Trial Period</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Signed Non-Disclosure Agreement (NDA)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Transparent Weekly Hours Timesheets</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Free Replacement if Not Satisfied</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Modals */}
      <HireDeveloperModal
        developer={developer}
        isOpen={isHireModalOpen}
        onClose={() => setIsHireModalOpen(false)}
      />

      <RequestSimilarDeveloperModal
        baseDeveloper={developer}
        isOpen={isSimilarModalOpen}
        onClose={() => setIsSimilarModalOpen(false)}
      />
    </div>
  );
};
