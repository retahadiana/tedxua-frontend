import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getTokens, clearTokens, saveTokens } from '@/services/api';

// ============================================================================
// AUTH CONTEXT — Global authentication state provider
// ============================================================================
// STATUS: UI-only mock. Token reading from localStorage is real,
//         but no actual API validation happens here.
// TODO [INTEGRASI API]: Tambahkan validasi token ke backend saat mount,
//         dan implementasi auto-refresh sebelum token expired.
// ============================================================================

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    user: null,
    role: null,
    isAuthenticated: false,
    isLoading: true, // true saat pertama kali mount (cek token)
  });

  // Baca token dari localStorage saat mount
  const checkAuth = useCallback(() => {
    const { accessToken, role } = getTokens();
    if (accessToken && role) {
      setAuthState({
        user: {
          email: localStorage.getItem('userEmail') || '',
          name: localStorage.getItem('userName') || 'Admin',
        },
        role,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setAuthState({
        user: null,
        role: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  useEffect(() => {
    checkAuth();

    // Listen for auth changes (dispatched by useLogin and logout)
    const handleAuthChange = () => checkAuth();
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, [checkAuth]);

  const logout = useCallback(() => {
    // TODO [INTEGRASI API]: Panggil authService.logout() sebelum clearTokens
    clearTokens();
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setAuthState({
      user: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,
    });
    window.dispatchEvent(new Event('auth-change'));
  }, []);

  const value = {
    ...authState,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
