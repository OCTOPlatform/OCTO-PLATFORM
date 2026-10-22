import { MetadataRoute } from 'next';
import { INITIAL_PRODUCTS, INITIAL_RESOURCES, INDUSTRIES } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://octo.id';
  const currentDate = new Date().toISOString();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/contact',
    '/updates',
    '/products',
    '/solutions',
    '/resources',
    '/resources/articles',
    '/resources/guides',
    '/resources/case-studies',
    '/resources/faq',
    '/resources/downloads',
    '/request-demo',
    '/consultation',
    '/partners',
    '/partners/apply',
    '/newsletter',
    '/privacy',
    '/terms',
    '/cookies',
    '/partner-terms',
    '/shipping-returns',
    '/search',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/products') ? 0.9 : 0.8,
  }));

  // Dynamic Product routes
  const productRoutes: MetadataRoute.Sitemap = INITIAL_PRODUCTS.map((prod) => ({
    url: `${baseUrl}/products/${prod.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Dynamic Solution routes
  const solutionRoutes: MetadataRoute.Sitemap = INDUSTRIES.map((ind) => ({
    url: `${baseUrl}/solutions/${ind.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Dynamic Resource routes
  const resourceRoutes: MetadataRoute.Sitemap = INITIAL_RESOURCES.map((res) => ({
    url: `${baseUrl}/resources/${res.slug}`,
    lastModified: res.updatedAt || currentDate,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [...staticRoutes, ...productRoutes, ...solutionRoutes, ...resourceRoutes];
}
