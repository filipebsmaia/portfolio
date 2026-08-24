/** Deliberately import-free, so the sitemap does not pull in images or prose. */
export const caseStudySlugs = ['ceu-gg'] as const;

export type CaseStudySlug = (typeof caseStudySlugs)[number];
