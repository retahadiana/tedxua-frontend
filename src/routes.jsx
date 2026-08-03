import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Navbar, Footer } from '@/components/layout'
import { LandingPage } from '@/features/landing'

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
])

export default function Routes() {
  return <RouterProvider router={router} />
}