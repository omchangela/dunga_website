'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Currency } from '@/types';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (inr: number, usd: number) => string;
  formatAmount: (amount: number, overrideCurrency?: Currency) => string;
  getRawPrice: (inr: number, usd: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('INR');

  useEffect(() => {
    const saved = localStorage.getItem('dunga_currency') as Currency | null;
    if (saved === 'INR' || saved === 'USD') {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('dunga_currency', c);
  };

  const formatPrice = (inr: number, usd: number) => {
    if (currency === 'INR') {
      return `₹${inr.toLocaleString('en-IN')}`;
    }
    return `$${usd.toLocaleString('en-US')}`;
  };

  const getRawPrice = (inr: number, usd: number) => {
    return currency === 'INR' ? inr : usd;
  };

  const formatAmount = (amount: number, overrideCurrency?: Currency) => {
    const activeCurrency = overrideCurrency || currency;
    if (activeCurrency === 'INR') {
      return `₹${Math.round(amount).toLocaleString('en-IN')}`;
    }
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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
