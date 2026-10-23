import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
      {
        userAgent: ['GPTBot', 'Google-Extended', 'ClaudeBot', 'PerplexityBot', 'Applebot-Extended', 'Grok'],
        allow: '/',
      },
    ],
    sitemap: 'https://stazhkova.com/sitemap.xml',
  };
}
