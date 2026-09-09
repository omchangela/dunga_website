import React from 'react';
import { GsapHero } from '@/components/home/GsapHero';
import { GsapMarquee } from '@/components/home/GsapMarquee';
import { GsapStats } from '@/components/home/GsapStats';
import { GsapFeaturedProducts } from '@/components/home/GsapFeaturedProducts';
import { BookDevelopersWidget } from '@/components/developers/BookDevelopersWidget';
import { GsapInteractivePlayground } from '@/components/home/GsapInteractivePlayground';
import { TechnologySolutionsSection } from '@/components/home/TechnologySolutionsSection';
import { GsapServicesBento } from '@/components/home/GsapServicesBento';
import { ProjectEstimator } from '@/components/estimation/ProjectEstimator';
import { TechStackShowcase } from '@/components/home/TechStackShowcase';
import { CaseStudiesSection } from '@/components/home/CaseStudiesSection';
import { GsapTestimonials } from '@/components/home/GsapTestimonials';
import { CtaBanner } from '@/components/home/CtaBanner';

export default function HomePage() {
  return (
    <>
      <GsapHero />
      <GsapMarquee />
      <GsapStats />
      <TechnologySolutionsSection />
      <GsapFeaturedProducts />
      <BookDevelopersWidget />
      <GsapInteractivePlayground />
      <GsapServicesBento />
      <ProjectEstimator />
      <TechStackShowcase />
      <CaseStudiesSection />
      <GsapTestimonials />
      <CtaBanner />
    </>
  );
}



