import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import './globals.css';
import { ClientProviders } from '@/components/providers/ClientProviders';

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dungatechnologies.com'),
  title: {
    default: 'Dunga Technologies — Enterprise Software, In-House Source Code & SaaS Marketplace',
    template: '%s | Dunga Technologies',
  },
  description:
    'Acquire 100% full source code, CRM systems, SaaS platforms, and digital products built exclusively by Dunga Technologies. Includes lifetime updates and optional 24-48h server setup services.',
  keywords: [
    'Dunga Technologies',
    'buy source code',
    'Next.js CRM',
    'OmniFlow CRM',
    'telecalling software',
    'multi-gateway payment script',
    'enterprise software development',
    'SaaS boilerplate',
    'server installation service',
    'custom web application development',
  ],
  authors: [{ name: 'Dunga Technologies Private Limited', url: 'https://dungatechnologies.com' }],
  creator: 'Dunga Technologies',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dungatechnologies.com',
    siteName: 'Dunga Technologies',
    title: 'Dunga Technologies — Enterprise Software & Code Marketplace',
    description:
      'Production-ready full source code, CRM suites, and enterprise engineering with zero vendor lock-in.',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Dunga Technologies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dunga Technologies — Enterprise Software & Code Marketplace',
    description: '100% full source code, lifetime updates & 24-48h server installation.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdOrg = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Dunga Technologies',
    url: 'https://dungatechnologies.com',
    logo: 'https://dungatechnologies.com/logo.png',
    description:
      'Official enterprise software engineering firm and proprietary source code marketplace.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-80-4567-8900',
      contactType: 'customer support',
      areaServed: ['IN', 'US', 'GB', 'AE', 'SG'],
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [
      'https://github.com/dungatechnologies',
      'https://linkedin.com/company/dungatechnologies',
      'https://twitter.com/dungatech',
    ],
  };

  return (
    <html lang="en" className={`${jakartaSans.variable} ${outfit.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
      <body className="font-sans antialiased text-slate-900 bg-white min-h-screen">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
