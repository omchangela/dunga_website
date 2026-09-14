'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  User, 
  Mail, 
  Phone, 
  Building2,
  Briefcase,
  MessageSquare,
  Lock,
  ArrowLeft,
  RotateCcw,
  AlertCircle,
  Check
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
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [startDate, setStartDate] = useState('Immediately');

  // Multi-step Flow: 'FORM' | 'OTP' | 'SUCCESS'
  const [step, setStep] = useState<'FORM' | 'OTP' | 'SUCCESS'>('FORM');

  // OTP Verification States
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [otpSuccessMessage, setOtpSuccessMessage] = useState('');
  const [devOtpHint, setDevOtpHint] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState<number>(30);
  const [canResend, setCanResend] = useState(false);
  const [formattedTargetPhone, setFormattedTargetPhone] = useState('');

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for Resend OTP
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'OTP' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  if (!isOpen || !developer) return null;

  // Handle Form Submit -> Trigger WhatsApp OTP
  const handleInitiateHire = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError('');
    setIsSendingOtp(true);

    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setOtpError(data.error || 'Failed to dispatch WhatsApp OTP. Please check your phone number.');
        setIsSendingOtp(false);
        return;
      }

      setFormattedTargetPhone(data.formattedPhone || phone);
      setDevOtpHint(data.devHint || null);
      setOtpSuccessMessage(data.message || `OTP sent to your WhatsApp`);
      setStep('OTP');
      setResendTimer(30);
      setCanResend(false);
      setOtpValues(['', '', '', '', '', '']);
      
      // Auto focus first OTP input box
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 150);
    } catch (err: any) {
      setOtpError(err?.message || 'Connection error while dispatching WhatsApp OTP.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Resend WhatsApp OTP
  const handleResendOtp = async () => {
    if (!canResend || isSendingOtp) return;
    setOtpError('');
    setIsSendingOtp(true);

    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setOtpError(data.error || 'Could not resend OTP. Please try again.');
        setIsSendingOtp(false);
        return;
      }

      setDevOtpHint(data.devHint || null);
      setOtpSuccessMessage('New OTP sent to your WhatsApp!');
      setResendTimer(30);
      setCanResend(false);
      setOtpValues(['', '', '', '', '', '']);
      otpInputRefs.current[0]?.focus();
    } catch (err: any) {
      setOtpError(err?.message || 'Error resending OTP.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Handle OTP digit changes
  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1); // Take only the last entered digit
    const newOtpValues = [...otpValues];
    newOtpValues[index] = digit;
    setOtpValues(newOtpValues);
    setOtpError('');

    // Auto-advance to next input
    if (digit && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    // If all 6 digits are filled, automatically trigger verification
    if (digit && index === 5 && newOtpValues.every((d) => d !== '')) {
      const fullCode = newOtpValues.join('');
      executeVerification(fullCode);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pastedData) return;

    const newValues = [...otpValues];
    for (let i = 0; i < 6; i++) {
      newValues[i] = pastedData[i] || '';
    }
    setOtpValues(newValues);

    if (pastedData.length === 6) {
      executeVerification(pastedData);
    } else {
      otpInputRefs.current[pastedData.length]?.focus();
    }
  };

  // Verify OTP and complete inquiry submission
  const executeVerification = async (submittedOtp?: string) => {
    const otpCode = submittedOtp || otpValues.join('');
    if (otpCode.length !== 6) {
      setOtpError('Please enter the full 6-digit OTP sent to your WhatsApp.');
      return;
    }

    setIsVerifyingOtp(true);
    setOtpError('');

    try {
      const verifyRes = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: formattedTargetPhone || phone,
          otp: otpCode,
        }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok || !verifyData.success) {
        setOtpError(verifyData.error || 'Invalid OTP code. Please check your WhatsApp message.');
        setIsVerifyingOtp(false);
        return;
      }

      // Record verified inquiry in the system
      inquiryStore.addInquiry({
        name: fullName,
        email,
        phone: formattedTargetPhone || phone,
        company: company || undefined,
        type: 'Developer Hire',
        serviceOrProduct: `${developer.name} (${selectedModel} Engagement)`,
        budget: selectedModel === 'Hourly' ? `${formatPrice(developer.hourlyRateINR, developer.hourlyRateUSD)}/hr` : `${formatPrice(developer.monthlyRateINR, developer.monthlyRateUSD)}/mo`,
        message: `[WhatsApp Verified Mobile: +${formattedTargetPhone || phone}] Developer Hire Request for ${developer.name}. Start Date: ${startDate}. ${projectDescription || 'Client looking to onboard this developer.'}`,
        priority: 'High',
        sourcePage: `/hire-developers/${developer.slug}`,
        status: 'New'
      });

      setStep('SUCCESS');
    } catch (err: any) {
      setOtpError(err?.message || 'Error verifying OTP.');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleReset = () => {
    setStep('FORM');
    setOtpValues(['', '', '', '', '', '']);
    setOtpError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#246E7F] to-[#1b5563] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/40 shrink-0 bg-white p-1.5 flex items-center justify-center shadow-md">
              <Image
                src={developer.avatarUrl || '/logo.png'}
                alt={developer.name}
                fill
                sizes="64px"
                className="object-contain p-1"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#E06527] text-white shadow-xs">
                  Hire Ready
                </span>
                {developer.isVerified && (
                  <span className="flex items-center gap-1 text-xs text-teal-100 font-medium bg-white/10 px-2.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                    Verified Developer
                  </span>
                )}
              </div>
              <h3 className="text-xl font-black mt-1 text-white">{developer.name}</h3>
              <p className="text-teal-100 text-xs sm:text-sm">{developer.role} • {developer.experienceLabel}</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7">
          
          {/* STEP 1: CLIENT DETAILS & ENGAGEMENT FORM */}
          {step === 'FORM' && (
            <form onSubmit={handleInitiateHire} className="space-y-5">
              
              {/* Pricing & Engagement Model Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Engagement Model
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedModel('Hourly')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
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
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
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
                    <p className="text-[11px] text-slate-500 mt-1">160 hrs/mo, 100% dedicated to you</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedModel('Project-Based')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
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
                    <p className="text-[11px] text-slate-500 mt-1">Milestone delivery roadmap</p>
                  </button>
                </div>
              </div>

              {/* Developer Guarantees Banner */}
              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  1-Week Risk-Free Trial
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  NDA & IP Protection
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Direct WhatsApp/Slack Access
                </span>
              </div>

              {/* Client Details Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:border-transparent bg-slate-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Work Email *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      placeholder="rahul@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:border-transparent bg-slate-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp Number (For Instant OTP Verification) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-emerald-600 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 97235 43570"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:border-transparent bg-slate-50/50"
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    We will send a 6-digit WhatsApp OTP to verify your contact number.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Company / Project Name</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="e.g. Acme Tech Pvt Ltd"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:border-transparent bg-slate-50/50"
                    />
                  </div>
                </div>
              </div>

              {/* Requirement Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Brief Project Requirements / Key Tasks
                </label>
                <textarea
                  rows={2}
                  placeholder={`Describe what you want ${developer.shortName || developer.name} to build, scale, or maintain...`}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:border-transparent bg-slate-50/50"
                ></textarea>
              </div>

              {otpError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{otpError}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSendingOtp}
                  className="px-6 py-2.5 bg-[#246E7F] hover:bg-[#1b5563] disabled:opacity-75 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-xs sm:text-sm"
                >
                  {isSendingOtp ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending WhatsApp OTP...</span>
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-4 h-4 text-emerald-300" />
                      <span>Verify WhatsApp & Hire {developer.shortName || developer.name}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: WHATSAPP OTP VERIFICATION SCREEN */}
          {step === 'OTP' && (
            <div className="py-4 space-y-6 max-w-lg mx-auto text-center animate-in fade-in zoom-in-95 duration-200">
              
              {/* WhatsApp Icon Badge */}
              <div className="relative mx-auto w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-xs">
                <MessageSquare className="w-8 h-8 text-emerald-600" />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center text-white text-[10px]">
                  <Check className="w-3 h-3" />
                </span>
              </div>

              <div>
                <h4 className="text-xl font-black text-slate-900">Enter WhatsApp OTP</h4>
                <p className="text-xs text-slate-600 mt-1">
                  We have sent a 6-digit security code on WhatsApp to:
                </p>
                <div className="inline-flex items-center gap-2 bg-slate-100 px-3.5 py-1 rounded-full text-xs font-mono font-bold text-slate-900 mt-2">
                  <span>+{formattedTargetPhone || phone}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('FORM');
                      setOtpError('');
                    }}
                    className="text-[#246e7f] hover:underline text-[11px] font-sans font-semibold ml-1"
                  >
                    Edit
                  </button>
                </div>
              </div>

              {/* Dev Hint if applicable */}
              {devOtpHint && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-2 text-xs text-amber-800 font-mono">
                  {devOtpHint}
                </div>
              )}

              {/* 6 Digit OTP Input Grid */}
              <div className="flex justify-center items-center gap-2 sm:gap-3" onPaste={handleOtpPaste}>
                {otpValues.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      otpInputRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-black text-slate-900 bg-slate-50 border-2 border-slate-300 focus:border-[#246e7f] focus:bg-white focus:ring-2 focus:ring-[#246e7f]/20 rounded-xl transition-all"
                  />
                ))}
              </div>

              {otpError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center justify-center gap-2 animate-shake">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{otpError}</span>
                </div>
              )}

              {/* Resend & Actions */}
              <div className="space-y-4 pt-2">
                <button
                  type="button"
                  onClick={() => executeVerification()}
                  disabled={isVerifyingOtp || otpValues.some((d) => d === '')}
                  className="w-full py-3 bg-[#246E7F] hover:bg-[#1b5563] disabled:opacity-50 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
                >
                  {isVerifyingOtp ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying Security Code...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verify WhatsApp & Submit Request</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-xs text-slate-500 px-2">
                  <button
                    type="button"
                    onClick={() => {
                      setStep('FORM');
                      setOtpError('');
                    }}
                    className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-semibold"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Details</span>
                  </button>

                  {canResend ? (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isSendingOtp}
                      className="inline-flex items-center gap-1 text-[#246e7f] hover:underline font-bold"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Resend WhatsApp OTP</span>
                    </button>
                  ) : (
                    <span>
                      Resend code in <strong className="font-mono text-slate-700">{resendTimer}s</strong>
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS CONFIRMATION RECEIPT */}
          {step === 'SUCCESS' && (
            <div className="py-8 text-center animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold px-3 py-0.5 rounded-full mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Phone Verified</span>
              </div>
              <h4 className="text-2xl font-black text-slate-900 mb-2">Hiring Request Confirmed!</h4>
              <p className="text-slate-600 max-w-md mx-auto mb-6 text-xs sm:text-sm">
                Thank you, <strong>{fullName || 'Client'}</strong>. We have verified your number (+{formattedTargetPhone || phone}) and our Engineering Talent Director will reach out to you via WhatsApp within 2 hours with an onboarding roadmap & trial credentials for <strong>{developer.name}</strong>.
              </p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left max-w-md mx-auto mb-6 space-y-2 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Selected Engineer:</span>
                  <span className="font-bold text-slate-900">{developer.name} ({developer.role})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Engagement Model:</span>
                  <span className="font-bold text-slate-900">{selectedModel} Model</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Rate Terms:</span>
                  <span className="font-bold text-[#246E7F]">
                    {selectedModel === 'Hourly' ? `${formatPrice(developer.hourlyRateINR, developer.hourlyRateUSD)} / hour` : `${formatPrice(developer.monthlyRateINR, developer.monthlyRateUSD)} / month`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Verification Status:</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified WhatsApp
                  </span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="px-8 py-2.5 bg-[#246E7F] text-white font-bold rounded-xl hover:bg-[#1b5563] shadow-md transition-all text-xs sm:text-sm"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
