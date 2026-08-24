import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero/Hero';
import { About } from '@/components/sections/About/About';
import { Skills } from '@/components/sections/Skills/Skills';
import { Experience } from '@/components/sections/Experience/Experience';
import { Projects } from '@/components/sections/Projects/Projects';
import { Contact } from '@/components/sections/Contact/Contact';
import { defaultLocale, localeFromSegment } from '@/i18n/config';
import { alternatesFor, localizedPath, ogImagesFor } from '@/i18n/navigation';
import { openGraphAlternateLocales, openGraphLocale } from '@/i18n/config';
import { SITE_NAME } from '@/lib/site';
import { siteMessages } from './layout.messages';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = localeFromSegment((await params).locale) ?? defaultLocale;
  const copy = siteMessages[locale];

  // No `title` here: the layout's '%s | Filipe Maia' template would double it.
  // openGraph is restated rather than inherited because declaring it at this
  // segment is what lets the explicit image URL beat the auto-detected one,
  // which would otherwise carry the internal /en prefix.
  return {
    alternates: alternatesFor(locale, '/'),
    openGraph: {
      type: 'website',
      locale: openGraphLocale[locale],
      alternateLocale: openGraphAlternateLocales[locale],
      url: localizedPath(locale, '/'),
      siteName: SITE_NAME,
      title: copy.title,
      description: copy.ogDescription,
      images: ogImagesFor(locale, '/opengraph-image', copy.title),
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.title,
      description: copy.ogDescription,
      images: ogImagesFor(locale, '/twitter-image', copy.title),
    },
  };
}

export default async function Home({ params }: PageProps) {
  const locale = localeFromSegment((await params).locale) ?? defaultLocale;

  return (
    <>
      <Hero locale={locale} />
      <About locale={locale} />
      <Skills locale={locale} />
      <Experience locale={locale} />
      <Projects locale={locale} />
      <Contact locale={locale} />
    </>
  );
}
