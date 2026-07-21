import { useCallback, useEffect, useState } from 'react'
import { loadDashboard } from '../data/dashboard'
import type { DashboardData, DashboardFilters, DashboardView, ViewState } from '../types'

export function useDashboardData(filters: DashboardFilters): DashboardView {
  const [state, setState] = useState<ViewState>('loading')
  const [data, setData] = useState<DashboardData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [requestVersion, setRequestVersion] = useState(0)

  const retry = useCallback(() => setRequestVersion((current) => current + 1), [])

  useEffect(() => {
    let active = true

    loadDashboard(filters)
      .then((nextData) => {
        if (!active) return
        setData(nextData)
        setError(null)
        setState(nextData.metrics.length === 0 ? 'empty' : 'ready')
      })
      .catch((reason: unknown) => {
        if (!active) return
        setData(null)
        setError(reason instanceof Error ? reason.message : 'Something went wrong.')
        setState('error')
      })

    return () => {
      active = false
    }
  }, [filters, requestVersion])

  return { state, data, error, retry }
}
