import { useT } from '../i18n.jsx'
import { contact } from '../data/resume.js'

const intro = {
  title: { pt: 'Vamos conversar', en: "Let's talk" },
  lede: {
    pt: 'Aberto a conversas sobre liderança técnica, sistemas de IA em produção e consultoria pontual de arquitetura.',
    en: 'Open to conversations about technical leadership, AI systems in production and short architecture engagements.',
  },
}

export default function Contact() {
  const t = useT()
  return (
    <div className="page">
      <section className="hero dotted">
        <p className="kicker">// contato</p>
        <h1 className="page-title">{t(intro.title)}</h1>
        <p className="lede lede-loose">{t(intro.lede)}</p>
        <dl className="contact-list">
          {contact.map((item) => (
            <div className="contact-row" key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.href ? <a href={item.href}>{item.value}</a> : item.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  )
}
