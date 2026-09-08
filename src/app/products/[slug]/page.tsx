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

  return {
    title: `${product.title} — Full Source Code & Server Setup`,
    description: product.shortDescription,
    keywords: [
      product.title,
      product.category,
      'source code',
      'buy software script',
      'server installation add-on',
      ...product.techStack,
    ],
    openGraph: {
      title: `${product.title} | Dunga Technologies`,
      description: product.shortDescription,
      url: `https://dungatechnologies.com/products/${product.slug}`,
      siteName: 'Dunga Technologies',
      images: [
        {
          url: product.bannerUrl || product.thumbnailUrl,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.shortDescription,
      images: [product.bannerUrl || product.thumbnailUrl],
    },
    alternates: {
      canonical: `https://dungatechnologies.com/products/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Generate JSON-LD Schema for Rich Snippets
  const jsonLdProduct = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.title,
    operatingSystem: 'Linux, Windows, macOS (Docker / Node.js)',
    applicationCategory: product.category,
    softwareVersion: product.version,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      '@type': 'Offer',
      price: product.regularPriceINR,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    description: product.shortDescription,
    creator: {
      '@type': 'Organization',
      name: 'Dunga Technologies',
    },
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is included in the ${product.title} source code?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `You get 100% unencrypted frontend, backend API, database migrations, Docker setup, and complete setup documentation.`,
        },
      },
      {
        '@type': 'Question',
        name: 'How does the server setup add-on work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our senior engineers will configure your VPS server, database, domain SSL, and test all webhooks within 24 to 48 hours.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}
