import type { MetadataRoute } from 'next';

import { newsroomArticles, projects } from '@/lib/content';
import { locales } from '@/lib/i18n/config';

const baseUrl = 'https://www.parkloftsparaguay.com';

// Route priority map — higher = more important for crawlers
const routePriority: Record<string, number> = {
  '': 1.0,
  '/projects': 0.9,
  '/investor-relations': 0.85,
  '/contact': 0.8,
  '/about': 0.75,
  '/newsroom': 0.7,
  '/legal/privacy': 0.2,
  '/legal/terms': 0.2,
  '/legal/cookies': 0.2,
};

const routeFrequency: Record<string, MetadataRoute.Sitemap[number]['changeFrequency']> = {
  '': 'weekly',
  '/projects': 'weekly',
  '/investor-relations': 'monthly',
  '/contact': 'monthly',
  '/about': 'monthly',
  '/newsroom': 'weekly',
  '/legal/privacy': 'yearly',
  '/legal/terms': 'yearly',
  '/legal/cookies': 'yearly',
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = Object.keys(routePriority);
  const entries: MetadataRoute.Sitemap = [];

  // Static pages — all locales
  for (const locale of locales) {
    for (const route of staticRoutes) {
      const localePath = locale === 'es' ? route : `/${locale}${route}`;
      entries.push({
        url: `${baseUrl}${localePath}`,
        lastModified: new Date(),
        changeFrequency: routeFrequency[route],
        priority: routePriority[route],
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}${l === 'es' ? route : `/${l}${route}`}`])
          ),
        },
      });
    }
  }

  // Individual project pages — higher priority than generic pages
  for (const locale of locales) {
    for (const project of projects) {
      const route = `/projects/${project.slug}`;
      const localePath = locale === 'es' ? route : `/${locale}${route}`;
      entries.push({
        url: `${baseUrl}${localePath}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: project.featured ? 0.85 : 0.75,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}${l === 'es' ? route : `/${l}${route}`}`])
          ),
        },
      });
    }
  }

  // Newsroom article pages — Spanish only (single language content)
  for (const article of newsroomArticles) {
    const route = `/newsroom/${article.slug}`;
    entries.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: 'monthly',
      priority: article.featured ? 0.65 : 0.55,
      alternates: {
        languages: {
          es: `${baseUrl}${route}`,
          'x-default': `${baseUrl}${route}`,
        },
      },
    });
  }

  return entries;
}
