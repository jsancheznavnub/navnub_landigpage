import { type NextRequest, NextResponse } from 'next/server';
import { i18n } from './app/i18n-config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: readonly string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);
  
  return matchLocale(languages, locales, i18n.defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the pathname is for a static file or API route
  const isStaticAsset = pathname.startsWith('/_next/') || 
                        pathname.startsWith('/images/') || 
                        pathname.includes('/favicon.ico') ||
                        pathname.startsWith('/api/');

  if (isStaticAsset) {
    return NextResponse.next();
  }
  
  // Check if the pathname is for /portfolio and redirect to /casos-de-exito
  // This handles direct navigation or old bookmarks to /portfolio
  if (pathname.endsWith('/portfolio') || pathname.endsWith('/portfolio/')) {
    const localeSegment = pathname.split('/')[1]; // Assumes locale is the first segment
    if (i18n.locales.includes(localeSegment as any)) {
      return NextResponse.redirect(new URL(`/${localeSegment}/casos-de-exito`, request.url));
    }
  }


  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    // Handle cases where pathname might already have a leading slash
    const newPathname = pathname === '/' ? '' : pathname;
    return NextResponse.redirect(
      new URL(
        `/${locale}${newPathname}`,
        request.url
      )
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) except for the specific assets we want to allow
    // Match all paths except for /_next/static, /_next/image, /images, /favicon.ico, /api
    '/((?!_next/static|_next/image|images|favicon.ico|api).*)',
  ],
};
