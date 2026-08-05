/**
 * Prerender every route of the site to static HTML with per-page SEO metadata.
 *
 * Runs after `vite build` (client) + `vite build --ssr` (server bundle):
 *   - renders each route via src/entry-server.jsx into dist/<route>/index.html
 *   - injects title, description, canonical, Open Graph and JSON-LD per page
 *   - writes dist/404.html (clean SPA shell, noindex) for unknown routes
 *   - generates dist/sitemap.xml and dist/llms.txt from the same route data
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const load = (p) => import(pathToFileURL(resolve(root, p)).href)

const { render } = await load('dist-server/entry-server.js')
const { projects } = await load('src/data/projects.js')
const { posts } = await load('src/data/posts.js')
const { ui } = await load('src/copy.js')

const SITE = 'https://josetorquato.dev'
const AUTHOR = 'José Torquato'
const SITE_NAME = 'josetorquato.dev'

// Google Analytics 4. Injected only into built pages, so dev stays clean.
// SPA route changes are tracked by GA4's enhanced measurement (history events).
const GA_ID = '' // set to the measurement ID (G-XXXXXXXXXX) to enable
const gaSnippet = GA_ID
  ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>\n    ` +
    `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${GA_ID}');</script>`
  : ''

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// GitHub Pages serves each route from <route>/index.html and 301-redirects the
// slashless form, so the canonical URL is always the trailing-slash one.
const urlOf = (path) => SITE + (path === '/' ? '/' : `${path}/`)

const truncate = (s, max = 155) => (s.length <= max ? s : s.slice(0, max - 1).trimEnd() + '…')

// "Jul 2026" (en) -> "2026-07" (ISO 8601 year-month, valid for schema.org)
const MONTHS = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' }
const postDate = (post) => {
  const [mon, year] = post.date.en.split(' ')
  return MONTHS[mon] ? `${year}-${MONTHS[mon]}` : year
}

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: AUTHOR,
  url: SITE,
  jobTitle: 'Tech Lead & AI Engineer',
  email: 'mailto:jose@josetorquato.dev',
  address: { '@type': 'PostalAddress', addressLocality: 'São Paulo', addressCountry: 'BR' },
  sameAs: ['https://github.com/josetorquato', 'https://linkedin.com/in/josetorquato'],
  knowsAbout: ['Python', 'TypeScript', 'Go', 'Rust', 'AI agents', 'RAG', 'LangGraph', 'pgvector', 'Postgres', 'Kafka', 'AWS', 'Kubernetes', 'Terraform', 'OpenTelemetry'],
}

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE,
  inLanguage: ['pt-BR', 'en'],
  author: { '@type': 'Person', name: AUTHOR, url: SITE },
}

const projectLd = (p) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: p.title,
  url: urlOf(`/projetos/${p.slug}`),
  description: p.summary.pt,
  author: { '@type': 'Person', name: AUTHOR, url: SITE },
  keywords: p.stack.join(', '),
  dateCreated: p.year,
  inLanguage: 'pt-BR',
})

const postLd = (p) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: p.title.pt,
  url: urlOf(`/blog/${p.slug}`),
  description: truncate(p.body.pt[0].text),
  author: { '@type': 'Person', name: AUTHOR, url: SITE },
  datePublished: postDate(p),
  inLanguage: 'pt-BR',
  timeRequired: `PT${p.minutes}M`,
})

const routes = [
  {
    path: '/',
    title: 'José Torquato — Tech Lead & AI Engineer',
    description: ui.hero.lede.pt,
    type: 'website',
    jsonLd: [personLd, websiteLd],
  },
  {
    path: '/projetos',
    title: 'Projetos — José Torquato',
    description: 'Projetos selecionados de José Torquato — agentes de IA, plataformas de dados e infraestrutura em produção.',
    type: 'website',
    jsonLd: [],
  },
  ...projects.map((p) => ({
    path: `/projetos/${p.slug}`,
    title: `${p.title} — José Torquato`,
    description: truncate(p.summary.pt),
    type: 'article',
    jsonLd: [projectLd(p)],
  })),
  {
    path: '/blog',
    title: 'Blog — José Torquato',
    description: 'Artigos de José Torquato sobre agentes de IA, avaliação, arquitetura de microsserviços e observabilidade.',
    type: 'website',
    jsonLd: [],
  },
  ...posts.map((p) => ({
    path: `/blog/${p.slug}`,
    title: `${p.title.pt} — José Torquato`,
    description: truncate(p.body.pt[0].text),
    type: 'article',
    published: postDate(p),
    jsonLd: [postLd(p)],
  })),
  {
    path: '/sobre',
    title: 'Sobre — José Torquato',
    description: truncate(ui.about.short.pt),
    type: 'profile',
    jsonLd: [personLd],
  },
  {
    path: '/contato',
    title: 'Contato — José Torquato',
    description: 'Fale com José Torquato — e-mail, GitHub e LinkedIn. São Paulo, BR (UTC−3).',
    type: 'website',
    jsonLd: [],
  },
]

const template = readFileSync(resolve(dist, 'index.html'), 'utf8')

const jsonLdTag = (obj) =>
  `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`

function pageHtml(route) {
  const canonical = urlOf(route.path)
  const head = [
    `<link rel="canonical" href="${canonical}" />`,
    `<meta name="author" content="${AUTHOR}" />`,
    `<meta property="og:type" content="${route.type}" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta name="twitter:card" content="summary" />`,
    ...(route.published ? [`<meta property="article:published_time" content="${route.published}" />`] : []),
    ...route.jsonLd.map(jsonLdTag),
    ...(gaSnippet ? [gaSnippet] : []),
  ].join('\n    ')

  return template
    .replace(/<title>.*?<\/title>/s, `<title>${esc(route.title)}</title>`)
    .replace(/<meta name="description"[^>]*\/>/, `<meta name="description" content="${esc(route.description)}" />`)
    .replace('</head>', `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${render(route.path)}</div>`)
}

// 404 shell first (from the pristine template, before dist/index.html is overwritten)
writeFileSync(
  resolve(dist, '404.html'),
  template
    .replace(/<title>.*?<\/title>/s, `<title>Página não encontrada — ${SITE_NAME}</title>`)
    .replace('</head>', `    <meta name="robots" content="noindex" />\n${gaSnippet ? `    ${gaSnippet}\n` : ''}  </head>`)
)

for (const route of routes) {
  const dir = route.path === '/' ? dist : resolve(dist, ...route.path.slice(1).split('/'))
  mkdirSync(dir, { recursive: true })
  writeFileSync(resolve(dir, 'index.html'), pageHtml(route))
}

// sitemap.xml
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  routes.map((r) => `  <url><loc>${urlOf(r.path)}</loc></url>`).join('\n') +
  '\n</urlset>\n'
writeFileSync(resolve(dist, 'sitemap.xml'), sitemap)

// llms.txt — structured site summary for AI agents (https://llmstxt.org)
const llms = [
  `# ${AUTHOR}`,
  '',
  `> ${ui.hero.lede.pt} Site pessoal com projetos, artigos e contato, em português e inglês (mesmo endereço, alternância na página).`,
  '',
  `## Projetos (${urlOf('/projetos')})`,
  '',
  ...projects.map((p) => `- [${p.title}](${urlOf(`/projetos/${p.slug}`)}): ${p.summary.pt} Stack: ${p.stack.join(', ')}.`),
  '',
  `## Artigos (${urlOf('/blog')})`,
  '',
  ...posts.map((p) => `- [${p.title.pt}](${urlOf(`/blog/${p.slug}`)}): ${truncate(p.body.pt[0].text, 200)}`),
  '',
  '## Sobre e contato',
  '',
  `- [Sobre](${urlOf('/sobre')}): ${ui.about.short.pt}`,
  `- [Contato](${urlOf('/contato')}): e-mail jose@josetorquato.dev · GitHub github.com/josetorquato · LinkedIn linkedin.com/in/josetorquato · São Paulo, BR (UTC−3)`,
  '',
].join('\n')
writeFileSync(resolve(dist, 'llms.txt'), llms)

console.log(`prerendered ${routes.length} routes + 404.html, sitemap.xml, llms.txt`)
