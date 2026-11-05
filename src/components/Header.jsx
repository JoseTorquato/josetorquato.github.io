import { NavLink } from 'react-router-dom'
import Brand from './Brand.jsx'
import LangToggle from './LangToggle.jsx'
import { useT } from '../i18n.jsx'
import { ui } from '../copy.js'

export default function Header() {
  const t = useT()
  return (
    <header className="header">
      <Brand />
      <div className="header-right">
        <nav className="nav">
          {ui.nav.map((item) => item.href ? (
            <a key={item.href} href={item.href} className="nav-link">
              {t(item.label)}
            </a>
          ) : (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => 'nav-link' + (isActive ? ' is-active' : '')}
            >
              {t(item.label)}
            </NavLink>
          ))}
        </nav>
        <LangToggle />
      </div>
    </header>
  )
}
