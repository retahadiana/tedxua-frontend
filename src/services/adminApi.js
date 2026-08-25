// ============================================================================
// ADMIN API SERVICES — Service layer untuk semua endpoint admin
// ============================================================================
// STATUS: MOCK DATA — semua fungsi mengembalikan data dummy.
// TODO [INTEGRASI API]: Ganti isi setiap fungsi dengan panggilan apiRequest()
//       yang sesungguhnya. Struktur fungsi, nama, dan return type sudah
//       mengikuti kontrak API backend (lihat referensi-data-model-api-admin.md).
//
// Konvensi:
//   - Setiap fungsi async mengembalikan response envelope { status, message, data }
//   - Price selalu string format desimal 2 digit ("150000.00")
//   - ID menggunakan UUID string
// ============================================================================

import { apiRequest } from './api';

// ── Delay helper untuk simulasi network latency ─────────────────────────────
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BUNDLE SERVICE
// Endpoint: /api/v1/bundles
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const MOCK_BUNDLES = [
  {
    id: 'b1a2c3d4-e5f6-7890-abcd-ef1234567890',
    name: 'Bundle Starter',
    description: 'Paket starter untuk pengalaman TEDx kamu. Termasuk sticker sheet, pin button, dan keychain.',
    price: '95000.00',
    is_active: true,
    created_at: '2026-07-01T10:00:00Z',
    updated_at: '2026-07-15T14:30:00Z',
    images: [
      { id: 'img-b1-1', image_url: 'https://placehold.co/400x400/1a1a2e/e94560?text=Bundle+1A' },
      { id: 'img-b1-2', image_url: 'https://placehold.co/400x400/16213e/e94560?text=Bundle+1B' },
    ],
  },
  {
    id: 'b2a3c4d5-e6f7-8901-abcd-ef2345678901',
    name: 'Bundle Premium',
    description: 'Paket premium lengkap: kaos eksklusif, topi, foldable bag, dan semua item di Bundle Starter.',
    price: '250000.00',
    is_active: true,
    created_at: '2026-07-05T09:00:00Z',
    updated_at: '2026-07-20T11:00:00Z',
    images: [
      { id: 'img-b2-1', image_url: 'https://placehold.co/400x400/0f3460/e94560?text=Bundle+2A' },
    ],
  },
  {
    id: 'b3a4c5d6-e7f8-9012-abcd-ef3456789012',
    name: 'Bundle VIP Experience',
    description: 'Paket eksklusif VIP: semua item premium + cardholder + akses meet & greet speaker.',
    price: '450000.00',
    is_active: false,
    created_at: '2026-07-10T08:00:00Z',
    updated_at: '2026-08-01T16:00:00Z',
    images: [],
  },
];

export const bundleService = {
  // GET /bundles — List semua bundle (array polos, tanpa pagination)
  getAll: async () => {
    await delay(400);
    // TODO [INTEGRASI API]: return await apiRequest('/bundles');
    return { status: true, message: 'success', data: [...MOCK_BUNDLES] };
  },

  // GET /bundles/:id — Detail bundle + gambar
  getById: async (id) => {
    await delay(300);
    // TODO [INTEGRASI API]: return await apiRequest(`/bundles/${id}`);
    const bundle = MOCK_BUNDLES.find(b => b.id === id);
    if (!bundle) throw new Error('Bundle tidak ditemukan');
    return { status: true, message: 'success', data: { ...bundle } };
  },

  // POST /bundles — Buat bundle baru
  // body: { name, description, price }
  create: async (data) => {
    await delay(600);
    // TODO [INTEGRASI API]: return await apiRequest('/bundles', { method: 'POST', body: JSON.stringify(data) });
    const newBundle = {
      id: 'b-new-' + Date.now(),
      ...data,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      images: [],
    };
    MOCK_BUNDLES.push(newBundle);
    return { status: true, message: 'Bundle berhasil dibuat', data: newBundle };
  },

  // PATCH /bundles/:id — Update bundle (partial)
  // body: { name?, description?, price?, is_active? }
  update: async (id, data) => {
    await delay(500);
    // TODO [INTEGRASI API]: return await apiRequest(`/bundles/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    const idx = MOCK_BUNDLES.findIndex(b => b.id === id);
    if (idx === -1) throw new Error('Bundle tidak ditemukan');
    MOCK_BUNDLES[idx] = { ...MOCK_BUNDLES[idx], ...data, updated_at: new Date().toISOString() };
    return { status: true, message: 'Bundle berhasil diupdate', data: MOCK_BUNDLES[idx] };
  },

  // DELETE /bundles/:id — Hapus bundle (gambar ikut terhapus)
  delete: async (id) => {
    await delay(400);
    // TODO [INTEGRASI API]: return await apiRequest(`/bundles/${id}`, { method: 'DELETE' });
    const idx = MOCK_BUNDLES.findIndex(b => b.id === id);
    if (idx === -1) throw new Error('Bundle tidak ditemukan');
    MOCK_BUNDLES.splice(idx, 1);
    return { status: true, message: 'Bundle berhasil dihapus', data: null };
  },

  // POST /bundles/:id/images — Tambah gambar
  // body: { image_url }
  addImage: async (bundleId, imageUrl) => {
    await delay(400);
    // TODO [INTEGRASI API]: return await apiRequest(`/bundles/${bundleId}/images`, { method: 'POST', body: JSON.stringify({ image_url: imageUrl }) });
    const bundle = MOCK_BUNDLES.find(b => b.id === bundleId);
    if (!bundle) throw new Error('Bundle tidak ditemukan');
    const newImage = { id: 'img-' + Date.now(), image_url: imageUrl };
    bundle.images.push(newImage);
    return { status: true, message: 'Gambar berhasil ditambahkan', data: newImage };
  },

  // DELETE /bundles/:id/images/:imageId — Hapus gambar
  deleteImage: async (bundleId, imageId) => {
    await delay(300);
    // TODO [INTEGRASI API]: return await apiRequest(`/bundles/${bundleId}/images/${imageId}`, { method: 'DELETE' });
    const bundle = MOCK_BUNDLES.find(b => b.id === bundleId);
    if (!bundle) throw new Error('Bundle tidak ditemukan');
    bundle.images = bundle.images.filter(img => img.id !== imageId);
    return { status: true, message: 'Gambar berhasil dihapus', data: null };
  },
};


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MERCHANDISE ADMIN SERVICE
// Endpoint: /api/v1/merchandise
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const MOCK_MERCHANDISE = [
  {
    id: 'm1a2c3d4-e5f6-7890-abcd-ef1234567890',
    name: 'Kaos Mycelium Network',
    description: 'Kaos eksklusif TEDx Universitas Airlangga 2026 dengan desain jaringan mycelium.',
    price: '85000.00',
    category: 't-shirt',
    is_active: true,
    created_at: '2026-06-15T10:00:00Z',
    updated_at: '2026-07-01T14:30:00Z',
    images: [
      { id: 'img-m1-1', image_url: 'https://placehold.co/400x400/2d3436/dfe6e9?text=Kaos+Front' },
      { id: 'img-m1-2', image_url: 'https://placehold.co/400x400/2d3436/74b9ff?text=Kaos+Back' },
    ],
  },
  {
    id: 'm2a3c4d5-e6f7-8901-abcd-ef2345678901',
    name: 'Topi TEDx Mylo',
    description: 'Topi baseball dengan bordir logo TEDx dan maskot Mylo di samping.',
    price: '60000.00',
    category: 'cap',
    is_active: true,
    created_at: '2026-06-20T09:00:00Z',
    updated_at: '2026-07-10T11:00:00Z',
    images: [
      { id: 'img-m2-1', image_url: 'https://placehold.co/400x400/636e72/dfe6e9?text=Topi' },
    ],
  },
  {
    id: 'm3a4c5d6-e7f8-9012-abcd-ef3456789012',
    name: 'Sticker Sheet Mycelium',
    description: 'Set sticker vinyl doff, kiss-cut, waterproof. 7 desain dalam 1 lembar A6.',
    price: '10000.00',
    category: 'sticker',
    is_active: true,
    created_at: '2026-06-25T08:00:00Z',
    updated_at: '2026-07-05T16:00:00Z',
    images: [
      { id: 'img-m3-1', image_url: 'https://placehold.co/400x400/00b894/dfe6e9?text=Sticker' },
    ],
  },
  {
    id: 'm4a5c6d7-e8f9-0123-abcd-ef4567890123',
    name: 'Cardholder Lightning Root',
    description: 'Card holder synthetic leather dengan desain Mylo saat lightning meets root.',
    price: '50000.00',
    category: 'other',
    is_active: false,
    created_at: '2026-07-01T10:00:00Z',
    updated_at: '2026-08-01T12:00:00Z',
    images: [],
  },
  {
    id: 'm5a6c7d8-e9f0-1234-abcd-ef5678901234',
    name: 'Keychain Sprout',
    description: 'Gantungan kunci acrylic dengan desain tunas jamur.',
    price: '35000.00',
    category: 'other',
    is_active: true,
    created_at: '2026-07-05T09:00:00Z',
    updated_at: '2026-07-20T10:00:00Z',
    images: [
      { id: 'img-m5-1', image_url: 'https://placehold.co/400x400/6c5ce7/dfe6e9?text=Keychain' },
    ],
  },
];

export const merchandiseAdminService = {
  // GET /merchandise — List semua (array polos), query: is_active, category
  getAll: async (params = {}) => {
    await delay(400);
    // TODO [INTEGRASI API]: const query = new URLSearchParams(params).toString();
    //                       return await apiRequest(`/merchandise?${query}`);
    let items = [...MOCK_MERCHANDISE];
    if (params.category) items = items.filter(m => m.category === params.category);
    if (params.is_active !== undefined) items = items.filter(m => m.is_active === params.is_active);
    return { status: true, message: 'success', data: items };
  },

  // GET /merchandise/:id — Detail + gambar
  getById: async (id) => {
    await delay(300);
    // TODO [INTEGRASI API]: return await apiRequest(`/merchandise/${id}`);
    const item = MOCK_MERCHANDISE.find(m => m.id === id);
    if (!item) throw new Error('Merchandise tidak ditemukan');
    return { status: true, message: 'success', data: { ...item } };
  },

  // POST /merchandise — Buat merch baru
  // body: { name, description, price, category }
  create: async (data) => {
    await delay(600);
    // TODO [INTEGRASI API]: return await apiRequest('/merchandise', { method: 'POST', body: JSON.stringify(data) });
    const newItem = {
      id: 'm-new-' + Date.now(),
      ...data,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      images: [],
    };
    MOCK_MERCHANDISE.push(newItem);
    return { status: true, message: 'Merchandise berhasil dibuat', data: newItem };
  },

  // PATCH /merchandise/:id — Update merch (partial)
  // body: { name?, description?, price?, category?, is_active? }
  update: async (id, data) => {
    await delay(500);
    // TODO [INTEGRASI API]: return await apiRequest(`/merchandise/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    const idx = MOCK_MERCHANDISE.findIndex(m => m.id === id);
    if (idx === -1) throw new Error('Merchandise tidak ditemukan');
    MOCK_MERCHANDISE[idx] = { ...MOCK_MERCHANDISE[idx], ...data, updated_at: new Date().toISOString() };
    return { status: true, message: 'Merchandise berhasil diupdate', data: MOCK_MERCHANDISE[idx] };
  },

  // DELETE /merchandise/:id — Hapus merch
  delete: async (id) => {
    await delay(400);
    // TODO [INTEGRASI API]: return await apiRequest(`/merchandise/${id}`, { method: 'DELETE' });
    const idx = MOCK_MERCHANDISE.findIndex(m => m.id === id);
    if (idx === -1) throw new Error('Merchandise tidak ditemukan');
    MOCK_MERCHANDISE.splice(idx, 1);
    return { status: true, message: 'Merchandise berhasil dihapus', data: null };
  },

  // POST /merchandise/:id/images — Tambah gambar
  addImage: async (merchId, imageUrl) => {
    await delay(400);
    // TODO [INTEGRASI API]: return await apiRequest(`/merchandise/${merchId}/images`, { method: 'POST', body: JSON.stringify({ image_url: imageUrl }) });
    const item = MOCK_MERCHANDISE.find(m => m.id === merchId);
    if (!item) throw new Error('Merchandise tidak ditemukan');
    const newImage = { id: 'img-' + Date.now(), image_url: imageUrl };
    item.images.push(newImage);
    return { status: true, message: 'Gambar berhasil ditambahkan', data: newImage };
  },

  // DELETE /merchandise/:id/images/:imageId — Hapus gambar
  deleteImage: async (merchId, imageId) => {
    await delay(300);
    // TODO [INTEGRASI API]: return await apiRequest(`/merchandise/${merchId}/images/${imageId}`, { method: 'DELETE' });
    const item = MOCK_MERCHANDISE.find(m => m.id === merchId);
    if (!item) throw new Error('Merchandise tidak ditemukan');
    item.images = item.images.filter(img => img.id !== imageId);
    return { status: true, message: 'Gambar berhasil dihapus', data: null };
  },
};


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// USER SERVICE
// Endpoint: /api/v1/users — Semua endpoint wajib Bearer admin
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const MOCK_USERS = Array.from({ length: 47 }, (_, i) => ({
  id: `u-${String(i + 1).padStart(3, '0')}`,
  name: [
    'Ahmad Fauzi', 'Siti Nurhaliza', 'Budi Santoso', 'Dewi Lestari',
    'Rizky Pratama', 'Anisa Rahman', 'Dimas Saputra', 'Putri Wulandari',
    'Fajar Nugroho', 'Lila Kusuma', 'Reza Mahendra', 'Nadia Safitri',
    'Yoga Permana', 'Intan Maharani', 'Bagus Kurniawan', 'Maya Anggraeni',
  ][i % 16] + (i >= 16 ? ` ${Math.floor(i / 16) + 1}` : ''),
  email: `user${i + 1}@example.com`,
  telp_number: `08${String(1200000000 + i * 11111).slice(0, 10)}`,
  role: i < 2 ? 'admin' : 'user',
  image_url: '',
  is_verified: i % 5 !== 0, // setiap user ke-5 belum verified (untuk variasi)
}));

export const userService = {
  // GET /users — List user ber-paginasi
  // query: search, role, page (default 1), per_page (default 10)
  getAll: async (params = {}) => {
    await delay(500);
    // TODO [INTEGRASI API]: const query = new URLSearchParams(params).toString();
    //                       return await apiRequest(`/users?${query}`);
    const { search = '', role = '', page = 1, per_page = 10 } = params;
    let filtered = [...MOCK_USERS];

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(u =>
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      );
    }
    if (role) {
      filtered = filtered.filter(u => u.role === role);
    }

    const total = filtered.length;
    const max_page = Math.max(1, Math.ceil(total / per_page));
    const start = (page - 1) * per_page;
    const paged = filtered.slice(start, start + per_page);

    return {
      status: true,
      message: 'success',
      data: {
        data: paged,
        meta: { page: Number(page), per_page: Number(per_page), max_page, total },
      },
    };
  },

  // GET /users/:id — Detail user
  getById: async (id) => {
    await delay(300);
    // TODO [INTEGRASI API]: return await apiRequest(`/users/${id}`);
    const user = MOCK_USERS.find(u => u.id === id);
    if (!user) throw new Error('User tidak ditemukan');
    return { status: true, message: 'success', data: { ...user } };
  },

  // PATCH /users/:id — Update user
  // body: { name?, email?, telp_number?, role? }
  update: async (id, data) => {
    await delay(500);
    // TODO [INTEGRASI API]: return await apiRequest(`/users/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    const idx = MOCK_USERS.findIndex(u => u.id === id);
    if (idx === -1) throw new Error('User tidak ditemukan');
    MOCK_USERS[idx] = { ...MOCK_USERS[idx], ...data };
    return { status: true, message: 'User berhasil diupdate', data: MOCK_USERS[idx] };
  },

  // DELETE /users/:id — Hapus user
  delete: async (id) => {
    await delay(400);
    // TODO [INTEGRASI API]: return await apiRequest(`/users/${id}`, { method: 'DELETE' });
    const idx = MOCK_USERS.findIndex(u => u.id === id);
    if (idx === -1) throw new Error('User tidak ditemukan');
    MOCK_USERS.splice(idx, 1);
    return { status: true, message: 'User berhasil dihapus', data: null };
  },
};
