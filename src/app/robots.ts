import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/checkout/success'],
    },
    sitemap: 'https://dungatechnologies.com/sitemap.xml',
  };
}
