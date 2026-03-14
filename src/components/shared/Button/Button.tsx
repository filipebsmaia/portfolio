import styles from './Button.module.sass';

interface ButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: 'primary' | 'outline';
  external?: boolean;
}

export function Button({ children, href, variant = 'primary', external }: ButtonProps) {
  const externalProps = external ? { target: '_blank' as const, rel: 'noopener noreferrer' } : {};

  return (
    <a href={href} className={`${styles.button} ${styles[variant]}`} {...externalProps}>
      {children}
    </a>
  );
}
