import SectionHead from '../components/SectionHead.jsx'
import Metric from '../components/Metric.jsx'
import Tags from '../components/Tags.jsx'
import Cta from '../components/Cta.jsx'
import { useT } from '../i18n.jsx'
import { ui } from '../copy.js'
import { experience, stack } from '../data/resume.js'

const intro = {
  title: {
    pt: ['Onze anos', 'levando código', 'até produção'],
    en: ['Eleven years', 'getting code', 'into production'],
  },
  body: {
    pt: 'Comecei em backend, passei por plataforma e dados, e hoje lidero um time que constrói sistemas de IA. Meu trabalho é dividir problema grande em decisão pequena e defensável — e escrever o que aprendi quando a decisão estava errada.',
    en: 'I started in backend, moved through platform and data, and now lead a team building AI systems. My job is turning a big problem into small defensible decisions — and writing down what I learned when the decision was wrong.',
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
