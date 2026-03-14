import { Github, Linkedin, Mail } from 'lucide-react';
import type { FooterData } from '@/types';
import styles from './Footer.module.sass';

interface FooterProps {
  data: FooterData;
}

export function Footer({ data }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.exit}>
          <span className={styles.prompt}>&gt;</span> process.exit(0)
          <span className={styles.muted}> - Session terminated.</span>
        </p>

        <div className={styles.links}>
          <a href="https://github.com/filipebsmaia" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com/in/filipebsmaia" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
          <a href="mailto:filipebsmaia@gmail.com" aria-label="Email">
            <Mail size={18} />
          </a>
        </div>

        <p className={styles.builtWith}>Built with {data.builtWith.join(', ')}</p>

        <p className={styles.copyright}>&copy; {year} Filipe Maia</p>
      </div>
    </footer>
  );
}
