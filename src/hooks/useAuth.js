/**
 * ── useAuth ──
 * Hook sederhana untuk mengecek apakah user sudah login
 * berdasarkan keberadaan token di localStorage.
 *
 * Token key: 'tedxua_token' (konsisten dengan api.js)
 */
import { TOKEN_KEY } from '../services/api';

/**
 * @returns {{ isLoggedIn: boolean, token: string|null }}
 */
export function useAuth() {
    const token = localStorage.getItem(TOKEN_KEY);
    return {
        isLoggedIn: Boolean(token),
        token,
    };
}

export default useAuth;
