// Format angka ke mata uang Rupiah standar (contoh: Rp10.000, Rp35.000).
export function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}