import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Filipe Maia | Software Engineer',
  description:
    'Fullstack developer passionate about TypeScript, Java, React, Node.js, Clean Architecture, and Domain-Driven Design.',
  keywords: [
    'Software Engineer',
    'Fullstack Developer',
    'TypeScript',
    'React',
    'Node.js',
    'Java',
    'Clean Architecture',
    'DDD',
  ],
  authors: [{ name: 'Filipe Maia' }],
  openGraph: {
    title: 'Filipe Maia | Software Engineer',
    description: 'Fullstack developer passionate about building scalable and well-architected software.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${ibmPlexSans.variable}`}>
      <body>
        <Header navItems={portfolio.nav} />
        <main>{children}</main>
        <Footer data={portfolio.footer} />
      </body>
    </html>
  );
}
