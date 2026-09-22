import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

// ============================================================================
// USE AUTH HOOK — Consumer hook for AuthContext
// ============================================================================
// Penggunaan: const { user, role, isAuthenticated, logout } = useAuth()
// ============================================================================

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus digunakan di dalam <AuthProvider>');
  }
  return context;
}

export default useAuth;
