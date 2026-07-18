// Copyright (c) 2026 Cup Compass. All rights reserved.
import { Link } from 'react-router-dom'
import { SEOHead } from '../components/seo/SEOHead.jsx'

const GUIDES = [
  {
    title: 'How to Read a Bloom Score',
    excerpt:
      'What flavor match, freshness, brew-method fit, and value actually measure — and how to weigh them.',
    link: '/brew-quiz',
    linkLabel: 'Take the Brew Quiz',
  },
  {
    title: 'Roast Levels, Explained',
    excerpt:
      'Light, medium, medium-dark, dark — what changes in the cup, and which roasts suit which brew methods.',
    link: '/equipment/coffee-beans-subscriptions',
    linkLabel: 'Browse Beans & Subscriptions',
  },
  {
    title: 'Pour-Over vs. Drip vs. Espresso',
    excerpt:
      'A practical comparison of extraction, equipment cost, and time-per-cup across the most common brew methods.',
    link: '/equipment/drip-pour-over-brewers',
    linkLabel: 'Browse Drip & Pour-Over Brewers',
  },
  {
    title: 'Choosing a Grinder That Matches Your Brew Method',
    excerpt:
      'Burr type, grind consistency, and why the wrong grinder undermines even great beans.',
    link: '/equipment/grinders',
    linkLabel: 'Browse Grinders',
  },
]

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Cup Compass Guides',
  url: 'https://cupcompass.com/guides',
}

export function Guides() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <SEOHead
        title="Guides"
        description="Editorial guides on roast levels, brew methods, grinders, and how to read your Bloom Score."
        path="/guides"
        schema={SCHEMA}
      />
      <p className="font-body text-xs uppercase tracking-[0.2em] text-moss-light mb-2">
        Learn
      </p>
      <h1 className="font-display text-3xl mb-8">Guides</h1>

      <div className="flex flex-col gap-6">
        {GUIDES.map((guide) => (
          <article key={guide.title} className="bg-panel border border-cream/10 rounded-xl p-6">
            <h2 className="font-display text-lg mb-2">{guide.title}</h2>
            <p className="font-body text-sm text-cream/70 mb-4">{guide.excerpt}</p>
            <Link to={guide.link} className="font-body text-sm text-copper hover:text-copper-light underline">
              {guide.linkLabel} →
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Guides
