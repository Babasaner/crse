import { useEffect, useState, useRef } from 'react'

export function useCountUp(target: number, duration: number = 2000, trigger: boolean = true) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)

  useEffect(() => {
    if (!trigger) return

    let startTime: number | null = null
    let animationFrameId: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // Ease out expo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      const current = Math.floor(easeProgress * target)

      if (current !== countRef.current) {
        countRef.current = current
        setCount(current)
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }

    animationFrameId = requestAnimationFrame(step)

    return () => cancelAnimationFrame(animationFrameId)
  }, [target, duration, trigger])

  return count
}
