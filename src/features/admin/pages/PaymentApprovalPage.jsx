import React from "react";
import { CheckCircle2, Search, XCircle, RefreshCw, Mail } from "lucide-react";
import { useToast } from "../components/Toast";
import { apiRequest } from "../../../services/api";

// ============================================================================
// PAYMENT APPROVAL PAGE — Admin verifikasi bukti pembayaran tiket
// Endpoint BE:
//   GET    /orders/admin/all           — list semua order (query: status, page, per_page)
//   PATCH  /orders/:id/approve         — approve order (kirim email tiket otomatis)
//   PATCH  /orders/:id/reject          — reject order  (body: { reason: string })
//   POST   /orders/:id/resend-email    — resend email tiket ke attendee
// ============================================================================

const formatCurrency = (value) => {
  const num = typeof value === "string" ? parseFloat(value) : Number(value ?? 0);
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);
};

const formatDate = (iso) => {
  if (!iso) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
};

const STATUS_STYLE = {
  pending:            "bg-amber-50 text-amber-700 ring-amber-200",
  awaiting_approval:  "bg-amber-50 text-amber-700 ring-amber-200",
  approved:           "bg-emerald-50 text-emerald-700 ring-emerald-200",
  rejected:           "bg-red-50 text-red-700 ring-red-200",
  expired:            "bg-slate-100 text-slate-500 ring-slate-200",
};

const STATUS_LABEL = {
  pending:            "Pending",
  awaiting_approval:  "Menunggu Approval",
  approved:           "Approved",
  rejected:           "Rejected",
  expired:            "Expired",
};

export default function PaymentApprovalPage() {
  const { showToast } = useToast();

  const [orders, setOrders] = React.useState([]);
  const [meta, setMeta] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("awaiting_approval");
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  // State untuk modal reject reason
  const [rejectTarget, setRejectTarget] = React.useState(null); // { id, order_number }
  const [rejectReason, setRejectReason] = React.useState("");
  const [rejectLoading, setRejectLoading] = React.useState(false);

  // ── Fetch orders dari backend ──────────────────────────────────────────────
  const fetchOrders = React.useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({ page, per_page: 20 });
      if (statusFilter !== "all") query.set("status", statusFilter);
      const result = await apiRequest(`/orders/admin/all?${query}`);
      setOrders(result.data?.data ?? []);
      setMeta(result.data?.meta ?? null);
    } catch (error) {
      showToast?.({ type: "error", message: "Gagal memuat data order: " + error.message });
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, showToast]);

  React.useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // ── Approve ────────────────────────────────────────────────────────────────
  const handleApprove = async (orderId, orderNumber) => {
    if (!confirm(`Approve order ${orderNumber}? Email tiket akan otomatis dikirim ke pembeli.`)) return;
    try {
      await apiRequest(`/orders/${orderId}/approve`, { method: "PATCH" });
      showToast?.({ type: "success", message: `Order ${orderNumber} berhasil di-approve. Email tiket terkirim.` });
      fetchOrders();
    } catch (error) {
      showToast?.({ type: "error", message: "Gagal approve: " + error.message });
    }
  };

  // ── Reject (buka modal) ────────────────────────────────────────────────────
  const openRejectModal = (order) => {
    setRejectTarget({ id: order.id, order_number: order.order_number });
    setRejectReason("");
  };

  const handleRejectConfirm = async () => {
    if (!rejectReason.trim()) {
      showToast?.({ type: "error", message: "Alasan penolakan wajib diisi." });
      return;
    }
    setRejectLoading(true);
    try {
      await apiRequest(`/orders/${rejectTarget.id}/reject`, {
        method: "PATCH",
        body: JSON.stringify({ reason: rejectReason.trim() }),
      });
      showToast?.({ type: "warning", message: `Order ${rejectTarget.order_number} ditolak.` });
      setRejectTarget(null);
      fetchOrders();
    } catch (error) {
      showToast?.({ type: "error", message: "Gagal reject: " + error.message });
    } finally {
      setRejectLoading(false);
    }
  };

  // ── Resend email ───────────────────────────────────────────────────────────
  const handleResendEmail = async (orderId, orderNumber) => {
    try {
      await apiRequest(`/orders/${orderId}/resend-email`, { method: "POST" });
      showToast?.({ type: "success", message: `Email tiket untuk order ${orderNumber} berhasil dikirim ulang.` });
    } catch (error) {
      showToast?.({ type: "error", message: "Gagal resend email: " + error.message });
    }
  };

  // ── Client-side search filter ─────────────────────────────────────────────
  const filteredOrders = orders.filter((order) => {
    if (!search.trim()) return true;
    const kw = search.toLowerCase();
    return (
      order.order_number?.toLowerCase().includes(kw) ||
      order.id?.toLowerCase().includes(kw)
    );
  });

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950">Approval Pembayaran</h1>
          <p className="mt-2 text-slate-500">
            Verifikasi bukti pembayaran tiket. Approve untuk kirim e-ticket, Reject untuk tolak dengan alasan.
          </p>
        </div>
        <button
          onClick={fetchOrders}
          disabled={loading}
          title="Refresh"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        {/* Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari order number atau ID..."
              className="h-12 w-full rounded-xl border border-slate-200 pl-12 pr-4 text-sm outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="h-12 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
          >
            <option value="all">Semua Status</option>
            <option value="awaiting_approval">Menunggu Approval</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400">
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Qty</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Bukti Bayar</th>
                <th className="px-4 py-3">Expired At</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading && (
                <tr>
                  <td colSpan={7} className="px-4 py-16 text-center text-slate-400">
                    Memuat data order...
                  </td>
                </tr>
              )}

              {!loading && filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-16 text-center">
                    <p className="text-base font-bold text-slate-500">Tidak ada order ditemukan.</p>
                    <p className="mt-1 text-sm text-slate-400">
                      {statusFilter === "awaiting_approval"
                        ? "Belum ada pembayaran yang menunggu approval."
                        : "Coba ubah filter status atau kata kunci pencarian."}
                    </p>
                  </td>
                </tr>
              )}

              {!loading &&
                filteredOrders.map((order) => {
                  const isAwaitingApproval = order.status === "awaiting_approval";
                  const isApproved = order.status === "approved";

                  return (
                    <tr key={order.id} className="text-sm">
                      {/* Order */}
                      <td className="px-4 py-4">
                        <p className="font-bold text-slate-950">{order.order_number}</p>
                        <p className="text-xs text-slate-400 font-mono">{order.id?.slice(0, 8)}…</p>
                      </td>

                      {/* Qty */}
                      <td className="px-4 py-4 font-semibold text-slate-700">
                        {order.quantity}x
                      </td>

                      {/* Total */}
                      <td className="px-4 py-4">
                        <p className="font-bold text-slate-950">{formatCurrency(order.total_amount)}</p>
                        <p className="text-xs text-slate-400">{formatCurrency(order.unit_price)}/pcs</p>
                      </td>

                      {/* Bukti */}
                      <td className="px-4 py-4">
                        {order.payment_proof_url ? (
                          <a
                            href={order.payment_proof_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                          >
                            Lihat bukti ↗
                          </a>
                        ) : (
                          <span className="inline-flex h-9 items-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 text-xs font-semibold text-slate-400">
                            Belum ada
                          </span>
                        )}
                      </td>

                      {/* Expired */}
                      <td className="px-4 py-4 text-xs text-slate-500">
                        {formatDate(order.expired_at)}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ring-1 ${STATUS_STYLE[order.status] ?? "bg-slate-100 text-slate-500 ring-slate-200"}`}
                        >
                          {STATUS_LABEL[order.status] ?? order.status}
                        </span>
                      </td>

                      {/* Aksi */}
                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          {/* Approve */}
                          <button
                            disabled={!isAwaitingApproval}
                            onClick={() => handleApprove(order.id, order.order_number)}
                            title="Approve & kirim e-ticket"
                            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-emerald-600 px-3 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                          >
                            <CheckCircle2 size={14} />
                            Approve
                          </button>

                          {/* Reject */}
                          <button
                            disabled={!isAwaitingApproval}
                            onClick={() => openRejectModal(order)}
                            title="Reject pembayaran"
                            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-red-600 px-3 text-xs font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                          >
                            <XCircle size={14} />
                            Reject
                          </button>

                          {/* Resend email — hanya untuk approved */}
                          {isApproved && (
                            <button
                              onClick={() => handleResendEmail(order.id, order.order_number)}
                              title="Kirim ulang email tiket"
                              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                            >
                              <Mail size={14} />
                              Resend
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {meta && meta.max_page > 1 && (
          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-500">
            <span>
              Total {meta.total} order • Halaman {meta.page} dari {meta.max_page}
            </span>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="h-9 rounded-lg border border-slate-200 px-4 font-semibold transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Prev
              </button>
              <button
                disabled={page >= meta.max_page}
                onClick={() => setPage((p) => p + 1)}
                className="h-9 rounded-lg border border-slate-200 px-4 font-semibold transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Modal Reject Reason ────────────────────────────────────────────── */}
      {rejectTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-black text-slate-950">Tolak Order</h2>
            <p className="mt-1 text-sm text-slate-500">
              Order: <span className="font-bold text-slate-800">{rejectTarget.order_number}</span>
            </p>

            <label className="mt-4 block">
              <span className="text-sm font-semibold text-slate-700">
                Alasan penolakan <span className="text-red-500">*</span>
              </span>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={3}
                placeholder="Contoh: Bukti pembayaran tidak jelas / nominal tidak sesuai..."
                className="mt-1.5 w-full rounded-xl border border-slate-200 p-3 text-sm outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10 resize-none"
              />
            </label>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setRejectTarget(null)}
                disabled={rejectLoading}
                className="h-10 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
              >
                Batal
              </button>
              <button
                onClick={handleRejectConfirm}
                disabled={rejectLoading || !rejectReason.trim()}
                className="h-10 rounded-xl bg-red-600 px-5 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {rejectLoading ? "Memproses..." : "Konfirmasi Tolak"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}