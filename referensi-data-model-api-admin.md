# Referensi Data Model & Endpoint API — Admin Panel TEDx Unair

Base URL: `/api/v1` (dev default: `http://localhost:8888/api/v1`)
Semua response dibungkus envelope: `{ status, message, data, error, meta }`
Header wajib: `Content-Type: application/json`, dan `Authorization: Bearer <access_token>` untuk endpoint terproteksi.

---

## 1. Auth

| Method | Path | Auth | Body |
|---|---|---|---|
| POST | /auth/login | — | `{ email, password }` |
| POST | /auth/refresh | — | `{ refresh_token }` |
| POST | /auth/logout | Bearer | — |

Login response: `{ access_token, refresh_token, role }`
- Access token (JWT): berlaku **15 menit**, isi `user_id` + `role`
- Refresh token (opaque): berlaku **7 hari**, dirotasi tiap refresh

Role hanya 2: `user` dan `admin`. Role `user` yang akses endpoint admin → **403 Forbidden**.

---

## 2. Bundle

Base path: `/api/v1/bundles`

| Method | Path | Auth | Deskripsi |
|---|---|---|---|
| GET | `` | — | List bundle (array polos, tanpa pagination) |
| GET | /:id | — | Detail bundle + gambar |
| POST | `` | Bearer admin | Buat bundle |
| PATCH | /:id | Bearer admin | Update bundle (partial) |
| DELETE | /:id | Bearer admin | Hapus bundle (gambar ikut terhapus) |
| POST | /:id/images | Bearer admin | Tambah gambar |
| DELETE | /:id/images/:imageId | Bearer admin | Hapus gambar |

**Data model Bundle:**
```json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "price": "150000.00",
  "is_active": true,
  "created_at": "2026-07-01T10:00:00Z",
  "updated_at": "2026-07-01T10:00:00Z",
  "images": []
}
```

**Form Create (POST /bundles)** — semua wajib:
| Field | Tipe | Validasi |
|---|---|---|
| name | string | wajib |
| description | string | wajib |
| price | string | desimal, 0–99999999.99 |

**Form Edit (PATCH /bundles/:id)** — semua opsional:
| Field | Tipe | Validasi |
|---|---|---|
| name | string | 1–255 karakter |
| description | string | min 1 karakter |
| price | string | desimal, 0–99999999.99 |
| is_active | bool | — |

**Gambar** — request terpisah setelah bundle dibuat:
- `POST /bundles/:id/images` — body `{ image_url: string }` (URL valid, maks 255 karakter) → response `{ id, image_url }`
- `DELETE /bundles/:id/images/:imageId`

Catatan: Bundle selalu dibuat **aktif** (`is_active: true`), nonaktifkan lewat PATCH.

---

## 3. Merchandise

Base path: `/api/v1/merchandise`

| Method | Path | Auth | Deskripsi |
|---|---|---|---|
| GET | `` | — | List merchandise (array polos, tanpa pagination) — default hanya `is_active=true` |
| GET | /:id | — | Detail merchandise + gambar |
| POST | `` | Bearer admin | Buat merchandise |
| PATCH | /:id | Bearer admin | Update merchandise (partial) |
| DELETE | /:id | Bearer admin | Hapus merchandise (gambar ikut terhapus) |
| POST | /:id/images | Bearer admin | Tambah gambar |
| DELETE | /:id/images/:imageId | Bearer admin | Hapus gambar |

Query param GET list: `is_active` (bool, default true), `category` (t-shirt/cap/sticker/other)

**Data model Merchandise:**
```json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "price": "75000.00",
  "category": "other",
  "is_active": true,
  "created_at": "2026-07-01T10:00:00Z",
  "updated_at": "2026-07-01T10:00:00Z",
  "images": []
}
```

**Form Create (POST /merchandise)** — semua wajib:
| Field | Tipe | Validasi |
|---|---|---|
| name | string | 1–255 karakter |
| description | string | min 1 karakter |
| price | string | desimal, 0–99999999.99 |
| category | select | salah satu: `t-shirt`, `cap`, `sticker`, `other` |

**Form Edit (PATCH /merchandise/:id)** — semua opsional:
| Field | Tipe | Validasi |
|---|---|---|
| name | string | 1–255 karakter |
| description | string | min 1 karakter |
| price | string | desimal, 0–99999999.99 |
| category | select | t-shirt/cap/sticker/other |
| is_active | bool | — |

**Gambar** — sama pola dengan Bundle:
- `POST /merchandise/:id/images` — body `{ image_url: string }` (URL valid) → response `data: null`, status 201
- `DELETE /merchandise/:id/images/:imageId`

Catatan: Merchandise selalu dibuat **aktif**, nonaktifkan lewat PATCH.

> ⚠️ **Field `size` dan `material` yang ada di `products.js` (data dummy lama di codebase) TIDAK ADA di API asli.** Jangan pakai sebagai acuan form — hanya 4 field di atas yang valid untuk create/edit.

---

## 4. User

Base path: `/api/v1/users` — **semua endpoint wajib Bearer admin**

| Method | Path | Auth | Deskripsi |
|---|---|---|---|
| GET | `` | Bearer admin | List user, BER-PAGINASI + filter |
| GET | /:id | Bearer admin | Detail user |
| PATCH | /:id | Bearer admin | Update user (termasuk role) |
| DELETE | /:id | Bearer admin | Hapus user |

Query param GET list: `search` (nama/email, parsial), `role` (admin/user), `page` (default 1), `per_page` (default 10)

**Data model User:**
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "telp_number": "string",
  "role": "user",
  "image_url": "",
  "is_verified": true
}
```

List response (ber-paginasi, beda struktur dari Bundle/Merchandise):
```json
{
  "data": {
    "data": [ /* array user */ ],
    "meta": { "page": 1, "per_page": 10, "max_page": 1, "total": 1 }
  }
}
```

**Form Edit (PATCH /users/:id)** — semua opsional:
| Field | Tipe | Validasi |
|---|---|---|
| name | string | — |
| email | string | format email |
| telp_number | string | — |
| role | select | `admin` atau `user` |

Catatan:
- Tidak ada form **create** user dari admin panel — user daftar sendiri lewat `/auth/register`. Admin hanya bisa **edit & delete** user yang sudah ada.
- `image_url` saat ini selalu kosong (fitur upload foto profil belum tersedia di backend).

---

## 5. Hal Penting untuk UI/Logic

1. **Price selalu string**, bukan number murni — kirim & terima sebagai string format desimal 2 digit (`"75000.00"`), meski input di form bisa pakai `<input type="number">` lalu di-format ke string sebelum submit.
2. **Bundle & Merchandise TIDAK ber-pagination** (`data` langsung array). **User BER-pagination** (`data.data` + `data.meta`). Jangan disamakan pola tabelnya.
3. **Gambar = request terpisah.** Alur create item dengan gambar: submit form utama → dapat `id` dari response → baru panggil endpoint images satu per satu (bisa multiple).
4. **Status code:** 201 create sukses, 200 read/update/delete sukses, 400 validasi gagal/error bisnis, 401 token invalid, 404 tidak ditemukan, 403 role bukan admin.
5. **Upload file gambar belum jelas mekanismenya** — API hanya terima `image_url` (string), tidak ada endpoint upload file. Ini **masih perlu dikonfirmasi ke tim backend** sebelum ImageManager didesain final. Untuk sementara, asumsikan input berupa **field text URL** dulu (bukan file picker).
