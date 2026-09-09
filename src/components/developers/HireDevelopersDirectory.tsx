'use client';

import React, { useState, useMemo } from 'react';
import { DEVELOPERS_DATA, DeveloperProfile } from '@/data/developers';
import { HireReadyDeveloperCard } from './HireReadyDeveloperCard';
import { DeveloperFiltersBar, DeveloperFilterState } from './DeveloperFiltersBar';
import { LiveDeveloperCapacityDashboard } from './LiveDeveloperCapacityDashboard';
import { HireDeveloperModal } from './HireDeveloperModal';
import { RequestSimilarDeveloperModal } from './RequestSimilarDeveloperModal';
import { Users, Sparkles, ShieldCheck, CheckCircle2, SearchX } from 'lucide-react';

const INITIAL_FILTERS: DeveloperFilterState = {
  searchQuery: '',
  role: 'All Roles',
  technology: 'All Technologies',
  experienceBracket: 'all',
  engagement: 'All Engagement',
  availability: 'all',
};

export const HireDevelopersDirectory: React.FC = () => {
  const [filters, setFilters] = useState<DeveloperFilterState>(INITIAL_FILTERS);
  const [selectedDevForHire, setSelectedDevForHire] = useState<DeveloperProfile | null>(null);
  const [selectedDevForSimilar, setSelectedDevForSimilar] = useState<DeveloperProfile | null>(null);

  // Filter developers logic
  const filteredDevelopers = useMemo(() => {
    return DEVELOPERS_DATA.filter((dev) => {
      // Search query matches name, role, tech stack, or specializations
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = dev.name.toLowerCase().includes(query);
        const matchesRole = dev.role.toLowerCase().includes(query);
        const matchesTech = dev.keyTechnologies.some((t) => t.toLowerCase().includes(query));
        const matchesSpec = dev.specializations.some((s) => s.toLowerCase().includes(query));
        if (!matchesName && !matchesRole && !matchesTech && !matchesSpec) {
          return false;
        }
      }

      // Role filter
      if (filters.role !== 'All Roles') {
        if (dev.primaryCategory !== filters.role && !dev.role.toLowerCase().includes(filters.role.toLowerCase())) {
          return false;
        }
      }

      // Technology filter
      if (filters.technology !== 'All Technologies') {
        const hasTech = dev.keyTechnologies.some(
          (t) => t.toLowerCase() === filters.technology.toLowerCase()
        );
        if (!hasTech) return false;
      }

      // Experience bracket
      if (filters.experienceBracket !== 'all') {
        const exp = dev.experienceYears;
        if (filters.experienceBracket === '1-2' && (exp < 1 || exp > 2)) return false;
        if (filters.experienceBracket === '3-5' && (exp < 3 || exp > 5)) return false;
        if (filters.experienceBracket === '5-8' && (exp < 5 || exp > 8)) return false;
        if (filters.experienceBracket === '8+' && exp < 8) return false;
      }

      // Engagement model
      if (filters.engagement !== 'All Engagement') {
        const hasEngagement = dev.engagementModels.some(
          (m) => m.toLowerCase().includes(filters.engagement.toLowerCase())
        );
        if (!hasEngagement) return false;
      }

      // Availability
      if (filters.availability !== 'all') {
        if (dev.availability !== filters.availability) return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <section className="py-12 bg-white" id="developer-directory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#246E7F]/10 text-[#246E7F]">
            <Sparkles className="w-3.5 h-3.5 text-[#E06527]" />
            <span>Pre-Assessed & Hire-Ready Engineering Roster</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Browse Verified Developer Roster
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Check real-time developer availability, transparent rates, verified GitHub histories, and start immediately with a 1-week risk-free trial.
          </p>
        </div>

        {/* Live Talent Capacity & Deployment Metrics Dashboard */}
        <LiveDeveloperCapacityDashboard
          currentFilter={filters.availability}
          onSelectAvailabilityFilter={(status) =>
            setFilters((prev) => ({ ...prev, availability: status }))
          }
          availableCount={14}
          workingCount={38}
          upcomingCount={6}
          totalCount={58}
        />

        {/* Filter and Search Bar */}
        <DeveloperFiltersBar
          filters={filters}
          onFilterChange={setFilters}
          onReset={() => setFilters(INITIAL_FILTERS)}
          totalResults={filteredDevelopers.length}
        />

        {/* Developer Cards Grid */}
        {filteredDevelopers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevelopers.map((developer) => (
              <HireReadyDeveloperCard
                key={developer.id}
                developer={developer}
                onHireClick={(dev) => setSelectedDevForHire(dev)}
                onRequestSimilarClick={(dev) => setSelectedDevForSimilar(dev)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-slate-50 rounded-2xl border border-slate-200">
            <SearchX className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">No developers match your current filters</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto mb-5">
              Try broadening your search or resetting filters to see our full talent roster.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setFilters(INITIAL_FILTERS)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#246E7F] hover:bg-[#1b5563] rounded-lg transition-colors"
              >
                Reset All Filters
              </button>
              <button
                onClick={() => setSelectedDevForSimilar(DEVELOPERS_DATA[0])}
                className="px-4 py-2 text-xs font-bold text-[#E06527] bg-[#E06527]/10 hover:bg-[#E06527]/20 rounded-lg transition-colors"
              >
                Request Custom Developer Match
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Modals */}
      <HireDeveloperModal
        developer={selectedDevForHire}
        isOpen={!!selectedDevForHire}
        onClose={() => setSelectedDevForHire(null)}
      />

      <RequestSimilarDeveloperModal
        baseDeveloper={selectedDevForSimilar}
        isOpen={!!selectedDevForSimilar}
        onClose={() => setSelectedDevForSimilar(null)}
      />
    </section>
  );
};
