import type { MetadataRoute } from 'next';
import { caseStudySlugs } from '@/app/[locale]/projects/[slug]/content/slugs';
import { defaultLocale, type Locale, locales } from '@/i18n/config';
import { absoluteUrl } from '@/i18n/navigation';
import { SITE_URL } from '@/lib/site';

// Fixed, so a deploy alone does not claim the pages changed.
const SITE_UPDATED = new Date('2026-08-21');

function url(locale: Locale, path: string) {
  return absoluteUrl(SITE_URL, locale, path);
}

/** Emitted verbatim as <xhtml:link>, not resolved against metadataBase - so absolute. */
function languagesFor(path: string) {
  return {
    en: url('en', path),
    'pt-BR': url('pt-BR', path),
    'x-default': url(defaultLocale, path),
  };
}

type EntryOptions = Pick<MetadataRoute.Sitemap[number], 'lastModified' | 'changeFrequency' | 'priority'>;

function entries(path: string, options: EntryOptions): MetadataRoute.Sitemap {
  const languages = languagesFor(path);
  return locales.map((locale) => ({ url: url(locale, path), alternates: { languages }, ...options }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...entries('/', { lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 1 }),
    ...entries('/projects', { lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.7 }),
    ...caseStudySlugs.flatMap((slug) =>
      entries(`/projects/${slug}`, { lastModified: SITE_UPDATED, changeFrequency: 'yearly', priority: 0.8 }),
    ),
  ];
}
