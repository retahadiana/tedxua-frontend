import React, { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Navbar, Footer } from '@/components/layout'
import { OrderProvider } from './context/OrderContext'

// ── Ticket Flow Imports (adella) ─────────────────────────────────────────────
import TierSelection from './features/tickets/components/TierSelection'
import IdentifyStepper from './features/tickets/components/IdentifyStepper'
import QRISManualPayment from './features/tickets/components/QRISManualPayment'
import SuccessVerification from './features/tickets/components/SuccessVerification'
import SupportInformation from './features/tickets/components/SupportInformation'
import PrivacyPolicy from './features/tickets/components/PrivacyPolicy'
import TermsOfService from './features/tickets/components/TermsOfService'
import ProtectedRoute from './components/common/ProtectedRoute'

// ── Admin Panel Imports (develop) ────────────────────────────────────────────
import {
  AdminRoute,
  AdminLayout,
  DashboardPage,
  BundleListPage,
  BundleFormPage,
  TicketListPage,
  TicketFormPage,
  MerchListPage,
  MerchFormPage,
  CategoryListPage,
  UserListPage,
  UserDetailPage,
  PaymentApprovalPage,
  ToastProvider,
} from './features/admin'

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
const PreEventTwo = lazyNamed(() => import('./features/events'), 'PreEventTwo')

const LfssPage = lazyNamed(() => import('./features/lfss'), 'LfssPage')

const AboutUsDetail = lazy(() => import('./features/static/components/AboutUsDetail'))
const ThemePage = lazy(() => import('./features/static/components/ThemePage'))
const SubthemePage = lazy(() => import('./features/static/components/SubthemePage'))

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
    path: '/lfss',
    element: withSuspense(LfssPage),
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
    element: withSuspense(PreEventTwo),
  },
  {
    path: '/events/pre-event-3',
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
    element: withSuspense(PreEventTwo),
  },
  {
    path: '/pre-event-3',
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
    path: '/art-showcase',
    element: withSuspense(ComingSoon),
  },
  {
    path: '/sponsorship',
    element: withSuspense(ComingSoon),
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
          { path: 'tickets', element: <TicketListPage /> },
          { path: 'tickets/create', element: <TicketFormPage /> },
          { path: 'tickets/:id/edit', element: <TicketFormPage /> },
          { path: 'merchandise', element: <MerchListPage /> },
          { path: 'merchandise/create', element: <MerchFormPage /> },
          { path: 'merchandise/:id/edit', element: <MerchFormPage /> },
          { path: 'merchandise/categories', element: <CategoryListPage /> },
          { path: 'payments', element: <PaymentApprovalPage /> },
          { path: 'users', element: <UserListPage /> },
          { path: 'users/:id', element: <UserDetailPage /> },
        ],
      },
    ],
  },

  {
    path: '*',
    element: withSuspense(ComingSoon),
  },
  {
    path: '/tickets',
    element: (
      <div className="w-full bg-black text-white">
        <Navbar />
        <TierSelection />
        <Footer />
      </div>
    ),
  },
  {
    path: '/tickets/identity',
    element: (
      <ProtectedRoute>
        <IdentifyStepper />
      </ProtectedRoute>
    ),
  },
  {
    path: '/tickets/payment',
    element: (
      <ProtectedRoute>
        <QRISManualPayment />
      </ProtectedRoute>
    ),
  },
  {
    path: '/tickets/confirmation',
    element: (
      <ProtectedRoute>
        <SuccessVerification />
      </ProtectedRoute>
    ),
  },
  {
    path: '/tickets/verification',
    element: (
      <ProtectedRoute>
        <SuccessVerification />
      </ProtectedRoute>
    ),
  },
  {
    path: '/tickets/support',
    element: <SupportInformation />,
  },
  {
    path: '/tickets/support-information',
    element: <SupportInformation />,
  },
  {
    path: '/tickets/privacy-policy',
    element: <PrivacyPolicy />,
  },
  {
    path: '/tickets/privacy',
    element: <PrivacyPolicy />,
  },
  {
    path: '/tickets/terms-of-service',
    element: <TermsOfService />,
  },
  {
    path: '/tickets/terms',
    element: <TermsOfService />,
  },
])

export default function Routes() {
  return (
    <OrderProvider>
      <RouterProvider router={router} />
    </OrderProvider>
  );
}
