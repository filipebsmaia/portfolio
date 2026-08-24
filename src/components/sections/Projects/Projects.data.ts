import { profile } from '@/lib/profile';

/**
 * URLs, slugs, language colours and technology tags are invariant. Only the
 * descriptions are translated, keyed by these ids in Projects.messages.ts.
 *
 * `inProduction` used to be a magic 'In Production' string inside `technologies`
 * that three call sites compared against to apply a highlight class - translating
 * it would have silently broken the styling.
 */
export const projectIds = [
  'ceu-gg',
  'saga-library',
  'ddd-with-nestjs',
  'clean-architecture-template',
  'gobarber',
  'ecoleta',
] as const;

export type ProjectId = (typeof projectIds)[number];

export interface ProjectRecord {
  id: ProjectId;
  name: string;
  inProduction?: boolean;
  technologies: readonly string[];
  githubUrl?: string;
  demoUrl?: string;
  caseStudySlug?: string;
  language: string;
  languageColor: string;
  featured: boolean;
}

// Declared rather than `as const`: a const-asserted array of heterogeneous
// literals unions into types where the optional fields are simply absent, so
// `project.githubUrl` stops type-checking at the call site.
export const projects: readonly ProjectRecord[] = [
  {
    id: 'ceu-gg',
    name: 'ceu.gg',
    inProduction: true,
    technologies: ['TypeScript', 'NestJS', 'Next.js', 'Kubernetes', 'Proxmox', 'PostgreSQL', 'Kafka', 'MinIO'],
    demoUrl: 'https://www.ceu.gg',
    caseStudySlug: 'ceu-gg',
    language: 'TypeScript',
    languageColor: '#3178C6',
    featured: true,
  },
  {
    id: 'saga-library',
    name: 'Saga Library',
    technologies: ['TypeScript', 'Saga Pattern', 'Event Streaming', 'Async Processing'],
    githubUrl: 'https://github.com/filipebsmaia/saga-library',
    language: 'TypeScript',
    languageColor: '#3178C6',
    featured: true,
  },
  {
    id: 'ddd-with-nestjs',
    name: 'DDD with NestJS',
    technologies: ['TypeScript', 'NestJS', 'Prisma', 'DDD', 'Clean Architecture'],
    githubUrl: 'https://github.com/filipebsmaia/ddd-with-nestjs',
    language: 'TypeScript',
    languageColor: '#3178C6',
    featured: true,
  },
  {
    id: 'clean-architecture-template',
    name: 'Clean Architecture Template',
    technologies: ['TypeScript', 'Node.js', 'Clean Architecture'],
    githubUrl: 'https://github.com/filipebsmaia/clean-architecture-ts-template',
    language: 'TypeScript',
    languageColor: '#3178C6',
    featured: false,
  },
  {
    id: 'gobarber',
    name: 'GoBarber',
    technologies: ['TypeScript', 'React', 'Styled Components', 'REST API'],
    githubUrl: 'https://github.com/filipebsmaia/gobarber-typescript-web',
    language: 'TypeScript',
    languageColor: '#3178C6',
    featured: false,
  },
  {
    id: 'ecoleta',
    name: 'Ecoleta',
    technologies: ['TypeScript', 'React', 'Node.js', 'React Native', 'SQLite'],
    githubUrl: 'https://github.com/filipebsmaia/Ecoleta',
    language: 'TypeScript',
    languageColor: '#3178C6',
    featured: false,
  },
];

export const githubProfileUrl = profile.githubProfileUrl;
