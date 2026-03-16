'use client';

import styles from './not-found.module.sass';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Enter') {
        router.push('/');
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [router]);

  return (
    <div className={styles.container}>
      <div className={styles.terminal}>
        <div className={styles.header}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.title}>bash — 404</span>
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
          <p className={styles.output}>The page you are looking for does not exist or has been moved.</p>
          <p className={styles.line}>
            <span className={styles.prompt}>root@home:~$</span>{' '}
            <Link href="/" className={styles.link}>
              cd ~
            </Link>
            <span className={styles.cursor}>▋</span>
          </p>
          <p className={styles.hint}>Press Enter to go home</p>
        </div>
      </div>
    </div>
  );
}
