// Copyright (c) 2026 Cup Compass. All rights reserved.
import { useEffect, useState } from 'react'
import { SEOHead } from '../components/seo/SEOHead.jsx'
import { supabase } from '../lib/supabaseClient.js'

export function Roasters() {
  const [roasters, setRoasters] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false
    supabase
      .from('roasters')
      .select('*')
      .order('name')
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) {
          console.error('Failed to load roasters:', error)
          setStatus('error')
          return
        }
        setRoasters(data)
        setStatus(data.length ? 'ready' : 'empty')
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <SEOHead
        title="Roaster Directory"
        description="Browse specialty coffee roasters matched by Cup Compass, with origin regions and specialty tags."
        path="/roasters"
      />
      <p className="font-body text-xs uppercase tracking-[0.2em] text-moss-light mb-2">
        Directory
      </p>
      <h1 className="font-display text-3xl mb-8">Roasters</h1>

      {status === 'loading' && <p className="font-mono text-sm text-cream/50">Loading roasters…</p>}
      {status === 'error' && (
        <p className="font-mono text-sm text-copper">Couldn&rsquo;t load the roaster directory.</p>
      )}
      {status === 'empty' && (
        <p className="font-body text-cream/60">No roasters listed yet.</p>
      )}

      {status === 'ready' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roasters.map((roaster) => (
            <article
              key={roaster.id}
              className="bg-panel border border-cream/10 rounded-xl p-5"
            >
              <h2 className="font-display text-base mb-1">{roaster.name}</h2>
              {roaster.origin_region && (
                <p className="font-body text-xs text-cream/50 mb-2">{roaster.origin_region}</p>
              )}
              {roaster.description && (
                <p className="font-body text-sm text-cream/70 mb-3">{roaster.description}</p>
              )}
              <div className="flex flex-wrap gap-1.5">
                {(roaster.specialty_tags ?? []).map((tag) => (
                  <span
                    key={tag}
                    className="font-body text-[0.65rem] uppercase tracking-wide bg-moss/20 text-moss-light px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default Roasters
