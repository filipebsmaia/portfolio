'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { commonMessages } from '@/i18n/common.messages';
import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE, type Locale, locales, segmentFor } from '@/i18n/config';
import { useLocale } from '@/i18n/LocaleProvider';
import { localizedPath, splitLocale } from '@/i18n/navigation';
import styles from './LanguageSwitcher.module.sass';

/**
 * Written client-side rather than by the proxy: a Set-Cookie on otherwise
 * cacheable HTML stops shared caches from storing it. Synchronous, so the cookie
 * is already in place before the router starts navigating.
 */
function rememberLocale(locale: Locale) {
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
}

interface LanguageSwitcherProps {
  onNavigate?: () => void;
}

export function LanguageSwitcher({ onNavigate }: LanguageSwitcherProps) {
  const active = useLocale();
  const pathname = usePathname();
  // usePathname reports the browser URL, not the proxy's internal rewrite, so
  // this is the real current path in both locales.
  const { path } = splitLocale(pathname);

  return (
    <div className={styles.switcher} role="group" aria-label={commonMessages[active].languageSwitcher.label}>
      {locales.map((locale, index) => (
        <span key={locale} className={styles.slot}>
          {index > 0 && (
            <span className={styles.separator} aria-hidden="true">
              |
            </span>
          )}
          <Link
            href={localizedPath(locale, path)}
            hrefLang={locale}
            lang={locale}
            className={`${styles.option} ${locale === active ? styles.active : ''}`}
            aria-current={locale === active ? 'true' : undefined}
            onClick={() => {
              rememberLocale(locale);
              onNavigate?.();
            }}
          >
            {segmentFor(locale)}
          </Link>
        </span>
      ))}
    </div>
  );
}
