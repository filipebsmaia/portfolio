'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { localizedPath, splitLocale } from '@/i18n/navigation';
import type { NavItem } from './Header.messages';
import { LanguageSwitcher } from './LanguageSwitcher';
import styles from './Header.module.sass';

interface HeaderProps {
  navItems: readonly NavItem[];
  locale: Locale;
}

export function Header({ navItems, locale }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  // Locale-stripped, so the scroll-spy works on /pt-br as well as /.
  const { path } = splitLocale(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (path !== '/') {
      setActiveSection('');
      return;
    }

    const sections = navItems.map((item) => item.href.split('#')[1]).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' },
    );

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, [navItems, path]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href={localizedPath(locale, '/')} className={styles.logo}>
          <span className={styles.logoPrompt}>&gt;_</span>
          <span className={styles.logoText}>filipebsmaia.dev</span>
        </Link>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`} aria-label="Main navigation">
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={localizedPath(locale, item.href)}
                  className={`${styles.navLink} ${activeSection === item.href.split('#')[1] ? styles.active : ''}`}
                  onClick={handleNavClick}
                  aria-current={activeSection === item.href.split('#')[1] ? 'true' : undefined}
                >
                  {item.fileName}
                </Link>
              </li>
            ))}
            <li className={styles.langItem}>
              <LanguageSwitcher onNavigate={handleNavClick} />
            </li>
          </ul>
        </nav>

        <button
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
