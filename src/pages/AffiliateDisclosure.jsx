// Copyright (c) 2026 Cup Compass. All rights reserved.
import { SEOHead } from '../components/seo/SEOHead.jsx'

const NETWORKS = [
  ['Skimlinks', 'Catch-all affiliate monetization across most outbound retailer links.'],
  ['Impact', 'Volcanica Coffee, Coffee Bros, and other Impact-network roasters.'],
  ['Amazon Associates', 'Grinders, drip machines, and K-cup products sold on Amazon.'],
  ['ShareASale / FlexOffers', 'Select merchants including Tayst (added post-launch).'],
  ['Direct programs', 'Bodum, Black Ink Coffee, MyEspressoShop (added post-launch).'],
]

export function AffiliateDisclosure() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 font-body text-cream/80">
      <SEOHead
        title="Affiliate Disclosure"
        description="Cup Compass participates in affiliate programs including Skimlinks, Impact, and Amazon Associates."
        path="/affiliate-disclosure"
      />
      <h1 className="font-display text-3xl mb-2 text-cream">Affiliate Disclosure</h1>
      <p className="text-sm text-cream/50 mb-8">Last updated: July 18, 2026</p>

      <div className="flex flex-col gap-6 text-sm leading-relaxed">
        <p>
          Cup Compass is reader-supported. When you click a product link on this site and make
          a qualifying purchase, we may earn a commission from the retailer or affiliate
          network — at no additional cost to you. This is disclosed in accordance with FTC
          guidelines on endorsements and testimonials.
        </p>
        <p>
          Commission does not influence Bloom Score. Rankings are computed from your Brew
          Profile against catalog data; the affiliate network or commission rate attached to a
          product is never a scoring input.
        </p>
        <section>
          <h2 className="font-display text-base text-cream mb-3">Programs We Participate In</h2>
          <ul className="flex flex-col gap-3">
            {NETWORKS.map(([name, desc]) => (
              <li key={name} className="bg-panel border border-cream/10 rounded-lg p-4">
                <p className="text-cream font-medium">{name}</p>
                <p className="text-cream/60">{desc}</p>
              </li>
            ))}
          </ul>
        </section>
        <p className="text-xs text-cream/40">
          Some programs listed above are pending application approval or scheduled for
          follow-up onboarding and may not yet be active on every link.
        </p>
      </div>
    </div>
  )
}

export default AffiliateDisclosure
