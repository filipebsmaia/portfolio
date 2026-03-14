import { ExternalLink, Github, Globe } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader/SectionHeader';
import { TerminalCard } from '@/components/shared/TerminalCard/TerminalCard';
import { ScrollReveal } from '@/components/shared/ScrollReveal/ScrollReveal';
import type { ProjectsData } from '@/types';
import styles from './Projects.module.sass';

interface ProjectsProps {
  data: ProjectsData;
}

export function Projects({ data }: ProjectsProps) {
  const featured = data.items.filter((p) => p.featured);
  const others = data.items.filter((p) => !p.featured);

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        <ScrollReveal>
          <SectionHeader fileName="projects/" title="Projects" />
        </ScrollReveal>

        <div className={styles.grid}>
          {featured.map((project, i) => (
            <ScrollReveal key={project.name} delay={100 + i * 100} className={styles.gridItem}>
              <TerminalCard title={project.name.toLowerCase().replace(/\s+/g, '-')}>
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <span className={styles.languageDot} style={{ background: project.languageColor }} />
                    <span className={styles.language}>{project.language}</span>
                    {!project.githubUrl && <span className={styles.privateBadge}>private</span>}
                  </div>
                  <h3 className={styles.projectName}>{project.name}</h3>
                  <p className={styles.projectDesc}>{project.description}</p>
                  <div className={styles.techTags}>
                    {project.technologies.map((tech) => (
                      <span key={tech} className={`${styles.tag} ${tech === 'In Production' ? styles.tagHighlight : ''}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className={styles.cardFooter}>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.repoLink}
                        aria-label={`View ${project.name} on GitHub`}
                      >
                        <Github size={15} />
                        <span>View Repo</span>
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.repoLink}
                        aria-label={`View ${project.name} demo`}
                      >
                        <Globe size={15} />
                        <span>Visit Site</span>
                      </a>
                    )}
                  </div>
                </div>
              </TerminalCard>
            </ScrollReveal>
          ))}
        </div>

        {others.length > 0 && (
          <>
            <ScrollReveal delay={400}>
              <h3 className={styles.othersTitle}>Old Projects</h3>
            </ScrollReveal>
            <div className={styles.otherGrid}>
              {others.map((project, i) => (
                <ScrollReveal key={project.name} delay={450 + i * 80}>
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
                    <p className={styles.otherDesc}>{project.description}</p>
                    <div className={styles.techTags}>
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className={`${styles.tag} ${tech === 'In Production' ? styles.tagHighlight : ''}`}>
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
            <a href={data.githubProfileUrl} target="_blank" rel="noopener noreferrer" className={styles.viewAllLink}>
              View All Repositories
              <ExternalLink size={14} />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
