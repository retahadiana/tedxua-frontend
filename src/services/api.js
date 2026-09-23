/**
 * ── API CLIENT ──
 * Axios instance yang dikonfigurasi untuk TEDxUA Backend API.
 * Base URL: https://tedx-docs-api.vercel.app/api/v1
 *
 * Interceptors:
 *  - Request: otomatis menyisipkan Authorization: Bearer <token> dari localStorage
 *  - Response: menangani error terstruktur (400, 401, 404, 500)
 */
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://tedx-docs-api.vercel.app/api/v1';
const TOKEN_KEY = 'tedxua_token';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000,
});

// ── REQUEST INTERCEPTOR — Auto-inject Bearer Token ──
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ── RESPONSE INTERCEPTOR — Structured Error Handling ──
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message || 'Terjadi kesalahan.';

        if (status === 401) {
            // Token expired / unauthorized — hapus token dan redirect ke halaman login
            localStorage.removeItem(TOKEN_KEY);
        }

        // Lempar error dengan pesan yang sudah terstruktur
        const err = new Error(message);
        err.status = status;
        err.data = error.response?.data;
        return Promise.reject(err);
    }
);

export default api;
export { TOKEN_KEY, BASE_URL };
