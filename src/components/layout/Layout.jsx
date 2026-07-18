// Copyright (c) 2026 Cup Compass. All rights reserved.
import { Outlet } from 'react-router-dom'
import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'
import { OrganizationSchema } from '../seo/OrganizationSchema.jsx'
import { useAnalyticsPageview } from '../../hooks/useAnalyticsPageview.js'

export function Layout() {
  useAnalyticsPageview()

  return (
    <div className="min-h-screen flex flex-col bg-espresso text-cream">
      <OrganizationSchema />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
