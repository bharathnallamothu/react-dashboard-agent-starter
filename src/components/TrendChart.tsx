import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { TrendPoint } from '../types'

export function TrendChart({ data }: { data: TrendPoint[] }) {
  const first = data[0]?.buildSuccess ?? 0
  const last = data.at(-1)?.buildSuccess ?? 0
  const summary = `Build success moved from ${first.toFixed(1)} percent to ${last.toFixed(1)} percent.`

  return (
    <section className="panel chart-panel" aria-labelledby="trend-title">
      <div className="panel-heading">
        <div>
          <p className="section-kicker">DELIVERY CONFIDENCE</p>
          <h2 id="trend-title">Build success trend</h2>
        </div>
        <span className="positive-callout">+1.6 points</span>
      </div>
      <div className="chart-wrap" role="img" aria-label={summary}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 12, right: 8, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="buildFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f7cff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4f7cff" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#e5e9f0" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: '#687386', fontSize: 12 }} />
            <YAxis domain={[90, 100]} tickLine={false} axisLine={false} tick={{ fill: '#687386', fontSize: 12 }} />
            <Tooltip formatter={(value) => [`${String(value)}%`, 'Build success']} />
            <Area
              type="monotone"
              dataKey="buildSuccess"
              stroke="#315ee8"
              strokeWidth={3}
              fill="url(#buildFill)"
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <details className="chart-data">
        <summary>View chart data</summary>
        <table>
          <caption className="sr-only">Build success percentages</caption>
          <thead><tr><th>Period</th><th>Success</th></tr></thead>
          <tbody>
            {data.map((point) => (
              <tr key={point.label}><td>{point.label}</td><td>{point.buildSuccess.toFixed(1)}%</td></tr>
            ))}
          </tbody>
        </table>
      </details>
    </section>
  )
}
