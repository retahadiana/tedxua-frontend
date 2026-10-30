import React from 'react';
import { User, Mail, Phone, Layers, Ticket as TicketIcon, CheckCircle2, AlertTriangle } from 'lucide-react';

// ============================================================================
// CHECK-IN TICKET CARD — Ringkasan tiket peserta setelah scan / input kode
// ============================================================================
// Props:
//   ticket: { ticket_code, attendee_name, attendee_email, attendee_phone,
//             tier_name, ticket_name }
//   variant: 'review' | 'success' | 'used' | 'unpaid'
//   usedAt?: string (ISO)  ditampilkan pada varian 'used' / 'success'
// ============================================================================

const BANNERS = {
  success: {
    icon: CheckCircle2,
    tone: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    title: 'Registrasi berhasil',
  },
  used: {
    icon: AlertTriangle,
    tone: 'bg-amber-50 text-amber-800 border-amber-300',
    title: 'Tiket sudah digunakan',
  },
  unpaid: {
    icon: AlertTriangle,
    tone: 'bg-red-50 text-red-700 border-red-200',
    title: 'Pesanan belum lunas',
  },
};

const formatDateTime = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
};

function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
        <Icon size={16} />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">{label}</p>
        <p className="break-words text-sm font-medium text-gray-900">{value || '-'}</p>
      </div>
    </div>
  );
}

export default function CheckinTicketCard({ ticket, variant = 'review', usedAt }) {
  const banner = BANNERS[variant];
  const BannerIcon = banner?.icon;
  const when = formatDateTime(usedAt);

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-sm">
      {banner && (
        <div className={`flex items-start gap-2.5 border-b px-5 py-3.5 ${banner.tone}`}>
          <BannerIcon size={18} className="mt-0.5 shrink-0" />
          <div className="text-sm">
            <p className="font-bold">{banner.title}</p>
            {variant === 'used' && (
              <p className="text-xs opacity-90">
                {when ? `Sudah dipakai pada ${when}.` : 'Tiket ini sudah pernah dipakai.'} Tidak bisa dipakai lagi.
              </p>
            )}
            {variant === 'success' && when && <p className="text-xs opacity-90">Tercatat pada {when}.</p>}
            {variant === 'unpaid' && (
              <p className="text-xs opacity-90">Tiket belum bisa dipakai sebelum pembayaran disetujui.</p>
            )}
          </div>
        </div>
      )}

      <div className="px-5 pt-5 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Kode Tiket</p>
        <p className="mt-1 font-mono text-4xl font-bold tracking-[0.3em] text-gray-900 sm:text-5xl">
          {ticket.ticket_code}
        </p>
      </div>

      <div className="mt-4 divide-y divide-gray-100 px-5 pb-2">
        <Row icon={User} label="Nama di tiket" value={ticket.attendee_name} />
        <Row icon={Mail} label="Email" value={ticket.attendee_email} />
        <Row icon={Phone} label="No. HP" value={ticket.attendee_phone} />
        <Row icon={Layers} label="Tier tiket" value={ticket.tier_name} />
        <Row icon={TicketIcon} label="Nama tiket" value={ticket.ticket_name} />
      </div>
    </div>
  );
}
