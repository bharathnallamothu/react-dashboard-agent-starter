import { useEffect, useMemo, useState } from 'react'
import { ActivityTable } from '../components/ActivityTable'
import { StatePanel } from '../components/StatePanel'
import { useDashboardData } from '../hooks/useDashboardData'

export function ActivityPage() {
  const filters = useMemo(() => ({ timeRange: '30d' as const, team: 'all' as const, demo: 'normal' as const }), [])
  const view = useDashboardData(filters)
  const [query, setQuery] = useState('')

  useEffect(() => {
    document.title = 'Activity | Engineering Pulse'
  }, [])

  const items = useMemo(() => {
    if (!view.data) return []
    const normalized = query.trim().toLowerCase()
    if (!normalized) return view.data.activity
    return view.data.activity.filter((item) =>
      `${item.title} ${item.detail} ${item.team}`.toLowerCase().includes(normalized),
    )
  }, [query, view.data])

  return (
    <div className="page-content">
      <div className="heading-row activity-heading-row">
        <div className="page-heading">
          <p className="section-kicker">ACTIVITY</p>
          <h1>Every signal, in one place.</h1>
          <p>Search recent releases, builds, pull requests, and incidents.</p>
        </div>
        <label className="search-field">
          <span>Search activity</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Platform or build" />
        </label>
      </div>

      {view.state === 'loading' && <StatePanel state="loading" />}
      {view.state === 'error' && <StatePanel state="error" message={view.error} onAction={view.retry} />}
      {view.state === 'ready' && view.data && (
        <section className="panel activity-panel" aria-labelledby="activity-list-title">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">LATEST FIRST</p>
              <h2 id="activity-list-title">Engineering activity</h2>
            </div>
            <span className="result-count" aria-live="polite">{items.length} results</span>
          </div>
          {items.length > 0
            ? <ActivityTable items={items} />
            : <div className="inline-empty"><strong>No matching activity</strong><span>Try a different search term.</span></div>}
        </section>
      )}
    </div>
  )
}
