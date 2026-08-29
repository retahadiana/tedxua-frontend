import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

// ============================================================================
// ADMIN ROUTE GUARD — Protects /admin/* routes
// ============================================================================
// Redirect ke /admin/login jika:
//   1. Belum login (no token)
//   2. Bukan role admin
// ============================================================================

export default function AdminRoute() {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900" />
          <p className="text-sm text-gray-500 font-medium">Memverifikasi akses...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
