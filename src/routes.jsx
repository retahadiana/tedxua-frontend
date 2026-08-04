import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Navbar, Footer } from '@/components/layout'
import { LandingPage } from '@/features/landing'
import { ComingSoon, PreEventOne } from './features/events'
import AboutUsDetail from './features/static/components/AboutUsDetail'

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
    path: '/coming-soon',
    element: <ComingSoon />,
  },
  {
    path: '/pre-event-1',
    element: <PreEventOne />,
  },
])

export default function Routes() {
  return <RouterProvider router={router} />
}