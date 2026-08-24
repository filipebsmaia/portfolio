import type { StaticImageData } from 'next/image';
import type { DeepDiveData } from '@/components/caseStudy/DeepDive/DeepDive';
import type { FlowStepData } from '@/components/caseStudy/FlowSteps/FlowSteps';
import type { MilestoneData } from '@/components/caseStudy/MilestoneTimeline/MilestoneTimeline';
import type { StatData } from '@/components/caseStudy/StatGrid/StatGrid';

/**
 * Composed *from* the component prop types, not the other way round: each
 * presentational component owns the shape it renders, and the content layer
 * assembles them. So content depends on components, never the reverse.
 */
export interface CaseStudyImage {
  src: StaticImageData;
  alt: string;
  caption: string;
}

export interface CaseStudyLayer {
  id: string;
  label: string;
  title: string;
  items: string[];
}

export interface CaseStudyNote {
  id: string;
  title: string;
  detail: string;
}

export interface CaseStudyIncident {
  id: string;
  title: string;
  impact: string;
  lesson: string;
}

export interface CaseStudyStackGroup {
  label: string;
  items: readonly string[];
}

/** Section headings live in the content: they are this project's editorial voice. */
export interface CaseStudySectionTitles {
  overview: string;
  architecture: string;
  provisioning: string;
  engineering: string;
  operations: string;
  incidents: string;
  timeline: string;
  stack: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  tagline: string;
  role: string;
  period: string;
  status: string;
  /** Explains the absence of a repository link on a closed-source project. */
  sourceNote: string;
  siteUrl: string;
  language: string;
  languageColor: string;
  seo: { title: string; description: string; keywords: readonly string[] };
  sections: CaseStudySectionTitles;
  summary: string[];
  highlights: string[];
  statsAsOf: string;
  stats: StatData[];
  architecture: { intro: string; diagram: CaseStudyImage; layers: CaseStudyLayer[] };
  flow: { intro: string; steps: FlowStepData[] };
  engineering: { intro: string; deepDives: DeepDiveData[]; smallerFixes: CaseStudyNote[] };
  observability: { intro: string; screenshot: CaseStudyImage; covers: string[] };
  security: { intro: string; measures: string[] };
  incidents: { intro: string; items: CaseStudyIncident[]; openQuestions: string[] };
  timeline: MilestoneData[];
  stack: CaseStudyStackGroup[];
}
