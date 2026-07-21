import { describe, expect, it } from 'vitest'
import { loadDashboard } from './dashboard'

describe('loadDashboard', () => {
  it('returns deterministic data for the same filters', async () => {
    const filters = { timeRange: '7d' as const, team: 'all' as const, demo: 'normal' as const }
    const first = await loadDashboard(filters)
    const second = await loadDashboard(filters)

    expect(first).toEqual(second)
    expect(first.metrics).toHaveLength(4)
    expect(first.activity.length).toBeGreaterThan(0)
  })

  it('returns an empty dataset for the empty demonstration', async () => {
    const data = await loadDashboard({ timeRange: '7d', team: 'all', demo: 'empty' })
    expect(data.metrics).toEqual([])
    expect(data.activity).toEqual([])
  })

  it('rejects for the error demonstration', async () => {
    await expect(loadDashboard({ timeRange: '7d', team: 'all', demo: 'error' }))
      .rejects.toThrow('temporarily unavailable')
  })
})
