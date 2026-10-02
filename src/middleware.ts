import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { siteConfig } from '@/lib/siteConfig';

const locales = siteConfig.i18n.locales as readonly ('fr' | 'en')[];
const defaultLocale = siteConfig.i18n.defaultLocale;

function getLocale(request: NextRequest): 'fr' | 'en' {
  const cookieLocale = request.cookies.get('portfolio-locale')?.value;
  if (cookieLocale && locales.includes(cookieLocale as 'fr' | 'en')) {
    return cookieLocale as 'fr' | 'en';
  }
  
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage.split(',')[0].split('-')[0];
    if (locales.includes(preferredLocale as 'fr' | 'en')) {
      return preferredLocale as 'fr' | 'en';
    }
  }
  
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameHasLocale) {
    return NextResponse.next();
  }
  
  const locale = getLocale(request);
  
  request.nextUrl.pathname = `/${locale}${pathname}`;
  
  const response = NextResponse.redirect(request.nextUrl);
  response.cookies.set('portfolio-locale', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.png$).*)',
  ],
};