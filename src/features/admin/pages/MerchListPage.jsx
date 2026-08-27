import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { merchandiseAdminService } from '@/services/adminApi';
import DataTable from '../components/DataTable';
import SearchInput from '../components/SearchInput';
import StatusBadge from '../components/StatusBadge';
import DeleteConfirmDialog from '../components/DeleteConfirmDialog';
import { useToast } from '../components/Toast';
import { formatRupiah } from '@/utils/formatters';
import { ShoppingBag, Plus, Pencil, Trash2, Image as ImageIcon } from 'lucide-react';

// ============================================================================
// MERCHANDISE LIST PAGE — Daftar semua merchandise + filter + delete
// ============================================================================

const DEFAULT_CATEGORIES = ['all', 't-shirt', 'cap', 'sticker', 'other'];

export default function MerchListPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const res = await merchandiseAdminService.getAll();
      setItems(res.data || []);
    } catch (err) {
      toast.error('Gagal memuat data merchandise.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  // Kategori dinamis untuk opsi filter dropdown
  const categoryOptions = useMemo(() => {
    let base = ['t-shirt', 'cap', 'sticker', 'other'];
    try {
      const saved = localStorage.getItem('admin_merch_categories');
      if (saved) base = JSON.parse(saved);
    } catch {}
    const fromItems = items.map(m => m.category).filter(Boolean);
    return ['all', ...Array.from(new Set([...base, ...fromItems]))];
  }, [items]);

  // Client-side filter & search (API tidak paginasi)
  const filtered = useMemo(() => {
    let result = items;
    if (category !== 'all') {
      result = result.filter(m => m.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.description?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [items, category, search]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await merchandiseAdminService.delete(deleteTarget.id);
      toast.success(`"${deleteTarget.name}" berhasil dihapus.`);
      fetchItems();
    } catch (err) {
      toast.error(err.message || 'Gagal menghapus merchandise.');
      throw err;
    }
  };

  const columns = [
    {
      key: 'index',
      label: '#',
      className: 'w-12 text-center',
      render: (_, idx) => <span className="text-gray-400 font-mono text-xs">{idx + 1}</span>,
    },
    {
      key: 'thumbnail',
      label: 'Foto',
      className: 'w-16',
      render: (row) => (
        <div className="h-10 w-10 overflow-hidden rounded-lg border border-gray-200 bg-gray-100 flex items-center justify-center">
          {row.images?.[0] ? (
            <img src={row.images[0].image_url} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon size={18} className="text-gray-400" />
          )}
        </div>
      ),
    },
    {
      key: 'name',
      label: 'Nama Produk',
      render: (row) => (
        <div>
          <span className="font-semibold text-gray-900 block">{row.name}</span>
          <span className="text-xs text-gray-400 line-clamp-1">{row.description || 'Tidak ada deskripsi'}</span>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Kategori',
      render: (row) => <StatusBadge value={row.category} />,
    },
    {
      key: 'price',
      label: 'Harga',
      render: (row) => <span className="font-medium text-gray-800">{formatRupiah(parseFloat(row.price))}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusBadge value={row.is_active ? 'active' : 'inactive'} />,
    },
    {
      key: 'images_count',
      label: 'Galeri',
      className: 'w-24',
      render: (row) => (
        <span className="inline-flex items-center gap-1 text-xs text-gray-500 font-medium">
          <ImageIcon size={14} className="text-gray-400" />
          {row.images?.length || 0} foto
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Aksi',
      className: 'w-24 text-right',
      render: (row) => (
        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => navigate(`/admin/merchandise/${row.id}/edit`)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
            title="Edit"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => setDeleteTarget(row)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-red-50 hover:text-ted-red"
            title="Hapus"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingBag size={22} className="text-ted-red" />
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Merchandise</h1>
          </div>
          <p className="mt-1 text-sm text-gray-500">Kelola katalog dan harga produk merchandise resmi TEDx Universitas Airlangga.</p>
        </div>
        <Link
          to="/admin/merchandise/create"
          className="inline-flex items-center gap-2 rounded-xl bg-ted-red px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#d00023] active:scale-[0.98]"
        >
          <Plus size={16} />
          <span>Tambah Merchandise</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="w-full sm:max-w-xs">
          <SearchInput value={search} onChange={setSearch} placeholder="Cari nama merchandise..." />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm text-gray-700 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-100"
        >
          {categoryOptions.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'Semua Kategori' : `Kategori: ${cat}`}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filtered}
        isLoading={isLoading}
        onRowClick={(row) => navigate(`/admin/merchandise/${row.id}/edit`)}
        emptyMessage="Belum ada merchandise."
      />

      {/* Count info */}
      {!isLoading && (
        <p className="text-xs text-gray-400 font-medium">
          Menampilkan <span className="font-semibold text-gray-600">{filtered.length}</span> item
          {category !== 'all' ? ` (kategori: ${category})` : ''}
          {search ? ` (pencarian: "${search}")` : ''}
        </p>
      )}

      {/* Delete dialog */}
      <DeleteConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title={`Hapus "${deleteTarget?.name}"?`}
        itemName={deleteTarget?.name || ''}
      />
    </div>
  );
}
