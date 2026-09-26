import { useState, useEffect } from 'react';
import { bundleService } from '@/services/adminApi';

/**
 * Memetakan struktur bundle API ke format kartu katalog.
 */
const mapApiItem = (item) => ({
  id: item.id,
  name: item.name,
  subtitle: item.description?.slice(0, 60) || '',
  price: item.price,
  description: item.description || '',
  image: item.images?.[0]?.image_url || null,
  gallery: item.images?.map((img) => img.image_url) || [],
  variants: [],
});

/**
 * Hook untuk mengambil bundle aktif dari API (publik, tanpa auth).
 * Kosong bila API gagal — section tampil placeholder coming-soon.
 *
 * @returns {{ bundles: Array, isLoading: boolean }}
 */
export function useBundles() {
  const [bundles, setBundles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchBundles = async () => {
      setIsLoading(true);
      try {
        const res = await bundleService.getAll({ is_active: true });
        if (!cancelled && res?.data && Array.isArray(res.data)) {
          setBundles(res.data.map(mapApiItem));
        }
      } catch {
        if (!cancelled) setBundles([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchBundles();
    return () => { cancelled = true; };
  }, []);

  return { bundles, isLoading };
}
