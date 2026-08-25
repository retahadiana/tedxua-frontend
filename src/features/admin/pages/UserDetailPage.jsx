import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userService } from '@/services/adminApi';
import StatusBadge from '../components/StatusBadge';
import DeleteConfirmDialog from '../components/DeleteConfirmDialog';
import { useToast } from '../components/Toast';
import { User, Save, Trash2, ArrowLeft, Loader2, AlertTriangle, ShieldAlert } from 'lucide-react';

// ============================================================================
// USER DETAIL PAGE — Detail & edit user
// ============================================================================
// Catatan: Tidak ada form Create user — user daftar sendiri via /auth/register.
//          Admin hanya bisa edit & delete.
// ============================================================================

export default function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', telp_number: '', role: 'user' });
  const [errors, setErrors] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userService.getById(id);
        const u = res.data;
        setUser(u);
        setForm({
          name: u.name || '',
          email: u.email || '',
          telp_number: u.telp_number || '',
          role: u.role || 'user',
        });
      } catch (err) {
        toast.error('User tidak ditemukan.');
        navigate('/admin/users');
      } finally {
        setIsFetching(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Nama wajib diisi.';
    if (!form.email.trim()) errs.email = 'Email wajib diisi.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Format email tidak valid.';
    if (!['admin', 'user'].includes(form.role)) errs.role = 'Role tidak valid.';
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
        email: form.email.trim(),
        telp_number: form.telp_number.trim(),
        role: form.role,
      };
      await userService.update(id, payload);
      toast.success(`User "${form.name}" berhasil diupdate.`);
    } catch (err) {
      toast.error(err.message || 'Gagal mengupdate user.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await userService.delete(id);
      toast.success(`User "${user?.name}" berhasil dihapus.`);
      navigate('/admin/users');
    } catch (err) {
      toast.error(err.message || 'Gagal menghapus user.');
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
            <User size={22} className="text-ted-red shrink-0" />
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">Detail & Edit Pengguna</h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">Kelola profil dan hak akses pengguna terdaftar.</p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/admin/users')}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-600 shadow-2xs transition-colors hover:bg-gray-50 hover:text-gray-900 w-full sm:w-auto"
        >
          <ArrowLeft size={14} />
          <span>Kembali</span>
        </button>
      </div>

      {/* User summary card */}
      <div className="w-full rounded-2xl border border-gray-200/90 bg-white p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-900 text-xl font-bold text-white shadow-sm shrink-0">
            {user?.name?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-gray-900 leading-tight truncate">{user?.name}</h2>
            <p className="text-sm text-gray-500 truncate">{user?.email}</p>
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <StatusBadge value={user?.role} />
              <StatusBadge value={user?.is_verified ? 'verified' : 'unverified'} />
            </div>
          </div>
        </div>

        {user?.telp_number && (
          <div className="mt-4 rounded-xl bg-gray-50 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 border border-gray-100 w-full">
            <span className="text-xs font-medium text-gray-500">Nomor Telepon WhatsApp:</span>
            <span className="text-sm font-semibold font-mono text-gray-800">{user.telp_number}</span>
          </div>
        )}
      </div>

      {/* Edit form */}
      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        <div className="w-full rounded-2xl border border-gray-200/90 bg-white p-5 sm:p-7 shadow-sm">
          <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-gray-400">
            Edit Data Pengguna
          </h3>

          <div className="space-y-5 w-full">
            {/* Name */}
            <div className="w-full">
              <label htmlFor="user-name" className="mb-1.5 block text-sm font-semibold text-gray-700">
                Nama Lengkap <span className="text-ted-red">*</span>
              </label>
              <input
                id="user-name"
                type="text"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`w-full rounded-xl border px-4 py-2.5 text-sm text-gray-800 transition-colors focus:outline-none focus:ring-2 ${
                  errors.name ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-gray-400 focus:ring-gray-100'
                }`}
              />
              {errors.name && <p className="mt-1.5 text-xs font-medium text-ted-red">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="w-full">
              <label htmlFor="user-email" className="mb-1.5 block text-sm font-semibold text-gray-700">
                Alamat Email <span className="text-ted-red">*</span>
              </label>
              <input
                id="user-email"
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`w-full rounded-xl border px-4 py-2.5 text-sm text-gray-800 transition-colors focus:outline-none focus:ring-2 ${
                  errors.email ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-gray-400 focus:ring-gray-100'
                }`}
              />
              {errors.email && <p className="mt-1.5 text-xs font-medium text-ted-red">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="w-full">
              <label htmlFor="user-phone" className="mb-1.5 block text-sm font-semibold text-gray-700">Nomor Telepon</label>
              <input
                id="user-phone"
                type="text"
                value={form.telp_number}
                onChange={(e) => handleChange('telp_number', e.target.value)}
                placeholder="08xxxxxxxxxx"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 transition-colors focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-100"
              />
            </div>

            {/* Role */}
            <div className="w-full">
              <label htmlFor="user-role" className="mb-1.5 block text-sm font-semibold text-gray-700">Role Hak Akses</label>
              <select
                id="user-role"
                value={form.role}
                onChange={(e) => handleChange('role', e.target.value)}
                className={`w-full rounded-xl border px-4 py-2.5 text-sm text-gray-800 transition-colors focus:outline-none focus:ring-2 ${
                  errors.role ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-gray-400 focus:ring-gray-100'
                }`}
              >
                <option value="user">User Biasa</option>
                <option value="admin">Administrator</option>
              </select>
              {errors.role && <p className="mt-1.5 text-xs font-medium text-ted-red">{errors.role}</p>}
              {form.role === 'admin' && user?.role !== 'admin' && (
                <div className="mt-2.5 flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200/80 p-3 text-xs text-amber-800">
                  <ShieldAlert size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <span>Perhatian: Mengubah role pengguna menjadi Admin akan memberikan hak akses penuh ke seluruh modul panel admin ini.</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions section */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 w-full pt-2">
          <button
            type="button"
            onClick={() => navigate('/admin/users')}
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
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Danger zone */}
      <div className="w-full rounded-2xl border border-red-200 bg-red-50/50 p-5 sm:p-6">
        <div className="flex items-center gap-2 text-ted-red font-bold text-sm">
          <AlertTriangle size={17} />
          <h3>Zona Berbahaya</h3>
        </div>
        <p className="mt-1 text-xs text-gray-600">
          Menghapus akun pengguna akan menghilangkan akses dan seluruh riwayat pemesanan secara permanen.
        </p>
        <button
          type="button"
          onClick={() => setShowDelete(true)}
          className="mt-3.5 w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-white px-4 py-2 text-xs font-semibold text-ted-red shadow-2xs transition-colors hover:bg-red-50"
        >
          <Trash2 size={14} />
          <span>Hapus Akun Pengguna</span>
        </button>
      </div>

      <DeleteConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title={`Hapus user "${user?.name}"?`}
        itemName={user?.name || ''}
        description="Akun pengguna yang dihapus tidak dapat dipulihkan kembali."
      />
    </div>
  );
}
