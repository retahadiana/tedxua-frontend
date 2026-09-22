import React from 'react';
import { Inbox } from 'lucide-react';

// ============================================================================
// DATA TABLE — Komponen tabel reusable untuk admin panel
// ============================================================================
// Props:
//   columns: Array<{ key, label, render?, className? }>
//   data: Array<Object>
//   onRowClick?: (row) => void
//   emptyMessage?: string
//   isLoading?: boolean
// ============================================================================

function SkeletonRow({ colCount }) {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: colCount }).map((_, i) => (
        <td key={i} className="px-5 py-4">
          <div className="h-4 rounded bg-gray-200" style={{ width: `${50 + Math.random() * 40}%` }} />
        </td>
      ))}
    </tr>
  );
}

export default function DataTable({ columns, data, onRowClick, emptyMessage = 'Belum ada data.', isLoading = false }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200/90 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          {/* Header */}
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/80">
              {columns.map(col => (
                <th
                  key={col.key}
                  className={`px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 ${col.className || ''}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              // Skeleton loading
              Array.from({ length: 5 }).map((_, i) => (
                <SkeletonRow key={i} colCount={columns.length} />
              ))
            ) : data.length === 0 ? (
              // Empty state
              <tr>
                <td colSpan={columns.length} className="px-5 py-14 text-center">
                  <div className="flex flex-col items-center justify-center gap-2.5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                      <Inbox size={24} />
                    </div>
                    <p className="text-sm font-medium text-gray-500">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              // Data rows
              data.map((row, rowIdx) => (
                <tr
                  key={row.id || rowIdx}
                  onClick={() => onRowClick?.(row)}
                  className={`transition-colors duration-150 ${
                    onRowClick ? 'cursor-pointer hover:bg-slate-50/80' : 'hover:bg-slate-50/40'
                  }`}
                >
                  {columns.map(col => (
                    <td key={col.key} className={`px-5 py-4 text-gray-700 align-middle ${col.className || ''}`}>
                      {col.render ? col.render(row, rowIdx) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
