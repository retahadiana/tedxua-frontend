import React, { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Navbar, Footer } from '@/components/layout'

// Komponen Loading yang muncul saat halaman sedang didownload
const LoadingScreen = () => (
  <div className="flex min-h-screen w-full items-center justify-center bg-[#1A100B]">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
  </div>
)

// Helper wrapper untuk mempermudah Suspense di routes
const withSuspense = (Component) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component />
  </Suspense>
)

// Helper untuk lazy load named exports (misal: import { X } from 'Y')
const lazyNamed = (moduleProvider, namedExport) =>
  lazy(() => moduleProvider().then((module) => ({ default: module[namedExport] })))

// ==========================================
// Lazy Loaded Components
// ==========================================
const LandingPage = lazyNamed(() => import('@/features/landing'), 'LandingPage')

const SignInFormPage = lazyNamed(() => import('./features/auth'), 'SignInFormPage')
const SignUpPage = lazyNamed(() => import('./features/auth'), 'SignUpPage')
const VerifyEmailPage = lazyNamed(() => import('./features/auth'), 'VerifyEmailPage')
const ResetPasswordPage = lazyNamed(() => import('./features/auth'), 'ResetPasswordPage')

const MerchPage = lazyNamed(() => import('./features/merchandise'), 'MerchPage')
const ProductDetailPage = lazyNamed(() => import('./features/merchandise'), 'ProductDetailPage')

const ComingSoon = lazyNamed(() => import('./features/events'), 'ComingSoon')
const PreEventOne = lazyNamed(() => import('./features/events'), 'PreEventOne')

const AboutUsDetail = lazy(() => import('./features/static/components/AboutUsDetail'))
const ThemePage = lazy(() => import('./features/static/components/ThemePage'))
const SubthemePage = lazy(() => import('./features/static/components/SubthemePage'))

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="w-full bg-[#1A100B] text-white">
        <Navbar />
        {withSuspense(LandingPage)}
        <Footer />
      </div>
    ),
  },
  { path: '/login', element: withSuspense(SignInFormPage) },
  { path: '/sign-in', element: withSuspense(SignInFormPage) },
  { path: '/sign-up', element: withSuspense(SignUpPage) },
  { path: '/verify-email', element: withSuspense(VerifyEmailPage) },
  { path: '/forgot-password', element: withSuspense(ResetPasswordPage) },
  { path: '/reset-password', element: withSuspense(ResetPasswordPage) },

  { path: '/merchandise', element: withSuspense(MerchPage) },
  { path: '/merchandise/:id', element: withSuspense(ProductDetailPage) },

  {
    path: '/about/us',
    element: withSuspense(AboutUsDetail),
  },
  {
    path: '/about/theme',
    element: withSuspense(ThemePage),
  },
  {
    path: '/subthemes',
    element: withSuspense(SubthemePage),
  },
  {
    path: '/events',
    element: withSuspense(ComingSoon),
  },
  {
    path: '/events/pre-event-1',
    element: withSuspense(PreEventOne),
  },
  {
    path: '/events/pre-event-2',
    element: withSuspense(ComingSoon),
  },
  {
    path: '/events/main-event',
    element: withSuspense(ComingSoon),
  },
  {
    path: '/pre-event-1',
    element: withSuspense(PreEventOne),
  },
  {
    path: '/pre-event-2',
    element: withSuspense(ComingSoon),
  },
  {
    path: '/main-event',
    element: withSuspense(ComingSoon),
  },
  {
    path: '/coming-soon',
    element: withSuspense(ComingSoon),
  },
  {
    path: '/lfss',
    element: withSuspense(ComingSoon),
  },
  {
    path: '/art-showcase',
    element: withSuspense(ComingSoon),
  },
  {
    path: '/sponsorship',
    element: withSuspense(ComingSoon),
  },
  {
    path: '*',
    element: withSuspense(ComingSoon),
  },
])

export default function Routes() {
  return <RouterProvider router={router} />
}