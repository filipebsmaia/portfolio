import type { Messages } from '@/i18n/messages';

const en = {
  problemLabel: '# the problem',
  approachLabel: '# what it does',
};

export type DeepDiveMessages = typeof en;

const ptBR: DeepDiveMessages = {
  problemLabel: '# o problema',
  approachLabel: '# o que ele faz',
};

export const deepDiveMessages = { en, 'pt-BR': ptBR } satisfies Messages<DeepDiveMessages>;
