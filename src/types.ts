export type TimeRange = '7d' | '30d' | '90d'

export type Team = 'all' | 'platform' | 'product' | 'data'

export type DemoMode = 'normal' | 'empty' | 'error'

export type ViewState = 'loading' | 'ready' | 'empty' | 'error'

export interface DashboardFilters {
  timeRange: TimeRange
  team: Team
  demo?: DemoMode
}

export interface Metric {
  id: string
  label: string
  value: string
  change: string
  direction: 'up' | 'down' | 'steady'
  helpText: string
}

export interface TrendPoint {
  label: string
  buildSuccess: number
}

export interface ActivityItem {
  id: string
  type: 'build' | 'pull-request' | 'incident' | 'release'
  title: string
  detail: string
  occurredAt: string
  status: 'success' | 'attention' | 'in-progress'
  team: Exclude<Team, 'all'>
}

export interface DashboardData {
  metrics: Metric[]
  trend: TrendPoint[]
  activity: ActivityItem[]
  updatedAt: string
}

export interface DashboardView {
  state: ViewState
  data: DashboardData | null
  error: string | null
  retry: () => void
}
