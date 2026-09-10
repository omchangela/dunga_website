'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  AlertCircle,
  KeyRound,
  Layers,
  ArrowLeft
} from 'lucide-react';

export default function AdminLoginPage() {
  const { login, isAuthenticated } = useAdminAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, redirect to admin dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        router.push('/admin');
      } else {
        setErrorMessage(res.error || 'Authentication failed. Please check credentials.');
      }
    } catch {
      setErrorMessage('An unexpected error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@dungatechnologies.com');
    setPassword('admin123');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans selection:bg-[#e6f4f7] selection:text-[#246e7f]">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#246E7F]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#E06527]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.04] pointer-events-none"></div>

      {/* Top Header / Back Link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 relative z-10 mb-6">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors bg-white border border-slate-200 px-3.5 py-1.5 rounded-full mb-6 shadow-xs hover:shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#E06527]" />
          <span>Back to Dunga Technologies Home</span>
        </Link>

        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#246E7F] flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-[#246E7F]/20 border border-teal-500/30">
            D
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-slate-900 font-heading">
                DUNGA
              </span>
              <span className="text-xs font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-md bg-[#E06527]/10 text-[#E06527] border border-[#E06527]/20">
                ADMIN
              </span>
            </div>
            <p className="text-xs text-slate-500">Enterprise Control & Inquiries Center</p>
          </div>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 relative z-10">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 space-y-6">
          
          <div className="border-b border-slate-100 pb-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#246E7F] mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>SECURE ACCESS PORTAL</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Sign In to Command Center
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage live inquiries, developer deployments, and software suites.
            </p>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Quick Demo Fill Button */}
          <button
            type="button"
            onClick={handleFillDemo}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-[#e6f4f7]/50 border border-slate-200 hover:border-teal-300 text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center justify-between transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#E06527] group-hover:rotate-12 transition-transform" />
              <span>Click to Autofill Demo Credentials</span>
            </div>
            <span className="text-[10px] bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded font-mono font-bold">
              admin123
            </span>
          </button>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="admin@dungatechnologies.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#246E7F] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <span className="text-[11px] text-slate-500 font-medium">
                  Default: <code className="text-[#E06527] font-bold">admin123</code>
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#246E7F] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Security Note */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-[#246E7F] focus:ring-[#246E7F]"
                />
                <span>Remember session for 30 days</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#246E7F] hover:bg-[#1a5563] text-white font-extrabold text-sm py-3.5 rounded-xl shadow-lg shadow-[#246E7F]/25 hover:shadow-[#246E7F]/40 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Admin Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Security Badge */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1 font-medium">
              <KeyRound className="w-3.5 h-3.5 text-[#E06527]" />
              256-bit Encrypted Session
            </span>
            <span>v2.4.0 • Dunga OS</span>
          </div>

        </div>
      </div>

    </div>
  );
}

