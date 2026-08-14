import { useState, useEffect } from 'react';
import { merchandiseService } from '@/services/api';
import { PRODUCTS } from '../data/products';

/**
 * Memetakan struktur data API ke format yang dipakai komponen detail produk.
 */
const mapApiItem = (item) => ({
  id: item.id,
  name: item.name,
  subtitle: item.subtitle || item.description?.slice(0, 50) || '',
  price: item.price,
  note: item.note || null,
  size: item.size || '—',
  material: item.material || '—',
  description: item.description || '',
  image: item.images?.[0]?.url || item.image_url || null,
  gallery: item.images?.map((img) => img.url) || [],
  variants: item.variants || [],
});

/**
 * Hook untuk mengambil detail satu produk merchandise berdasarkan ID.
 * Fallback otomatis ke data hardcode lokal jika API tidak tersedia.
 * Jika ID tidak ditemukan di lokal maupun API, fetchError akan true.
 *
 * @param {string|number} id - ID produk dari URL param
 * @returns {{ product: object|null, isLoading: boolean, fetchError: boolean }}
 */
export function useProductDetail(id) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setFetchError(false);
    setProduct(null);

    const fetchProduct = async () => {
      try {
        const result = await merchandiseService.getById(id);
        if (!cancelled && result.data) {
          setProduct(mapApiItem(result.data));
        }
      } catch {
        // API gagal — coba cari di data lokal sebagai fallback
        if (!cancelled) {
          const local = PRODUCTS.find((p) => String(p.id) === String(id));
          if (local) {
            setProduct(local);
          } else {
            setFetchError(true);
          }
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchProduct();
    return () => { cancelled = true; };
  }, [id]);

  return { product, isLoading, fetchError };
}
