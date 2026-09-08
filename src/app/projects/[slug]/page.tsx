import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CASE_STUDIES } from '@/data/case-studies';
import { ChevronRight, TrendingUp, CheckCircle2, ArrowRight, ShieldCheck, Quote } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = CASE_STUDIES.find((c) => c.slug === slug);

  if (!study) return { title: 'Case Study Not Found | Dunga Technologies' };

  return {
    title: `${study.title} — Case Study | Dunga Technologies`,
    description: study.challenge,
    keywords: [study.clientName, study.category, ...study.techStack],
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((c) => c.slug === slug);

  if (!study) {
    notFound();
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/projects" className="hover:text-slate-900 transition-colors">
            Case Studies
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-medium truncate">{study.clientName}</span>
        </nav>

        {/* Hero */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#246e7f]">
            <span>{study.clientName}</span>
            <span>•</span>
            <span>{study.clientIndustry}</span>
            <span>•</span>
            <span className="bg-[#e6f4f7] px-2 py-0.5 rounded">{study.category}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {study.title}
          </h1>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {study.metrics.map((m, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                <span className="text-2xl font-black text-slate-900 block">{m.value}</span>
                <span className="text-xs font-bold text-emerald-600 block mt-0.5">{m.change} Improvement</span>
                <span className="text-xs text-slate-500 block mt-1">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Challenge & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3">
            <h2 className="text-base font-bold text-slate-900">The Business Bottleneck</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{study.challenge}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3">
            <h2 className="text-base font-bold text-[#246e7f]">Dunga Technologies Solution</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{study.solution}</p>
          </div>
        </div>

        {/* Client Testimonial Box */}
        {study.testimonial && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <Quote className="w-8 h-8 text-[#246e7f]/40" />
            <p className="text-sm sm:text-base text-slate-800 italic leading-relaxed">
              &ldquo;{study.testimonial.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={study.testimonial.avatarUrl}
                alt={study.testimonial.author}
                className="w-11 h-11 rounded-full object-cover border border-slate-200"
              />
              <div>
                <div className="text-xs font-bold text-slate-900">{study.testimonial.author}</div>
                <div className="text-[11px] text-slate-500">
                  {study.testimonial.role}, {study.testimonial.company}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
