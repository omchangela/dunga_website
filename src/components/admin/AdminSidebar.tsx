'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { inquiryStore } from '@/lib/inquiryStore';
import {
  LayoutDashboard,
  Inbox,
  Users,
  Code2,
  ShoppingCart,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Zap,
  Flame,
  Menu,
  X
} from 'lucide-react';

interface AdminSidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const pathname = usePathname();
  const { adminUser, logout } = useAdminAuth();
  const [newInquiriesCount, setNewInquiriesCount] = useState(0);

  // Sync unread inquiry count
  useEffect(() => {
    const updateCount = () => {
      const inqs = inquiryStore.getInquiries();
      const newCount = inqs.filter((i) => i.status === 'New').length;
      setNewInquiriesCount(newCount);
    };

    updateCount();
    window.addEventListener('dunga_inquiries_updated', updateCount);
    return () => window.removeEventListener('dunga_inquiries_updated', updateCount);
  }, []);

  const navItems = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      badge: null,
      exact: true
    },
    {
      label: 'All Inquiries & Leads',
      href: '/admin/inquiries',
      icon: Inbox,
      badge: newInquiriesCount > 0 ? `${newInquiriesCount} New` : null,
      badgeColor: 'bg-[#E06527] text-white animate-pulse'
    },
    {
      label: 'Developer Roster',
      href: '/admin/developers',
      icon: Users,
      badge: '58+ Devs',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
    },
    {
      label: 'Products & Code',
      href: '/admin/products',
      icon: Code2,
      badge: null
    },
    {
      label: 'Orders & Licenses',
      href: '/admin/orders',
      icon: ShoppingCart,
      badge: null
    },
    {
      label: 'Settings',
      href: '/admin/settings',
      icon: Settings,
      badge: null
    }
  ];

  const isLinkActive = (href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          
          {/* Top Brand Banner */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#246E7F] to-[#14424e] flex items-center justify-center text-white font-black text-xl shadow-md border border-teal-400/30">
                D
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-white tracking-tight font-heading">
                    DUNGA
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#E06527] text-white">
                    ADMIN
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Enterprise Control Hub</p>
              </div>
            </Link>

            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
            <div className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
              Navigation & Modules
            </div>

            {navItems.map((item) => {
              const active = isLinkActive(item.href, item.exact);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    active
                      ? 'bg-gradient-to-r from-[#246E7F] to-[#1b5563] text-white shadow-md shadow-[#246E7F]/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400 group-hover:text-teal-400'} transition-colors`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-6 px-3 pb-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
              Live Web Portal
            </div>

            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all group"
            >
              <div className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-emerald-400" />
                <span>View Public Website</span>
              </div>
              <span className="text-[10px] bg-emerald-500/15 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">
                Live 🟢
              </span>
            </Link>
          </div>

          {/* Bottom Admin User Profile & Logout */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/50 space-y-3">
            <div className="flex items-center gap-3 px-2 py-1">
              <div className="w-9 h-9 rounded-xl bg-[#246E7F]/20 border border-[#246E7F]/40 flex items-center justify-center font-bold text-teal-300 text-sm shrink-0">
                {adminUser?.name ? adminUser.name.charAt(0) : 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">
                  {adminUser?.name || 'Administrator'}
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  {adminUser?.email || 'admin@dungatechnologies.com'}
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-950/50 border border-red-900/40 rounded-xl transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out of Admin</span>
            </button>
          </div>

        </div>
      </aside>
    </>
  );
};
