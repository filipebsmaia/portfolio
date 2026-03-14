import { Mail, Github, Linkedin, Send } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader/SectionHeader';
import { TerminalCard } from '@/components/shared/TerminalCard/TerminalCard';
import { ScrollReveal } from '@/components/shared/ScrollReveal/ScrollReveal';
import { Button } from '@/components/shared/Button/Button';
import type { ContactData } from '@/types';
import styles from './Contact.module.sass';

interface ContactProps {
  data: ContactData;
}

const iconMap: Record<string, React.ReactNode> = {
  Github: <Github size={18} />,
  Linkedin: <Linkedin size={18} />,
  Mail: <Mail size={18} />,
};

export function Contact({ data }: ContactProps) {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <ScrollReveal>
          <SectionHeader fileName="contact.exe" title="Contact" />
        </ScrollReveal>

        <div className={styles.layout}>
          <ScrollReveal delay={100}>
            <TerminalCard title="contact.exe">
              <div className={styles.terminal}>
                <p className={styles.command}>$ cat contact.json</p>
                <div className={styles.json}>
                  <span className={styles.brace}>{'{'}</span>
                  <div className={styles.jsonLine}>
                    <span className={styles.key}>&quot;email&quot;</span>
                    <span className={styles.punctuation}>: </span>
                    <a href={`mailto:${data.email}`} className={styles.value}>
                      &quot;{data.email}&quot;
                    </a>
                    <span className={styles.punctuation}>,</span>
                  </div>
                  {data.socialLinks.map((link, i) => (
                    <div key={link.platform} className={styles.jsonLine}>
                      <span className={styles.key}>&quot;{link.platform.toLowerCase()}&quot;</span>
                      <span className={styles.punctuation}>: </span>
                      <a
                        href={link.url}
                        target={link.platform !== 'Email' ? '_blank' : undefined}
                        rel={link.platform !== 'Email' ? 'noopener noreferrer' : undefined}
                        className={styles.value}
                      >
                        &quot;{link.username}&quot;
                      </a>
                      {i < data.socialLinks.length - 1 && <span className={styles.punctuation}>,</span>}
                    </div>
                  ))}
                  <div className={styles.jsonLine}>
                    <span className={styles.key}>&quot;status&quot;</span>
                    <span className={styles.punctuation}>: </span>
                    <span className={styles.valueString}>&quot;{data.availability}&quot;</span>
                  </div>
                  <span className={styles.brace}>{'}'}</span>
                </div>
              </div>
            </TerminalCard>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className={styles.cta}>
              <p className={styles.ctaPrompt}>$ send-message --to filipe</p>
              <p className={styles.ctaText}>Have a project in mind or want to chat? Feel free to reach out.</p>
              <Button href={data.linkedinUrl} variant="primary" external>
                <Send size={16} />
                Get In Touch
              </Button>
              <div className={styles.socialRow}>
                {data.socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target={link.platform !== 'Email' ? '_blank' : undefined}
                    rel={link.platform !== 'Email' ? 'noopener noreferrer' : undefined}
                    className={styles.socialLink}
                    aria-label={link.platform}
                  >
                    {iconMap[link.icon]}
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
