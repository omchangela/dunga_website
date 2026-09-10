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
  Tag
} from 'lucide-react';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [isAddingManual, setIsAddingManual] = useState(false);

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
    { label: 'All', count: inquiries.length },
    { label: 'New', count: inquiries.filter((i) => i.status === 'New').length, color: 'text-emerald-400 bg-emerald-500/10' },
    { label: 'In Review', count: inquiries.filter((i) => i.status === 'In Review').length, color: 'text-amber-400 bg-amber-500/10' },
    { label: 'Contacted', count: inquiries.filter((i) => i.status === 'Contacted').length, color: 'text-blue-400 bg-blue-500/10' },
    { label: 'Converted', count: inquiries.filter((i) => i.status === 'Converted').length, color: 'text-purple-400 bg-purple-500/10' },
    { label: 'Archived', count: inquiries.filter((i) => i.status === 'Archived').length, color: 'text-slate-400 bg-slate-800' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Client Inquiries & Live Leads
          </h2>
          <p className="text-xs text-slate-400">
            Real-time feed of all contact submissions, hire developer bookings, and estimation requests.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsAddingManual(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-[#246E7F] to-[#1b5563] text-white text-xs font-bold rounded-xl shadow-md shadow-[#246E7F]/20 hover:brightness-110 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Manual Lead</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold rounded-xl border border-slate-800 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Manual Lead Modal */}
      {isAddingManual && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-white my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-teal-400" />
                <span>Log New Inbound Lead Manually</span>
              </h3>
              <button
                onClick={() => setIsAddingManual(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Client Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Joshi"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#246E7F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="client@company.com"
                    value={manualEmail}
                    onChange={(e) => setManualEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#246E7F]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={manualPhone}
                    onChange={(e) => setManualPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#246E7F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Inquiry Type</label>
                  <select
                    value={manualType}
                    onChange={(e) => setManualType(e.target.value as InquiryType)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#246E7F]"
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
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Company / Entity</label>
                  <input
                    type="text"
                    placeholder="Acme Tech Labs"
                    value={manualCompany}
                    onChange={(e) => setManualCompany(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#246E7F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Service or Product Title</label>
                <input
                  type="text"
                  placeholder="e.g. Next.js 15 Senior Developer (Hourly)"
                  value={manualService}
                  onChange={(e) => setManualService(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#246E7F]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Client Requirements & Notes</label>
                <textarea
                  rows={3}
                  placeholder="Details discussed with client..."
                  value={manualMessage}
                  onChange={(e) => setManualMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#246E7F]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingManual(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#246E7F] hover:bg-[#1b5563] text-white font-bold rounded-xl"
                >
                  Save Inbound Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filter & Search Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl space-y-4">
        
        {/* Status Tab Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {statusTabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setStatusFilter(tab.label)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                statusFilter === tab.label
                  ? 'bg-gradient-to-r from-[#246E7F] to-[#1b5563] text-white shadow-md shadow-[#246E7F]/20'
                  : 'bg-slate-950/60 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${
                statusFilter === tab.label ? 'bg-white/20 text-white' : tab.color || 'bg-slate-800 text-slate-400'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Secondary Type Filter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2 border-t border-slate-800/80">
          
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by client name, email, phone, company, or requirement keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#246E7F]"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-[#246E7F] cursor-pointer"
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
          </div>

        </div>
      </div>

      {/* Inquiries Table / List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        {filteredInquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-[11px] uppercase font-bold text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Lead / Client</th>
                  <th className="px-5 py-3.5">Category & Requirement</th>
                  <th className="px-5 py-3.5">Budget</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Received</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredInquiries.map((inq) => {
                  const cleanPhone = inq.phone.replace(/[^0-9]/g, '');
                  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                    `Hello ${inq.name}, this is Dunga Technologies regarding your inquiry (${inq.id}) for ${inq.serviceOrProduct}. How can we assist you?`
                  )}`;

                  return (
                    <tr
                      key={inq.id}
                      className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                    >
                      {/* Client Info */}
                      <td className="px-5 py-4" onClick={() => setSelectedInquiry(inq)}>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-teal-400">
                              {inq.id}
                            </span>
                            <span className="font-bold text-white group-hover:text-teal-300 transition-colors">
                              {inq.name}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-2">
                            <span>{inq.email}</span>
                            <span>•</span>
                            <span>{inq.phone}</span>
                          </div>
                          {inq.company && (
                            <span className="text-[10px] text-slate-500 block">
                              🏢 {inq.company}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Requirement & Service */}
                      <td className="px-5 py-4 max-w-xs" onClick={() => setSelectedInquiry(inq)}>
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                            {inq.type}
                          </span>
                          <p className="font-semibold text-white truncate">
                            {inq.serviceOrProduct}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate">
                            {inq.message}
                          </p>
                        </div>
                      </td>

                      {/* Budget */}
                      <td className="px-5 py-4" onClick={() => setSelectedInquiry(inq)}>
                        <span className="font-bold text-amber-300">
                          {inq.budget || 'Custom Scope'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <select
                          value={inq.status}
                          onChange={(e) => {
                            e.stopPropagation();
                            inquiryStore.updateInquiryStatus(inq.id, e.target.value as InquiryStatus);
                            refreshInquiries();
                          }}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border focus:outline-none cursor-pointer ${
                            inq.status === 'New'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : inq.status === 'In Review'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : inq.status === 'Contacted'
                              ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                              : inq.status === 'Converted'
                              ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
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
                      <td className="px-5 py-4 text-slate-400 text-[11px]" onClick={() => setSelectedInquiry(inq)}>
                        <div>{new Date(inq.createdAt).toLocaleDateString()}</div>
                        <div className="text-[10px] text-slate-500">
                          {new Date(inq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>

                      {/* Action Buttons */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white transition-colors"
                            title="Instant WhatsApp Chat"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>

                          <a
                            href={`mailto:${inq.email}`}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-400 hover:text-white transition-colors"
                            title="Compose Email"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={() => setSelectedInquiry(inq)}
                            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                          >
                            View
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
          <div className="py-16 text-center space-y-3">
            <Inbox className="w-12 h-12 text-slate-600 mx-auto" />
            <h4 className="text-base font-bold text-white">No inquiries match your filters</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try changing search queries or resetting status filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('All');
                setTypeFilter('All');
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors"
            >
              Reset Filters
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
