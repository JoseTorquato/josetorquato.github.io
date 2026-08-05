export const posts = [
  {
    slug: 'avaliacao-de-agentes',
    date: { pt: 'Jul 2026', en: 'Jul 2026' },
    minutes: 9,
    featured: true,
    title: {
      pt: 'Avaliação de agentes: o que medir quando não há resposta certa',
      en: 'Evaluating agents when there is no right answer',
    },
    body: {
      pt: [
        { type: 'lede', text: 'Todo time que coloca um agente em produção passa pelo mesmo lugar: alguém pergunta se a nova versão está melhor e ninguém sabe responder. O prompt mudou, o modelo mudou, a recuperação mudou — e a única evidência é a impressão de quem testou dez casos na mão.' },
        { type: 'p', text: 'O problema não é falta de métrica. É que a métrica óbvia, acurácia, pressupõe uma resposta certa. Em atendimento não existe uma: existem várias aceitáveis e muitas ruins por motivos diferentes.' },
        { type: 'h2', text: 'Três eixos em vez de uma nota' },
        { type: 'p', text: 'No copiloto, separamos avaliação em três coisas que falham de forma independente: a recuperação trouxe o documento certo, a resposta se sustenta no que foi recuperado, e o agente soube parar quando não sabia. Uma nota única esconde qual das três quebrou.' },
        { type: 'code', lines: [
          ['retrieval', ' ... recall@5 no conjunto rotulado'],
          ['groundedness', ' ... afirmações com fonte / total'],
          ['abstention', ' ... acerto ao encaminhar para humano'],
        ] },
        { type: 'p', text: 'O terceiro eixo foi o que mais mudou o produto. Um agente que encaminha bem vale mais que um agente que responde bem — porque o custo de uma resposta errada com confiança é maior que o de uma transferência.' },
        { type: 'h2', text: 'Quem rotula é quem atende' },
        { type: 'p', text: 'Os 400 casos do nosso conjunto foram rotulados pelo time de suporte, não por engenharia. Levou três semanas e foi o melhor investimento do projeto: mudou a discussão de “o prompt está bom?” para “o caso 217 regrediu”.' },
      ],
      en: [
        { type: 'lede', text: 'Every team that ships an agent lands in the same place: someone asks whether the new version is better and nobody can answer. The prompt changed, the model changed, retrieval changed — and the only evidence is one person\'s impression from ten hand-run cases.' },
        { type: 'p', text: 'The problem is not a lack of metrics. It is that the obvious one, accuracy, assumes a right answer. In support there is not one: there are several acceptable answers and many bad ones, each bad for a different reason.' },
        { type: 'h2', text: 'Three axes instead of one score' },
        { type: 'p', text: 'In the copilot we split evaluation into three things that fail independently: retrieval found the right document, the answer holds up against what was retrieved, and the agent knew when to stop. A single score hides which of the three broke.' },
        { type: 'code', lines: [
          ['retrieval', ' ... recall@5 on the labelled set'],
          ['groundedness', ' ... sourced claims / total claims'],
          ['abstention', ' ... correct handoffs to a human'],
        ] },
        { type: 'p', text: 'The third axis changed the product most. An agent that hands off well is worth more than one that answers well — a confidently wrong answer costs more than a transfer.' },
        { type: 'h2', text: 'The people who answer are the people who label' },
        { type: 'p', text: 'Our 400 cases were labelled by the support team, not engineering. It took three weeks and was the best investment of the project: it moved the conversation from “is the prompt good?” to “case 217 regressed”.' },
      ],
    },
  },
  {
    slug: 'arquitetura-microsservicos',
    date: { pt: 'Mai 2026', en: 'May 2026' },
    minutes: 8,
    featured: true,
    title: {
      pt: 'Arquitetura de microsserviços: lições de produção',
      en: 'Microservice architecture: lessons from production',
    },
    body: {
      pt: [
        { type: 'lede', text: 'Quebrar o monólito resolveu problemas de deploy e criou problemas de dado. Vale a pena — desde que você saiba qual dos dois você tem.' },
        { type: 'p', text: 'O ganho real de serviços separados não é escala, é autonomia de deploy. Se dois times não conseguem entregar sem combinar horário, separar o código não vai resolver: o acoplamento está no dado, não no repositório.' },
        { type: 'h2', text: 'A fronteira é o dado' },
        { type: 'p', text: 'A pergunta certa não é “esse módulo é grande?”, é “quem é dono desta tabela?”. Serviço que precisa de join com o banco do vizinho não é serviço, é monólito distribuído com latência de rede.' },
      ],
      en: [
        { type: 'lede', text: 'Breaking the monolith solved deploy problems and created data problems. Worth it — as long as you know which of the two you actually have.' },
        { type: 'p', text: 'The real win of separate services is not scale, it is deploy autonomy. If two teams cannot ship without coordinating a time slot, splitting the code will not fix it: the coupling is in the data, not the repository.' },
        { type: 'h2', text: 'The boundary is the data' },
        { type: 'p', text: 'The right question is not “is this module big?”, it is “who owns this table?”. A service that needs to join against its neighbour\'s database is not a service, it is a distributed monolith with network latency.' },
      ],
    },
  },
  {
    slug: 'observabilidade',
    date: { pt: 'Fev 2026', en: 'Feb 2026' },
    minutes: 10,
    featured: true,
    title: {
      pt: 'Observabilidade além dos logs: traces e métricas que importam',
      en: 'Beyond logs: the traces and metrics that matter',
    },
    body: {
      pt: [
        { type: 'lede', text: 'Log serve para entender um caso. Trace serve para entender um caminho. Métrica serve para saber que existe um problema. Quem usa os três para a mesma coisa paga por três.' },
        { type: 'p', text: 'A primeira coisa que padronizamos em trinta serviços não foi a ferramenta, foi o nome do atributo. Sem convenção de nomes, dashboard bonito é dashboard inútil.' },
      ],
      en: [
        { type: 'lede', text: 'Logs explain one case. Traces explain one path. Metrics tell you a problem exists. Teams that use all three for the same job pay for three.' },
        { type: 'p', text: 'The first thing we standardised across thirty services was not the tool, it was the attribute name. Without a naming convention, a pretty dashboard is a useless dashboard.' },
      ],
    },
  },
  {
    slug: 'contratar-senior',
    date: { pt: 'Nov 2025', en: 'Nov 2025' },
    minutes: 7,
    title: {
      pt: 'Contratar sênior sem whiteboard: como eu entrevisto',
      en: 'Hiring seniors without a whiteboard: how I interview',
    },
    body: {
      pt: [
        { type: 'lede', text: 'Nunca vi alguém escrever uma árvore binária no quadro e depois precisar disso no trabalho. Vi muita gente boa ser reprovada por nervosismo.' },
        { type: 'p', text: 'Hoje eu levo um problema real do time, com o código na tela, e peço para a pessoa dizer onde ela mexeria primeiro. O que eu avalio é a pergunta que ela faz antes de responder.' },
      ],
      en: [
        { type: 'lede', text: 'I have never seen anyone write a binary tree on a whiteboard and then need it at work. I have seen plenty of good people fail on nerves.' },
        { type: 'p', text: 'These days I bring a real problem from the team, with the code on screen, and ask where they would touch first. What I am grading is the question they ask before answering.' },
      ],
    },
  },
  {
    slug: 'rag-nao-e-banco',
    date: { pt: 'Ago 2025', en: 'Aug 2025' },
    minutes: 11,
    title: {
      pt: 'RAG não é banco de dados: onde a recuperação falha calada',
      en: 'RAG is not a database: where retrieval fails silently',
    },
    body: {
      pt: [
        { type: 'lede', text: 'Busca vetorial sempre devolve algo. Esse é o problema: ela não tem como dizer “não achei”.' },
        { type: 'p', text: 'Um limiar de similaridade não resolve, porque a escala muda com o embedding e com o domínio. O que funcionou para nós foi medir recall num conjunto rotulado e tratar recuperação como componente com teste próprio, separada do modelo.' },
      ],
      en: [
        { type: 'lede', text: 'Vector search always returns something. That is the problem: it has no way to say “I found nothing”.' },
        { type: 'p', text: 'A similarity threshold does not fix it, because the scale shifts with the embedding and the domain. What worked for us was measuring recall on a labelled set and treating retrieval as its own tested component, separate from the model.' },
      ],
    },
  },
]

export const getPost = (slug) => posts.find((p) => p.slug === slug)
export const featuredPosts = posts.filter((p) => p.featured)
