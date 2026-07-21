import type { ActivityItem } from '../types'

const typeLabels: Record<ActivityItem['type'], string> = {
  build: 'Build',
  'pull-request': 'Pull request',
  incident: 'Incident',
  release: 'Release',
}

const statusLabels: Record<ActivityItem['status'], string> = {
  success: 'Healthy',
  attention: 'Needs attention',
  'in-progress': 'In progress',
}

export function ActivityTable({ items, compact = false }: { items: ActivityItem[]; compact?: boolean }) {
  return (
    <div className="table-wrap">
      <table className="activity-table">
        <caption className="sr-only">Recent engineering activity</caption>
        <thead>
          <tr>
            <th scope="col">Event</th>
            <th scope="col">Team</th>
            <th scope="col">Status</th>
            <th scope="col">When</th>
          </tr>
        </thead>
        <tbody>
          {items.slice(0, compact ? 4 : items.length).map((item) => (
            <tr key={item.id}>
              <td data-label="Event">
                <span className={`event-icon event-${item.type}`} aria-hidden="true">
                  {item.type === 'build' ? 'B' : item.type === 'pull-request' ? 'PR' : item.type === 'incident' ? '!' : 'R'}
                </span>
                <span className="event-copy">
                  <strong>{item.title}</strong>
                  <small>{typeLabels[item.type]} - {item.detail}</small>
                </span>
              </td>
              <td data-label="Team" className="capitalize">{item.team}</td>
              <td data-label="Status"><span className={`status status-${item.status}`}>{statusLabels[item.status]}</span></td>
              <td data-label="When" className="muted">{item.occurredAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
