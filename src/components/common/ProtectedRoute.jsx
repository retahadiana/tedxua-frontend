/**
 * ── ProtectedRoute ──
 * Wrapper component yang memastikan user sudah login sebelum
 * mengakses halaman tertentu.
 *
 * Jika belum login → redirect ke /sign-in dengan menyimpan
 * URL asal di state `from`, sehingga setelah login bisa kembali
 * ke halaman semula secara otomatis.
 */
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * @param {{ children: React.ReactNode }} props
 */
export default function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="flex min-h-screen w-full items-center justify-center bg-[#1A100B]">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }

    return children;
}
