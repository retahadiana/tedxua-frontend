// ============================================================================
// ADMIN FEATURE — Public API (Feature-Driven Design gate)
// ============================================================================
// Hanya file ini yang boleh di-import dari luar folder admin/.
// Sesuai aturan arsitektur di README.md.
// ============================================================================

export { default as DashboardPage } from './pages/DashboardPage';
export { default as BundleListPage } from './pages/BundleListPage';
export { default as BundleFormPage } from './pages/BundleFormPage';
export { default as MerchListPage } from './pages/MerchListPage';
export { default as MerchFormPage } from './pages/MerchFormPage';
export { default as UserListPage } from './pages/UserListPage';
export { default as UserDetailPage } from './pages/UserDetailPage';

export { default as AdminRoute } from './components/AdminRoute';
export { default as AdminLayout } from './components/AdminLayout';
export { ToastProvider, useToast } from './components/Toast';
