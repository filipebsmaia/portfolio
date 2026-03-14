import styles from './TerminalCard.module.sass';

interface TerminalCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function TerminalCard({ title, children, className }: TerminalCardProps) {
  return (
    <div className={`${styles.card} ${className ?? ''}`}>
      <div className={styles.titleBar}>
        <div className={styles.dots}>
          <span className={styles.dot} data-color="red" />
          <span className={styles.dot} data-color="yellow" />
          <span className={styles.dot} data-color="green" />
        </div>
        <span className={styles.fileName}>{title}</span>
        <div className={styles.spacer} />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
