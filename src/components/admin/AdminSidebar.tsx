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

    inquiryStore.fetchFromApi().then(() => updateCount());
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
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-sm ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          
          {/* Top Brand Banner */}
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#246E7F] flex items-center justify-center text-white font-black text-xl shadow-md shadow-[#246E7F]/20 border border-teal-500/30">
                D
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-slate-900 tracking-tight font-heading">
                    DUNGA
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#E06527] text-white">
                    ADMIN
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">Enterprise Control Hub</p>
              </div>
            </Link>

            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
            <div className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
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
                      ? 'bg-[#246E7F] text-white shadow-sm shadow-[#246E7F]/30 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400 group-hover:text-[#246E7F]'} transition-colors`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${item.badgeColor || 'bg-slate-100 text-slate-700'}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-6 px-3 pb-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Live Web Portal
            </div>

            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all group border border-dashed border-slate-200"
            >
              <div className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-emerald-600" />
                <span>View Public Website</span>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded border border-emerald-200">
                Live 🟢
              </span>
            </Link>
          </div>

          {/* Bottom Admin User Profile & Logout */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center gap-3 px-2 py-1">
              <div className="w-9 h-9 rounded-xl bg-[#246E7F]/10 border border-[#246E7F]/20 flex items-center justify-center font-bold text-[#246E7F] text-sm shrink-0">
                {adminUser?.name ? adminUser.name.charAt(0) : 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {adminUser?.name || 'Super Admin'}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {adminUser?.email || 'admin@dunga.in'}
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-colors cursor-pointer"
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

