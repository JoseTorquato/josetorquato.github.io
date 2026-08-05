import { Link } from 'react-router-dom'

export default function Brand({ size = 20 }) {
  return (
    <Link to="/" className="brand" style={{ fontSize: size }}>
      <span className="brand-sign">&gt;</span>
      <span className="brand-name">josetorquato</span>
      <span className="brand-tld">.dev</span>
      <span className="cursor" style={{ height: size }} aria-hidden="true" />
    </Link>
  )
}
