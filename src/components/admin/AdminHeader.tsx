'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import { 
  Menu, 
  Search, 
  Bell, 
  ShieldCheck, 
  Radio, 
  ExternalLink,
  RefreshCw,
  Sparkles
} from 'lucide-react';

interface AdminHeaderProps {
  onOpenMobile: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onOpenMobile }) => {
  const pathname = usePathname();
  const { adminUser } = useAdminAuth();
  const { currency, setCurrency } = useCurrency();
  const [secondsAgo, setSecondsAgo] = useState(6);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsAgo((prev) => (prev >= 45 ? 2 : prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getPageTitle = () => {
    if (pathname === '/admin') return 'Command Center & Analytics';
    if (pathname.startsWith('/admin/inquiries')) return 'Client Inquiries & Live Leads';
    if (pathname.startsWith('/admin/developers')) return 'Developer Roster & Capacity';
    if (pathname.startsWith('/admin/products')) return 'Source Code Suites & Catalog';
    if (pathname.startsWith('/admin/orders')) return 'Client Orders & License Activations';
    if (pathname.startsWith('/admin/settings')) return 'System Configuration & Settings';
    return 'Admin Management';
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3.5">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left: Mobile Toggle & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobile}
            className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">Admin</span>
              <span className="text-slate-600">/</span>
              <h1 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                {getPageTitle()}
              </h1>
            </div>
          </div>
        </div>

        {/* Right: Live Sync Badge, Currency Toggle, Notifications & Profile */}
        <div className="flex items-center gap-3">
          
          {/* Live Sync Beacon */}
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Live Sync ({secondsAgo}s ago)</span>
          </div>

          {/* Currency Switcher */}
          <div className="inline-flex rounded-xl bg-slate-800 p-0.5 border border-slate-700 text-xs font-bold">
            <button
              onClick={() => setCurrency('INR')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                currency === 'INR' ? 'bg-[#246E7F] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              ₹ INR
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                currency === 'USD' ? 'bg-[#246E7F] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              $ USD
            </button>
          </div>

          {/* Public Website Preview Link */}
          <Link
            href="/"
            target="_blank"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#E06527]" />
            <span>Public Site</span>
          </Link>

          {/* User Avatar */}
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#246E7F] to-[#14424e] border border-teal-400/40 flex items-center justify-center text-xs font-black text-white shadow-sm">
            {adminUser?.name?.charAt(0) || 'A'}
          </div>

        </div>

      </div>
    </header>
  );
};
