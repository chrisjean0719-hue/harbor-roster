import { useState, type ReactNode } from 'react';
import { CLINIC } from '../data/roster';
import { StaffLegend } from './StaffLegend';
import './AppShell.css';

const NAV = [
  { label: 'Schedule', current: true },
  { label: 'Time off', current: false },
  { label: 'Open shifts', current: false },
  { label: 'Reports', current: false },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className={`app-shell${drawerOpen ? ' is-drawer-open' : ''}`}>
      <header className="topbar">
        <button
          type="button"
          className="topbar__menu"
          aria-label={drawerOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen((o) => !o)}
        >
          <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        <div className="topbar__brand">
          <img src="/favicon.svg" alt="" width="26" height="26" />
          <span>Harbor Roster</span>
        </div>
        <div className="topbar__clinic">{CLINIC.name}</div>
        <div className="topbar__avatar" role="img" aria-label="Signed in as Ana Ruiz">
          AR
        </div>
      </header>

      <aside className="sidebar" aria-label="Main navigation">
        <nav>
          <ul className="sidebar__nav">
            {NAV.map((item) => (
              <li key={item.label}>
                <a href="#" aria-current={item.current ? 'page' : undefined}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <StaffLegend />
      </aside>

      <div className="app-shell__scrim" onClick={() => setDrawerOpen(false)} />

      <main className="app-shell__main">
        {children}
        {/* Overlays live inside main so they travel with the content when the mobile drawer pushes it aside. */}
        <div id="overlay-root" />
      </main>
    </div>
  );
}
