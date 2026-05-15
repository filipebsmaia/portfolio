import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, IBM_Plex_Sans } from 'next/font/google';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import { portfolio } from '@/data/portfolio';
import './globals.sass';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://filipemaia.dev';
const SITE_NAME = 'Filipe Maia';
const SITE_TITLE = 'Filipe Maia | Software Engineer';
const SITE_DESCRIPTION =
  'Fullstack developer passionate about TypeScript, Java, React, Node.js, Clean Architecture, and Domain-Driven Design.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | Filipe Maia',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'Filipe Maia',
    'Software Engineer',
    'Tech Lead',
    'Fullstack Developer',
    'Backend Developer',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'NestJS',
    'Java',
    'Clean Architecture',
    'Domain-Driven Design',
    'DDD',
    'Microservices',
    'Kubernetes',
    'Google Cloud',
    'Kafka',
    'PostgreSQL',
  ],
  authors: [{ name: 'Filipe Maia', url: SITE_URL }],
  creator: 'Filipe Maia',
  publisher: 'Filipe Maia',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: 'Fullstack developer passionate about building scalable and well-architected software.',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: 'Fullstack developer passionate about building scalable and well-architected software.',
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

export const viewport: Viewport = {
  themeColor: '#0A0E1A',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Filipe Maia',
  alternateName: 'filipebsmaia',
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  email: `mailto:${portfolio.contact.email}`,
  jobTitle: 'Senior Software Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Unifique Telecomunicações',
  },
  description: SITE_DESCRIPTION,
  knowsAbout: Array.from(
    new Set(portfolio.skills.categories.flatMap((category) => category.skills.map((skill) => skill.name))),
  ),
  sameAs: portfolio.contact.socialLinks
    .filter((link) => link.platform !== 'Email')
    .map((link) => link.url),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${ibmPlexSans.variable}`}>
      <body>
        <Header navItems={portfolio.nav} />
        <main>{children}</main>
        <Footer data={portfolio.footer} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
