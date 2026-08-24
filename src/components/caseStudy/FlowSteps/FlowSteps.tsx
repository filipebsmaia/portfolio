import { withInlineCode } from '../inlineCode';
import styles from './FlowSteps.module.sass';

export interface FlowStepData {
  id: string;
  actor: string;
  title: string;
  detail: string;
}

interface FlowStepsProps {
  steps: FlowStepData[];
}

export function FlowSteps({ steps }: FlowStepsProps) {
  return (
    <ol className={styles.flow}>
      {steps.map((step, index) => (
        <li key={step.id} className={styles.step}>
          <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
          <div className={styles.body}>
            <div className={styles.head}>
              <span className={styles.actor}>{step.actor}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
            </div>
            <p className={styles.detail}>{withInlineCode(step.detail)}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
