import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ticketService } from '@/services/adminApi';
import TierManager from '../components/TierManager';
import { useToast } from '../components/Toast';
import { Ticket as TicketIcon, Pencil, Save, ArrowLeft, Loader2 } from 'lucide-react';

// ============================================================================
// TICKET FORM PAGE — Create & Edit ticket + kelola tier harga di dalamnya
// ============================================================================

const INITIAL_FORM = { name: '', description: '' };

export default function TicketFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(INITIAL_FORM);
  const [isActive, setIsActive] = useState(true);
  const [tiers, setTiers] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEdit);

  const fetchItem = async () => {
    try {
      const res = await ticketService.getById(id);
      const item = res.data;
      setForm({ name: item.name || '', description: item.description || '' });
      setIsActive(item.is_active ?? true);
      setTiers(item.tiers || []);
    } catch (err) {
      toast.error('Gagal memuat data ticket.');
      navigate('/admin/tickets');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (!isEdit) return;
    fetchItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Nama wajib diisi.';
    if (!form.description.trim()) errs.description = 'Deskripsi wajib diisi.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
      };

      if (isEdit) {
        payload.is_active = isActive;
        await ticketService.update(id, payload);
        toast.success(`"${form.name}" berhasil diupdate.`);
      } else {
        const res = await ticketService.create(payload);
        toast.success(`"${form.name}" berhasil dibuat! Sekarang kamu bisa menambahkan tier harga.`);
        navigate(`/admin/tickets/${res.data.id}/edit`, { replace: true });
        return;
      }
    } catch (err) {
      toast.error(err.message || 'Gagal menyimpan ticket.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTier = async (data) => {
    try {
      await ticketService.createTier(id, data);
      toast.success('Tier berhasil ditambahkan.');
      const res = await ticketService.getById(id);
      setTiers(res.data.tiers || []);
    } catch (err) {
      toast.error(err.message || 'Gagal menambahkan tier.');
      throw err;
    }
  };

  const handleUpdateTier = async (tierId, data) => {
    try {
      await ticketService.updateTier(id, tierId, data);
      toast.success('Tier berhasil diupdate.');
      const res = await ticketService.getById(id);
      setTiers(res.data.tiers || []);
    } catch (err) {
      toast.error(err.message || 'Gagal mengupdate tier.');
      throw err;
    }
  };

  const handleDeleteTier = async (tierId) => {
    try {
      await ticketService.deleteTier(id, tierId);
      setTiers((prev) => prev.filter((t) => t.id !== tierId));
      toast.success('Tier berhasil dihapus.');
    } catch (err) {
      toast.error(err.message || 'Gagal menghapus tier.');
      throw err;
    }
  };

  if (isFetching) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 rounded-lg bg-gray-200" />
          <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="h-10 rounded-lg bg-gray-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            {isEdit ? (
              <Pencil size={22} className="text-ted-red shrink-0" />
            ) : (
              <TicketIcon size={22} className="text-ted-red shrink-0" />
            )}
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              {isEdit ? 'Edit Ticket' : 'Tambah Ticket Baru'}
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            {isEdit ? `Perbarui informasi ticket "${form.name}"` : 'Isi form di bawah untuk membuat jenis ticket baru.'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/admin/tickets')}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-600 shadow-2xs transition-colors hover:bg-gray-50 hover:text-gray-900 w-full sm:w-auto"
        >
          <ArrowLeft size={14} />
          <span>Kembali</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        <div className="w-full rounded-2xl border border-gray-200/90 bg-white p-5 sm:p-7 shadow-sm">
          <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-gray-400">Informasi Ticket</h3>

          <div className="space-y-5 w-full">
            {/* Name */}
            <div className="w-full">
              <label htmlFor="ticket-name" className="mb-1.5 block text-sm font-semibold text-gray-700">
                Nama Ticket <span className="text-ted-red">*</span>
              </label>
              <input
                id="ticket-name"
                type="text"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Contoh: TEDx Main Event"
                className={`w-full rounded-xl border px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 ${
                  errors.name ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-gray-400 focus:ring-gray-100'
                }`}
              />
              {errors.name && <p className="mt-1.5 text-xs font-medium text-ted-red">{errors.name}</p>}
            </div>

            {/* Description */}
            <div className="w-full">
              <label htmlFor="ticket-desc" className="mb-1.5 block text-sm font-semibold text-gray-700">
                Deskripsi Ticket <span className="text-ted-red">*</span>
              </label>
              <textarea
                id="ticket-desc"
                rows={4}
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Rincian acara dan ketentuan ticket..."
                className={`w-full resize-y rounded-xl border px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 ${
                  errors.description ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-gray-400 focus:ring-gray-100'
                }`}
              />
              {errors.description && <p className="mt-1.5 text-xs font-medium text-ted-red">{errors.description}</p>}
            </div>

            {/* is_active toggle */}
            {isEdit && (
              <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50/80 p-4 w-full">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Status Publikasi</p>
                  <p className="text-xs text-gray-500">Ticket nonaktif tidak akan ditampilkan/dijual ke publik.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsActive((prev) => !prev)}
                  className={`relative h-6 w-11 rounded-full transition-colors shrink-0 ${isActive ? 'bg-emerald-500' : 'bg-gray-300'}`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                      isActive ? 'left-[22px]' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
            )}
          </div>
        </div>

        <TierManager
          tiers={tiers}
          onAddTier={handleAddTier}
          onUpdateTier={handleUpdateTier}
          onDeleteTier={handleDeleteTier}
          disabled={!isEdit}
        />

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 w-full pt-2">
          <button
            type="button"
            onClick={() => navigate('/admin/tickets')}
            className="w-full sm:w-auto rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-2xs transition-colors hover:bg-gray-50 text-center"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-ted-red px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#d00023] active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>{isEdit ? 'Simpan Perubahan' : 'Simpan Ticket'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
