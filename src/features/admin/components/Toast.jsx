import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

// ============================================================================
// TOAST SYSTEM — Notifikasi sukses/gagal/info
// ============================================================================

const ToastContext = createContext(null);

const TOAST_VARIANTS = {
  success: { bg: 'bg-emerald-50 border-emerald-200', icon: CheckCircle2, iconColor: 'text-emerald-600', text: 'text-emerald-800' },
  error: { bg: 'bg-red-50 border-red-200', icon: AlertCircle, iconColor: 'text-ted-red', text: 'text-red-800' },
  warning: { bg: 'bg-amber-50 border-amber-200', icon: AlertTriangle, iconColor: 'text-amber-600', text: 'text-amber-800' },
  info: { bg: 'bg-blue-50 border-blue-200', icon: Info, iconColor: 'text-blue-600', text: 'text-blue-800' },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev.slice(-2), { id, message, type }]); // max 3 visible

    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = {
    success: (msg) => addToast(msg, 'success'),
    error: (msg) => addToast(msg, 'error'),
    warning: (msg) => addToast(msg, 'warning'),
    info: (msg) => addToast(msg, 'info'),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toast container — fixed di pojok kanan atas */}
      <div className="fixed right-4 top-4 z-[9999] flex flex-col gap-2 w-[380px]">
        <AnimatePresence>
          {toasts.map(t => {
            const variant = TOAST_VARIANTS[t.type] || TOAST_VARIANTS.info;
            const Icon = variant.icon;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 80, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 80, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 shadow-xl ${variant.bg}`}
              >
                <Icon size={18} className={`mt-0.5 shrink-0 ${variant.iconColor}`} />
                <p className={`flex-1 text-sm font-medium leading-snug ${variant.text}`}>
                  {t.message}
                </p>
                <button
                  type="button"
                  onClick={() => removeToast(t.id)}
                  className="shrink-0 rounded p-0.5 text-gray-400 hover:bg-black/5 hover:text-gray-600 transition-colors"
                >
                  <X size={15} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast harus digunakan di dalam <ToastProvider>');
  return context;
}
