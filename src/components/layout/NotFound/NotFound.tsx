'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { commonMessages } from '@/i18n/common.messages';
import { defaultLocale, type Locale } from '@/i18n/config';
import { localizedPath, splitLocale } from '@/i18n/navigation';
import styles from './NotFound.module.sass';

/**
 * The site's only 404. It renders from `app/not-found.tsx`, outside the locale
 * layout - with `[locale]/layout.tsx` acting as the root layout, that is the only
 * not-found boundary Next resolves.
 *
 * Locale therefore comes from the URL. It is resolved after mount rather than
 * during render because this page is prerendered once and served for every 404,
 * so the server HTML cannot know the language - reading the path during render
 * would make the first client render disagree with it.
 *
 * The shell half stays English on purpose: bash under LANG=C prints English, and
 * `cd /requested-page` is what the visitor would have typed.
 */
export function NotFoundTerminal() {
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    setLocale(splitLocale(pathname).locale);
  }, [pathname]);

  const home = localizedPath(locale, '/');
  const t = commonMessages[locale].notFound;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        router.push(home);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [router, home]);

  return (
    <div className={styles.container}>
      <div className={styles.terminal}>
        <div className={styles.header}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.title}>bash - 404</span>
        </div>
        <div className={styles.body}>
          <p className={styles.line}>
            <span className={styles.prompt}>root@home:~$</span> cd /requested-page
          </p>
          <p className={styles.error}>bash: cd: /requested-page: No such file or directory</p>
          <p className={styles.line}>
            <span className={styles.prompt}>root@home:~$</span> echo $?
          </p>
          <p className={styles.output}>404</p>
          <p className={styles.line}>
            <span className={styles.prompt}>root@home:~$</span> cat error.log
          </p>
          <p className={styles.output}>{t.log}</p>
          <p className={styles.line}>
            <span className={styles.prompt}>root@home:~$</span>{' '}
            <Link href={home} className={styles.link}>
              cd ~
            </Link>
            <span className={styles.cursor}>▋</span>
          </p>
          <p className={styles.hint}>{t.hint}</p>
        </div>
      </div>
    </div>
  );
}
