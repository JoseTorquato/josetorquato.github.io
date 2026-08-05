import { Link } from 'react-router-dom'
import { useT } from '../i18n.jsx'
import { ui } from '../copy.js'

export default function NotFound() {
  const t = useT()
  return (
    <div className="page">
      <section className="hero dotted">
        <p className="kicker">// 404</p>
        <h1 className="page-title">{t(ui.notFound.title)}</h1>
        <p className="lede">{t(ui.notFound.body)}</p>
        <Link to="/" className="see-all">{t(ui.notFound.back)}</Link>
      </section>
    </div>
  )
}
