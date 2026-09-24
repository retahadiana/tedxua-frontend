import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Plus, Pencil, Trash2, Loader2, X, Save } from 'lucide-react';
import { formatRupiah } from '@/utils/formatters';

// ============================================================================
// TIER MANAGER — Komponen kelola daftar TicketTier di bawah satu Ticket
// ============================================================================
// Props:
//   tiers: Array<{ id, tier, price, quota, quota_filled, quota_held,
//                   quota_left, sale_start, sale_end, is_active }>
//   onAddTier: (data) => Promise<void>
//   onUpdateTier: (tierId, data) => Promise<void>
//   onDeleteTier: (tierId) => Promise<void>
//   disabled?: boolean (true saat mode Create, ticket belum tersimpan)
// ============================================================================

const EMPTY_FORM = { tier: '', price: '', quota: '', sale_start: '', sale_end: '' };

// Konversi datetime-local <-> ISO string
const toInputDateTime = (isoString) => {
  if (!isoString) return '';
  const d = new Date(isoString);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export default function TierManager({ tiers = [], onAddTier, onUpdateTier, onDeleteTier, disabled = false }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const openCreateForm = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setShowForm(true);
  };

  const openEditForm = (t) => {
    setEditingId(t.id);
    setForm({
      tier: t.tier || '',
      price: t.price ? String(parseFloat(t.price)) : '',
      quota: t.quota ?? '',
      sale_start: toInputDateTime(t.sale_start),
      sale_end: toInputDateTime(t.sale_end),
    });
    setErrors({});
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setErrors({});
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.tier.trim()) errs.tier = 'Nama tier wajib diisi.';
    if (!form.price) errs.price = 'Harga wajib diisi.';
    else {
      const numPrice = parseFloat(form.price);
      if (isNaN(numPrice) || numPrice < 0) errs.price = 'Harga harus berupa angka valid.';
      if (numPrice > 99999999.99) errs.price = 'Harga maksimal 99.999.999,99.';
    }
    if (!form.quota) errs.quota = 'Kuota wajib diisi.';
    else if (parseInt(form.quota, 10) < 1) errs.quota = 'Kuota minimal 1.';
    if (form.sale_start && form.sale_end && new Date(form.sale_end) <= new Date(form.sale_start)) {
      errs.sale_end = 'Waktu selesai harus setelah waktu mulai.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSaving(true);
    try {
      const payload = {
        tier: form.tier.trim(),
        price: parseFloat(form.price).toFixed(2),
        quota: parseInt(form.quota, 10),
        sale_start: form.sale_start ? new Date(form.sale_start).toISOString() : null,
        sale_end: form.sale_end ? new Date(form.sale_end).toISOString() : null,
      };
      if (editingId) {
        await onUpdateTier(editingId, payload);
      } else {
        await onAddTier(payload);
      }
      closeForm();
    } catch (err) {
      // Error sudah ditangani parent lewat toast
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (tierId) => {
    setDeletingId(tierId);
    try {
      await onDeleteTier(tierId);
    } catch (err) {
      // Error sudah ditangani parent lewat toast
    } finally {
      setDeletingId(null);
    }
  };

  if (disabled) {
    return (
      <div className="w-full rounded-2xl border border-dashed border-gray-300 bg-gray-50/70 p-6 sm:p-7 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <Tag size={22} />
          </div>
          <p className="text-sm font-semibold text-gray-700">Kelola Tier Harga</p>
          <p className="text-xs text-gray-400 max-w-sm">
            Simpan data ticket terlebih dahulu sebelum dapat menambahkan tier harga (VIP, Reguler, dll).
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-gray-200/90 bg-white p-5 sm:p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tag size={18} className="text-gray-500" />
          <h4 className="text-sm font-semibold text-gray-800">Tier Harga ({tiers.length})</h4>
        </div>
        {!showForm && (
          <button
            type="button"
            onClick={openCreateForm}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            <Plus size={14} />
            <span>Tambah Tier</span>
          </button>
        )}
      </div>

      {/* Tier list */}
      <div className="space-y-2.5">
        {tiers.map((t) => (
          <div
            key={t.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-gray-200 bg-gray-50/60 p-3.5"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-gray-900 text-sm">{t.tier}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    t.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {t.is_active ? 'Aktif' : 'Nonaktif'}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-gray-500">
                {formatRupiah(parseFloat(t.price))} &middot; Kuota {t.quota} (terisi {t.quota_filled ?? 0}
                {typeof t.quota_left === 'number' ? `, sisa ${t.quota_left}` : ''})
              </p>
              {(t.sale_start || t.sale_end) && (
                <p className="mt-0.5 text-[11px] text-gray-400">
                  Penjualan: {t.sale_start ? new Date(t.sale_start).toLocaleString('id-ID') : '—'} s/d{' '}
                  {t.sale_end ? new Date(t.sale_end).toLocaleString('id-ID') : '—'}
                </p>
              )}
            </div>
            <div className="flex items-center gap-1 shrink-0 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => openEditForm(t)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                title="Edit tier"
              >
                <Pencil size={14} />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Hapus tier "${t.tier}"? Jika tier sudah punya pesanan, tier hanya dinonaktifkan.`)) {
                    handleDelete(t.id);
                  }
                }}
                disabled={deletingId === t.id}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-red-50 hover:text-ted-red disabled:opacity-50"
                title="Hapus tier"
              >
                {deletingId === t.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
              </button>
            </div>
          </div>
        ))}

        {tiers.length === 0 && !showForm && (
          <p className="rounded-xl border border-dashed border-gray-200 bg-gray-50/50 p-4 text-center text-xs text-gray-400">
            Belum ada tier harga untuk ticket ini.
          </p>
        )}
      </div>

      {/* Add/Edit tier form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-4 rounded-xl border border-dashed border-ted-red/40 bg-red-50/20 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  {editingId ? 'Edit Tier' : 'Tier Baru'}
                </p>
                <button type="button" onClick={closeForm} className="text-gray-400 hover:text-gray-700">
                  <X size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                    Nama Tier <span className="text-ted-red">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.tier}
                    onChange={(e) => handleChange('tier', e.target.value)}
                    placeholder="VIP / Reguler"
                    className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                      errors.tier ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:ring-gray-100'
                    }`}
                  />
                  {errors.tier && <p className="mt-1 text-xs font-medium text-ted-red">{errors.tier}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                    Harga (IDR) <span className="text-ted-red">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">Rp</span>
                    <input
                      type="number"
                      min="0"
                      value={form.price}
                      onChange={(e) => handleChange('price', e.target.value)}
                      placeholder="150000"
                      className={`w-full rounded-lg border py-2 pl-9 pr-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                        errors.price ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:ring-gray-100'
                      }`}
                    />
                  </div>
                  {errors.price && <p className="mt-1 text-xs font-medium text-ted-red">{errors.price}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                    Kuota <span className="text-ted-red">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={form.quota}
                    onChange={(e) => handleChange('quota', e.target.value)}
                    placeholder="100"
                    className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                      errors.quota ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:ring-gray-100'
                    }`}
                  />
                  {errors.quota && <p className="mt-1 text-xs font-medium text-ted-red">{errors.quota}</p>}
                  {editingId && (
                    <p className="mt-1 text-[11px] text-gray-400">Kuota tidak boleh lebih kecil dari yang sudah terisi.</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-700">Mulai Jual</label>
                    <input
                      type="datetime-local"
                      value={form.sale_start}
                      onChange={(e) => handleChange('sale_start', e.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-2.5 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-100"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-700">Selesai Jual</label>
                    <input
                      type="datetime-local"
                      value={form.sale_end}
                      onChange={(e) => handleChange('sale_end', e.target.value)}
                      className={`w-full rounded-lg border px-2.5 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 ${
                        errors.sale_end ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:ring-gray-100'
                      }`}
                    />
                    {errors.sale_end && <p className="mt-1 text-xs font-medium text-ted-red">{errors.sale_end}</p>}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={isSaving}
                  className="rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
                >
                  {isSaving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
                  <span>{isSaving ? 'Menyimpan...' : 'Simpan Tier'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
