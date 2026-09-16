import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DataTable from '../components/DataTable';
import SearchInput from '../components/SearchInput';
import DeleteConfirmDialog from '../components/DeleteConfirmDialog';
import { useToast } from '../components/Toast';
import { categoryService } from '@/services/adminApi';
import { Tag, Plus, Pencil, Trash2, X, Loader2 } from 'lucide-react';

const formatCategorySlug = (input) => {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
};

export default function CategoryListPage() {
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [categorySlug, setCategorySlug] = useState('');
  const [modalError, setModalError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const res = await categoryService.getAll();
        setCategories(res.data || []);
      } catch (err) {
        toast.error(err.message || 'Gagal memuat kategori.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Client-side filter search
  const filteredCategories = useMemo(() => {
    if (!search.trim()) return categories;
    const q = search.toLowerCase();
    return categories.filter(
      cat => cat.name.toLowerCase().includes(q) || formatCategorySlug(cat.name).includes(q)
    );
  }, [categories, search]);

  // Buka Modal Tambah
  const handleOpenAddModal = () => {
    setEditingCategory(null);
    setCategoryName('');
    setCategorySlug('');
    setModalError('');
    setIsModalOpen(true);
  };

  // Buka Modal Edit
  const handleOpenEditModal = (cat) => {
    setEditingCategory(cat);
    setCategoryName(cat.name);
    setCategorySlug(formatCategorySlug(cat.name));
    setModalError('');
    setIsModalOpen(true);
  };

  // ==========================================================================
  // HANDLER: SIMPAN / UPDATE KATEGORI
  // ==========================================================================
  const handleSaveCategory = async (e) => {
    e.preventDefault();
    const cleanName = categoryName.trim();
    if (!cleanName) {
      setModalError('Nama kategori wajib diisi.');
      return;
    }
    const duplicate = categories.find(
      c => c.name.toLowerCase() === cleanName.toLowerCase() && c.id !== editingCategory?.id
    );
    if (duplicate) {
      setModalError(`Kategori "${cleanName}" sudah digunakan oleh kategori lain.`);
      return;
    }
    setIsSubmitting(true);
    setModalError('');
    try {
      if (editingCategory) {
        const res = await categoryService.update(editingCategory.id, cleanName);
        setCategories(prev =>
          prev.map(c => c.id === editingCategory.id ? res.data : c)
        );
        toast.success(`Kategori "${cleanName}" berhasil diperbarui.`);
      } else {
        const res = await categoryService.create(cleanName);
        setCategories(prev => [...prev, res.data]);
        toast.success(`Kategori baru "${cleanName}" berhasil ditambahkan.`);
      }
      setIsModalOpen(false);
    } catch (err) {
      setModalError(err.message || 'Gagal menyimpan kategori.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==========================================================================
  // HANDLER: HAPUS KATEGORI
  // ==========================================================================
  const handleDeleteCategory = async () => {
    if (!deleteTarget) return;
    try {
      await categoryService.delete(deleteTarget.id);
      setCategories(prev => prev.filter(c => c.id !== deleteTarget.id));
      toast.success(`Kategori "${deleteTarget.name}" berhasil dihapus.`);
    } catch (err) {
      toast.error(err.message || 'Gagal menghapus kategori.');
      throw err;
    }
  };

  // Kolom DataTable
  const columns = [
    {
      key: 'index',
      label: '#',
      className: 'w-12 text-center',
      render: (_, idx) => <span className="text-gray-400 font-mono text-xs">{idx + 1}</span>,
    },
    {
      key: 'name',
      label: 'Nama Kategori',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-ted-red shrink-0">
            <Tag size={15} />
          </div>
          <span className="font-semibold text-gray-900">{row.name}</span>
        </div>
      ),
    },
    {
      key: 'slug',
      label: 'Slug API',
      render: (row) => (
        <code className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-mono text-gray-700">
          {formatCategorySlug(row.name)}
        </code>
      ),
    },
    {
      key: 'actions',
      label: 'Aksi',
      className: 'w-28 text-right',
      render: (row) => (
        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => handleOpenEditModal(row)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
            title="Edit Kategori"
          >
            <Pencil size={15} />
          </button>
          <button
            type="button"
            onClick={() => setDeleteTarget(row)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-red-50 hover:text-ted-red"
            title="Hapus Kategori"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Tag size={22} className="text-ted-red" />
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Kelola Kategori Merchandise</h1>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Daftar kategori produk merchandise resmi TEDx Universitas Airlangga.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-ted-red px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#d00023] active:scale-[0.98]"
        >
          <Plus size={16} />
          <span>Tambah Kategori Baru</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="w-full sm:max-w-xs">
        <SearchInput value={search} onChange={setSearch} placeholder="Cari nama atau slug kategori..." />
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredCategories}
        isLoading={isLoading}
        emptyMessage="Belum ada kategori merchandise."
      />

      {/* Count Info */}
      <p className="text-xs text-gray-400 font-medium">
        Menampilkan <span className="font-semibold text-gray-600">{filteredCategories.length}</span> kategori
        {search ? ` (pencarian: "${search}")` : ''}
      </p>

      {/* ==================================================================== */}
      {/* MODAL CREATE / EDIT KATEGORI */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setIsModalOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            />

            {/* Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="relative z-10 w-full max-w-[460px] rounded-2xl bg-white p-6 shadow-2xl mx-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-ted-red">
                    <Tag size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      {editingCategory ? 'Edit Kategori' : 'Tambah Kategori Baru'}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {editingCategory
                        ? `Mengubah kategori "${editingCategory.name}"`
                        : 'Daftarkan nama kategori baru untuk produk merchandise'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => !isSubmitting && setIsModalOpen(false)}
                  className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSaveCategory} className="mt-4 space-y-4">
                {/* Nama Kategori */}
                <div>
                  <label htmlFor="cat-name-input" className="block text-xs font-semibold text-gray-700 mb-1">
                    Nama Kategori <span className="text-ted-red">*</span>
                  </label>
                  <input
                    id="cat-name-input"
                    type="text"
                    value={categoryName}
                    onChange={(e) => {
                      setCategoryName(e.target.value);
                      // Otomatis sinkronkan slug jika mode tambah baru
                      if (!editingCategory) {
                        setCategorySlug(formatCategorySlug(e.target.value));
                      }
                      if (modalError) setModalError('');
                    }}
                    placeholder="Contoh: Tote Bag, Keychain, Hoodie"
                    disabled={isSubmitting}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-ted-red focus:outline-none focus:ring-2 focus:ring-red-100 disabled:opacity-50"
                    autoFocus
                  />
                </div>

                {/* Slug Kategori */}
                <div>
                  <label htmlFor="cat-slug-input" className="block text-xs font-semibold text-gray-700 mb-1">
                    Slug API (Huruf kecil & tanpa spasi) <span className="text-ted-red">*</span>
                  </label>
                  <input
                    id="cat-slug-input"
                    type="text"
                    value={categorySlug}
                    onChange={(e) => {
                      setCategorySlug(formatCategorySlug(e.target.value));
                      if (modalError) setModalError('');
                    }}
                    placeholder="Contoh: tote-bag"
                    disabled={isSubmitting}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/60 px-3.5 py-2.5 text-sm font-mono text-gray-800 placeholder:text-gray-400 focus:border-ted-red focus:outline-none focus:ring-2 focus:ring-red-100 disabled:opacity-50"
                  />
                  <p className="mt-1 text-[11px] text-gray-400">
                    Nilai ini disimpan ke database backend pada field <code>name</code>.
                  </p>
                </div>

                {modalError && (
                  <p className="text-xs font-medium text-ted-red">{modalError}</p>
                )}

                {/* Actions */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors text-center"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={!categoryName.trim() || isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-ted-red px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#d00023] transition-all disabled:opacity-40"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={13} className="animate-spin" />
                        <span>Menyimpan...</span>
                      </>
                    ) : (
                      <>
                        <Plus size={14} />
                        <span>{editingCategory ? 'Simpan Perubahan' : 'Tambah Kategori'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteCategory}
        title={`Hapus kategori "${deleteTarget?.name}"?`}
        itemName={deleteTarget?.name || ''}
        description="Kategori yang dihapus tidak akan lagi tersedia pada opsi pembuatan merchandise baru."
      />
    </div>
  );
}
