// Copyright (c) 2026 Cup Compass. All rights reserved.
import { SEOHead } from '../components/seo/SEOHead.jsx'

export function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 font-body text-cream/80">
      <SEOHead
        title="Privacy Policy"
        description="How Cup Compass collects, uses, and protects your information."
        path="/privacy"
      />
      <h1 className="font-display text-3xl mb-2 text-cream">Privacy Policy</h1>
      <p className="text-sm text-cream/50 mb-8">Last updated: July 18, 2026</p>

      <div className="flex flex-col gap-6 text-sm leading-relaxed">
        <section>
          <h2 className="font-display text-base text-cream mb-2">What We Collect</h2>
          <p>
            Cup Compass does not require an account to use the Brew Profile quiz or view
            matches. Your quiz answers are stored temporarily in your browser session and are
            not tied to a persistent identity. We use Google Analytics (GA4) to collect
            standard analytics data (pages viewed, approximate location, device type) and,
            when you click an outbound product link, whether that click occurred — this is how
            affiliate partners attribute commissions.
          </p>
        </section>
        <section>
          <h2 className="font-display text-base text-cream mb-2">How We Use It</h2>
          <p>
            Aggregate, anonymized data helps us improve Bloom Score accuracy and site
            performance. We do not sell personal information.
          </p>
        </section>
        <section>
          <h2 className="font-display text-base text-cream mb-2">Cookies & Tracking</h2>
          <p>
            Outbound links may include tracking parameters used by our affiliate networks
            (Skimlinks, Impact, Amazon Associates, and others as disclosed on our{' '}
            <a href="/affiliate-disclosure" className="text-copper hover:text-copper-light underline">
              affiliate disclosure
            </a>{' '}
            page) to attribute purchases. These networks may set their own cookies once you
            leave cupcompass.com; their privacy policies govern that data.
          </p>
        </section>
        <section>
          <h2 className="font-display text-base text-cream mb-2">Third-Party Services</h2>
          <p>
            We use Supabase for catalog data and the Claude API (Anthropic) to compute Bloom
            Scores. Your Brew Profile answers are sent to these services solely to generate
            your match results.
          </p>
        </section>
        <section>
          <h2 className="font-display text-base text-cream mb-2">Your Choices</h2>
          <p>
            Because no account is required, there is no persistent profile to delete beyond
            clearing your browser session storage.
          </p>
        </section>
        <section>
          <h2 className="font-display text-base text-cream mb-2">Contact</h2>
          <p>Questions about this policy can be sent via the contact details listed on our About page.</p>
        </section>
      </div>
    </div>
  )
}

export default Privacy
