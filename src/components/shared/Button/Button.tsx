import Link from 'next/link';
import styles from './Button.module.sass';

interface ButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: 'primary' | 'outline';
  external?: boolean;
}

export function Button({ children, href, variant = 'primary', external }: ButtonProps) {
  const className = `${styles.button} ${styles[variant]}`;

  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  // A bare hash is a same-document anchor; next/link adds nothing there.
  if (href.startsWith('#')) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  // Internal navigation: was a plain <a>, so every in-app Button was a full page load.
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
