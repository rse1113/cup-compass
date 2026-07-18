// Copyright (c) 2026 Cup Compass. All rights reserved.
//
// "The Pour" — the signature Bloom Score visual: a circular pour-over
// dripper rendered as a radial-fill ring that animates in like water
// blooming over grounds. Reused anywhere a Bloom Score is displayed
// (results cards on /matches, product detail, etc.).
//
// DESIGN NOTE (flag for IP review): this radial "bloom" fill animation tied
// to a proprietary score is a candidate for a design patent — see
// docs/IP_FLAGS.md.

import { useEffect, useState } from 'react'

const RADIUS = 42
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function scoreColor(score) {
  if (score >= 85) return '#C1652F' // copper — excellent match
  if (score >= 65) return '#D98252' // copper-light — good match
  return '#5C6B47' // moss — fair match
}

/**
 * @param {number} score - Bloom Score, 0-100
 * @param {number} [size] - pixel width/height of the rendered SVG
 * @param {boolean} [animate] - play the pour/bloom-in animation on mount
 * @param {string} [label] - small caps label under the score, defaults to "Bloom Score"
 */
export function ThePour({ score, size = 120, animate = true, label = 'Bloom Score' }) {
  const clamped = Math.max(0, Math.min(100, Math.round(score ?? 0)))
  const [filled, setFilled] = useState(animate ? 0 : clamped)
  const [blooming, setBlooming] = useState(animate)

  useEffect(() => {
    if (!animate) {
      setFilled(clamped)
      return
    }
    const raf = requestAnimationFrame(() => setFilled(clamped))
    const bloomTimeout = setTimeout(() => setBlooming(false), 900)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(bloomTimeout)
    }
  }, [clamped, animate])

  const offset = CIRCUMFERENCE * (1 - filled / 100)
  const color = scoreColor(clamped)

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${label}: ${clamped} out of 100`}
    >
      <svg width={size} height={size} viewBox="0 0 96 96" className="-rotate-90">
        {/* dripper rim */}
        <circle cx="48" cy="48" r={RADIUS} fill="none" stroke="#332419" strokeWidth="8" />
        {/* bloom pulse — a soft ring that expands and fades once on mount */}
        {blooming && (
          <circle
            cx="48"
            cy="48"
            r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth="8"
            opacity="0.5"
            className="animate-[bloom-pulse_0.9s_ease-out]"
          />
        )}
        {/* radial fill representing the Bloom Score */}
        <circle
          cx="48"
          cy="48"
          r={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          style={{ transition: animate ? 'stroke-dashoffset 1.1s cubic-bezier(0.22, 1, 0.36, 1)' : 'none' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-2xl font-medium text-cream">{clamped}</span>
        <span className="font-body text-[0.55rem] uppercase tracking-[0.2em] text-cream/60">
          {label}
        </span>
      </div>
    </div>
  )
}

export default ThePour
