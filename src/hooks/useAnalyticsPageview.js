// Copyright (c) 2026 Cup Compass. All rights reserved.
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initAnalytics, trackPageview } from '../lib/analytics.js'

export function useAnalyticsPageview() {
  const location = useLocation()

  useEffect(() => {
    initAnalytics()
  }, [])

  useEffect(() => {
    trackPageview(location.pathname + location.search)
  }, [location.pathname, location.search])
}
