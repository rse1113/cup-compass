// Copyright (c) 2026 Cup Compass. All rights reserved.
import { ThePour } from './ThePour/ThePour.jsx'
import { useLinkResolver } from '../hooks/useLinkResolver.js'

// LAUNCH BLOCKER: falls back to a placeholder illustration when a product
// has no real product image yet. See docs/LAUNCH_BLOCKERS.md — every
// product needs real imagery (Amazon PA API / affiliate feed / brand
// photography) before this can ship to production.
function ProductImage({ product }) {
  if (product.image_url) {
    return (
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-40 object-cover rounded-lg"
        loading="lazy"
      />
    )
  }

  return (
    <div className="w-full h-40 rounded-lg bg-panel border border-dashed border-copper/40 flex flex-col items-center justify-center gap-1">
      <span className="font-mono text-[0.65rem] uppercase tracking-wide text-copper/70">
        Image pending
      </span>
      <span className="font-body text-[0.65rem] text-cream/40 px-4 text-center">
        Placeholder — not launch-ready
      </span>
    </div>
  )
}

export function ProductCard({ product }) {
  const { href, loading, isFallback } = useLinkResolver(product)
  const score = product.bloomScore

  return (
    <article className="bg-panel border border-cream/10 rounded-xl p-5 flex flex-col gap-4">
      <ProductImage product={product} />

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-base leading-tight">{product.name}</h3>
          {product.roaster?.name && (
            <p className="font-body text-xs text-cream/50 mt-1">{product.roaster.name}</p>
          )}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {(product.flavor_notes ?? []).slice(0, 3).map((note) => (
              <span
                key={note}
                className="font-body text-[0.65rem] uppercase tracking-wide bg-moss/20 text-moss-light px-2 py-0.5 rounded-full"
              >
                {note}
              </span>
            ))}
          </div>
        </div>
        {score && <ThePour score={score.bloom_score} size={72} />}
      </div>

      {score?.rationale && (
        <p className="font-body text-sm text-cream/70 italic">&ldquo;{score.rationale}&rdquo;</p>
      )}

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-cream/10">
        <span className="font-mono text-sm text-cream/80">
          {product.price_cents ? `$${(product.price_cents / 100).toFixed(2)}` : '—'}
        </span>
        <a
          href={loading ? undefined : href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          aria-disabled={loading}
          className={`font-display text-xs uppercase tracking-wide px-4 py-2 rounded-full transition-colors ${
            loading
              ? 'bg-cream/10 text-cream/40 cursor-wait'
              : 'bg-copper hover:bg-copper-light text-cream'
          }`}
        >
          {loading ? 'Loading…' : 'Shop This'}
        </a>
      </div>
      {isFallback && (
        <p className="font-mono text-[0.6rem] text-cream/30">via Skimlinks</p>
      )}
    </article>
  )
}

export default ProductCard
