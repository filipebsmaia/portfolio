import { SectionHeader } from '@/components/shared/SectionHeader/SectionHeader';
import { ScrollReveal } from '@/components/shared/ScrollReveal/ScrollReveal';
import type { Locale } from '@/i18n/config';
import { experienceEntries } from './Experience.data';
import { experienceMessages } from './Experience.messages';
import styles from './Experience.module.sass';

export function Experience({ locale }: { locale: Locale }) {
  const t = experienceMessages[locale];

  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.container}>
        <ScrollReveal>
          <SectionHeader fileName="experience.git" title={t.sectionTitle} />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className={styles.gitCommand}>{t.command}</p>
        </ScrollReveal>

        <div className={styles.timeline}>
          {experienceEntries.map((entry, i) => {
            const copy = t.entries[entry.id];
            return (
              <ScrollReveal key={entry.hash} delay={200 + i * 100}>
                <div className={styles.entry}>
                  <div className={styles.commitLine}>
                    <span className={styles.dot} />
                    <span className={styles.hash}>{entry.hash}</span>
                    <span className={styles.role}>{copy.role}</span>
                    <span className={styles.separator}>@</span>
                    <span className={styles.company}>{entry.company}</span>
                  </div>
                  <div className={styles.entryBody}>
                    <span className={styles.period}>{copy.period}</span>
                    <p className={styles.description}>{copy.description}</p>
                    {copy.highlights.length > 0 && (
                      <ul className={styles.highlights}>
                        {copy.highlights.map((item, j) => (
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
