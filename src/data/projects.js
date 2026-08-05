/** Category labels for the /projetos filter chips. Keys are the `category` slugs below. */
export const categories = {
  ia: { pt: 'IA', en: 'AI' },
  backend: { pt: 'Backend', en: 'Backend' },
  produto: { pt: 'Produto', en: 'Product' },
}

const inProduction = { pt: 'Produção', en: 'Production' }
const openSource = { pt: 'Open Source', en: 'Open Source' }

export const projects = [
  {
    slug: 'django-dev-insights',
    year: '2025',
    category: 'backend',
    status: openSource,
    title: 'django-dev-insights',
    role: { pt: 'autor · open source', en: 'author · open source' },
    summary: {
      pt: 'Diagnóstico de performance em tempo real para Django. Encontra N+1 e queries duplicadas por request — no console, em JSON ou num painel HTML embutido.',
      en: 'Real-time performance diagnostics for Django. Surfaces N+1 and duplicate queries per request — in your console, as JSON, or a built-in HTML panel.',
    },
    meta: {
      pt: 'pip install django-dev-insights · PyPI',
      en: 'pip install django-dev-insights · PyPI',
    },
    stack: ['Python', 'Django', 'PyPI'],
    featured: true,
    links: {
      github: 'https://github.com/JoseTorquato/django-dev-insights',
      demo: 'https://pypi.org/project/django-dev-insights/',
    },
    metrics: [
      { value: '28 → 3.8', unit: 's', label: { pt: 'página real, 200+ queries duplicadas', en: 'real page, 200+ duplicate queries' } },
      { value: '8 → 1.8', unit: 's', label: { pt: 'página real, N+1 escondido', en: 'real page, hidden N+1' } },
    ],
    blocks: [
      {
        label: { pt: '// problema', en: '// problem' },
        body: {
          pt: 'Página lenta em Django quase sempre esconde o mesmo vilão: N+1 e queries duplicadas que nenhum log mostra por padrão. Caçar isso na mão, request por request, custa horas — então ninguém caça, e a página continua lenta.',
          en: 'A slow Django page almost always hides the same culprit: N+1 and duplicate queries that no default log will show you. Hunting them by hand, request by request, takes hours — so nobody hunts, and the page stays slow.',
        },
      },
      {
        label: { pt: '// o que é', en: '// what it is' },
        list: {
          pt: [
            'Instrumentação por request: cada requisição mostra suas queries, duplicatas e N+1.',
            'Três saídas: console durante o desenvolvimento, JSON para automação e um painel HTML embutido.',
            'Instalação em um comando: pip install django-dev-insights.',
          ],
          en: [
            'Per-request instrumentation: every request reports its queries, duplicates and N+1.',
            'Three outputs: console while developing, JSON for automation and a built-in HTML panel.',
            'One-command install: pip install django-dev-insights.',
          ],
        },
      },
      {
        label: { pt: '// resultado', en: '// outcome' },
        body: {
          pt: 'Em páginas reais: de 28s para 3.8s (200+ queries duplicadas encontradas) e de 8s para 1.8s (um N+1 escondido). Publicado no PyPI, aberto para qualquer projeto Django.',
          en: 'On real pages: 28s down to 3.8s (200+ duplicate queries found) and 8s down to 1.8s (one hidden N+1). Published on PyPI, open to any Django project.',
        },
      },
    ],
  },
  {
    slug: 'chatbot-with-rag',
    year: '2026',
    category: 'ia',
    status: openSource,
    title: 'Chatbot com RAG + Visão',
    role: { pt: 'arquitetura + implementação', en: 'architecture + implementation' },
    summary: {
      pt: 'Chatbot que combina RAG e visão computacional — FastAPI, LangChain, FAISS e GPT-4o, com decisões de arquitetura e trade-offs documentados.',
      en: 'A chatbot combining RAG and computer vision — FastAPI, LangChain, FAISS and GPT-4o, with documented architecture decisions and trade-offs.',
    },
    meta: {
      pt: 'FastAPI · LangChain · FAISS · GPT-4o',
      en: 'FastAPI · LangChain · FAISS · GPT-4o',
    },
    stack: ['Python', 'FastAPI', 'LangChain', 'FAISS', 'GPT-4o'],
    featured: true,
    links: {
      github: 'https://github.com/JoseTorquato/chatbot_with_rag',
    },
    blocks: [
      {
        label: { pt: '// o que é', en: '// what it is' },
        body: {
          pt: 'Um chatbot que junta recuperação de contexto (RAG) com visão computacional: FastAPI na borda, LangChain na orquestração, FAISS na busca vetorial e GPT-4o no raciocínio.',
          en: 'A chatbot that pairs retrieval-augmented generation with computer vision: FastAPI at the edge, LangChain for orchestration, FAISS for vector search and GPT-4o for reasoning.',
        },
      },
      {
        label: { pt: '// diferencial', en: '// why it matters' },
        body: {
          pt: 'As decisões de arquitetura, os trade-offs e um roadmap de produção estão documentados no repositório. IA tratada como engenharia: com registro do porquê, não só do como.',
          en: 'Architecture decisions, trade-offs and a production roadmap are documented in the repository. AI treated as engineering: recording the why, not just the how.',
        },
      },
    ],
  },
  {
    slug: 'ideiasmicrosaas',
    year: '2023',
    category: 'produto',
    status: inProduction,
    title: 'ideiasmicrosaas.com.br',
    role: { pt: 'criador · produto próprio', en: 'creator · own product' },
    summary: {
      pt: 'Ideias de micro-SaaS geradas por IA — um app Django de ponta a ponta, no ar em ideiasmicrosaas.com.br.',
      en: 'AI-generated micro-SaaS ideas — an end-to-end Django app, live at ideiasmicrosaas.com.br.',
    },
    meta: {
      pt: 'Django · no ar desde 2023',
      en: 'Django · live since 2023',
    },
    stack: ['Django', 'Python', 'IA generativa'],
    featured: true,
    links: {
      github: 'https://github.com/JoseTorquato/ideiasmicrosaas',
      demo: 'https://ideiasmicrosaas.com.br',
    },
    blocks: [
      {
        label: { pt: '// o que é', en: '// what it is' },
        body: {
          pt: 'Um app Django que gera e publica ideias de micro-SaaS com IA. Produto próprio de ponta a ponta: da ideia ao deploy, no ar em ideiasmicrosaas.com.br.',
          en: 'A Django app that generates and publishes AI-created micro-SaaS ideas. An end-to-end product of my own: from idea to deploy, live at ideiasmicrosaas.com.br.',
        },
      },
    ],
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)
export const featuredProjects = projects.filter((p) => p.featured)
