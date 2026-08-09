import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SignInPage, SignInFormPage, SignUpPage } from './features/auth'
import { Navbar, Footer } from '@/components/layout'
import { LandingPage } from '@/features/landing'
import { ComingSoon, PreEventOne } from './features/events'
import AboutUsDetail from './features/static/components/AboutUsDetail'
import ThemePage from './features/static/components/ThemePage'
import SubthemePage from './features/static/components/SubthemePage'

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
  { path: '/login', element: <SignInPage /> },
  { path: '/sign-in', element: <SignInFormPage /> },
  { path: '/sign-up', element: <SignUpPage /> },
  {
    path: '/about',
    element: (
      <div className="w-full bg-[#1E0F0A] text-white relative">
        <Navbar />
        <AboutUsDetail />
        <Footer className="!absolute bottom-0 left-0 w-full z-30 !bg-gradient-to-b !from-transparent !via-transparent !to-black/80" />
      </div>
    ),
  },
  {
    path: '/about/us',
    element: (
      <div className="w-full bg-[#1E0F0A] text-white relative">
        <Navbar />
        <AboutUsDetail />
        <Footer className="!absolute bottom-0 left-0 w-full z-30 !bg-gradient-to-b !from-transparent !via-transparent !to-black/80" />
      </div>
    ),
  },
  {
    path: '/about/theme',
    element: <ThemePage />,
  },
  {
    path: '/subthemes',
    element: <SubthemePage />,
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
    path: '/pre-event-2',
    element: <ComingSoon />,
  },
  {
    path: '/main-event',
    element: <ComingSoon />,
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