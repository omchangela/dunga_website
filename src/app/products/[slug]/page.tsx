import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCTS, getProductBySlug } from '@/data/products';
import { ProductDetailClient } from './ProductDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | Dunga Technologies',
    };
  }

  const seo = product.seo;
  const pageTitle = seo?.seoTitle || `${product.title} — Full Source Code & Server Setup | Dunga Technologies`;
  const metaDesc = seo?.metaDescription || product.shortDescription;
  const canonicalUrl = seo?.canonicalUrl || `https://dungatechnologies.com/products/${product.slug}`;
  const shouldIndex = seo?.index ?? true;
  const shouldFollow = seo?.follow ?? true;

  const allKeywords = Array.from(
    new Set([
      seo?.primaryKeyword || `${product.title} source code`,
      ...(seo?.secondaryKeywords || []),
      product.title,
      product.category,
      'buy software script',
      'server installation add-on',
      ...product.techStack,
    ])
  ).filter(Boolean);

  const ogImageUrl = product.bannerUrl || product.thumbnailUrl;
  const imageAlt = seo?.imageAlt || `${product.title} - Source Code & Architecture`;

  return {
    title: pageTitle,
    description: metaDesc,
    keywords: allKeywords,
    robots: {
      index: shouldIndex,
      follow: shouldFollow,
      googleBot: {
        index: shouldIndex,
        follow: shouldFollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: pageTitle,
      description: metaDesc,
      url: canonicalUrl,
      siteName: 'Dunga Technologies',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: metaDesc,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // 1. Generate JSON-LD SoftwareApplication / Product Schema for Rich Snippets
  const jsonLdProduct = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.title,
    operatingSystem: 'Linux (Ubuntu/Debian), Windows, macOS (Docker / Node.js)',
    applicationCategory: product.category,
    softwareVersion: product.version,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount || 24,
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'Offer',
      price: product.regularPriceINR,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `https://dungatechnologies.com/products/${product.slug}`,
      seller: {
        '@type': 'Organization',
        name: 'Dunga Technologies',
      },
    },
    description: product.seo?.metaDescription || product.shortDescription,
    image: product.thumbnailUrl,
    creator: {
      '@type': 'Organization',
      name: 'Dunga Technologies',
      url: 'https://dungatechnologies.com',
    },
  };

  // 2. Generate JSON-LD Breadcrumb Schema
  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://dungatechnologies.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products & Source Code',
        item: 'https://dungatechnologies.com/products',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.title,
        item: `https://dungatechnologies.com/products/${product.slug}`,
      },
    ],
  };

  // 3. Dynamic JSON-LD FAQ Schema from product.faqs
  const productFaqs = product.faqs && product.faqs.length > 0 ? product.faqs : [
    {
      question: `What is included in the ${product.title} source code?`,
      answer: 'You get 100% unencrypted frontend, backend API, database migrations, Docker setup, and complete setup documentation.',
    },
    {
      question: 'How does the server setup add-on work?',
      answer: 'Our senior engineers will configure your VPS server, database, domain SSL, and test all webhooks within 24 to 48 hours.',
    },
  ];

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: productFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}
