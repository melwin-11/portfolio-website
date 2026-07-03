import { useEffect, useState, useRef } from "react"

export function useMouseVector(containerRef?: React.RefObject<HTMLElement | null>) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [vector, setVector] = useState({ x: 0, y: 0 })
  const lastPositionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      let x = e.clientX
      let y = e.clientY

      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect()
        x = e.clientX - rect.left
        y = e.clientY - rect.top
      }

      const dx = x - lastPositionRef.current.x
      const dy = y - lastPositionRef.current.y

      lastPositionRef.current = { x, y }
      
      setPosition({ x, y })
      setVector({ x: dx, y: dy })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [containerRef])

  return { position, vector }
}
