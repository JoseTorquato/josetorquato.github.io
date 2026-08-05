/**
 * Shared interface copy. Everything the layout says, in both languages.
 * Page-level content lives in src/data/.
 */
export const ui = {
  nav: [
    { to: '/projetos', label: { pt: 'Projetos', en: 'Projects' } },
    { to: '/blog', label: { pt: 'Blog', en: 'Blog' } },
    { to: '/sobre', label: { pt: 'Sobre', en: 'About' } },
    { to: '/contato', label: { pt: 'Contato', en: 'Contact' } },
  ],
  role: { pt: '// tech lead & ai engineer', en: '// tech lead & ai engineer' },
  hero: {
    name: 'José Torquato',
    lede: {
      pt: 'Lidero times de engenharia e coloco sistemas de IA em produção — do desenho da arquitetura ao custo por resposta.',
      en: 'I lead engineering teams and ship AI systems to production — from architecture to cost per response.',
    },
    primary: { pt: 'Ver Projetos →', en: 'View Projects →' },
    secondary: { pt: 'Ler Blog', en: 'Read Blog' },
  },
  metrics: [
    { value: '11', unit: 'y', label: { pt: 'em produção', en: 'in production' } },
    { value: '1.2', unit: 'M', label: { pt: 'msg / mês', en: 'msg / month' } },
    { value: '9', unit: '', label: { pt: 'pessoas no time', en: 'people on the team' } },
    { value: '−38', unit: '%', label: { pt: 'custo por resposta', en: 'cost per response' } },
  ],
  sections: {
    featured: { pt: 'Projetos em Destaque', en: 'Featured Work' },
    writing: { pt: 'Artigos Recentes', en: 'Recent Writing' },
    experience: { pt: 'Experiência', en: 'Experience' },
    stack: { pt: 'Stack', en: 'Stack' },
  },
  allProjects: { pt: '→ ver todos os projetos', en: '→ view all projects' },
  allPosts: { pt: '→ ver todos os artigos', en: '→ view all articles' },
  viewProject: { pt: 'ver projeto →', en: 'view project →' },
  backToProjects: { pt: '← projetos', en: '← projects' },
  backToBlog: { pt: '← blog', en: '← blog' },
  resume: { pt: 'Ver currículo completo →', en: 'See full résumé →' },
  about: {
    kicker: { pt: '// sobre', en: '// about' },
    short: {
      pt: 'Tech lead e AI engineer. Onze anos entre plataforma, dados e agentes — desenhando arquitetura, formando time e levando o que a gente escreve até produção.',
      en: 'Tech lead and AI engineer. Eleven years across platform, data and agents — designing architecture, building teams and getting the code to production.',
    },
  },
  minutes: { pt: 'min', en: 'min' },
  notFound: {
    title: { pt: 'Página não encontrada', en: 'Page not found' },
    body: { pt: 'O endereço não existe (ou não existe mais).', en: 'That address does not exist (or no longer does).' },
    back: { pt: '← voltar para a home', en: '← back home' },
  },
}
