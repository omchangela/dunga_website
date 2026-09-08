'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, Code2, Layers, Briefcase, ArrowRight, Star } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { SERVICES } from '@/data/services';
import { CASE_STUDIES } from '@/data/case-studies';
import { useCurrency } from '@/context/CurrencyContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle search
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = PRODUCTS.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredServices = SERVICES.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProjects = CASE_STUDIES.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.clientName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            placeholder="Search software products, services, tech stacks, or case studies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full py-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {/* Products Results */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 block mb-2">
              Proprietary In-House Scripts ({filteredProducts.length})
            </span>
            <div className="space-y-1">
              {filteredProducts.map((prod) => (
                <Link
                  key={prod.id}
                  href={`/products/${prod.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#e6f4f7] text-[#246e7f] flex items-center justify-center font-bold text-xs flex-shrink-0">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 group-hover:text-[#246e7f] flex items-center gap-1.5">
                        <span className="truncate">{prod.title}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-mono">
                          v{prod.version}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{prod.tagline}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-3">
                    <span className="text-xs font-bold text-[#e06527] block">
                      {formatPrice(prod.regularPriceINR, prod.regularPriceUSD)}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-0.5 justify-end">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {prod.rating}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Services Results */}
          {filteredServices.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 block mb-2">
                Enterprise Services ({filteredServices.length})
              </span>
              <div className="space-y-1">
                {filteredServices.map((srv) => (
                  <Link
                    key={srv.id}
                    href={`/services/${srv.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#fff3eb] text-[#e06527] flex items-center justify-center font-bold text-xs flex-shrink-0">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-[#246e7f]">
                          {srv.title}
                        </div>
                        <p className="text-[11px] text-slate-500">{srv.timeline}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#246e7f] group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Case Studies */}
          {filteredProjects.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 block mb-2">
                Client Case Studies ({filteredProjects.length})
              </span>
              <div className="space-y-1">
                {filteredProjects.map((proj) => (
                  <Link
                    key={proj.id}
                    href={`/projects/${proj.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-[#246e7f]">
                          {proj.title}
                        </div>
                        <p className="text-[11px] text-slate-500">{proj.clientName} • {proj.clientIndustry}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#246e7f] group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>Use <strong>↑</strong> <strong>↓</strong> to navigate</span>
          <span>Press <strong>ESC</strong> to close</span>
        </div>
      </div>
    </div>
  );
}
