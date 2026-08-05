import RowLink from '../components/RowLink.jsx'
import { useT } from '../i18n.jsx'
import { projects } from '../data/projects.js'

const intro = {
  title: { pt: 'O que eu construí', en: 'What I built' },
  lede: {
    pt: 'Seis projetos que foram para produção e continuaram lá. Cada um com o problema, a decisão de arquitetura e o número que mudou.',
    en: 'Six projects that shipped and stayed shipped. Each one with the problem, the architecture call and the number that moved.',
  },
}

export default function Projects() {
  const t = useT()
  return (
    <div className="page">
      <section className="page-head">
        <p className="kicker">// projetos</p>
        <h1 className="page-title">{t(intro.title)}</h1>
        <p className="lede">{t(intro.lede)}</p>
      </section>
      <section className="rows">
        {projects.map((p) => (
          <RowLink
            key={p.slug}
            to={'/projetos/' + p.slug}
            meta={p.year}
            title={p.title}
            detail={t(p.meta)}
          />
        ))}
      </section>
    </div>
  )
}
