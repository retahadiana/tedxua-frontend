import TierSelection from './features/tickets/components/TierSelection';
import IdentifyStepper from './features/tickets/components/IdentifyStepper';
import QRISManualPayment from './features/tickets/components/QRISManualPayment';
import SuccessVerification from './features/tickets/components/SuccessVerification';
import SupportInformation from './features/tickets/components/SupportInformation';
import PrivacyPolicy from './features/tickets/components/PrivacyPolicy';
import TermsOfService from './features/tickets/components/TermsOfService';
import ProtectedRoute from './components/common/ProtectedRoute';
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Navbar, Footer } from '@/components/layout'
import { LandingPage } from '@/features/landing'
import { ComingSoon, PreEventOne } from './features/events'
import { OrderProvider } from './context/OrderContext'

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
    path: '/coming-soon',
    element: <ComingSoon />,
  },
  {
    path: '/pre-event-1',
    element: <PreEventOne />,
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