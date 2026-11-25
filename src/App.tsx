import { MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'

import { FloatingActions } from './components/FloatingActions'
import { HeyServoWidget } from './components/HeyServoWidget'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { SmoothScroll } from './components/SmoothScroll'
import { LocaleProvider } from './lib/locale'
import { AiEmployee } from './pages/AiEmployee'
import { Auth } from './pages/Auth'
import { Home } from './pages/Home'
import { AestheticsDentalPage } from './pages/industries/AestheticsDentalPage'
import { HospitalityPage } from './pages/industries/HospitalityPage'
import { RestaurantsPage } from './pages/industries/RestaurantsPage'
import { SmallBusinessPage } from './pages/industries/SmallBusinessPage'
import { ResourceGuide } from './pages/ResourceGuide'

function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-full bg-brand px-5 py-3 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]"
      >
        Skip to content
      </a>
      <div id="top" className="flex min-h-svh flex-col">
        <Nav />
        {children}
        <Footer />
      </div>
    </>
  )
}

export function App() {
  return (
    <LocaleProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <SmoothScroll>
            <HeyServoWidget />
            <FloatingActions />
            <Routes>
              <Route
                path="/"
                element={
                  <MarketingLayout>
                    <Home />
                  </MarketingLayout>
                }
              />
              <Route
                path="/ai-employee"
                element={
                  <MarketingLayout>
                    <AiEmployee />
                  </MarketingLayout>
                }
              />
              <Route
                path="/resources/:slug"
                element={
                  <MarketingLayout>
                    <ResourceGuide />
                  </MarketingLayout>
                }
              />
              <Route
                path="/industries/hospitality"
                element={
                  <MarketingLayout>
                    <HospitalityPage />
                  </MarketingLayout>
                }
              />
              <Route
                path="/industries/aesthetics-dental"
                element={
                  <MarketingLayout>
                    <AestheticsDentalPage />
                  </MarketingLayout>
                }
              />
              <Route
                path="/industries/restaurants"
                element={
                  <MarketingLayout>
                    <RestaurantsPage />
                  </MarketingLayout>
                }
              />
              <Route
                path="/industries/small-business"
                element={
                  <MarketingLayout>
                    <SmallBusinessPage />
                  </MarketingLayout>
                }
              />
              <Route path="/demo" element={<Auth />} />
              <Route path="/login" element={<Navigate to="/demo?mode=login" replace />} />
              <Route path="/signup" element={<Navigate to="/demo" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </SmoothScroll>
        </BrowserRouter>
      </MotionConfig>
    </LocaleProvider>
  )
}
