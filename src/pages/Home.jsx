import { Link } from 'react-router-dom'
import SectionHead from '../components/SectionHead.jsx'
import Metric from '../components/Metric.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import RowLink from '../components/RowLink.jsx'
import CodeCard from '../components/CodeCard.jsx'
import { useT } from '../i18n.jsx'
import { ui } from '../copy.js'
import { featuredProjects } from '../data/projects.js'
import { featuredPosts } from '../data/posts.js'

export default function Home() {
  const t = useT()
  return (
    <div className="page">
      <section className="hero dotted">
        <p className="kicker">{t(ui.role)}</p>
        <h1 className="hero-name">{ui.hero.name}</h1>
        <p className="lede">{t(ui.hero.lede)}</p>
        <div className="actions">
          <Link to="/projetos" className="btn btn-primary">{t(ui.hero.primary)}</Link>
          <Link to="/blog" className="btn btn-ghost">{t(ui.hero.secondary)}</Link>
        </div>
      </section>

      <section className="metric-strip">
        {ui.metrics.map((m) => (
          <Metric key={m.label.en} value={m.value} unit={m.unit} label={t(m.label)} />
        ))}
      </section>

      <section className="section section-panel">
        <SectionHead number="01">{t(ui.sections.featured)}</SectionHead>
        <div className="card-grid">
          {featuredProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <Link to="/projetos" className="see-all">{t(ui.allProjects)}</Link>
      </section>

      <section className="section">
        <SectionHead number="02">{t(ui.sections.writing)}</SectionHead>
        <div className="rows rows-flush">
          {featuredPosts.map((p) => (
            <RowLink
              key={p.slug}
              to={'/blog/' + p.slug}
              meta={t(p.date)}
              title={t(p.title)}
              detail={p.minutes + ' ' + t(ui.minutes)}
            />
          ))}
        </div>
        <Link to="/blog" className="see-all">{t(ui.allPosts)}</Link>
      </section>

      <section className="section section-panel about-split">
        <CodeCard />
        <div>
          <p className="kicker">{t(ui.about.kicker)}</p>
          <p className="about-text">{t(ui.about.short)}</p>
          <Link to="/sobre" className="see-all">{t(ui.resume)}</Link>
        </div>
      </section>
    </div>
  )
}
