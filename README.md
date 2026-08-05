# josetorquato.dev

Site pessoal de José Torquato — tech lead & AI engineer. React + Vite, bilíngue (PT/EN), sem dependência de UI kit.

## Rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/
```

Node 18+.

## Estrutura

```
src/
  main.jsx              entrypoint + providers
  App.jsx               rotas
  i18n.jsx              LangProvider, useLang, useT
  copy.js               textos de interface (nav, botões, títulos de seção)
  styles.css            tokens + todos os estilos
  components/           Header, Footer, Brand, LangToggle, SectionHead,
                        Metric, Tags, ProjectCard, RowLink, CodeCard, ScrollToTop
  pages/                Home, Projects, ProjectDetail, Blog, PostDetail,
                        About, Contact, NotFound
  data/
    projects.js         6 projetos, com blocos de case
    posts.js            5 artigos, corpo em blocos
    resume.js           experiência, stack, contato
```

## Rotas

| Rota | Página |
| --- | --- |
| `/` | Home |
| `/projetos` | Lista de projetos |
| `/projetos/:slug` | Case do projeto |
| `/blog` | Lista de artigos |
| `/blog/:slug` | Artigo |
| `/sobre` | Experiência + stack |
| `/contato` | Contato |

## Bilíngue

Todo texto traduzível é um objeto `{ pt, en }`. Nos componentes:

```jsx
const t = useT()
<p>{t(project.summary)}</p>
```

O idioma fica em `localStorage` (`jt-lang`) e define `<html lang>`. Nomes de tecnologia, cargos e títulos de projeto não são traduzidos — por isso são strings simples.

## Editar conteúdo

Não há CMS. Projetos e artigos são arrays em `src/data/`. Para publicar um artigo novo, adicione um objeto em `posts.js` com `slug`, `date`, `minutes`, `title` e `body` (blocos `lede` | `p` | `h2` | `code`). `featured: true` faz o item aparecer na home.

## Design tokens

Definidos em `:root` no topo de `styles.css`.

| Token | Valor | Uso |
| --- | --- | --- |
| `--base` | #0A0A0A | fundo do site |
| `--panel` | #0D0D0D | faixa alternada, card |
| `--dot` | #141414 | grid de pontos do hero |
| `--rule` | #1C1C1C | bordas e divisores |
| `--title` | #FFFFFF | títulos |
| `--text` | #C8C8C8 | parágrafo de destaque |
| `--body` | #8A8A8A | texto corrido |
| `--dim` | #5A5A5A | datas, rótulos secundários |
| `--signal` | #22D3EE | ação, link, tag, cursor |
| `--deep` | #1F4F58 | numerais grandes de seção |

Tipografia: Space Grotesk 600/700 nos títulos, JetBrains Mono 400/500 em todo o resto (corpo, nav, rótulos, métricas). Fontes carregadas via Google Fonts no `index.html`.

Regras que o design assume:
- ciano só em ação, link, tag, rótulo `//` e cursor — nunca como fundo de área grande;
- separação por régua de 1px e por espaço, sem `box-shadow`;
- fundo alterna apenas entre `--base` e `--panel`;
- hover em 160ms, só cor e borda; nada escala.

## Deploy

Build estático. Em Vercel/Netlify, configure o rewrite de SPA para `index.html` (necessário por causa das rotas `/projetos/:slug`).

## Pendências

- Conteúdo é exemplo — trocar por texto real em `src/data/`.
- Sem `sitemap.xml`, RSS ou meta tags por rota (considere `react-helmet-async`).
- Menu mobile empilha; se a nav crescer, vale um drawer.
