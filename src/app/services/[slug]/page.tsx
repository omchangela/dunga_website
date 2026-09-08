import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  SERVICES,
} from '@/data/services';
import {
  Code2,
  Smartphone,
  Layers,
  Cloud,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Zap,
  Clock,
  Headphones,
  FileCode2,
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return { title: 'Service Not Found | Dunga Technologies' };
  }

  return {
    title: `${service.title} — Enterprise Engineering | Dunga Technologies`,
    description: service.shortDescription,
    keywords: [service.title, ...service.techStack, 'custom software development', 'Dunga Technologies'],
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/services" className="hover:text-slate-900 transition-colors">
            Services
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-medium truncate">{service.title}</span>
        </nav>

        {/* Hero Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#e6f4f7] border border-[#246e7f]/20 text-[#246e7f] text-xs font-bold px-3 py-1 rounded-full">
            <Zap className="w-3.5 h-3.5" />
            <span>Estimated Delivery: {service.timeline}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight max-w-3xl">
            {service.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            {service.tagline}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {service.techStack.map((tech) => (
              <span
                key={tech}
                className="bg-slate-100 text-slate-800 text-xs font-mono font-medium px-3 py-1 rounded-lg border border-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Deliverables & Process Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 7 cols: Process & Benefits */}
          <div className="lg:col-span-7 space-y-8">
            {/* 4-Step Process */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <h2 className="text-lg font-bold text-slate-900">Our Engineering & Delivery Process</h2>
              <div className="space-y-4">
                {service.processSteps.map((step) => (
                  <div key={step.step} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#e6f4f7] text-[#246e7f] font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">{step.title}</h3>
                      <p className="text-xs text-slate-600 mt-0.5">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Dunga */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Key Business Benefits</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.benefits.map((b, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1">
                    <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      {b.title}
                    </h3>
                    <p className="text-xs text-slate-600">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 5 cols: Deliverables & Consultation Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
              <h3 className="text-sm font-bold text-slate-900">Included Deliverables</h3>
              <ul className="space-y-2.5 text-xs text-slate-700">
                {service.deliverables.map((del, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#246e7f] flex-shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <Link
                  href="/contact"
                  className="w-full bg-[#246e7f] hover:bg-[#1a515e] text-white font-bold text-xs py-3.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Headphones className="w-4 h-4" />
                  <span>Request Scoping & Quote</span>
                </Link>

                <a
                  href="https://wa.me/919999999999?text=Hello%20Dunga%20Technologies,%20I%20am%20interested%20in%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
