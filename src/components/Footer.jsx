import { Link } from 'react-router-dom'
import Brand from './Brand.jsx'
import { useT } from '../i18n.jsx'
import { ui } from '../copy.js'

export default function Footer() {
  const t = useT()
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <Brand />
          <div className="footer-role">{t(ui.role)}</div>
        </div>
        <nav className="footer-nav">
          {ui.nav.map((item) => (
            <Link key={item.to} to={item.to} className="nav-link">
              {t(item.label)}
            </Link>
          ))}
        </nav>
        <div className="footer-social">
          <a href="https://github.com/josetorquato">GitHub</a>
          <a href="https://linkedin.com/in/josetorquato">LinkedIn</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="signal">©</span> 2026 josetorquato.dev
      </div>
    </footer>
  )
}
