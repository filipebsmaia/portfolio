import { ceuGgFacts as f, milestonesFor, statsFor } from './ceu-gg.shared';
import type { CaseStudy } from './types';

const milestones = milestonesFor(['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']);
const s = statsFor('pt-BR');

export const ceuGgPtBr: CaseStudy = {
  ...f.identity,
  tagline:
    'Hospedagem de servidores de Minecraft em bare metal self-hosted, com uma engine de orquestração escrita do zero.',
  role: 'Desenvolvedor - painel, API, engine de provisionamento, imagens de container, infraestrutura',
  period: 'Desde dez 2025',
  status: 'Em produção',
  sourceNote: 'Código-fonte privado',

  seo: {
    title: 'ceu.gg - infraestrutura de hospedagem de Minecraft',
    description:
      'Como o ceu.gg roda servidores de Minecraft multi-tenant em bare metal self-hosted: uma engine de provisionamento sobre ' +
      'Kubernetes feita em casa, cold storage escrito de forma atômica, um scheduler que se recusa a vender capacidade ' +
      'reservada duas vezes, e a Sky, uma assistente que chama ferramentas com as permissões do próprio usuário e ' +
      'investiga servidores quebrados sem nenhuma ferramenta de escrita.',
    keywords: f.seoKeywords,
  },

  sections: {
    overview: 'O que é',
    architecture: 'As camadas',
    provisioning: 'De um botão a um mundo no ar',
    sky: 'A assistente',
    engineering: 'Problemas que valeu a pena anotar',
    operations: 'Operando',
    incidents: 'O que quebrou e o que ainda está aberto',
    timeline: 'Histórico de entregas',
    stack: 'Stack completa',
  },

  summary: [
    'O ceu.gg dá às pessoas um servidor de Minecraft para jogar com os amigos sem exigir que entendam nada disso. Escolhe ' +
      'a versão, aperta um botão, compartilha o endereço. O plano gratuito continua gratuito, e há planos pagos para quem ' +
      'cresce além dele.',
    'O painel, a API, a engine de provisionamento e as imagens de container são todos feitos aqui. Não há painel de ' +
      'prateleira por baixo. Os servidores rodam em Kubernetes sobre bare metal self-hosted, em duas localidades no ' +
      'Brasil, atrás de um roteamento que eu mesmo configuro. Eu escrevo o código; um parceiro divide comigo o ' +
      'brainstorm, os testes e o suporte. Duas coisas definem o formato de todo o resto: o hardware é cotado em dólar ' +
      'enquanto a receita entra em real, e duas pessoas só têm as horas que têm. Por isso simplicidade aqui é requisito.',
  ],

  highlights: [
    'Da tabela de roteamento ao painel, tudo é de primeira parte',
    'Criar um servidor não aloca nada além de uma linha no banco',
    'A capacidade reservada se sustenta porque o scheduler se recusa a colocar outra coisa nela',
    'O agente de diagnóstico lê texto escrito por jogadores e não tem nenhuma ferramenta de escrita',
    'O chat age na sua conta com as suas permissões, nunca com as próprias',
  ],

  statsAsOf: `Números lidos da API de métricas do ceu.gg em ${s.asOf}.`,

  stats: [
    { ...s.accounts, label: 'contas', detail: `que criaram ${s.figures.communities} comunidades` },
    {
      ...s.servers,
      label: 'servidores criados',
      detail: `${s.figures.peakServers} no ar ao mesmo tempo, média do pico diário`,
    },
    {
      ...s.machines,
      label: 'máquinas dedicadas',
      detail: `Rio de Janeiro e Bahia, ${s.figures.machinesActive} ativas e ${s.figures.machinesSpare} de reserva`,
    },
    { ...s.loc, label: 'linhas de TypeScript', detail: 'Painel e API, ambos de primeira parte' },
  ],

  architecture: {
    intro: 'Quatro camadas, cada uma para impedir que uma falha dentro dela vire uma falha em todo o resto.',
    diagram: {
      src: f.images.architecture,
      alt:
        'Diagrama do ceu.gg: usuários chegam a um gateway na nuvem via Cloudflare, uma VPN site-to-site leva o tráfego até ' +
        'o roteador próprio, o Traefik fica na frente de um cluster Kubernetes com os namespaces servers, core-system e ' +
        'monitoring, e as máquinas bare metal embaixo rodam as VMs, o banco e o storage S3.',
      caption: 'A plataforma inteira em uma página, do bare metal até o caminho da requisição.',
    },
    layers: [
      {
        ...f.layers.physical,
        title: 'Bare metal',
        items: [
          'Servidores dedicados AMD Ryzen e Intel Xeon',
          `${s.figures.machinesRio} máquinas no Rio de Janeiro, ${s.figures.machinesBahia} na Bahia, uma delas ainda de reserva`,
          'Um disco de cold storage com passthrough para a VM',
          'Rede segmentada',
        ],
      },
      {
        ...f.layers.virtualization,
        title: 'Virtualização com Proxmox',
        items: ['Control plane e workloads em VMs separadas', 'Uma pane derruba a VM e mais nada'],
      },
      {
        ...f.layers.orchestration,
        title: 'Cluster k3s',
        items: [
          '`core-system` - o painel e a API',
          '`servers` - um pod por servidor de jogo: app, watchdog, seeder, backup',
          '`monitoring` - Prometheus e Grafana',
          'Limites por pod, restart automático, um único formato de deploy para tudo',
        ],
      },
      {
        ...f.layers.edge,
        title: 'Borda e entrada de tráfego',
        items: [
          'Cloudflare para DNS e TLS',
          'Uma VPN site-to-site do gateway na nuvem até o roteador próprio',
          'Roteamento MikroTik para dentro do cluster',
          'Traefik com certificados ACME via DNS-01',
        ],
      },
    ],
  },

  flow: {
    intro: 'O que realmente acontece entre apertar o botão e o mundo ficar acessível.',
    steps: [
      {
        id: f.flowSteps.wizard,
        actor: 'painel',
        title: 'O wizard pergunta em linguagem de jogador',
        detail:
          'Onde seus amigos jogam, plugins ou mods. Software, versão e template saem das respostas, então ninguém precisa ' +
          'saber o que é Paper, Purpur ou Fabric.',
      },
      {
        id: f.flowSteps.admission,
        actor: 'backend',
        title: 'As regras são checadas, e quase nada é alocado',
        detail:
          'Limites do plano, cota da comunidade e permissões ABAC são resolvidos primeiro, e tudo o que se escreve é uma ' +
          'linha no banco, uma porta reservada e credenciais SFTP cifradas. Nada existe no cluster ainda.',
      },
      {
        id: f.flowSteps.queue,
        actor: 'engine',
        title: 'O primeiro start passa por uma fila',
        detail:
          'A entrada carrega uma prioridade, pago antes de gratuito, e um CronJob drena a fila a cada minuto, respeitando a ' +
          'capacidade atual dos nós.',
      },
      {
        id: f.flowSteps.seed,
        actor: 'cluster',
        title: 'O seeder preenche um volume novo e então o pod sobe',
        detail: 'O zip do mundo é puxado do MinIO para um PVC novo, e o pod sobe com os sidecars de watchdog e backup.',
      },
      {
        id: f.flowSteps.watch,
        actor: 'watchdog',
        title: 'A contagem de jogadores vem do protocolo do Minecraft',
        detail: 'Um sidecar em cada pod pergunta ao próprio servidor de jogo e devolve o número para a API.',
      },
      {
        id: f.flowSteps.idle,
        actor: 'engine',
        title: 'Um servidor vazio é desligado',
        detail:
          'Depois de dez minutos sem ninguém, o servidor do plano gratuito para, e o volume ainda fica trinta minutos no nó ' +
          'antes de o cron de arquivamento levá-lo. O plano gratuito funciona porque a maioria dos servidores passa a maior ' +
          'parte do tempo desligada.',
      },
      {
        id: f.flowSteps.archive,
        actor: 'storage',
        title: 'O mundo é zipado no object storage e o volume é apagado',
        detail:
          'Ligar de novo recria o mundo a partir desse zip. Nada se perde, e um servidor ocioso não ocupa nada do cluster.',
      },
    ],
  },

  sky: {
    intro:
      'A Sky é a assistente da plataforma. Ela responde no painel e no Discord, e consegue agir na conta de quem está ' +
      'perguntando - com as permissões dessa pessoa, nunca com as próprias.',
    blocks: [
      {
        id: f.skyBlocks.chat,
        label: '# o chat de ajuda',
        intro:
          'Um motor só responde nos dois lugares. O widget do painel e o bot do Discord rodam o mesmo serviço, e a rota ' +
          'do Next na frente do widget é um proxy que repassa a resposta conforme ela chega.',
        points: [
          'As respostas chegam em stream por Server-Sent Events, e o mesmo canal carrega a linha de status que o widget ' +
            'mostra enquanto uma ferramenta roda.',
          'As respostas saem de um conjunto curado de arquivos markdown sobre a plataforma, buscados por palavra-chave ' +
            'com peso maior para o que casa no título da seção. Não há embeddings nem banco vetorial; o corpus é pequeno ' +
            'o bastante para carregar inteiro, então a pergunta comum nem chega a uma busca.',
          'Cada canal do Discord tem um modo - responder tudo, responder só quando mencionada, ou ficar de fora. Canais ' +
            'de ticket ganham uma saudação, e a Sky se cala quando quem está falando é a equipe.',
          'O bot roda em exatamente uma réplica por vez, eleita por um advisory lock do Postgres. Perder o lock ' +
            'desconecta o gateway e outra réplica assume.',
          'Quando não consegue resolver, o `escalate_to_human` chama a equipe naquele canal em vez de deixar o modelo ' +
            'improvisar uma resposta.',
        ],
      },
      {
        id: f.skyBlocks.tools,
        label: '# chamada de ferramentas',
        intro:
          `O modelo pode chamar ${s.figures.skyTools} ferramentas. Nenhuma delas encosta no banco: cada uma é uma ` +
          'chamada HTTP para a API da própria plataforma levando o JWT de quem está na conversa, então uma chamada de ' +
          'ferramenta é autorizada do mesmo jeito que um clique no painel.',
        points: [
          'As permissões vêm do ABAC, a mesma matriz que o painel lê. A Sky nunca tem credencial própria.',
          'Leitura é liberada para qualquer um logado: comunidades, servidores, status ao vivo, console, arquivos, ' +
            'backups, plano e saldo.',
          'Escrita - editar um arquivo de configuração, ligar ou desligar um servidor, rodar um comando no console, ' +
            'criar backup - exige plano pago ativo, e essa checagem falha fechada.',
          'Nada destrutivo roda na primeira chamada. A ferramenta devolve `needsConfirmation`, a Sky precisa perguntar, ' +
            'e só uma segunda chamada com `confirmed: true` passa.',
          'Cada resposta tem no máximo seis rodadas de ferramenta, e a última rodada vai sem ferramenta nenhuma, para ' +
            'obrigar a parar de investigar e responder.',
        ],
      },
      {
        id: f.skyBlocks.investigation,
        label: '# diagnóstico',
        intro:
          'Quando um servidor não sobe, o console é uma parede de stack trace em inglês. O diagnóstico é um loop ' +
          'separado que lê o servidor e escreve um laudo: o que está errado, a evidência disso, e as correções como ' +
          'botões.',
        points: [
          'O modelo recebe ferramentas de leitura e oito rodadas. O prompt empurra ele a pedir vários arquivos na mesma ' +
            'rodada, porque rodada é o que falta.',
          'Ele termina chamando `submit_diagnosis`: um resumo em português, achados marcados como `INFO`, `WARNING` ou ' +
            '`CRITICAL`, e ações propostas. Se ele não chamar, a execução devolve texto e nenhuma ação.',
          'Todo achado precisa citar algo que ele leu de fato - uma linha de log, um valor de config, um nome de ' +
            'arquivo. Sem isso é chute, e chute faz o dono do servidor mexer no lugar errado.',
          'A cota é do servidor, não da conta que clicou. Ela sai do plano de hospedagem daquele servidor, e uma ' +
            'comunidade com vários administradores teria limites diferentes dependendo de quem pedisse.',
          'Limite zero também quer dizer indisponível, e é assim que a feature liga e desliga para o gratuito pelo admin ' +
            'sem precisar de deploy.',
          'Uma execução que passa do teto de custo para e devolve o que tem. Um laudo parcial vale mais que uma fatura ' +
            'aberta.',
          'Os nomes das ferramentas viram linguagem de gente antes de o laudo ser salvo. Um laudo real chegou ao cliente ' +
            'dizendo `get_server retornou: "Não encontrei esse recurso"`.',
        ],
      },
    ],
  },

  engineering: {
    intro: 'Quatro que deram trabalho de verdade, e alguns menores que ficaram anotados.',
    deepDives: [
      {
        ...f.deepDives.coldStorage,
        title: 'Um servidor que não está rodando não custa nada',
        problem:
          'Todo servidor ocioso prendendo um volume a um nó é capacidade que ninguém está usando. Num plano gratuito, onde ' +
          'a maioria dos servidores fica vazia a maior parte do tempo, isso é o orçamento inteiro de capacidade.',
        approach: [
          'Criar um servidor não aloca nada no cluster: uma linha, uma porta reservada, credenciais SFTP cifradas. O ' +
            'primeiro start faz todo o trabalho de verdade, e um CronJob o drena por ' +
            '`WAITING → PROCESSING → SEEDING → STARTING → COMPLETED | FAILED`.',
          'Em repouso, um mundo é um objeto só: `sv-{id}/.ceugg-world.zip`. Um cron encontra volumes ociosos além de um TTL ' +
            'de 30 minutos, manda o conteúdo para o object storage e apaga o volume.',
          'A escrita vai direto em stream para uma chave `.tmp`, e o `rclone moveto` promove essa chave. Esse move é uma ' +
            'cópia feita dentro do próprio storage, então é atômico: um upload que quebra deixa um `.tmp` órfão e nunca ' +
            'encosta no zip vivo.',
          'As leituras resolvem o zip primeiro, e isso resolveu a migração de graça: objeto solto sob o prefixo é só resto ' +
            'de antes.',
        ],
        outcome:
          `É isso que permite manter ${s.figures.createdServers} servidores criados em ${s.figures.machines} máquinas. Os ` +
          'que ninguém está jogando não ocupam nada do cluster, e voltam de um único zip quando alguém joga.',
      },
      {
        ...f.deepDives.scheduling,
        title: 'Capacidade que não dá para vender duas vezes',
        problem:
          'Planos pagos prometem CPU e RAM reservadas. Num cluster que também roda um plano gratuito, "reservada" só quer ' +
          'dizer alguma coisa se o scheduler se recusar a entregar essa capacidade a mais alguém.',
        approach: [
          'Os nós carregam as labels `ceu.gg/tier=high-performance` e `ceu.gg/storage-gb`. O controle de disco fica numa ' +
            'label porque o Kubernetes não expõe o tamanho do volume group, e a ServiceAccount, restrita ao namespace, não ' +
            'pode listar `persistentvolumes`.',
          'Nós de alta performance são exclusivos. Um servidor gratuito ou comum nunca cai em um deles, mesmo vazio.',
          'Não existe downgrade silencioso. Um pedido de alta performance que não pode ser alocado fica em ' +
            '`WAITING_RESOURCES` e dispara um alerta de operação.',
          'Os nós comuns guardam uma reserva fixa de 20% para servidores pagos, e os gratuitos nunca pegam emprestado. ' +
            'Memória é reservada em 100% porque é incompressível; CPU tem um fator de request ajustável porque não é.',
        ],
        outcome:
          'A garantia se sustenta por recusa, não por observação. Um servidor pago encontra seus recursos livres porque ' +
          'nada mais teve permissão de ocupá-los.',
      },
      {
        ...f.deepDives.skyTools,
        title: 'Deixar um modelo agir numa conta de verdade',
        problem:
          'No chat, diferente do diagnóstico, a Sky consegue ligar um servidor, reescrever um arquivo de configuração e ' +
          'rodar comandos no console. Quem decide quando usar isso é o modelo.',
        approach: [
          'As ferramentas nunca encostam num repositório. Cada uma é uma chamada HTTP para a API da própria plataforma ' +
            'levando o JWT do usuário, então quem responde se a ação é permitida é o mesmo ABAC, as mesmas ' +
            'specifications e os mesmos eventos de domínio que respondem isso para um clique no painel.',
          'A validade do token é checada antes da chamada. Sessão morta devolve um `session_expired` que também serve de ' +
            'instrução: peça para a pessoa entrar de novo, não tente de novo sozinha.',
          'O gate de plano pago falha fechado. Se a própria consulta do plano der erro, a escrita não acontece.',
          'Qualquer coisa destrutiva devolve `needsConfirmation` em vez de rodar. A Sky precisa perguntar, esperar o sim, ' +
            'e chamar de novo com `confirmed: true`.',
        ],
        outcome:
          'O modelo escolhe o que tentar. Ele nunca escolhe o que tem permissão de fazer. O modo diagnóstico responde a ' +
          'mesma pergunta apagando as ferramentas de escrita, porque lá a entrada é texto que qualquer jogador pode ter ' +
          'escrito.',
      },
      {
        ...f.deepDives.skyDiagnostics,
        title: 'Um agente sem ferramentas de escrita',
        problem:
          'A Sky lê o console, os arquivos de configuração e a lista de plugins de um servidor para explicar por que ele não ' +
          'sobe. Qualquer jogador daquele servidor consegue escrever nos três.',
        approach: [
          'No modo diagnóstico o modelo não recebe nenhuma ferramenta de escrita. Assim, um arquivo com nome feito para ' +
            'parecer uma instrução continua sendo o que é: texto num relatório.',
          'A autorização nunca vem do modelo. O cliente manda só o id de uma ação proposta, e o backend relê essa ação a ' +
            'partir do que foi persistido naquela execução e revalida do zero.',
          'As ações são uma allow-list fechada. Cada uma passa por ABAC, plano, cota e cooldown antes de rodar.',
        ],
        outcome:
          'Um nome de arquivo malicioso consegue mudar o que o modelo diz. Não consegue mudar o que o sistema faz - é ' +
          'exatamente para isso que a autoridade fica fora da saída do modelo.',
      },
    ],
    smallerFixes: [
      {
        id: f.smallerFixes.heapCeiling,
        title: 'Teto de heap abaixo do limite do container',
        detail:
          '`--max-old-space-size=768` sob um limite de 1Gi. Sem isso, o V8 mira num teto que o cgroup não vai dar, e o ' +
          'kernel mata o processo por OOM antes de um GC completo rodar.',
      },
      {
        id: f.smallerFixes.threadpool,
        title: 'Threads da libuv dimensionadas pelo host errado',
        detail:
          '`UV_THREADPOOL_SIZE` reduzido de 16 para 8. O Node dimensionava o pool pelos 38 cores do host, e não pelos 4 que ' +
          'tinha de fato, então as threads disputavam 4× mais CPU do que existia e travavam nos picos de arquivamento e SFTP.',
      },
      {
        id: f.smallerFixes.agentLeak,
        title: 'Um vazamento de sockets no cliente Kubernetes',
        detail:
          'Cada construção do cliente criava um `https.Agent` novo, então as conexões se acumulavam em ESTABLISHED e nunca ' +
          'eram reaproveitadas. Memoizar o agent resolveu.',
      },
    ],
  },

  observability: {
    intro:
      'Prometheus e Grafana no cluster, OpenTelemetry dentro dos serviços: traces, métricas e logs em oito instrumentações ' +
      'no servidor. O tracing está com sampling desligado em produção, porque neste tamanho custava mais CPU do que os ' +
      'traces entregavam.',
    screenshot: {
      src: f.images.grafana,
      alt: 'Dashboard do Grafana com uso de CPU e memória do cluster, contagem de pods ativos e throughput do API gateway.',
      caption: 'Sem métricas não existe decisão técnica madura, só opinião com botão de deploy.',
    },
    covers: [
      'CPU do cluster e por workload',
      'Memória de nós e pods',
      'Contagem de pods ativos e estado do cluster',
      'Latência, taxa de erro e throughput do API gateway',
      'Uso de recursos e disponibilidade por servidor',
      'Snapshots de capacidade dos nós, alimentando o scheduler',
    ],
  },

  security: {
    intro:
      'Um plano gratuito é um convite aberto. Criação em massa de servidores, execução de código arbitrário e upload de ' +
      'arquivos hostis precisam ser barrados.',
    measures: [
      'Nada de upload de executável. Plugins, mods e datapacks chegam pelo catálogo integrado do CurseForge e do Modrinth.',
      'Tudo passa pelo painel e pela API. Não há shell, e não há caminho de um servidor de jogo até o filesystem do host.',
      'Os containers rodam como não-root, com limites de CPU e memória por pod.',
      'As permissões são ABAC de ponta a ponta: uma matriz que o frontend lê da API, nunca uma checagem de cargo no código.',
    ],
  },

  incidents: {
    intro: 'Dois mudaram o jeito de operar a plataforma.',
    items: [
      {
        id: f.incidents.coldStorageDetach,
        title: 'O disco de cold storage se desconectou',
        impact: 'O disco por trás do cold storage caiu sem aviso.',
        lesson: 'Redundância saiu da lista de "depois a gente resolve", e a recuperação ganhou procedimento escrito.',
      },
      {
        id: f.incidents.ipv4Outage,
        title: 'Um dia sem IPv4',
        impact: 'O acesso IPv4 ficou fora por quase um dia inteiro.',
        lesson: 'O acesso passou a ter rotas independentes, então perder uma delas não derruba mais a plataforma.',
      },
    ],
    openQuestions: [
      'O scheduling aloca servidores por disponibilidade. Ainda não há estratégia regional - tudo bem neste tamanho, e não ' +
        'vai continuar tudo bem.',
      'O monitoramento diz que rede e memória vão ser os primeiros limitadores conforme a plataforma cresce, antes da CPU.',
    ],
  },

  timeline: [
    {
      ...milestones.alpha,
      title: 'Primeiros servidores em hardware próprio',
      description: 'Um painel, um cluster e engine o suficiente para criar um mundo e conectar nele.',
    },
    {
      ...milestones.v018,
      title: 'Endereçamento e controle',
      description:
        'Subdomínios personalizados, portas TCP e UDP extras com registros SRV para plugins que precisam de conexão ' +
        'própria, parada forçada e logs de console que sobrevivem a um restart.',
    },
    {
      ...milestones.v100,
      title: 'Beta pública',
      description:
        'A fila de inicialização com progresso ao vivo, o gerenciador de arquivos, permissões ABAC com hierarquia de ' +
        'cargos, backups no Google Drive e logs de auditoria derivados de domain events.',
    },
    {
      ...milestones.v15,
      title: 'Consciência de capacidade',
      description:
        'Snapshots de capacidade dos nós, admissão na fila pela capacidade disponível, e o estado `WAITING_RESOURCES`. A ' +
        'correção do `https.Agent` memoizado entrou aqui, e a Sky chegou ao Discord.',
    },
    {
      ...milestones.v200,
      title: 'Capacidade reservada e um agente de diagnóstico',
      description:
        'A maior mudança desde a beta. Planos por servidor com CPU, RAM e disco de fato reservados; pools de nós de alta ' +
        'performance exclusivos e limitados pelo hardware real; um fluxo de criação guiado; e o modo de diagnóstico ' +
        'somente-leitura da Sky.',
    },
  ],

  stack: [
    { label: 'Frontend', items: f.stack.frontend },
    { label: 'Backend', items: f.stack.backend },
    { label: 'Dados', items: f.stack.data },
    { label: 'IA', items: f.stack.ai },
    { label: 'Infraestrutura', items: f.stack.infrastructure },
    { label: 'Observabilidade', items: f.stack.observability },
    { label: 'Integrações', items: f.stack.integrations },
  ],
};
