import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Plus, Trash2, X, Loader2, Info } from 'lucide-react';

// ============================================================================
// IMAGE MANAGER — Komponen kelola multi-gambar (URL-based)
// ============================================================================
// Props:
//   images: Array<{ id, image_url }>
//   onAddImage: (imageUrl: string) => Promise<void>
//   onDeleteImage: (imageId: string) => Promise<void>
//   disabled?: boolean (true saat mode Create, item belum tersimpan)
// ============================================================================

export default function ImageManager({ images = [], onAddImage, onDeleteImage, disabled = false }) {
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [lightboxUrl, setLightboxUrl] = useState(null);

  const handleAddImage = async () => {
    if (!urlValue.trim()) return;
    setIsUploading(true);
    try {
      await onAddImage(urlValue.trim());
      setUrlValue('');
      setShowUrlInput(false);
    } catch (err) {
      // Error handled by parent via toast
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (imageId) => {
    setDeletingId(imageId);
    try {
      await onDeleteImage(imageId);
    } catch (err) {
      // Error handled by parent via toast
    } finally {
      setDeletingId(null);
    }
  };

  if (disabled) {
    return (
      <div className="w-full rounded-2xl border border-dashed border-gray-300 bg-gray-50/70 p-6 sm:p-7 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <ImageIcon size={22} />
          </div>
          <p className="text-sm font-semibold text-gray-700">Kelola Gambar</p>
          <p className="text-xs text-gray-400 max-w-sm">
            Simpan data item terlebih dahulu sebelum dapat mengupload dan mengelola galeri gambar.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-gray-200/90 bg-white p-5 sm:p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ImageIcon size={18} className="text-gray-500" />
          <h4 className="text-sm font-semibold text-gray-800">
            Galeri Gambar ({images.length})
          </h4>
        </div>
        {!showUrlInput && (
          <button
            type="button"
            onClick={() => setShowUrlInput(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            <Plus size={14} />
            <span>Tambah Gambar</span>
          </button>
        )}
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4">
        {images.map(img => (
          <div key={img.id} className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
            <img
              src={img.image_url}
              alt=""
              className="h-full w-full object-cover cursor-pointer transition-transform duration-200 group-hover:scale-105"
              onClick={() => setLightboxUrl(img.image_url)}
              onError={(e) => {
                e.target.src = 'https://placehold.co/200x200/f3f4f6/9ca3af?text=Image+Error';
              }}
            />
            {/* Delete button overlay */}
            <button
              type="button"
              onClick={() => handleDeleteImage(img.id)}
              disabled={deletingId === img.id}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-ted-red text-white opacity-0 shadow-md transition-all group-hover:opacity-100 disabled:opacity-50 hover:bg-red-700"
              title="Hapus gambar"
            >
              {deletingId === img.id ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <Trash2 size={13} />
              )}
            </button>
          </div>
        ))}

        {/* Add image button / URL input */}
        {showUrlInput ? (
          <div className="col-span-full flex flex-col gap-3 rounded-xl border border-dashed border-ted-red/40 bg-red-50/30 p-4 w-full">
            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
              <Info size={14} className="text-ted-red shrink-0" />
              <span>Masukkan URL Gambar (link publik):</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <input
                type="url"
                value={urlValue}
                onChange={(e) => setUrlValue(e.target.value)}
                placeholder="https://images.unsplash.com/... atau URL gambar lainnya"
                disabled={isUploading}
                className="flex-1 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-100 disabled:opacity-50"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleAddImage()}
              />
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => { setShowUrlInput(false); setUrlValue(''); }}
                  disabled={isUploading}
                  className="flex-1 sm:flex-initial rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50 text-center"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleAddImage}
                  disabled={!urlValue.trim() || isUploading}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-xl bg-gray-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-gray-800 disabled:opacity-40 whitespace-nowrap"
                >
                  {isUploading ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      <span>Menambahkan...</span>
                    </>
                  ) : (
                    <>
                      <Plus size={14} />
                      <span>+ Tambahkan ke Galeri</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          images.length === 0 && (
            <button
              type="button"
              onClick={() => setShowUrlInput(true)}
              className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400 transition-all hover:border-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <Plus size={24} />
              <span className="text-xs font-medium">Tambah Gambar</span>
            </button>
          )
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxUrl(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-sm"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightboxUrl}
              alt=""
              className="max-h-[85vh] max-w-[85vw] rounded-xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              onClick={() => setLightboxUrl(null)}
              className="absolute right-4 sm:right-6 top-4 sm:top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25"
            >
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
