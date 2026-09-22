import React from 'react';

// ============================================================================
// STATUS BADGE — Badge warna untuk role/category/status
// ============================================================================

const VARIANTS = {
  // Roles
  admin: 'bg-red-100 text-red-700',
  user: 'bg-gray-100 text-gray-600',
  // Categories
  't-shirt': 'bg-blue-100 text-blue-700',
  cap: 'bg-emerald-100 text-emerald-700',
  sticker: 'bg-amber-100 text-amber-700',
  other: 'bg-purple-100 text-purple-700',
  // Status
  active: 'bg-emerald-100 text-emerald-700',
  inactive: 'bg-gray-100 text-gray-500',
  verified: 'bg-emerald-100 text-emerald-700',
  unverified: 'bg-amber-100 text-amber-700',
};

export default function StatusBadge({ value, className = '' }) {
  const variant = VARIANTS[value?.toLowerCase()] || VARIANTS.other;
  
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${variant} ${className}`}>
      {value}
    </span>
  );
}
