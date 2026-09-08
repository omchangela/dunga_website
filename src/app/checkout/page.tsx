'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  CreditCard,
  Lock,
  ArrowRight,
  ShoppingBag,
  Trash2,
  Tag,
  CheckCircle2,
  Building,
  Mail,
  User,
  Phone,
  Server,
  Zap,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    removeItem,
    clearCart,
    couponCode,
    couponDiscountPercent,
    couponError,
    applyCoupon,
    removeCoupon,
    subtotalINR,
    subtotalUSD,
    addonsTotalINR,
    addonsTotalUSD,
    discountINR,
    discountUSD,
    totalINR,
    totalUSD,
  } = useCart();

  const { currency, setCurrency, formatPrice, formatAmount } = useCurrency();

  // Form states
  const [name, setName] = useState('Rahul Sharma');
  const [email, setEmail] = useState('rahul.sharma@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [company, setCompany] = useState('Sharma Tech Solutions Pvt Ltd');
  const [gstin, setGstin] = useState('29AABCU9603R1Z2');
  const [paymentMethod, setPaymentMethod] = useState<'RAZORPAY' | 'STRIPE' | 'PAYPAL' | 'UPI'>('RAZORPAY');
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoInput, setPromoInput] = useState('');

  if (items.length === 0) {
    return (
      <div className="bg-slate-50 min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center max-w-md shadow-xs space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Your Cart is Empty</h2>
          <p className="text-xs text-slate-500">
            Browse our catalog of in-house software products to proceed with your order.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 bg-[#246e7f] hover:bg-[#1a515e] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors"
          >
            <span>Browse Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput) {
      applyCoupon(promoInput);
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Generate Mock Receipt & persist to localStorage
    const orderNumber = `DNG-${Date.now().toString().slice(-6)}`;
    const mockLicenses = items.map((item) => ({
      productId: item.product.id,
      productTitle: item.product.title,
      productSlug: item.product.slug,
      thumbnailUrl: item.product.thumbnailUrl,
      version: item.product.version,
      licenseKey: `DUNGA-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      licenseType: item.licenseType,
      downloadUrl: `https://downloads.dungatechnologies.com/packages/${item.product.slug}-v${item.product.version}.zip`,
      setupStatus: item.selectedAddons.some((a) => a.id.includes('setup')) ? 'PENDING' : 'NOT_REQUESTED',
    }));

    const orderReceipt = {
      orderNumber,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      customerCompany: company,
      customerGstin: gstin,
      currency,
      items,
      subtotal: currency === 'INR' ? subtotalINR : subtotalUSD,
      addonsTotal: currency === 'INR' ? addonsTotalINR : addonsTotalUSD,
      discount: currency === 'INR' ? discountINR : discountUSD,
      totalAmount: currency === 'INR' ? totalINR : totalUSD,
      paymentMethod,
      paymentStatus: 'PAID',
      transactionId: `tx_${Math.random().toString(36).substring(2, 10)}`,
      paidAt: new Date().toISOString(),
      generatedLicenses: mockLicenses,
    };

    localStorage.setItem('dunga_latest_order', JSON.stringify(orderReceipt));

    // Also store user licenses for customer portal
    const existingLicenses = JSON.parse(localStorage.getItem('dunga_user_licenses') || '[]');
    const newLicenses = mockLicenses.map((l) => ({
      id: `lic_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
      licenseKey: l.licenseKey,
      productId: l.productId,
      productTitle: l.productTitle,
      productSlug: l.productSlug,
      thumbnailUrl: l.thumbnailUrl,
      version: l.version,
      licenseType: l.licenseType,
      isActive: true,
      purchasedAt: new Date().toISOString(),
      downloadPackageUrl: l.downloadUrl,
      setupStatus: l.setupStatus,
    }));

    localStorage.setItem('dunga_user_licenses', JSON.stringify([...newLicenses, ...existingLicenses]));

    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      router.push('/checkout/success');
    }, 1200);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Secure Digital Order Checkout
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Instant source code download link & license keys are generated immediately after payment.
          </p>
        </div>

        <form onSubmit={handleCompleteOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (7 cols): Customer Info, Tax Info & Payment Methods */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Customer Details */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <User className="w-4 h-4 text-[#246e7f]" />
                <h2 className="text-sm font-bold text-slate-900">1. Customer Information & Licensee</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name / Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address (For License & Download Link) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp (For Setup Updates)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Company / Organization Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f] focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    GSTIN / Tax ID Number (For B2B Tax Invoice)
                  </label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    placeholder="e.g. 29AABCU9603R1Z2"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#246e7f] focus:bg-white uppercase font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Gateway Selection */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#246e7f]" />
                  <h2 className="text-sm font-bold text-slate-900">2. Select Payment Method</h2>
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <Lock className="w-3 h-3" /> 256-Bit SSL Encrypted
                </span>
              </div>

              <div className="space-y-3">
                {/* Razorpay / UPI (INR Preferred) */}
                <label
                  className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'RAZORPAY'
                      ? 'border-[#246e7f] bg-[#e6f4f7]/40 ring-1 ring-[#246e7f]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="RAZORPAY"
                      checked={paymentMethod === 'RAZORPAY'}
                      onChange={() => setPaymentMethod('RAZORPAY')}
                      className="text-[#246e7f] focus:ring-[#246e7f]"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        Razorpay (UPI, Google Pay, NetBanking, Debit/Credit Cards)
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Instant zero-fee payment for Indian bank accounts & UPI
                      </span>
                    </div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    Recommended
                  </span>
                </label>

                {/* Stripe International */}
                <label
                  className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'STRIPE'
                      ? 'border-[#246e7f] bg-[#e6f4f7]/40 ring-1 ring-[#246e7f]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="STRIPE"
                      checked={paymentMethod === 'STRIPE'}
                      onChange={() => setPaymentMethod('STRIPE')}
                      className="text-[#246e7f] focus:ring-[#246e7f]"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        Stripe (International Visa, MasterCard, Amex)
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Supports global USD / EUR card checkouts
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Stripe</span>
                </label>

                {/* PayPal */}
                <label
                  className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'PAYPAL'
                      ? 'border-[#246e7f] bg-[#e6f4f7]/40 ring-1 ring-[#246e7f]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="PAYPAL"
                      checked={paymentMethod === 'PAYPAL'}
                      onChange={() => setPaymentMethod('PAYPAL')}
                      className="text-[#246e7f] focus:ring-[#246e7f]"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        PayPal Express Checkout
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Pay with your PayPal balance or linked bank
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">PayPal</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Order Items Summary & Payment CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Order Summary ({items.length})</h3>
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[11px]">
                  <button
                    type="button"
                    onClick={() => setCurrency('INR')}
                    className={`px-2 py-0.5 rounded ${currency === 'INR' ? 'bg-white font-bold text-[#246e7f] shadow-xs' : 'text-slate-500'}`}
                  >
                    INR
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency('USD')}
                    className={`px-2 py-0.5 rounded ${currency === 'USD' ? 'bg-white font-bold text-[#246e7f] shadow-xs' : 'text-slate-500'}`}
                  >
                    USD
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 text-xs">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="font-bold text-slate-900 block">{item.product.title}</span>
                        <span className="text-[10px] text-[#246e7f] font-semibold">
                          {item.licenseType === 'REGULAR' ? 'Regular Code License' : item.licenseType === 'EXTENDED' ? 'Extended Commercial License' : 'Cloud SaaS Plan'}
                        </span>
                      </div>
                      <span className="font-bold text-slate-900">
                        {formatPrice(item.licensePriceINR, item.licensePriceUSD)}
                      </span>
                    </div>

                    {item.selectedAddons.length > 0 && (
                      <div className="pt-1.5 border-t border-slate-200/60 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Included Add-ons:
                        </span>
                        {item.selectedAddons.map((addon) => (
                          <div key={addon.id} className="flex justify-between text-[11px] text-emerald-800 font-medium">
                            <span>• {addon.name}</span>
                            <span>+{formatPrice(addon.priceINR, addon.priceUSD)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Coupon Engine */}
              <div className="pt-2 border-t border-slate-100">
                {couponCode ? (
                  <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 p-2.5 rounded-xl">
                    <span className="font-semibold">
                      Coupon <strong>{couponCode}</strong> applied ({couponDiscountPercent}% OFF)
                    </span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-rose-600 font-bold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. DUNGA10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs uppercase focus:outline-none focus:ring-1 focus:ring-[#246e7f]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {couponError && <p className="text-[11px] text-rose-600 font-medium mt-1">{couponError}</p>}
              </div>

              {/* Price Calculation Lines */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex justify-between">
                  <span>Source Licenses Subtotal</span>
                  <span>{formatPrice(subtotalINR, subtotalUSD)}</span>
                </div>
                {addonsTotalINR > 0 && (
                  <div className="flex justify-between text-[#246e7f] font-semibold">
                    <span>Server Setup & Deployment Add-ons</span>
                    <span>+{formatPrice(addonsTotalINR, addonsTotalUSD)}</span>
                  </div>
                )}
                {couponDiscountPercent > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Coupon Discount ({couponDiscountPercent}%)</span>
                    <span>-{formatPrice(discountINR, discountUSD)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-900 font-black text-lg pt-2 border-t border-slate-200">
                  <span>Grand Total</span>
                  <span className="text-[#246e7f]">
                    {formatPrice(totalINR, totalUSD)}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#246e7f] hover:bg-[#1a515e] disabled:opacity-75 text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Payment...
                  </span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Authorize & Complete Payment ({formatPrice(totalINR, totalUSD)})</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-slate-400 text-center">
                By completing this order you agree to Dunga Technologies Commercial License Terms & Refund Policy.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
