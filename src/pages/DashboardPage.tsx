import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ActivityTable } from '../components/ActivityTable'
import { Filters } from '../components/Filters'
import { MetricCard } from '../components/MetricCard'
import { StatePanel } from '../components/StatePanel'
import { useDashboardData } from '../hooks/useDashboardData'
import type { DashboardFilters, DemoMode } from '../types'

const TrendChart = lazy(() => import('../components/TrendChart').then((module) => ({ default: module.TrendChart })))

function parseDemoMode(value: string | null): DemoMode {
  return value === 'empty' || value === 'error' ? value : 'normal'
}

export function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const demo = parseDemoMode(searchParams.get('demo'))
  const [filters, setFilters] = useState<DashboardFilters>({ timeRange: '7d', team: 'all', demo })
  const effectiveFilters = useMemo(() => ({ ...filters, demo }), [demo, filters])
  const view = useDashboardData(effectiveFilters)

  useEffect(() => {
    document.title = 'Overview | Engineering Pulse'
  }, [])

  function resetDemoAndFilters() {
    setSearchParams({})
    setFilters({ timeRange: '7d', team: 'all', demo: 'normal' })
  }

  if (view.state === 'loading') {
    return (
      <div className="page-content">
        <PageHeading />
        <StatePanel state="loading" />
      </div>
    )
  }

  if (view.state === 'empty') {
    return (
      <div className="page-content">
        <PageHeading />
        <StatePanel state="empty" onAction={resetDemoAndFilters} />
      </div>
    )
  }

  if (view.state === 'error' || !view.data) {
    return (
      <div className="page-content">
        <PageHeading />
        <StatePanel state="error" message={view.error} onAction={resetDemoAndFilters} />
      </div>
    )
  }

  return (
    <div className="page-content">
      <div className="heading-row">
        <PageHeading updatedAt={view.data.updatedAt} />
        <Filters value={filters} onChange={setFilters} />
      </div>

      <section className="metrics-grid" aria-label="Key engineering metrics">
        {view.data.metrics.map((metric) => <MetricCard key={metric.id} metric={metric} />)}
      </section>

      <Suspense fallback={<div className="panel chart-panel chart-loading" aria-label="Loading trend chart" />}>
        <TrendChart data={view.data.trend} />
      </Suspense>

      <section className="panel activity-panel" aria-labelledby="recent-activity-title">
        <div className="panel-heading">
          <div>
            <p className="section-kicker">WHAT CHANGED</p>
            <h2 id="recent-activity-title">Recent activity</h2>
          </div>
          <Link to="/activity" className="text-link">View all activity <span aria-hidden="true">-&gt;</span></Link>
        </div>
        <ActivityTable items={view.data.activity} compact />
      </section>
    </div>
  )
}

function PageHeading({ updatedAt }: { updatedAt?: string }) {
  return (
    <div className="page-heading">
      <p className="section-kicker">OVERVIEW</p>
      <h1>Good morning, Alex.</h1>
      <p>Here is how engineering is moving today{updatedAt ? ` - updated ${updatedAt}.` : '.'}</p>
    </div>
  )
}
