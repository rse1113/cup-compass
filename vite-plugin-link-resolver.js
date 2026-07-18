// Copyright (c) 2026 Cup Compass. All rights reserved.
//
// Build-time guard: fails the build if a retailer domain is hardcoded
// anywhere in application source. All outbound links must be assembled at
// request time by resolveMerchantLink() (src/lib/linkResolver.js) from the
// Supabase `merchants` table, via the useLinkResolver() hook.

const FORBIDDEN_DOMAINS = [
  'amazon.com',
  'amzn.to',
  'volcanicacoffee.com',
  'coffeebros.com',
  'bodum.com',
  'blackinkcoffee.com',
  'myespressoshop.com',
  'tayst.com',
  'go.skimresources.com',
]

// Forward-slash fragments — Vite module ids are always posix-style, even on Windows.
const ALLOWLISTED_PATH_FRAGMENTS = ['src/lib/linkResolver.js', 'supabase/migrations', 'docs/']

export default function linkResolverGuard() {
  return {
    name: 'cup-compass-link-resolver-guard',
    enforce: 'pre',
    transform(code, id) {
      if (!/\.(jsx?|tsx?)$/.test(id)) return null
      if (id.includes('node_modules')) return null
      const normalizedId = id.replace(/\\/g, '/')
      if (ALLOWLISTED_PATH_FRAGMENTS.some((fragment) => normalizedId.includes(fragment))) return null

      for (const domain of FORBIDDEN_DOMAINS) {
        if (code.includes(domain)) {
          this.error(
            `Hardcoded retailer URL detected ("${domain}") in ${id}. ` +
              'Outbound links must go through useLinkResolver() / resolveMerchantLink(), ' +
              'not be hardcoded in source. Add or update the merchant row in Supabase instead.'
          )
        }
      }

      return null
    },
  }
}
