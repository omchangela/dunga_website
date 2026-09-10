'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { LiveDemoModal } from '@/components/common/LiveDemoModal';
import { CartDrawer } from '@/components/common/CartDrawer';
import { SearchModal } from '@/components/common/SearchModal';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  // If in admin portal or admin login, provide contexts without consumer Navbar/Footer/CartDrawer
  if (isAdmin) {
    return (
      <CurrencyProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </CurrencyProvider>
    );
  }

  // Public consumer website layout
  return (
    <CurrencyProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-[#e6f4f7] selection:text-[#246e7f]">
          <Navbar onOpenSearch={() => setSearchOpen(true)} />
          <main className="flex-1">{children}</main>
          <Footer />
          <LiveDemoModal />
          <CartDrawer />
          <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </div>
      </CartProvider>
    </CurrencyProvider>
  );
}

