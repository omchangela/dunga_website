'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  Rocket, 
  Bug, 
  Settings, 
  Wrench, 
  BrainCircuit, 
  Calculator, 
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const SOLUTIONS = [
  {
    id: 'hire-developers',
    icon: Users,
    iconBg: 'bg-[#e6f4f7] text-[#246E7F]',
    badge: 'Hire-Ready Profiles',
    title: 'Hire Developers',
    description:
      'Hire skilled developers based on your project requirements and preferred engagement model (hourly, dedicated, or milestone-based).',
    benefits: ['Pre-vetted senior talent', '1-week risk-free trial', 'Direct Slack/Jira integration'],
    ctaText: 'Browse Developers',
    ctaLink: '/hire-developers',
    featured: true,
  },
  {
    id: 'custom-software',
    icon: Rocket,
    iconBg: 'bg-[#fff3eb] text-[#E06527]',
    badge: 'End-to-End Build',
    title: 'Custom Software Development',
    description:
      'Build scalable web applications, mobile applications, SaaS platforms, business software, and bespoke digital solutions with modern stacks.',
    benefits: ['Full-cycle MVP to Enterprise', 'Scalable microservices', '100% IP & code transfer'],
    ctaText: 'Start Custom Build',
    ctaLink: '/services#custom-development',
    featured: false,
  },
  {
    id: 'bug-fixing',
    icon: Bug,
    iconBg: 'bg-rose-50 text-rose-600',
    badge: '2–4h Emergency SLAs',
    title: 'Bug Fixing & Code Debugging',
    description:
      'Resolve critical application errors, broken functionality, API problems, database connection drops, build pipeline failures, and performance bottlenecks.',
    benefits: ['Root-cause analysis', 'Live debugging sessions', 'Fix guarantee without downtime'],
    ctaText: 'Fix Broken Code',
    ctaLink: '/services#bug-fixing',
    featured: false,
  },
  {
    id: 'script-installation',
    icon: Settings,
    iconBg: 'bg-amber-50 text-amber-600',
    badge: 'Turnkey Setup',
    title: 'Code & Script Installation',
    description:
      'Get professional installation, configuration, customization, deployment, and cloud server setup support for ready-made scripts and software products.',
    benefits: ['AWS, VPS & cPanel setup', 'Payment gateway wiring', 'White-label branding support'],
    ctaText: 'Get Installation Support',
    ctaLink: '/services#script-installation',
    featured: false,
  },
  {
    id: 'technical-maintenance',
    icon: Wrench,
    iconBg: 'bg-indigo-50 text-indigo-600',
    badge: '24/7 SLA Uptime',
    title: 'Technical Maintenance',
    description:
      'Keep your website, web application, server, database, and software systems continuously updated, secure, monitored, and performance-optimized.',
    benefits: ['Daily automated backups', 'Security patches & audits', 'Zero-downtime server tuning'],
    ctaText: 'Explore AMC Plans',
    ctaLink: '/services#technical-maintenance',
    featured: false,
  },
  {
    id: 'tech-consultancy',
    icon: BrainCircuit,
    iconBg: 'bg-emerald-50 text-emerald-600',
    badge: 'Advisory & Architecture',
    title: 'Technology Consultancy',
    description:
      'Get senior technical guidance for cloud architecture, technology stack selection, project planning, database scaling, API integrations, and tech roadmap.',
    benefits: ['System design blueprints', 'Cost optimization on AWS', 'Tech debt refactoring plans'],
    ctaText: 'Book Strategy Call',
    ctaLink: '/services#tech-consultancy',
    featured: false,
  },
  {
    id: 'project-estimation',
    icon: Calculator,
    iconBg: 'bg-cyan-50 text-cyan-700',
    badge: 'Guaranteed Scope',
    title: 'Project Estimation & Scoping',
    description:
      'Share your requirements and receive a structured, itemized project estimate covering technical scope, wireframes, timeline, milestones, and expected effort.',
    benefits: ['Detailed architecture breakdown', 'Milestone-based budgeting', 'Transparent timeline forecast'],
    ctaText: 'Get Free Estimate',
    ctaLink: '/contact',
    featured: false,
  },
];

export const TechnologySolutionsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#e6f4f7] text-[#246E7F] border border-[#246E7F]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#E06527]" />
            <span>Full-Lifecycle Engineering</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Technology Solutions for Every Stage of Your Project
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Whether you are starting a brand new software project, improving an existing application, or looking for dedicated ongoing technical support, Dunga Technologies provides flexible technology solutions for businesses, startups, and organizations.
          </p>
        </div>

        {/* 7 Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS.map((solution) => {
            const Icon = solution.icon;
            return (
              <div
                key={solution.id}
                className={`bg-white rounded-2xl border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-lg group ${
                  solution.featured
                    ? 'border-[#246E7F] ring-1 ring-[#246E7F]/30 shadow-sm'
                    : 'border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${solution.iconBg} shadow-sm group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {solution.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#246E7F] transition-colors">
                      {solution.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {solution.description}
                    </p>
                  </div>

                  {/* Key Benefits */}
                  <ul className="space-y-2 pt-2 border-t border-slate-100">
                    {solution.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA */}
                <div className="pt-6 mt-4 border-t border-slate-100">
                  <Link
                    href={solution.ctaLink}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-all ${
                      solution.featured
                        ? 'bg-[#246E7F] text-white hover:bg-[#1b5563] shadow-sm'
                        : 'bg-slate-50 text-slate-800 hover:bg-[#246E7F] hover:text-white border border-slate-200'
                    }`}
                  >
                    <span>{solution.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner with Custom Scope Consultation CTA */}
        <div className="bg-gradient-to-r from-[#246E7F] to-[#1b5563] text-white rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E06527] bg-white px-3 py-1 rounded-full">
              Need a Tailored Strategy?
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Not sure which solution matches your current stage?
            </h3>
            <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
              Schedule a 15-minute scoping session with our lead architects. We will evaluate your codebase, timelines, and provide a transparent roadmap with zero commitment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <Link
              href="/hire-developers"
              className="w-full sm:w-auto px-5 py-3 bg-white text-[#246E7F] hover:bg-slate-100 font-bold text-xs rounded-xl shadow transition-all text-center"
            >
              Browse Developer Roster
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-5 py-3 bg-[#E06527] hover:bg-[#c95318] text-white font-bold text-xs rounded-xl shadow transition-all text-center"
            >
              Get Free Project Estimate
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
