import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { DEVELOPERS_DATA } from '@/data/developers';
import { DeveloperDetailClient } from './DeveloperDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return DEVELOPERS_DATA.map((dev) => ({
    slug: dev.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const developer = DEVELOPERS_DATA.find((d) => d.slug === slug);

  if (!developer) {
    return {
      title: 'Developer Not Found | Dunga Technologies',
    };
  }

  return {
    title: `Hire ${developer.name} — ${developer.role} (${developer.experienceLabel}) | Dunga Technologies`,
    description: `Hire ${developer.name}, a verified ${developer.role} with ${developer.experienceYears}+ years experience in ${developer.keyTechnologies.join(', ')}. Transparent rates, 1-week risk-free trial.`,
  };
}

export default async function DeveloperProfilePage({ params }: Props) {
  const { slug } = await params;
  const developer = DEVELOPERS_DATA.find((d) => d.slug === slug);

  if (!developer) {
    notFound();
  }

  return <DeveloperDetailClient developer={developer} />;
}
