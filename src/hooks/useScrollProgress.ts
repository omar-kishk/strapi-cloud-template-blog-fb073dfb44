'use client'

import { useEffect, useState, useRef } from 'react'

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const rafRef = useRef<number | null>(null)
  const lastScrollY = useRef(0)
  const lastTimestamp = useRef(0)

  useEffect(() => {
    let ticking = false

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollTop / documentHeight, 1)
      
      // Calculate velocity
      const now = performance.now()
      const deltaY = scrollTop - lastScrollY.current
      const deltaTime = now - lastTimestamp.current
      const velocity = deltaTime > 0 ? deltaY / deltaTime : 0
      
      setScrollProgress(progress)
      setScrollVelocity(velocity)
      
      lastScrollY.current = scrollTop
      lastTimestamp.current = now
      
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(updateScrollProgress)
        ticking = true
      }
    }

    // Update CSS custom properties for animations
    const updateCSSProperties = () => {
      document.documentElement.style.setProperty('--scroll-progress', scrollProgress.toString())
      document.documentElement.style.setProperty('--scroll-velocity', Math.abs(scrollVelocity).toString())
    }

    updateCSSProperties()
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [scrollProgress, scrollVelocity])

  return { scrollProgress, scrollVelocity }
}

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    let ticking = false

    const updateScrollPosition = () => {
      setScrollPosition(window.scrollY)
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(updateScrollPosition)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return scrollPosition
}

// Advanced scroll-triggered animations hook
export function useScrollTrigger(options: {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
} = {}) {
  const [isInView, setIsInView] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const ref = useRef<HTMLElement>(null)
  
  const { threshold = 0.2, rootMargin = '0px', triggerOnce = true } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting
        setIsInView(inView)
        
        if (inView && !hasTriggered) {
          setHasTriggered(true)
        }
        
        if (!triggerOnce) {
          setHasTriggered(false)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce, hasTriggered])

  return { ref, isInView, hasTriggered }
}

// Mouse position tracking for interactive animations
export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    let ticking = false

    const updateMousePosition = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      
      setMousePosition({ x, y })
      
      // Update CSS custom properties
      document.documentElement.style.setProperty('--mouse-x', `${x}%`)
      document.documentElement.style.setProperty('--mouse-y', `${y}%`)
      
      ticking = false
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => updateMousePosition(e))
        ticking = true
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return mousePosition
}

// Reduced motion preference detection
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
} 