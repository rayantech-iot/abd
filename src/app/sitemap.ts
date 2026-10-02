import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://constantin-gadegbe.com';
  const locales = siteConfig.i18n.locales;
  const sections = ['', '#about', '#experience', '#projects', '#skills', '#education', '#contact'];
  
  const urls: MetadataRoute.Sitemap = [];
  
  locales.forEach((locale) => {
    sections.forEach((section) => {
      urls.push({
        url: `${baseUrl}/${locale}${section}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: section === '' ? 1 : 0.8,
        alternates: {
          languages: locales.reduce((acc, loc) => {
            acc[loc] = `${baseUrl}/${loc}${section}`;
            return acc;
          }, {} as Record<string, string>),
        },
      });
    });
  });
  
  return urls;
}