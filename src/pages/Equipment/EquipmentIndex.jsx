// Copyright (c) 2026 Cup Compass. All rights reserved.
import { Link } from 'react-router-dom'
import { SEOHead } from '../../components/seo/SEOHead.jsx'
import { CATEGORIES } from '../../data/categories.js'

export function EquipmentIndex() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <SEOHead
        title="Equipment & Coffee Categories"
        description="Browse every Cup Compass category: coffee beans and subscriptions, espresso machines, drip and pour-over brewers, grinders, and single-serve pods."
        path="/equipment"
      />
      <p className="font-body text-xs uppercase tracking-[0.2em] text-moss-light mb-2">
        Browse
      </p>
      <h1 className="font-display text-3xl mb-8">Equipment & Categories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            to={`/equipment/${cat.slug}`}
            className="bg-panel border border-cream/10 rounded-xl p-6 hover:border-copper/50 transition-colors"
          >
            <h2 className="font-display text-lg mb-2">{cat.name}</h2>
            <p className="font-body text-sm text-cream/60">{cat.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default EquipmentIndex
