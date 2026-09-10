'use client';

import React, { useState } from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { inquiryStore } from '@/lib/inquiryStore';
import {
  Settings,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  KeyRound,
  RefreshCw,
  CheckCircle2,
  Save,
  Bell,
  Sparkles
} from 'lucide-react';

export default function AdminSettingsPage() {
  const { adminUser } = useAdminAuth();
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [alertEmail, setAlertEmail] = useState('contact@dungatechnologies.com');
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to restore demo inquiries and reset storage?')) {
      inquiryStore.resetToDefault();
      alert('Demo data restored successfully.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          System Settings & Control
        </h2>
        <p className="text-xs text-slate-500">
          Manage admin profile, lead notification destinations, and system preferences.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Settings saved successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Card 1: Admin Profile */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-[#246E7F]" />
            <span>Administrator Credentials & Profile</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Admin Name</label>
              <input
                type="text"
                defaultValue={adminUser?.name || 'Om Changela'}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#246E7F]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Login Email</label>
              <input
                type="email"
                defaultValue={adminUser?.email || 'admin@dungatechnologies.com'}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#246E7F]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Role & Authority</label>
              <input
                type="text"
                disabled
                defaultValue={adminUser?.role || 'Super Administrator & Founder'}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Lead Notification Routing */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Bell className="w-4 h-4 text-[#E06527]" />
            <span>Instant Lead Notifications & Dispatch</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Notification Email for Incoming Leads
              </label>
              <input
                type="email"
                value={alertEmail}
                onChange={(e) => setAlertEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#246E7F]"
              />
            </div>

            <div className="space-y-2 pt-2">
              <label className="flex items-center gap-2.5 text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="rounded border-slate-300 text-[#246E7F] focus:ring-[#246E7F]"
                />
                <span>Send instant email alert when a client requests developer hiring</span>
              </label>

              <label className="flex items-center gap-2.5 text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={whatsappAlerts}
                  onChange={(e) => setWhatsappAlerts(e.target.checked)}
                  className="rounded border-slate-300 text-[#246E7F] focus:ring-[#246E7F]"
                />
                <span>Enable 1-click WhatsApp quick reply triggers for engineering desk</span>
              </label>
            </div>
          </div>
        </div>

        {/* Card 3: Data Management */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <RefreshCw className="w-4 h-4 text-purple-600" />
            <span>Demo Data & Storage Controls</span>
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <p className="font-bold text-slate-900">Reset Inquiry Store to Demo State</p>
              <p className="text-slate-500 text-[11px]">
                Restores the initial demo inquiries and sample leads.
              </p>
            </div>

            <button
              type="button"
              onClick={handleResetData}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-colors cursor-pointer shrink-0 border border-slate-200"
            >
              Restore Sample Leads
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-[#246E7F] hover:bg-[#1a5563] text-white font-bold text-xs rounded-xl shadow-md shadow-[#246E7F]/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Changes</span>
          </button>
        </div>

      </form>

    </div>
  );
}

