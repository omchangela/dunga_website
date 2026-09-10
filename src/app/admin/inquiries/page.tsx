'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { inquiryStore, Inquiry, InquiryStatus, InquiryType } from '@/lib/inquiryStore';
import { InquiryDetailModal } from '@/components/admin/InquiryDetailModal';
import {
  Inbox,
  Search,
  Filter,
  Download,
  Plus,
  RefreshCw,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Trash2,
  Sparkles,
  ChevronDown,
  Building2,
  Tag,
  DollarSign,
  TrendingUp,
  ArrowRight,
  Copy,
  Check,
  Flame,
  User
} from 'lucide-react';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [isAddingManual, setIsAddingManual] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Manual Lead State
  const [manualName, setManualName] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualCompany, setManualCompany] = useState('');
  const [manualType, setManualType] = useState<InquiryType>('Developer Hire');
  const [manualService, setManualService] = useState('Senior Full-Stack Developer (#DEV-101)');
  const [manualBudget, setManualBudget] = useState('₹1,40,000 / mo');
  const [manualMessage, setManualMessage] = useState('');

  const refreshInquiries = () => {
    setInquiries(inquiryStore.getInquiries());
  };

  useEffect(() => {
    refreshInquiries();
    window.addEventListener('dunga_inquiries_updated', refreshInquiries);
    return () => window.removeEventListener('dunga_inquiries_updated', refreshInquiries);
  }, []);

  const handleCopy = (text: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          inq.name.toLowerCase().includes(q) ||
          inq.email.toLowerCase().includes(q) ||
          inq.phone.toLowerCase().includes(q) ||
          (inq.company && inq.company.toLowerCase().includes(q)) ||
          inq.serviceOrProduct.toLowerCase().includes(q) ||
          inq.message.toLowerCase().includes(q) ||
          inq.id.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Status
      if (statusFilter !== 'All' && inq.status !== statusFilter) {
        return false;
      }

      // Type
      if (typeFilter !== 'All' && inq.type !== typeFilter) {
        return false;
      }

      return true;
    });
  }, [inquiries, searchQuery, statusFilter, typeFilter]);

  const newCount = inquiries.filter((i) => i.status === 'New').length;
  const inReviewCount = inquiries.filter((i) => i.status === 'In Review').length;
  const contactedCount = inquiries.filter((i) => i.status === 'Contacted').length;
  const convertedCount = inquiries.filter((i) => i.status === 'Converted').length;
  const archivedCount = inquiries.filter((i) => i.status === 'Archived').length;

  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Company', 'Type', 'Service/Product', 'Budget', 'Status', 'Created At'];
    const rows = filteredInquiries.map((i) => [
      i.id,
      `"${i.name}"`,
      i.email,
      i.phone,
      `"${i.company || ''}"`,
      i.type,
      `"${i.serviceOrProduct}"`,
      `"${i.budget || ''}"`,
      i.status,
      i.createdAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `dunga_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName || !manualEmail || !manualPhone) return;

    inquiryStore.addInquiry({
      name: manualName,
      email: manualEmail,
      phone: manualPhone,
      company: manualCompany || undefined,
      type: manualType,
      serviceOrProduct: manualService,
      budget: manualBudget || undefined,
      message: manualMessage || 'Manually logged by admin',
      priority: 'High',
      sourcePage: 'Admin Manual Intake',
      status: 'New'
    });

    // Reset Form
    setManualName('');
    setManualEmail('');
    setManualPhone('');
    setManualCompany('');
    setManualMessage('');
    setIsAddingManual(false);
    refreshInquiries();
  };

  const statusTabs = [
    { label: 'All', count: inquiries.length, bg: 'bg-slate-100 text-slate-700' },
    { label: 'New', count: newCount, bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { label: 'In Review', count: inReviewCount, bg: 'bg-amber-50 text-amber-700 border-amber-200' },
    { label: 'Contacted', count: contactedCount, bg: 'bg-blue-50 text-blue-700 border-blue-200' },
    { label: 'Converted', count: convertedCount, bg: 'bg-purple-50 text-purple-700 border-purple-200' },
    { label: 'Archived', count: archivedCount, bg: 'bg-slate-100 text-slate-600 border-slate-200' }
  ];

  const getTypeBadgeStyle = (type: string) => {
    switch (type) {
      case 'Developer Hire':
        return 'bg-[#e6f4f7] text-[#246E7F] border-teal-200';
      case 'Source Code License':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Custom Software':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Script Installation':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Tech Consultancy':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Project Estimation':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Quick Metric KPIs */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#246E7F]">
                Live Inbound Telemetry
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Client Inquiries & Live Leads
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Real-time feed of all contact forms, developer bookings, source code requests, and custom RFPs.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setIsAddingManual(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#246E7F] hover:bg-[#1b5563] text-white text-xs font-bold rounded-xl shadow-md shadow-[#246E7F]/25 hover:shadow-lg transition-all cursor-pointer group"
            >
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
              <span>Add Manual Lead</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-bold rounded-xl border border-slate-200 shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* 4 Micro Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
          <div className="bg-slate-50/80 rounded-2xl p-3 border border-slate-200/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#246E7F]">
              <Inbox className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Pipeline</span>
              <span className="text-lg font-black text-slate-900">{inquiries.length} Leads</span>
            </div>
          </div>

          <div className="bg-slate-50/80 rounded-2xl p-3 border border-slate-200/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Flame className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Action Required</span>
              <span className="text-lg font-black text-emerald-700">{newCount} Unread</span>
            </div>
          </div>

          <div className="bg-slate-50/80 rounded-2xl p-3 border border-slate-200/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Under Scoping</span>
              <span className="text-lg font-black text-amber-700">{inReviewCount} Active</span>
            </div>
          </div>

          <div className="bg-slate-50/80 rounded-2xl p-3 border border-slate-200/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Deals Won</span>
              <span className="text-lg font-black text-purple-700">{convertedCount} Converted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Lead Modal */}
      {isAddingManual && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl text-slate-900 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#246E7F]" />
                <span>Log New Inbound Lead Manually</span>
              </h3>
              <button
                onClick={() => setIsAddingManual(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 bg-slate-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Client Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Joshi"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#246E7F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="client@company.com"
                    value={manualEmail}
                    onChange={(e) => setManualEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#246E7F]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={manualPhone}
                    onChange={(e) => setManualPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#246E7F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Inquiry Type</label>
                  <select
                    value={manualType}
                    onChange={(e) => setManualType(e.target.value as InquiryType)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#246E7F]"
                  >
                    <option value="Developer Hire">Developer Hire</option>
                    <option value="Custom Software">Custom Software</option>
                    <option value="Source Code License">Source Code License</option>
                    <option value="Script Installation">Script Installation</option>
                    <option value="Tech Consultancy">Tech Consultancy</option>
                    <option value="Project Estimation">Project Estimation</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Company / Entity</label>
                  <input
                    type="text"
                    placeholder="Acme Tech Labs"
                    value={manualCompany}
                    onChange={(e) => setManualCompany(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#246E7F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Service or Product Title</label>
                <input
                  type="text"
                  placeholder="e.g. Next.js 15 Senior Developer (Hourly)"
                  value={manualService}
                  onChange={(e) => setManualService(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#246E7F]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Client Requirements & Notes</label>
                <textarea
                  rows={3}
                  placeholder="Details discussed with client..."
                  value={manualMessage}
                  onChange={(e) => setManualMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#246E7F]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingManual(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#246E7F] hover:bg-[#1a5563] text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Save Inbound Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filter & Search Deck */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
        
        {/* Segmented Status Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {statusTabs.map((tab) => {
            const isActive = statusFilter === tab.label;
            return (
              <button
                key={tab.label}
                onClick={() => setStatusFilter(tab.label)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#246E7F] text-white shadow-md shadow-[#246E7F]/20'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/80'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                  isActive ? 'bg-white/20 text-white' : tab.bg
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Secondary Type Filter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-3 border-t border-slate-100">
          
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search leads by name, email, phone, company, or requirement keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#246E7F] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 text-xs px-2 py-1 bg-slate-200/60 rounded-lg cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          <div className="md:col-span-4 relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-700 font-bold focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#246E7F] cursor-pointer appearance-none"
            >
              <option value="All">All Categories ({inquiries.length})</option>
              <option value="Developer Hire">Developer Hire</option>
              <option value="Custom Software">Custom Software</option>
              <option value="Source Code License">Source Code License</option>
              <option value="Script Installation">Script Installation</option>
              <option value="Tech Consultancy">Tech Consultancy</option>
              <option value="Project Estimation">Project Estimation</option>
              <option value="General">General Contact</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-3.5 pointer-events-none" />
          </div>

        </div>
      </div>

      {/* Inquiries Data View Table */}
      <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        {filteredInquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50/90 text-[11px] uppercase font-bold text-slate-500 border-b border-slate-200 tracking-wider">
                <tr>
                  <th className="px-6 py-4">Lead / Client</th>
                  <th className="px-6 py-4">Category & Requirement</th>
                  <th className="px-6 py-4">Budget Scope</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Received</th>
                  <th className="px-6 py-4 text-right">Instant Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInquiries.map((inq) => {
                  const cleanPhone = inq.phone.replace(/[^0-9]/g, '');
                  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                    `Hello ${inq.name}, this is Dunga Technologies regarding your inquiry (${inq.id}) for ${inq.serviceOrProduct}. How can we assist you?`
                  )}`;

                  // Initials
                  const initial = inq.name.charAt(0).toUpperCase();

                  return (
                    <tr
                      key={inq.id}
                      onClick={() => setSelectedInquiry(inq)}
                      className="hover:bg-[#f8fafc] transition-colors cursor-pointer group"
                    >
                      {/* Lead / Client Identity */}
                      <td className="px-6 py-4.5">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#246E7F] to-[#14424e] text-white flex items-center justify-center font-extrabold text-sm shrink-0 shadow-xs">
                            {initial}
                          </div>

                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-slate-900 group-hover:text-[#246E7F] transition-colors text-sm">
                                {inq.name}
                              </span>
                              <button
                                onClick={(e) => handleCopy(inq.id, inq.id, e)}
                                className="font-mono text-[11px] font-bold text-[#246E7F] bg-[#e6f4f7] px-2 py-0.5 rounded-md hover:bg-teal-100 transition-colors flex items-center gap-1 cursor-pointer"
                                title="Click to copy lead ID"
                              >
                                <span>{inq.id}</span>
                                {copiedId === inq.id ? (
                                  <Check className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Copy className="w-2.5 h-2.5 opacity-60" />
                                )}
                              </button>
                            </div>

                            <div className="text-[11px] text-slate-500 flex items-center gap-2">
                              <span className="truncate">{inq.email}</span>
                              <span>•</span>
                              <span className="shrink-0">{inq.phone}</span>
                            </div>

                            {inq.company && (
                              <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                                <Building2 className="w-3 h-3 text-slate-400" />
                                <span>{inq.company}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Requirement & Service */}
                      <td className="px-6 py-4.5 max-w-sm">
                        <div className="space-y-1.5">
                          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${getTypeBadgeStyle(inq.type)}`}>
                            {inq.type}
                          </span>
                          <p className="font-bold text-slate-900 text-xs truncate">
                            {inq.serviceOrProduct}
                          </p>
                          <p className="text-[11px] text-slate-500 line-clamp-1 italic bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                            &ldquo;{inq.message}&rdquo;
                          </p>
                        </div>
                      </td>

                      {/* Budget */}
                      <td className="px-6 py-4.5">
                        <span className="inline-flex items-center gap-1 font-extrabold text-[#E06527] bg-[#fff5f0] border border-[#ffdecb] px-2.5 py-1 rounded-xl text-xs">
                          {inq.budget || 'Custom Scope'}
                        </span>
                      </td>

                      {/* Status Dropdown */}
                      <td className="px-6 py-4.5">
                        <select
                          value={inq.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => {
                            e.stopPropagation();
                            inquiryStore.updateInquiryStatus(inq.id, e.target.value as InquiryStatus);
                            refreshInquiries();
                          }}
                          className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border focus:outline-none cursor-pointer transition-all ${
                            inq.status === 'New'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-2 ring-emerald-400/20'
                              : inq.status === 'In Review'
                              ? 'bg-amber-50 text-amber-800 border-amber-300 ring-2 ring-amber-400/20'
                              : inq.status === 'Contacted'
                              ? 'bg-blue-50 text-blue-800 border-blue-300 ring-2 ring-blue-400/20'
                              : inq.status === 'Converted'
                              ? 'bg-purple-50 text-purple-800 border-purple-300 ring-2 ring-purple-400/20'
                              : 'bg-slate-100 text-slate-700 border-slate-300'
                          }`}
                        >
                          <option value="New">🟢 New</option>
                          <option value="In Review">🟡 In Review</option>
                          <option value="Contacted">🔵 Contacted</option>
                          <option value="Converted">✨ Converted</option>
                          <option value="Archived">⚪ Archived</option>
                        </select>
                      </td>

                      {/* Received Date */}
                      <td className="px-6 py-4.5 text-slate-500 text-[11px]">
                        <div className="font-bold text-slate-700">{new Date(inq.createdAt).toLocaleDateString()}</div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(inq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </td>

                      {/* Action Buttons */}
                      <td className="px-6 py-4.5 text-right">
                        <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white border border-emerald-200 transition-all shadow-xs"
                            title="Direct WhatsApp Chat"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>

                          <a
                            href={`mailto:${inq.email}`}
                            className="p-2.5 rounded-xl bg-slate-100 hover:bg-[#246E7F] text-slate-700 hover:text-white border border-slate-200 transition-all shadow-xs"
                            title="Compose Email"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={() => setSelectedInquiry(inq)}
                            className="px-3.5 py-2 bg-slate-100 hover:bg-[#246E7F] text-slate-700 hover:text-white text-xs font-bold rounded-xl border border-slate-200 hover:border-transparent transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                          >
                            <span>View</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-20 text-center space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto">
              <Inbox className="w-8 h-8" />
            </div>
            <h4 className="text-base font-extrabold text-slate-900">No inquiries match your filters</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try modifying your search term or selecting a different status filter tab above.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('All');
                setTypeFilter('All');
              }}
              className="px-4 py-2 bg-[#246E7F] hover:bg-[#1a5563] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <InquiryDetailModal
        inquiry={selectedInquiry}
        isOpen={!!selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
        onStatusChanged={refreshInquiries}
      />

    </div>
  );
}

