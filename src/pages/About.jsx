import SectionHead from '../components/SectionHead.jsx'
import Metric from '../components/Metric.jsx'
import Tags from '../components/Tags.jsx'
import Cta from '../components/Cta.jsx'
import { useT } from '../i18n.jsx'
import { ui } from '../copy.js'
import { experience, stack } from '../data/resume.js'

const intro = {
  title: {
    pt: ['Sete anos', 'levando código', 'até produção'],
    en: ['Seven years', 'getting code', 'into production'],
  },
  body: {
    pt: 'Python é minha linguagem principal. Construo sistemas backend e agentes de IA que rodam em produção — pipelines de dados, RAG e servidores MCP. Hoje sou tech lead na KORO Martech: lidero um time técnico e continuo mergeando meus próprios PRs. Me importo menos com framework e mais com o que faz um time entregar rápido e um sistema ficar de pé.',
    en: "Python is my main language. I build backend systems and AI agents that run in production — data pipelines, RAG and MCP servers. I'm a tech lead at KORO Martech: I lead a technical team and still merge my own PRs. I care less about frameworks and more about what makes a team ship fast and a system stay up.",
  },
}

export default function About() {
  const t = useT()
  return (
    <div className="page">
      <section className="page-head about-head">
        <div>
          <p className="kicker">{t(ui.about.kicker)}</p>
          <h1 className="page-title">
            {t(intro.title).map((line, i) => (
              <span key={line}>
                {line}
                {i < 2 ? <br /> : null}
              </span>
            ))}
          </h1>
          <p className="about-text">{t(intro.body)}</p>
        </div>
        <div className="metric-panel">
          {ui.metrics.map((m) => (
            <Metric key={m.label.en} value={m.value} unit={m.unit} label={t(m.label)} />
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead number="01">{t(ui.sections.experience)}</SectionHead>
        <ol className="timeline">
          {experience.map((job) => (
            <li className="timeline-item" key={job.title}>
              <div className="timeline-head">
                <h3 className="job-title">{job.title}</h3>
                <span className="row-meta">{t(job.period)}</span>
              </div>
              <p className="job-body">{t(job.body)}</p>
              {job.stack ? <Tags items={job.stack} /> : null}
            </li>
          ))}
        </ol>
      </section>

      <section className="section section-panel">
        <SectionHead number="02">{t(ui.sections.stack)}</SectionHead>
        <div className="stack-grid">
          {stack.map((group) => (
            <div className="stack-col" key={group.label.en}>
              <p className="kicker">{t(group.label)}</p>
              <ul className="stack-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Cta copy={ui.cta.about} />
    </div>
  )
}
