'use client';

import React, { useState } from 'react';
import { Inquiry, InquiryStatus, inquiryStore } from '@/lib/inquiryStore';
import {
  X,
  Mail,
  Phone,
  MessageSquare,
  Building2,
  Calendar,
  Clock,
  DollarSign,
  Tag,
  CheckCircle2,
  AlertCircle,
  FileText,
  Send,
  Trash2,
  ExternalLink,
  ShieldCheck,
  User,
  Sparkles
} from 'lucide-react';

interface InquiryDetailModalProps {
  inquiry: Inquiry | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChanged?: () => void;
}

export const InquiryDetailModal: React.FC<InquiryDetailModalProps> = ({
  inquiry,
  isOpen,
  onClose,
  onStatusChanged
}) => {
  const [newNote, setNewNote] = useState('');
  const [currentStatus, setCurrentStatus] = useState<InquiryStatus>(inquiry?.status || 'New');

  React.useEffect(() => {
    if (inquiry) {
      setCurrentStatus(inquiry.status);
    }
  }, [inquiry]);

  if (!isOpen || !inquiry) return null;

  const handleStatusChange = (newStatus: InquiryStatus) => {
    setCurrentStatus(newStatus);
    inquiryStore.updateInquiryStatus(inquiry.id, newStatus);
    if (onStatusChanged) onStatusChanged();
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    inquiryStore.addInquiryNote(inquiry.id, newNote.trim());
    setNewNote('');
    if (onStatusChanged) onStatusChanged();
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete inquiry ${inquiry.id}?`)) {
      inquiryStore.deleteInquiry(inquiry.id);
      if (onStatusChanged) onStatusChanged();
      onClose();
    }
  };

  // Clean phone number for WhatsApp
  const cleanPhone = inquiry.phone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello ${inquiry.name}, this is Dunga Technologies regarding your inquiry (${inquiry.id}) for ${inquiry.serviceOrProduct}. How can we assist you?`
  )}`;

  const emailSubject = encodeURIComponent(`Regarding your Dunga Technologies inquiry (${inquiry.id})`);
  const mailtoUrl = `mailto:${inquiry.email}?subject=${emailSubject}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl text-white overflow-hidden my-8">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#246E7F]/20 text-teal-300 border border-[#246E7F]/40">
                {inquiry.id}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                via {inquiry.sourcePage}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {inquiry.name}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Status Changer & Quick Channels */}
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Lead Status
              </label>
              <select
                value={currentStatus}
                onChange={(e) => handleStatusChange(e.target.value as InquiryStatus)}
                className="bg-slate-800 border border-slate-700 text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#246E7F] cursor-pointer"
              >
                <option value="New">🟢 New (Unprocessed)</option>
                <option value="In Review">🟡 In Review (Under Scoping)</option>
                <option value="Contacted">🔵 Contacted (In Discussion)</option>
                <option value="Converted">✨ Converted (Won Deal)</option>
                <option value="Archived">⚪ Archived</option>
              </select>
            </div>

            {/* Instant Communication Actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-sm active:scale-95"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Reply</span>
              </a>

              <a
                href={mailtoUrl}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-[#246E7F]" />
                <span>Send Email</span>
              </a>
            </div>
          </div>

          {/* Client Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-500 uppercase font-bold block">Contact Email</span>
              <div className="flex items-center gap-2 text-slate-200 font-semibold truncate">
                <Mail className="w-3.5 h-3.5 text-[#246E7F] shrink-0" />
                <a href={`mailto:${inquiry.email}`} className="hover:underline truncate">
                  {inquiry.email}
                </a>
              </div>
            </div>

            <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-500 uppercase font-bold block">Phone / WhatsApp</span>
              <div className="flex items-center gap-2 text-slate-200 font-semibold">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{inquiry.phone}</span>
              </div>
            </div>

            {inquiry.company && (
              <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-500 uppercase font-bold block">Company / Entity</span>
                <div className="flex items-center gap-2 text-slate-200 font-semibold">
                  <Building2 className="w-3.5 h-3.5 text-[#E06527] shrink-0" />
                  <span>{inquiry.company}</span>
                </div>
              </div>
            )}

            {inquiry.budget && (
              <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-500 uppercase font-bold block">Budget / Package</span>
                <div className="flex items-center gap-2 text-amber-300 font-bold">
                  <DollarSign className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{inquiry.budget}</span>
                </div>
              </div>
            )}
          </div>

          {/* Requested Service / Product Banner */}
          <div className="bg-gradient-to-r from-[#246E7F]/15 to-[#E06527]/15 border border-slate-800 p-4 rounded-2xl space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-400">
              {inquiry.type} INQUIRY
            </span>
            <h4 className="text-sm font-bold text-white">
              {inquiry.serviceOrProduct}
            </h4>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
              <Clock className="w-3 h-3" />
              <span>Received: {new Date(inquiry.createdAt).toLocaleString()}</span>
            </div>
          </div>

          {/* Project Brief / Message Text */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Client Message / Requirements
            </span>
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
              {inquiry.message}
            </div>
          </div>

          {/* Internal Notes Thread */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Internal Team Notes ({inquiry.notes?.length || 0})
            </span>

            {inquiry.notes && inquiry.notes.length > 0 ? (
              <div className="space-y-2">
                {inquiry.notes.map((note, idx) => (
                  <div key={idx} className="bg-slate-950/50 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No notes added yet.</p>
            )}

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder="Add internal note or update (e.g. Demo call set for 3 PM)..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#246E7F]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#246E7F] hover:bg-[#1b5563] text-white text-xs font-bold rounded-xl transition-colors shrink-0"
              >
                Add Note
              </button>
            </form>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-950/30 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Inquiry</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
