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

// ── Admin Panel Imports ──────────────────────────────────────────────────────
import {
  AdminRoute,
  AdminLayout,
  DashboardPage,
  BundleListPage,
  BundleFormPage,
  MerchListPage,
  MerchFormPage,
  CategoryListPage,
  UserListPage,
  UserDetailPage,
  ToastProvider,
} from './features/admin'

// Wrapper yang menyediakan ToastProvider untuk admin routes
function AdminLayoutWithToast() {
  return (
    <ToastProvider>
      <AdminLayout />
    </ToastProvider>
  )
}

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
  { path: '/login', element: <SignInFormPage /> },
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

  // ── Admin Panel Routes ───────────────────────────────────────────────────
  {
    path: '/admin',
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayoutWithToast />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'bundles', element: <BundleListPage /> },
          { path: 'bundles/create', element: <BundleFormPage /> },
          { path: 'bundles/:id/edit', element: <BundleFormPage /> },
          { path: 'merchandise', element: <MerchListPage /> },
          { path: 'merchandise/create', element: <MerchFormPage /> },
          { path: 'merchandise/:id/edit', element: <MerchFormPage /> },
          { path: 'merchandise/categories', element: <CategoryListPage /> },
          { path: 'users', element: <UserListPage /> },
          { path: 'users/:id', element: <UserDetailPage /> },
        ],
      },
    ],
  },

  {
    path: '*',
    element: <ComingSoon />,
  },
])

export default function Routes() {
  return <RouterProvider router={router} />
}