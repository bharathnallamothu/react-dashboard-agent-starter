import { NavLink, Outlet } from 'react-router-dom'

export function AppShell() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <aside className="sidebar" aria-label="Primary navigation">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">EP</span>
          <span>
            <strong>Engineering Pulse</strong>
            <small>Team health at a glance</small>
          </span>
        </div>
        <nav className="nav-list">
          <NavLink to="/" end>
            <span aria-hidden="true">OV</span> Overview
          </NavLink>
          <NavLink to="/activity">
            <span aria-hidden="true">AC</span> Activity
          </NavLink>
        </nav>
        <div className="sidebar-note">
          <span className="status-dot" aria-hidden="true" />
          All systems reporting
        </div>
      </aside>
      <div className="page-column">
        <header className="topbar">
          <span className="eyebrow">BEGINNER SPA STARTER</span>
          <div className="profile" aria-label="Signed in as Alex Morgan">
            <span className="avatar" aria-hidden="true">AM</span>
            <span>Alex Morgan</span>
          </div>
        </header>
        <main id="main-content" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
