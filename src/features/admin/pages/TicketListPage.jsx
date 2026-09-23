import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ticketService } from '@/services/adminApi';
import DataTable from '../components/DataTable';
import SearchInput from '../components/SearchInput';
import StatusBadge from '../components/StatusBadge';
import DeleteConfirmDialog from '../components/DeleteConfirmDialog';
import { useToast } from '../components/Toast';
import { formatRupiah } from '@/utils/formatters';
import { Ticket as TicketIcon, Plus, Pencil, Trash2, Tag } from 'lucide-react';

// ============================================================================
// TICKET LIST PAGE — Daftar semua jenis ticket + tier harganya
// ============================================================================

export default function TicketListPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const res = await ticketService.getAll();
      setItems(res.data || []);
    } catch (err) {
      toast.error('Gagal memuat data ticket.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const filtered = useMemo(() => {
    if (!search) return items;
    const q = search.toLowerCase();
    return items.filter((t) =>
      t.name.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q)
    );
  }, [items, search]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await ticketService.delete(deleteTarget.id);
      toast.success(`"${deleteTarget.name}" berhasil dihapus.`);
      fetchItems();
    } catch (err) {
      toast.error(err.message || 'Gagal menghapus ticket.');
      throw err;
    }
  };

  const priceRange = (tiers = []) => {
    if (!tiers.length) return '—';
    const prices = tiers.map((t) => parseFloat(t.price));
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? formatRupiah(min) : `${formatRupiah(min)} - ${formatRupiah(max)}`;
  };

  const columns = [
    {
      key: 'index',
      label: '#',
      className: 'w-12 text-center',
      render: (_, idx) => <span className="text-gray-400 font-mono text-xs">{idx + 1}</span>,
    },
    {
      key: 'name',
      label: 'Nama Ticket',
      render: (row) => (
        <div>
          <span className="font-semibold text-gray-900 block">{row.name}</span>
          <span className="text-xs text-gray-400 line-clamp-1">{row.description || 'Tidak ada deskripsi'}</span>
        </div>
      ),
    },
    {
      key: 'tiers',
      label: 'Tier',
      render: (row) => (
        <span className="inline-flex items-center gap-1 text-xs text-gray-500 font-medium">
          <Tag size={13} className="text-gray-400" />
          {row.tiers?.length || 0} tier
        </span>
      ),
    },
    {
      key: 'price_range',
      label: 'Rentang Harga',
      render: (row) => <span className="font-medium text-gray-800">{priceRange(row.tiers)}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusBadge value={row.is_active ? 'active' : 'inactive'} />,
    },
    {
      key: 'actions',
      label: 'Aksi',
      className: 'w-24 text-right',
      render: (row) => (
        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => navigate(`/admin/tickets/${row.id}/edit`)}
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <TicketIcon size={22} className="text-ted-red" />
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Tickets</h1>
          </div>
          <p className="mt-1 text-sm text-gray-500">Kelola jenis ticket dan tier harga event TEDx Universitas Airlangga.</p>
        </div>
        <Link
          to="/admin/tickets/create"
          className="inline-flex items-center gap-2 rounded-xl bg-ted-red px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#d00023] active:scale-[0.98]"
        >
          <Plus size={16} />
          <span>Tambah Ticket</span>
        </Link>
      </div>

      <div className="w-full sm:max-w-xs">
        <SearchInput value={search} onChange={setSearch} placeholder="Cari nama ticket..." />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        isLoading={isLoading}
        onRowClick={(row) => navigate(`/admin/tickets/${row.id}/edit`)}
        emptyMessage="Belum ada jenis ticket."
      />

      {!isLoading && (
        <p className="text-xs text-gray-400 font-medium">
          Menampilkan <span className="font-semibold text-gray-600">{filtered.length}</span> ticket
          {search ? ` (pencarian: "${search}")` : ''}
        </p>
      )}

      <DeleteConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title={`Hapus "${deleteTarget?.name}"?`}
        itemName={deleteTarget?.name || ''}
        description="Semua tier harga di dalam ticket ini akan ikut terhapus secara permanen."
      />
    </div>
  );
}
