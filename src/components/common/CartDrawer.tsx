'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  X,
  Trash2,
  Plus,
  Check,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Zap,
  Info,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { LicenseType } from '@/types';

export function CartDrawer() {
  const router = useRouter();
  const {
    items,
    removeItem,
    toggleAddon,
    updateLicenseType,
    clearCart,
    isCartOpen,
    setIsCartOpen,
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

  const { currency, formatPrice, formatAmount } = useCurrency();
  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput) {
      applyCoupon(promoInput);
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#246e7f]" />
              <h2 className="text-sm font-bold text-slate-900">Your Order Cart</h2>
              <span className="bg-[#e6f4f7] text-[#246e7f] text-xs font-bold px-2 py-0.5 rounded-full">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-bold text-slate-800">Your cart is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Explore our proprietary software catalog to acquire 100% full source code with lifetime updates.
                </p>
                <Link
                  href="/products"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center gap-1.5 bg-[#246e7f] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#1a515e] transition-colors mt-2"
                >
                  Explore Marketplace <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3 relative group"
                >
                  {/* Product Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3 min-w-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.product.thumbnailUrl}
                        alt={item.product.title}
                        className="w-12 h-12 rounded-lg object-cover border border-slate-200 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <Link
                          href={`/products/${item.product.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="text-xs font-bold text-slate-900 hover:text-[#246e7f] transition-colors line-clamp-1"
                        >
                          {item.product.title}
                        </Link>
                        <p className="text-[11px] text-slate-500">v{item.product.version}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* License Tier Selector */}
                  <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200/80 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">License Tier</span>
                      <select
                        value={item.licenseType}
                        onChange={(e) => updateLicenseType(item.id, e.target.value as LicenseType)}
                        className="bg-transparent text-xs font-bold text-[#246e7f] focus:outline-none cursor-pointer"
                      >
                        <option value="REGULAR">Regular Code License</option>
                        <option value="EXTENDED">Extended Commercial License</option>
                        {item.product.monthlySaasPriceINR && (
                          <option value="SAAS_MONTHLY">Cloud SaaS (Monthly)</option>
                        )}
                        {item.product.yearlySaasPriceINR && (
                          <option value="SAAS_YEARLY">Cloud SaaS (Yearly)</option>
                        )}
                      </select>
                    </div>
                    <span className="font-bold text-slate-900">
                      {formatPrice(item.licensePriceINR, item.licensePriceUSD)}
                    </span>
                  </div>

                  {/* Selected Add-ons Breakdown */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-700 block">
                      Installation & Setup Add-ons:
                    </span>
                    {item.product.availableAddons.map((addon) => {
                      const isSelected = item.selectedAddons.some((a) => a.id === addon.id);
                      return (
                        <label
                          key={addon.id}
                          className={`flex items-start justify-between gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-[#e6f4f7]/70 border-[#246e7f]/40 text-[#1a515e]'
                              : 'bg-white border-slate-200/80 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-start gap-2 min-w-0">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleAddon(item.id, addon)}
                              className="mt-0.5 rounded border-slate-300 text-[#246e7f] focus:ring-[#246e7f]"
                            />
                            <div>
                              <div className="font-semibold leading-tight line-clamp-1">{addon.name}</div>
                              <span className="text-[10px] text-slate-500">{addon.estimatedTurnaround}</span>
                            </div>
                          </div>
                          <span className="font-bold flex-shrink-0 text-slate-900">
                            +{formatPrice(addon.priceINR, addon.priceUSD)}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  {/* Item Subtotal */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>Item Total</span>
                    <span className="text-sm font-bold text-[#e06527]">
                      {formatPrice(item.subtotalINR, item.subtotalUSD)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer / Summary */}
          {items.length > 0 && (
            <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-3">
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. DUNGA10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 uppercase focus:outline-none focus:ring-1 focus:ring-[#246e7f]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                >
                  Apply
                </button>
              </form>

              {couponCode && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg">
                  <span className="font-medium">
                    Coupon <strong>{couponCode}</strong> applied ({couponDiscountPercent}% OFF)
                  </span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-rose-600 hover:underline text-[11px] font-bold"
                  >
                    Remove
                  </button>
                </div>
              )}

              {couponError && (
                <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <div className="flex justify-between">
                  <span>Source Licenses Subtotal</span>
                  <span>{formatPrice(subtotalINR, subtotalUSD)}</span>
                </div>
                {addonsTotalINR > 0 && (
                  <div className="flex justify-between text-[#246e7f] font-medium">
                    <span>Installation & Setup Add-ons</span>
                    <span>+{formatPrice(addonsTotalINR, addonsTotalUSD)}</span>
                  </div>
                )}
                {couponDiscountPercent > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({couponDiscountPercent}%)</span>
                    <span>-{formatPrice(discountINR, discountUSD)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-900 font-black text-base pt-2 border-t border-slate-200">
                  <span>Total Due</span>
                  <span className="text-[#246e7f]">
                    {formatPrice(totalINR, totalUSD)}
                  </span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full bg-[#246e7f] hover:bg-[#1a515e] text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Instant Digital Delivery • GST Tax Invoice Included</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
