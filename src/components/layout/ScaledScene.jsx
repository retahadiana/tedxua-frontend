import { useLayoutEffect, useRef, useState } from "react";
import { useViewport } from "@/hooks";

const DESIGN_WIDTH = 1920;

/**
 * ScaledScene
 * Membungkus konten desktop (scene yang didesain pada lebar 1920px) agar
 * selalu di-scale mengikuti lebar viewport — persis perilaku "zoom" pada
 * halaman Sign In / Sign Up desktop. Animasi & peletakan elemen dalam scene
 * dijamin proporsional di segala ukuran layar desktop/tablet.
 *
 * Tinggi diukur otomatis dari konten (ResizeObserver) lalu dikalikan scale,
 * sehingga halaman tetap bisa discroll normal walau konten di-transform.
 */
export default function ScaledScene({ children, designWidth = DESIGN_WIDTH }) {
  const { w } = useViewport();
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const node = contentRef.current;
    if (!node) return;

    const measure = () => setContentHeight(node.offsetHeight);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  const scale = w / designWidth;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: contentHeight * scale }}
    >
      <div
        ref={contentRef}
        className="relative"
        style={{
          width: designWidth,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}