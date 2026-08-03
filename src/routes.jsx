import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SignInPage, SignInFormPage, SignUpPage } from './features/auth'
import { Navbar, Footer } from '@/components/layout'
import { LandingPage } from '@/features/landing'
import { ComingSoon, PreEventOne } from './features/events'

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