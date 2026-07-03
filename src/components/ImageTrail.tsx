import { Children, useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  motion,
  useAnimate,
  useAnimationFrame,
} from "framer-motion"
import type {
  AnimationSequence,
  Target,
  Transition,
} from "framer-motion"

import { useMouseVector } from "@/components/hooks/use-mouse-vector"

type TrailSegment = [Target, Transition]

type TrailAnimationSequence = TrailSegment[]

interface ImageTrailProps {
  children: React.ReactNode
  containerRef?: React.RefObject<HTMLElement | null>
  targetRef?: React.RefObject<HTMLElement | null>
  newOnTop?: boolean
  rotationRange?: number
  animationSequence?: TrailAnimationSequence
  interval?: number
  velocityDependentSpawn?: boolean
  disableSpawn?: boolean
}

interface TrailItem {
  id: string
  x: number
  y: number
  rotation: number
  animationSequence: TrailAnimationSequence
  scale: number
  child: React.ReactNode
}

const ImageTrail = ({
  children,
  newOnTop = true,
  rotationRange = 15,
  containerRef,
  targetRef,
  animationSequence = [
    [{ scale: 1.2 }, { duration: 0.1, ease: "circOut" }],
    [{ scale: 0 }, { duration: 0.5, ease: "circIn" }],
  ],
  interval = 100,
  disableSpawn = false,
}: ImageTrailProps) => {
  const [trail, setTrail] = useState<TrailItem[]>([])
  const lastAddedTimeRef = useRef<number>(0)
  const { position: mousePosition } = useMouseVector(containerRef)
  const lastMousePosRef = useRef(mousePosition)
  const currentIndexRef = useRef(0)

  const disableSpawnRef = useRef(disableSpawn)
  useEffect(() => {
    disableSpawnRef.current = disableSpawn
  }, [disableSpawn])

  const lastMoveTimeRef = useRef<number>(0)
  const isCurrentlyIdleRef = useRef<boolean>(true)

  // Convert children to array for sequential selection
  const childrenArray = useMemo(() => Children.toArray(children), [children])

  // Batch updates using useCallback
  const addToTrail = useCallback(
    (mousePos: { x: number; y: number }) => {
      const newItem: TrailItem = {
        id: Math.random().toString(36).substring(2, 11),
        x: mousePos.x,
        y: mousePos.y,
        rotation: (Math.random() - 0.5) * rotationRange * 2,
        animationSequence,
        scale: 1,
        child: childrenArray[currentIndexRef.current],
      }

      // Increment index and wrap around if needed
      currentIndexRef.current =
        (currentIndexRef.current + 1) % childrenArray.length

      setTrail((prev) => {
        if (newOnTop) {
          return [...prev, newItem]
        } else {
          return [newItem, ...prev]
        }
      })
    },
    [childrenArray, rotationRange, animationSequence, newOnTop]
  )

  const removeFromTrail = useCallback((itemId: string) => {
    setTrail((prev) => prev.filter((item) => item.id !== itemId))
  }, [])

  useAnimationFrame((time) => {
    // Check if mouse has actually moved
    const hasMouseMoved =
      mousePosition.x !== 0 &&
      mousePosition.y !== 0 &&
      (lastMousePosRef.current.x !== mousePosition.x ||
        lastMousePosRef.current.y !== mousePosition.y)

    if (hasMouseMoved) {
      isCurrentlyIdleRef.current = false
      lastMoveTimeRef.current = time
      lastMousePosRef.current = mousePosition
    } else {
      // If no mouse moves for 2 seconds, revert to auto idle loop
      if (time - lastMoveTimeRef.current > 2000) {
        isCurrentlyIdleRef.current = true
      }
    }

    // Skip spawning completely if user disables it (like when hovering over the name)
    if (disableSpawnRef.current) {
      return
    }

    if (isCurrentlyIdleRef.current) {
      // Auto-animate on an infinity loop (lying-down 8 shape)
      const theta = (time / 1000) * 0.6 // Loop speed
      const rect = containerRef?.current?.getBoundingClientRect() || {
        width: window.innerWidth,
        height: window.innerHeight,
      }
      
      let centerX = rect.width / 2
      let centerY = rect.height / 2
      
      if (targetRef?.current && containerRef?.current) {
        const targetRect = targetRef.current.getBoundingClientRect()
        const containerRect = containerRef.current.getBoundingClientRect()
        centerX = targetRect.left - containerRect.left + targetRect.width / 2
        centerY = targetRect.top - containerRect.top + targetRect.height / 2
      }

      const isMobile = rect.width < 768
      const A = isMobile 
        ? Math.min(rect.width * 0.42, 220)
        : Math.min(rect.width * 0.38, 600)
      const B = isMobile 
        ? Math.min(rect.height * 0.14, 110)
        : Math.min(rect.height * 0.18, 180)

      const loopX = centerX + A * Math.cos(theta)
      const loopY = centerY + B * Math.sin(2 * theta)

      if (time - lastAddedTimeRef.current >= interval) {
        lastAddedTimeRef.current = time
        addToTrail({ x: loopX, y: loopY })
      }
    } else {
      // Spawning on mouse movement
      if (time - lastAddedTimeRef.current >= interval) {
        lastAddedTimeRef.current = time
        addToTrail(mousePosition)
      }
    }
  })

  return (
    <div className="relative w-full h-full pointer-events-none">
      {trail.map((item) => (
        <TrailItem key={item.id} item={item} onComplete={removeFromTrail} />
      ))}
    </div>
  )
}

interface TrailItemProps {
  item: TrailItem
  onComplete: (id: string) => void
}

const TrailItem = ({ item, onComplete }: TrailItemProps) => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const sequence = item.animationSequence.map((segment: TrailSegment) => [
      scope.current,
      ...segment,
    ])

    animate(sequence as AnimationSequence).then(() => {
      onComplete(item.id)
    })
  }, [])

  return (
    <motion.div
      ref={scope}
      key={item.id}
      className="absolute"
      style={{
        left: item.x,
        top: item.y,
        rotate: item.rotation,
        x: "-50%",
        y: "-50%",
      }}
    >
      {item.child}
    </motion.div>
  )
}

export { ImageTrail }
