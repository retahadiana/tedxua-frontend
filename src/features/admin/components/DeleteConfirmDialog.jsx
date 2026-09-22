import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2, Loader2 } from 'lucide-react';

// ============================================================================
// DELETE CONFIRM DIALOG — Modal konfirmasi untuk destructive actions
// ============================================================================
// Props:
//   isOpen: boolean
//   onClose: () => void
//   onConfirm: () => Promise<void>
//   title: string (contoh: 'Hapus Bundle "Bundle Premium"?')
//   itemName: string (nama item yang harus diketik ulang)
//   description?: string
// ============================================================================

export default function DeleteConfirmDialog({ isOpen, onClose, onConfirm, title, itemName, description }) {
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const isMatch = confirmText.trim().toLowerCase() === (itemName || '').trim().toLowerCase();

  const handleConfirm = async () => {
    if (!isMatch) return;
    setIsDeleting(true);
    try {
      await onConfirm();
      setConfirmText('');
      onClose();
    } catch (err) {
      // Error handling dilakukan di parent via toast
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    if (isDeleting) return;
    setConfirmText('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="relative z-10 w-full max-w-[440px] rounded-2xl bg-white p-6 shadow-2xl mx-auto"
          >
            {/* Warning icon */}
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <AlertTriangle size={24} />
            </div>

            <h3 className="text-center text-lg font-bold text-gray-900">{title}</h3>

            <p className="mt-2 text-center text-sm text-gray-500">
              {description || 'Aksi ini tidak dapat dibatalkan. Semua data terkait akan dihapus secara permanen.'}
            </p>

            {/* Confirmation input */}
            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700">
                Ketik <span className="font-bold text-red-600">"{itemName}"</span> untuk konfirmasi:
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder={itemName}
                disabled={isDeleting}
                className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 placeholder:text-gray-300 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 disabled:opacity-50"
                autoFocus
              />
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleClose}
                disabled={isDeleting}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={handleConfirm}
                disabled={!isMatch || isDeleting}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-ted-red px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40 shadow-sm"
              >
                {isDeleting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Menghapus...</span>
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    <span>Ya, Hapus</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
