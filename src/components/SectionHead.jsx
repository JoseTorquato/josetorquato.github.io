export default function SectionHead({ number, children }) {
  return (
    <div className="section-head">
      <span className="section-number">
        {number}
        <span className="signal">.</span>
      </span>
      <h2 className="section-title">{children}</h2>
    </div>
  )
}
