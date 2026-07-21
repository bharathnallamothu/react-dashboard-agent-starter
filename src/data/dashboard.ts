import type {
  ActivityItem,
  DashboardData,
  DashboardFilters,
  Metric,
  Team,
  TimeRange,
  TrendPoint,
} from '../types'

const baseActivity: ActivityItem[] = [
  {
    id: 'evt-101',
    type: 'release',
    title: 'Checkout API v2.8 released',
    detail: 'Production rollout completed with no rollback signals.',
    occurredAt: '12 minutes ago',
    status: 'success',
    team: 'product',
  },
  {
    id: 'evt-102',
    type: 'pull-request',
    title: 'PR #842 is ready for review',
    detail: 'Adds cached feature-flag evaluation to the shared gateway.',
    occurredAt: '28 minutes ago',
    status: 'in-progress',
    team: 'platform',
  },
  {
    id: 'evt-103',
    type: 'build',
    title: 'Analytics pipeline recovered',
    detail: 'The retry queue cleared after an upstream timeout.',
    occurredAt: '46 minutes ago',
    status: 'success',
    team: 'data',
  },
  {
    id: 'evt-104',
    type: 'incident',
    title: 'Elevated search latency',
    detail: 'P95 latency is being monitored after index maintenance.',
    occurredAt: '1 hour ago',
    status: 'attention',
    team: 'platform',
  },
  {
    id: 'evt-105',
    type: 'pull-request',
    title: 'PR #839 merged',
    detail: 'Improves keyboard navigation in the account settings flow.',
    occurredAt: '2 hours ago',
    status: 'success',
    team: 'product',
  },
  {
    id: 'evt-106',
    type: 'build',
    title: 'Warehouse tests need attention',
    detail: 'Two data-quality assertions failed in the nightly suite.',
    occurredAt: '3 hours ago',
    status: 'attention',
    team: 'data',
  },
]

const trendByRange: Record<TimeRange, TrendPoint[]> = {
  '7d': [
    { label: 'Mon', buildSuccess: 96.8 },
    { label: 'Tue', buildSuccess: 97.4 },
    { label: 'Wed', buildSuccess: 97.1 },
    { label: 'Thu', buildSuccess: 98.0 },
    { label: 'Fri', buildSuccess: 98.4 },
    { label: 'Sat', buildSuccess: 98.2 },
    { label: 'Sun', buildSuccess: 98.8 },
  ],
  '30d': [
    { label: 'Week 1', buildSuccess: 95.9 },
    { label: 'Week 2', buildSuccess: 96.8 },
    { label: 'Week 3', buildSuccess: 97.6 },
    { label: 'Week 4', buildSuccess: 98.4 },
  ],
  '90d': [
    { label: 'May', buildSuccess: 94.7 },
    { label: 'Jun', buildSuccess: 96.3 },
    { label: 'Jul', buildSuccess: 98.4 },
  ],
}

const teamAdjustment: Record<Team, number> = {
  all: 0,
  platform: -0.5,
  product: 0.4,
  data: -0.9,
}

function buildMetrics(filters: DashboardFilters): Metric[] {
  const rangeMultiplier = filters.timeRange === '7d' ? 1 : filters.timeRange === '30d' ? 2 : 4
  const adjustment = teamAdjustment[filters.team]

  return [
    {
      id: 'build-success',
      label: 'Build success',
      value: `${(98.4 + adjustment).toFixed(1)}%`,
      change: '+1.6 pts',
      direction: 'up',
      helpText: 'Successful CI runs in the selected period',
    },
    {
      id: 'open-prs',
      label: 'Open pull requests',
      value: String(12 + rangeMultiplier + (filters.team === 'all' ? 4 : 0)),
      change: '3 ready now',
      direction: 'steady',
      helpText: 'Pull requests that have not yet merged',
    },
    {
      id: 'incidents',
      label: 'Active incidents',
      value: filters.team === 'data' ? '1' : '2',
      change: '-1 this week',
      direction: 'down',
      helpText: 'Open operational incidents',
    },
    {
      id: 'lead-time',
      label: 'Median lead time',
      value: filters.timeRange === '90d' ? '52m' : filters.timeRange === '30d' ? '47m' : '41m',
      change: '8m faster',
      direction: 'down',
      helpText: 'Median time from first commit to production',
    },
  ]
}

function createData(filters: DashboardFilters): DashboardData {
  const activity = filters.team === 'all'
    ? baseActivity
    : baseActivity.filter((item) => item.team === filters.team)
  const adjustment = teamAdjustment[filters.team]
  const trend = trendByRange[filters.timeRange].map((point) => ({
    ...point,
    buildSuccess: Number((point.buildSuccess + adjustment).toFixed(1)),
  }))

  return {
    metrics: buildMetrics(filters),
    trend,
    activity,
    updatedAt: 'Today at 9:42 AM',
  }
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds))
}

export async function loadDashboard(filters: DashboardFilters): Promise<DashboardData> {
  await wait(420)

  if (filters.demo === 'error') {
    throw new Error('The dashboard service is temporarily unavailable.')
  }

  if (filters.demo === 'empty') {
    return { metrics: [], trend: [], activity: [], updatedAt: 'No data available' }
  }

  return createData(filters)
}
