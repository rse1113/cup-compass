// Copyright (c) 2026 Cup Compass. All rights reserved.
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SEOHead } from '../../components/seo/SEOHead.jsx'
import { ProductCard } from '../../components/ProductCard.jsx'
import { supabase } from '../../lib/supabaseClient.js'
import { CATEGORIES } from '../../data/categories.js'

export function CategoryPage() {
  const { categorySlug } = useParams()
  const category = CATEGORIES.find((c) => c.slug === categorySlug)
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    if (!category) {
      setStatus('not-found')
      return
    }

    let cancelled = false
    setStatus('loading')

    const run = async () => {
      const { data: categoryRow, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .single()

      if (categoryError || !categoryRow) {
        if (!cancelled) setStatus('error')
        return
      }

      const { data, error } = await supabase
        .from('products')
        .select('*, roaster:roasters(name), merchant:merchants(*)')
        .eq('category_id', categoryRow.id)

      if (cancelled) return
      if (error) {
        console.error('Failed to load category products:', error)
        setStatus('error')
        return
      }
      setProducts(data)
      setStatus(data.length ? 'ready' : 'empty')
    }

    run()
    return () => {
      cancelled = true
    }
  }, [category, categorySlug])

  if (!category) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16">
        <p className="font-body text-cream/70">
          That category doesn&rsquo;t exist.{' '}
          <Link to="/equipment" className="underline hover:text-copper">
            Back to all categories
          </Link>
          .
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <SEOHead
        title={category.name}
        description={category.description}
        path={`/equipment/${category.slug}`}
      />
      <p className="font-body text-xs uppercase tracking-[0.2em] text-moss-light mb-2">
        <Link to="/equipment" className="hover:text-copper">
          Equipment
        </Link>{' '}
        / {category.name}
      </p>
      <h1 className="font-display text-3xl mb-2">{category.name}</h1>
      <p className="font-body text-cream/60 mb-8">{category.description}</p>

      {status === 'loading' && <p className="font-mono text-sm text-cream/50">Loading…</p>}
      {status === 'error' && (
        <p className="font-mono text-sm text-copper">Couldn&rsquo;t load this category.</p>
      )}
      {status === 'empty' && (
        <p className="font-body text-cream/60">
          No products listed in this category yet. Want a personalized shortlist instead?{' '}
          <Link to="/brew-quiz" className="underline hover:text-copper">
            Take the Brew Quiz
          </Link>
          .
        </p>
      )}

      {status === 'ready' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryPage
