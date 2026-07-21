import type { Metric } from '../types'

export function MetricCard({ metric }: { metric: Metric }) {
  const changeLabel = metric.direction === 'up'
    ? 'Improved'
    : metric.direction === 'down'
      ? 'Decreased'
      : 'Steady'

  return (
    <article className="metric-card" aria-labelledby={`${metric.id}-label`}>
      <div className="metric-heading">
        <h2 id={`${metric.id}-label`}>{metric.label}</h2>
        <span className={`trend-icon trend-${metric.direction}`} aria-label={changeLabel}>
          {metric.direction === 'up' ? '+' : metric.direction === 'down' ? '-' : '='}
        </span>
      </div>
      <p className="metric-value">{metric.value}</p>
      <p className="metric-change">{metric.change}</p>
      <p className="sr-only">{metric.helpText}</p>
    </article>
  )
}
