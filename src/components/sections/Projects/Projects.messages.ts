import type { Messages } from '@/i18n/messages';
import type { ProjectId } from './Projects.data';

const en = {
  sectionTitle: 'Public Projects',
  olderTitle: 'Older Public Projects',
  viewAll: 'View All Repositories',
  descriptions: {
    'ceu-gg':
      'Minecraft server hosting on self-hosted bare metal, with an orchestration engine built from scratch. Kubernetes on Proxmox across two Brazilian sites, a NestJS backend structured with DDD, and cold storage that lets an idle server hold no cluster capacity at all.',
    'saga-library':
      'A TypeScript library for implementing the Saga pattern for managing distributed transactions, event streaming, and async workflows.',
    'ddd-with-nestjs':
      'Clean Architecture template implementing Domain-Driven Design patterns with NestJS. A reference for scalable backend structure.',
    'clean-architecture-template':
      'TypeScript template repository implementing Clean Architecture principles for Node.js applications. A reference for scalable project structure.',
    gobarber:
      'Full-featured barbershop appointment scheduling application with a complete web client built using React and TypeScript.',
    ecoleta:
      'Recycling collection point finder with backend, web, and mobile applications. Connects people to recycling drop-off points.',
  } as Record<ProjectId, string>,
};

export type ProjectsMessages = typeof en;

const ptBR: ProjectsMessages = {
  sectionTitle: 'Projetos Públicos',
  olderTitle: 'Projetos Públicos Antigos',
  viewAll: 'Ver Todos os Repositórios',
  descriptions: {
    'ceu-gg':
      'Hospedagem de servidores de Minecraft em bare metal self-hosted, com um motor de orquestração feito do zero. Kubernetes sobre Proxmox em dois sites brasileiros, backend NestJS estruturado com DDD, e um cold storage que faz um servidor ocioso não ocupar nada do cluster.',
    'saga-library':
      'Biblioteca TypeScript que implementa o padrão Saga para gerenciar transações distribuídas, event streaming e fluxos assíncronos.',
    'ddd-with-nestjs':
      'Template de Clean Architecture implementando padrões de Domain-Driven Design com NestJS. Uma referência de estrutura de backend escalável.',
    'clean-architecture-template':
      'Repositório template em TypeScript aplicando os princípios de Clean Architecture em aplicações Node.js. Uma referência de estrutura de projeto escalável.',
    gobarber: 'Aplicação completa de agendamento para barbearias, com um cliente web feito em React e TypeScript.',
    ecoleta:
      'Buscador de pontos de coleta de recicláveis com backend, web e mobile. Conecta pessoas aos pontos de descarte.',
  },
};

export const projectsMessages = { en, 'pt-BR': ptBR } satisfies Messages<ProjectsMessages>;
