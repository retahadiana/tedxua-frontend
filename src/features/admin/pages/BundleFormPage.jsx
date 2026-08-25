import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bundleService } from '@/services/adminApi';
import ImageManager from '../components/ImageManager';
import { useToast } from '../components/Toast';
import { Package, Pencil, Save, ArrowLeft, Loader2 } from 'lucide-react';

// ============================================================================
// BUNDLE FORM PAGE — Create & Edit bundle
// ============================================================================

const INITIAL_FORM = {
  name: '',
  description: '',
  price: '',
};

export default function BundleFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(INITIAL_FORM);
  const [isActive, setIsActive] = useState(true);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;

    const fetchItem = async () => {
      try {
        const res = await bundleService.getById(id);
        const item = res.data;
        setForm({
          name: item.name || '',
          description: item.description || '',
          price: item.price?.replace('.00', '') || '',
        });
        setIsActive(item.is_active ?? true);
        setImages(item.images || []);
      } catch (err) {
        toast.error('Gagal memuat data bundle.');
        navigate('/admin/bundles');
      } finally {
        setIsFetching(false);
      }
    };

    fetchItem();
  }, [id, isEdit]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Nama wajib diisi.';
    if (!form.description.trim()) errs.description = 'Deskripsi wajib diisi.';
    if (!form.price) errs.price = 'Harga wajib diisi.';
    else {
      const numPrice = parseFloat(form.price);
      if (isNaN(numPrice) || numPrice < 0) errs.price = 'Harga harus berupa angka valid.';
      if (numPrice > 99999999.99) errs.price = 'Harga maksimal 99.999.999,99.';
    }
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
        price: parseFloat(form.price).toFixed(2),
      };

      if (isEdit) {
        payload.is_active = isActive;
        await bundleService.update(id, payload);
        toast.success(`"${form.name}" berhasil diupdate.`);
      } else {
        const res = await bundleService.create(payload);
        toast.success(`"${form.name}" berhasil dibuat! Sekarang kamu bisa menambahkan gambar.`);
        navigate(`/admin/bundles/${res.data.id}/edit`, { replace: true });
        return;
      }
    } catch (err) {
      toast.error(err.message || 'Gagal menyimpan bundle.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddImage = async (imageUrl) => {
    try {
      await bundleService.addImage(id, imageUrl);
      const res = await bundleService.getById(id);
      setImages(res.data.images || []);
      toast.success('Gambar berhasil ditambahkan.');
    } catch (err) {
      toast.error(err.message || 'Gagal menambahkan gambar.');
      throw err;
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await bundleService.deleteImage(id, imageId);
      setImages(prev => prev.filter(img => img.id !== imageId));
      toast.success('Gambar berhasil dihapus.');
    } catch (err) {
      toast.error(err.message || 'Gagal menghapus gambar.');
      throw err;
    }
  };

  if (isFetching) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 rounded-lg bg-gray-200" />
          <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6">
            {[1, 2, 3].map(i => (
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
              <Package size={22} className="text-ted-red shrink-0" />
            )}
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              {isEdit ? 'Edit Bundle' : 'Tambah Bundle Baru'}
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            {isEdit ? `Perbarui informasi paket "${form.name}"` : 'Isi form di bawah untuk membuat paket bundle baru.'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/admin/bundles')}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-600 shadow-2xs transition-colors hover:bg-gray-50 hover:text-gray-900 w-full sm:w-auto"
        >
          <ArrowLeft size={14} />
          <span>Kembali</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        <div className="w-full rounded-2xl border border-gray-200/90 bg-white p-5 sm:p-7 shadow-sm">
          <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-gray-400">
            Informasi Bundle
          </h3>

          <div className="space-y-5 w-full">
            {/* Name */}
            <div className="w-full">
              <label htmlFor="bundle-name" className="mb-1.5 block text-sm font-semibold text-gray-700">
                Nama Bundle <span className="text-ted-red">*</span>
              </label>
              <input
                id="bundle-name"
                type="text"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Contoh: Bundle Starter"
                className={`w-full rounded-xl border px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 ${
                  errors.name ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-gray-400 focus:ring-gray-100'
                }`}
              />
              {errors.name && <p className="mt-1.5 text-xs font-medium text-ted-red">{errors.name}</p>}
            </div>

            {/* Price */}
            <div className="w-full">
              <label htmlFor="bundle-price" className="mb-1.5 block text-sm font-semibold text-gray-700">
                Harga Paket (IDR) <span className="text-ted-red">*</span>
              </label>
              <div className="relative w-full">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">Rp</span>
                <input
                  id="bundle-price"
                  type="number"
                  min="0"
                  step="1"
                  value={form.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  placeholder="150000"
                  className={`w-full rounded-xl border py-2.5 pl-11 pr-4 text-sm text-gray-800 placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 ${
                    errors.price ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-gray-400 focus:ring-gray-100'
                  }`}
                />
              </div>
              {errors.price && <p className="mt-1.5 text-xs font-medium text-ted-red">{errors.price}</p>}
            </div>

            {/* Description */}
            <div className="w-full">
              <label htmlFor="bundle-desc" className="mb-1.5 block text-sm font-semibold text-gray-700">
                Deskripsi Paket <span className="text-ted-red">*</span>
              </label>
              <textarea
                id="bundle-desc"
                rows={4}
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Rincian isi paket dan deskripsi promo..."
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
                  <p className="text-xs text-gray-500">Bundle nonaktif tidak akan ditampilkan pada katalog publik.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsActive(prev => !prev)}
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

        <ImageManager
          images={images}
          onAddImage={handleAddImage}
          onDeleteImage={handleDeleteImage}
          disabled={!isEdit}
        />

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 w-full pt-2">
          <button
            type="button"
            onClick={() => navigate('/admin/bundles')}
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
                <span>{isEdit ? 'Simpan Perubahan' : 'Simpan Bundle'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
