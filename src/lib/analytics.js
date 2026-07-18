// Copyright (c) 2026 Cup Compass. All rights reserved.
//
// Minimal GA4 (gtag.js) wrapper. Loads the script lazily and only when a
// measurement ID is configured, so local dev without VITE_GA_MEASUREMENT_ID
// never pings Google. Page views are sent manually on each route change
// since gtag's own auto page_view only fires on the initial hard load —
// React Router navigations don't reload the page.

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

let initialized = false

export function initAnalytics() {
  if (!GA_ID || initialized || typeof document === 'undefined') return
  initialized = true

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args) {
    window.dataLayer.push(args)
  }
  window.gtag('js', new Date())
  // send_page_view disabled — we send page_view manually per route change.
  window.gtag('config', GA_ID, { send_page_view: false })
}

export function trackPageview(path) {
  if (!GA_ID || typeof window.gtag !== 'function') return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}
