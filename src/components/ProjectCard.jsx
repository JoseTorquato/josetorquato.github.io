import { Link } from 'react-router-dom'
import Tags from './Tags.jsx'
import { useT } from '../i18n.jsx'
import { ui } from '../copy.js'

export default function ProjectCard({ project }) {
  const t = useT()
  return (
    <Link to={'/projetos/' + project.slug} className="project-card">
      <h3 className="project-card-title">{project.title}</h3>
      <p className="project-card-summary">{t(project.summary)}</p>
      <Tags items={project.stack.slice(0, 3)} />
      <span className="project-card-cta">{t(ui.viewProject)}</span>
    </Link>
  )
}
