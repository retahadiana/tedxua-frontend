import { useEffect, useState } from 'react'

// Target: make 100% zoom look like 90% zoom (design baseline)
const TARGET_SCALE = 0.9

export function useZoomNormalization() {
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    const detectZoom = () => {
      const ratio = window.outerWidth / window.innerWidth
      setZoom(ratio)
    }

    detectZoom()
    window.addEventListener('resize', detectZoom)
    window.addEventListener('wheel', detectZoom, { passive: true })

    return () => {
      window.removeEventListener('resize', detectZoom)
      window.removeEventListener('wheel', detectZoom)
    }
  }, [])

  return zoom
}

export function ZoomNormalizer({ children }: { children: React.ReactNode }) {
  const zoom = useZoomNormalization()
  // Force TARGET_SCALE (0.9) so 100% browser zoom = 90% design
  const effectiveScale = TARGET_SCALE / zoom
  const inverseScale = 1 / effectiveScale

  return (
    <div
      style={{
        transform: `scale(${effectiveScale})`,
        transformOrigin: 'top left',
        width: `${inverseScale * 100}%`,
        height: `${inverseScale * 100}%`,
        overflow: 'hidden',
      }}
    >
      <div style={{ width: '100%', height: '100%' }}>
        {children}
      </div>
    </div>
  )
}