export const experience = [
  {
    period: { pt: '2024 — hoje', en: '2024 — now' },
    title: 'Tech Lead, AI Platform',
    body: {
      pt: 'Time de 9 pessoas. Copiloto de atendimento a 1.2M msg/mês, suíte de avaliação em CI, custo por resposta −38%.',
      en: 'Team of 9. Support copilot at 1.2M msg/month, eval suite in CI, cost per response down 38%.',
    },
    stack: ['Python', 'LangGraph', 'pgvector', 'AWS'],
  },
  {
    period: { pt: '2021 — 2024', en: '2021 — 2024' },
    title: 'Staff Engineer, Data',
    body: {
      pt: 'Plataforma multi-tenant para 40 clientes. Pipeline de eventos a 80k/s e migração de monólito para serviços.',
      en: 'Multi-tenant platform for 40 clients. 80k events/s pipeline and monolith-to-services migration.',
    },
    stack: ['TypeScript', 'Kafka', 'Postgres', 'Terraform'],
  },
  {
    period: { pt: '2018 — 2021', en: '2018 — 2021' },
    title: 'Senior Backend Engineer',
    body: {
      pt: 'API gateway em Rust com p99 de 12ms. Padronização de observabilidade em 30 serviços.',
      en: 'Rust API gateway at 12ms p99. Observability standard across 30 services.',
    },
    stack: ['Rust', 'gRPC', 'Redis', 'OpenTelemetry'],
  },
  {
    period: { pt: '2015 — 2018', en: '2015 — 2018' },
    title: 'Backend Engineer',
    body: {
      pt: 'Primeiros anos em Python e Postgres, aprendendo a escrever menos código.',
      en: 'Early years in Python and Postgres, learning to write less code.',
    },
    stack: ['Python', 'Postgres'],
  },
]

export const stack = [
  { label: { pt: '// linguagens', en: '// languages' }, items: ['Python', 'TypeScript', 'Go', 'Rust'] },
  { label: { pt: '// ia', en: '// ai' }, items: ['LangGraph', 'pgvector', 'OpenAI / Anthropic', 'evals em CI'] },
  { label: { pt: '// dados', en: '// data' }, items: ['Postgres', 'Kafka', 'dbt', 'ClickHouse'] },
  { label: { pt: '// infra', en: '// infra' }, items: ['AWS', 'Terraform', 'Kubernetes', 'OpenTelemetry'] },
]

export const contact = [
  { label: 'E-mail', value: 'jose@josetorquato.dev', href: 'mailto:jose@josetorquato.dev' },
  { label: 'GitHub', value: 'github.com/josetorquato', href: 'https://github.com/josetorquato' },
  { label: 'LinkedIn', value: 'in/josetorquato', href: 'https://linkedin.com/in/josetorquato' },
  { label: 'Base', value: 'São Paulo, BR · UTC−3' },
]
