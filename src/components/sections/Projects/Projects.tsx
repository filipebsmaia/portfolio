import { ExternalLink } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader/SectionHeader';
import { ScrollReveal } from '@/components/shared/ScrollReveal/ScrollReveal';
import { ProjectCard } from '@/components/project/ProjectCard/ProjectCard';
import { projectCardMessages } from '@/components/project/ProjectCard/ProjectCard.messages';
import type { Locale } from '@/i18n/config';
import { githubProfileUrl, projects } from './Projects.data';
import { projectsMessages } from './Projects.messages';
import styles from './Projects.module.sass';

export function Projects({ locale }: { locale: Locale }) {
  const t = projectsMessages[locale];
  const card = projectCardMessages[locale];
  const featured = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        <ScrollReveal>
          <SectionHeader fileName="projects/" title={t.sectionTitle} />
        </ScrollReveal>

        <div className={styles.grid}>
          {featured.map((project, i) => (
            <ScrollReveal key={project.id} delay={100 + i * 100} className={styles.gridItem}>
              <ProjectCard project={project} description={t.descriptions[project.id]} locale={locale} />
            </ScrollReveal>
          ))}
        </div>

        {others.length > 0 && (
          <>
            <ScrollReveal delay={400}>
              <h3 className={styles.othersTitle}>{t.olderTitle}</h3>
            </ScrollReveal>
            <div className={styles.otherGrid}>
              {others.map((project, i) => (
                <ScrollReveal key={project.id} delay={450 + i * 80}>
                  <a
                    href={project.githubUrl || project.demoUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.otherCard}
                  >
                    <div className={styles.otherHeader}>
                      <span className={styles.languageDot} style={{ background: project.languageColor }} />
                      <span className={styles.otherName}>{project.name}</span>
                    </div>
                    <p className={styles.otherDesc}>{t.descriptions[project.id]}</p>
                    <div className={styles.techTags}>
                      {project.inProduction && (
                        <span className={`${styles.tag} ${styles.tagHighlight}`}>{card.inProduction}</span>
                      )}
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className={styles.tag}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </>
        )}

        <ScrollReveal delay={600}>
          <div className={styles.viewAll}>
            <a href={githubProfileUrl} target="_blank" rel="noopener noreferrer" className={styles.viewAllLink}>
              {t.viewAll}
              <ExternalLink size={14} />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
