import { Mail, Github, Linkedin, Send } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader/SectionHeader';
import { TerminalCard } from '@/components/shared/TerminalCard/TerminalCard';
import { ScrollReveal } from '@/components/shared/ScrollReveal/ScrollReveal';
import { Button } from '@/components/shared/Button/Button';
import type { Locale } from '@/i18n/config';
import { profile, type SocialId } from '@/lib/profile';
import { contactMessages } from './Contact.messages';
import styles from './Contact.module.sass';

interface ContactProps {
  locale: Locale;
}

const iconMap: Record<SocialId, React.ReactNode> = {
  github: <Github size={18} />,
  linkedin: <Linkedin size={18} />,
  email: <Mail size={18} />,
};

export function Contact({ locale }: ContactProps) {
  const t = contactMessages[locale];

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <ScrollReveal>
          <SectionHeader fileName="contact.sh" title={t.sectionTitle} />
        </ScrollReveal>

        <div className={styles.layout}>
          <ScrollReveal delay={100}>
            <TerminalCard title="contact.sh">
              <div className={styles.terminal}>
                <p className={styles.command}>{t.command}</p>
                <div className={styles.json}>
                  <span className={styles.brace}>{'{'}</span>
                  {profile.socialLinks.map((link, i) => (
                    <div key={link.id} className={styles.jsonLine}>
                      <span className={styles.key}>&quot;{link.id}&quot;</span>
                      <span className={styles.punctuation}>: </span>
                      <a
                        href={link.url}
                        target={link.id !== 'email' ? '_blank' : undefined}
                        rel={link.id !== 'email' ? 'noopener noreferrer' : undefined}
                        className={styles.value}
                      >
                        &quot;{link.username}&quot;
                      </a>
                      {i < profile.socialLinks.length - 1 && <span className={styles.punctuation}>,</span>}
                    </div>
                  ))}
                  <div className={styles.jsonLine}>
                    <span className={styles.key}>&quot;{t.statusKey}&quot;</span>
                    <span className={styles.punctuation}>: </span>
                    <span className={styles.valueString}>&quot;{t.availability}&quot;</span>
                  </div>
                  <span className={styles.brace}>{'}'}</span>
                </div>
              </div>
            </TerminalCard>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className={styles.cta}>
              <p className={styles.ctaPrompt}>{t.ctaPrompt}</p>
              <p className={styles.ctaText}>{t.ctaText}</p>
              <Button href={profile.linkedinUrl} variant="primary" external>
                <Send size={16} />
                {t.ctaButton}
              </Button>
              <div className={styles.socialRow}>
                {profile.socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target={link.id !== 'email' ? '_blank' : undefined}
                    rel={link.id !== 'email' ? 'noopener noreferrer' : undefined}
                    className={styles.socialLink}
                    aria-label={t.social[link.id]}
                  >
                    {iconMap[link.id]}
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
