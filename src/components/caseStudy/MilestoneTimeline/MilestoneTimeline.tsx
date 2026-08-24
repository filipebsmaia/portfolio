import { withInlineCode } from '../inlineCode';
import styles from './MilestoneTimeline.module.sass';

export interface MilestoneData {
  version: string;
  date: string;
  title: string;
  description: string;
  current?: boolean;
}

interface MilestoneTimelineProps {
  milestones: MilestoneData[];
}

export function MilestoneTimeline({ milestones }: MilestoneTimelineProps) {
  return (
    <>
      <p className={styles.command}>$ git log --tags --oneline</p>
      <ol className={styles.timeline}>
        {milestones.map((milestone) => (
          <li key={milestone.version} className={`${styles.entry} ${milestone.current ? styles.current : ''}`}>
            <span className={styles.dot} />
            <div className={styles.row}>
              <span className={styles.version}>{milestone.version}</span>
              <span className={styles.date}>{milestone.date}</span>
              {milestone.current && <span className={styles.head}>HEAD -&gt; main</span>}
            </div>
            <h3 className={styles.entryTitle}>{milestone.title}</h3>
            <p className={styles.description}>{withInlineCode(milestone.description)}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
