import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/data/products';
import { SERVICES } from '@/data/services';
import { CASE_STUDIES } from '@/data/case-studies';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dungatechnologies.com';

  const staticPages = [
    '',
    '/products',
    '/services',
    '/projects',
    '/about',
    '/contact',
    '/account',
    '/checkout',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const productPages = PRODUCTS.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: new Date(p.lastUpdated),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const servicePages = SERVICES.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const projectPages = CASE_STUDIES.map((c) => ({
    url: `${baseUrl}/projects/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...servicePages, ...projectPages];
}
