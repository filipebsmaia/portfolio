import type { Messages } from '@/i18n/messages';
import type { SkillCategoryId, SkillProficiency } from './Skills.data';

const en = {
  sectionTitle: 'Skills',
  loadingHeader: '> Loading modules...',
  loadedLabel: 'loaded',
  categories: {
    languages: 'Languages',
    frontend: 'Frontend',
    backend: 'Backend',
    devops: 'Ops & Cloud',
    architecture: 'Architecture',
    technologies: 'Technologies',
  } as Record<SkillCategoryId, string>,
  proficiency: {
    expert: 'expert',
    advanced: 'advanced',
    intermediate: 'intermediate',
  } as Record<SkillProficiency, string>,
};

export type SkillsMessages = typeof en;

const ptBR: SkillsMessages = {
  sectionTitle: 'Habilidades',
  loadingHeader: '> Carregando módulos...',
  loadedLabel: 'carregado',
  categories: {
    languages: 'Linguagens',
    frontend: 'Frontend',
    backend: 'Backend',
    devops: 'Ops & Nuvem',
    architecture: 'Arquitetura',
    technologies: 'Tecnologias',
  },
  proficiency: {
    expert: 'especialista',
    advanced: 'avançado',
    intermediate: 'intermediário',
  },
};

export const skillsMessages = { en, 'pt-BR': ptBR } satisfies Messages<SkillsMessages>;
