// Copyright (c) 2026 Cup Compass. All rights reserved.
//
// Vercel serverless function. Runs server-side only so ANTHROPIC_API_KEY and
// SUPABASE_SERVICE_ROLE_KEY are never exposed to the client. Scores a set of
// candidate products against a submitted Brew Profile using the Claude API,
// caching results in `bloom_score_cache` keyed by a hash of the profile.

import { createClient } from '@supabase/supabase-js'
import { createHash } from 'node:crypto'

const CLAUDE_MODEL = process.env.CLAUDE_MODEL || 'claude-sonnet-5'
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'

const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

function hashProfile(profile) {
  const normalized = JSON.stringify(profile, Object.keys(profile).sort())
  return createHash('sha256').update(normalized).digest('hex')
}

const SCORING_TOOL = {
  name: 'submit_bloom_scores',
  description: 'Submit Bloom Score results for every candidate product provided.',
  input_schema: {
    type: 'object',
    properties: {
      scores: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            product_id: { type: 'string' },
            bloom_score: { type: 'integer', minimum: 0, maximum: 100 },
            flavor_match: { type: 'integer', minimum: 0, maximum: 100 },
            freshness: { type: 'integer', minimum: 0, maximum: 100 },
            brew_fit: { type: 'integer', minimum: 0, maximum: 100 },
            value_score: { type: 'integer', minimum: 0, maximum: 100 },
            rationale: { type: 'string', description: 'One sentence explaining the score.' },
          },
          required: ['product_id', 'bloom_score', 'flavor_match', 'freshness', 'brew_fit', 'value_score', 'rationale'],
        },
      },
    },
    required: ['scores'],
  },
}

async function scoreWithClaude(profile, products) {
  const response = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 4096,
      system:
        'You are the Bloom Score matching engine for Cup Compass, a coffee discovery site. ' +
        'Score each candidate product from 0-100 on: flavor_match (fit to requested flavor notes/roast), ' +
        'freshness (roast-to-ship practices implied by the listing), brew_fit (compatibility with the ' +
        "requested brew method), and value_score (price vs. quality/quantity for the user's budget). " +
        'bloom_score is your overall weighted verdict (not a simple average) reflecting how well this ' +
        'product matches the whole Brew Profile. Call submit_bloom_scores exactly once with one entry per product_id given.',
      tools: [SCORING_TOOL],
      tool_choice: { type: 'tool', name: 'submit_bloom_scores' },
      messages: [
        {
          role: 'user',
          content: JSON.stringify({ brew_profile: profile, candidate_products: products }),
        },
      ],
    }),
  })

  if (!response.ok) {
    const errText = await response.text()
    throw new Error(`Claude API error ${response.status}: ${errText}`)
  }

  const data = await response.json()
  const toolUse = data.content.find((block) => block.type === 'tool_use')
  if (!toolUse) throw new Error('Claude did not return a submit_bloom_scores tool call')
  return toolUse.input.scores
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const { profile, products } = req.body ?? {}
    if (!profile || !Array.isArray(products) || products.length === 0) {
      res.status(400).json({ error: 'Request must include `profile` and a non-empty `products` array.' })
      return
    }

    const profileHash = hashProfile(profile)
    const productIds = products.map((p) => p.id)

    const { data: cached, error: cacheReadError } = await supabaseAdmin
      .from('bloom_score_cache')
      .select('*')
      .eq('profile_hash', profileHash)
      .in('product_id', productIds)

    if (cacheReadError) throw cacheReadError

    const cachedIds = new Set(cached.map((row) => row.product_id))
    const uncached = products.filter((p) => !cachedIds.has(p.id))

    let freshScores = []
    if (uncached.length > 0) {
      const scored = await scoreWithClaude(
        profile,
        uncached.map(({ id, name, category, roast_level, flavor_notes, brew_methods, price_cents, subscription_available }) => ({
          id,
          name,
          category,
          roast_level,
          flavor_notes,
          brew_methods,
          price_cents,
          subscription_available,
        }))
      )

      const rows = scored.map((s) => ({
        profile_hash: profileHash,
        product_id: s.product_id,
        bloom_score: s.bloom_score,
        flavor_match: s.flavor_match,
        freshness: s.freshness,
        brew_fit: s.brew_fit,
        value_score: s.value_score,
        rationale: s.rationale,
      }))

      const { data: inserted, error: insertError } = await supabaseAdmin
        .from('bloom_score_cache')
        .upsert(rows, { onConflict: 'profile_hash,product_id' })
        .select('*')

      if (insertError) throw insertError
      freshScores = inserted
    }

    res.status(200).json({ scores: [...cached, ...freshScores] })
  } catch (error) {
    console.error('bloom-score handler error:', error)
    res.status(500).json({ error: 'Failed to compute Bloom Scores.' })
  }
}
