// Copyright (c) 2026 Cup Compass. All rights reserved.
import { Link } from 'react-router-dom'
import { Logo } from '../Logo.jsx'

const LEGAL_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms' },
  { to: '/affiliate-disclosure', label: 'Affiliate Disclosure' },
]

export function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-panel mt-24">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col gap-6">
        <Logo markSize={32} withTagline />
        <p className="font-body text-sm text-cream/60 max-w-2xl">
          Cup Compass is a coffee discovery platform, not a retailer. We may earn a commission
          when you buy through links on this site — see our{' '}
          <Link to="/affiliate-disclosure" className="underline hover:text-copper">
            affiliate disclosure
          </Link>{' '}
          for details. This never affects your Bloom Score results.
        </p>
        <nav className="flex flex-wrap gap-4 font-body text-xs uppercase tracking-wide text-cream/60">
          {LEGAL_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-copper transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="font-mono text-xs text-cream/40">
          © {new Date().getFullYear()} Cup Compass. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
