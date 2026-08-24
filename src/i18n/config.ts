/**
 * BCP-47 locale tags. These are also the keys of every `*.messages.ts` bundle.
 *
 * Note the case split: the tag is `pt-BR` (what `<html lang>`, hreflang and Open
 * Graph want) while the URL segment is `pt-br`. `segmentFor` is the only place
 * that conversion happens.
 */
export const locales = ['en', 'pt-BR'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export type LocaleSegment = Lowercase<Locale>;

export function segmentFor(locale: Locale): LocaleSegment {
  return locale.toLowerCase() as LocaleSegment;
}

/** Case-insensitive. Returns undefined for anything that is not a known locale. */
export function localeFromSegment(segment: string): Locale | undefined {
  const lower = segment.toLowerCase();
  return locales.find((locale) => locale.toLowerCase() === lower);
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const htmlLang: Record<Locale, string> = { en: 'en', 'pt-BR': 'pt-BR' };

/** Open Graph wants the underscore form. */
export const openGraphLocale: Record<Locale, string> = { en: 'en_US', 'pt-BR': 'pt_BR' };

export const openGraphAlternateLocales: Record<Locale, string[]> = {
  en: ['pt_BR'],
  'pt-BR': ['en_US'],
};

export const LOCALE_COOKIE = 'NEXT_LOCALE';
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
