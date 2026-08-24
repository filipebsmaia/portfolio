import type { Messages } from '@/i18n/messages';

/**
 * Page chrome only. Section titles ("What it is", "How it is layered", …) live in
 * the case study content, because they are that project's editorial voice rather
 * than reusable page furniture.
 */
const en = {
  breadcrumbProjects: 'projects',
  visitSite: 'Visit {name}',
  allProjects: 'All projects',
  backToProjects: 'Back to projects',
  smallerFixesCommand: '$ git log --grep="fix:" --oneline',
  observabilityLabel: '# observability',
  securityLabel: '# security on a free tier',
  stillOpenLabel: '# still open',
};

export type CaseStudyPageMessages = typeof en;

const ptBR: CaseStudyPageMessages = {
  breadcrumbProjects: 'projects',
  visitSite: 'Acessar {name}',
  allProjects: 'Todos os projetos',
  backToProjects: 'Voltar para projetos',
  smallerFixesCommand: '$ git log --grep="fix:" --oneline',
  observabilityLabel: '# observabilidade',
  securityLabel: '# segurança num plano gratuito',
  stillOpenLabel: '# ainda em aberto',
};

export const caseStudyPageMessages = { en, 'pt-BR': ptBR } satisfies Messages<CaseStudyPageMessages>;
