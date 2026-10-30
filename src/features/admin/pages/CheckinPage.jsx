import React, { useRef, useState } from 'react';
import { checkinService, normalizeTicketCode, isValidTicketCode } from '@/services/adminApi';
import QrScanner from '../components/QrScanner';
import CheckinTicketCard from '../components/CheckinTicketCard';
import { useToast } from '../components/Toast';
import { ScanLine, Keyboard, Camera, Search, Loader2, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

// ============================================================================
// CHECK-IN PAGE — Registrasi peserta di lokasi acara
// ============================================================================
// Alur:
//   1. Admin scan QR (kamera) ATAU ketik kode unik 6 karakter
//   2. lookup  → tampil ringkasan tiket (belum mengubah status)
//   3. Admin klik "Konfirmasi Registrasi" → confirm → is_used = true
//   4. Tiket yang sama dibuka lagi → muncul peringatan "sudah digunakan"
// ============================================================================

const TABS = [
  { key: 'scan', label: 'Scan QR', icon: Camera },
  { key: 'manual', label: 'Input Kode', icon: Keyboard },
];

function describeLookupError(err) {
  // 404 tanpa envelope JSON backend = route belum ada (bukan "tiket tidak ketemu")
  if (err?.status === 404 && typeof err?.data?.status !== 'boolean') {
    return 'Endpoint pencarian tiket (GET /checkins/:ticket_code) belum tersedia di backend.';
  }
  if (err?.status === 404) return 'Kode tiket tidak ditemukan. Periksa kembali kodenya.';
  if (err?.status === 403) return 'Akun ini tidak punya akses admin untuk registrasi peserta.';
  if (err?.status === 401) return 'Sesi login berakhir. Silakan login ulang.';
  if (!err?.status) return 'Gagal terhubung ke server. Periksa koneksi lalu coba lagi.';
  return err.message || 'Gagal mengambil data tiket.';
}

export default function CheckinPage() {
  const toast = useToast();
  const busyRef = useRef(false);

  const [mode, setMode] = useState('scan');
  // input | looking | review | confirming | done | used | unpaid | error
  const [phase, setPhase] = useState('input');
  const [ticket, setTicket] = useState(null);
  const [usedAt, setUsedAt] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [scanHint, setScanHint] = useState('');
  const [manualCode, setManualCode] = useState('');
  const [manualError, setManualError] = useState('');

  const reset = () => {
    busyRef.current = false;
    setPhase('input');
    setTicket(null);
    setUsedAt(null);
    setErrorMessage('');
    setScanHint('');
    setManualCode('');
    setManualError('');
  };

  const lookupCode = async (raw, source) => {
    const code = normalizeTicketCode(raw);
    if (!isValidTicketCode(code)) {
      if (source === 'qr') setScanHint('QR terbaca, tapi bukan kode tiket TEDx. Arahkan ke QR yang benar.');
      else setManualError('Kode tiket terdiri dari 6 karakter huruf/angka.');
      return;
    }
    if (busyRef.current) return;
    busyRef.current = true;
    setScanHint('');
    setManualError('');
    setPhase('looking');

    try {
      const data = await checkinService.lookup(code);
      setTicket(data);
      setUsedAt(data.used_at ?? null);
      if (data.is_used) setPhase('used');
      else if (data.order_status && data.order_status !== 'paid') setPhase('unpaid');
      else setPhase('review');
    } catch (err) {
      setErrorMessage(describeLookupError(err));
      setPhase('error');
    } finally {
      busyRef.current = false;
    }
  };

  const confirm = async () => {
    if (busyRef.current || !ticket) return;
    busyRef.current = true;
    setPhase('confirming');

    try {
      const data = await checkinService.confirm(ticket.ticket_code);
      setUsedAt(data?.used_at ?? new Date().toISOString());
      setPhase('done');
      toast.success(`${ticket.attendee_name} berhasil diregistrasi.`);
    } catch (err) {
      const conflict = err?.data?.data;
      if (err?.status === 409 && conflict?.is_used) {
        // Tiket baru saja dipakai di perangkat lain di antara lookup dan konfirmasi
        setUsedAt(conflict.used_at ?? null);
        setPhase('used');
      } else if (err?.status === 409) {
        setPhase('unpaid');
      } else {
        setPhase('review');
        toast.error(err?.message || 'Gagal menyimpan registrasi. Coba lagi.');
      }
    } finally {
      busyRef.current = false;
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    lookupCode(manualCode, 'manual');
  };

  const primaryBtn =
    'inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ted-red px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#d00023] active:scale-[0.98] disabled:opacity-50';
  const secondaryBtn =
    'inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-2xs transition-colors hover:bg-gray-50 disabled:opacity-50';

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <ScanLine size={22} className="shrink-0 text-ted-red" />
          <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Registrasi Peserta</h1>
        </div>
        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          Scan QR code tiket atau masukkan kode unik 6 karakter untuk meregistrasi peserta.
        </p>
      </div>

      {/* ── Input: scan / manual ── */}
      {phase === 'input' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-gray-100 p-1">
            {TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setMode(key)}
                className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                  mode === key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {mode === 'scan' ? (
            <div className="space-y-3">
              <QrScanner onDetect={(text) => lookupCode(text, 'qr')} />
              <p className={`text-center text-xs ${scanHint ? 'font-medium text-amber-700' : 'text-gray-400'}`}>
                {scanHint || 'Arahkan kamera ke QR code pada tiket peserta.'}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleManualSubmit}
              className="space-y-4 rounded-2xl border border-gray-200/90 bg-white p-5 shadow-sm sm:p-6"
            >
              <div>
                <label htmlFor="checkin-code" className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Kode Tiket
                </label>
                <input
                  id="checkin-code"
                  type="text"
                  value={manualCode}
                  onChange={(e) => {
                    setManualCode(normalizeTicketCode(e.target.value).slice(0, 6));
                    if (manualError) setManualError('');
                  }}
                  placeholder="K7P2QX"
                  autoFocus
                  autoComplete="off"
                  autoCapitalize="characters"
                  spellCheck={false}
                  className={`w-full rounded-xl border px-4 py-3 text-center font-mono text-2xl font-bold uppercase tracking-[0.3em] text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 ${
                    manualError
                      ? 'border-red-300 focus:ring-red-100'
                      : 'border-gray-200 focus:border-gray-400 focus:ring-gray-100'
                  }`}
                />
                {manualError && <p className="mt-1.5 text-xs font-medium text-ted-red">{manualError}</p>}
              </div>
              <button type="submit" disabled={manualCode.length !== 6} className={primaryBtn}>
                <Search size={16} />
                <span>Cari Tiket</span>
              </button>
            </form>
          )}
        </div>
      )}

      {/* ── Loading lookup ── */}
      {phase === 'looking' && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200/90 bg-white p-10 shadow-sm">
          <Loader2 size={28} className="animate-spin text-ted-red" />
          <p className="text-sm text-gray-500">Mencari tiket...</p>
        </div>
      )}

      {/* ── Error lookup ── */}
      {phase === 'error' && (
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
            <XCircle size={20} className="mt-0.5 shrink-0" />
            <p className="text-sm font-medium">{errorMessage}</p>
          </div>
          <button type="button" onClick={reset} className={secondaryBtn}>
            <RotateCcw size={16} />
            <span>Coba Lagi</span>
          </button>
        </div>
      )}

      {/* ── Hasil: review / confirming / done / used / unpaid ── */}
      {ticket && ['review', 'confirming', 'done', 'used', 'unpaid'].includes(phase) && (
        <div className="space-y-4">
          <CheckinTicketCard
            ticket={ticket}
            usedAt={usedAt}
            variant={
              phase === 'done' ? 'success' : phase === 'used' || phase === 'unpaid' ? phase : 'review'
            }
          />

          {(phase === 'review' || phase === 'confirming') && (
            <div className="flex flex-col gap-3">
              <button type="button" onClick={confirm} disabled={phase === 'confirming'} className={primaryBtn}>
                {phase === 'confirming' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Konfirmasi Registrasi</span>
                  </>
                )}
              </button>
              <button type="button" onClick={reset} disabled={phase === 'confirming'} className={secondaryBtn}>
                Batal
              </button>
            </div>
          )}

          {phase === 'done' && (
            <button type="button" onClick={reset} className={primaryBtn}>
              <ScanLine size={16} />
              <span>Scan Peserta Berikutnya</span>
            </button>
          )}

          {(phase === 'used' || phase === 'unpaid') && (
            <button type="button" onClick={reset} className={secondaryBtn}>
              <RotateCcw size={16} />
              <span>Scan Tiket Lain</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
