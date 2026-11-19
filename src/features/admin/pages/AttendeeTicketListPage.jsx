import React, { useCallback, useEffect, useState } from 'react';
import { checkinService } from '@/services/adminApi';
import SearchInput from '../components/SearchInput';
import Pagination from '../components/Pagination';
import { useToast } from '../components/Toast';
import { ListChecks, CheckCircle2, Clock, Loader2, Inbox } from 'lucide-react';

// ============================================================================
// ATTENDEE TICKET LIST — Daftar tiket peserta + status scan (sudah / belum)
// ============================================================================
// Filter: pencarian (kode, nama, email, telepon), tier, status scan.
// Semua filter & paginasi dijalankan di backend (GET /checkins/tickets),
// hanya tiket dari pesanan "paid" yang tampil.
// ============================================================================

const PER_PAGE = 20;

const STATUS_OPTIONS = [
  { value: 'all', label: 'Semua' },
  { value: 'used', label: 'Sudah discan' },
  { value: 'unused', label: 'Belum discan' },
];

const EMPTY_META = { page: 1, per_page: PER_PAGE, max_page: 1, total: 0 };

const formatDateTime = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
};

function StatusPill({ used }) {
  return used ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
      <CheckCircle2 size={12} /> Sudah discan
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
      <Clock size={12} /> Belum discan
    </span>
  );
}

export default function AttendeeTicketListPage() {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState(EMPTY_META);
  const [tiers, setTiers] = useState([]); // [{ id, label }]
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tierId, setTierId] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);

  // Daftar tier untuk dropdown diambil dari statistik (tier yang punya tiket lunas)
  useEffect(() => {
    let cancelled = false;
    checkinService
      .stats()
      .then((s) => {
        if (cancelled) return;
        const list = [];
        (s?.tickets ?? []).forEach((t) =>
          (t.tiers ?? []).forEach((tier) => list.push({ id: tier.tier_id, label: `${t.ticket_name} — ${tier.tier_name}` })),
        );
        setTiers(list);
      })
      .catch(() => {}); // dropdown tier opsional; list tetap jalan tanpa itu
    return () => {
      cancelled = true;
    };
  }, []);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await checkinService.attendees({ search, tier_id: tierId, status, page, per_page: PER_PAGE });
      setItems(res?.data ?? []);
      setMeta(res?.meta ?? EMPTY_META);
    } catch (err) {
      if (err?.status === 404 && typeof err?.data?.status !== 'boolean') {
        toast.error('Endpoint daftar tiket (GET /checkins/tickets) belum tersedia di backend.');
      } else {
        toast.error(err?.message || 'Gagal memuat daftar tiket.');
      }
    } finally {
      setLoading(false);
    }
  }, [search, tierId, status, page, toast]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Setiap filter berubah → kembali ke halaman 1
  const changeSearch = (v) => { setSearch(v.trim()); setPage(1); };
  const changeTier = (v) => { setTierId(v); setPage(1); };
  const changeStatus = (v) => { setStatus(v); setPage(1); };

  const selectCls =
    'h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-100';

  return (
    <div className="mx-auto w-full max-w-6xl space-y-5">
      <div>
        <div className="flex items-center gap-2">
          <ListChecks size={22} className="shrink-0 text-ted-red" />
          <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Daftar Tiket Peserta</h1>
        </div>
        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          Cari tiket berdasarkan kode, nama, email, atau telepon, dan lihat apakah sudah discan.
        </p>
      </div>

      <div className="space-y-3 rounded-2xl border border-gray-200/90 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_16rem]">
          <SearchInput value={search} onChange={changeSearch} placeholder="Cari kode, nama, email, atau telepon..." />
          <select value={tierId} onChange={(e) => changeTier(e.target.value)} className={selectCls} aria-label="Filter tier">
            <option value="">Semua tier</option>
            {tiers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div className="inline-grid grid-cols-3 gap-1 rounded-xl bg-gray-100 p-1">
          {STATUS_OPTIONS.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => changeStatus(o.value)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
                status === o.value ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-500" data-testid="result-count">
        {loading ? 'Memuat...' : `${meta.total} tiket ditemukan`}
      </p>

      <div className="overflow-x-auto rounded-2xl border border-gray-200/90 bg-white shadow-sm">
        <table className="w-full min-w-[44rem] text-sm">
          <thead className="bg-gray-50 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
            <tr>
              <th className="px-4 py-2.5 text-left">Kode</th>
              <th className="px-4 py-2.5 text-left">Peserta</th>
              <th className="px-4 py-2.5 text-left">Tiket / Tier</th>
              <th className="px-4 py-2.5 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading && items.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-gray-400">
                  <Loader2 size={22} className="mx-auto animate-spin text-ted-red" />
                </td>
              </tr>
            )}
            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-gray-400">
                  <Inbox size={22} className="mx-auto mb-2" />
                  Tidak ada tiket yang cocok.
                </td>
              </tr>
            )}
            {items.map((row) => (
              <tr key={row.id} className={loading ? 'opacity-60' : ''}>
                <td className="px-4 py-3 font-mono text-sm font-bold tracking-widest text-gray-900">{row.ticket_code}</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{row.attendee_name}</p>
                  <p className="text-xs text-gray-500">{row.attendee_email}</p>
                  {row.attendee_phone && <p className="text-xs text-gray-400">{row.attendee_phone}</p>}
                </td>
                <td className="px-4 py-3">
                  <p className="text-gray-900">{row.ticket_name}</p>
                  <p className="text-xs text-gray-500">{row.tier_name}</p>
                </td>
                <td className="px-4 py-3">
                  <StatusPill used={row.is_used} />
                  {row.is_used && row.used_at && (
                    <p className="mt-1 text-[11px] text-gray-400">{formatDateTime(row.used_at)}</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={meta.page} maxPage={meta.max_page} total={meta.total} perPage={meta.per_page} onPageChange={setPage} />
    </div>
  );
}
