import { useEffect, useRef } from 'react'

const STAR_COUNT = 220
const CLUSTER_DEPTH = 86
const BOTTOM_PADDING = 8
const STAR_COLORS = [
  { r: 224, g: 255, b: 154 },
  { r: 255, g: 119, b: 214 },
  { r: 246, g: 217, b: 74 },
]

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function createStar(width, worldHeight, index, reducedMotion) {
  const verticalStagger = (index / STAR_COUNT) * (worldHeight * 1.35)
  const settleY = worldHeight - (Math.random() * CLUSTER_DEPTH + BOTTOM_PADDING)
  const color =
    index % 11 === 0
      ? STAR_COLORS[0]
      : index % 3 === 0
        ? STAR_COLORS[1]
        : STAR_COLORS[2]

  return {
    x: Math.random() * width,
    y: reducedMotion ? settleY : -(verticalStagger + Math.random() * 160),
    size: 0.8 + Math.random() * 1.7,
    baseSpeed: 26 + Math.random() * 72,
    twinklePhase: Math.random() * Math.PI * 2,
    drift: (Math.random() - 0.5) * 10,
    settleY,
    settled: reducedMotion,
    color,
  }
}

function drawStar(ctx, star, timeSeconds) {
  const shimmer = Math.sin(timeSeconds * 2.4 + star.twinklePhase)
  const alphaBase = star.settled ? 0.46 : 0.72
  const alpha = clamp(alphaBase + shimmer * 0.14, 0.2, 0.9)
  const color = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${alpha})`
  const ray = star.size * 2.4

  ctx.save()
  ctx.translate(star.x, star.y)

  ctx.strokeStyle = color
  ctx.lineWidth = Math.max(0.45, star.size * 0.34)
  ctx.beginPath()
  ctx.moveTo(-ray, 0)
  ctx.lineTo(ray, 0)
  ctx.moveTo(0, -ray)
  ctx.lineTo(0, ray)
  ctx.stroke()

  if (!star.settled) {
    ctx.globalAlpha = 0.5
    ctx.beginPath()
    ctx.moveTo(-ray * 0.7, -ray * 0.7)
    ctx.lineTo(ray * 0.7, ray * 0.7)
    ctx.moveTo(ray * 0.7, -ray * 0.7)
    ctx.lineTo(-ray * 0.7, ray * 0.7)
    ctx.stroke()
    ctx.globalAlpha = 1
  }

  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(0, 0, Math.max(0.5, star.size * 0.6), 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

function FallingStars({ reducedMotion = false }) {
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

    let stars = []
    let frameId
    let lastTimestamp = 0
    let lastScrollY = window.scrollY
    let lastWidth = window.innerWidth
    let lastWorldHeight = document.documentElement.scrollHeight

    const setCanvasSize = ({ preserveStars = true } = {}) => {
      const dpr = window.devicePixelRatio || 1
      const width = window.innerWidth
      const height = window.innerHeight
      const worldHeight = document.documentElement.scrollHeight

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (!preserveStars || stars.length === 0 || reducedMotion) {
        stars = Array.from({ length: STAR_COUNT }, (_, index) =>
          createStar(width, worldHeight, index, reducedMotion),
        )
      } else {
        const widthRatio = width / Math.max(lastWidth, 1)
        const worldRatio = worldHeight / Math.max(lastWorldHeight, 1)

        stars = stars.map((star, index) => {
          const previousDepth = Math.max(4, lastWorldHeight - star.settleY)
          const nextSettleY = worldHeight - previousDepth

          const nextStar = {
            ...star,
            x: clamp(star.x * widthRatio, -8, width + 8),
            y: star.settled ? star.y * worldRatio : star.y * worldRatio,
            settleY: clamp(nextSettleY, 0, worldHeight),
          }

          if (nextStar.settled) {
            nextStar.y = nextStar.settleY
          }

          if (index >= STAR_COUNT) {
            return createStar(width, worldHeight, index, reducedMotion)
          }

          return nextStar
        })

        if (stars.length < STAR_COUNT) {
          for (let index = stars.length; index < STAR_COUNT; index += 1) {
            stars.push(createStar(width, worldHeight, index, reducedMotion))
          }
        }
      }

      lastWidth = width
      lastWorldHeight = worldHeight
    }

    const animate = (timestamp) => {
      const width = window.innerWidth
      const height = window.innerHeight
      const scrollY = window.scrollY
      const worldHeight = document.documentElement.scrollHeight

      const deltaMs = lastTimestamp ? timestamp - lastTimestamp : 16
      const deltaSeconds = Math.min(deltaMs / 1000, 0.05)
      const scrollVelocityPxPerSecond = ((scrollY - lastScrollY) / Math.max(deltaMs, 1)) * 1000
      const scrollBoost = Math.max(0, scrollVelocityPxPerSecond) * 0.12

      lastTimestamp = timestamp
      lastScrollY = scrollY

      context.clearRect(0, 0, width, height)

      for (const star of stars) {
        if (!star.settled) {
          star.y += (star.baseSpeed + scrollBoost) * deltaSeconds
          star.x += star.drift * deltaSeconds

          if (star.x < -8) {
            star.x = width + 8
          } else if (star.x > width + 8) {
            star.x = -8
          }

          if (star.y >= star.settleY) {
            star.y = star.settleY
            star.settled = true
          }
        }

        const screenY = star.y - scrollY
        if (screenY >= -40 && screenY <= height + 40) {
          drawStar(context, { ...star, y: screenY, settleY: Math.max(0, star.settleY - scrollY) }, timestamp / 1000)
        }
      }

      if (worldHeight !== lastWorldHeight) {
        lastWorldHeight = worldHeight
      }

      frameId = window.requestAnimationFrame(animate)
    }

    const handleResize = () => {
      setCanvasSize({ preserveStars: true })
      lastScrollY = window.scrollY
    }

    setCanvasSize({ preserveStars: false })
    frameId = window.requestAnimationFrame(animate)
    window.addEventListener('resize', handleResize)
    window.addEventListener('load', handleResize)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('load', handleResize)
    }
  }, [reducedMotion])

  return <canvas className="particles-canvas" ref={canvasRef} aria-hidden="true" />
}

export default FallingStars
