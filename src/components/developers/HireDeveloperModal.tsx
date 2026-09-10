'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { DeveloperProfile } from '@/data/developers';
import { useCurrency } from '@/context/CurrencyContext';
import { inquiryStore } from '@/lib/inquiryStore';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Calendar, 
  Send, 
  DollarSign, 
  User, 
  Mail, 
  Phone, 
  Building2,
  Briefcase
} from 'lucide-react';

interface HireDeveloperModalProps {
  developer: DeveloperProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

export const HireDeveloperModal: React.FC<HireDeveloperModalProps> = ({
  developer,
  isOpen,
  onClose,
}) => {
  const { currency, formatPrice } = useCurrency();
  const [selectedModel, setSelectedModel] = useState<'Hourly' | 'Dedicated' | 'Project-Based'>('Hourly');
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(20);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [startDate, setStartDate] = useState('Immediately');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !developer) return null;

  const hourlyRate = currency === 'INR' ? developer.hourlyRateINR : developer.hourlyRateUSD;
  const monthlyRate = currency === 'INR' ? developer.monthlyRateINR : developer.monthlyRateUSD;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    inquiryStore.addInquiry({
      name: fullName,
      email,
      phone,
      company: company || undefined,
      type: 'Developer Hire',
      serviceOrProduct: `${developer.name} (${selectedModel} Engagement)`,
      budget: selectedModel === 'Hourly' ? `${formatPrice(developer.hourlyRateINR, developer.hourlyRateUSD)}/hr` : `${formatPrice(developer.monthlyRateINR, developer.monthlyRateUSD)}/mo`,
      message: `Developer Hire Request: Start Date: ${startDate}. ${projectDescription || 'Client looking to onboard this developer.'}`,
      priority: 'High',
      sourcePage: `/hire-developers/${developer.slug}`,
      status: 'New'
    });
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#246E7F] to-[#1b5563] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-white/40 shrink-0 bg-slate-100">
              <Image
                src={developer.avatarUrl}
                alt={developer.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#E06527] text-white">
                  Hire Ready
                </span>
                {developer.isVerified && (
                  <span className="flex items-center gap-1 text-xs text-teal-100 font-medium bg-white/10 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                    Verified Developer
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold mt-1 text-white">{developer.name}</h3>
              <p className="text-teal-100 text-sm">{developer.role} • {developer.experienceLabel}</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="py-10 text-center">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-2">Hiring Request Received!</h4>
              <p className="text-slate-600 max-w-md mx-auto mb-6 text-sm">
                Thank you, <strong>{fullName || 'Client'}</strong>. Our tech onboarding manager will review your requirements for <strong>{developer.name}</strong> and contact you via WhatsApp / email within 2 hours with an onboarding roadmap & trial setup.
              </p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left max-w-md mx-auto mb-6 space-y-2 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Developer:</span>
                  <span className="font-semibold text-slate-900">{developer.name} ({developer.role})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Selected Model:</span>
                  <span className="font-semibold text-slate-900">{selectedModel} Engagement</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Rate:</span>
                  <span className="font-semibold text-[#246E7F]">
                    {selectedModel === 'Hourly' ? `${formatPrice(developer.hourlyRateINR, developer.hourlyRateUSD)} / hour` : `${formatPrice(developer.monthlyRateINR, developer.monthlyRateUSD)} / month`}
                  </span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-[#246E7F] text-white font-semibold rounded-lg hover:bg-[#1b5563] transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Pricing & Engagement Model Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Engagement Model
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedModel('Hourly')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedModel === 'Hourly'
                        ? 'border-[#246E7F] bg-[#246E7F]/5 ring-2 ring-[#246E7F]/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900">Hourly Rate</span>
                      <Clock className="w-4 h-4 text-[#246E7F]" />
                    </div>
                    <p className="text-lg font-extrabold text-[#246E7F]">
                      {formatPrice(developer.hourlyRateINR, developer.hourlyRateUSD)} <span className="text-xs font-normal text-slate-500">/hr</span>
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">Flexible hours, tracked timesheet</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedModel('Dedicated')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedModel === 'Dedicated'
                        ? 'border-[#246E7F] bg-[#246E7F]/5 ring-2 ring-[#246E7F]/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900">Dedicated Full-Time</span>
                      <Briefcase className="w-4 h-4 text-[#246E7F]" />
                    </div>
                    <p className="text-lg font-extrabold text-[#246E7F]">
                      {formatPrice(developer.monthlyRateINR, developer.monthlyRateUSD)} <span className="text-xs font-normal text-slate-500">/mo</span>
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">160 hrs/mo, 100% focused on you</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedModel('Project-Based')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedModel === 'Project-Based'
                        ? 'border-[#246E7F] bg-[#246E7F]/5 ring-2 ring-[#246E7F]/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900">Fixed Project</span>
                      <Calendar className="w-4 h-4 text-[#246E7F]" />
                    </div>
                    <p className="text-lg font-extrabold text-[#E06527]">
                      Custom Quote
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">Milestone based delivery</p>
                  </button>
                </div>
              </div>

              {/* Developer Guarantees Banner */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  1-Week Risk-Free Trial
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  NDA & IP Protection
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Direct WhatsApp/Slack Access
                </span>
              </div>

              {/* Client Details Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Your Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Work Email *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      placeholder="rahul@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Phone / WhatsApp *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Company / Project Name</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Acme Technologies"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Requirement Notes */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Brief Project Requirements / Tasks
                </label>
                <textarea
                  rows={2}
                  placeholder={`Describe what you want ${developer.shortName} to build or maintain...`}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:border-transparent"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#246E7F] text-white font-semibold rounded-lg hover:bg-[#1b5563] shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-sm"
                >
                  <Send className="w-4 h-4" />
                  Confirm Hire Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
