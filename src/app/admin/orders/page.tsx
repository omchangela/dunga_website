'use client';

import React, { useState } from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import {
  ShoppingCart,
  KeyRound,
  Download,
  CheckCircle2,
  Clock,
  Search,
  ExternalLink,
  ShieldCheck,
  CreditCard,
  User
} from 'lucide-react';

interface MockOrder {
  id: string;
  customerName: string;
  email: string;
  productName: string;
  licenseType: string;
  amountINR: number;
  amountUSD: number;
  paymentMethod: string;
  status: 'Completed' | 'Processing' | 'Refunded';
  licenseKey: string;
  date: string;
}

const DEMO_ORDERS: MockOrder[] = [
  {
    id: 'ORD-8821',
    customerName: 'Aarav Singhania',
    email: 'aarav@realtysmart.in',
    productName: 'OmniFlow AI CRM & Telecaller Suite',
    licenseType: 'Extended Commercial',
    amountINR: 18499,
    amountUSD: 249,
    paymentMethod: 'Razorpay (UPI / NetBanking)',
    status: 'Completed',
    licenseKey: 'DNGA-OF-9942-8812-XTND',
    date: 'Sept 10, 2026'
  },
  {
    id: 'ORD-8820',
    customerName: 'Marcus Vance',
    email: 'marcus@vancetech.io',
    productName: 'DungaPay Payment Gateway Orchestrator',
    licenseType: 'Regular Single Domain',
    amountINR: 4999,
    amountUSD: 69,
    paymentMethod: 'Stripe (Credit Card)',
    status: 'Completed',
    licenseKey: 'DNGA-DP-3120-7741-REGL',
    date: 'Sept 9, 2026'
  },
  {
    id: 'ORD-8819',
    customerName: 'Elena Rostova',
    email: 'elena@cybershield.de',
    productName: 'AetherBot AI Customer Support & RAG Knowledge Engine',
    licenseType: 'Extended Multi-Tenant',
    amountINR: 14999,
    amountUSD: 199,
    paymentMethod: 'Stripe (SEPA / Card)',
    status: 'Completed',
    licenseKey: 'DNGA-AB-4819-2231-XTND',
    date: 'Sept 8, 2026'
  },
  {
    id: 'ORD-8818',
    customerName: 'Karan Mehra',
    email: 'karan@apexacademy.in',
    productName: 'Code & Script Installation Setup (AWS Deploy)',
    licenseType: 'Service Addon',
    amountINR: 999,
    amountUSD: 15,
    paymentMethod: 'Razorpay',
    status: 'Completed',
    licenseKey: 'DNGA-SRV-9918-0012-INST',
    date: 'Sept 8, 2026'
  }
];

export default function AdminOrdersPage() {
  const { formatPrice } = useCurrency();
  const [orders] = useState<MockOrder[]>(DEMO_ORDERS);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter((o) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.email.toLowerCase().includes(q) ||
      o.productName.toLowerCase().includes(q) ||
      o.licenseKey.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Client Orders & License Keys
          </h2>
          <p className="text-xs text-slate-400">
            Monitor software purchases, automated license activations, and checkout transactions.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by order ID, customer name, email, product, or license key..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#246E7F]"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-[11px] uppercase font-bold text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Order ID</th>
                <th className="px-5 py-3.5">Customer</th>
                <th className="px-5 py-3.5">Software Product</th>
                <th className="px-5 py-3.5">License Key</th>
                <th className="px-5 py-3.5">Amount</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-4 font-mono font-bold text-teal-400">
                    {order.id}
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-bold text-white">{order.customerName}</div>
                    <div className="text-[11px] text-slate-400">{order.email}</div>
                  </td>
                  <td className="px-5 py-4 max-w-xs">
                    <div className="font-semibold text-white truncate">{order.productName}</div>
                    <div className="text-[10px] text-slate-400">{order.licenseType}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-mono text-[11px] px-2 py-1 rounded bg-slate-950 border border-slate-800 text-amber-300 select-all">
                      {order.licenseKey}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-bold text-emerald-400">
                    {formatPrice(order.amountINR, order.amountUSD)}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" />
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-400 text-[11px]">
                    {order.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
