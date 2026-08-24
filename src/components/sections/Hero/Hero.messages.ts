import type { Messages } from '@/i18n/messages';

/** Technology names - the same in every locale. */
export const modules = ['TYPESCRIPT', 'REACT', 'NEXT.JS', 'NODE.JS'];

const en = {
  statusLabel: 'STATUS:',
  statusText: 'ONLINE',
  kernelLabel: 'SYSTEM.KERNEL ::',
  command: '$ whoami',
  greeting: "Hello, I'm",
  name: 'Filipe Maia',
  title: 'Software Engineer',
  subtitle: 'Fullstack Developer focused on backend - TypeScript, React/Next.js & Node.js',
  modulesLabel: 'Main modules:',
  ctaPrimary: 'View Projects',
  ctaSecondary: 'GitHub Profile',
};

export type HeroMessages = typeof en;

const ptBR: HeroMessages = {
  statusLabel: 'STATUS:',
  statusText: 'ONLINE',
  kernelLabel: 'SYSTEM.KERNEL ::',
  command: '$ whoami',
  greeting: 'Olá, eu sou o',
  name: 'Filipe Maia',
  title: 'Engenheiro de Software',
  subtitle: 'Desenvolvedor fullstack focado em backend - TypeScript, React/Next.js e Node.js',
  modulesLabel: 'Módulos principais:',
  ctaPrimary: 'Ver Projetos',
  ctaSecondary: 'Perfil no GitHub',
};

export const heroMessages = { en, 'pt-BR': ptBR } satisfies Messages<HeroMessages>;
