import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Menu, ChevronRight } from 'lucide-react';

// ============================================================================
// ADMIN HEADER — Top bar dengan breadcrumb dan info user
// ============================================================================

const BREADCRUMB_MAP = {
  '/admin': 'Dashboard',
  '/admin/bundles': 'Bundles',
  '/admin/bundles/create': 'Create Bundle',
  '/admin/merchandise': 'Merchandise',
  '/admin/merchandise/create': 'Create Merchandise',
  '/admin/users': 'Users',
};

function getBreadcrumbs(pathname) {
  const crumbs = [{ label: 'Dashboard', path: '/admin' }];
  
  if (pathname === '/admin') return crumbs;

  const segments = pathname.replace('/admin/', '').split('/');
  let currentPath = '/admin';

  for (const seg of segments) {
    currentPath += `/${seg}`;
    const label = BREADCRUMB_MAP[currentPath]
      || (seg === 'create' ? 'Create'
        : seg === 'edit' ? 'Edit'
          : seg);
    crumbs.push({ label, path: currentPath });
  }

  return crumbs;
}

export default function AdminHeader({ sidebarCollapsed, onToggleSidebar }) {
  const { user } = useAuth();
  const location = useLocation();
  const breadcrumbs = getBreadcrumbs(location.pathname);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
      {/* Left: collapse/mobile toggle + breadcrumb */}
      <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
          title="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>

        <nav className="flex items-center gap-1.5 text-xs sm:text-sm overflow-hidden text-ellipsis whitespace-nowrap">
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={crumb.path}>
              {i > 0 && <ChevronRight size={13} className="text-gray-400 shrink-0" />}
              {i === breadcrumbs.length - 1 ? (
                <span className="font-semibold text-gray-900 truncate">{crumb.label}</span>
              ) : (
                <span className="text-gray-500 font-normal hover:text-gray-700 transition-colors hidden sm:inline">
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Right: user info */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-gray-900 leading-tight">{user?.name || 'Admin'}</p>
          <p className="text-xs text-gray-400">{user?.email || 'admin@tedxua.com'}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white shadow-sm ring-2 ring-gray-100">
          {(user?.name || 'A').charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
