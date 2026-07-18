// Copyright (c) 2026 Cup Compass. All rights reserved.
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout.jsx'
import { Home } from './pages/Home.jsx'
import { BrewQuiz } from './pages/BrewQuiz.jsx'
import { Matches } from './pages/Matches.jsx'
import { Roasters } from './pages/Roasters.jsx'
import { EquipmentIndex } from './pages/Equipment/EquipmentIndex.jsx'
import { CategoryPage } from './pages/Equipment/CategoryPage.jsx'
import { Guides } from './pages/Guides.jsx'
import { About } from './pages/About.jsx'
import { Privacy } from './pages/Privacy.jsx'
import { Terms } from './pages/Terms.jsx'
import { AffiliateDisclosure } from './pages/AffiliateDisclosure.jsx'

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="brew-quiz" element={<BrewQuiz />} />
            <Route path="matches" element={<Matches />} />
            <Route path="roasters" element={<Roasters />} />
            <Route path="equipment" element={<EquipmentIndex />} />
            <Route path="equipment/:categorySlug" element={<CategoryPage />} />
            <Route path="guides" element={<Guides />} />
            <Route path="about" element={<About />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="affiliate-disclosure" element={<AffiliateDisclosure />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
