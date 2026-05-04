'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  life: number
  maxLife: number
  color: string
}

interface Line {
  x1: number; y1: number
  x2: number; y2: number
  opacity: number
  life: number
  maxLife: number
}

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -999, y: -999 })
  const frameRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const linesRef = useRef<Line[]>([])
  const timeRef = useRef(0)

  const GOLD = 'rgba(201,168,76,'
  const GOLD_LIGHT = 'rgba(232,201,122,'

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => {
      const prev = { ...mouseRef.current }
      mouseRef.current = { x: e.clientX, y: e.clientY }

      // Spawn particles on move
      const dx = e.clientX - prev.x
      const dy = e.clientY - prev.y
      const speed = Math.sqrt(dx * dx + dy * dy)
      if (speed > 2) {
        const count = Math.min(3, Math.floor(speed / 8))
        for (let i = 0; i < count; i++) {
          particlesRef.current.push({
            x: e.clientX + (Math.random() - 0.5) * 10,
            y: e.clientY + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * 0.8 + dx * 0.03,
            vy: (Math.random() - 0.5) * 0.8 + dy * 0.03 - 0.3,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.6 + 0.3,
            life: 0,
            maxLife: 60 + Math.random() * 80,
            color: Math.random() > 0.5 ? GOLD : GOLD_LIGHT,
          })
        }
      }
    }

    const onClick = (e: MouseEvent) => {
      // Burst on click
      for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2
        const speed = Math.random() * 2 + 0.5
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3 + 1,
          opacity: 0.8,
          life: 0,
          maxLife: 50 + Math.random() * 50,
          color: Math.random() > 0.3 ? GOLD : GOLD_LIGHT,
        })
      }
      // Ripple line
      linesRef.current.push({
        x1: e.clientX - 20, y1: e.clientY,
        x2: e.clientX + 20, y2: e.clientY,
        opacity: 0.8, life: 0, maxLife: 40,
      })
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('click', onClick)

    // Floating ambient particles (always present)
    const ambientParticles: Particle[] = []
    for (let i = 0; i < 60; i++) {
      ambientParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -Math.random() * 0.2 - 0.05,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.3 + 0.05,
        life: Math.random() * 200,
        maxLife: 200 + Math.random() * 300,
        color: Math.random() > 0.6 ? GOLD : 'rgba(160,154,144,',
      })
    }

    const draw = () => {
      timeRef.current++
      const t = timeRef.current
      const W = canvas.width
      const H = canvas.height

      ctx.clearRect(0, 0, W, H)

      // ── Diagonal light beams ──────────────────────────────
      const beamCount = 4
      for (let b = 0; b < beamCount; b++) {
        const phase = (t * 0.002 + b * 0.7)
        const x = (Math.sin(phase) * 0.5 + 0.5) * W
        const opacity = (Math.sin(phase * 2.1) * 0.5 + 0.5) * 0.025
        const grad = ctx.createLinearGradient(x, 0, x + W * 0.3, H)
        grad.addColorStop(0, `rgba(201,168,76,0)`)
        grad.addColorStop(0.3, `rgba(201,168,76,${opacity})`)
        grad.addColorStop(0.7, `rgba(201,168,76,${opacity * 0.5})`)
        grad.addColorStop(1, `rgba(201,168,76,0)`)
        ctx.save()
        ctx.transform(1, 0, -0.4, 1, 0, 0) // skew
        ctx.fillStyle = grad
        ctx.fillRect(x - W * 0.1, 0, W * 0.25, H)
        ctx.restore()
      }

      // ── Slow pulsing orbs ─────────────────────────────────
      const orbData = [
        { px: 0.15, py: 0.2, r: 300, speed: 0.0008 },
        { px: 0.85, py: 0.75, r: 250, speed: 0.0012 },
        { px: 0.5, py: 0.5, r: 180, speed: 0.0006 },
      ]
      orbData.forEach(({ px, py, r, speed }) => {
        const pulse = Math.sin(t * speed * 2 * Math.PI * 60) * 0.5 + 0.5
        const grad = ctx.createRadialGradient(
          px * W, py * H, 0,
          px * W, py * H, r * (0.8 + pulse * 0.4)
        )
        grad.addColorStop(0, `rgba(201,168,76,${0.03 * pulse})`)
        grad.addColorStop(1, 'rgba(201,168,76,0)')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, W, H)
      })

      // ── Mouse proximity glow ──────────────────────────────
      const { x: mx, y: my } = mouseRef.current
      if (mx > 0) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 180)
        grad.addColorStop(0, 'rgba(201,168,76,0.07)')
        grad.addColorStop(0.5, 'rgba(201,168,76,0.02)')
        grad.addColorStop(1, 'rgba(201,168,76,0)')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, W, H)
      }

      // ── Floating grid dots ───────────────────────────────
      const gridSpacing = 100
      for (let gx = 0; gx < W; gx += gridSpacing) {
        for (let gy = 0; gy < H; gy += gridSpacing) {
          const dx = gx - mx
          const dy = gy - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          const proximity = Math.max(0, 1 - dist / 250)
          const pulse = (Math.sin(t * 0.02 + gx * 0.01 + gy * 0.01) + 1) / 2
          const alpha = 0.04 + pulse * 0.04 + proximity * 0.25
          ctx.beginPath()
          ctx.arc(gx, gy, 1 + proximity * 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(201,168,76,${alpha})`
          ctx.fill()
        }
      }

      // ── Ambient floating particles ────────────────────────
      ambientParticles.forEach((p) => {
        p.life++
        p.x += p.vx + Math.sin(t * 0.01 + p.y * 0.005) * 0.1
        p.y += p.vy
        if (p.life >= p.maxLife || p.y < -10) {
          p.x = Math.random() * W
          p.y = H + 10
          p.life = 0
          p.maxLife = 200 + Math.random() * 300
          p.vx = (Math.random() - 0.5) * 0.15
          p.vy = -Math.random() * 0.2 - 0.05
        }
        const progress = p.life / p.maxLife
        const alpha = p.opacity * Math.sin(progress * Math.PI)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${alpha})`
        ctx.fill()
      })

      // ── Mouse-trail particles ─────────────────────────────
      particlesRef.current = particlesRef.current.filter(p => p.life < p.maxLife)
      particlesRef.current.forEach((p) => {
        p.life++
        p.x += p.vx
        p.y += p.vy
        p.vy -= 0.01 // float up
        p.vx *= 0.98
        const progress = p.life / p.maxLife
        const alpha = p.opacity * (1 - progress) * Math.sin(progress * Math.PI * 1.5)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * (1 - progress * 0.5), 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${Math.max(0, alpha)})`
        ctx.fill()
      })

      // ── Click ripple lines ────────────────────────────────
      linesRef.current = linesRef.current.filter(l => l.life < l.maxLife)
      linesRef.current.forEach((l) => {
        l.life++
        const progress = l.life / l.maxLife
        const alpha = l.opacity * (1 - progress)
        const expand = progress * 60
        ctx.beginPath()
        ctx.moveTo(l.x1 - expand, l.y1)
        ctx.lineTo(l.x2 + expand, l.y2)
        ctx.strokeStyle = `rgba(201,168,76,${alpha})`
        ctx.lineWidth = 0.5
        ctx.stroke()
        // Perpendicular
        ctx.beginPath()
        ctx.moveTo((l.x1 + l.x2) / 2, l.y1 - expand * 0.6)
        ctx.lineTo((l.x1 + l.x2) / 2, l.y2 + expand * 0.6)
        ctx.strokeStyle = `rgba(232,201,122,${alpha * 0.6})`
        ctx.stroke()
      })

      frameRef.current = requestAnimationFrame(draw)
    }

    frameRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('click', onClick)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
