'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Copy,
  Check,
  Download,
  Server,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  FileText,
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

export default function CheckoutSuccessPage() {
  const { formatAmount } = useCurrency();
  const [order, setOrder] = useState<any>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    // Fire confetti celebration
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    try {
      const saved = localStorage.getItem('dunga_latest_order');
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Success Header Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl text-center space-y-4 relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Payment Confirmed • Order {order ? order.orderNumber : 'DNG-839211'}
          </span>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Thank You for Your Order!
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Your license key and download link have been generated and emailed to{' '}
            <strong className="text-slate-900">{order ? order.customerEmail : 'your email'}</strong>.
          </p>
        </div>

        {/* Generated Digital Licenses & Download Hub */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Your Software License & Download Package</h2>
              <p className="text-xs text-slate-500">Unencrypted source code + lifetime minor updates</p>
            </div>
            <Link
              href="/account"
              className="text-xs text-[#246e7f] font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>Manage in Client Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {order && order.generatedLicenses ? (
            <div className="space-y-4">
              {order.generatedLicenses.map((lic: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{lic.productTitle}</h3>
                      <span className="text-[11px] text-[#246e7f] font-semibold">
                        Version {lic.version} • {lic.licenseType}
                      </span>
                    </div>

                    <a
                      href={lic.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#246e7f] hover:bg-[#1a515e] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download .ZIP (v{lic.version})</span>
                    </a>
                  </div>

                  {/* License Key Box */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Domain License Activation Key:
                      </span>
                      <code className="text-xs font-mono font-bold text-slate-900 truncate block">
                        {lic.licenseKey}
                      </code>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyKey(lic.licenseKey)}
                      className="p-2 text-slate-600 hover:text-[#246e7f] hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold flex-shrink-0"
                    >
                      {copiedKey === lic.licenseKey ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Key</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Server Setup Action if ordered */}
                  {lic.setupStatus === 'PENDING' && (
                    <div className="bg-emerald-50/80 border border-emerald-200 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-900">
                      <div className="flex items-start gap-2.5">
                        <Server className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold block">Server Setup Add-on Active (24-48h Delivery)</strong>
                          <span>Please submit your VPS / cPanel details in the client portal to begin deployment.</span>
                        </div>
                      </div>
                      <Link
                        href="/account"
                        className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3.5 py-2 rounded-lg transition-colors flex-shrink-0 text-center"
                      >
                        Submit Credentials →
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">OmniFlow AI CRM Source Package</h3>
                  <span className="text-[11px] text-[#246e7f] font-semibold">Regular Source License</span>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 bg-[#246e7f] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .ZIP</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Invoice Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">GST-Compliant Tax Invoice Generated</div>
              <div className="text-[11px] text-slate-500">Invoice ID: INV-{order ? order.orderNumber : '839211'}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/account"
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2 rounded-lg transition-colors"
            >
              Go to Account Portal
            </Link>
            <Link
              href="/products"
              className="bg-[#246e7f] hover:bg-[#1a515e] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
            >
              Browse More Scripts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
