import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ============================================================================
// PAGINATION — Komponen navigasi halaman untuk tabel ber-paginasi
// ============================================================================
// Props:
//   page: number (halaman saat ini, 1-indexed)
//   maxPage: number (total halaman)
//   total: number (total item)
//   perPage: number
//   onPageChange: (newPage: number) => void
// ============================================================================

export default function Pagination({ page, maxPage, total, perPage, onPageChange }) {
  if (maxPage <= 1) return null;

  // Generate page numbers to display (max 5 visible)
  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, page - 2);
    let end = Math.min(maxPage, start + 4);
    start = Math.max(1, end - 4);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between pt-2">
      {/* Info */}
      <p className="text-xs text-gray-500 font-medium">
        Menampilkan <span className="font-semibold text-gray-700">{((page - 1) * perPage) + 1}–{Math.min(page * perPage, total)}</span> dari <span className="font-semibold text-gray-700">{total}</span> data
      </p>

      {/* Navigation */}
      <div className="flex items-center gap-1.5">
        {/* Previous */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="flex h-9 items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Page numbers */}
        {pageNumbers[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              1
            </button>
            {pageNumbers[0] > 2 && <span className="px-1 text-gray-400 text-xs">…</span>}
          </>
        )}

        {pageNumbers.map(p => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-semibold transition-all ${
              p === page
                ? 'bg-gray-900 text-white shadow-sm ring-1 ring-gray-900'
                : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            {p}
          </button>
        ))}

        {pageNumbers[pageNumbers.length - 1] < maxPage && (
          <>
            {pageNumbers[pageNumbers.length - 1] < maxPage - 1 && <span className="px-1 text-gray-400 text-xs">…</span>}
            <button
              onClick={() => onPageChange(maxPage)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              {maxPage}
            </button>
          </>
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= maxPage}
          className="flex h-9 items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
