// Copyright (c) 2026 Cup Compass. All rights reserved.
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import { resolveMerchantLink } from '../lib/linkResolver.js'

const SKIMLINKS_PUBLISHER_ID = import.meta.env.VITE_SKIMLINKS_PUBLISHER_ID

const merchantCache = new Map()

async function fetchMerchant(merchantId) {
  if (merchantCache.has(merchantId)) return merchantCache.get(merchantId)

  const { data, error } = await supabase
    .from('merchants')
    .select('*')
    .eq('id', merchantId)
    .single()

  if (error) throw error

  merchantCache.set(merchantId, data)
  return data
}

/**
 * Resolves a product's outbound affiliate link at render time.
 * Never returns a hardcoded retailer URL — everything is derived from the
 * `merchants` table via resolveMerchantLink().
 *
 * @param {object} product - a row from `products` (must include merchant_id
 *   and merchant_product_path; may include an embedded `merchant` object
 *   from a Supabase join to skip the extra fetch)
 */
export function useLinkResolver(product) {
  const [state, setState] = useState({ href: null, network: null, loading: true, error: null })

  useEffect(() => {
    let cancelled = false
    if (!product?.merchant_id && !product?.merchant) {
      setState({ href: null, network: null, loading: false, error: new Error('Product has no merchant') })
      return
    }

    setState((s) => ({ ...s, loading: true, error: null }))

    const resolve = async () => {
      try {
        const merchant = product.merchant ?? (await fetchMerchant(product.merchant_id))
        const { href, network, isFallback } = resolveMerchantLink(
          merchant,
          product.merchant_product_path,
          SKIMLINKS_PUBLISHER_ID
        )
        if (!cancelled) setState({ href, network, isFallback, loading: false, error: null })
      } catch (error) {
        if (!cancelled) setState({ href: null, network: null, loading: false, error })
      }
    }

    resolve()
    return () => {
      cancelled = true
    }
  }, [product?.merchant_id, product?.merchant, product?.merchant_product_path])

  return state
}
