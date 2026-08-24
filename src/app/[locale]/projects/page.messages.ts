import type { Messages } from '@/i18n/messages';

const en = {
  title: 'Projects',
  description:
    'Things Filipe Maia has built - from a Minecraft platform running on self-hosted bare metal to TypeScript ' +
    'libraries and Clean Architecture references.',
  breadcrumbCurrent: 'projects',
  viewAll: 'View All Repositories',
};

export type ProjectsPageMessages = typeof en;

const ptBR: ProjectsPageMessages = {
  title: 'Projetos',
  description:
    'Coisas que o Filipe Maia construiu - de uma plataforma de Minecraft rodando em bare metal self-hosted a bibliotecas ' +
    'TypeScript e referências de Clean Architecture.',
  breadcrumbCurrent: 'projects',
  viewAll: 'Ver Todos os Repositórios',
};

export const projectsPageMessages = { en, 'pt-BR': ptBR } satisfies Messages<ProjectsPageMessages>;
