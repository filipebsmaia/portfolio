'use client';

import { useEffect, useState } from 'react';
import styles from './TypingEffect.module.sass';

interface TypingEffectProps {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3';
  onComplete?: () => void;
}

export function TypingEffect({
  text,
  speed = 50,
  startDelay = 0,
  className,
  as: Tag = 'span',
  onComplete,
}: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setIsTyping(true);
    }, startDelay);

    return () => clearTimeout(delayTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!isTyping) {
      return;
    }

    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else {
      setIsDone(true);
      onComplete?.();
    }
  }, [isTyping, displayedText, text, speed, onComplete]);

  return (
    <Tag className={`${styles.typing} ${className ?? ''}`}>
      {displayedText}
      {!isDone && <span className={styles.cursor}>|</span>}
    </Tag>
  );
}
