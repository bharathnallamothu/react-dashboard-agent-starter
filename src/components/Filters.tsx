import type { DashboardFilters, Team, TimeRange } from '../types'

interface FiltersProps {
  value: DashboardFilters
  onChange: (filters: DashboardFilters) => void
}

export function Filters({ value, onChange }: FiltersProps) {
  return (
    <form className="filters" aria-label="Dashboard filters" onSubmit={(event) => event.preventDefault()}>
      <label>
        <span>Time range</span>
        <select
          value={value.timeRange}
          onChange={(event) => onChange({ ...value, timeRange: event.target.value as TimeRange, demo: 'normal' })}
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </label>
      <label>
        <span>Team</span>
        <select
          value={value.team}
          onChange={(event) => onChange({ ...value, team: event.target.value as Team, demo: 'normal' })}
        >
          <option value="all">All teams</option>
          <option value="platform">Platform</option>
          <option value="product">Product</option>
          <option value="data">Data</option>
        </select>
      </label>
    </form>
  )
}
