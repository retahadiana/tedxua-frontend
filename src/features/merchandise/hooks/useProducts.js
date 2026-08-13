import { useState, useEffect } from 'react';
import { merchandiseService } from '@/services/api';
import { PRODUCTS } from '../data/products';

/**
 * Memetakan struktur data API ke format yang dipakai komponen merchandise.
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
 * Hook untuk mengambil semua produk merchandise dari API.
 * Fallback otomatis ke data hardcode lokal jika API tidak tersedia.
 *
 * @returns {{ products: Array, isLoading: boolean }}
 */
export function useProducts() {
  const [products, setProducts] = useState(PRODUCTS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const result = await merchandiseService.getAll();
        if (!cancelled && result.data && Array.isArray(result.data)) {
          const mapped = result.data.map(mapApiItem);
          setProducts(mapped.length > 0 ? mapped : PRODUCTS);
        }
      } catch {
        // API tidak tersedia — tetap pakai data lokal, tidak perlu error ke user
        if (!cancelled) setProducts(PRODUCTS);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchProducts();
    return () => { cancelled = true; };
  }, []);

  return { products, isLoading };
}
