import type { Metadata } from 'next';
import React from 'react';
import { ProjectEstimator } from '@/components/estimation/ProjectEstimator';

export const metadata: Metadata = {
  title: 'Instant Project Cost & Timeline Estimator — Dunga Technologies',
  description:
    'Calculate transparent cost, milestone timeline, and tech stack estimates for your custom web application, mobile app, CRM, or CodeCanyon setup.',
};

export default function ProjectEstimationPage() {
  return (
    <div className="bg-white min-h-screen">
      <ProjectEstimator />
    </div>
  );
}
