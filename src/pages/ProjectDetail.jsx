import { Link, useParams } from 'react-router-dom'
import Metric from '../components/Metric.jsx'
import Tags from '../components/Tags.jsx'
import NotFound from './NotFound.jsx'
import { useT } from '../i18n.jsx'
import { ui } from '../copy.js'
import { getProject } from '../data/projects.js'

export default function ProjectDetail() {
  const { slug } = useParams()
  const t = useT()
  const project = getProject(slug)

  if (!project) return <NotFound />

  return (
    <div className="page">
      <div className="back">
        <Link to="/projetos">{t(ui.backToProjects)}</Link>
      </div>

      <section className="page-head">
        <p className="row-meta">{project.year}&nbsp;&nbsp;·&nbsp;&nbsp;{t(project.role)}</p>
        <h1 className="page-title">{project.title}</h1>
        <Tags items={project.stack} size="md" />
      </section>

      {project.metrics?.length ? (
        <section className="metric-strip">
          {project.metrics.map((m) => (
            <Metric key={m.label.en} value={m.value} unit={m.unit} label={t(m.label)} />
          ))}
        </section>
      ) : null}

      <section className="section prose-blocks">
        {project.blocks.map((block) => (
          <div className="prose-block" key={block.label.en}>
            <p className="kicker">{t(block.label)}</p>
            {block.body ? <p className="prose">{t(block.body)}</p> : null}
            {block.list ? (
              <ul className="prose-list">
                {t(block.list).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </section>
    </div>
  )
}
