import { SectionHeader } from '@/components/shared/SectionHeader/SectionHeader';
import { ScrollReveal } from '@/components/shared/ScrollReveal/ScrollReveal';
import type { ExperienceData } from '@/types';
import styles from './Experience.module.sass';

interface ExperienceProps {
  data: ExperienceData;
}

export function Experience({ data }: ExperienceProps) {
  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.container}>
        <ScrollReveal>
          <SectionHeader fileName="experience.git" title="Experience" />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className={styles.gitCommand}>$ git log --oneline</p>
        </ScrollReveal>

        <div className={styles.timeline}>
          {data.entries.map((entry, i) => (
            <ScrollReveal key={entry.hash} delay={200 + i * 100}>
              <div className={styles.entry}>
                <div className={styles.commitLine}>
                  <span className={styles.dot} />
                  <span className={styles.hash}>{entry.hash}</span>
                  <span className={styles.role}>{entry.role}</span>
                  <span className={styles.separator}>@</span>
                  <span className={styles.company}>{entry.company}</span>
                </div>
                <div className={styles.entryBody}>
                  <span className={styles.period}>{entry.period}</span>
                  <p className={styles.description}>{entry.description}</p>
                  {entry.highlights && entry.highlights.length > 0 && (
                    <ul className={styles.highlights}>
                      {entry.highlights.map((item, j) => (
                        <li key={j} className={styles.highlightItem}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className={styles.technologies}>
                    {entry.technologies.map((tech) => (
                      <span key={tech} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
