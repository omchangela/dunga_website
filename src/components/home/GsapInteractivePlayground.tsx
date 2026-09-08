'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import {
  Sparkles,
  PhoneCall,
  CreditCard,
  Bot,
  CheckCircle2,
  Send,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  UserCheck,
  Zap,
  Activity,
  Check,
  Terminal,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/products';
import { useCurrency } from '@/context/CurrencyContext';

export function GsapInteractivePlayground() {
  const { openLiveDemo, addItem } = useCart();
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<'crm' | 'payment' | 'ai'>('crm');

  const containerRef = useRef<HTMLDivElement>(null);
  const activeWindowRef = useRef<HTMLDivElement>(null);

  // CRM State
  const [leadStatus, setLeadStatus] = useState('Interested');
  const [whatsappSent, setWhatsappSent] = useState(false);

  // Payment Calculator State
  const [calcAmount, setCalcAmount] = useState(4999);
  const [selectedGateway, setSelectedGateway] = useState('Razorpay (UPI)');

  // AI Chat State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! I am AetherBot AI trained on Dunga documentation. How can I assist you today?' },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Animate window on tab switch
  useEffect(() => {
    if (!activeWindowRef.current) return;
    gsap.fromTo(
      activeWindowRef.current,
      { opacity: 0, y: 15, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out' }
    );
  }, [activeTab]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: `Dunga Technologies provides 100% full unencrypted Next.js source code + FastAPI backend with lifetime updates for "${userMsg}". You can deploy on your VPS or add the ₹999 / $15 server setup add-on!`,
        },
      ]);
    }, 500);
  };

  return (
    <section ref={containerRef} className="py-20 sm:py-24 bg-slate-50 border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#e6f4f7] border border-[#246e7f]/20 text-[#246e7f] text-xs font-bold px-4 py-1 rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#e06527]" />
            <span>Interactive Live Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Test Dunga Software Live in Your Browser
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Click through our interactive mini-workspaces below to experience the zero-latency workflows built into every Dunga codebase.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
          <button
            type="button"
            onClick={() => setActiveTab('crm')}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all border ${
              activeTab === 'crm'
                ? 'bg-[#246e7f] text-white border-[#246e7f] shadow-lg shadow-[#246e7f]/25 scale-105'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>1. OmniFlow Telecaller CRM</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('payment')}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all border ${
              activeTab === 'payment'
                ? 'bg-[#246e7f] text-white border-[#246e7f] shadow-lg shadow-[#246e7f]/25 scale-105'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>2. DungaPay Gateway Engine</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ai')}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all border ${
              activeTab === 'ai'
                ? 'bg-[#246e7f] text-white border-[#246e7f] shadow-lg shadow-[#246e7f]/25 scale-105'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>3. AetherBot AI Knowledge Agent</span>
          </button>
        </div>

        {/* Active Interactive Window */}
        <div
          ref={activeWindowRef}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl max-w-4xl mx-auto"
        >
          {activeTab === 'crm' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    OmniFlow Live Telecalling Workspace
                  </h3>
                  <p className="text-xs text-slate-500">
                    1-click call logging with automated WhatsApp PDF proposal triggers
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openLiveDemo(PRODUCTS[0])}
                  className="bg-[#e6f4f7] text-[#246e7f] text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#d8eef3] transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <span>Launch Full Screen Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#246e7f] text-white flex items-center justify-center font-bold text-xs">
                        RS
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Rahul Sharma</div>
                        <div className="text-[11px] text-slate-500">+91 98765 43210 • Bengaluru</div>
                      </div>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      Inbound Lead
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase text-slate-400 block">
                      Click Call Outcome to Test Trigger:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {['Interested', 'Callback Needed', 'Send Quotation', 'Not Answering'].map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => {
                            setLeadStatus(st);
                            if (st === 'Interested' || st === 'Send Quotation') {
                              setWhatsappSent(true);
                              setTimeout(() => setWhatsappSent(false), 3500);
                            }
                          }}
                          className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left ${
                            leadStatus === st
                              ? 'bg-[#246e7f] text-white border-[#246e7f] shadow-sm'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 text-white p-5 rounded-2xl flex flex-col justify-between space-y-4 shadow-inner">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-1">
                      Automated Trigger Orchestrator:
                    </span>
                    <h4 className="text-sm font-bold text-white">Current Status: {leadStatus}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      When marked as <strong>{leadStatus}</strong>, OmniFlow CRM automatically triggers pre-approved WhatsApp templates and schedules next actions in the calendar.
                    </p>
                  </div>

                  {whatsappSent ? (
                    <div className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs p-3 rounded-xl flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>WhatsApp Brochure & Proposal PDF dispatched instantly!</span>
                    </div>
                  ) : (
                    <div className="text-[11px] text-slate-400">
                      💡 Click &quot;Interested&quot; or &quot;Send Quotation&quot; to test instant webhook trigger.
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                    <span className="text-xs text-slate-400">OmniFlow v2.4 Source</span>
                    <button
                      type="button"
                      onClick={() => addItem(PRODUCTS[0], 'REGULAR', [])}
                      className="bg-[#e06527] hover:bg-[#c9561c] text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md shadow-[#e06527]/20"
                    >
                      Buy Code ({formatPrice(PRODUCTS[0].regularPriceINR, PRODUCTS[0].regularPriceUSD)})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    DungaPay Multi-Gateway Failover Router
                  </h3>
                  <p className="text-xs text-slate-500">
                    Auto-routes between Razorpay, Stripe, and Cashfree with zero fee drops
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openLiveDemo(PRODUCTS[1])}
                  className="bg-[#e6f4f7] text-[#246e7f] text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#d8eef3] transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <span>Launch Full Screen Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Simulate Transaction Amount (₹)
                    </label>
                    <input
                      type="range"
                      min="999"
                      max="49999"
                      step="500"
                      value={calcAmount}
                      onChange={(e) => setCalcAmount(Number(e.target.value))}
                      className="w-full accent-[#246e7f]"
                    />
                    <div className="text-lg font-black text-slate-900 mt-1">
                      ₹{calcAmount.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1.5">
                      Select Gateway Route:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {['Razorpay (UPI)', 'Stripe (Cards)', 'Cashfree'].map((gw) => (
                        <button
                          key={gw}
                          type="button"
                          onClick={() => setSelectedGateway(gw)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                            selectedGateway === gw
                              ? 'bg-[#246e7f] text-white border-[#246e7f]'
                              : 'bg-white text-slate-700 border-slate-200'
                          }`}
                        >
                          {gw}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 text-white p-5 rounded-2xl flex flex-col justify-between space-y-3 shadow-inner">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block mb-1">
                      Orchestrator Real-Time Output
                    </span>
                    <div className="text-xs text-slate-300 space-y-1.5 font-mono">
                      <div>Active Route: <strong className="text-white">{selectedGateway}</strong></div>
                      <div>Net Settlement: <strong className="text-emerald-400">₹{(calcAmount * 0.98).toLocaleString('en-IN')}</strong></div>
                      <div>Automated GST Tax Invoice: <strong className="text-white">Auto-Generated PDF</strong></div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                    <span className="text-xs text-slate-400">DungaPay v1.8 Source</span>
                    <button
                      type="button"
                      onClick={() => addItem(PRODUCTS[1], 'REGULAR', [])}
                      className="bg-[#e06527] hover:bg-[#c9561c] text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md shadow-[#e06527]/20"
                    >
                      Buy Code ({formatPrice(PRODUCTS[1].regularPriceINR, PRODUCTS[1].regularPriceUSD)})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    AetherBot AI Autonomous RAG Assistant
                  </h3>
                  <p className="text-xs text-slate-500">Trained on documents with zero hallucinations</p>
                </div>
                <button
                  type="button"
                  onClick={() => openLiveDemo(PRODUCTS[2])}
                  className="bg-[#e6f4f7] text-[#246e7f] text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#d8eef3] transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <span>Launch Full Screen Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Chat Simulation Window */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 h-64 overflow-y-auto space-y-3">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#246e7f] text-white rounded-br-none shadow-sm'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendChat} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask anything about Dunga software source code or installation..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
                />
                <button
                  type="submit"
                  className="bg-[#246e7f] hover:bg-[#1a515e] text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
