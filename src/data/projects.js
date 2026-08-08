/** Category labels for the /projetos filter chips. Keys are the `category` slugs below. */
export const categories = {
  ia: { pt: 'IA', en: 'AI' },
  seguranca: { pt: 'Segurança', en: 'Security' },
  backend: { pt: 'Backend', en: 'Backend' },
  produto: { pt: 'Produto', en: 'Product' },
}

const inProduction = { pt: 'Produção', en: 'Production' }
const openSource = { pt: 'Open Source', en: 'Open Source' }

export const projects = [
  {
    slug: 'cilada',
    year: '2026',
    category: 'seguranca',
    status: openSource,
    title: 'Cilada',
    role: { pt: 'autor · open source', en: 'author · open source' },
    summary: {
      pt: 'Suíte adversarial em português brasileiro para agentes de IA. Golpe do Pix, boleto adulterado, jeitinho, CDC art. 30 e injeção por áudio de WhatsApp.',
      en: 'Brazilian-Portuguese adversarial suite for AI agents. Pix scams, altered bank slips, CDC art. 30 liability and prompt injection via transcribed WhatsApp audio.',
    },
    meta: {
      pt: '5 agentes testados · o mais popular tirou 46/100',
      en: '5 agents tested · the most popular scored 46/100',
    },
    stack: ['Python', 'LLM evals', 'red team', 'LGPD'],
    featured: true,
    links: {
      github: 'https://github.com/JoseTorquato/cilada',
      demo: 'https://josetorquato.dev/cilada/',
    },
    metrics: [
      { value: '46', unit: '/100', label: { pt: 'llama-3.3-70b, o mais usado', en: 'llama-3.3-70b, the most used' } },
      { value: '4/5', unit: '', label: { pt: 'agentes confirmaram Pix falso', en: 'agents confirmed a fake Pix' } },
      { value: '80→100', unit: '', label: { pt: 'após o plano de correção', en: 'after the fix plan' } },
    ],
    blocks: [
      {
        label: { pt: '// problema', en: '// problem' },
        body: {
          pt: 'Os benchmarks de jailbreak são todos em inglês, mas golpe brasileiro tem gramática própria: comprovante de Pix que nunca caiu, desconto arrancado no jeitinho, instrução escondida em áudio de WhatsApp transcrito. E o art. 30 do CDC transforma o que o bot promete em obrigação da empresa — como no precedente Moffatt v. Air Canada.',
          en: 'Jailbreak benchmarks are all in English, but Brazilian scams have their own grammar: proof of a Pix transfer that never landed, discounts extracted through persistence, instructions hidden in transcribed WhatsApp audio. And article 30 of the consumer code turns whatever the bot promises into a company obligation — as in the Moffatt v. Air Canada precedent.',
        },
      },
      {
        label: { pt: '// decisões', en: '// decisions' },
        list: {
          pt: [
            'Ataques declarados em YAML, não em código — quem conhece o golpe não precisa saber programar.',
            'Julgamento determinístico por padrão de texto: custo zero por execução e mesmo veredito em qualquer rodada.',
            'Campo de veto (salvo_se) para "pagamento não confirmado" não contar como "pagamento confirmado".',
            'Cada achado traz a mitigação e a camada onde ela mora: prompt, aplicação ou arquitetura.',
          ],
          en: [
            'Attacks declared in YAML, not code — knowing the scam matters more than knowing how to program.',
            'Deterministic text-pattern judging: zero cost per run and the same verdict on any execution.',
            'A veto field so "payment not confirmed" is never counted as "payment confirmed".',
            'Every finding carries its mitigation and the layer it belongs to: prompt, application or architecture.',
          ],
        },
      },
      {
        label: { pt: '// resultado', en: '// outcome' },
        body: {
          pt: 'Cinco agentes testados com o mesmo prompt de atendimento: o llama-3.3-70b, o mais usado do mercado, tirou 46/100 com 8 falhas críticas — pior que um modelo de 8B. Confirmar um Pix que nunca caiu derrubou 4 dos 5. O plano de correção que o próprio laudo gera levou um agente de 80 para 100/100.',
          en: 'Five agents tested with the same support prompt: llama-3.3-70b, the most widely used, scored 46/100 with 8 critical failures — worse than an 8B model. Confirming a Pix that never landed broke 4 of the 5. The fix plan the report itself generates took one agent from 80 to 100/100.',
        },
      },
      {
        label: { pt: '// o que eu faria diferente', en: '// what I would change' },
        body: {
          pt: 'Calibrar contra saída de LLM real desde o primeiro dia. A primeira rodada acusou 36% de falso positivo — markdown quebrando os padrões, e o agente mencionando o conceito proibido justamente ao recusá-lo. Foram quatro ciclos até o juiz distinguir compromisso de palavra-chave.',
          en: 'Calibrate against real LLM output from day one. The first run had a 36% false positive rate — markdown breaking the patterns, and the agent mentioning the forbidden concept precisely while refusing it. It took four cycles for the judge to tell commitment from keyword.',
        },
      },
    ],
  },
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
