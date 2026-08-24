import Link from 'next/link';
import { FileText, Github, Globe } from 'lucide-react';
import { TerminalCard } from '@/components/shared/TerminalCard/TerminalCard';
import type { ProjectRecord } from '@/components/sections/Projects/Projects.data';
import type { Locale } from '@/i18n/config';
import { localizedPath } from '@/i18n/navigation';
import { fmt } from '@/lib/fmt';
import { projectCardMessages } from './ProjectCard.messages';
import styles from './ProjectCard.module.sass';

interface ProjectCardProps {
  project: ProjectRecord;
  description: string;
  locale: Locale;
  /** The home section sits under an <h2>, the /projects index under an <h1>. */
  headingLevel?: 2 | 3;
}

export function ProjectCard({ project, description, locale, headingLevel = 3 }: ProjectCardProps) {
  const t = projectCardMessages[locale];
  const Heading = headingLevel === 2 ? 'h2' : 'h3';

  return (
    <TerminalCard title={project.name.toLowerCase().replace(/\s+/g, '-')}>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <span className={styles.languageDot} style={{ background: project.languageColor }} />
          <span className={styles.language}>{project.language}</span>
          {!project.githubUrl && <span className={styles.privateBadge}>{t.privateBadge}</span>}
        </div>

        <Heading className={styles.projectName}>{project.name}</Heading>
        <p className={styles.projectDesc}>{description}</p>

        <div className={styles.techTags}>
          {project.inProduction && <span className={`${styles.tag} ${styles.tagHighlight}`}>{t.inProduction}</span>}
          {project.technologies.map((tech) => (
            <span key={tech} className={styles.tag}>
              {tech}
            </span>
          ))}
        </div>

        <div className={styles.cardFooter}>
          {project.caseStudySlug && (
            <Link
              href={localizedPath(locale, `/projects/${project.caseStudySlug}`)}
              className={`${styles.repoLink} ${styles.caseStudyLink}`}
              aria-label={fmt(t.caseStudyAria, { name: project.name })}
            >
              <FileText size={15} />
              <span>{t.caseStudy}</span>
            </Link>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.repoLink}
              aria-label={fmt(t.viewRepoAria, { name: project.name })}
            >
              <Github size={15} />
              <span>{t.viewRepo}</span>
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.repoLink}
              aria-label={fmt(t.visitSiteAria, { name: project.name })}
            >
              <Globe size={15} />
              <span>{t.visitSite}</span>
            </a>
          )}
        </div>
      </div>
    </TerminalCard>
  );
}
