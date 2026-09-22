import { useState, useEffect } from 'react'

export function useInteractiveWheel() {
  const [rotation, setRotation] = useState(0)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY
      const newRotation = (scrollPos / 5) % 360
      setRotation(newRotation)

      const step = Math.floor((scrollPos / 300) % 4)
      setActiveStep(step)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return {
    rotation,
    activeStep,
    rotateTo: (deg) => setRotation(deg),
  }
}

export default useInteractiveWheel
