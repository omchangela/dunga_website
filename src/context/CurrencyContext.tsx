'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Currency } from '@/types';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (inr?: number | null, usd?: number | null) => string;
  formatAmount: (amount?: number | null, overrideCurrency?: Currency) => string;
  getRawPrice: (inr?: number | null, usd?: number | null) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('INR');

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? (localStorage.getItem('dunga_currency') as Currency | null) : null;
    if (saved === 'INR' || saved === 'USD') {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    if (typeof window !== 'undefined') {
      localStorage.setItem('dunga_currency', c);
    }
  };

  const formatPrice = (inr?: number | null, usd?: number | null) => {
    const numInr = inr !== undefined && inr !== null && !isNaN(Number(inr)) ? Number(inr) : 0;
    const numUsd = usd !== undefined && usd !== null && !isNaN(Number(usd)) ? Number(usd) : Math.round(numInr / 83);

    if (currency === 'INR') {
      return `₹${Math.round(numInr).toLocaleString('en-IN')}`;
    }
    return `$${Math.round(numUsd).toLocaleString('en-US')}`;
  };

  const getRawPrice = (inr?: number | null, usd?: number | null) => {
    const numInr = inr !== undefined && inr !== null && !isNaN(Number(inr)) ? Number(inr) : 0;
    const numUsd = usd !== undefined && usd !== null && !isNaN(Number(usd)) ? Number(usd) : Math.round(numInr / 83);
    return currency === 'INR' ? numInr : numUsd;
  };

  const formatAmount = (amount?: number | null, overrideCurrency?: Currency) => {
    const numAmount = amount !== undefined && amount !== null && !isNaN(Number(amount)) ? Number(amount) : 0;
    const activeCurrency = overrideCurrency || currency;
    if (activeCurrency === 'INR') {
      return `₹${Math.round(numAmount).toLocaleString('en-IN')}`;
    }
    return `$${numAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, formatAmount, getRawPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
