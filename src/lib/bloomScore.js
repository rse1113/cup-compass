// Copyright (c) 2026 Cup Compass. All rights reserved.
//
// Client-side caller for the /api/bloom-score serverless function. Keeps the
// Claude API key server-only — the browser never talks to Anthropic directly.

/**
 * @param {object} profile - the submitted Brew Profile
 * @param {object[]} products - candidate products to score (from Supabase)
 * @returns {Promise<Array<{product_id: string, bloom_score: number, flavor_match: number, freshness: number, brew_fit: number, value_score: number, rationale: string}>>}
 */
export async function fetchBloomScores(profile, products) {
  const response = await fetch('/api/bloom-score', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ profile, products }),
  })

  if (!response.ok) {
    throw new Error(`Bloom Score request failed: ${response.status}`)
  }

  const { scores } = await response.json()
  return scores
}

/**
 * Merges Bloom Score results onto their source products and sorts
 * highest-scoring first.
 */
export function rankProductsByBloomScore(products, scores) {
  const scoreById = new Map(scores.map((s) => [s.product_id, s]))
  return products
    .map((product) => ({ ...product, bloomScore: scoreById.get(product.id) ?? null }))
    .filter((product) => product.bloomScore !== null)
    .sort((a, b) => b.bloomScore.bloom_score - a.bloomScore.bloom_score)
}
