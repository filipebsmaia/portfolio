'use client';

import { useState, useCallback } from 'react';
import { ArrowDown, ExternalLink } from 'lucide-react';
import { TypingEffect } from '@/components/shared/TypingEffect/TypingEffect';
import { Button } from '@/components/shared/Button/Button';
import type { HeroData } from '@/types';
import styles from './Hero.module.sass';

interface HeroProps {
  data: HeroData;
}

export function Hero({ data }: HeroProps) {
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
            <span className={styles.statusText}>STATUS: {data.statusText}</span>
          </div>
          <span className={styles.kernel}>SYSTEM.KERNEL :: {data.kernelVersion}</span>
        </div>

        <div className={styles.prompt}>
          <span className={styles.command}>$ whoami</span>
        </div>

        <div className={styles.intro}>
          <p className={styles.greeting}>{data.greeting}</p>
          <h1 className={styles.name}>
            <TypingEffect text={data.name} speed={70} startDelay={400} onComplete={handleNameComplete} />
          </h1>
          {nameComplete && (
            <p className={styles.title}>
              <TypingEffect text={data.title} speed={50} startDelay={200} onComplete={handleTitleComplete} />
            </p>
          )}
          {titleComplete && <p className={styles.subtitle}>{data.subtitle}</p>}
        </div>

        <div className={`${styles.modules} ${titleComplete ? styles.modulesVisible : ''}`}>
          <span className={styles.modulesLabel}>Main modules:</span>
          <div className={styles.moduleTags}>
            {data.modules.map((mod) => (
              <span key={mod} className={styles.moduleTag}>
                {mod}
              </span>
            ))}
          </div>
        </div>

        <div className={`${styles.actions} ${titleComplete ? styles.actionsVisible : ''}`}>
          <Button href={data.cta.primary.href}>
            <ArrowDown size={16} />
            {data.cta.primary.label}
          </Button>
          <Button href={data.cta.secondary.href} variant="outline" external>
            {data.cta.secondary.label}
            <ExternalLink size={14} />
          </Button>
        </div>
      </div>

      <div className={styles.bgGlow} />
    </section>
  );
}
