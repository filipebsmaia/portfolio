import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Globe } from 'lucide-react';
import type { Metadata } from 'next';

import { BulletPanel } from '@/components/caseStudy/BulletPanel/BulletPanel';
import { CaseStudySection } from '@/components/caseStudy/CaseStudySection/CaseStudySection';
import { DeepDive } from '@/components/caseStudy/DeepDive/DeepDive';
import { FlowSteps } from '@/components/caseStudy/FlowSteps/FlowSteps';
import { MilestoneTimeline } from '@/components/caseStudy/MilestoneTimeline/MilestoneTimeline';
import { StatGrid } from '@/components/caseStudy/StatGrid/StatGrid';
import { withInlineCode } from '@/components/caseStudy/inlineCode';
import { Button } from '@/components/shared/Button/Button';
import { ScrollReveal } from '@/components/shared/ScrollReveal/ScrollReveal';
import { caseStudySlugs, getCaseStudy } from './content';
import { defaultLocale, localeFromSegment, openGraphAlternateLocales, openGraphLocale } from '@/i18n/config';
import { commonMessages } from '@/i18n/common.messages';
import { absoluteUrl, alternatesFor, hrefFor, localizedPath, ogImagesFor } from '@/i18n/navigation';
import { fmt } from '@/lib/fmt';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import { caseStudyPageMessages } from './page.messages';
import styles from './page.module.sass';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// Hoisted: this was duplicated in generateMetadata and the component body.
function caseStudyPath(slug: string) {
  return `/projects/${slug}`;
}

// The slug set is closed. Without this, an unknown slug renders on demand and
// calls notFound(), which has no boundary to land in: [locale]/layout.tsx is the
// root layout, so the only not-found Next resolves is app/not-found.tsx.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: segment, slug } = await params;
  const locale = localeFromSegment(segment) ?? defaultLocale;
  const study = getCaseStudy(slug, locale);

  if (!study) {
    return {};
  }

  const path = caseStudyPath(study.slug);
  const title = `${study.seo.title} | ${SITE_NAME}`;

  return {
    title: study.seo.title,
    description: study.seo.description,
    keywords: [...study.seo.keywords],
    alternates: alternatesFor(locale, path),
    openGraph: {
      type: 'article',
      locale: openGraphLocale[locale],
      alternateLocale: openGraphAlternateLocales[locale],
      siteName: SITE_NAME,
      url: localizedPath(locale, path),
      title,
      description: study.seo.description,
      images: ogImagesFor(locale, `${path}/opengraph-image`, study.name),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: study.seo.description,
      images: ogImagesFor(locale, `${path}/twitter-image`, study.name),
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { locale: segment, slug } = await params;
  const locale = localeFromSegment(segment) ?? defaultLocale;
  const study = getCaseStudy(slug, locale);

  if (!study) {
    notFound();
  }

  const path = caseStudyPath(study.slug);
  const copy = caseStudyPageMessages[locale];
  const crumbs = commonMessages[locale].breadcrumb;
  const href = hrefFor(locale);

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: study.name,
    url: study.siteUrl,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web',
    inLanguage: 'pt-BR',
    description: study.seo.description,
    author: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
    mainEntityOfPage: absoluteUrl(SITE_URL, locale, path),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: crumbs.home, item: absoluteUrl(SITE_URL, locale, '/') },
      { '@type': 'ListItem', position: 2, name: crumbs.projects, item: absoluteUrl(SITE_URL, locale, '/projects') },
      { '@type': 'ListItem', position: 3, name: study.name, item: absoluteUrl(SITE_URL, locale, path) },
    ],
  };

  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href={href('/')} className={styles.breadcrumbLink}>
            ~
          </Link>
          <span>/</span>
          <Link href={href('/projects')} className={styles.breadcrumbLink}>
            {copy.breadcrumbProjects}
          </Link>
          <span>/</span>
          <span className={styles.breadcrumbCurrent}>{study.slug}</span>
        </nav>

        <div className={styles.titleRow}>
          <span className={styles.languageDot} style={{ background: study.languageColor }} />
          <span className={styles.language}>{study.language}</span>
          <span className={styles.statusBadge}>{study.status}</span>
        </div>

        <h1 className={styles.name}>{study.name}</h1>
        <p className={styles.tagline}>{study.tagline}</p>

        <div className={styles.meta}>
          <span>{study.role}</span>
          <span className={styles.metaSeparator}>·</span>
          <span>{study.period}</span>
          <span className={styles.metaSeparator}>·</span>
          <span>{study.sourceNote}</span>
        </div>

        <div className={styles.ctas}>
          <Button href={study.siteUrl} external>
            <Globe size={15} />
            {fmt(copy.visitSite, { name: study.name })}
          </Button>
          <Button href={href('/#projects')} variant="outline">
            <ArrowLeft size={15} />
            {copy.allProjects}
          </Button>
        </div>

        <StatGrid stats={study.stats} asOf={study.statsAsOf} />
      </header>

      <CaseStudySection id="overview" fileName={`projects/${study.slug}/overview.md`} title={study.sections.overview}>
        {study.summary.map((paragraph, index) => (
          <p key={index} className={styles.prose}>
            {paragraph}
          </p>
        ))}
        <ScrollReveal delay={100}>
          <BulletPanel items={study.highlights} className={styles.highlights} />
        </ScrollReveal>
      </CaseStudySection>

      <CaseStudySection
        id="architecture"
        fileName={`projects/${study.slug}/architecture.md`}
        title={study.sections.architecture}
        intro={study.architecture.intro}
      >
        <ScrollReveal delay={100}>
          <figure className={styles.figure}>
            <div className={styles.figureFrame}>
              <Image
                src={study.architecture.diagram.src}
                alt={study.architecture.diagram.alt}
                sizes="(min-width: 1024px) 900px, 100vw"
                placeholder="blur"
                className={styles.image}
              />
            </div>
            <figcaption className={styles.caption}>{study.architecture.diagram.caption}</figcaption>
          </figure>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <ol className={styles.layers}>
            {study.architecture.layers.map((layer) => (
              <li key={layer.id} className={styles.layer}>
                <div className={styles.layerHead}>
                  <span className={styles.layerLabel}>{layer.label}</span>
                  <h3 className={styles.layerTitle}>{layer.title}</h3>
                </div>
                <ul className={styles.layerItems}>
                  {layer.items.map((item, index) => (
                    <li key={index} className={styles.layerItem}>
                      {withInlineCode(item)}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </CaseStudySection>

      <CaseStudySection
        id="provisioning"
        fileName={`projects/${study.slug}/provisioning.md`}
        title={study.sections.provisioning}
        intro={study.flow.intro}
      >
        <ScrollReveal delay={100}>
          <FlowSteps steps={study.flow.steps} />
        </ScrollReveal>
      </CaseStudySection>

      <CaseStudySection
        id="sky"
        fileName={`projects/${study.slug}/sky.md`}
        title={study.sections.sky}
        intro={study.sky.intro}
      >
        {study.sky.blocks.map((block, index) => (
          <ScrollReveal key={block.id} delay={100 + index * 50}>
            <div id={block.id} className={styles.subBlock}>
              <p className={styles.subTitle}>{block.label}</p>
              <p className={styles.prose}>{block.intro}</p>
              <BulletPanel items={block.points} />
            </div>
          </ScrollReveal>
        ))}
      </CaseStudySection>

      <CaseStudySection
        id="engineering"
        fileName={`projects/${study.slug}/engineering.md`}
        title={study.sections.engineering}
        intro={study.engineering.intro}
      >
        <div className={styles.dives}>
          {study.engineering.deepDives.map((dive, index) => (
            <ScrollReveal key={dive.id} delay={100 + index * 60}>
              <DeepDive dive={dive} locale={locale} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={100}>
          <div className={styles.smallerFixes}>
            <p className={styles.smallerFixesTitle}>{copy.smallerFixesCommand}</p>
            <div className={styles.fixList}>
              {study.engineering.smallerFixes.map((fix) => (
                <div key={fix.id} className={styles.fixCard}>
                  <h3 className={styles.fixTitle}>{fix.title}</h3>
                  <p className={styles.fixDetail}>{withInlineCode(fix.detail)}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </CaseStudySection>

      <CaseStudySection id="operations" fileName={`projects/${study.slug}/operations.md`} title={study.sections.operations}>
        <ScrollReveal delay={100}>
          <div className={styles.subBlock}>
            <p className={styles.subTitle}>{copy.observabilityLabel}</p>
            <p className={styles.prose}>{study.observability.intro}</p>
            <figure className={styles.figure}>
              <div className={styles.figureFrame}>
                <Image
                  src={study.observability.screenshot.src}
                  alt={study.observability.screenshot.alt}
                  sizes="(min-width: 1024px) 900px, 100vw"
                  placeholder="blur"
                  className={styles.image}
                />
              </div>
              <figcaption className={styles.caption}>{study.observability.screenshot.caption}</figcaption>
            </figure>
            <div className={styles.subBlock}>
              <BulletPanel items={study.observability.covers} />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className={styles.subBlock}>
            <p className={styles.subTitle}>{copy.securityLabel}</p>
            <p className={styles.prose}>{study.security.intro}</p>
            <BulletPanel items={study.security.measures} />
          </div>
        </ScrollReveal>
      </CaseStudySection>

      <CaseStudySection
        id="incidents"
        fileName={`projects/${study.slug}/incidents.md`}
        title={study.sections.incidents}
        intro={study.incidents.intro}
      >
        <ScrollReveal delay={100}>
          <div className={styles.incidents}>
            {study.incidents.items.map((incident) => (
              <div key={incident.id} className={styles.incidentCard}>
                <h3 className={styles.incidentTitle}>{incident.title}</h3>
                <p className={styles.incidentImpact}>{incident.impact}</p>
                <p className={styles.incidentLesson}>{incident.lesson}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className={styles.subBlock}>
            <p className={styles.subTitle}>{copy.stillOpenLabel}</p>
            <BulletPanel items={study.incidents.openQuestions} />
          </div>
        </ScrollReveal>
      </CaseStudySection>

      <CaseStudySection id="timeline" fileName={`projects/${study.slug}/timeline.md`} title={study.sections.timeline}>
        <ScrollReveal delay={100}>
          <MilestoneTimeline milestones={study.timeline} />
        </ScrollReveal>
      </CaseStudySection>

      <CaseStudySection id="stack" fileName={`projects/${study.slug}/stack.md`} title={study.sections.stack}>
        <ScrollReveal delay={100}>
          <dl className={styles.stack}>
            {study.stack.map((group) => (
              <div key={group.label} className={styles.stackGroup}>
                <dt className={styles.stackLabel}>{group.label}</dt>
                <dd className={styles.stackItems}>
                  {group.items.map((item) => (
                    <span key={item} className={styles.chip}>
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>
      </CaseStudySection>

      <footer className={styles.footer}>
        <Link href={href('/#projects')} className={styles.backLink}>
          <ArrowLeft size={15} />
          {copy.backToProjects}
        </Link>
        <Button href={study.siteUrl} external>
          <Globe size={15} />
          {fmt(copy.visitSite, { name: study.name })}
        </Button>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </article>
  );
}
