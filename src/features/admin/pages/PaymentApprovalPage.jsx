import React from "react";
import { CheckCircle2, Search, XCircle } from "lucide-react";
import { useToast } from "../components/Toast";

const formatCurrency = (value = 0) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const statusStyle = {
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  rejected: "bg-red-50 text-red-700 ring-red-200",
};

export default function PaymentApprovalPage() {
  const { showToast } = useToast();
  const [payments, setPayments] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const [loading, setLoading] = React.useState(false);

  // TODO: aktifkan kalau endpoint backend payment sudah tersedia.
  // React.useEffect(() => {
  //   const fetchPayments = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/payments`);
  //       const result = await response.json();
  //       setPayments(result.data ?? []);
  //     } catch (error) {
  //       showToast?.({
  //         type: "error",
  //         message: "Gagal mengambil data pembayaran.",
  //       });
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   fetchPayments();
  // }, [showToast]);

  const filteredPayments = payments.filter((item) => {
    const keyword = `${item.orderCode} ${item.userName} ${item.userEmail} ${item.productName}`.toLowerCase();
    const matchSearch = keyword.includes(search.toLowerCase());
    const matchStatus = status === "all" || item.status === status;
    return matchSearch && matchStatus;
  });

  const updateStatus = (paymentId, nextStatus) => {
    setPayments((prev) =>
      prev.map((item) =>
        item.id === paymentId ? { ...item, status: nextStatus } : item
      )
    );

    showToast?.({
      type: nextStatus === "approved" ? "success" : "warning",
      message:
        nextStatus === "approved"
          ? "Pembayaran berhasil disetujui."
          : "Pembayaran berhasil ditolak.",
    });

    // TODO: nanti sambungkan ke backend:
    // PATCH /admin/payments/:id/approve
    // PATCH /admin/payments/:id/reject
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-950">
          Approval Pembayaran
        </h1>
        <p className="mt-2 text-slate-500">
          Verifikasi bukti pembayaran user berdasarkan produk dan nominal yang
          dibayarkan.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari order, user, atau produk..."
              className="h-12 w-full rounded-xl border border-slate-200 pl-12 pr-4 text-sm outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
            />
          </div>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-12 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
          >
            <option value="all">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400">
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Produk</th>
                <th className="px-4 py-3">Nominal</th>
                <th className="px-4 py-3">Bukti</th>
                <th className="px-4 py-3">Validasi</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading && (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center text-slate-400">
                    Memuat data pembayaran...
                  </td>
                </tr>
              )}

              {!loading && filteredPayments.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center">
                    <p className="text-base font-bold text-slate-500">
                      Belum ada request pembayaran.
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Data akan muncul setelah user membeli produk dan
                      mengupload bukti pembayaran.
                    </p>
                  </td>
                </tr>
              )}

              {!loading &&
                filteredPayments.map((payment) => {
                  const isAmountValid =
                    payment.expectedAmount === payment.submittedAmount;

                  return (
                    <tr key={payment.id} className="text-sm">
                      <td className="px-4 py-4">
                        <p className="font-bold text-slate-950">
                          {payment.orderCode}
                        </p>
                        <p className="text-xs text-slate-400">
                          {payment.requestedAt}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <p className="font-bold text-slate-950">
                          {payment.userName}
                        </p>
                        <p className="text-xs text-slate-400">
                          {payment.userEmail}
                        </p>
                      </td>

                      <td className="px-4 py-4 font-semibold text-slate-700">
                        {payment.productName}
                      </td>

                      <td className="px-4 py-4">
                        <p className="font-bold text-slate-950">
                          {formatCurrency(payment.submittedAmount)}
                        </p>
                        <p className="text-xs text-slate-400">
                          Seharusnya {formatCurrency(payment.expectedAmount)}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        {payment.proofUrl ? (
                          <a
                            href={payment.proofUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-12 w-40 items-center justify-center rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                          >
                            Lihat bukti
                          </a>
                        ) : (
                          <div className="flex h-12 w-40 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-xs font-semibold text-slate-400">
                            Belum ada bukti
                          </div>
                        )}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ${
                            isAmountValid
                              ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                              : "bg-red-50 text-red-700 ring-red-200"
                          }`}
                        >
                          {isAmountValid ? "Nominal sesuai" : "Nominal beda"}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ring-1 ${statusStyle[payment.status]}`}
                        >
                          {payment.status}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            disabled={payment.status !== "pending"}
                            onClick={() => updateStatus(payment.id, "approved")}
                            className="inline-flex h-10 items-center gap-2 rounded-xl bg-emerald-600 px-3 font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Approve
                          </button>

                          <button
                            disabled={payment.status !== "pending"}
                            onClick={() => updateStatus(payment.id, "rejected")}
                            className="inline-flex h-10 items-center gap-2 rounded-xl bg-red-600 px-3 font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                          >
                            <XCircle className="h-4 w-4" />
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}