import { Link } from 'react-router-dom'
import Tags from './Tags.jsx'
import { GitHubIcon, ExternalIcon } from './icons.jsx'
import { useT } from '../i18n.jsx'
import { ui } from '../copy.js'

/**
 * Project card. `detailed` adds the featured badge, year · status line and
 * external links (used on /projetos); the home grid keeps the compact form.
 */
export default function ProjectCard({ project, detailed = false, wide = false }) {
  const t = useT()
  const to = '/projetos/' + project.slug
  return (
    <article className={'project-card' + (wide ? ' project-card-wide' : '')}>
      <div className="project-card-head">
        <h3 className="project-card-title">
          <Link to={to}>{project.title}</Link>
        </h3>
        {detailed && project.featured ? <span className="badge">{t(ui.featuredBadge)}</span> : null}
        {detailed && project.links ? (
          <span className="project-card-links">
            {project.links.github ? (
              <a href={project.links.github} aria-label="GitHub"><GitHubIcon /></a>
            ) : null}
            {project.links.demo ? (
              <a href={project.links.demo} aria-label="Demo"><ExternalIcon /></a>
            ) : null}
          </span>
        ) : null}
      </div>
      {detailed ? (
        <p className="project-card-meta">
          {project.year}&nbsp;&nbsp;·&nbsp;&nbsp;<span className="signal">{t(project.status)}</span>
        </p>
      ) : null}
      <p className="project-card-summary">{t(project.summary)}</p>
      <Tags items={detailed ? project.stack : project.stack.slice(0, 3)} />
      <Link to={to} className="project-card-cta">{t(ui.viewProject)}</Link>
    </article>
  )
}
