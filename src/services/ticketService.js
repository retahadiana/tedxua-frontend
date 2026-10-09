/**
 * ── TICKET SERVICE ──
 * Mengelola semua request yang berkaitan dengan Ticket & Tier.
 *
 * Endpoint (public, no auth required):
 *   GET /api/v1/tickets           — Daftar tiket (default hanya is_active: true)
 *   GET /api/v1/tickets/:id       — Detail tiket + tier
 */
import api from './api';

/**
 * Ambil daftar tiket beserta tier-nya.
 * @param {boolean} [isActive=true] — Filter tiket aktif/non-aktif
 * @returns {Promise<Array>} Array tiket + tiers
 */
export async function getTickets(isActive = true) {
    const params = {};
    if (isActive !== undefined) params.is_active = isActive;

    const response = await api.get('/tickets', { params });
    // Response: { status: true, message: "...", data: [...] }
    return response.data.data;
}

/**
 * Ambil detail satu tiket beserta tier-nya.
 * @param {string} ticketId — UUID tiket
 * @returns {Promise<Object>} Objek tiket + tiers
 */
export async function getTicketById(ticketId) {
    const response = await api.get(`/tickets/${ticketId}`);
    return response.data.data;
}

/**
 * Memformat harga dari string ke format Rupiah.
 * @param {string|number} price — Harga dalam format "150000.00" atau number
 * @returns {string} Format "Rp 150.000"
 */
export function formatPrice(price) {
    const num = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(num);
}

/**
 * Cek apakah tier sedang dalam periode penjualan aktif.
 * @param {Object} tier — Objek tier dari API
 * @returns {boolean}
 */
export function isTierOnSale(tier) {
    if (!tier.is_active) return false;
    const now = new Date();
    if (tier.sale_start && new Date(tier.sale_start) > now) return false;
    if (tier.sale_end && new Date(tier.sale_end) < now) return false;
    return true;
}
