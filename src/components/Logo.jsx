// Copyright (c) 2026 Cup Compass. All rights reserved.
//
// Primary lockup: compass-rose + coffee-cup mark, "Cup Compass" wordmark in a
// cream-to-copper gradient, with the "Find Your Bloom" tagline in small caps.
// DESIGN NOTE (flag for IP review): the combined compass-rose/cup mark is a
// candidate for design trademark registration — see docs/IP_FLAGS.md.

export function LogoMark({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="Cup Compass mark">
      <defs>
        <linearGradient id="cc-mark-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F7EFE5" />
          <stop offset="100%" stopColor="#C1652F" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="none" stroke="url(#cc-mark-gradient)" strokeWidth="2.5" />
      {/* compass needle */}
      <path d="M32 12 L38 32 L32 52 L26 32 Z" fill="url(#cc-mark-gradient)" opacity="0.35" />
      {/* coffee cup */}
      <path
        d="M20 28h20v10a10 10 0 0 1-10 10 10 10 0 0 1-10-10z"
        fill="none"
        stroke="url(#cc-mark-gradient)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M40 30h3a4 4 0 0 1 0 8h-3"
        fill="none"
        stroke="url(#cc-mark-gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* steam / bloom wisp */}
      <path
        d="M26 22c-1.5-2 1.5-3 0-6"
        fill="none"
        stroke="url(#cc-mark-gradient)"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M32 22c-1.5-2 1.5-3 0-6"
        fill="none"
        stroke="url(#cc-mark-gradient)"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Logo({ withTagline = true, markSize = 40 }) {
  return (
    <div className="flex items-center gap-3">
      <LogoMark size={markSize} />
      <div className="flex flex-col leading-none">
        <span
          className="font-display text-xl tracking-wide bg-clip-text text-transparent"
          style={{ backgroundImage: 'linear-gradient(90deg, #F7EFE5, #C1652F)' }}
        >
          Cup Compass
        </span>
        {withTagline && (
          <span className="font-body text-[0.6rem] uppercase tracking-[0.25em] text-cream/60 mt-1">
            Find Your Bloom
          </span>
        )}
      </div>
    </div>
  )
}

export default Logo
