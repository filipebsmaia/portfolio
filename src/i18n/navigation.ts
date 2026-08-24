import type { Metadata } from 'next';
import { defaultLocale, type Locale, localeFromSegment, segmentFor } from './config';

/**
 * `/projects/ceu-gg` -> `/projects/ceu-gg` (en) | `/pt-br/projects/ceu-gg` (pt-BR).
 * `path` must be app-absolute and start with `/`. Hashes are fine (`/#about`).
 */
export function localizedPath(locale: Locale, path: string): string {
  if (locale === defaultLocale) {
    return path;
  }
  const prefix = `/${segmentFor(locale)}`;
  return path === '/' ? prefix : `${prefix}${path}`;
}

/**
 * Inverse of `localizedPath`. Feed it `usePathname()`, which after the proxy's
 * internal rewrite still reports the browser URL rather than `/en/...`.
 */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const segments = pathname.split('/');
  const matched = localeFromSegment(segments[1] ?? '');

  if (!matched) {
    return { locale: defaultLocale, path: pathname };
  }

  // Strip the segment even when it is the default locale. At request time the
  // proxy's rewrite is invisible here, but during prerendering `usePathname()`
  // reports the internal `/en/...` form - and leaving that on would produce
  // `/pt-br/en/...` links in the static HTML.
  const rest = segments.slice(2).join('/');
  return { locale: matched, path: rest ? `/${rest}` : '/' };
}

/** Curry for pages that build several links. */
export function hrefFor(locale: Locale) {
  return (path: string) => localizedPath(locale, path);
}

/** Canonical plus reciprocal hreflang for one logical page. */
export function alternatesFor(locale: Locale, path: string): Metadata['alternates'] {
  return {
    canonical: localizedPath(locale, path),
    languages: {
      en: localizedPath('en', path),
      'pt-BR': localizedPath('pt-BR', path),
      // `/` is the entry point that performs Accept-Language detection, which is
      // exactly what x-default means.
      'x-default': localizedPath(defaultLocale, path),
    },
  };
}

/**
 * Absolute URL, for the sitemap and JSON-LD.
 *
 * The root deliberately yields the bare origin with no trailing slash, matching
 * what Next emits for `canonical: '/'` - otherwise Search Console sees two URLs.
 */
export function absoluteUrl(siteUrl: string, locale: Locale, path: string): string {
  const localized = localizedPath(locale, path);
  return localized === '/' ? siteUrl : `${siteUrl}${localized}`;
}

/**
 * Next derives og:image URLs from the *internal* route path, which for the
 * default locale means a stray `/en` prefix that then has to 308. Declaring the
 * images explicitly keeps the public URL clean and saves the redirect hop.
 */
export function ogImagesFor(locale: Locale, path: string, alt: string) {
  return [{ url: localizedPath(locale, path), width: 1200, height: 630, alt }];
}
