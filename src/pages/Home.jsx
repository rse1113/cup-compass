// Copyright (c) 2026 Cup Compass. All rights reserved.
import { Link } from 'react-router-dom'
import { SEOHead } from '../components/seo/SEOHead.jsx'
import { ThePour } from '../components/ThePour/ThePour.jsx'
import { CATEGORIES } from '../data/categories.js'

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Cup Compass',
  url: 'https://cupcompass.com',
  description:
    'AI coffee discovery platform. Take the Brew Profile quiz and get a ranked shortlist scored by Bloom Score.',
}

export function Home() {
  return (
    <div>
      <SEOHead
        title="Find Your Bloom"
        description="Cup Compass matches you to your ideal coffee and gear. Take the Brew Profile quiz and get a ranked shortlist scored by Bloom Score."
        path="/"
        schema={SCHEMA}
      />

      <section className="max-w-5xl mx-auto px-4 pt-20 pb-16 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-moss-light mb-3">
            AI Coffee Discovery
          </p>
          <h1 className="font-display text-4xl md:text-5xl leading-tight mb-5">
            Find Your Bloom
          </h1>
          <p className="font-body text-cream/70 text-lg mb-8 max-w-md">
            Answer a few questions about roast, brew method, and flavor — we match you to
            coffee and gear across the web, ranked by Bloom Score.
          </p>
          <Link
            to="/brew-quiz"
            className="inline-block font-display uppercase tracking-wide text-sm bg-copper hover:bg-copper-light text-cream px-6 py-3 rounded-full transition-colors"
          >
            Take the Brew Quiz
          </Link>
        </div>
        <div className="flex-shrink-0">
          <ThePour score={92} size={180} label="Bloom Score" />
        </div>
      </section>

      <section className="bg-panel border-y border-cream/10">
        <div className="max-w-5xl mx-auto px-4 py-14">
          <h2 className="font-display text-2xl mb-8">How Bloom Score Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {[
              ['Flavor Match', 'How closely the tasting notes fit what you asked for.'],
              ['Freshness', 'Roast-to-ship practices behind the listing.'],
              ['Brew-Method Fit', 'Ground, grind, or format compatibility with how you brew.'],
              ['Value', 'Price weighed against quality and quantity for your budget.'],
            ].map(([title, desc]) => (
              <div key={title}>
                <h3 className="font-display text-sm text-copper mb-2">{title}</h3>
                <p className="font-body text-sm text-cream/60">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-14">
        <h2 className="font-display text-2xl mb-8">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/equipment/${cat.slug}`}
              className="bg-panel border border-cream/10 rounded-xl p-5 hover:border-copper/50 transition-colors"
            >
              <h3 className="font-display text-base mb-1">{cat.name}</h3>
              <p className="font-body text-sm text-cream/50">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
