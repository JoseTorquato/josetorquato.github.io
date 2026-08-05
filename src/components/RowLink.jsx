import { Link } from 'react-router-dom'

/** The list row used by /projetos and /blog: meta column, title, trailing detail, arrow. */
export default function RowLink({ to, meta, title, detail, extra }) {
  return (
    <Link to={to} className="row">
      <span className="row-meta">{meta}</span>
      <span className="row-title">{title}</span>
      <span className="row-detail">{detail}</span>
      {extra ? <span className="row-extra">{extra}</span> : null}
      <span className="row-arrow" aria-hidden="true">→</span>
    </Link>
  )
}
