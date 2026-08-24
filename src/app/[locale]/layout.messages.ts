import type { Messages } from '@/i18n/messages';

const en = {
  title: 'Filipe Maia | Software Engineer',
  description:
    'Fullstack developer passionate about TypeScript, Java, React, Node.js, Clean Architecture, and Domain-Driven Design.',
  ogDescription: 'Fullstack developer passionate about building scalable and well-architected software.',
  jobTitle: 'Senior Software Engineer',
  // Mostly proper nouns, so the pt-BR list is the same set with the role terms
  // translated. Anything more would be SEO theatre.
  keywords: [
    'Filipe Maia',
    'Software Engineer',
    'Tech Lead',
    'Fullstack Developer',
    'Backend Developer',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'NestJS',
    'Java',
    'Clean Architecture',
    'Domain-Driven Design',
    'DDD',
    'Microservices',
    'Kubernetes',
    'Google Cloud',
    'Kafka',
    'PostgreSQL',
  ],
};

export type SiteMessages = typeof en;

const ptBR: SiteMessages = {
  title: 'Filipe Maia | Engenheiro de Software',
  description:
    'Desenvolvedor fullstack focado em backend, com TypeScript, Java, React, Node.js, Clean Architecture e Domain-Driven Design.',
  ogDescription: 'Desenvolvedor fullstack que gosta de construir software escalável e bem arquitetado.',
  jobTitle: 'Engenheiro de Software Sênior',
  keywords: [
    'Filipe Maia',
    'Engenheiro de Software',
    'Desenvolvedor Fullstack',
    'Desenvolvedor Backend',
    'Tech Lead',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'NestJS',
    'Java',
    'Clean Architecture',
    'Domain-Driven Design',
    'DDD',
    'Microsserviços',
    'Kubernetes',
    'Google Cloud',
    'Kafka',
    'PostgreSQL',
  ],
};

export const siteMessages = { en, 'pt-BR': ptBR } satisfies Messages<SiteMessages>;
