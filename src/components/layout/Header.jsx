// Copyright (c) 2026 Cup Compass. All rights reserved.
import { NavLink } from 'react-router-dom'
import { Logo } from '../Logo.jsx'

const NAV_LINKS = [
  { to: '/brew-quiz', label: 'Brew Quiz' },
  { to: '/roasters', label: 'Roasters' },
  { to: '/equipment', label: 'Equipment' },
  { to: '/guides', label: 'Guides' },
]

export function Header() {
  return (
    <header className="border-b border-cream/10 bg-espresso/95 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <NavLink to="/" aria-label="Cup Compass home">
          <Logo markSize={36} />
        </NavLink>
        <nav className="hidden md:flex items-center gap-6 font-body text-sm">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `uppercase tracking-wide transition-colors hover:text-copper ${
                  isActive ? 'text-copper' : 'text-cream/80'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <NavLink
          to="/brew-quiz"
          className="font-display text-xs uppercase tracking-wide bg-copper hover:bg-copper-light text-cream px-4 py-2 rounded-full transition-colors"
        >
          Find Your Bloom
        </NavLink>
      </div>
    </header>
  )
}

export default Header
