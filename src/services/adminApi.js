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
export const categoryService = {
  getAll: async () => {
    return await apiRequest('/categories');
  },
  getById: async (id) => {
    return await apiRequest(`/categories/${id}`);
  },
  create: async (name) => {
    return await apiRequest('/categories', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  },
  update: async (id, name) => {
    return await apiRequest(`/categories/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ name }),
    });
  },
  delete: async (id) => {
    return await apiRequest(`/categories/${id}`, {
      method: 'DELETE',
    });
  },
};

export const MERCH_CATEGORIES = ['t-shirt', 'cap', 'sticker', 'other'];

export const merchandiseAdminService = {
  getCategories: async () => {
    return await categoryService.getAll();
  },

  // GET /merchandise — List semua merchandise
  // Query opsional: ?category=t-shirt&is_active=true
  getAll: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.category_id) query.set('category_id', params.category_id);
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TICKET SERVICE
// Endpoint: /api/v1/tickets
// GET semua & detail: public (tanpa auth)
// POST / PATCH / DELETE (ticket & tier): wajib Bearer admin
//
// Model: Ticket = jenis tiket (mis. "TEDx Main Event") berisi name, description,
// is_active, dan daftar TicketTier (tiers[]) di dalamnya.
// TicketTier = tier harga di bawah satu Ticket (mis. VIP/Reguler) berisi
// tier, price, quota, quota_filled, quota_held, quota_left, sale_start,
// sale_end, is_active. Tier dibuat/diubah/dihapus lewat sub-endpoint
// /tickets/:ticketId/tiers.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ticketService = {
  // GET /tickets — List semua ticket beserta tiers-nya
  // Query opsional: ?is_active=true|false
  getAll: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.is_active !== undefined) query.set('is_active', params.is_active);
    const qs = query.toString();
    return await apiRequest(`/tickets${qs ? `?${qs}` : ''}`);
  },

  // GET /tickets/:id — Detail ticket beserta tiers-nya
  getById: async (id) => {
    return await apiRequest(`/tickets/${id}`);
  },

  // POST /tickets — Buat ticket baru (Admin)
  // body: { name, description }
  create: async (data) => {
    return await apiRequest('/tickets', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // PATCH /tickets/:id — Update ticket sebagian (Admin)
  // body: { name?, description?, is_active? }
  update: async (id, data) => {
    return await apiRequest(`/tickets/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  // DELETE /tickets/:id — Hapus ticket beserta seluruh tier-nya (Admin)
  delete: async (id) => {
    return await apiRequest(`/tickets/${id}`, {
      method: 'DELETE',
    });
  },

  // POST /tickets/:ticketId/tiers — Tambah tier baru ke ticket (Admin)
  // body: { tier, price, quota, sale_start?, sale_end? }
  // Catatan: price dikirim sebagai string desimal (contoh: "150000.00")
  createTier: async (ticketId, data) => {
    return await apiRequest(`/tickets/${ticketId}/tiers`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // PATCH /tickets/:ticketId/tiers/:tierId — Update tier sebagian (Admin)
  // body: { tier?, price?, quota?, sale_start?, sale_end?, is_active? }
  updateTier: async (ticketId, tierId, data) => {
    return await apiRequest(`/tickets/${ticketId}/tiers/${tierId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  // DELETE /tickets/:ticketId/tiers/:tierId — Hapus satu tier (Admin)
  deleteTier: async (ticketId, tierId) => {
    return await apiRequest(`/tickets/${ticketId}/tiers/${tierId}`, {
      method: 'DELETE',
    });
  },
};


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
