import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { bundleService, merchandiseAdminService, userService } from '@/services/adminApi';
import { Package, ShoppingBag, Users, Plus, ArrowUpRight, Sparkles } from 'lucide-react';

// ============================================================================
// DASHBOARD PAGE — Halaman overview admin
// ============================================================================

const STAT_CARDS = [
  {
    key: 'bundles',
    label: 'Total Bundles',
    icon: Package,
    iconBg: 'bg-blue-50 text-blue-600 border border-blue-100',
    link: '/admin/bundles',
    accent: 'hover:border-blue-200',
  },
  {
    key: 'merchandise',
    label: 'Total Merchandise',
    icon: ShoppingBag,
    iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    link: '/admin/merchandise',
    accent: 'hover:border-emerald-200',
  },
  {
    key: 'users',
    label: 'Pengguna Terdaftar',
    icon: Users,
    iconBg: 'bg-purple-50 text-purple-600 border border-purple-100',
    link: '/admin/users',
    accent: 'hover:border-purple-200',
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ bundles: 0, merchandise: 0, users: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [bundlesRes, merchRes, usersRes] = await Promise.all([
          bundleService.getAll(),
          merchandiseAdminService.getAll(),
          userService.getAll({ per_page: 1 }),
        ]);
        setStats({
          bundles: bundlesRes.data?.length || 0,
          merchandise: merchRes.data?.length || 0,
          users: usersRes.data?.meta?.total || 0,
        });
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Selamat datang, {user?.name || 'Admin'}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Berikut ringkasan data dan modul pengelolaan website TEDx Universitas Airlangga.
          </p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {STAT_CARDS.map(card => {
          const Icon = card.icon;
          return (
            <Link
              key={card.key}
              to={card.link}
              className={`group relative overflow-hidden rounded-2xl border border-gray-200/90 bg-white p-7 shadow-sm transition-all duration-200 hover:shadow-md ${card.accent}`}
            >
              <div className="flex items-center justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-xs ${card.iconBg}`}>
                  <Icon size={22} />
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-gray-400 group-hover:text-gray-900 transition-colors">
                  <span>Kelola</span>
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              <div className="mt-6">
                {isLoading ? (
                  <div className="h-10 w-20 animate-pulse rounded-lg bg-gray-100" />
                ) : (
                  <p className="text-4xl font-extrabold tracking-tight text-gray-900">{stats[card.key]}</p>
                )}
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">{card.label}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="rounded-2xl border border-gray-200/90 bg-white p-7 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <Sparkles size={18} className="text-ted-red" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800">Aksi Cepat</h2>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/bundles/create"
            className="inline-flex items-center gap-2 rounded-xl bg-ted-red px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#d00023] active:scale-[0.98]"
          >
            <Plus size={16} />
            <span>Tambah Bundle Baru</span>
          </Link>
          <Link
            to="/admin/merchandise/create"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-2xs transition-all hover:bg-gray-50 hover:text-gray-900 active:scale-[0.98]"
          >
            <Plus size={16} />
            <span>Tambah Merchandise Baru</span>
          </Link>
          <Link
            to="/admin/users"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-2xs transition-all hover:bg-gray-50 hover:text-gray-900 active:scale-[0.98]"
          >
            <Users size={16} />
            <span>Manajemen Pengguna</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
