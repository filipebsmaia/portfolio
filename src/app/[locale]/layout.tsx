import type { Metadata, Viewport } from 'next';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import { navItems } from '@/components/layout/Header/Header.messages';
import { allSkillNames } from '@/components/sections/Skills/Skills.data';
import {
  defaultLocale,
  htmlLang,
  type Locale,
  localeFromSegment,
  locales,
  openGraphAlternateLocales,
  openGraphLocale,
  segmentFor,
} from '@/i18n/config';
import { LocaleProvider } from '@/i18n/LocaleProvider';
import { absoluteUrl, alternatesFor, localizedPath, ogImagesFor } from '@/i18n/navigation';
import { profile, profileSameAs } from '@/lib/profile';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import { ibmPlexSans, jetbrainsMono } from '../fonts';
import { siteMessages } from './layout.messages';
import '../globals.sass';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale: segmentFor(locale) }));
}

/**
 * Deliberately not `notFound()`: throwing from the root layout would leave
 * nothing to render <html>. A junk locale matches no page route anyway.
 */
function resolveLocale(segment: string): Locale {
  return localeFromSegment(segment) ?? defaultLocale;
}

export async function generateMetadata({ params }: { params: LayoutProps['params'] }): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const copy = siteMessages[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: copy.title, template: `%s | ${SITE_NAME}` },
    description: copy.description,
    applicationName: SITE_NAME,
    keywords: copy.keywords,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
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
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    category: 'technology',
  };
}

export const viewport: Viewport = {
  themeColor: '#0A0E1A',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children, params }: LayoutProps) {
  const locale = resolveLocale((await params).locale);
  const copy = siteMessages[locale];

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_NAME,
    alternateName: 'filipebsmaia',
    url: absoluteUrl(SITE_URL, locale, '/'),
    image: absoluteUrl(SITE_URL, locale, '/opengraph-image'),
    email: `mailto:${profile.email}`,
    jobTitle: copy.jobTitle,
    worksFor: { '@type': 'Organization', name: 'Unifique Telecomunicações' },
    description: copy.description,
    knowsAbout: allSkillNames,
    sameAs: profileSameAs,
  };

  return (
    <html lang={htmlLang[locale]} className={`${jetbrainsMono.variable} ${ibmPlexSans.variable}`}>
      <body>
        <LocaleProvider locale={locale}>
          <Header navItems={navItems} locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
        </LocaleProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  );
}
