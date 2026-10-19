import React, { useLayoutEffect, useRef, useState } from 'react'
import styles from './EventComposition.module.css'

// Event pages are laid out at this desktop width and scaled down as one unit on narrower screens
export const EVENT_DESKTOP_WIDTH = 1280

function useCompositionScale() {
  const viewportRef = useRef(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const updateScale = (width) => {
      if (width > 0) setScale(Math.min(1, width / EVENT_DESKTOP_WIDTH))
    }
    updateScale(viewport.getBoundingClientRect().width)

    const observer = new ResizeObserver(([entry]) => updateScale(entry.contentRect.width))
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [])

  return [viewportRef, scale]
}

// topPadding: the first section's top padding (px) at desktop size, used to keep it clear of the fixed navbar
export function EventComposition({ topPadding = 128, children }) {
  const [viewportRef, scale] = useCompositionScale()

  return (
    <div
      ref={viewportRef}
      className={styles.viewport}
      style={{
        '--event-scale': scale,
        '--event-canvas-width': scale < 1 ? `${EVENT_DESKTOP_WIDTH}px` : '100%',
        '--event-top-padding': `${topPadding}px`,
      }}
    >
      <div className={styles.canvas}>{children}</div>
    </div>
  )
}

export default EventComposition
