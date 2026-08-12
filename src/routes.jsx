import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SignInPage, SignInFormPage, SignUpPage, VerifyEmailPage, ResetPasswordPage } from './features/auth'
import { Navbar, Footer } from '@/components/layout'
import { LandingPage } from '@/features/landing'
import { ComingSoon, PreEventOne } from './features/events'
import { MerchPage, ProductDetailPage } from './features/merchandise'
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
  { path: '/verify-email', element: <VerifyEmailPage /> },
  { path: '/forgot-password', element: <ResetPasswordPage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },


  { path: '/merchandise', element: <MerchPage /> },
  { path: '/merchandise/:id', element: <ProductDetailPage /> },

  {
    path: '/about/us',
    element: <AboutUsDetail />,
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