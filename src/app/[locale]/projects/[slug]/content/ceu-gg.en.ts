import { ceuGgFacts as f, milestonesFor, statsFor } from './ceu-gg.shared';
import type { CaseStudy } from './types';

const milestones = milestonesFor(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
const s = statsFor('en');

export const ceuGgEn: CaseStudy = {
  ...f.identity,
  tagline: 'Minecraft server hosting on self-hosted bare metal, with an orchestration engine built from scratch.',
  role: 'Developer - panel, API, provisioning engine, container images, infrastructure',
  period: 'Dec 2025 - present',
  status: 'In production',
  sourceNote: 'Source is private',

  seo: {
    title: 'ceu.gg - Minecraft hosting infrastructure',
    description:
      'How ceu.gg runs multi-tenant Minecraft servers on self-hosted bare metal: a custom Kubernetes provisioning engine, ' +
      'atomically-written cold storage, a scheduler that will not oversell reserved capacity, and Sky, an assistant that ' +
      "calls tools under the user's own permissions and investigates broken servers with no write tools.",
    keywords: f.seoKeywords,
  },

  // Section headings are this project's editorial voice, so they live with the
  // content rather than in the page's chrome messages.
  sections: {
    overview: 'What it is',
    architecture: 'How it is layered',
    provisioning: 'From a button to a running world',
    sky: 'The assistant',
    engineering: 'Problems worth writing down',
    operations: 'Running it',
    incidents: 'What broke, and what is still open',
    timeline: 'Shipping history',
    stack: 'Full stack',
  },

  summary: [
    'ceu.gg gives people a Minecraft server for their friends without asking them to understand any of it. Pick a version, ' +
      'press a button, share an address. The free tier stays free, and paid plans exist for anyone who outgrows it.',
    'The panel, the API, the provisioning engine and the container images are all built here. There is no off-the-shelf ' +
      'control panel underneath. Servers run in Kubernetes on self-hosted bare metal, across two Brazilian sites, behind ' +
      'routing I configure. I write the code; a partner works alongside on brainstorming, testing and support. Two things ' +
      'set the shape of everything else: hardware is priced in dollars while the revenue arrives in reais, and there are ' +
      'only so many hours two people have. So simplicity here is a requirement.',
  ],

  highlights: [
    'Everything from the routing table to the panel is first-party',
    'Creating a server allocates nothing but a database row',
    'Reserved capacity holds because the scheduler refuses to place anything else on it',
    'The diagnostic agent reads player-authored text and holds no write tools',
    'The chat acts on your account with your permissions, never with any of its own',
  ],

  statsAsOf: `Platform figures read from the ceu.gg metrics API in ${s.asOf}.`,

  stats: [
    { ...s.accounts, label: 'accounts', detail: `who between them created ${s.figures.communities} communities` },
    { ...s.servers, label: 'servers created', detail: `${s.figures.peakServers} running at once, daily peak averaged` },
    {
      ...s.machines,
      label: 'dedicated machines',
      detail: `Rio de Janeiro and Bahia, ${s.figures.machinesActive} in use and ${s.figures.machinesSpare} spare`,
    },
    { ...s.loc, label: 'lines of TypeScript', detail: 'Panel and API, both first-party' },
  ],

  architecture: {
    intro: 'Four layers, each one there to stop a failure inside it from becoming a failure everywhere else.',
    diagram: {
      src: f.images.architecture,
      alt:
        'System diagram of ceu.gg: users reach a cloud gateway through Cloudflare, a site-to-site VPN carries traffic to the ' +
        'self-hosted router, Traefik fronts a Kubernetes cluster holding the servers, core-system and monitoring namespaces, ' +
        'and the bare-metal machines underneath run the VMs, the database and S3 storage.',
      caption: 'The whole platform on one page, from the bare metal up to the request path.',
    },
    layers: [
      {
        ...f.layers.physical,
        title: 'Bare metal',
        items: [
          'Dedicated AMD Ryzen and Intel Xeon servers',
          `${s.figures.machinesRio} machines in Rio de Janeiro, ${s.figures.machinesBahia} in Bahia, one of them still a spare`,
          'A cold-storage disk passed through to its VM',
          'Segmented network',
        ],
      },
      {
        ...f.layers.virtualization,
        title: 'Proxmox virtualization',
        items: ['Control plane and workloads on separate VMs', 'A crash takes down its VM and nothing else'],
      },
      {
        ...f.layers.orchestration,
        title: 'k3s cluster',
        items: [
          '`core-system` - the panel and the API',
          '`servers` - one pod per game server: app, watchdog, seeder, backup',
          '`monitoring` - Prometheus and Grafana',
          'Per-pod limits, automatic restarts, one deploy shape for everything',
        ],
      },
      {
        ...f.layers.edge,
        title: 'Edge and ingress',
        items: [
          'Cloudflare for DNS and TLS',
          'A site-to-site VPN from the cloud gateway to the self-hosted router',
          'MikroTik routing into the cluster',
          'Traefik with ACME DNS-01 certificates',
        ],
      },
    ],
  },

  flow: {
    intro: 'What actually happens between pressing the button and a world being reachable.',
    steps: [
      {
        id: f.flowSteps.wizard,
        actor: 'panel',
        title: 'The wizard asks in player language',
        detail:
          'Where do your friends play, plugins or mods. Software, version and template come from the answers, so nobody has to ' +
          'know what Paper, Purpur or Fabric are.',
      },
      {
        id: f.flowSteps.admission,
        actor: 'backend',
        title: 'Rules are checked, and almost nothing is allocated',
        detail:
          'Plan limits, community quota and ABAC permissions resolve first, and all that gets written is a database row, a ' +
          'reserved port and encrypted SFTP credentials. Nothing exists in the cluster yet.',
      },
      {
        id: f.flowSteps.queue,
        actor: 'engine',
        title: 'The first start goes through a queue',
        detail:
          'The entry carries a priority, paid before free, and a CronJob drains the queue every minute against current node ' +
          'capacity.',
      },
      {
        id: f.flowSteps.seed,
        actor: 'cluster',
        title: 'The seeder fills a fresh volume, then the pod comes up',
        detail:
          'The world zip is pulled from MinIO into a new PVC, and the pod starts with its watchdog and backup sidecars.',
      },
      {
        id: f.flowSteps.watch,
        actor: 'watchdog',
        title: 'Player count is polled over the Minecraft protocol',
        detail: 'A sidecar in every pod asks the game server itself, then reports the number back to the API.',
      },
      {
        id: f.flowSteps.idle,
        actor: 'engine',
        title: 'An empty server gets stopped',
        detail:
          'After ten idle minutes on the free tier the server stops, and its volume sits on the node for another thirty ' +
          'before the archive cron comes for it. The free tier works because most servers spend most of their time stopped.',
      },
      {
        id: f.flowSteps.archive,
        actor: 'storage',
        title: 'The world is zipped into object storage and the volume is deleted',
        detail: 'Restarting re-seeds from that zip. Nothing is lost, and an idle server holds no cluster capacity.',
      },
    ],
  },

  sky: {
    intro:
      'Sky is the assistant on the platform. It answers in the panel and in Discord, and it can act on the account of ' +
      "whoever is asking - with that person's permissions, never with any of its own.",
    blocks: [
      {
        id: f.skyBlocks.chat,
        label: '# the help chat',
        intro:
          'One engine answers in both places. The widget in the panel and the bot in Discord run the same service, and ' +
          'the Next.js route in front of the widget is a proxy that pipes the reply through as it arrives.',
        points: [
          'Replies stream over Server-Sent Events, and the same channel carries the status line the widget shows while a ' +
            'tool is running.',
          'Answers come from a curated set of markdown files about the platform, searched by keyword with heading matches ' +
            'weighted higher. There are no embeddings and no vector database; the corpus is small enough to load whole, ' +
            'so the common question never reaches a search at all.',
          'Every Discord channel has a mode - answer everything, answer only when mentioned, or stay out. Ticket channels ' +
            'get a greeting, and Sky keeps quiet when the person talking is staff.',
          'The bot runs on exactly one replica at a time, elected through a Postgres advisory lock. Losing the lock ' +
            'disconnects the gateway and another replica takes over.',
          'When it cannot solve something, `escalate_to_human` pings the team in that channel instead of letting the model ' +
            'improvise an answer.',
        ],
      },
      {
        id: f.skyBlocks.tools,
        label: '# tool calling',
        intro:
          `The model can call ${s.figures.skyTools} tools. None of them touch the database: each one is an HTTP call to ` +
          "the platform's own API carrying the JWT of the person in the conversation, so a tool call is authorised the " +
          'same way a click in the panel is.',
        points: [
          'Permissions come from ABAC, the same matrix the panel reads. Sky never holds a credential of its own.',
          'Reading is open to anyone signed in: communities, servers, live status, console output, files, backups, plan ' +
            'and balance.',
          'Writing - editing a config file, starting or stopping a server, running a console command, creating a backup - ' +
            'needs an active paid plan, and that check fails closed.',
          'Nothing destructive runs on the first call. The tool returns `needsConfirmation`, Sky has to ask, and only a ' +
            'second call with `confirmed: true` goes through.',
          'A reply gets at most six tool rounds, and the last round is served without tools, so it has to stop ' +
            'investigating and answer.',
        ],
      },
      {
        id: f.skyBlocks.investigation,
        label: '# diagnostics',
        intro:
          'When a server will not boot, the console is a wall of English stack traces. Diagnostics is a separate loop ' +
          'that reads the server and writes a report: what is wrong, the evidence for it, and the fixes as buttons.',
        points: [
          'The model gets read-only tools and eight rounds. The prompt pushes it to ask for several files in one round, ' +
            'because rounds are the scarce thing.',
          'It finishes by calling `submit_diagnosis`: a summary in plain Portuguese, findings marked `INFO`, `WARNING` or ' +
            '`CRITICAL`, and proposed actions. If it never calls it, the run returns text and no actions.',
          'Every finding has to cite something it actually read - a log line, a config value, a filename. Without that it ' +
            'is a guess, and a guess sends the owner to change the wrong thing.',
          'The quota belongs to the server, not to the account clicking. It comes from that server\'s hosting plan, and a ' +
            'community with several admins would otherwise get a different limit depending on who asked.',
          'A limit of zero also means unavailable, which is how the feature gets switched on and off for the free tier ' +
            'from the admin panel without a deploy.',
          'A run that passes its cost ceiling stops and returns what it has. A partial report beats an open invoice.',
          'Tool names are rewritten into plain language before the report is stored. One real report reached a customer ' +
            'reading `get_server retornou: "Não encontrei esse recurso"`.',
        ],
      },
    ],
  },

  engineering: {
    intro: 'Four that took real work, plus a few smaller ones I keep coming back to.',
    deepDives: [
      {
        ...f.deepDives.coldStorage,
        title: 'A server that is not running costs nothing',
        problem:
          'Every idle server pinning a volume to a node is capacity nobody is using. On a free tier, where most servers sit ' +
          'empty most of the time, that is the entire capacity budget.',
        approach: [
          'Creating a server allocates nothing in the cluster: a row, a reserved port, encrypted SFTP credentials. The first ' +
            'start does all the real work, and a CronJob drains it through ' +
            '`WAITING → PROCESSING → SEEDING → STARTING → COMPLETED | FAILED`.',
          'At rest a world is one object, `sv-{id}/.ceugg-world.zip`. A cron finds volumes idle past a 30-minute TTL, ' +
            'streams them out and deletes the volume.',
          'The write streams straight into a `.tmp` key, then `rclone moveto` promotes it. That move is a server-side copy, ' +
            'so it is atomic: a crashed upload leaves a stray `.tmp` and never touches the live zip.',
          'Reads resolve zip-first, which doubles as the migration story: loose objects under the prefix only exist as ' +
            'pre-migration leftovers.',
        ],
        outcome:
          `This is what lets ${s.figures.createdServers} created servers sit on ${s.figures.machines} machines. The ones ` +
          'nobody is playing on hold no cluster capacity at all, and come back from a single zip when someone does.',
      },
      {
        ...f.deepDives.scheduling,
        title: 'Capacity you cannot oversell',
        problem:
          'Paid plans promise reserved CPU and RAM. On a cluster that also runs a free tier, "reserved" only means something ' +
          'if the scheduler refuses to hand that capacity to anyone else.',
        approach: [
          'Nodes carry `ceu.gg/tier=high-performance` and `ceu.gg/storage-gb` labels. Disk gating rides on a label because ' +
            'Kubernetes does not expose volume-group size, and the namespaced ServiceAccount cannot list `persistentvolumes`.',
          'High-performance nodes are exclusive. A free or standard server never lands on one, even when it is empty.',
          'There is no silent downgrade. A high-performance request that cannot be placed parks in `WAITING_RESOURCES` and ' +
            'raises an ops alert.',
          'Standard nodes hold a hard 20% reserve for paid servers, and free servers never borrow it. Memory is reserved at ' +
            '100% because it is incompressible; CPU has a tunable request ratio because it is not.',
        ],
        outcome:
          'The guarantee holds by refusal, not by observation. A paid server finds its resources free because nothing else ' +
          'was allowed to take them.',
      },
      {
        ...f.deepDives.skyTools,
        title: 'Letting a model act on a real account',
        problem:
          'In the chat, unlike in diagnostics, Sky can start a server, rewrite a config file and run console commands. ' +
          'The model is the one deciding when to reach for those.',
        approach: [
          "Tools never touch a repository. Each one is an HTTP call to the platform's own API carrying the user's JWT, so " +
            'whether an action is allowed gets answered by the same ABAC, specifications and domain events that answer it ' +
            'for a click in the panel.',
          'The token is checked for expiry before the call. A dead session returns a `session_expired` payload that ' +
            'doubles as an instruction: ask the person to sign in again, do not retry.',
          'The paid-plan gate fails closed. If the plan lookup itself errors, the write does not happen.',
          'Anything destructive returns `needsConfirmation` instead of running. Sky has to ask, wait for a yes, and call ' +
            'again with `confirmed: true`.',
        ],
        outcome:
          'The model picks what to attempt. It never picks what it is allowed to do. The diagnostic mode answers the ' +
          'same question by deleting the write tools altogether, because there the input is text any player can author.',
      },
      {
        ...f.deepDives.skyDiagnostics,
        title: 'An agent with no write tools',
        problem:
          "Sky reads a server's console, config files and plugin list to explain why it will not boot. Any player on that " +
          'server can write to all three.',
        approach: [
          'In diagnostic mode the model gets no write tools at all. So a file named to look like an instruction stays what ' +
            'it is: text in a report.',
          'Authorization never comes from the model. The client sends only the id of a proposed action, and the backend ' +
            're-reads that action from what was persisted on the run and revalidates it from scratch.',
          'Actions are a closed allow-list. Each one passes ABAC, plan, quota and cooldown before it runs.',
        ],
        outcome:
          'A hostile filename can change what the model says. It cannot change what the system does - that is the whole ' +
          "point of keeping the authority outside the model's output.",
      },
    ],
    smallerFixes: [
      {
        id: f.smallerFixes.heapCeiling,
        title: 'Heap ceiling against the container limit',
        detail:
          '`--max-old-space-size=768` under a 1Gi limit. Left alone, V8 aims at a ceiling the cgroup will not give it, and ' +
          'the kernel OOM-kills the process before a full GC runs.',
      },
      {
        id: f.smallerFixes.threadpool,
        title: 'libuv threads against cgroup cores',
        detail:
          "`UV_THREADPOOL_SIZE` cut from 16 to 8. Node sized its pool from the host's 38 cores, not the 4 it actually had, " +
          'so the threads oversubscribed by 4× and stalled under archive and SFTP bursts.',
      },
      {
        id: f.smallerFixes.agentLeak,
        title: 'A socket leak in the Kubernetes client',
        detail:
          'Every client construction built a fresh `https.Agent`, so connections piled up in ESTABLISHED and were never ' +
          'reused. Memoising the agent fixed it.',
      },
    ],
  },

  observability: {
    intro:
      'Prometheus and Grafana on the cluster, OpenTelemetry inside the services: traces, metrics and logs across eight ' +
      'server-side instrumentations. Tracing is currently sampled off in production, because at this size it cost more CPU ' +
      'than the traces were returning.',
    screenshot: {
      src: f.images.grafana,
      alt: 'Grafana dashboard showing cluster CPU and memory utilisation, active pod counts and API gateway throughput.',
      caption: 'Without metrics there is no mature technical decision-making, only opinions with a deploy button.',
    },
    covers: [
      'Cluster and per-workload CPU',
      'Node and pod memory',
      'Active pod count and cluster state',
      'API gateway latency, error rate and throughput',
      'Per-server resource use and availability',
      'Node capacity snapshots, feeding the scheduler',
    ],
  },

  security: {
    intro:
      'A free tier is an open invitation. Mass server creation, arbitrary code execution and hostile file uploads all have ' +
      'to be barred.',
    measures: [
      'No executable uploads. Plugins, mods and datapacks arrive through the integrated CurseForge and Modrinth catalogue.',
      'Everything goes through the panel and the API. There is no shell, and no path from a game server to the host filesystem.',
      'Containers run non-root, with CPU and memory limits per pod.',
      'Permissions are ABAC throughout: a matrix the frontend reads from the API, never a hardcoded role check.',
    ],
  },

  incidents: {
    intro: 'Two changed how the platform is run.',
    items: [
      {
        id: f.incidents.coldStorageDetach,
        title: 'The cold-storage disk detached',
        impact: 'The disk backing cold storage dropped out with no warning.',
        lesson: 'Redundancy stopped being a later problem, and recovery got a written procedure.',
      },
      {
        id: f.incidents.ipv4Outage,
        title: 'A day without IPv4',
        impact: 'IPv4 access was lost for close to a full day.',
        lesson: 'Access now runs over independent routes, so losing one no longer takes the platform down.',
      },
    ],
    openQuestions: [
      'Scheduling places servers by availability. There is no regional strategy yet - fine at this size, and it will not ' +
        'stay fine.',
      'Monitoring says network and memory become the first limiters as the platform grows, ahead of CPU.',
    ],
  },

  timeline: [
    {
      ...milestones.alpha,
      title: 'First servers on own hardware',
      description: 'A panel, a cluster, and enough of an engine to create a world and connect to it.',
    },
    {
      ...milestones.v018,
      title: 'Addressing and control',
      description:
        'Custom subdomains, extra TCP and UDP ports with SRV records for plugins that need their own connections, force ' +
        'stop, and console logs that survive a restart.',
    },
    {
      ...milestones.v100,
      title: 'Public beta',
      description:
        'The startup queue with live progress, the file manager, ABAC permissions with a role hierarchy, Google Drive ' +
        'backups, and audit logs derived from domain events.',
    },
    {
      ...milestones.v15,
      title: 'Capacity awareness',
      description:
        'Node capacity snapshots, queue admission by available capacity, and the `WAITING_RESOURCES` state. The memoised ' +
        '`https.Agent` fix landed here, and Sky reached Discord.',
    },
    {
      ...milestones.v200,
      title: 'Reserved capacity and a diagnostic agent',
      description:
        'The largest change since beta. Per-server plans with genuinely reserved CPU, RAM and disk; exclusive ' +
        "high-performance node pools bounded by real hardware; a guided creation flow; and Sky's read-only diagnostic mode.",
    },
  ],

  stack: [
    { label: 'Frontend', items: f.stack.frontend },
    { label: 'Backend', items: f.stack.backend },
    { label: 'Data', items: f.stack.data },
    { label: 'AI', items: f.stack.ai },
    { label: 'Infrastructure', items: f.stack.infrastructure },
    { label: 'Observability', items: f.stack.observability },
    { label: 'Integrations', items: f.stack.integrations },
  ],
};
