import type { Messages } from '@/i18n/messages';
import type { ExperienceId } from './Experience.data';

interface EntryCopy {
  role: string;
  period: string;
  description: string;
  highlights: string[];
}

const en = {
  sectionTitle: 'Experience',
  command: '$ git log --oneline',
  entries: {
    'unifique-cross-squad': {
      role: 'Senior Software Engineer - Cross-squad',
      period: 'May 2025 - Present',
      description:
        'Cross-squad engineering support, building solutions and participating in architectural decisions and migrations to improve developer experience across teams.',
      highlights: [
        'Designed and shipped internal AI skills and agents that automate repetitive engineering workflows, freeing developers to focus on higher-value work.',
        'Defined adoption patterns and best practices for AI-assisted development across squads.',
        "Built the platform's managed API Gateway from scratch, a NestJS control plane for versioned routing and policy config plus a streaming data-plane proxy serving ~25M requests/month in production, removing the need for a commercial API management subscription (Apigee, Sensedia, Kong Enterprise) and its vendor lock-in.",
        'Modeled gateway configuration as data, so routes, policies, IP allow-groups, distributed rate limits (Valkey) and etc publish and roll back without a redeploy, with shadow mode to measure impact before enforcing.',
        'Introduced architectural patterns such as Strategy, Specification, Policy, Saga, etc., ensuring responsibility isolation and improving service maintainability.',
        "Integrated OpenTelemetry across microservices for improved observability, including the gateway's SLOs and burn-rate monitors as code, and built dashboards for clear system visualization.",
        'Participated in defining and adapting GMUD (change management) processes for the team.',
      ],
    },
    'unifique-tech-lead': {
      role: 'Tech Lead',
      period: 'Apr 2023 - May 2025',
      description:
        'Led architecture and engineering across multiple squads for the BOSS platform (BSS + OSS) powering mobile consumer, B2B, MVNE, and MVNO services.',
      highlights: [
        'Led the Concierge (B2B) and MVNX (MVNE/MVNO) squads, mentoring engineers, driving architectural decisions, and building the MVNX platform from scratch.',
        'Designed TCP/socket libraries for direct communication with 5G core network elements, and built a cross-service audit middleware used across back-office, API integrations, and the MVNX platform.',
        'Created the core ABAC + RBAC permission system from scratch, handling all platform authorization.',
        'Participated in key decisions and implementation of a critical optimization of the customer renewal flow, reducing processing time from 3 days to under 6 hours.',
      ],
    },
    'unifique-pleno': {
      role: 'Pleno Software Engineer',
      period: 'Aug 2022 - Apr 2023',
      description:
        'Architected and built core telecom infrastructure, participating in technical decisions from early platform design through production.',
      highlights: [
        'Developed 60+ mission-critical microservices for mobile telephony on Node.js, PostgreSQL, Kafka, and GKE, maintaining 99+% SLA.',
        'Co-architected the BOSS platform (BSS + OSS) following ODA standards, operating the entire mobile telephony stack.',
        'Built a high-throughput binary processor for network CDRs (Call Detail Records), continuously optimized for big data volumes.',
      ],
    },
    'fluke-pleno': {
      role: 'Pleno Software Engineer',
      period: 'Jan 2022 - Aug 2022',
      description:
        'Main developer for the web platform. Led architecture decisions and implementation, built the new acquisition portal, site pages, and blog system.',
      highlights: [],
    },
    'fluke-junior': {
      role: 'Junior Software Engineer',
      period: 'Jun 2021 - Dec 2021',
      description:
        'Backend-focused development. Participated in architecture decisions, created new microservices, and split oversized services into smaller, focused units.',
      highlights: [],
    },
    'fluke-intern': {
      role: 'Intern Software Engineer',
      period: 'Oct 2020 - May 2021',
      description: 'Backend and mobile development across Node.js services and a React Native application.',
      highlights: [],
    },
  } as Record<ExperienceId, EntryCopy>,
};

export type ExperienceMessages = typeof en;

const ptBR: ExperienceMessages = {
  sectionTitle: 'Experiência',
  command: '$ git log --oneline',
  entries: {
    'unifique-cross-squad': {
      role: 'Engenheiro de Software Sênior - Cross-squad',
      period: 'Mai 2025 - Presente',
      description:
        'Apoio de engenharia entre squads, construindo soluções e participando de decisões de arquitetura e migrações para melhorar a experiência de desenvolvimento dos times.',
      highlights: [
        'Criei e coloquei em produção skills e agentes de IA internos que automatizam fluxos repetitivos de engenharia, liberando os desenvolvedores para trabalho de maior valor.',
        'Defini padrões de adoção e boas práticas de desenvolvimento assistido por IA entre as squads.',
        'Construí o API Gateway gerenciado da plataforma do zero: um control plane em NestJS para roteamento versionado e configuração de políticas, mais um proxy de data plane em streaming que serve ~25M de requisições/mês em produção - dispensando a assinatura de um API management comercial (Apigee, Sensedia, Kong Enterprise) e o vendor lock-in que vem junto.',
        'Modelei a configuração do gateway como dado, de modo que rotas, políticas, grupos de IP liberados, rate limits distribuídos (Valkey) e afins entram no ar e voltam atrás sem redeploy, com shadow mode para medir o impacto antes de aplicar.',
        'Introduzi padrões arquiteturais como Strategy, Specification, Policy e Saga, isolando responsabilidades e melhorando a manutenibilidade dos serviços.',
        'Integrei OpenTelemetry nos microsserviços para ampliar a observabilidade, incluindo os SLOs e monitores de burn rate do gateway como código, e montei dashboards para visualizar o sistema com clareza.',
        'Participei da definição e adaptação dos processos de GMUD (gestão de mudanças) do time.',
      ],
    },
    'unifique-tech-lead': {
      role: 'Tech Lead',
      period: 'Abr 2023 - Mai 2025',
      description:
        'Liderei arquitetura e engenharia em várias squads da plataforma BOSS (BSS + OSS), que sustenta os serviços móveis de consumo, B2B, MVNE e MVNO.',
      highlights: [
        'Liderei as squads Concierge (B2B) e MVNX (MVNE/MVNO), mentorando engenheiros, conduzindo decisões de arquitetura e construindo a plataforma MVNX do zero.',
        'Projetei bibliotecas TCP/socket para comunicação direta com elementos do core de rede 5G e construí um middleware de auditoria usado no back-office, nas integrações de API e na plataforma MVNX.',
        'Criei do zero o sistema de permissões ABAC + RBAC que responde por toda a autorização da plataforma.',
        'Participei das decisões e da implementação de uma otimização crítica no fluxo de renovação de clientes, reduzindo o processamento de 3 dias para menos de 6 horas.',
      ],
    },
    'unifique-pleno': {
      role: 'Engenheiro de Software Pleno',
      period: 'Ago 2022 - Abr 2023',
      description:
        'Arquitetei e construí a infraestrutura central de telecom, participando das decisões técnicas desde o desenho inicial da plataforma até a produção.',
      highlights: [
        'Desenvolvi mais de 60 microsserviços críticos de telefonia móvel em Node.js, PostgreSQL, Kafka e GKE, mantendo SLA acima de 99%.',
        'Co-arquitetei a plataforma BOSS (BSS + OSS) seguindo os padrões ODA, operando toda a stack de telefonia móvel.',
        'Construí um processador binário de alta vazão para CDRs (Call Detail Records) da rede, otimizado continuamente para grandes volumes.',
      ],
    },
    'fluke-pleno': {
      role: 'Engenheiro de Software Pleno',
      period: 'Jan 2022 - Ago 2022',
      description:
        'Desenvolvedor principal da plataforma web. Conduzi decisões de arquitetura e implementação, e construí o novo portal de aquisição, as páginas do site e o sistema de blog.',
      highlights: [],
    },
    'fluke-junior': {
      role: 'Engenheiro de Software Júnior',
      period: 'Jun 2021 - Dez 2021',
      description:
        'Desenvolvimento focado em backend. Participei de decisões de arquitetura, criei novos microsserviços e quebrei serviços grandes demais em unidades menores e mais focadas.',
      highlights: [],
    },
    'fluke-intern': {
      role: 'Engenheiro de Software Estagiário',
      period: 'Out 2020 - Mai 2021',
      description: 'Desenvolvimento backend e mobile entre serviços Node.js e uma aplicação React Native.',
      highlights: [],
    },
  },
};

export const experienceMessages = { en, 'pt-BR': ptBR } satisfies Messages<ExperienceMessages>;
