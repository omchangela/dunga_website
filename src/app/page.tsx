import React from 'react';
import { GsapHero } from '@/components/home/GsapHero';
import { GsapStats } from '@/components/home/GsapStats';
import { TechnologySolutionsSection } from '@/components/home/TechnologySolutionsSection';
import { FlexibleEngagementSection } from '@/components/home/FlexibleEngagementSection';
import { TechStackShowcase } from '@/components/home/TechStackShowcase';
import { WhyChooseDungaSection } from '@/components/home/WhyChooseDungaSection';
import { OurWorkSection } from '@/components/home/OurWorkSection';
import { GsapTestimonials } from '@/components/home/GsapTestimonials';
import { CtaBanner } from '@/components/home/CtaBanner';

export default function HomePage() {
  return (
    <>
      <GsapHero />
      <GsapStats />
      <TechnologySolutionsSection />
      <FlexibleEngagementSection />
      <TechStackShowcase />
      <WhyChooseDungaSection />
      <OurWorkSection />
      <GsapTestimonials />
      <CtaBanner />
    </>
  );
}
