import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Globe,
  LogOut,
  X,
  ChevronDown,
  Tag,
  ListOrdered,
} from 'lucide-react';

// ============================================================================
// ADMIN SIDEBAR — Navigasi utama admin panel (dengan Submenu Accordion)
// ============================================================================

export default function AdminSidebar({ isOpen, onClose, collapsed, onToggle }) {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Cek apakah user sedang aktif di modul Merchandise
  const isMerchActive = location.pathname.startsWith('/admin/merchandise');
  const [merchDropdownOpen, setMerchDropdownOpen] = useState(isMerchActive);

  // Buka dropdown otomatis jika rute berpindah ke merchandise
  useEffect(() => {
    if (isMerchActive) {
      setMerchDropdownOpen(true);
    }
  }, [location.pathname, isMerchActive]);

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

      {/* Navigation Links */}
      <nav className="mt-4 flex flex-1 flex-col gap-1 px-3 overflow-y-auto">
        {/* 1. Dashboard */}
        <NavLink
          to="/admin"
          end
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
              <LayoutDashboard
                size={20}
                className={`shrink-0 transition-colors ${
                  isActive ? 'text-ted-red' : 'text-gray-400 group-hover:text-gray-200'
                }`}
              />
              {(!collapsed || isOpen) && <span className="truncate">Dashboard</span>}
            </>
          )}
        </NavLink>

        {/* 2. Bundles */}
        <NavLink
          to="/admin/bundles"
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
              <Package
                size={20}
                className={`shrink-0 transition-colors ${
                  isActive ? 'text-ted-red' : 'text-gray-400 group-hover:text-gray-200'
                }`}
              />
              {(!collapsed || isOpen) && <span className="truncate">Bundles</span>}
            </>
          )}
        </NavLink>

        {/* 3. Merchandise (Accordion Dropdown) */}
        <div className="flex flex-col">
          <button
            type="button"
            onClick={() => setMerchDropdownOpen(prev => !prev)}
            className={`group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all relative ${
              isMerchActive
                ? 'bg-gray-800/80 text-white font-semibold'
                : 'text-gray-400 hover:bg-gray-800/60 hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <ShoppingBag
                size={20}
                className={`shrink-0 transition-colors ${
                  isMerchActive ? 'text-ted-red' : 'text-gray-400 group-hover:text-gray-200'
                }`}
              />
              {(!collapsed || isOpen) && <span className="truncate">Merchandise</span>}
            </div>
            {(!collapsed || isOpen) && (
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform duration-200 ${
                  merchDropdownOpen ? 'rotate-180 text-white' : ''
                }`}
              />
            )}
          </button>

          {/* Submenu Accordion Items */}
          {(!collapsed || isOpen) && merchDropdownOpen && (
            <div className="mt-1 flex flex-col gap-0.5 pl-4 border-l border-gray-800/80 ml-5 py-1">
              <NavLink
                to="/admin/merchandise"
                end
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-ted-red/15 text-ted-red font-semibold'
                      : 'text-gray-400 hover:bg-gray-800/40 hover:text-gray-200'
                  }`
                }
              >
                <ListOrdered size={14} className="shrink-0" />
                <span className="truncate">Semua Merchandise</span>
              </NavLink>

              <NavLink
                to="/admin/merchandise/categories"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-ted-red/15 text-ted-red font-semibold'
                      : 'text-gray-400 hover:bg-gray-800/40 hover:text-gray-200'
                  }`
                }
              >
                <Tag size={14} className="shrink-0" />
                <span className="truncate">Kelola Kategori</span>
              </NavLink>
            </div>
          )}
        </div>

        {/* 4. Users */}
        <NavLink
          to="/admin/users"
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
              <Users
                size={20}
                className={`shrink-0 transition-colors ${
                  isActive ? 'text-ted-red' : 'text-gray-400 group-hover:text-gray-200'
                }`}
              />
              {(!collapsed || isOpen) && <span className="truncate">Users</span>}
            </>
          )}
        </NavLink>
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
