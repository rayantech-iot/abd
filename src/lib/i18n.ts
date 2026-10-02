import { siteConfig } from './siteConfig';

export type Locale = 'fr' | 'en';

export async function getLocaleData(locale: Locale) {
  const mod = await import(`../locales/${locale}/common`);
  return mod.common;
}

export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/');
  const potentialLocale = segments[1];
  if (siteConfig.i18n.locales.includes(potentialLocale as Locale)) {
    return potentialLocale as Locale;
  }
  return siteConfig.i18n.defaultLocale;
}

export function removeLocaleFromPath(pathname: string): string {
  const locale = getLocaleFromPath(pathname);
  if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
    return pathname.slice(locale.length + 1) || '/';
  }
  return pathname;
}

export function addLocaleToPath(pathname: string, locale: Locale): string {
  if (pathname === '/') return `/${locale}`;
  if (pathname.startsWith('/')) return `/${locale}${pathname}`;
  return `/${locale}/${pathname}`;
}