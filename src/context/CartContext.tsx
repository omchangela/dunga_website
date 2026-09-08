'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, LicenseType, SetupAddon, CartItem } from '@/types';
import { useCurrency } from './CurrencyContext';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, licenseType?: LicenseType, addons?: SetupAddon[]) => void;
  removeItem: (itemId: string) => void;
  toggleAddon: (itemId: string, addon: SetupAddon) => void;
  updateLicenseType: (itemId: string, licenseType: LicenseType) => void;
  clearCart: () => void;
  itemCount: number;
  subtotalINR: number;
  subtotalUSD: number;
  addonsTotalINR: number;
  addonsTotalUSD: number;
  discountINR: number;
  discountUSD: number;
  taxINR: number;
  taxUSD: number;
  totalINR: number;
  totalUSD: number;
  couponCode: string;
  couponDiscountPercent: number;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  // Live Demo Modal
  liveDemoProduct: Product | null;
  openLiveDemo: (product: Product) => void;
  closeLiveDemo: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [liveDemoProduct, setLiveDemoProduct] = useState<Product | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscountPercent, setCouponDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('dunga_cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dunga_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const calculateItemPrices = (
    product: Product,
    licenseType: LicenseType,
    selectedAddons: SetupAddon[]
  ) => {
    let licensePriceINR = product.regularPriceINR;
    let licensePriceUSD = product.regularPriceUSD;

    if (licenseType === 'EXTENDED') {
      licensePriceINR = product.extendedPriceINR;
      licensePriceUSD = product.extendedPriceUSD;
    } else if (licenseType === 'SAAS_MONTHLY' && product.monthlySaasPriceINR) {
      licensePriceINR = product.monthlySaasPriceINR;
      licensePriceUSD = product.monthlySaasPriceUSD || 15;
    } else if (licenseType === 'SAAS_YEARLY' && product.yearlySaasPriceINR) {
      licensePriceINR = product.yearlySaasPriceINR;
      licensePriceUSD = product.yearlySaasPriceUSD || 149;
    }

    const addonsTotalINR = selectedAddons.reduce((sum, a) => sum + a.priceINR, 0);
    const addonsTotalUSD = selectedAddons.reduce((sum, a) => sum + a.priceUSD, 0);

    const subtotalINR = licensePriceINR + addonsTotalINR;
    const subtotalUSD = licensePriceUSD + addonsTotalUSD;

    return {
      licensePriceINR,
      licensePriceUSD,
      addonsTotalINR,
      addonsTotalUSD,
      subtotalINR,
      subtotalUSD,
    };
  };

  const addItem = (
    product: Product,
    licenseType: LicenseType = 'REGULAR',
    addons: SetupAddon[] = []
  ) => {
    const itemId = `${product.id}_${licenseType}`;
    const pricing = calculateItemPrices(product, licenseType, addons);

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === itemId);
      if (existingIndex > -1) {
        // Update existing item with new addons
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          selectedAddons: addons,
          ...pricing,
        };
        return updated;
      }

      return [
        ...prev,
        {
          id: itemId,
          product,
          licenseType,
          selectedAddons: addons,
          ...pricing,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const toggleAddon = (itemId: string, addon: SetupAddon) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        const exists = item.selectedAddons.some((a) => a.id === addon.id);
        const updatedAddons = exists
          ? item.selectedAddons.filter((a) => a.id !== addon.id)
          : [...item.selectedAddons, addon];

        const pricing = calculateItemPrices(item.product, item.licenseType, updatedAddons);
        return {
          ...item,
          selectedAddons: updatedAddons,
          ...pricing,
        };
      })
    );
  };

  const updateLicenseType = (itemId: string, newLicenseType: LicenseType) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        const newId = `${item.product.id}_${newLicenseType}`;
        const pricing = calculateItemPrices(item.product, newLicenseType, item.selectedAddons);
        return {
          ...item,
          id: newId,
          licenseType: newLicenseType,
          ...pricing,
        };
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode('');
    setCouponDiscountPercent(0);
    setCouponError(null);
  };

  const applyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'DUNGA10' || normalized === 'LAUNCH10') {
      setCouponCode(normalized);
      setCouponDiscountPercent(10);
      setCouponError(null);
      return true;
    } else if (normalized === 'ENTERPRISE20') {
      setCouponCode(normalized);
      setCouponDiscountPercent(20);
      setCouponError(null);
      return true;
    } else {
      setCouponError('Invalid coupon code. Try DUNGA10');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponDiscountPercent(0);
    setCouponError(null);
  };

  const openLiveDemo = (product: Product) => setLiveDemoProduct(product);
  const closeLiveDemo = () => setLiveDemoProduct(null);

  // Totals calculations
  const subtotalINR = items.reduce((sum, i) => sum + i.licensePriceINR, 0);
  const subtotalUSD = items.reduce((sum, i) => sum + i.licensePriceUSD, 0);
  const addonsTotalINR = items.reduce((sum, i) => sum + i.addonsTotalINR, 0);
  const addonsTotalUSD = items.reduce((sum, i) => sum + i.addonsTotalUSD, 0);

  const baseTotalINR = subtotalINR + addonsTotalINR;
  const baseTotalUSD = subtotalUSD + addonsTotalUSD;

  const discountINR = (baseTotalINR * couponDiscountPercent) / 100;
  const discountUSD = (baseTotalUSD * couponDiscountPercent) / 100;

  // 18% GST for India (or 0% tax for display)
  const taxableAmountINR = baseTotalINR - discountINR;
  const taxableAmountUSD = baseTotalUSD - discountUSD;

  // For clear enterprise pricing, we can include tax or show 0 additional fee
  const taxINR = 0; // Included in clean pricing or shown separately
  const taxUSD = 0;

  const totalINR = Math.max(0, taxableAmountINR + taxINR);
  const totalUSD = Math.max(0, taxableAmountUSD + taxUSD);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        toggleAddon,
        updateLicenseType,
        clearCart,
        itemCount: items.length,
        subtotalINR,
        subtotalUSD,
        addonsTotalINR,
        addonsTotalUSD,
        discountINR,
        discountUSD,
        taxINR,
        taxUSD,
        totalINR,
        totalUSD,
        couponCode,
        couponDiscountPercent,
        couponError,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
        liveDemoProduct,
        openLiveDemo,
        closeLiveDemo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
