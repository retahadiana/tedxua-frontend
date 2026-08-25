import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LayoutDashboard, Package, ShoppingBag, Users, Globe, LogOut, X } from 'lucide-react';

// ============================================================================
// ADMIN SIDEBAR — Navigasi utama admin panel
// ============================================================================

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Bundles', path: '/admin/bundles', icon: Package },
  { label: 'Merchandise', path: '/admin/merchandise', icon: ShoppingBag },
  { label: 'Users', path: '/admin/users', icon: Users },
];

export default function AdminSidebar({ isOpen, onClose, collapsed, onToggle }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    onClose?.();
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-gray-900 text-white transition-all duration-300 ease-in-out select-none shadow-xl md:shadow-none ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } ${collapsed ? 'md:w-[72px]' : 'md:w-64'} w-64`}
    >
      {/* Logo / Brand & Mobile Close Button */}
      <div className="flex h-16 items-center justify-between border-b border-gray-800 px-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ted-red text-white font-bold shadow-sm">
            <span className="text-base tracking-tighter">X</span>
          </div>
          {(!collapsed || isOpen) && (
            <div className="overflow-hidden">
              <div className="flex items-center gap-1 font-bold text-sm leading-tight tracking-tight">
                <span className="text-ted-red">TEDx</span>
                <span className="text-white text-xs font-medium">Unair</span>
              </div>
              <p className="truncate text-[11px] text-gray-400 font-normal">Admin Panel</p>
            </div>
          )}
        </div>

        {/* Mobile Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white md:hidden"
          title="Tutup Menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 flex flex-1 flex-col gap-1.5 px-3 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all relative ${
                  isActive
                    ? 'bg-ted-red/15 text-white font-semibold before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-1 before:rounded-r before:bg-ted-red'
                    : 'text-gray-400 hover:bg-gray-800/60 hover:text-gray-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={20}
                    className={`shrink-0 transition-colors ${
                      isActive ? 'text-ted-red' : 'text-gray-400 group-hover:text-gray-200'
                    }`}
                  />
                  {(!collapsed || isOpen) && <span className="truncate">{item.label}</span>}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-gray-800 p-3 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-400 transition-colors hover:bg-gray-800/60 hover:text-gray-200"
        >
          <Globe size={18} className="shrink-0 text-gray-400" />
          {(!collapsed || isOpen) && <span className="truncate">Lihat Website</span>}
        </a>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-400 transition-colors hover:bg-ted-red/10 hover:text-ted-red"
        >
          <LogOut size={18} className="shrink-0" />
          {(!collapsed || isOpen) && <span className="truncate">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
