import type { Messages } from '@/i18n/messages';

const en = {
  title: 'Software Engineer',
  discipline: 'Fullstack',
};

export type OgImageMessages = typeof en;

const ptBR: OgImageMessages = {
  title: 'Engenheiro de Software',
  discipline: 'Fullstack',
};

export const ogImageMessages = { en, 'pt-BR': ptBR } satisfies Messages<OgImageMessages>;
