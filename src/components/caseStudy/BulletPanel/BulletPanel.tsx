import { withInlineCode } from '../inlineCode';
import styles from './BulletPanel.module.sass';

interface BulletPanelProps {
  items: string[];
  variant?: 'default' | 'plain';
  className?: string;
}

export function BulletPanel({ items, variant = 'default', className }: BulletPanelProps) {
  return (
    <ul className={`${styles.list} ${styles[variant]} ${className ?? ''}`}>
      {items.map((item, index) => (
        // Static server-rendered list, never filtered or reordered - index is stable
        // and the text itself is translatable, so it cannot be the key.
        <li key={index} className={styles.item}>
          {withInlineCode(item)}
        </li>
      ))}
    </ul>
  );
}
