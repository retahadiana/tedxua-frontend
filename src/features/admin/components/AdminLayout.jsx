import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

// ============================================================================
// ADMIN LAYOUT — Shell wrapper untuk semua halaman admin
// ============================================================================
// Menyediakan: Sidebar (mobile drawer + desktop collapsible) + Header + Content area
// ============================================================================

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-gray-900">
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <AdminSidebar
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(prev => !prev)}
      />

      {/* Main content container with responsive left margin matching sidebar */}
      <div
        className={`flex flex-1 flex-col overflow-hidden w-full min-w-0 transition-all duration-300 ${
          sidebarCollapsed ? 'md:ml-[72px]' : 'md:ml-64'
        }`}
      >
        <AdminHeader
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => {
            // Di layar mobile buka drawer, di desktop toggle collapse
            if (window.innerWidth < 768) {
              setMobileOpen(prev => !prev);
            } else {
              setSidebarCollapsed(prev => !prev);
            }
          }}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10 w-full min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
