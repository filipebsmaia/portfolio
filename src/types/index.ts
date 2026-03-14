export interface NavItem {
  label: string;
  href: string;
  fileName: string;
}

export interface HeroData {
  greeting: string;
  name: string;
  title: string;
  subtitle: string;
  statusText: string;
  kernelVersion: string;
  modules: string[];
  cta: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
}

export interface TerminalCommand {
  command: string;
  output: string[];
}

export interface Stat {
  label: string;
  value: string;
  icon: string;
}

export interface AboutData {
  shellCommands: Record<string, string[]>;
  initialCommands: string[];
  stats: Stat[];
}

export type SkillProficiency = 'expert' | 'advanced' | 'intermediate';

export type SkillCategory = 'languages' | 'frontend' | 'backend' | 'devops' | 'architecture' | 'technologies';

export interface Skill {
  name: string;
  proficiency: SkillProficiency;
}

export interface SkillGroup {
  id: SkillCategory;
  label: string;
  prefix: string;
  skills: Skill[];
}

export interface SkillsData {
  categories: SkillGroup[];
}

export interface ExperienceEntry {
  hash: string;
  company: string;
  role: string;
  period: string;
  description: string;
  highlights?: string[];
  technologies: string[];
}

export interface ExperienceData {
  entries: ExperienceEntry[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  language: string;
  languageColor: string;
  featured: boolean;
}

export interface ProjectsData {
  items: Project[];
  githubProfileUrl: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  username: string;
}

export interface ContactData {
  email: string;
  linkedinUrl: string;
  socialLinks: SocialLink[];
  availability: string;
}

export interface FooterData {
  builtWith: string[];
  sourceUrl: string;
}

export interface PortfolioData {
  nav: NavItem[];
  hero: HeroData;
  about: AboutData;
  skills: SkillsData;
  experience: ExperienceData;
  projects: ProjectsData;
  contact: ContactData;
  footer: FooterData;
}
