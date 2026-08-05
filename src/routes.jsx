import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Navbar, Footer } from '@/components/layout'
import { LandingPage } from '@/features/landing'
import { ComingSoon, PreEventOne } from './features/events'
import AboutUsDetail from './features/static/components/AboutUsDetail'
import Sponsorship from '@/features/sponsorship'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="w-full bg-[#1A100B] text-white">
        <Navbar />
        <LandingPage />
        <Footer />
      </div>
    ),
  },
  {
    path: '/about',
    element: (
      <div className="w-full bg-[#1E0F0A] text-white">
        <Navbar />
        <AboutUsDetail />
        <Footer />
      </div>
    ),
  },
  {
    path: '/about/us',
    element: (
      <div className="w-full bg-[#1E0F0A] text-white">
        <Navbar />
        <AboutUsDetail />
        <Footer />
      </div>
    ),
  },
  {
    path: '/about/theme',
    element: <ComingSoon />,
  },
  {
    path: '/events',
    element: <ComingSoon />,
  },
  {
    path: '/events/pre-event-1',
    element: <PreEventOne />,
  },
  {
    path: '/events/pre-event-2',
    element: <ComingSoon />,
  },
  {
    path: '/events/main-event',
    element: <ComingSoon />,
  },
  {
    path: '/pre-event-1',
    element: <PreEventOne />,
  },
  {
    path: '/coming-soon',
    element: <ComingSoon />,
  },
  {
    path: '/lfss',
    element: <ComingSoon />,
  },
  {
    path: '/art-showcase',
    element: <ComingSoon />,
  },
  {
    path: '/shops',
    element: <ComingSoon />,
  },
  {
    path: '/sponsorship',
    element: <Sponsorship />,
  },
  {
    path: '/sign-in',
    element: <ComingSoon />,
  },
  {
    path: '*',
    element: <ComingSoon />,
  },
])

export default function Routes() {
  return <RouterProvider router={router} />
}