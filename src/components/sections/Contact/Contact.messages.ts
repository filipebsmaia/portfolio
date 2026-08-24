import type { Messages } from '@/i18n/messages';
import type { SocialId } from '@/lib/profile';

const en = {
  sectionTitle: 'Contact',
  command: '$ cat contact.json',
  statusKey: 'status',
  availability: 'Currently employed',
  ctaPrompt: '$ send-message --to filipe',
  ctaText: 'Have a project in mind or want to chat? Feel free to reach out.',
  ctaButton: 'Get In Touch',
  social: { github: 'GitHub', linkedin: 'LinkedIn', email: 'Email' } as Record<SocialId, string>,
};

export type ContactMessages = typeof en;

const ptBR: ContactMessages = {
  sectionTitle: 'Contato',
  command: '$ cat contact.json',
  statusKey: 'status',
  availability: 'Empregado no momento',
  ctaPrompt: '$ send-message --to filipe',
  ctaText: 'Tem um projeto em mente ou quer trocar uma ideia? É só chamar.',
  ctaButton: 'Falar Comigo',
  social: { github: 'GitHub', linkedin: 'LinkedIn', email: 'E-mail' },
};

export const contactMessages = { en, 'pt-BR': ptBR } satisfies Messages<ContactMessages>;
