interface StatePanelProps {
  state: 'loading' | 'empty' | 'error'
  message?: string | null
  onAction?: () => void
}

export function StatePanel({ state, message, onAction }: StatePanelProps) {
  if (state === 'loading') {
    return (
      <section className="state-panel loading-panel" aria-live="polite" aria-busy="true">
        <span className="loader" aria-hidden="true" />
        <h2>Loading the latest team signals</h2>
        <p>Fetching builds, pull requests, incidents, and recent activity.</p>
      </section>
    )
  }

  if (state === 'empty') {
    return (
      <section className="state-panel" aria-live="polite">
        <span className="state-symbol" aria-hidden="true">0</span>
        <h2>No activity matches these filters</h2>
        <p>Try a wider time range or include all engineering teams.</p>
        {onAction && <button type="button" onClick={onAction}>Reset filters</button>}
      </section>
    )
  }

  return (
    <section className="state-panel error-panel" role="alert">
      <span className="state-symbol" aria-hidden="true">!</span>
      <h2>We could not load the dashboard</h2>
      <p>{message ?? 'Something unexpected happened.'}</p>
      {onAction && <button type="button" onClick={onAction}>Try again</button>}
    </section>
  )
}
