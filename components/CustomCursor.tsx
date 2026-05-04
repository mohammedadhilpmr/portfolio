'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [label, setLabel] = useState('')

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Main dot — snappy
  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50, mass: 0.1 })
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50, mass: 0.1 })

  // Ring — laggy/trailing
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 18, mass: 0.5 })
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.5 })

  // Outer aura — very laggy
  const auraX = useSpring(mouseX, { stiffness: 60, damping: 14, mass: 0.8 })
  const auraY = useSpring(mouseY, { stiffness: 60, damping: 14, mass: 0.8 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const onLeave = () => setHidden(true)
    const onEnter = () => setHidden(false)

    const onDown = () => setClicked(true)
    const onUp = () => setClicked(false)

    // Detect hoverable elements
    const onHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [data-cursor], input, textarea, select, label')
      if (interactive) {
        setHovered(true)
        const cursorLabel = (interactive as HTMLElement).dataset?.cursor || ''
        setLabel(cursorLabel)
      } else {
        setHovered(false)
        setLabel('')
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousemove', onHoverStart)
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('mouseenter', onEnter)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousemove', onHoverStart)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* Outer aura glow */}
      <motion.div
        style={{ x: auraX, y: auraY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: hidden ? 0 : hovered ? 0.15 : 0.06,
          scale: clicked ? 0.7 : hovered ? 2.2 : 1,
          width: hovered ? 80 : 56,
          height: hovered ? 80 : 56,
        }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: auraX,
          y: auraY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.8) 0%, transparent 70%)',
          filter: 'blur(8px)',
          width: 56,
          height: 56,
        }}
      />

      {/* Ring */}
      <motion.div
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: hidden ? 0 : 1,
          scale: clicked ? 0.6 : hovered ? 1.6 : 1,
          borderColor: hovered ? 'rgba(201,168,76,0.9)' : 'rgba(201,168,76,0.5)',
          width: hovered ? 44 : 32,
          height: hovered ? 44 : 32,
          borderWidth: hovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.25 }}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: 32,
          height: 32,
          border: '1px solid rgba(201,168,76,0.5)',
        }}
      >
        {/* Label inside ring when hovering */}
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center text-[0.45rem] tracking-widest uppercase text-gold font-medium"
          >
            {label}
          </motion.span>
        )}
      </motion.div>

      {/* Center dot */}
      <motion.div
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: hidden ? 0 : 1,
          scale: clicked ? 2 : hovered ? 0 : 1,
          backgroundColor: hovered ? '#e8c97a' : '#c9a84c',
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 5,
          height: 5,
          backgroundColor: '#c9a84c',
          boxShadow: '0 0 6px 2px rgba(201,168,76,0.6)',
        }}
      />
    </>
  )
}
