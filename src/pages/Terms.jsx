// Copyright (c) 2026 Cup Compass. All rights reserved.
import { SEOHead } from '../components/seo/SEOHead.jsx'

export function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 font-body text-cream/80">
      <SEOHead
        title="Terms of Service"
        description="Terms governing your use of Cup Compass."
        path="/terms"
      />
      <h1 className="font-display text-3xl mb-2 text-cream">Terms of Service</h1>
      <p className="text-sm text-cream/50 mb-8">Last updated: July 18, 2026</p>

      <div className="flex flex-col gap-6 text-sm leading-relaxed">
        <section>
          <h2 className="font-display text-base text-cream mb-2">Not a Retailer</h2>
          <p>
            Cup Compass is a discovery and matching service. We do not sell, ship, or fulfill
            any product. All purchases happen on third-party retailer or roaster sites, subject
            to their own terms, pricing, and availability.
          </p>
        </section>
        <section>
          <h2 className="font-display text-base text-cream mb-2">Bloom Score Disclaimer</h2>
          <p>
            Bloom Score is an algorithmic estimate generated from your submitted Brew Profile
            and available catalog data. It is a recommendation aid, not a guarantee of taste
            preference, product availability, or pricing accuracy at the retailer.
          </p>
        </section>
        <section>
          <h2 className="font-display text-base text-cream mb-2">Affiliate Links</h2>
          <p>
            Outbound product links are affiliate links. We may earn a commission on qualifying
            purchases at no additional cost to you. See our{' '}
            <a href="/affiliate-disclosure" className="text-copper hover:text-copper-light underline">
              affiliate disclosure
            </a>{' '}
            for details.
          </p>
        </section>
        <section>
          <h2 className="font-display text-base text-cream mb-2">No Warranty</h2>
          <p>
            The site is provided &ldquo;as is&rdquo; without warranties of any kind. We are not
            responsible for the accuracy of third-party listings, pricing, or product
            availability.
          </p>
        </section>
        <section>
          <h2 className="font-display text-base text-cream mb-2">Changes</h2>
          <p>We may update these terms from time to time; continued use constitutes acceptance of the current version.</p>
        </section>
      </div>
    </div>
  )
}

export default Terms
