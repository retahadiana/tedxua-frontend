import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { TOKEN_KEY } from '../services/api';

// ============================================================================
// USE AUTH HOOK — Consumer hook untuk AuthContext (develop) +
//                 kompatibilitas dengan ticket flow (adella)
// ============================================================================
// Penggunaan Admin Panel : const { user, role, isAuthenticated, isLoading, logout } = useAuth()
// Penggunaan Ticket Flow : const { isLoggedIn, token } = useAuth()
// ============================================================================

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus digunakan di dalam <AuthProvider>');
  }

  // Tambahkan alias isLoggedIn & token untuk kompatibilitas ticket flow (adella)
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    ...context,
    isLoggedIn: context.isAuthenticated,
    token,
  };
}

export default useAuth;
