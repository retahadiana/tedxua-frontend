import { useEffect, useLayoutEffect, useRef, useState } from 'react'

// Target: tampilan selalu seperti zoom 90% (design baseline)
const TARGET_SCALE = 0.9

// Langkah zoom resmi Chrome
const ZOOM_STEPS = [0.25, 0.33, 0.5, 0.67, 0.75, 0.8, 0.9, 1, 1.1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4, 5]

const snapZoom = (ratio: number) =>
  ZOOM_STEPS.reduce((best, step) =>
    Math.abs(step - ratio) < Math.abs(best - ratio) ? step : best
  )

const readZoom = () =>
  typeof window === 'undefined' ? 1 : snapZoom(window.outerWidth / window.innerWidth)

export function useZoomNormalization() {
  const [zoom, setZoom] = useState(readZoom)

  useEffect(() => {
    const detectZoom = () => setZoom(readZoom())

    detectZoom()
    window.addEventListener('resize', detectZoom)
    return () => window.removeEventListener('resize', detectZoom)
  }, [])

  return zoom
}

export function ZoomNormalizer({ children }: { children: React.ReactNode }) {
  const zoom = useZoomNormalization()
  const scale = TARGET_SCALE / zoom
  const innerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | undefined>(undefined)

  // Samakan tinggi layout dengan tinggi visual setelah di-scale
  useLayoutEffect(() => {
    const el = innerRef.current
    if (!el) return
    const update = () => setHeight(el.offsetHeight * scale)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [scale])

  return (
    <div style={{ width: '100%', height, overflowX: 'clip' }}>
      <div
        ref={innerRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${(1 / scale) * 100}%`,
        }}
      >
        {children}
      </div>
    </div>
  )
}