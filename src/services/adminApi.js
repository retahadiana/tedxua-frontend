// ============================================================================
// ADMIN API SERVICES — Service layer untuk semua endpoint admin
// ============================================================================
// Semua fungsi terhubung ke backend Go (Gin) via apiRequest().
// apiRequest() otomatis mengirimkan Bearer token dari localStorage jika ada.
//
// Base URL: VITE_API_URL (default: http://localhost:8888/api/v1)
//
// Konvensi response envelope dari backend:
//   { status: bool, message: string, data: any }
//
// Konvensi:
//   - Price selalu string format desimal 2 digit (contoh: "150000.00")
//   - ID menggunakan UUID string
// ============================================================================

import { apiRequest } from './api';


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BUNDLE SERVICE
// Endpoint: /api/v1/bundles
// GET semua & detail: public (tanpa auth)
// POST / PATCH / DELETE: wajib Bearer admin
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const bundleService = {
  // GET /bundles — List semua bundle (array, tanpa pagination)
  // Query opsional: ?is_active=true|false
  getAll: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.is_active !== undefined) query.set('is_active', params.is_active);
    const qs = query.toString();
    return await apiRequest(`/bundles${qs ? `?${qs}` : ''}`);
  },

  // GET /bundles/:id — Detail bundle beserta list gambar
  getById: async (id) => {
    return await apiRequest(`/bundles/${id}`);
  },

  // POST /bundles — Buat bundle baru (Admin)
  // body: { name, description, price }
  create: async (data) => {
    return await apiRequest('/bundles', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // PATCH /bundles/:id — Update bundle sebagian (Admin)
  // body: { name?, description?, price?, is_active? }
  update: async (id, data) => {
    return await apiRequest(`/bundles/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  // DELETE /bundles/:id — Hapus bundle beserta semua gambarnya (Admin)
  delete: async (id) => {
    return await apiRequest(`/bundles/${id}`, {
      method: 'DELETE',
    });
  },

  // POST /bundles/:id/images — Tambah gambar ke bundle (Admin)
  // body: { image_url }
  addImage: async (bundleId, imageUrl) => {
    return await apiRequest(`/bundles/${bundleId}/images`, {
      method: 'POST',
      body: JSON.stringify({ image_url: imageUrl }),
    });
  },

  // DELETE /bundles/:id/images/:imageId — Hapus satu gambar bundle (Admin)
  deleteImage: async (bundleId, imageId) => {
    return await apiRequest(`/bundles/${bundleId}/images/${imageId}`, {
      method: 'DELETE',
    });
  },
};


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MERCHANDISE ADMIN SERVICE
// Endpoint: /api/v1/merchandise
// GET semua & detail: public (tanpa auth)
// POST / PATCH / DELETE: wajib Bearer admin
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Daftar kategori valid — harus sinkron dengan konstanta di backend (pkg/constants/common.go)
export const MERCH_CATEGORIES = ['t-shirt', 'cap', 'sticker', 'other'];

export const merchandiseAdminService = {
  // getCategories — mengembalikan daftar kategori valid (sesuai konstanta backend)
  // Tidak memerlukan API call karena kategori dikelola di konstanta backend.
  getCategories: async () => {
    return { status: true, message: 'success', data: MERCH_CATEGORIES };
  },

  // GET /merchandise — List semua merchandise
  // Query opsional: ?category=t-shirt&is_active=true
  getAll: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.category) query.set('category', params.category);
    if (params.is_active !== undefined) query.set('is_active', params.is_active);
    const qs = query.toString();
    return await apiRequest(`/merchandise${qs ? `?${qs}` : ''}`);
  },

  // GET /merchandise/:id — Detail merchandise beserta list gambar
  getById: async (id) => {
    return await apiRequest(`/merchandise/${id}`);
  },

  // POST /merchandise — Buat merchandise baru (Admin)
  // body: { name, description, price, category }
  create: async (data) => {
    return await apiRequest('/merchandise', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // PATCH /merchandise/:id — Update merchandise sebagian (Admin)
  // body: { name?, description?, price?, category?, is_active? }
  update: async (id, data) => {
    return await apiRequest(`/merchandise/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  // DELETE /merchandise/:id — Hapus merchandise beserta semua gambarnya (Admin)
  delete: async (id) => {
    return await apiRequest(`/merchandise/${id}`, {
      method: 'DELETE',
    });
  },

  // POST /merchandise/:id/images — Tambah gambar ke merchandise (Admin)
  // body: { image_url }
  addImage: async (merchId, imageUrl) => {
    return await apiRequest(`/merchandise/${merchId}/images`, {
      method: 'POST',
      body: JSON.stringify({ image_url: imageUrl }),
    });
  },

  // DELETE /merchandise/:id/images/:imageId — Hapus satu gambar merchandise (Admin)
  deleteImage: async (merchId, imageId) => {
    return await apiRequest(`/merchandise/${merchId}/images/${imageId}`, {
      method: 'DELETE',
    });
  },
};


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// USER SERVICE
// Endpoint: /api/v1/users — Semua endpoint wajib Bearer admin
// Response getAll: UserPaginationResponse { data: UserResponse[], meta: PaginationMeta }
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const userService = {
  // GET /users — List user dengan server-side pagination
  // Query: search?, role?, page? (default 1), per_page? (default 10)
  // Response: { data: { data: User[], meta: { page, per_page, max_page, total } } }
  getAll: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.set('search', params.search);
    if (params.role) query.set('role', params.role);
    if (params.page) query.set('page', params.page);
    if (params.per_page) query.set('per_page', params.per_page);
    const qs = query.toString();
    return await apiRequest(`/users${qs ? `?${qs}` : ''}`);
  },

  // GET /users/:id — Detail satu user
  getById: async (id) => {
    return await apiRequest(`/users/${id}`);
  },

  // PATCH /users/:id — Update data user (Admin)
  // body: { name?, email?, telp_number?, role? }
  // Catatan: hanya kirim field yang memang diisi (tidak kirim string kosong)
  update: async (id, data) => {
    // Bersihkan field kosong agar tidak menimpa data existing di backend
    const payload = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== '' && v !== null && v !== undefined)
    );
    return await apiRequest(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },

  // DELETE /users/:id — Hapus user secara permanen (Admin)
  delete: async (id) => {
    return await apiRequest(`/users/${id}`, {
      method: 'DELETE',
    });
  },
};
