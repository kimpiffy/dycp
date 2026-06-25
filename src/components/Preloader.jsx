import { useEffect, useRef } from 'react'

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
    const leadStar = {
      size: 1.2,
      color: PRELOADER_COLORS[0],
    }
    const trailStar = {
      size: 0.82,
      color: PRELOADER_COLORS[2],
    }

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
      const orbitRadius = size * 0.22
      const rotationSpeed = reducedMotion ? 0.18 : 1.1
      const headAngle = timestamp * 0.00135 * rotationSpeed
      const trailOffset = 0.26
      const leadPulse = 0.88 + Math.sin(timestamp * 0.0065) * 0.12
      const trailPulse = 0.72 + Math.sin(timestamp * 0.0065 - 1.2) * 0.1
      const leadX = center + Math.cos(headAngle) * orbitRadius
      const leadY = center + Math.sin(headAngle) * orbitRadius
      const trailX = center + Math.cos(headAngle - trailOffset) * (orbitRadius - 2)
      const trailY = center + Math.sin(headAngle - trailOffset) * (orbitRadius - 2)

      context.clearRect(0, 0, size, size)

      context.save()
      context.strokeStyle = 'rgba(224, 255, 154, 0.16)'
      context.lineWidth = Math.max(0.8, size * 0.012)
      context.lineCap = 'round'
      context.beginPath()
      context.moveTo(trailX, trailY)
      context.lineTo(leadX, leadY)
      context.stroke()
      context.restore()

      drawOrbitStar(context, trailX, trailY, trailStar.size * 6.2 * trailPulse, trailStar.color, 0.38 + trailPulse * 0.34, headAngle - trailOffset)
      drawOrbitStar(context, leadX, leadY, leadStar.size * 6.2 * leadPulse, leadStar.color, 0.82 + leadPulse * 0.16, headAngle)

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