// Copyright (c) 2026 Cup Compass. All rights reserved.
import { Helmet } from 'react-helmet-async'

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Cup Compass',
  url: 'https://cupcompass.com',
  logo: 'https://cupcompass.com/favicon.svg',
  slogan: 'Find Your Bloom',
  description: 'AI coffee discovery platform matching users to coffee and gear via Bloom Score.',
}

export function OrganizationSchema() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(SCHEMA)}</script>
    </Helmet>
  )
}

export default OrganizationSchema
