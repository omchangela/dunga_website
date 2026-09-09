'use client';

import React from 'react';
import { Search, Filter, RotateCcw, Check } from 'lucide-react';

export interface DeveloperFilterState {
  searchQuery: string;
  role: string;
  technology: string;
  experienceBracket: string;
  engagement: string;
  availability: string;
}

interface DeveloperFiltersBarProps {
  filters: DeveloperFilterState;
  onFilterChange: (filters: DeveloperFilterState) => void;
  onReset: () => void;
  totalResults: number;
}

const ROLES = [
  'All Roles',
  'Full-Stack',
  'Frontend',
  'Backend',
  'Mobile',
  'DevOps',
  'AI & ML',
  'CMS & PHP',
  'QA & Testing',
];

const POPULAR_TECHS = [
  'All Technologies',
  'React.js',
  'Next.js',
  'Node.js',
  'Python',
  'Django',
  'PHP',
  'Laravel',
  'Flutter',
  'React Native',
  'AWS',
  'Docker',
  'PostgreSQL',
  'MongoDB',
  'WordPress',
  'Java',
];

const EXPERIENCE_BRACKETS = [
  { label: 'All Experience', value: 'all' },
  { label: '1–2 Years', value: '1-2' },
  { label: '3–5 Years', value: '3-5' },
  { label: '5–8 Years', value: '5-8' },
  { label: '8+ Years', value: '8+' },
];

const ENGAGEMENTS = [
  'All Engagement',
  'Hourly',
  'Dedicated',
  'Project-Based',
  'Part-Time',
  'Full-Time',
];

const AVAILABILITY_OPTIONS = [
  { label: 'All Status', value: 'all' },
  { label: 'Available Now', value: 'Available Now' },
  { label: 'Available Soon', value: 'Available Soon' },
];

export const DeveloperFiltersBar: React.FC<DeveloperFiltersBarProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalResults,
}) => {
  const handleInputChange = (field: keyof DeveloperFilterState, value: string) => {
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  const isFiltered =
    filters.searchQuery !== '' ||
    filters.role !== 'All Roles' ||
    filters.technology !== 'All Technologies' ||
    filters.experienceBracket !== 'all' ||
    filters.engagement !== 'All Engagement' ||
    filters.availability !== 'all';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-4 mb-8">
      
      {/* Search Bar */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
        <input
          type="text"
          placeholder="Search by developer name, role, technology (e.g. React, Node.js, Python, AWS)..."
          value={filters.searchQuery}
          onChange={(e) => handleInputChange('searchQuery', e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#246E7F] focus:border-transparent transition-all shadow-inner"
        />
        {filters.searchQuery && (
          <button
            onClick={() => handleInputChange('searchQuery', '')}
            className="absolute right-3.5 top-3.5 text-xs text-slate-400 hover:text-slate-600 bg-slate-200 px-2 py-0.5 rounded-full"
          >
            Clear
          </button>
        )}
      </div>

      {/* Select Dropdown Filters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        
        {/* Role Filter */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Role
          </label>
          <select
            value={filters.role}
            onChange={(e) => handleInputChange('role', e.target.value)}
            className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#246E7F]"
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Technology Filter */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Technology
          </label>
          <select
            value={filters.technology}
            onChange={(e) => handleInputChange('technology', e.target.value)}
            className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#246E7F]"
          >
            {POPULAR_TECHS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Experience Bracket */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Experience
          </label>
          <select
            value={filters.experienceBracket}
            onChange={(e) => handleInputChange('experienceBracket', e.target.value)}
            className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#246E7F]"
          >
            {EXPERIENCE_BRACKETS.map((exp) => (
              <option key={exp.value} value={exp.value}>
                {exp.label}
              </option>
            ))}
          </select>
        </div>

        {/* Engagement Model */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Engagement
          </label>
          <select
            value={filters.engagement}
            onChange={(e) => handleInputChange('engagement', e.target.value)}
            className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#246E7F]"
          >
            {ENGAGEMENTS.map((eng) => (
              <option key={eng} value={eng}>
                {eng}
              </option>
            ))}
          </select>
        </div>

        {/* Availability */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Availability
          </label>
          <select
            value={filters.availability}
            onChange={(e) => handleInputChange('availability', e.target.value)}
            className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#246E7F]"
          >
            {AVAILABILITY_OPTIONS.map((avail) => (
              <option key={avail.value} value={avail.value}>
                {avail.label}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Filter Stats & Reset */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
        <div className="text-slate-600">
          Showing <span className="font-bold text-slate-900">{totalResults}</span> verified hire-ready developers
        </div>

        {isFiltered && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#E06527] hover:text-[#c4531c] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All Filters
          </button>
        )}
      </div>

    </div>
  );
};
