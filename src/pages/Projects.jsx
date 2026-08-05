import { useState } from 'react'
import ProjectCard from '../components/ProjectCard.jsx'
import Cta from '../components/Cta.jsx'
import { useT } from '../i18n.jsx'
import { ui } from '../copy.js'
import { projects, categories } from '../data/projects.js'

const intro = {
  title: { pt: 'O que eu construo', en: 'What I build' },
  lede: {
    pt: 'Uma seleção de projetos que refletem minha abordagem à engenharia: sistemas que escalam, código que comunica e produtos que importam.',
    en: 'A selection of projects that reflect how I approach engineering: systems that scale, code that communicates and products that matter.',
  },
}

export default function Projects() {
  const t = useT()
  const [filter, setFilter] = useState('todos')
  const shown = filter === 'todos' ? projects : projects.filter((p) => p.category === filter)

  // First card spans both columns when there is enough content; the last one
  // stretches too whenever the 2-column grid would otherwise leave a hole.
  const firstWide = shown.length > 2
  const lastWide = (shown.length - (firstWide ? 1 : 0)) % 2 === 1
  const isWide = (i) => (i === 0 && firstWide) || (i === shown.length - 1 && lastWide)

  return (
    <div className="page">
      <section className="page-head">
        <p className="kicker">// projetos</p>
        <h1 className="page-title">{t(intro.title)}</h1>
        <p className="lede">{t(intro.lede)}</p>
      </section>

      <section className="filter-bar">
        <div className="filter-chips" role="group" aria-label="Filtro de categoria">
          <button
            type="button"
            className={'filter-chip' + (filter === 'todos' ? ' is-active' : '')}
            onClick={() => setFilter('todos')}
          >
            {t(ui.filterAll)}
          </button>
          {Object.entries(categories).map(([slug, label]) => (
            <button
              key={slug}
              type="button"
              className={'filter-chip' + (filter === slug ? ' is-active' : '')}
              onClick={() => setFilter(slug)}
            >
              {t(label)}
            </button>
          ))}
        </div>
        <span className="filter-count">{shown.length} {t(ui.projectsCount)}</span>
      </section>

      <section className="section">
        <div className="project-grid">
          {shown.map((p, i) => (
            <ProjectCard key={p.slug} project={p} detailed wide={isWide(i)} />
          ))}
        </div>
      </section>

      <Cta copy={ui.cta.projects} />
    </div>
  )
}
