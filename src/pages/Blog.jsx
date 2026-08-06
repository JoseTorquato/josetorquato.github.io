import RowLink from '../components/RowLink.jsx'
import { useT } from '../i18n.jsx'
import { ui } from '../copy.js'
import { posts } from '../data/posts.js'

const intro = {
  title: { pt: 'Notas de produção', en: 'Production notes' },
  lede: {
    pt: 'Escrevo depois que o sistema quebra, não antes. Textos longos, sem tese de LinkedIn.',
    en: 'I write after the system breaks, not before. Long pieces, no LinkedIn takes.',
  },
}

export default function Blog() {
  const t = useT()
  return (
    <div className="page">
      <section className="page-head">
        <p className="kicker">// blog</p>
        <h1 className="page-title">{t(intro.title)}</h1>
        <p className="lede">{t(intro.lede)}</p>
      </section>
      {posts.length ? (
        <section className="rows">
          {posts.map((p) => (
            <RowLink
              key={p.slug}
              to={'/blog/' + p.slug}
              meta={t(p.date)}
              title={t(p.title)}
              detail={p.minutes + ' ' + t(ui.minutes)}
            />
          ))}
        </section>
      ) : (
        <section className="section">
          <p className="kicker">{t({ pt: '// em breve', en: '// coming soon' })}</p>
          <p className="lede">
            {t({
              pt: 'Os primeiros artigos estão a caminho. Enquanto isso, escrevo sobre agentes de IA, MCP e backend no LinkedIn.',
              en: 'The first articles are on their way. Meanwhile, I write about AI agents, MCP and backend engineering on LinkedIn.',
            })}
          </p>
          <a className="see-all" href="https://linkedin.com/in/josetorquato">
            {t({ pt: '→ me encontra no LinkedIn', en: '→ find me on LinkedIn' })}
          </a>
        </section>
      )}
    </div>
  )
}
