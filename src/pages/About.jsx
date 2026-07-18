// Copyright (c) 2026 Cup Compass. All rights reserved.
import { Link } from 'react-router-dom'
import { SEOHead } from '../components/seo/SEOHead.jsx'

export function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 font-body text-cream/80">
      <SEOHead
        title="About"
        description="Cup Compass is an AI coffee discovery platform, not a retailer — learn how Bloom Score is calculated and sourced."
        path="/about"
      />
      <p className="font-body text-xs uppercase tracking-[0.2em] text-moss-light mb-2">
        About
      </p>
      <h1 className="font-display text-3xl mb-8 text-cream">About Cup Compass</h1>

      <div className="flex flex-col gap-6">
        <p>
          Cup Compass is a coffee discovery platform, not a retailer. We don&rsquo;t sell coffee
          or equipment ourselves — instead, we help you figure out what to buy and where, based
          on how you actually brew.
        </p>
        <p>
          Tell us your roast preference, brew method, flavor notes, and budget in the{' '}
          <Link to="/brew-quiz" className="text-copper hover:text-copper-light underline">
            Brew Profile quiz
          </Link>
          , and we return a ranked shortlist scored by <strong className="text-cream">Bloom Score</strong> —
          our 0–100 rating of how well a product fits your profile.
        </p>

        <section className="bg-panel border border-cream/10 rounded-xl p-6 mt-4">
          <h2 className="font-display text-lg text-cream mb-3">How We Source & Score</h2>
          <ul className="list-disc list-inside flex flex-col gap-2 text-sm">
            <li>
              <strong className="text-cream">Catalog data</strong> comes from roaster and
              retailer listings, refreshed on an ongoing basis.
            </li>
            <li>
              <strong className="text-cream">Bloom Score</strong> is computed per search by
              weighing flavor match, freshness, brew-method fit, and value against your
              submitted Brew Profile — it is never influenced by commission rate.
            </li>
            <li>
              <strong className="text-cream">Affiliate relationships</strong> fund the site;
              see our{' '}
              <Link to="/affiliate-disclosure" className="text-copper hover:text-copper-light underline">
                affiliate disclosure
              </Link>{' '}
              for the full list of programs we participate in.
            </li>
            <li>
              We do not accept payment in exchange for a specific ranking or score.
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default About
