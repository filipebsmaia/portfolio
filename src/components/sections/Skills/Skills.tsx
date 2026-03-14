import { SectionHeader } from '@/components/shared/SectionHeader/SectionHeader';
import { ScrollReveal } from '@/components/shared/ScrollReveal/ScrollReveal';
import type { SkillsData, SkillProficiency } from '@/types';
import styles from './Skills.module.sass';

interface SkillsProps {
  data: SkillsData;
}

function ProficiencyBar({ level }: { level: SkillProficiency }) {
  const bars: Record<SkillProficiency, number> = {
    expert: 5,
    advanced: 4,
    intermediate: 3,
  };
  const filled = bars[level];
  const total = 5;

  return (
    <span className={styles.bar}>
      [{'='.repeat(filled)}
      {'‎ '.repeat(total - filled)}]
    </span>
  );
}

function pad(str: string, length: number) {
  return str + ' '.repeat(Math.max(0, length - str.length));
}

export function Skills({ data }: SkillsProps) {
  let globalIndex = 0;

  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        <ScrollReveal>
          <SectionHeader fileName="skills.json" title="Skills" />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className={styles.loadingHeader}>
            <span className={styles.prompt}>&gt; Loading modules...</span>
          </div>
        </ScrollReveal>

        <div className={styles.categories}>
          {data.categories.map((category) => (
            <div key={category.id} className={styles.category}>
              <ScrollReveal delay={150 + globalIndex * 30}>
                <p className={styles.categoryLabel}>[{category.label.toLowerCase()}]</p>
              </ScrollReveal>
              <div className={styles.skillsList}>
                {category.skills.map((skill) => {
                  const delay = 200 + globalIndex++ * 40;
                  const moduleName = `${category.prefix}.${skill.name.toLowerCase().replace(/[\s/]+/g, '-')}`;
                  return (
                    <ScrollReveal key={skill.name} delay={delay}>
                      <div className={styles.skillLine}>
                        <span className={styles.loaded}>loaded</span>
                        <span className={styles.moduleName}>{pad(moduleName, 28)}</span>
                        <ProficiencyBar level={skill.proficiency} />
                        <span className={styles.level}>{skill.proficiency}</span>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
