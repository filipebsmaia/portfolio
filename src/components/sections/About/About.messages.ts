import type { Messages } from '@/i18n/messages';
import type { HelpCommandId } from './About.help';

/**
 * The 18 `shellCommands` keys are a functional command surface: the terminal does
 * exact-key lookup on them and Tab-completes from them. They stay identical and
 * English in both locales - letting inference over `typeof en.output` enforce key
 * parity for free.
 *
 * What is translated is the *output*: prose inside files, and the value of
 * prose-like fields such as `Status:`. Field labels, paths, URLs and shell
 * metadata stay put.
 */
const en = {
  sectionTitle: 'About',
  terminalTitle: 'bash - {user}',
  inputLabel: 'Terminal input',
  // The portfolio speaking, not bash.
  unknownCommandHint: 'Type "help" for available commands.',
  helpHeader: 'Available commands:',
  help: {
    whoami: 'who am I',
    ls: 'list files',
    cd: 'change directory',
    cat: 'read file contents',
    pwd: 'print working directory',
    uname: 'system info',
    clear: 'clear terminal',
    help: 'show this message',
  } as Record<HelpCommandId, string>,
  output: {
    whoami: ['Filipe Maia - Software Engineer @ Unifique Telecomunicações'],
    'cat bio.txt': [
      'Fullstack developer focused on backend, passionate about building',
      'scalable and well-architected software. I work with TypeScript,',
      'React/Next.js, and Node.js - focused on Clean Architecture,',
      'Domain-Driven Design, and modern development practices.',
      '',
      'I believe great software comes from clean code, solid patterns,',
      'and continuous learning. From microservices to cloud-native systems,',
      'I enjoy solving complex problems with elegant solutions.',
    ],
    'cat certifications.txt': [
      'Google Cloud Associate Cloud Engineer',
      'https://www.credly.com/badges/33118399-1489-4b35-bb8b-ad8d56c13501',
    ],
    'cat projects/ceu-gg.md': [
      '# ceu.gg',
      'Minecraft server hosting on self-hosted bare metal, with an',
      'orchestration engine built from scratch - panel, API, provisioning',
      'and container images are all first-party.',
      '',
      'Stack: TypeScript, NestJS, Next.js, Kubernetes, Proxmox, PostgreSQL,',
      '       Kafka, MinIO',
      'Status: In Production',
      'URL: https://www.ceu.gg',
      // The one string in the codebase that encodes a route. Locale-prefixed below.
      'Case study: /projects/ceu-gg',
    ],
    'cat projects/saga-library.md': [
      '# Saga Library',
      'TypeScript library for implementing the Saga pattern for',
      'managing distributed transactions, event streaming, and async workflows.',
      '',
      'Stack: TypeScript, Saga Pattern, Event Streaming',
      'Repo: github.com/filipebsmaia/saga-library',
    ],
    'cat projects/ddd-with-nestjs.md': [
      '# DDD with NestJS',
      'Clean Architecture template implementing Domain-Driven Design',
      'patterns with NestJS. A reference for scalable backend structure.',
      '',
      'Stack: TypeScript, NestJS, Prisma, DDD, Clean Architecture',
      'Repo: github.com/filipebsmaia/ddd-with-nestjs',
    ],
    'cat projects/clean-architecture-ts-template.md': [
      '# Clean Architecture Template',
      'TypeScript template implementing Clean Architecture principles',
      'for Node.js applications.',
      '',
      'Stack: TypeScript, Node.js, Clean Architecture',
      'Repo: github.com/filipebsmaia/clean-architecture-ts-template',
    ],
    'cat projects/gobarber.md': [
      '# GoBarber',
      'Full-featured barbershop appointment scheduling application',
      'with a complete web client built using React and TypeScript.',
      '',
      'Stack: TypeScript, React, Styled Components, REST API',
      'Repo: github.com/filipebsmaia/gobarber-typescript-web',
    ],
    'cat projects/ecoleta.md': [
      '# Ecoleta',
      'Recycling collection point finder with backend, web, and mobile',
      'applications. Connects people to recycling drop-off points.',
      '',
      'Stack: TypeScript, React, Node.js, React Native, SQLite',
      'Repo: github.com/filipebsmaia/Ecoleta',
    ],
  },
};

export type AboutMessages = typeof en;

const ptBR: AboutMessages = {
  sectionTitle: 'Sobre',
  terminalTitle: 'bash - {user}',
  inputLabel: 'Entrada do terminal',
  unknownCommandHint: 'Digite "help" para ver os comandos disponíveis.',
  helpHeader: 'Comandos disponíveis:',
  help: {
    whoami: 'quem sou eu',
    ls: 'listar arquivos',
    cd: 'mudar de diretório',
    cat: 'ler o conteúdo de um arquivo',
    pwd: 'mostrar o diretório atual',
    uname: 'informações do sistema',
    clear: 'limpar o terminal',
    help: 'mostrar esta mensagem',
  },
  output: {
    whoami: ['Filipe Maia - Engenheiro de Software @ Unifique Telecomunicações'],
    'cat bio.txt': [
      'Desenvolvedor fullstack focado em backend, com gosto por construir',
      'software escalável e bem arquitetado. Trabalho com TypeScript,',
      'React/Next.js e Node.js - com foco em Clean Architecture,',
      'Domain-Driven Design e práticas modernas de desenvolvimento.',
      '',
      'Acredito que bom software nasce de código limpo, padrões sólidos',
      'e aprendizado contínuo. De microsserviços a sistemas cloud-native,',
      'gosto de resolver problemas complexos com soluções elegantes.',
    ],
    'cat certifications.txt': [
      'Google Cloud Associate Cloud Engineer',
      'https://www.credly.com/badges/33118399-1489-4b35-bb8b-ad8d56c13501',
    ],
    'cat projects/ceu-gg.md': [
      '# ceu.gg',
      'Hospedagem de servidores de Minecraft em bare metal self-hosted, com um',
      'motor de orquestração feito do zero - painel, API, provisionamento',
      'e imagens de container são todos de primeira parte.',
      '',
      'Stack: TypeScript, NestJS, Next.js, Kubernetes, Proxmox, PostgreSQL,',
      '       Kafka, MinIO',
      'Status: Em produção',
      'URL: https://www.ceu.gg',
      'Case study: /pt-br/projects/ceu-gg',
    ],
    'cat projects/saga-library.md': [
      '# Saga Library',
      'Biblioteca TypeScript que implementa o padrão Saga para gerenciar',
      'transações distribuídas, event streaming e fluxos assíncronos.',
      '',
      'Stack: TypeScript, Saga Pattern, Event Streaming',
      'Repo: github.com/filipebsmaia/saga-library',
    ],
    'cat projects/ddd-with-nestjs.md': [
      '# DDD with NestJS',
      'Template de Clean Architecture implementando padrões de',
      'Domain-Driven Design com NestJS. Referência de backend escalável.',
      '',
      'Stack: TypeScript, NestJS, Prisma, DDD, Clean Architecture',
      'Repo: github.com/filipebsmaia/ddd-with-nestjs',
    ],
    'cat projects/clean-architecture-ts-template.md': [
      '# Clean Architecture Template',
      'Template TypeScript aplicando os princípios de Clean Architecture',
      'em aplicações Node.js.',
      '',
      'Stack: TypeScript, Node.js, Clean Architecture',
      'Repo: github.com/filipebsmaia/clean-architecture-ts-template',
    ],
    'cat projects/gobarber.md': [
      '# GoBarber',
      'Aplicação completa de agendamento para barbearias, com um',
      'cliente web feito em React e TypeScript.',
      '',
      'Stack: TypeScript, React, Styled Components, REST API',
      'Repo: github.com/filipebsmaia/gobarber-typescript-web',
    ],
    'cat projects/ecoleta.md': [
      '# Ecoleta',
      'Buscador de pontos de coleta de recicláveis com backend, web e',
      'mobile. Conecta pessoas aos pontos de descarte.',
      '',
      'Stack: TypeScript, React, Node.js, React Native, SQLite',
      'Repo: github.com/filipebsmaia/Ecoleta',
    ],
  },
};

export const aboutMessages = { en, 'pt-BR': ptBR } satisfies Messages<AboutMessages>;
