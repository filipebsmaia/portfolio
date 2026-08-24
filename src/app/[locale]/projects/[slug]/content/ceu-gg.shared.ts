import architectureDiagram from '@/assets/projects/ceu-gg/architecture.webp';
import grafanaDashboard from '@/assets/projects/ceu-gg/grafana.webp';
import type { Locale } from '@/i18n/config';

/**
 * The en and pt-BR files are two translations of one document - but the numbers
 * are not part of the translation. If a figure is updated in one locale and not
 * the other, the site states two different facts. Everything invariant lives
 * here and is spread into both.
 */
export const ceuGgFacts = {
  identity: {
    slug: 'ceu-gg',
    name: 'ceu.gg',
    siteUrl: 'https://www.ceu.gg',
    language: 'TypeScript',
    languageColor: '#3178C6',
  },

  images: {
    /** Predates the current fleet: it draws three machines, and there are five. */
    architecture: architectureDiagram,
    grafana: grafanaDashboard,
  },

  seoKeywords: [
    'ceu.gg',
    'Kubernetes',
    'k3s',
    'Proxmox',
    'NestJS',
    'Domain-Driven Design',
    'MinIO',
    'infrastructure',
    'orchestration',
    'Minecraft hosting',
    'bare metal',
    'observability',
  ],

  /**
   * Quantities, not display strings. "12.9k+" is English the same way "Dec 2025"
   * is: pt-BR wants a comma for the decimal and "mil" for the suffix. `statsFor`
   * does the formatting so neither locale hardcodes a rendered number.
   */
  stats: {
    accounts: { id: 'accounts', icon: 'Users', value: 12_900, style: 'atLeast' },
    servers: { id: 'servers', icon: 'Server', value: 14_700, style: 'atLeast' },
    machines: { id: 'machines', icon: 'HardDrive', value: 5, style: 'exact' },
    loc: { id: 'loc', icon: 'Code2', value: 160_000, style: 'approx' },
  },

  /** Figures quoted inside prose. Here for the same reason `stats` is. */
  figures: {
    communities: 14_600,
    peakServers: 70,
    machinesRio: 3,
    machinesBahia: 2,
    machinesActive: 4,
    machinesSpare: 1,
  },

  /** The month the stats above were read from the ceu.gg metrics API. */
  statsAsOf: { month: 8, year: 2026 },

  layers: {
    physical: { id: 'physical', label: '01' },
    virtualization: { id: 'virtualization', label: '02' },
    orchestration: { id: 'orchestration', label: '03' },
    edge: { id: 'edge', label: '04' },
  },

  flowSteps: {
    wizard: 'wizard',
    admission: 'admission',
    queue: 'queue',
    seed: 'seed',
    watch: 'watch',
    idle: 'idle',
    archive: 'archive',
  },

  deepDives: {
    coldStorage: { id: 'cold-storage', fileName: 'cold-storage.md' },
    scheduling: { id: 'scheduling', fileName: 'scheduling.md' },
    skyDiagnostics: { id: 'sky-diagnostics', fileName: 'sky-diagnostics.md' },
  },

  smallerFixes: {
    heapCeiling: 'heap-ceiling',
    threadpool: 'threadpool',
    agentLeak: 'agent-leak',
  },

  incidents: {
    coldStorageDetach: 'cold-storage-detach',
    ipv4Outage: 'ipv4-outage',
  },

  /**
   * Month and year are numbers, not display strings: "Dec 2025" is English, and
   * baking it in here shipped English dates onto the Portuguese page. The version
   * tag stays invariant; the locale files format the date via `milestonesFor`.
   */
  milestones: {
    alpha: { version: 'alpha', month: 12, year: 2025 },
    v018: { version: 'v0.1.8 - v0.2.2', month: 2, year: 2026 },
    v100: { version: 'v1.0.0', month: 4, year: 2026 },
    v15: { version: 'v1.5 - v1.6', month: 7, year: 2026 },
    v200: { version: 'v2.0.0', month: 8, year: 2026, current: true },
  },

  stack: {
    frontend: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Radix'],
    backend: ['NestJS 11', 'TypeScript', 'DDD', 'CQRS', 'Domain events', 'ABAC'],
    data: ['PostgreSQL 16', 'Prisma', 'Kafka', 'MinIO', 'SFTP'],
    infrastructure: ['Kubernetes (k3s)', 'Proxmox', 'Traefik', 'OpenEBS LVM', 'MikroTik', 'Cloudflare', 'Docker'],
    observability: ['Prometheus', 'Grafana', 'OpenTelemetry', 'pino'],
    integrations: ['Stripe', 'PIX', 'Discord.js', 'OpenAI', 'Google Drive', 'CurseForge', 'Modrinth'],
  },
} as const;

/** `~160k`, `12.9k+`, or a bare `5`. */
type StatStyle = 'exact' | 'atLeast' | 'approx';

/**
 * Renders the invariant quantities for one locale: `12.9k+` in en, `12,9 mil+`
 * in pt-BR. Both the decimal separator and the thousands suffix change, which is
 * why the numbers cannot be stored pre-rendered.
 */
export function statsFor(locale: Locale) {
  const thousandsSuffix = locale === 'pt-BR' ? ' mil' : 'k';

  const render = (value: number, style: StatStyle = 'exact') => {
    const decimal = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    const body = value < 1000 ? String(value) : `${decimal.format(value / 1000)}${thousandsSuffix}`;

    if (style === 'approx') {
      return `~${body}`;
    }
    if (style === 'atLeast') {
      return `${body}+`;
    }
    return body;
  };

  const stat = <T extends { id: string; icon: string; value: number; style: string }>(s: T) => ({
    id: s.id,
    icon: s.icon,
    value: render(s.value, s.style as StatStyle),
  });

  const { statsAsOf, figures } = ceuGgFacts;

  return {
    accounts: stat(ceuGgFacts.stats.accounts),
    servers: stat(ceuGgFacts.stats.servers),
    machines: stat(ceuGgFacts.stats.machines),
    loc: stat(ceuGgFacts.stats.loc),

    /** The same quantities, for quoting inside a sentence. */
    figures: {
      accounts: render(ceuGgFacts.stats.accounts.value, 'atLeast'),
      createdServers: render(ceuGgFacts.stats.servers.value, 'atLeast'),
      machines: render(ceuGgFacts.stats.machines.value),
      communities: render(figures.communities, 'atLeast'),
      peakServers: render(figures.peakServers),
      machinesRio: render(figures.machinesRio),
      machinesBahia: render(figures.machinesBahia),
      machinesActive: render(figures.machinesActive),
      machinesSpare: render(figures.machinesSpare),
    },

    /** "August 2026" in en, "agosto de 2026" in pt-BR. */
    asOf: new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(
      new Date(statsAsOf.year, statsAsOf.month - 1, 1),
    ),
  };
}

/** Twelve short month names, in order, for the locale doing the formatting. */
export type MonthNames = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

/** Turns the invariant milestone facts into `MilestoneData` for one locale. */
export function milestonesFor(months: MonthNames) {
  const format = <T extends { version: string; month: number; year: number; current?: boolean }>(m: T) => ({
    version: m.version,
    date: `${months[m.month - 1]} ${m.year}`,
    ...(m.current ? { current: true as const } : {}),
  });

  return {
    alpha: format(ceuGgFacts.milestones.alpha),
    v018: format(ceuGgFacts.milestones.v018),
    v100: format(ceuGgFacts.milestones.v100),
    v15: format(ceuGgFacts.milestones.v15),
    v200: format(ceuGgFacts.milestones.v200),
  };
}
