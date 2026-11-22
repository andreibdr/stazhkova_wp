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

  // Individual Guides with reciprocal multilingual mapping (by step or translationKey)
  const allGuides = getGuides();
  const guidesByGroup: Record<string, { en?: string; ru?: string; es?: string }> = {};

  for (const g of allGuides) {
    const key = g.translationKey || (g.step ? `step-${g.step}` : undefined);
    if (key) {
      if (!guidesByGroup[key]) guidesByGroup[key] = {};
      const fullUrl =
        g.lang === 'en'
          ? `${baseUrl}/guides/${g.slug}`
          : `${baseUrl}/${g.lang}/guides/${encodeURIComponent(g.slug)}`;
      guidesByGroup[key][g.lang] = fullUrl;
    }
  }

  const guideRoutes: MetadataRoute.Sitemap = allGuides.map((g) => {
    const route =
      g.lang === 'en'
        ? `${baseUrl}/guides/${g.slug}`
        : `${baseUrl}/${g.lang}/guides/${encodeURIComponent(g.slug)}`;

    const key = g.translationKey || (g.step ? `step-${g.step}` : undefined);
    const stepAlts = key ? guidesByGroup[key] : undefined;
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
