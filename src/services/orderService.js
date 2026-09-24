/**
 * ── ORDER SERVICE ──
 * Mengelola semua request yang berkaitan dengan Order (transaksi tiket).
 *
 * Endpoint (auth required):
 *   POST  /api/v1/orders               — Buat order baru (hold kuota 15 menit)
 *   POST  /api/v1/orders/:id/cancel     — Batalkan order awaiting milik sendiri (lepas hold)
 *   GET   /api/v1/orders               — List order milik user (paginasi)
 *   GET   /api/v1/orders/:id           — Detail order milik user
 *   PATCH /api/v1/orders/:id/proof     — Upload bukti pembayaran (multipart/form-data)
 */
import api from './api';

/**
 * Buat order baru. Backend akan melakukan hold quota selama 15 menit.
 * @param {Object} payload
 * @param {string} payload.ticket_tier_id — UUID tier yang dipilih
 * @param {number} payload.quantity       — Jumlah tiket (1–5)
 * @param {Array}  [payload.attendees]    — Data peserta (opsional; jika diisi harus len == quantity)
 *                                          Tiap elemen: { name, email, phone, audience_type }
 * @param {string} [payload.buyer_name]     — Nama dari form IdentifyStepper (koreksi nama akun)
 * @param {string} [payload.buyer_email]    — Email dari form IdentifyStepper (tujuan e-ticket)
 * @param {string} [payload.buyer_phone]    — No. HP dari form IdentifyStepper (simpan bila kosong)
 * @returns {Promise<Object>} Data order: { id, order_number, total_amount, expired_at, status, ... }
 */
export async function createOrder({ ticket_tier_id, quantity, attendees, buyer_name, buyer_email, buyer_phone }) {
    const body = { ticket_tier_id, quantity };
    if (attendees && attendees.length > 0) {
        body.attendees = attendees;
    }
    if (buyer_name) {
        body.buyer_name = buyer_name;
    }
    if (buyer_email) {
        body.buyer_email = buyer_email;
    }
    if (buyer_phone) {
        body.buyer_phone = buyer_phone;
    }
    const response = await api.post('/orders', body);
    return response.data.data;
}

/**
 * Batalkan order awaiting milik sendiri (lepas hold kuota).
 * Dipakai saat ganti qty/tier agar tidak menumpuk order.
 * @param {string} orderId — UUID order
 * @returns {Promise<Object>} Data order yang dibatalkan
 */
export async function cancelOrder(orderId) {
    const response = await api.post(`/orders/${orderId}/cancel`);
    return response.data.data;
}

/**
 * Upload bukti pembayaran.
 * @param {string} orderId — UUID order
 * @param {File}   file    — File gambar (jpg/jpeg/png/webp, max 5MB)
 * @returns {Promise<Object>} Data order yang sudah updated dengan payment_proof_url
 */
export async function uploadPaymentProof(orderId, file) {
    const formData = new FormData();
    formData.append('file', file);

    // Set Content-Type: undefined agar axios hapus default 'application/json' dari instance.
    // Browser/axios akan otomatis set 'multipart/form-data; boundary=...' yang benar.
    const response = await api.patch(`/orders/${orderId}/proof`, formData, {
        headers: { 'Content-Type': undefined },
    });
    return response.data.data;
}

/**
 * Ambil list order milik user yang sedang login (paginasi).
 * @param {number} [page=1]      — Nomor halaman
 * @param {number} [perPage=10]  — Jumlah per halaman
 * @returns {Promise<{data: Array, meta: Object}>}
 */
export async function getUserOrders(page = 1, perPage = 10) {
    const response = await api.get('/orders', { params: { page, per_page: perPage } });
    return response.data; // { data: [...], meta: { page, per_page, max_page, total } }
}

/**
 * Ambil detail satu order milik user.
 * @param {string} orderId — UUID order
 * @returns {Promise<Object>} Data order lengkap
 */
export async function getOrderById(orderId) {
    const response = await api.get(`/orders/${orderId}`);
    return response.data.data;
}

/**
 * Hitung sisa waktu (detik) hingga expired_at.
 * @param {string} expiredAt — ISO8601 datetime string
 * @returns {number} Sisa detik (minimal 0)
 */
export function getSecondsUntilExpiry(expiredAt) {
    const diff = Math.floor((new Date(expiredAt).getTime() - Date.now()) / 1000);
    return Math.max(0, diff);
}

/**
 * Format detik menjadi string "MM:SS".
 * @param {number} totalSeconds
 * @returns {string} e.g. "14:32"
 */
export function formatCountdown(totalSeconds) {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}
