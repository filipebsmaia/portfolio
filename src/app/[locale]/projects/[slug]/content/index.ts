import type { Locale } from '@/i18n/config';
import { ceuGgEn } from './ceu-gg.en';
import { ceuGgPtBr } from './ceu-gg.pt-BR';
import { type CaseStudySlug, caseStudySlugs } from './slugs';
import type { CaseStudy } from './types';

/**
 * `satisfies Record<CaseStudySlug, …>` keeps this registry and `slugs.ts` from
 * drifting: add a slug to one and the other stops compiling.
 */
const caseStudies = {
  'ceu-gg': { en: ceuGgEn, 'pt-BR': ceuGgPtBr },
} satisfies Record<CaseStudySlug, Record<Locale, CaseStudy>>;

export { caseStudySlugs, type CaseStudySlug };
export type { CaseStudy };

export function getCaseStudy(slug: string, locale: Locale): CaseStudy | undefined {
  return caseStudies[slug as CaseStudySlug]?.[locale];
}
