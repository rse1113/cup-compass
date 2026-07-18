// Copyright (c) 2026 Cup Compass. All rights reserved.
//
// Pure URL-resolution logic, kept separate from the React hook so it can be
// unit tested and reused by the build-time guard (vite-plugin-link-resolver.js).
//
// IMPORTANT: no retailer URL is ever written into source. Every outbound link
// is assembled here at request time from data in the `merchants` table.

const SKIMLINKS_BASE = 'https://go.skimresources.com'

function joinPath(baseUrl, path) {
  if (!path) return baseUrl
  const base = baseUrl.replace(/\/+$/, '')
  const suffix = path.replace(/^\/+/, '')
  return `${base}/${suffix}`
}

function skimlinksWrap(targetUrl, publisherId) {
  const params = new URLSearchParams({ id: publisherId, url: targetUrl })
  return `${SKIMLINKS_BASE}?${params.toString()}`
}

/**
 * Resolve the outbound affiliate URL for a product's merchant.
 *
 * @param {object} merchant - row from the `merchants` table
 * @param {string} [productPath] - merchant_product_path from the `products` table
 * @param {string} skimlinksPublisherId - VITE_SKIMLINKS_PUBLISHER_ID
 * @returns {{ href: string, network: string, isFallback: boolean }}
 */
export function resolveMerchantLink(merchant, productPath, skimlinksPublisherId) {
  if (!merchant || !merchant.base_url) {
    throw new Error('resolveMerchantLink requires a merchant with a base_url')
  }

  const targetUrl = joinPath(merchant.base_url, productPath)

  const canUseDirectNetwork =
    merchant.status === 'active' && Boolean(merchant.affiliate_id)

  if (canUseDirectNetwork) {
    switch (merchant.network) {
      case 'amazon_associates': {
        const params = new URLSearchParams({ tag: merchant.affiliate_id })
        const separator = targetUrl.includes('?') ? '&' : '?'
        return { href: `${targetUrl}${separator}${params.toString()}`, network: merchant.network, isFallback: false }
      }
      case 'impact':
      case 'shareasale':
      case 'flexoffers': {
        if (merchant.tracking_template) {
          const href = merchant.tracking_template
            .replace('{base_url}', targetUrl)
            .replace('{affiliate_id}', merchant.affiliate_id)
          return { href, network: merchant.network, isFallback: false }
        }
        break
      }
      case 'direct':
        return { href: targetUrl, network: 'direct', isFallback: false }
      case 'skimlinks':
        return {
          href: skimlinksWrap(targetUrl, merchant.affiliate_id || skimlinksPublisherId),
          network: 'skimlinks',
          isFallback: false,
        }
      default:
        break
    }
  }

  // Fallback: merchant application is pending/deferred, or has no direct
  // tracking mapping yet — route through the Skimlinks catch-all instead of
  // hardcoding or skipping the link.
  return {
    href: skimlinksWrap(targetUrl, skimlinksPublisherId),
    network: 'skimlinks',
    isFallback: true,
  }
}
