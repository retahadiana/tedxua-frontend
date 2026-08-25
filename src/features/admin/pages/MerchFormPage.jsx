import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { merchandiseAdminService } from '@/services/adminApi';
import ImageManager from '../components/ImageManager';
import { useToast } from '../components/Toast';
import { ShoppingBag, Pencil, Save, ArrowLeft, Loader2, Plus, Tag, X } from 'lucide-react';

// ============================================================================
// MERCHANDISE FORM PAGE — Create & Edit merchandise + Dynamic Category Manager
// ============================================================================
// Route: /admin/merchandise/create  → mode "create"
//        /admin/merchandise/:id/edit → mode "edit"
// ============================================================================

const DEFAULT_CATEGORIES = ['t-shirt', 'cap', 'sticker', 'other'];

// Helper untuk format string kategori menjadi slug yang bersih
const formatCategorySlug = (input) => {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
};

const INITIAL_FORM = {
  name: '',
  description: '',
  price: '',
  category: 't-shirt',
};

export default function MerchFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const isEdit = Boolean(id);

  // State master kategori merchandise (dimuat dari localStorage jika ada, fallback default)
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('admin_merch_categories');
      return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
    } catch {
      return DEFAULT_CATEGORIES;
    }
  });

  const [form, setForm] = useState(INITIAL_FORM);
  const [isActive, setIsActive] = useState(true);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEdit);

  // State Modal Tambah Kategori Baru
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryModalError, setCategoryModalError] = useState('');
  const [isSubmittingCategory, setIsSubmittingCategory] = useState(false);

  // Simpan state kategori ke localStorage jika bertambah
  useEffect(() => {
    try {
      localStorage.setItem('admin_merch_categories', JSON.stringify(categories));
    } catch (e) {
      console.warn('Gagal menyimpan categories ke localStorage:', e);
    }
  }, [categories]);

  // Fetch data untuk mode Edit
  useEffect(() => {
    if (!isEdit) return;

    const fetchItem = async () => {
      try {
        const res = await merchandiseAdminService.getById(id);
        const item = res.data;
        
        // Jika item memiliki kategori kustom yang belum ada di daftar, daftarkan secara dinamis
        if (item.category && !categories.includes(item.category)) {
          setCategories(prev => [...prev, item.category]);
        }

        setForm({
          name: item.name || '',
          description: item.description || '',
          price: item.price?.replace('.00', '') || '',
          category: item.category || 't-shirt',
        });
        setIsActive(item.is_active ?? true);
        setImages(item.images || []);
      } catch (err) {
        toast.error('Gagal memuat data merchandise.');
        navigate('/admin/merchandise');
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

  // ==========================================================================
  // HANDLER: TAMBAH KATEGORI BARU (Dinamis & siap integrasi API)
  // ==========================================================================
  const handleCreateCategory = async (e) => {
    e?.preventDefault();
    const slug = formatCategorySlug(newCategoryName);

    if (!slug) {
      setCategoryModalError('Nama kategori wajib diisi.');
      return;
    }

    if (categories.includes(slug)) {
      setCategoryModalError(`Kategori "${slug}" sudah ada dalam daftar.`);
      return;
    }

    setIsSubmittingCategory(true);
    setCategoryModalError('');

    try {
      // ----------------------------------------------------------------------
      // TODO: [INTEGRASI API] Sambungkan ke endpoint master kategori jika backend sudah menyediakan API-nya
      // Contoh:
      // const res = await apiRequest('/categories', {
      //   method: 'POST',
      //   body: JSON.stringify({ name: slug, label: newCategoryName.trim() })
      // });
      // ----------------------------------------------------------------------

      // Simulasi delay singkat
      await new Promise(resolve => setTimeout(resolve, 300));

      // Tambahkan ke state kategori lokal
      setCategories(prev => [...prev, slug]);

      // Otomatis pilih kategori baru di dropdown form
      setForm(prev => ({ ...prev, category: slug }));
      if (errors.category) setErrors(prev => ({ ...prev, category: '' }));

      toast.success(`Kategori "${slug}" berhasil ditambahkan dan dipilih!`);

      // Reset modal state
      setNewCategoryName('');
      setShowCategoryModal(false);
    } catch (err) {
      setCategoryModalError(err.message || 'Gagal menambahkan kategori baru.');
    } finally {
      setIsSubmittingCategory(false);
    }
  };

  // Client-side validation
  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Nama wajib diisi.';
    else if (form.name.length > 255) errs.name = 'Nama maksimal 255 karakter.';
    
    if (!form.description.trim()) errs.description = 'Deskripsi wajib diisi.';
    
    if (!form.price) errs.price = 'Harga wajib diisi.';
    else {
      const numPrice = parseFloat(form.price);
      if (isNaN(numPrice) || numPrice < 0) errs.price = 'Harga harus berupa angka valid.';
      if (numPrice > 99999999.99) errs.price = 'Harga maksimal 99.999.999,99.';
    }
    
    if (!categories.includes(form.category)) errs.category = 'Pilih kategori yang valid.';

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
        category: form.category,
      };

      if (isEdit) {
        payload.is_active = isActive;
        await merchandiseAdminService.update(id, payload);
        toast.success(`"${form.name}" berhasil diupdate.`);
      } else {
        const res = await merchandiseAdminService.create(payload);
        toast.success(`"${form.name}" berhasil dibuat! Sekarang kamu bisa menambahkan gambar.`);
        navigate(`/admin/merchandise/${res.data.id}/edit`, { replace: true });
        return;
      }
    } catch (err) {
      toast.error(err.message || 'Gagal menyimpan merchandise.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddImage = async (imageUrl) => {
    try {
      await merchandiseAdminService.addImage(id, imageUrl);
      const res = await merchandiseAdminService.getById(id);
      setImages(res.data.images || []);
      toast.success('Gambar berhasil ditambahkan.');
    } catch (err) {
      toast.error(err.message || 'Gagal menambahkan gambar.');
      throw err;
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await merchandiseAdminService.deleteImage(id, imageId);
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
            {[1, 2, 3, 4].map(i => (
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
              <ShoppingBag size={22} className="text-ted-red shrink-0" />
            )}
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              {isEdit ? 'Edit Merchandise' : 'Tambah Merchandise Baru'}
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            {isEdit ? `Perbarui informasi data "${form.name}"` : 'Isi form di bawah untuk mendaftarkan merchandise baru.'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/admin/merchandise')}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-600 shadow-2xs transition-colors hover:bg-gray-50 hover:text-gray-900 w-full sm:w-auto"
        >
          <ArrowLeft size={14} />
          <span>Kembali</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        {/* Form fields card */}
        <div className="w-full rounded-2xl border border-gray-200/90 bg-white p-5 sm:p-7 shadow-sm">
          <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-gray-400">
            Informasi Produk
          </h3>

          <div className="space-y-5 w-full">
            {/* Name */}
            <div className="w-full">
              <label htmlFor="merch-name" className="mb-1.5 block text-sm font-semibold text-gray-700">
                Nama Merchandise <span className="text-ted-red">*</span>
              </label>
              <input
                id="merch-name"
                type="text"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Contoh: Kaos Mycelium Network"
                className={`w-full rounded-xl border px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 ${
                  errors.name ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-gray-400 focus:ring-gray-100'
                }`}
              />
              {errors.name && <p className="mt-1.5 text-xs font-medium text-ted-red">{errors.name}</p>}
            </div>

            {/* Category with Dynamic Add Button */}
            <div className="w-full">
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="merch-category" className="block text-sm font-semibold text-gray-700">
                  Kategori Produk <span className="text-ted-red">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setCategoryModalError('');
                    setNewCategoryName('');
                    setShowCategoryModal(true);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-ted-red hover:text-red-700 transition-colors"
                >
                  <Plus size={13} />
                  <span>Tambah Kategori Baru</span>
                </button>
              </div>

              <select
                id="merch-category"
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className={`w-full rounded-xl border px-4 py-2.5 text-sm text-gray-800 transition-colors focus:outline-none focus:ring-2 ${
                  errors.category ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-gray-400 focus:ring-gray-100'
                }`}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="mt-1.5 text-xs font-medium text-ted-red">{errors.category}</p>}
              <p className="mt-1 text-xs text-gray-400">
                Pilih dari kategori yang tersedia atau klik <strong>+ Tambah Kategori Baru</strong> untuk mendaftarkan jenis baru.
              </p>
            </div>

            {/* Price */}
            <div className="w-full">
              <label htmlFor="merch-price" className="mb-1.5 block text-sm font-semibold text-gray-700">
                Harga Jual (IDR) <span className="text-ted-red">*</span>
              </label>
              <div className="relative w-full">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">Rp</span>
                <input
                  id="merch-price"
                  type="number"
                  min="0"
                  step="1"
                  value={form.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  placeholder="85000"
                  className={`w-full rounded-xl border py-2.5 pl-11 pr-4 text-sm text-gray-800 placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 ${
                    errors.price ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-gray-400 focus:ring-gray-100'
                  }`}
                />
              </div>
              {errors.price && <p className="mt-1.5 text-xs font-medium text-ted-red">{errors.price}</p>}
              <p className="mt-1 text-xs text-gray-400">Harga disimpan dalam format desimal standar (contoh: "85000.00").</p>
            </div>

            {/* Description */}
            <div className="w-full">
              <label htmlFor="merch-desc" className="mb-1.5 block text-sm font-semibold text-gray-700">
                Deskripsi Produk <span className="text-ted-red">*</span>
              </label>
              <textarea
                id="merch-desc"
                rows={4}
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Tuliskan detail deskripsi produk merchandise..."
                className={`w-full resize-y rounded-xl border px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 ${
                  errors.description ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-gray-400 focus:ring-gray-100'
                }`}
              />
              {errors.description && <p className="mt-1.5 text-xs font-medium text-ted-red">{errors.description}</p>}
            </div>

            {/* is_active toggle (only in edit mode) */}
            {isEdit && (
              <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50/80 p-4 w-full">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Status Publikasi</p>
                  <p className="text-xs text-gray-500">Merchandise nonaktif tidak akan ditampilkan pada katalog publik.</p>
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

        {/* Image manager */}
        <ImageManager
          images={images}
          onAddImage={handleAddImage}
          onDeleteImage={handleDeleteImage}
          disabled={!isEdit}
        />

        {/* Actions section */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 w-full pt-2">
          <button
            type="button"
            onClick={() => navigate('/admin/merchandise')}
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
                <span>{isEdit ? 'Simpan Perubahan' : 'Simpan Merchandise'}</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* ==================================================================== */}
      {/* MODAL TAMBAH KATEGORI BARU */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {showCategoryModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmittingCategory && setShowCategoryModal(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            />

            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="relative z-10 w-full max-w-[440px] rounded-2xl bg-white p-6 shadow-2xl mx-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-ted-red">
                    <Tag size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Tambah Kategori</h3>
                    <p className="text-xs text-gray-500">Daftarkan kategori baru untuk merchandise</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => !isSubmittingCategory && setShowCategoryModal(false)}
                  className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form Modal */}
              <form onSubmit={handleCreateCategory} className="mt-4 space-y-4">
                <div>
                  <label htmlFor="new-category-name" className="block text-xs font-semibold text-gray-700 mb-1">
                    Nama Kategori Baru <span className="text-ted-red">*</span>
                  </label>
                  <input
                    id="new-category-name"
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => {
                      setNewCategoryName(e.target.value);
                      if (categoryModalError) setCategoryModalError('');
                    }}
                    placeholder="Contoh: Tote Bag, Hoodie, Keychain"
                    disabled={isSubmittingCategory}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-ted-red focus:outline-none focus:ring-2 focus:ring-red-100 disabled:opacity-50"
                    autoFocus
                  />

                  {/* Slug live preview */}
                  {newCategoryName.trim() && (
                    <p className="mt-1.5 text-xs text-gray-500">
                      Disimpan sebagai: <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-ted-red">{formatCategorySlug(newCategoryName)}</code>
                    </p>
                  )}

                  {categoryModalError && (
                    <p className="mt-1.5 text-xs font-medium text-ted-red">{categoryModalError}</p>
                  )}
                </div>

                {/* Modal actions */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCategoryModal(false)}
                    disabled={isSubmittingCategory}
                    className="w-full sm:w-auto rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={!newCategoryName.trim() || isSubmittingCategory}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-ted-red px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#d00023] transition-all disabled:opacity-40"
                  >
                    {isSubmittingCategory ? (
                      <>
                        <Loader2 size={13} className="animate-spin" />
                        <span>Menyimpan...</span>
                      </>
                    ) : (
                      <>
                        <Plus size={14} />
                        <span>Simpan & Pilih Kategori</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
