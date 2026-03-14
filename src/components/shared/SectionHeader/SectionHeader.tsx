import styles from './SectionHeader.module.sass';

interface SectionHeaderProps {
  fileName: string;
  title: string;
}

export function SectionHeader({ fileName, title }: SectionHeaderProps) {
  return (
    <div className={styles.header}>
      <span className={styles.path}>~/portfolio/{fileName}</span>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.divider} />
    </div>
  );
}
