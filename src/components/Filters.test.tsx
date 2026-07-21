import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Filters } from './Filters'

describe('Filters', () => {
  it('announces labels and reports a changed time range', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Filters value={{ timeRange: '7d', team: 'all' }} onChange={onChange} />)

    await user.selectOptions(screen.getByLabelText('Time range'), '90d')

    expect(onChange).toHaveBeenCalledWith({ timeRange: '90d', team: 'all', demo: 'normal' })
  })
})
