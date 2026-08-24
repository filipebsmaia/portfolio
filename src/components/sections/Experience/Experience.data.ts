/**
 * Commit hashes, company names and technology tags are invariant. Roles, periods,
 * descriptions and highlights are translated, keyed by these ids in
 * Experience.messages.ts - so a missing translation is a compile error rather
 * than a silently dropped entry.
 *
 * Render order comes from this array, so both locales list the roles identically
 * regardless of object key order in the messages.
 */
export const experienceEntries = [
  {
    id: 'unifique-cross-squad',
    hash: 'f2d9a1c',
    company: 'Unifique Telecomunicações',
    technologies: [
      'TypeScript',
      'Node.js',
      'NestJS',
      'OpenTelemetry',
      'Datadog',
      'Google Cloud',
      'GKE',
      'Kubernetes',
      'Docker',
      'Kafka',
      'PostgreSQL',
      'Claude',
      'AI Agents',
    ],
  },
  {
    id: 'unifique-tech-lead',
    hash: 'e7a1f3b',
    company: 'Unifique Telecomunicações',
    technologies: ['TypeScript', 'Node.js', 'React', 'Google Cloud', 'GKE', 'Kubernetes', 'Docker', 'Kafka', 'PostgreSQL'],
  },
  {
    id: 'unifique-pleno',
    hash: 'b4c2d8a',
    company: 'Unifique Telecomunicações',
    technologies: ['TypeScript', 'Node.js', 'React', 'Google Cloud', 'GKE', 'Kubernetes', 'Docker', 'Kafka', 'PostgreSQL'],
  },
  {
    id: 'fluke-pleno',
    hash: 'a3f7c2e',
    company: 'Fluke',
    technologies: ['Next.js', 'React', 'TypeScript', 'Firebase'],
  },
  {
    id: 'fluke-junior',
    hash: '9d1e5f4',
    company: 'Fluke',
    technologies: ['Node.js', 'TypeScript', 'Firebase', 'Pub/Sub'],
  },
  {
    id: 'fluke-intern',
    hash: '6c8b3a2',
    company: 'Fluke',
    technologies: ['Node.js', 'TypeScript', 'React Native', 'Firebase'],
  },
] as const;

export type ExperienceId = (typeof experienceEntries)[number]['id'];
