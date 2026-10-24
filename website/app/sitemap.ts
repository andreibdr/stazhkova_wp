import { MetadataRoute } from 'next';
import { getGuides } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://stazhkova.com';
  const now = new Date('2026-10-24T00:00:00Z');

  // Core Home Pages
  const homeRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          en: baseUrl,
          ru: `${baseUrl}/ru`,
          es: `${baseUrl}/es`,
          'x-default': baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/ru`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          en: baseUrl,
          ru: `${baseUrl}/ru`,
          es: `${baseUrl}/es`,
          'x-default': baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/es`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: baseUrl,
          ru: `${baseUrl}/ru`,
          es: `${baseUrl}/es`,
          'x-default': baseUrl,
        },
      },
    },
  ];

  // Guides Directory Pages
  const guidesIndexRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/guides`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/guides`,
          ru: `${baseUrl}/ru/guides`,
          es: `${baseUrl}/es/guides`,
          'x-default': `${baseUrl}/guides`,
        },
      },
    },
    {
      url: `${baseUrl}/ru/guides`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/guides`,
          ru: `${baseUrl}/ru/guides`,
          es: `${baseUrl}/es/guides`,
          'x-default': `${baseUrl}/guides`,
        },
      },
    },
    {
      url: `${baseUrl}/es/guides`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/guides`,
          ru: `${baseUrl}/ru/guides`,
          es: `${baseUrl}/es/guides`,
          'x-default': `${baseUrl}/guides`,
        },
      },
    },
  ];

  // Video Gallery Pages
  const videoRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/video`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/video`,
          ru: `${baseUrl}/ru/video`,
          es: `${baseUrl}/es/video`,
          'x-default': `${baseUrl}/video`,
        },
      },
    },
    {
      url: `${baseUrl}/ru/video`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/video`,
          ru: `${baseUrl}/ru/video`,
          es: `${baseUrl}/es/video`,
          'x-default': `${baseUrl}/video`,
        },
      },
    },
    {
      url: `${baseUrl}/es/video`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/video`,
          ru: `${baseUrl}/ru/video`,
          es: `${baseUrl}/es/video`,
          'x-default': `${baseUrl}/video`,
        },
      },
    },
  ];

  // Individual Step Guides with reciprocal multilingual mapping
  const allGuides = getGuides();
  const guidesByStep: Record<number, { en?: string; ru?: string; es?: string }> = {};

  for (const g of allGuides) {
    if (g.step) {
      if (!guidesByStep[g.step]) guidesByStep[g.step] = {};
      const fullUrl =
        g.lang === 'en'
          ? `${baseUrl}/guides/${g.slug}`
          : `${baseUrl}/${g.lang}/guides/${encodeURIComponent(g.slug)}`;
      guidesByStep[g.step][g.lang] = fullUrl;
    }
  }

  const guideRoutes: MetadataRoute.Sitemap = allGuides.map((g) => {
    const route =
      g.lang === 'en'
        ? `${baseUrl}/guides/${g.slug}`
        : `${baseUrl}/${g.lang}/guides/${encodeURIComponent(g.slug)}`;

    const stepAlts = g.step ? guidesByStep[g.step] : undefined;
    const languages: Record<string, string> = {};
    if (stepAlts?.en) {
      languages.en = stepAlts.en;
      languages['x-default'] = stepAlts.en;
    }
    if (stepAlts?.ru) languages.ru = stepAlts.ru;
    if (stepAlts?.es) languages.es = stepAlts.es;

    return {
      url: route,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: Object.keys(languages).length > 0 ? { languages } : undefined,
    };
  });

  return [...homeRoutes, ...guidesIndexRoutes, ...videoRoutes, ...guideRoutes];
}
