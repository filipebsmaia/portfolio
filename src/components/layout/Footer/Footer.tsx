import { Github, Linkedin, Mail } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { fmt } from '@/lib/fmt';
import { profile, type SocialId } from '@/lib/profile';
import { builtWith, footerMessages } from './Footer.messages';
import styles from './Footer.module.sass';

interface FooterProps {
  locale: Locale;
}

const iconMap: Record<SocialId, React.ReactNode> = {
  github: <Github size={18} />,
  linkedin: <Linkedin size={18} />,
  email: <Mail size={18} />,
};

export function Footer({ locale }: FooterProps) {
  const t = footerMessages[locale];
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.exit}>
          {/* A literal function call, not copy. */}
          <span className={styles.prompt}>&gt;</span> process.exit(0)
          <span className={styles.muted}> - {t.sessionEnded}</span>
        </p>

        <div className={styles.links}>
          {profile.socialLinks.map((link) => {
            const external = link.id !== 'email';
            return (
              <a
                key={link.id}
                href={link.url}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                aria-label={t.social[link.id]}
              >
                {iconMap[link.id]}
              </a>
            );
          })}
        </div>

        <p className={styles.builtWith}>{fmt(t.builtWith, { stack: builtWith.join(', ') })}</p>

        <p className={styles.copyright}>&copy; {year} Filipe Maia</p>
      </div>
    </footer>
  );
}
