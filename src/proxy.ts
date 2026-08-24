import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale, localeFromSegment, locales, segmentFor } from '@/i18n/config';

/**
 * Locale negotiation.
 *
 * English is unprefixed, so `/projects` is rewritten internally to `/en/projects`
 * and the browser URL never changes. Portuguese is prefixed and passes straight
 * through. A visitor whose browser prefers pt-BR is redirected from an unprefixed
 * path to the `/pt-br` equivalent; a cookie set by the language switcher overrides
 * that, so choosing a language sticks.
 *
 * Named `proxy` rather than `middleware`: Next 16 resolves `mod.proxy` for
 * `src/proxy.ts` (build/templates/middleware.js) and throws if the export is
 * missing. Route segment config is not allowed here - it always runs on Node.
 */

/** Live outside `app/[locale]`, so they must never be prefixed or redirected. */
const LOCALE_NEUTRAL = new Set(['/robots.txt', '/sitemap.xml', '/manifest.webmanifest', '/icon.svg', '/favicon.ico']);

/** Highest-q Accept-Language entry that maps onto a supported locale. */
function matchAcceptLanguage(header: string | null): Locale {
  if (!header) {
    return defaultLocale;
  }

  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      const quality = params.find((param) => param.trim().startsWith('q='));
      return { tag: tag.trim().toLowerCase(), q: quality ? Number.parseFloat(quality.trim().slice(2)) : 1 };
    })
    .filter((entry) => entry.tag.length > 0 && !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    if (tag === '*') {
      return defaultLocale;
    }
    const exact = locales.find((locale) => locale.toLowerCase() === tag);
    if (exact) {
      return exact;
    }
    const primary = tag.split('-')[0];
    const byLanguage = locales.find((locale) => locale.split('-')[0].toLowerCase() === primary);
    if (byLanguage) {
      return byLanguage;
    }
  }

  return defaultLocale;
}

/**
 * Only redirect real top-level navigations. Bouncing a React Flight request or a
 * prefetch would leave the client router's URL disagreeing with its payload.
 */
function isDocumentNavigation(request: NextRequest): boolean {
  if (request.headers.get('rsc') === '1') {
    return false;
  }
  const dest = request.headers.get('sec-fetch-dest');
  return dest === null || dest === 'document';
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (LOCALE_NEUTRAL.has(pathname) || pathname.startsWith('/_next/')) {
    return NextResponse.next();
  }

  const firstSegment = pathname.split('/')[1] ?? '';
  const prefixed = localeFromSegment(firstSegment);

  if (prefixed) {
    const canonicalSegment = segmentFor(prefixed);

    // `/en/...` is the internal form and `/PT-BR/...` a mis-cased one. Fold both
    // onto the single public spelling so neither can be indexed as a duplicate.
    // Unconditional and input-independent, so 308 is right.
    if (prefixed === defaultLocale || firstSegment !== canonicalSegment) {
      const rest = pathname.slice(`/${firstSegment}`.length);
      const url = request.nextUrl.clone();
      url.pathname = prefixed === defaultLocale ? rest || '/' : `/${canonicalSegment}${rest}`;
      return NextResponse.redirect(url, 308);
    }

    return NextResponse.next();
  }

  // Unprefixed. Cookie beats Accept-Language so the switcher is sticky.
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  const preferred = cookie && isLocale(cookie) ? cookie : matchAcceptLanguage(request.headers.get('accept-language'));

  if (preferred !== defaultLocale && isDocumentNavigation(request)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${segmentFor(preferred)}${pathname === '/' ? '' : pathname}`;
    // 307, not 308: this varies by header and cookie, and browsers cache a 308
    // with no server-side way to bust it - which would make the switcher unwinnable.
    const response = NextResponse.redirect(url, 307);
    response.headers.set('Vary', 'Accept-Language, Cookie');
    return response;
  }

  // Default locale: rewrite internally, browser URL stays clean, and the
  // prerendered page is still served from the cache.
  const url = request.nextUrl.clone();
  url.pathname = `/${segmentFor(defaultLocale)}${pathname === '/' ? '' : pathname}`;
  const response = NextResponse.rewrite(url);
  response.headers.set('Vary', 'Accept-Language, Cookie');
  return response;
}

export const config = {
  matcher: [
    // Listed explicitly: a lone negative-lookahead pattern is ambiguous about the root.
    '/',
    '/((?!_next/|api/|icon\\.svg|sitemap\\.xml|robots\\.txt|manifest\\.webmanifest|.*\\.[\\w]+$).*)',
  ],
};
