import React, { useCallback, useEffect, useRef, useState } from 'react';
import { checkinService } from '@/services/adminApi';
import { UserCheck, Users, Clock, RefreshCw, Loader2, XCircle } from 'lucide-react';

// ============================================================================
// ATTENDANCE PAGE — Statistik kehadiran peserta (sudah / belum check-in)
// ============================================================================
// Hanya tiket dari pesanan berstatus "paid" yang dihitung.
// Data diambil dari GET /checkins/stats dan di-refresh otomatis tiap 15 detik.
// ============================================================================

const REFRESH_MS = 15000;
const nf = new Intl.NumberFormat('id-ID');

const pct = (part, total) => (total > 0 ? Math.round((part / total) * 100) : 0);

function describeError(err) {
  if (err?.status === 404 && typeof err?.data?.status !== 'boolean') {
    return 'Endpoint statistik (GET /checkins/stats) belum tersedia di backend.';
  }
  if (err?.status === 403) return 'Akun ini tidak punya akses admin.';
  if (err?.status === 401) return 'Sesi login berakhir. Silakan login ulang.';
  if (!err?.status) return 'Gagal terhubung ke server. Periksa koneksi lalu coba lagi.';
  return err.message || 'Gagal mengambil statistik kehadiran.';
}

function Progress({ checkedIn, total }) {
  const p = pct(checkedIn, total);
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100"
        role="progressbar"
        aria-valuenow={p}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="h-full rounded-full bg-ted-red transition-all" style={{ width: `${p}%` }} />
      </div>
      <span className="w-10 text-right text-xs font-semibold tabular-nums text-gray-600">{p}%</span>
    </div>
  );
}

function Stat({ icon: Icon, label, value, tone }) {
  return (
    <div className="rounded-2xl border border-gray-200/90 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center gap-2 text-gray-500">
        <Icon size={16} className={tone} />
        <p className="text-[11px] font-semibold uppercase tracking-wider">{label}</p>
      </div>
      <p className="mt-2 text-3xl font-bold tabular-nums text-gray-900 sm:text-4xl" data-testid={`stat-${label}`}>
        {nf.format(value)}
      </p>
    </div>
  );
}

function CountCells({ row }) {
  return (
    <>
      <td className="px-3 py-2 text-right tabular-nums">{nf.format(row.total)}</td>
      <td className="px-3 py-2 text-right font-semibold tabular-nums text-emerald-700">{nf.format(row.checked_in)}</td>
      <td className="px-3 py-2 text-right font-semibold tabular-nums text-amber-700">{nf.format(row.not_checked_in)}</td>
      <td className="min-w-[8rem] px-3 py-2">
        <Progress checkedIn={row.checked_in} total={row.total} />
      </td>
    </>
  );
}

export default function AttendancePage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const mounted = useRef(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await checkinService.stats();
      if (!mounted.current) return;
      setData(res);
      setError('');
    } catch (err) {
      if (mounted.current) setError(describeError(err));
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    load();
    const id = setInterval(load, REFRESH_MS);
    return () => {
      mounted.current = false;
      clearInterval(id);
    };
  }, [load]);

  const updated = data?.generated_at
    ? new Date(data.generated_at).toLocaleTimeString('id-ID', { timeStyle: 'medium' })
    : null;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <UserCheck size={22} className="shrink-0 text-ted-red" />
            <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Kehadiran Peserta</h1>
          </div>
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Jumlah tiket lunas yang sudah dan belum check-in. Diperbarui otomatis tiap 15 detik.
          </p>
        </div>
        <button
          type="button"
          onClick={load}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-2xs transition-colors hover:bg-gray-50 disabled:opacity-50"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
          <span>Muat ulang</span>
        </button>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
          <XCircle size={20} className="mt-0.5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {!data && loading && (
        <div className="flex justify-center rounded-2xl border border-gray-200/90 bg-white p-10 shadow-sm">
          <Loader2 size={28} className="animate-spin text-ted-red" />
        </div>
      )}

      {data && (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Stat icon={Users} label="Total tiket lunas" value={data.total} tone="text-gray-500" />
            <Stat icon={UserCheck} label="Sudah hadir" value={data.checked_in} tone="text-emerald-600" />
            <Stat icon={Clock} label="Belum hadir" value={data.not_checked_in} tone="text-amber-600" />
          </div>

          <div className="rounded-2xl border border-gray-200/90 bg-white p-4 shadow-sm sm:p-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Kehadiran keseluruhan</p>
            <Progress checkedIn={data.checked_in} total={data.total} />
          </div>

          {data.tickets.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-sm text-gray-500">
              Belum ada tiket lunas.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-gray-200/90 bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  <tr>
                    <th className="px-3 py-2.5 text-left">Tiket / Tier</th>
                    <th className="px-3 py-2.5 text-right">Total</th>
                    <th className="px-3 py-2.5 text-right">Hadir</th>
                    <th className="px-3 py-2.5 text-right">Belum</th>
                    <th className="px-3 py-2.5 text-left">Progres</th>
                  </tr>
                </thead>
                {data.tickets.map((t) => (
                  <tbody key={t.ticket_id} className="divide-y divide-gray-100 border-t border-gray-100">
                    <tr className="bg-gray-50/60 font-semibold text-gray-900" data-testid={`ticket-${t.ticket_name}`}>
                      <td className="px-3 py-2.5">{t.ticket_name}</td>
                      <CountCells row={t} />
                    </tr>
                    {t.tiers.map((tier) => (
                      <tr key={tier.tier_id} className="text-gray-700">
                        <td className="py-2 pl-7 pr-3">{tier.tier_name}</td>
                        <CountCells row={tier} />
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>
          )}

          {updated && <p className="text-center text-xs text-gray-400">Terakhir diperbarui {updated}</p>}
        </>
      )}
    </div>
  );
}
