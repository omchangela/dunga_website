import React from 'react';
import { GsapHero } from '@/components/home/GsapHero';
import { GsapMarquee } from '@/components/home/GsapMarquee';
import { GsapStats } from '@/components/home/GsapStats';
import { GsapFeaturedProducts } from '@/components/home/GsapFeaturedProducts';
import { GsapInteractivePlayground } from '@/components/home/GsapInteractivePlayground';
import { GsapServicesBento } from '@/components/home/GsapServicesBento';
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
      <GsapFeaturedProducts />
      <GsapInteractivePlayground />
      <GsapServicesBento />
      <TechStackShowcase />
      <CaseStudiesSection />
      <GsapTestimonials />
      <CtaBanner />
    </>
  );
}


