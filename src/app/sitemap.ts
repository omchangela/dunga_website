import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/data/products';
import { SERVICES } from '@/data/services';
import { CASE_STUDIES } from '@/data/case-studies';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://dungatechnologies.com';

  let dynamicProducts: { slug: string; updatedAt?: Date; lastUpdated?: string }[] = PRODUCTS;

  if (process.env.DATABASE_URL) {
    try {
      const dbProds = await prisma.product.findMany({
        where: { isActive: true },
        select: { slug: true, updatedAt: true },
      });
      if (dbProds && dbProds.length > 0) {
        // Merge without duplicate slugs
        const dbSlugs = new Set(dbProds.map((p) => p.slug));
        const filteredInitial = PRODUCTS.filter((p) => !dbSlugs.has(p.slug));
        dynamicProducts = [...dbProds, ...filteredInitial];
      }
    } catch {}
  }

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

  const productPages = dynamicProducts.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : p.lastUpdated ? new Date(p.lastUpdated) : new Date(),
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
