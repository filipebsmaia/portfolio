import type { Messages } from './messages';

const en = {
  breadcrumb: { home: 'Home', projects: 'Projects' },
  languageSwitcher: { label: 'Change language' },
  notFound: {
    // The shell half stays English: bash under LANG=C prints English, and the
    // command is what the user would have typed.
    log: 'The page you are looking for does not exist or has been moved.',
    hint: 'Press Enter to go home',
  },
};

export type CommonMessages = typeof en;

const ptBR: CommonMessages = {
  breadcrumb: { home: 'Início', projects: 'Projetos' },
  languageSwitcher: { label: 'Mudar idioma' },
  notFound: {
    log: 'A página que você procura não existe ou foi movida.',
    hint: 'Pressione Enter para voltar ao início',
  },
};

export const commonMessages = { en, 'pt-BR': ptBR } satisfies Messages<CommonMessages>;
