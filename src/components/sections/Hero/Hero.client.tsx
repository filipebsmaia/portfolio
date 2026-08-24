'use client';

import { useState, useCallback } from 'react';
import { ArrowDown, ExternalLink } from 'lucide-react';
import { TypingEffect } from '@/components/shared/TypingEffect/TypingEffect';
import { Button } from '@/components/shared/Button/Button';
import type { HeroMessages } from './Hero.messages';
import styles from './Hero.module.sass';

// The `.client` suffix is a reading convention only - the directive above is what
// makes this a Client Component.
interface HeroIntroProps {
  messages: HeroMessages;
  modules: string[];
  kernelVersion: string;
  githubUrl: string;
}

export function HeroIntro({ messages: t, modules, kernelVersion, githubUrl }: HeroIntroProps) {
  const [nameComplete, setNameComplete] = useState(false);
  const [titleComplete, setTitleComplete] = useState(false);

  const handleNameComplete = useCallback(() => {
    setNameComplete(true);
  }, []);

  const handleTitleComplete = useCallback(() => {
    setTitleComplete(true);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.statusBar}>
          <div className={styles.status}>
            <span className={styles.statusDot} />
            <span className={styles.statusText}>
              {t.statusLabel} {t.statusText}
            </span>
          </div>
          <span className={styles.kernel}>
            {t.kernelLabel} {kernelVersion}
          </span>
        </div>

        <div className={styles.prompt}>
          <span className={styles.command}>{t.command}</span>
        </div>

        <div className={styles.intro}>
          <p className={styles.greeting}>{t.greeting}</p>
          <h1 className={styles.name}>
            <TypingEffect text={t.name} speed={70} startDelay={400} onComplete={handleNameComplete} />
          </h1>
          {nameComplete && (
            <p className={styles.title}>
              <TypingEffect text={t.title} speed={50} startDelay={200} onComplete={handleTitleComplete} />
            </p>
          )}
          {titleComplete && <p className={styles.subtitle}>{t.subtitle}</p>}
        </div>

        <div className={`${styles.modules} ${titleComplete ? styles.modulesVisible : ''}`}>
          <span className={styles.modulesLabel}>{t.modulesLabel}</span>
          <div className={styles.moduleTags}>
            {modules.map((mod) => (
              <span key={mod} className={styles.moduleTag}>
                {mod}
              </span>
            ))}
          </div>
        </div>

        <div className={`${styles.actions} ${titleComplete ? styles.actionsVisible : ''}`}>
          {/* A bare hash is same-document and already locale-safe. */}
          <Button href="#projects">
            <ArrowDown size={16} />
            {t.ctaPrimary}
          </Button>
          <Button href={githubUrl} variant="outline" external>
            {t.ctaSecondary}
            <ExternalLink size={14} />
          </Button>
        </div>
      </div>

      <div className={styles.bgGlow} />
    </section>
  );
}
