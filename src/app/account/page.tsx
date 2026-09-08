'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Download,
  Key,
  Server,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Globe,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  Send,
  AlertCircle,
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { useCurrency } from '@/context/CurrencyContext';

interface UserLicenseState {
  id: string;
  licenseKey: string;
  productTitle: string;
  productSlug: string;
  version: string;
  licenseType: string;
  boundDomain?: string;
  isActive: boolean;
  purchasedAt: string;
  downloadPackageUrl: string;
  setupStatus: 'NOT_REQUESTED' | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  vpsIp?: string;
  domainName?: string;
}

export default function AccountPortalPage() {
  const { formatAmount } = useCurrency();
  const [activeTab, setActiveTab] = useState<'downloads' | 'licenses' | 'setup' | 'invoices'>('downloads');
  const [licenses, setLicenses] = useState<UserLicenseState[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Setup form states
  const [selectedLicenseForSetup, setSelectedLicenseForSetup] = useState<string>('');
  const [vpsIp, setVpsIp] = useState('');
  const [domainName, setDomainName] = useState('');
  const [sshUser, setSshUser] = useState('root');
  const [sshPassword, setSshPassword] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [setupSubmittedSuccess, setSetupSubmittedSuccess] = useState(false);

  // Domain binding inline editing
  const [editingDomainLicId, setEditingDomainLicId] = useState<string | null>(null);
  const [domainInputValue, setDomainInputValue] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dunga_user_licenses');
      if (saved && JSON.parse(saved).length > 0) {
        const parsed = JSON.parse(saved);
        setLicenses(parsed);
        if (parsed[0]) setSelectedLicenseForSetup(parsed[0].id);
      } else {
        // Seed initial mock licenses
        const defaultLicenses: UserLicenseState[] = [
          {
            id: 'lic_omniflow_01',
            licenseKey: 'DUNGA-OMNI-9831-4829',
            productTitle: 'OmniFlow AI CRM & Telecalling Suite',
            productSlug: 'omniflow-ai-crm-telecaller-suite',
            version: '2.4.0',
            licenseType: 'REGULAR',
            boundDomain: 'crm.acmesolutions.com',
            isActive: true,
            purchasedAt: '2026-03-01',
            downloadPackageUrl: 'https://downloads.dungatechnologies.com/packages/omniflow-crm-v2.4.0.zip',
            setupStatus: 'IN_PROGRESS',
            vpsIp: '159.65.142.89',
            domainName: 'crm.acmesolutions.com',
          },
          {
            id: 'lic_dungapay_02',
            licenseKey: 'DUNGA-PAY-7712-3341',
            productTitle: 'DungaPay Multi-Gateway Payment Engine & Invoicing',
            productSlug: 'dungapay-payment-gateway-subscription-engine',
            version: '1.8.2',
            licenseType: 'EXTENDED',
            boundDomain: 'billing.payorbit.io',
            isActive: true,
            purchasedAt: '2026-02-15',
            downloadPackageUrl: 'https://downloads.dungatechnologies.com/packages/dungapay-v1.8.2.zip',
            setupStatus: 'COMPLETED',
            vpsIp: '139.59.81.201',
            domainName: 'billing.payorbit.io',
          },
        ];
        setLicenses(defaultLicenses);
        setSelectedLicenseForSetup(defaultLicenses[0].id);
        localStorage.setItem('dunga_user_licenses', JSON.stringify(defaultLicenses));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveDomain = (licId: string) => {
    const updated = licenses.map((lic) => {
      if (lic.id === licId) {
        return { ...lic, boundDomain: domainInputValue.trim() };
      }
      return lic;
    });
    setLicenses(updated);
    localStorage.setItem('dunga_user_licenses', JSON.stringify(updated));
    setEditingDomainLicId(null);
    setDomainInputValue('');
  };

  const handleSubmitSetup = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = licenses.map((lic) => {
      if (lic.id === selectedLicenseForSetup) {
        return {
          ...lic,
          setupStatus: 'IN_PROGRESS' as const,
          vpsIp,
          domainName,
        };
      }
      return lic;
    });
    setLicenses(updated);
    localStorage.setItem('dunga_user_licenses', JSON.stringify(updated));
    setSetupSubmittedSuccess(true);
    setTimeout(() => setSetupSubmittedSuccess(false), 4000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* User Account Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Dunga Client Workspace
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Customer License & Delivery Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Manage your acquired software source code, license domain keys, and track live server deployment status.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 bg-[#246e7f] hover:bg-[#1a515e] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-xs"
            >
              <span>Explore Marketplace</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-xs flex gap-2 overflow-x-auto text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('downloads')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'downloads'
                ? 'bg-[#246e7f] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Downloads & Packages ({licenses.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('licenses')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'licenses'
                ? 'bg-[#246e7f] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Active License Keys & Domains</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('setup')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'setup'
                ? 'bg-[#246e7f] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>Server Setup Tracker</span>
            <span className="bg-[#fff3eb] text-[#e06527] text-[10px] px-1.5 py-0.2 rounded font-mono">
              24-48h SLA
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('invoices')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'invoices'
                ? 'bg-[#246e7f] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Billing Invoices (GST)</span>
          </button>
        </div>

        {/* Tab 1: Downloads */}
        {activeTab === 'downloads' && (
          <div className="space-y-4">
            {licenses.map((lic) => (
              <div
                key={lic.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#e6f4f7] text-[#246e7f] text-[10px] font-bold px-2 py-0.5 rounded">
                      v{lic.version}
                    </span>
                    <span className="text-xs text-slate-500">Purchased {lic.purchasedAt}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{lic.productTitle}</h3>
                  <p className="text-xs text-slate-600">
                    Includes full frontend Next.js code, backend endpoints, database migration scripts, Docker files, and technical documentation.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
                  <a
                    href={lic.downloadPackageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#246e7f] hover:bg-[#1a515e] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Archive (.ZIP)</span>
                  </a>

                  <Link
                    href={`/products/${lic.productSlug}`}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3.5 py-2.5 rounded-xl transition-colors"
                  >
                    View Docs
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Licenses & Domain Binding */}
        {activeTab === 'licenses' && (
          <div className="space-y-4">
            <div className="bg-[#e6f4f7] border border-[#246e7f]/20 p-4 rounded-2xl text-xs text-[#1a515e] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#246e7f] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block text-slate-900">Domain Locking & Activation Info</strong>
                <span>Bind your production domain to receive automated updates, security hotfixes, and access Dunga License Validation API.</span>
              </div>
            </div>

            {licenses.map((lic) => (
              <div
                key={lic.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{lic.productTitle}</h3>
                    <span className="text-[11px] text-slate-500 font-medium">
                      License Type: <strong className="text-[#246e7f]">{lic.licenseType}</strong>
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold px-2.5 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Active & Validated
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* License Key Display */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      License Key
                    </span>
                    <div className="flex items-center justify-between gap-2">
                      <code className="text-xs font-mono font-bold text-slate-900 truncate">
                        {lic.licenseKey}
                      </code>
                      <button
                        type="button"
                        onClick={() => handleCopy(lic.licenseKey)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-white rounded transition-colors"
                        title="Copy Key"
                      >
                        {copiedKey === lic.licenseKey ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Bound Domain Input */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Bound Domain / IP Whitelist
                    </span>
                    {editingDomainLicId === lic.id ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. app.mycompany.com"
                          value={domainInputValue}
                          onChange={(e) => setDomainInputValue(e.target.value)}
                          className="flex-1 bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#246e7f]"
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveDomain(lic.id)}
                          className="bg-[#246e7f] text-white text-xs font-bold px-3 py-1 rounded"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-800">
                          <Globe className="w-3.5 h-3.5 text-[#246e7f]" />
                          <span>{lic.boundDomain || 'No domain bound yet'}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingDomainLicId(lic.id);
                            setDomainInputValue(lic.boundDomain || '');
                          }}
                          className="text-xs text-[#246e7f] hover:underline font-bold"
                        >
                          {lic.boundDomain ? 'Change Domain' : 'Bind Domain'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Server Setup Tracker */}
        {activeTab === 'setup' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 7 cols: 4-Stage Deployment Pipeline */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Live Server Deployment Status
                  </h3>
                  <p className="text-xs text-slate-500">
                    Our DevOps engineers handle configuration of your VPS, Database, SSL, and Nginx.
                  </p>
                </div>

                {/* 4-Stage Progress Pipeline */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Step 1: Order Verified & Assigned</h4>
                      <p className="text-[11px] text-slate-500">Server setup add-on booked and assigned to Senior DevOps.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Step 2: Server Credentials Received</h4>
                      <p className="text-[11px] text-slate-500">
                        Target server: <strong>159.65.142.89 (Ubuntu 22.04 LTS)</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#246e7f] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 animate-pulse">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#246e7f]">
                        Step 3: Database & SSL Deployment in Progress
                      </h4>
                      <p className="text-[11px] text-slate-600">
                        Configuring PostgreSQL migrations, Node.js PM2 process manager, and Let&apos;s Encrypt SSL certificate.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 opacity-50">
                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Step 4: Live Verification & Handover</h4>
                      <p className="text-[11px] text-slate-500">Admin login credentials generated and delivered to your email.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600">
                  <span className="font-bold block text-slate-900 mb-0.5">Estimated Completion Time:</span>
                  <span>Today by 6:00 PM IST (Turnaround SLA: 24-48 Hours)</span>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Server Credentials Form */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Submit / Update Server Details</h3>
                  <p className="text-xs text-slate-500">
                    Enter your VPS / Hosting details to initiate or update your server configuration.
                  </p>
                </div>

                {setupSubmittedSuccess && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Credentials saved and transmitted securely to Dunga DevOps!</span>
                  </div>
                )}

                <form onSubmit={handleSubmitSetup} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Target Product License
                    </label>
                    <select
                      value={selectedLicenseForSetup}
                      onChange={(e) => setSelectedLicenseForSetup(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
                    >
                      {licenses.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.productTitle} (v{l.version})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      VPS Server IP / Hostname *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 159.65.142.89"
                      value={vpsIp}
                      onChange={(e) => setVpsIp(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Target Domain Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. crm.mycompany.com"
                      value={domainName}
                      onChange={(e) => setDomainName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        SSH Username
                      </label>
                      <input
                        type="text"
                        value={sshUser}
                        onChange={(e) => setSshUser(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Root Password / SSH Key
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={sshPassword}
                        onChange={(e) => setSshPassword(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Custom Instructions / Specific Port Needs
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Please install PostgreSQL 15 and configure custom SMTP"
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#246e7f] hover:bg-[#1a515e] text-white font-bold text-xs py-3 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Installation Ticket</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Invoices */}
        {activeTab === 'invoices' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Tax & Billing Invoices</h3>
              <p className="text-xs text-slate-500">Itemized B2B invoices with GST details for tax claiming.</p>
            </div>

            <div className="divide-y divide-slate-200">
              <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">Invoice #INV-2026-9831</span>
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded">
                      PAID
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    OmniFlow AI CRM (Regular License) + Standard Server Setup Add-on
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Date: March 1, 2026 • Razorpay TXN #tx_9831a</div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm font-black text-slate-900">₹5,998.00</span>
                  <button
                    type="button"
                    onClick={() => alert('Downloading official GST Tax Invoice PDF...')}
                    className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>

              <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">Invoice #INV-2026-7712</span>
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded">
                      PAID
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    DungaPay Multi-Gateway Payment Engine (Extended Commercial License)
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Date: February 15, 2026 • Stripe TXN #tx_7712b</div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm font-black text-slate-900">₹11,999.00</span>
                  <button
                    type="button"
                    onClick={() => alert('Downloading official GST Tax Invoice PDF...')}
                    className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
