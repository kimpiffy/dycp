import { useEffect, useRef } from 'react'

const PRELOADER_STAR_COUNT = 10
const PRELOADER_COLORS = [
  { r: 224, g: 255, b: 154 },
  { r: 255, g: 119, b: 214 },
  { r: 246, g: 217, b: 74 },
]

function drawOrbitStar(ctx, x, y, size, color, alpha, rotation) {
  const ray = size * 2.2

  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rotation)
  ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`
  ctx.lineWidth = Math.max(0.55, size * 0.28)
  ctx.lineCap = 'round'

  ctx.beginPath()
  ctx.moveTo(-ray, 0)
  ctx.lineTo(ray, 0)
  ctx.moveTo(0, -ray)
  ctx.lineTo(0, ray)
  ctx.stroke()

  ctx.globalAlpha = 0.48
  ctx.beginPath()
  ctx.moveTo(-ray * 0.7, -ray * 0.7)
  ctx.lineTo(ray * 0.7, ray * 0.7)
  ctx.moveTo(ray * 0.7, -ray * 0.7)
  ctx.lineTo(-ray * 0.7, ray * 0.7)
  ctx.stroke()

  ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`
  ctx.beginPath()
  ctx.arc(0, 0, Math.max(0.45, size * 0.55), 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

function Preloader({ reducedMotion = false }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return undefined
    }

    const context = canvas.getContext('2d')
    if (!context) {
      return undefined
    }

    let frameId
    let lastTimestamp = 0
    let stars = Array.from({ length: PRELOADER_STAR_COUNT }, (_, index) => ({
      angle: (index / PRELOADER_STAR_COUNT) * Math.PI * 2,
      size: 0.95 + (index % 4) * 0.12,
      phase: index * 0.42,
      color: PRELOADER_COLORS[index % PRELOADER_COLORS.length],
    }))

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      const size = Math.min(window.innerWidth, window.innerHeight, 220)

      canvas.width = Math.floor(size * dpr)
      canvas.height = Math.floor(size * dpr)
      canvas.style.width = `${size}px`
      canvas.style.height = `${size}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const animate = (timestamp) => {
      const size = Math.min(window.innerWidth, window.innerHeight, 220)
      const center = size / 2
      const orbitRadius = size * 0.28
      const deltaMs = lastTimestamp ? timestamp - lastTimestamp : 16
      const deltaSeconds = Math.min(deltaMs / 1000, 0.05)
      const rotationSpeed = reducedMotion ? 0.2 : 1.15

      lastTimestamp = timestamp

      context.clearRect(0, 0, size, size)

      context.save()
      context.translate(center, center)
      context.strokeStyle = 'rgba(224, 255, 154, 0.18)'
      context.lineWidth = 1
      context.beginPath()
      context.arc(0, 0, orbitRadius + 18, 0, Math.PI * 2)
      context.stroke()
      context.restore()

      stars.forEach((star, index) => {
        const angle = star.angle + timestamp * 0.0014 * rotationSpeed
        const pulse = 0.84 + Math.sin(timestamp * 0.005 + star.phase) * 0.16
        const x = center + Math.cos(angle) * orbitRadius
        const y = center + Math.sin(angle) * orbitRadius
        const alpha = 0.7 + Math.sin(timestamp * 0.006 + index) * 0.12

        drawOrbitStar(context, x, y, star.size * pulse * 6.2, star.color, alpha, angle + deltaSeconds * 0.5)
      })

      frameId = window.requestAnimationFrame(animate)
    }

    setCanvasSize()
    frameId = window.requestAnimationFrame(animate)
    window.addEventListener('resize', setCanvasSize)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [reducedMotion])

  return (
    <div className="site-preloader" role="status" aria-live="polite" aria-label="Loading site">
      <div className="site-preloader-orbit">
        <canvas className="site-preloader-canvas" ref={canvasRef} aria-hidden="true" />
        <p className="site-preloader-label">Loading</p>
      </div>
    </div>
  )
}

export default Preloader