export default function Metric({ value, unit, label }) {
  return (
    <div className="metric">
      <div className="metric-value">
        {value}
        {unit ? <span className="signal">{unit}</span> : null}
      </div>
      <div className="metric-label">{label}</div>
    </div>
  )
}
