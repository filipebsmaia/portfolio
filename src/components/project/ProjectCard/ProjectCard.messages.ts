import type { Messages } from '@/i18n/messages';

const en = {
  privateBadge: 'private',
  inProduction: 'In Production',
  caseStudy: 'Case Study',
  caseStudyAria: 'Read the {name} case study',
  viewRepo: 'View Repo',
  viewRepoAria: 'View {name} on GitHub',
  visitSite: 'Visit Site',
  visitSiteAria: 'Visit the {name} site',
};

export type ProjectCardMessages = typeof en;

const ptBR: ProjectCardMessages = {
  privateBadge: 'privado',
  inProduction: 'Em produção',
  caseStudy: 'Estudo de Caso',
  caseStudyAria: 'Ler o estudo de caso de {name}',
  viewRepo: 'Ver Repo',
  viewRepoAria: 'Ver {name} no GitHub',
  visitSite: 'Acessar Site',
  visitSiteAria: 'Acessar o site de {name}',
};

export const projectCardMessages = { en, 'pt-BR': ptBR } satisfies Messages<ProjectCardMessages>;
