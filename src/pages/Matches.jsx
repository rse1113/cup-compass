// Copyright (c) 2026 Cup Compass. All rights reserved.
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SEOHead } from '../components/seo/SEOHead.jsx'
import { ProductCard } from '../components/ProductCard.jsx'
import { useBrewProfile } from '../hooks/useBrewProfile.js'
import { supabase } from '../lib/supabaseClient.js'
import { fetchBloomScores, rankProductsByBloomScore } from '../lib/bloomScore.js'

const MAX_CANDIDATES = 24

export function Matches() {
  const { profile, isComplete } = useBrewProfile()
  const [status, setStatus] = useState('loading') // loading | ready | empty | error
  const [ranked, setRanked] = useState([])

  useEffect(() => {
    if (!isComplete) {
      setStatus('empty')
      return
    }

    let cancelled = false
    setStatus('loading')

    const run = async () => {
      try {
        const categorySlugs = profile.categoryInterest.length
          ? profile.categoryInterest
          : ['coffee-beans-subscriptions']

        const { data: categories, error: categoryError } = await supabase
          .from('categories')
          .select('id, slug')
          .in('slug', categorySlugs)
        if (categoryError) throw categoryError

        const categoryIds = categories.map((c) => c.id)

        const { data: products, error: productsError } = await supabase
          .from('products')
          .select('*, roaster:roasters(name), merchant:merchants(*)')
          .in('category_id', categoryIds)
          .limit(MAX_CANDIDATES)
        if (productsError) throw productsError

        if (!products || products.length === 0) {
          if (!cancelled) setStatus('empty')
          return
        }

        const scores = await fetchBloomScores(profile, products)
        const rankedProducts = rankProductsByBloomScore(products, scores)

        if (!cancelled) {
          setRanked(rankedProducts)
          setStatus(rankedProducts.length ? 'ready' : 'empty')
        }
      } catch (error) {
        console.error('Failed to load matches:', error)
        if (!cancelled) setStatus('error')
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [isComplete, profile])

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <SEOHead
        title="Your Matches"
        description="Your Bloom Score-ranked shortlist, matched to your Brew Profile."
        path="/matches"
      />
      <p className="font-body text-xs uppercase tracking-[0.2em] text-moss-light mb-2">
        Your Bloom
      </p>
      <h1 className="font-display text-3xl mb-8">Your Matches</h1>

      {status === 'empty' && !isComplete && (
        <div className="bg-panel border border-cream/10 rounded-xl p-8 text-center">
          <p className="font-body text-cream/70 mb-4">
            Take the Brew Profile quiz first so we know what to match you to.
          </p>
          <Link
            to="/brew-quiz"
            className="font-display text-xs uppercase tracking-wide bg-copper hover:bg-copper-light text-cream px-4 py-2 rounded-full"
          >
            Start the Quiz
          </Link>
        </div>
      )}

      {status === 'loading' && (
        <p className="font-mono text-sm text-cream/50">Brewing your matches…</p>
      )}

      {status === 'error' && (
        <p className="font-mono text-sm text-copper">
          Something went wrong finding your matches. Please try again.
        </p>
      )}

      {status === 'empty' && isComplete && (
        <p className="font-body text-cream/60">
          No products match that combination yet — try widening your Brew Profile.
        </p>
      )}

      {status === 'ready' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ranked.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Matches
