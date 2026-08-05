export const projects = [
  {
    slug: 'copiloto-atendimento',
    year: '2026',
    title: 'Copiloto de Atendimento',
    role: { pt: 'tech lead + arquitetura', en: 'tech lead + architecture' },
    summary: {
      pt: 'Agente de suporte com recuperação de contexto, avaliação contínua e roteamento para humano.',
      en: 'Support agent with context retrieval, continuous evals and human handoff.',
    },
    meta: {
      pt: '1.2M msg/mês · custo por resposta −38%',
      en: '1.2M msg/month · cost per response −38%',
    },
    stack: ['Python', 'LangGraph', 'pgvector', 'FastAPI', 'AWS'],
    featured: true,
    metrics: [
      { value: '1.2', unit: 'M', label: { pt: 'mensagens por mês', en: 'messages per month' } },
      { value: '−38', unit: '%', label: { pt: 'custo por resposta', en: 'cost per response' } },
      { value: '62', unit: '%', label: { pt: 'resolvido sem humano', en: 'resolved without a human' } },
    ],
    blocks: [
      {
        label: { pt: '// problema', en: '// problem' },
        body: {
          pt: 'A operação recebia 1.2M de mensagens por mês em quatro canais. O tempo médio de primeira resposta passava de doze minutos e o time de suporte crescia mais rápido que a receita.',
          en: 'The operation handled 1.2M messages a month across four channels. First response took over twelve minutes and the support team was growing faster than revenue.',
        },
      },
      {
        label: { pt: '// decisões', en: '// decisions' },
        list: {
          pt: [
            'Grafo de estados em LangGraph em vez de cadeia linear — cada nó tem critério de saída explícito.',
            'Recuperação em duas etapas: busca vetorial em pgvector e reranking por regra de negócio.',
            'Roteamento para humano como caminho de primeira classe, não como falha.',
            'Suíte de avaliação rodando em CI com 400 casos rotulados pelo próprio time de suporte.',
          ],
          en: [
            'A LangGraph state graph instead of a linear chain — every node has an explicit exit criterion.',
            'Two-stage retrieval: pgvector search plus business-rule reranking.',
            'Human handoff as a first-class path, not a failure state.',
            'Eval suite in CI with 400 cases labelled by the support team itself.',
          ],
        },
      },
      {
        label: { pt: '// resultado', en: '// outcome' },
        body: {
          pt: 'Primeira resposta caiu para 40 segundos. 62% dos atendimentos fecham sem humano e o custo por resposta caiu 38% depois da troca do modelo grande por um menor com recuperação melhor.',
          en: 'First response dropped to 40 seconds. 62% of conversations close without a human, and cost per response fell 38% after swapping the large model for a smaller one with better retrieval.',
        },
      },
      {
        label: { pt: '// o que eu faria diferente', en: '// what I would change' },
        body: {
          pt: 'Montaria a suíte de avaliação antes da primeira versão do agente. Passamos seis semanas discutindo prompt sem ter como medir se algo tinha melhorado.',
          en: 'I would build the eval suite before the first version of the agent. We spent six weeks arguing about prompts with no way to tell if anything got better.',
        },
      },
    ],
  },
  {
    slug: 'plataforma-dados',
    year: '2025',
    title: 'Plataforma de Dados Multi-tenant',
    role: { pt: 'staff engineer', en: 'staff engineer' },
    summary: {
      pt: 'Ingestão, isolamento por cliente e dashboards em tempo real para 40 contas.',
      en: 'Ingestion, per-tenant isolation and real-time dashboards across 40 accounts.',
    },
    meta: { pt: '40 clientes · time de 9 pessoas', en: '40 clients · team of 9' },
    stack: ['TypeScript', 'Kafka', 'Postgres', 'Terraform'],
    featured: true,
    metrics: [
      { value: '40', unit: '', label: { pt: 'clientes ativos', en: 'active clients' } },
      { value: '80', unit: 'k', label: { pt: 'eventos por segundo', en: 'events per second' } },
      { value: '9', unit: '', label: { pt: 'pessoas no time', en: 'people on the team' } },
    ],
    blocks: [
      {
        label: { pt: '// problema', en: '// problem' },
        body: {
          pt: 'Cada cliente tinha uma instância própria do produto. Subir uma conta nova levava duas semanas e qualquer correção precisava ser aplicada quarenta vezes.',
          en: 'Every client ran a separate instance of the product. Onboarding an account took two weeks and every fix had to be applied forty times.',
        },
      },
      {
        label: { pt: '// decisões', en: '// decisions' },
        list: {
          pt: [
            'Isolamento por row-level security no Postgres em vez de banco por cliente.',
            'Ingestão única em Kafka com particionamento por tenant.',
            'Provisionamento de conta como pipeline em Terraform, não como runbook manual.',
          ],
          en: [
            'Row-level security in Postgres instead of a database per client.',
            'A single Kafka ingestion path partitioned by tenant.',
            'Account provisioning as a Terraform pipeline, not a manual runbook.',
          ],
        },
      },
      {
        label: { pt: '// resultado', en: '// outcome' },
        body: {
          pt: 'Onboarding de cliente caiu de duas semanas para quarenta minutos. O time passou a entregar uma vez por dia em vez de uma vez por sprint.',
          en: 'Client onboarding went from two weeks to forty minutes. The team started shipping daily instead of once per sprint.',
        },
      },
    ],
  },
  {
    slug: 'api-gateway',
    year: '2024',
    title: 'API Gateway de Alta Performance',
    role: { pt: 'senior backend engineer', en: 'senior backend engineer' },
    summary: {
      pt: 'Rate limiting, JWT, cache distribuído e observabilidade via OpenTelemetry.',
      en: 'Rate limiting, JWT, distributed cache and OpenTelemetry observability.',
    },
    meta: { pt: 'Rust · gRPC · p99 em 12ms', en: 'Rust · gRPC · 12ms p99' },
    stack: ['Rust', 'gRPC', 'Redis', 'Kubernetes'],
    featured: true,
    metrics: [
      { value: '12', unit: 'ms', label: { pt: 'latência p99', en: 'p99 latency' } },
      { value: '30', unit: '', label: { pt: 'serviços atrás do gateway', en: 'services behind it' } },
      { value: '−60', unit: '%', label: { pt: 'custo de compute', en: 'compute cost' } },
    ],
    blocks: [
      {
        label: { pt: '// problema', en: '// problem' },
        body: {
          pt: 'O gateway em Node saturava a 4k requisições por segundo e cada serviço implementava autenticação do seu jeito.',
          en: 'The Node gateway saturated at 4k requests per second and each service implemented auth its own way.',
        },
      },
      {
        label: { pt: '// decisões', en: '// decisions' },
        list: {
          pt: [
            'Reescrita em Rust com Tower, mantendo a interface pública idêntica.',
            'Validação de JWT no edge, com cache de chaves em Redis.',
            'Trace propagado do gateway até o banco via OpenTelemetry.',
          ],
          en: [
            'Rewritten in Rust with Tower, keeping the public interface identical.',
            'JWT validated at the edge, with key caching in Redis.',
            'Traces propagated from gateway to database via OpenTelemetry.',
          ],
        },
      },
      {
        label: { pt: '// resultado', en: '// outcome' },
        body: {
          pt: 'p99 de 12ms com um terço das instâncias. A migração foi feita por sombra de tráfego, sem janela de manutenção.',
          en: '12ms p99 on a third of the instances. Migrated by shadowing traffic, with no maintenance window.',
        },
      },
    ],
  },
  {
    slug: 'cli-devops',
    year: '2023',
    title: 'CLI de Automação DevOps',
    role: { pt: 'tech lead', en: 'tech lead' },
    summary: {
      pt: 'Linha de comando para pipelines CI/CD, provisionamento e deploy multi-cloud.',
      en: 'Command line for CI/CD pipelines, provisioning and multi-cloud deploys.',
    },
    meta: { pt: 'Go · deploy multi-cloud · 400 devs', en: 'Go · multi-cloud deploys · 400 devs' },
    stack: ['Go', 'Terraform', 'AWS', 'GCP'],
    metrics: [
      { value: '400', unit: '', label: { pt: 'devs usando por dia', en: 'daily users' } },
      { value: '6', unit: 'min', label: { pt: 'deploy ponta a ponta', en: 'end-to-end deploy' } },
    ],
    blocks: [
      {
        label: { pt: '// problema', en: '// problem' },
        body: {
          pt: 'Cada time tinha seu próprio conjunto de scripts de deploy. Ninguém sabia dizer como um serviço ia para produção sem perguntar para uma pessoa específica.',
          en: 'Every team had its own set of deploy scripts. Nobody could explain how a service reached production without asking one specific person.',
        },
      },
      {
        label: { pt: '// resultado', en: '// outcome' },
        body: {
          pt: 'Um binário, quatro comandos e um arquivo de configuração por serviço. Deploy ponta a ponta em seis minutos, igual em todos os times.',
          en: 'One binary, four commands and a config file per service. Six-minute end-to-end deploys, identical across teams.',
        },
      },
    ],
  },
  {
    slug: 'busca-semantica',
    year: '2022',
    title: 'Motor de Busca Semântica',
    role: { pt: 'senior engineer', en: 'senior engineer' },
    summary: {
      pt: 'Busca vetorial sobre 4M de documentos com reranking e filtros por permissão.',
      en: 'Vector search over 4M documents with reranking and permission filters.',
    },
    meta: { pt: 'pgvector · 4M documentos', en: 'pgvector · 4M documents' },
    stack: ['Python', 'pgvector', 'Postgres'],
    metrics: [
      { value: '4', unit: 'M', label: { pt: 'documentos indexados', en: 'indexed documents' } },
      { value: '+31', unit: '%', label: { pt: 'recall@5', en: 'recall@5' } },
    ],
    blocks: [
      {
        label: { pt: '// decisões', en: '// decisions' },
        list: {
          pt: [
            'pgvector no banco que já existia, em vez de subir um vector store novo.',
            'Filtro de permissão aplicado antes da busca, não depois — resultado sem vazamento.',
          ],
          en: [
            'pgvector inside the database we already had, instead of a new vector store.',
            'Permission filters applied before the search, not after — no leaking results.',
          ],
        },
      },
    ],
  },
  {
    slug: 'pipeline-eventos',
    year: '2021',
    title: 'Pipeline de Eventos em Streaming',
    role: { pt: 'backend engineer', en: 'backend engineer' },
    summary: {
      pt: 'Ingestão de eventos com garantia de ordem por chave e reprocessamento histórico.',
      en: 'Event ingestion with per-key ordering and historical replay.',
    },
    meta: { pt: 'Kafka · 80k eventos/s', en: 'Kafka · 80k events/s' },
    stack: ['Kafka', 'Python', 'ClickHouse'],
    metrics: [
      { value: '80', unit: 'k', label: { pt: 'eventos por segundo', en: 'events per second' } },
    ],
    blocks: [
      {
        label: { pt: '// resultado', en: '// outcome' },
        body: {
          pt: 'Reprocessar seis meses de histórico passou a ser um comando, não um projeto.',
          en: 'Replaying six months of history became one command instead of a project.',
        },
      },
    ],
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)
export const featuredProjects = projects.filter((p) => p.featured)
