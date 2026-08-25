import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '@/services/adminApi';
import DataTable from '../components/DataTable';
import SearchInput from '../components/SearchInput';
import StatusBadge from '../components/StatusBadge';
import Pagination from '../components/Pagination';
import DeleteConfirmDialog from '../components/DeleteConfirmDialog';
import { useToast } from '../components/Toast';
import { Users, Eye, Pencil, Trash2 } from 'lucide-react';

// ============================================================================
// USER LIST PAGE — Daftar user dengan server-side pagination
// ============================================================================

const PER_PAGE = 10;

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({ page: 1, per_page: PER_PAGE, max_page: 1, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = { page, per_page: PER_PAGE };
      if (search) params.search = search;
      if (roleFilter) params.role = roleFilter;

      const res = await userService.getAll(params);
      setUsers(res.data?.data || []);
      setMeta(res.data?.meta || { page: 1, per_page: PER_PAGE, max_page: 1, total: 0 });
    } catch (err) {
      toast.error('Gagal memuat data user.');
    } finally {
      setIsLoading(false);
    }
  }, [page, search, roleFilter]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  // Reset ke page 1 saat filter berubah
  const handleSearchChange = (val) => {
    setSearch(val);
    setPage(1);
  };

  const handleRoleChange = (val) => {
    setRoleFilter(val);
    setPage(1);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await userService.delete(deleteTarget.id);
      toast.success(`User "${deleteTarget.name}" berhasil dihapus.`);
      fetchUsers();
    } catch (err) {
      toast.error(err.message || 'Gagal menghapus user.');
      throw err;
    }
  };

  const columns = [
    {
      key: 'index',
      label: '#',
      className: 'w-12 text-center',
      render: (_, idx) => (
        <span className="text-gray-400 font-mono text-xs">{(meta.page - 1) * meta.per_page + idx + 1}</span>
      ),
    },
    {
      key: 'name',
      label: 'Nama Pengguna',
      render: (row) => (
        <div>
          <p className="font-semibold text-gray-900 leading-tight">{row.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{row.email}</p>
        </div>
      ),
    },
    {
      key: 'telp_number',
      label: 'Nomor Telepon',
      render: (row) => <span className="text-sm text-gray-600 font-mono">{row.telp_number || '—'}</span>,
    },
    {
      key: 'role',
      label: 'Role Akses',
      render: (row) => <StatusBadge value={row.role} />,
    },
    {
      key: 'verified',
      label: 'Verifikasi Email',
      render: (row) => <StatusBadge value={row.is_verified ? 'verified' : 'unverified'} />,
    },
    {
      key: 'actions',
      label: 'Aksi',
      className: 'w-24 text-right',
      render: (row) => (
        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => navigate(`/admin/users/${row.id}`)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
            title="Lihat Detail / Edit"
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
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Users size={22} className="text-ted-red" />
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Manajemen Pengguna</h1>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Daftar akun dan hak akses pengguna TEDx Universitas Airlangga (Total: <span className="font-semibold text-gray-700">{meta.total}</span> pengguna).
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="w-full sm:max-w-xs">
          <SearchInput value={search} onChange={handleSearchChange} placeholder="Cari nama atau email..." />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => handleRoleChange(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm text-gray-700 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-100"
        >
          <option value="">Semua Role Akses</option>
          <option value="admin">Hanya Admin</option>
          <option value="user">Hanya User Biasa</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={users}
        isLoading={isLoading}
        onRowClick={(row) => navigate(`/admin/users/${row.id}`)}
        emptyMessage="Tidak ada pengguna yang sesuai dengan filter."
      />

      {/* Pagination */}
      <Pagination
        page={meta.page}
        maxPage={meta.max_page}
        total={meta.total}
        perPage={meta.per_page}
        onPageChange={setPage}
      />

      <DeleteConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title={`Hapus user "${deleteTarget?.name}"?`}
        itemName={deleteTarget?.name || ''}
        description="Akun pengguna yang dihapus tidak dapat dipulihkan kembali. Seluruh data transaksi terkait akan terhapus."
      />
    </div>
  );
}
