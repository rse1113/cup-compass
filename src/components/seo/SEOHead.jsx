// Copyright (c) 2026 Cup Compass. All rights reserved.
import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Cup Compass'
const SITE_URL = 'https://cupcompass.com'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`

/**
 * Per-route SEO tags: title, description, canonical, OG/Twitter cards, and
 * optional JSON-LD schema markup.
 *
 * @param {string} title
 * @param {string} description
 * @param {string} path - route path, e.g. "/brew-quiz"
 * @param {object} [schema] - JSON-LD object to embed as application/ld+json
 * @param {string} [image]
 */
export function SEOHead({ title, description, path = '/', schema, image = DEFAULT_IMAGE }) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Find Your Bloom`
  const canonical = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  )
}

export default SEOHead
