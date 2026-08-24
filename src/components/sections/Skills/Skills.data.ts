/**
 * Skill names, category ids and proficiency levels are invariant: they are
 * product names and behaviour-bearing values, not copy. Only the category labels
 * and the proficiency words are translated, and those live in Skills.messages.ts
 * keyed by these ids.
 *
 * Split into its own file because the layout also reads the skill names for the
 * Person JSON-LD `knowsAbout`.
 */
export type SkillProficiency = 'expert' | 'advanced' | 'intermediate';

export const skillCategories = [
  {
    id: 'languages',
    prefix: 'lang',
    skills: [
      { name: 'TypeScript', proficiency: 'expert' },
      { name: 'JavaScript', proficiency: 'expert' },
      { name: 'Java', proficiency: 'intermediate' },
      { name: 'SQL', proficiency: 'advanced' },
      { name: 'NO-SQL', proficiency: 'intermediate' },
    ],
  },
  {
    id: 'frontend',
    prefix: 'fe',
    skills: [
      { name: 'React', proficiency: 'advanced' },
      { name: 'Next.js', proficiency: 'advanced' },
      { name: 'React Native', proficiency: 'intermediate' },
      { name: 'HTML5', proficiency: 'advanced' },
      { name: 'CSS / Sass', proficiency: 'advanced' },
    ],
  },
  {
    id: 'backend',
    prefix: 'be',
    skills: [
      { name: 'Node.js', proficiency: 'advanced' },
      { name: 'NestJS', proficiency: 'advanced' },
      { name: 'Express', proficiency: 'advanced' },
    ],
  },
  {
    id: 'devops',
    prefix: 'ops',
    skills: [
      { name: 'Docker', proficiency: 'advanced' },
      { name: 'Kubernetes', proficiency: 'intermediate' },
      { name: 'Google Cloud', proficiency: 'intermediate' },
      { name: 'Git', proficiency: 'advanced' },
      { name: 'CI/CD', proficiency: 'advanced' },
    ],
  },
  {
    id: 'architecture',
    prefix: 'arch',
    skills: [
      { name: 'Clean Architecture', proficiency: 'advanced' },
      { name: 'DDD', proficiency: 'advanced' },
      { name: 'Microservices', proficiency: 'advanced' },
      { name: 'Async Processing', proficiency: 'advanced' },
      { name: 'Design Patterns', proficiency: 'advanced' },
      { name: 'Refactoring Guru', proficiency: 'intermediate' },
    ],
  },
  {
    id: 'technologies',
    prefix: 'tech',
    skills: [
      { name: 'PostgreSQL', proficiency: 'advanced' },
      { name: 'Kafka', proficiency: 'advanced' },
      { name: 'OpenTelemetry', proficiency: 'intermediate' },
      { name: 'Redis', proficiency: 'advanced' },
    ],
  },
] as const satisfies readonly {
  id: string;
  prefix: string;
  skills: readonly { name: string; proficiency: SkillProficiency }[];
}[];

export type SkillCategoryId = (typeof skillCategories)[number]['id'];

/** Every distinct skill name, for the Person JSON-LD. */
export const allSkillNames = Array.from(new Set(skillCategories.flatMap((c) => c.skills.map((s) => s.name))));
