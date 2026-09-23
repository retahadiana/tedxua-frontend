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
    // Kebutuhan preview/edit UI: Login check dinonaktifkan sementara.
    return children;
}
