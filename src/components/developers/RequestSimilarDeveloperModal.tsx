'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Sparkles, Send, Users } from 'lucide-react';
import { DeveloperProfile } from '@/data/developers';
import { useCurrency } from '@/context/CurrencyContext';

interface Props {
  developer?: DeveloperProfile | null;
  baseDeveloper?: DeveloperProfile | null;
  isOpen?: boolean;
  onClose: () => void;
}

export function RequestSimilarDeveloperModal({ developer, baseDeveloper, isOpen = true, onClose }: Props) {
  const targetDev = developer || baseDeveloper;
  const { formatPrice } = useCurrency();
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [teamSize, setTeamSize] = useState('1 Developer');
  const [duration, setDuration] = useState('Full-Time Dedicated (1-3 Months)');
  const [projectBrief, setProjectBrief] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !targetDev) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-10 space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Matching Developer Request Received!
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Our Technical Resource Manager is matching your criteria (<strong>{targetDev.role} • {targetDev.experienceLabel}</strong>) and will send you 2–3 pre-vetted engineer profiles within 4 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Header with Pre-selected Developer Badge */}
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#fff3eb] text-[#e06527] border border-[#fbd8c4] text-[11px] font-bold px-3 py-0.5 rounded-full mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Request Similar Developer</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Looking for a developer like {targetDev.name}?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                We have pre-filled matching criteria based on {targetDev.name}&apos;s skill set so you can onboard equivalent talent immediately.
              </p>
            </div>

            {/* Auto Pre-Selected Criteria Box */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-2.5">
              <span className="text-[10px] font-mono uppercase font-bold text-[#246e7f] block">
                Auto-Matched Skill & Experience Profile:
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-800">
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                  Role: <strong className="text-[#246e7f]">{targetDev.role}</strong>
                </span>
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                  Exp: <strong className="text-slate-900">{targetDev.experienceLabel}</strong>
                </span>
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                  Target Rate: <strong className="text-emerald-700">{formatPrice(targetDev.hourlyRateINR, targetDev.hourlyRateUSD)}/hr</strong>
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {targetDev.keyTechnologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-[#e6f4f7] text-[#246e7f] text-[10px] font-mono font-bold px-2 py-0.5 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Client Info Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Sharma"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Work Email *</label>
                <input
                  type="email"
                  required
                  placeholder="vikram@company.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Team Size Needed</label>
                <select
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
                >
                  <option value="1 Developer">1 Matching Developer</option>
                  <option value="2-3 Developers">2–3 Developers (Sprint Squad)</option>
                  <option value="4+ Developers">4+ Developers (Full Team)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Project Context / Key Tasks (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Describe your current repository, immediate sprint goals, or ideal start date..."
                value={projectBrief}
                onChange={(e) => setProjectBrief(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>NDA Protected • 24-48h Onboarding SLA</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-[#246e7f] hover:bg-[#1a515e] text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-md shadow-[#246e7f]/20 flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Request Matching Profiles</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
