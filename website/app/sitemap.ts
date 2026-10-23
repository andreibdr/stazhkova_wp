import { MetadataRoute } from 'next';
import { getGuides } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://stazhkova.com';
  const now = new Date('2026-10-23T00:00:00Z');

  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/ru`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/es`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ru/guides`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/es/guides`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  const allGuides = getGuides();
  const guideRoutes: MetadataRoute.Sitemap = allGuides.map((g) => {
    const route =
      g.lang === 'en'
        ? `${baseUrl}/guides/${g.slug}`
        : `${baseUrl}/${g.lang}/guides/${encodeURIComponent(g.slug)}`;
    return {
      url: route,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    };
  });

  return [...coreRoutes, ...guideRoutes];
}
