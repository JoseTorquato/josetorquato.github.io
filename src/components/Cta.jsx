import { Link } from 'react-router-dom'
import { useT } from '../i18n.jsx'
import { ui } from '../copy.js'

/** Closing call-to-action strip: kicker + title + body on the left, contact button on the right. */
export default function Cta({ copy }) {
  const t = useT()
  return (
    <section className="section cta">
      <div>
        <p className="kicker">{t(copy.kicker)}</p>
        <h2 className="cta-title">{t(copy.title)}</h2>
        <p className="cta-body">{t(copy.body)}</p>
      </div>
      <Link to="/contato" className="btn btn-primary">{t(ui.cta.button)}</Link>
    </section>
  )
}
