import { useEffect, useState } from 'react';
import { createReferralCode, deleteReferralCode, listReferralCodes, setReferralActive } from '../../../services/referralService';

export default function ReferralCodesPage() {
  const [codes, setCodes] = useState([]);
  const [form, setForm] = useState({ code: '', discount_per_ticket: '', quota: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      setCodes(await listReferralCodes());
      setError('');
    } catch (err) {
      setError(err?.response?.data?.error || 'Gagal memuat kode referral.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  const submit = async (event) => {
    event.preventDefault();
    try {
      await createReferralCode({ ...form, quota: Number(form.quota) });
      setForm({ code: '', discount_per_ticket: '', quota: '' });
      await refresh();
    } catch (err) {
      setError(err?.response?.data?.error || 'Gagal membuat kode referral.');
    }
  };

  const toggle = async (code) => {
    try {
      await setReferralActive(code.id, !code.is_active);
      await refresh();
    } catch (err) {
      setError(err?.response?.data?.error || 'Gagal mengubah status kode referral.');
    }
  };

  const archive = async (code) => {
    if (!window.confirm(`Arsipkan kode referral ${code.code}? Kode ini tidak akan bisa digunakan lagi.`)) return;
    try {
      await deleteReferralCode(code.id);
      await refresh();
    } catch (err) {
      setError(err?.response?.data?.error || 'Gagal mengarsipkan kode referral.');
    }
  };

  return (
    <main className="p-6 text-white">
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">Kode Referral</h1>
      {error && <p role="alert" className="mb-4 rounded bg-red-900/60 p-3">{error}</p>}
      <form onSubmit={submit} className="mb-8 grid max-w-3xl gap-3 rounded-xl bg-gray-900 p-4 md:grid-cols-4">
        <label className="grid gap-1 text-sm">Kode<input required maxLength={100} value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="rounded px-3 py-2 text-black" /></label>
        <label className="grid gap-1 text-sm">Diskon per tiket<input required type="number" min="0.01" step="0.01" value={form.discount_per_ticket} onChange={(e) => setForm({ ...form, discount_per_ticket: e.target.value })} className="rounded px-3 py-2 text-black" /></label>
        <label className="grid gap-1 text-sm">Jatah tiket<input required type="number" min="1" step="1" value={form.quota} onChange={(e) => setForm({ ...form, quota: e.target.value })} className="rounded px-3 py-2 text-black" /></label>
        <button className="self-end rounded bg-red-800 px-4 py-2 font-bold">Buat kode</button>
      </form>
      {loading ? <p>Memuat…</p> : (
        <div className="overflow-x-auto rounded-xl bg-gray-900">
          <table className="w-full text-left text-sm">
            <thead><tr className="border-b border-gray-700"><th className="p-3">Kode</th><th className="p-3">Diskon/tiket</th><th className="p-3">Jatah</th><th className="p-3">Ditahan</th><th className="p-3">Tersisa</th><th className="p-3">Status</th><th className="p-3">Aksi</th></tr></thead>
            <tbody>{codes.map((code) => <tr key={code.id} className="border-b border-gray-800"><td className="p-3 font-bold">{code.code}</td><td className="p-3">Rp {code.discount_per_ticket}</td><td className="p-3">{code.quota}</td><td className="p-3">{code.quota_held}</td><td className="p-3">{code.quota_remaining}</td><td className="p-3">{code.is_active ? 'Aktif' : 'Nonaktif'}</td><td className="flex gap-2 p-3"><button type="button" onClick={() => toggle(code)} className="rounded border border-gray-600 px-3 py-1">{code.is_active ? 'Nonaktifkan' : 'Aktifkan'}</button><button type="button" onClick={() => archive(code)} className="rounded border border-red-700 px-3 py-1 text-red-300">Hapus</button></td></tr>)}</tbody>
          </table>
          {!codes.length && <p className="p-4 text-gray-400">Belum ada kode referral.</p>}
        </div>
      )}
    </main>
  );
}
