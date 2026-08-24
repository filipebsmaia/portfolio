import { version } from '@/../package.json';
import type { Locale } from '@/i18n/config';
import { profile } from '@/lib/profile';
import { HeroIntro } from './Hero.client';
import { heroMessages, modules } from './Hero.messages';

/**
 * Server wrapper. Resolving the locale here keeps the other locale's strings out
 * of the browser bundle, and gives every section the same `locale` signature.
 */
export function Hero({ locale }: { locale: Locale }) {
  return (
    <HeroIntro messages={heroMessages[locale]} modules={modules} kernelVersion={version} githubUrl={profile.githubUrl} />
  );
}
