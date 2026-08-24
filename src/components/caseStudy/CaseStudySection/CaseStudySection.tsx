import { SectionHeader } from '@/components/shared/SectionHeader/SectionHeader';
import { ScrollReveal } from '@/components/shared/ScrollReveal/ScrollReveal';
import styles from './CaseStudySection.module.sass';

interface CaseStudySectionProps {
  id: string;
  fileName: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}

export function CaseStudySection({ id, fileName, title, intro, children }: CaseStudySectionProps) {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal>
          <SectionHeader fileName={fileName} title={title} />
          {intro && <p className={styles.intro}>{intro}</p>}
        </ScrollReveal>
        {children}
      </div>
    </section>
  );
}
