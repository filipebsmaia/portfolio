import { TerminalCard } from '@/components/shared/TerminalCard/TerminalCard';
import type { Locale } from '@/i18n/config';
import { deepDiveMessages } from './DeepDive.messages';
import { withInlineCode } from '../inlineCode';
import styles from './DeepDive.module.sass';

export interface DeepDiveData {
  id: string;
  fileName: string;
  title: string;
  problem: string;
  approach: string[];
  outcome: string;
  snippet?: { label: string; lines: string[] };
}

interface DeepDiveProps {
  dive: DeepDiveData;
  locale: Locale;
}

export function DeepDive({ dive, locale }: DeepDiveProps) {
  const t = deepDiveMessages[locale];

  return (
    <TerminalCard title={dive.fileName}>
      <div id={dive.id} className={styles.dive}>
        <h3 className={styles.title}>{dive.title}</h3>

        <p className={styles.label}>{t.problemLabel}</p>
        <p className={styles.prose}>{withInlineCode(dive.problem)}</p>

        <p className={styles.label}>{t.approachLabel}</p>
        <ul className={styles.approach}>
          {dive.approach.map((line, index) => (
            <li key={index} className={styles.approachItem}>
              {withInlineCode(line)}
            </li>
          ))}
        </ul>

        {dive.snippet && (
          <div className={styles.snippet}>
            <span className={styles.snippetLabel}>{dive.snippet.label}</span>
            <pre className={styles.snippetBody}>{dive.snippet.lines.join('\n')}</pre>
          </div>
        )}

        <p className={styles.outcome}>{withInlineCode(dive.outcome)}</p>
      </div>
    </TerminalCard>
  );
}
