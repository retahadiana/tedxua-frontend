import { useEffect, useState } from "react";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

/**
 * useViewport
 * Memantau ukuran jendela (lebar & tinggi) mengikuti perubahan resize.
 * Dipakai untuk pola "scene desktop 1920px di-scale mengikuti lebar viewport"
 * (sama seperti halaman Sign In / Sign Up).
 */
export default function useViewport() {
  const [viewport, setViewport] = useState(() => ({
    w: typeof window !== "undefined" ? window.innerWidth : DESIGN_WIDTH,
    h: typeof window !== "undefined" ? window.innerHeight : DESIGN_HEIGHT,
  }));

  useEffect(() => {
    const onResize = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return viewport;
}