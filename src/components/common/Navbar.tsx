'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Code2,
  Layers,
  ShieldCheck,
  ArrowRight,
  Headphones,
  FileCode2,
} from 'lucide-react';
import { Logo } from './Logo';
import { useCurrency } from '@/context/CurrencyContext';
import { useCart } from '@/context/CartContext';
import { SERVICES } from '@/data/services';
import { PRODUCTS } from '@/data/products';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export function Navbar({ onOpenSearch }: NavbarProps) {
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrency();
  const { itemCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-[#1e5b6a] via-[#246e7f] to-[#e06527] text-white text-xs font-medium py-2 px-4 text-center relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 bg-white/20 px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase backdrop-blur-xs">
            <Sparkles className="w-3 h-3 text-amber-300" /> New Release
          </span>
          <span>OmniFlow CRM v2.4 with WhatsApp Automation is now live!</span>
          <span className="hidden sm:inline opacity-80">|</span>
          <span className="hidden sm:inline">
            Use coupon code <strong className="bg-white/20 px-1.5 py-0.5 rounded text-white font-mono font-bold tracking-wider">DUNGA10</strong> for 10% off
          </span>
          <Link
            href="/products/omniflow-ai-crm-telecaller-suite"
            className="underline hover:text-amber-200 transition-colors font-semibold inline-flex items-center gap-0.5 ml-1"
          >
            Explore <ArrowRight className="w-3 h-3 inline" />
          </Link>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 bg-white/95 backdrop-blur-md ${
          isScrolled ? 'border-b border-slate-200 shadow-sm py-2' : 'border-b border-slate-100 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 lg:gap-6">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Logo size="md" href="/" />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {/* Products Marketplace Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setProductsDropdownOpen(true)}
                onMouseLeave={() => setProductsDropdownOpen(false)}
              >
                <Link
                  href="/products"
                  className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    isActive('/products')
                      ? 'text-[#246e7f] bg-[#e6f4f7]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <FileCode2 className="w-4 h-4 text-[#246e7f]" />
                  <span>Marketplace</span>
                  <span className="bg-[#fff3eb] text-[#e06527] border border-[#fbd8c4] text-[10px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">
                    6 In-House
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                {productsDropdownOpen && (
                  <div className="absolute left-0 top-full pt-2 w-[520px] animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4 grid grid-cols-2 gap-2">
                      <div className="col-span-2 px-2 py-1 flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Proprietary Source Code & SaaS
                        </span>
                        <Link
                          href="/products"
                          className="text-xs text-[#246e7f] font-semibold hover:underline flex items-center gap-1"
                        >
                          View All Products <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                      {PRODUCTS.map((prod) => (
                        <Link
                          key={prod.id}
                          href={`/products/${prod.slug}`}
                          className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors group flex items-start gap-3"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#e6f4f7] text-[#246e7f] flex items-center justify-center font-bold text-xs flex-shrink-0 group-hover:bg-[#246e7f] group-hover:text-white transition-colors">
                            <Code2 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-slate-900 group-hover:text-[#246e7f] flex items-center gap-1">
                              {prod.title.split(' ')[0]} {prod.title.split(' ')[1]}
                              {prod.isFeatured && (
                                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1 rounded">
                                  Top
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{prod.tagline}</p>
                          </div>
                        </Link>
                      ))}
                      <div className="col-span-2 mt-1 pt-2 border-t border-slate-100 bg-slate-50 rounded-xl p-2.5 flex items-center justify-between text-xs text-slate-600">
                        <span className="flex items-center gap-1.5 font-medium">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          100% Full Source Code & Instant Download
                        </span>
                        <span className="text-[#e06527] font-semibold">24-48h Server Setup</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <Link
                  href="/services"
                  className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    isActive('/services')
                      ? 'text-[#246e7f] bg-[#e6f4f7]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                {servicesDropdownOpen && (
                  <div className="absolute left-0 top-full pt-2 w-72 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-2 space-y-1">
                      {SERVICES.map((srv) => (
                        <Link
                          key={srv.id}
                          href={`/services/${srv.slug}`}
                          className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-[#fff3eb] text-[#e06527] flex items-center justify-center flex-shrink-0 group-hover:bg-[#e06527] group-hover:text-white transition-colors">
                            <Layers className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-slate-900 group-hover:text-[#246e7f]">
                              {srv.title}
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-1">{srv.timeline}</p>
                          </div>
                        </Link>
                      ))}
                      <div className="p-2 border-t border-slate-100">
                        <Link
                          href="/services"
                          className="text-xs text-center block text-[#246e7f] font-semibold hover:underline"
                        >
                          View All Custom Services →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/projects"
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  isActive('/projects')
                    ? 'text-[#246e7f] bg-[#e6f4f7]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Case Studies
              </Link>

              <Link
                href="/about"
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  isActive('/about')
                    ? 'text-[#246e7f] bg-[#e6f4f7]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                About
              </Link>

              <Link
                href="/account"
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  isActive('/account')
                    ? 'text-[#246e7f] bg-[#e6f4f7]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Client Portal
              </Link>
            </nav>

            {/* Right Action Icons & Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Currency Toggle Switcher */}
              <div className="flex items-center bg-slate-100 border border-slate-200/80 rounded-lg p-0.5 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setCurrency('INR')}
                  className={`px-2 py-1 rounded-md transition-all ${
                    currency === 'INR'
                      ? 'bg-white text-[#246e7f] shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Indian Rupee"
                >
                  ₹ INR
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-2 py-1 rounded-md transition-all ${
                    currency === 'USD'
                      ? 'bg-white text-[#246e7f] shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="US Dollar"
                >
                  $ USD
                </button>
              </div>

              {/* Global Search Button */}
              {onOpenSearch && (
                <button
                  type="button"
                  onClick={onOpenSearch}
                  className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors hidden sm:flex items-center gap-1.5 text-xs border border-slate-200/70"
                  aria-label="Search site"
                >
                  <Search className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-400">Search</span>
                  <kbd className="bg-slate-100 text-slate-400 text-[10px] px-1.5 py-0.5 rounded border border-slate-300">
                    ⌘K
                  </kbd>
                </button>
              )}

              {/* Shopping Cart Drawer Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-slate-700 hover:text-[#246e7f] hover:bg-slate-100 rounded-lg transition-colors border border-slate-200/80"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#e06527] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Primary Consultation / Contact Button */}
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center gap-1.5 bg-[#246e7f] hover:bg-[#1a515e] text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow-xs transition-all hover:shadow-md active:scale-95 whitespace-nowrap"
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>Contact Us</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-1">
              <Link
                href="/products"
                className="px-3 py-2 text-sm font-semibold text-[#246e7f] bg-[#e6f4f7] rounded-lg flex items-center justify-between"
              >
                <span>Proprietary Code Marketplace</span>
                <span className="bg-[#e06527] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">6 Scripts</span>
              </Link>
              <Link
                href="/services"
                className="px-3 py-2 text-sm font-medium text-slate-800 rounded-lg hover:bg-slate-50"
              >
                Enterprise Custom Services
              </Link>
              <Link
                href="/projects"
                className="px-3 py-2 text-sm font-medium text-slate-800 rounded-lg hover:bg-slate-50"
              >
                Case Studies & Portfolio
              </Link>
              <Link
                href="/about"
                className="px-3 py-2 text-sm font-medium text-slate-800 rounded-lg hover:bg-slate-50"
              >
                About Dunga Technologies
              </Link>
              <Link
                href="/account"
                className="px-3 py-2 text-sm font-medium text-slate-800 rounded-lg hover:bg-slate-50"
              >
                Client Portal (Licenses & Downloads)
              </Link>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/contact"
                className="w-full text-center bg-[#246e7f] text-white font-semibold text-xs py-2.5 rounded-lg"
              >
                Book a Free Architecture Consultation
              </Link>
              <a
                href="https://wa.me/919999999999?text=Hello%20Dunga%20Technologies,%20I%20am%20interested%20in%20your%20software%20solutions."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2.5 rounded-lg flex items-center justify-center gap-1.5"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
