import type { Messages } from '@/i18n/messages';
import type { SocialId } from '@/lib/profile';

/** Product names, not copy. */
export const builtWith = ['Next.js', 'TypeScript', 'Sass'];

const en = {
  sessionEnded: 'Session terminated.',
  builtWith: 'Built with {stack}',
  social: { github: 'GitHub', linkedin: 'LinkedIn', email: 'Email' } as Record<SocialId, string>,
};

export type FooterMessages = typeof en;

const ptBR: FooterMessages = {
  sessionEnded: 'Sessão encerrada.',
  builtWith: 'Feito com {stack}',
  social: { github: 'GitHub', linkedin: 'LinkedIn', email: 'E-mail' },
};

export const footerMessages = { en, 'pt-BR': ptBR } satisfies Messages<FooterMessages>;
