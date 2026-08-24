import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';

import { SectionHeader } from '@/components/shared/SectionHeader/SectionHeader';
import { ScrollReveal } from '@/components/shared/ScrollReveal/ScrollReveal';
import { ProjectCard } from '@/components/project/ProjectCard/ProjectCard';
import { githubProfileUrl, projects } from '@/components/sections/Projects/Projects.data';
import { projectsMessages } from '@/components/sections/Projects/Projects.messages';
import { defaultLocale, localeFromSegment, openGraphAlternateLocales, openGraphLocale } from '@/i18n/config';
import { alternatesFor, hrefFor, localizedPath, ogImagesFor } from '@/i18n/navigation';
import { SITE_NAME } from '@/lib/site';
import { projectsPageMessages } from './page.messages';
import styles from './page.module.sass';

const PATH = '/projects';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = localeFromSegment((await params).locale) ?? defaultLocale;
  const copy = projectsPageMessages[locale];
  const title = `${copy.title} | ${SITE_NAME}`;

  return {
    title: copy.title,
    description: copy.description,
    alternates: alternatesFor(locale, PATH),
    openGraph: {
      type: 'website',
      locale: openGraphLocale[locale],
      alternateLocale: openGraphAlternateLocales[locale],
      siteName: SITE_NAME,
      url: localizedPath(locale, PATH),
      title,
      description: copy.description,
      images: ogImagesFor(locale, `${PATH}/opengraph-image`, copy.title),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: copy.description,
      images: ogImagesFor(locale, `${PATH}/twitter-image`, copy.title),
    },
  };
}

export default async function ProjectsPage({ params }: PageProps) {
  const locale = localeFromSegment((await params).locale) ?? defaultLocale;
  const copy = projectsPageMessages[locale];
  const href = hrefFor(locale);
  const descriptions = projectsMessages[locale].descriptions;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href={href('/')} className={styles.breadcrumbLink}>
            ~
          </Link>
          <span>/</span>
          <span className={styles.breadcrumbCurrent}>{copy.breadcrumbCurrent}</span>
        </nav>

        <SectionHeader fileName="projects/" title={copy.title} />

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 60} className={styles.gridItem}>
              <ProjectCard project={project} description={descriptions[project.id]} locale={locale} headingLevel={2} />
            </ScrollReveal>
          ))}
        </div>

        <div className={styles.viewAll}>
          <a href={githubProfileUrl} target="_blank" rel="noopener noreferrer" className={styles.viewAllLink}>
            {copy.viewAll}
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
