import { useEffect, useRef } from 'react'

const BLOTTER_SCRIPT_SRC = '/vendor/blotter.min.js'
const LIQUID_DISTORT_MATERIAL_SCRIPT_SRC = '/vendor/liquidDistortMaterial.js'
const ROLLING_DISTORT_MATERIAL_SCRIPT_SRC = '/vendor/rollingDistortMaterial.js'
const scriptLoaders = new Map()

function lerp(from, to, amount) {
  return from + (to - from) * amount
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function loadScript(src) {
  if (scriptLoaders.has(src)) {
    return scriptLoaders.get(src)
  }

  const existing = document.querySelector(`script[src="${src}"]`)
  if (existing) {
    const existingPromise = Promise.resolve()
    scriptLoaders.set(src, existingPromise)
    return existingPromise
  }

  const loader = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.head.append(script)
  })

  scriptLoaders.set(src, loader)
  return loader
}

function BlotterTitle({ as = 'h2', text, className = '' }) {
  const headingRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    let animationFrameId
    let scrollState = { y: window.scrollY, t: performance.now() }
    let cleanupEvents = () => {}

    const initBlotter = async () => {
      await Promise.all([
        loadScript(BLOTTER_SCRIPT_SRC),
        loadScript(LIQUID_DISTORT_MATERIAL_SCRIPT_SRC),
        document.fonts?.ready,
      ])

      if (
        cancelled ||
        !headingRef.current
      ) {
        return
      }

      const Blotter = window.Blotter
      if (
        !Blotter ||
        !Blotter.Text ||
        (!Blotter.LiquidDistortMaterial && !Blotter.RollingDistortMaterial)
      ) {
        return
      }

      const headingStyles = window.getComputedStyle(headingRef.current)
      const headingSize = parseFloat(headingStyles.fontSize) || 56
      const headingFamily = headingStyles.fontFamily || 'Marola, sans-serif'
      const headingWeight = parseInt(headingStyles.fontWeight, 10) || 600

      const baseTextOptions = {
        family: headingFamily,
        size: headingSize,
        weight: headingWeight,
        paddingLeft: headingSize * 0.1,
        paddingRight: headingSize * 0.1,
      }

      const titleText = new Blotter.Text(text, {
        ...baseTextOptions,
        fill: headingStyles.color || '#b2f61c',
      })

      const titleMaterial = Blotter.LiquidDistortMaterial
        ? new Blotter.LiquidDistortMaterial()
        : new Blotter.RollingDistortMaterial()

      if (titleMaterial.uniforms.uVolatility) {
        titleMaterial.uniforms.uVolatility.value = 0.28
      }
      if (titleMaterial.uniforms.uSpeed) {
        titleMaterial.uniforms.uSpeed.value = 0.075
      }
      if (titleMaterial.uniforms.uSeed) {
        titleMaterial.uniforms.uSeed.value = 1.35
      }
      if (titleMaterial.uniforms.uSeedCount) {
        titleMaterial.uniforms.uSeedCount.value = 3.7
      }
      if (titleMaterial.uniforms.uAmplitude) {
        titleMaterial.uniforms.uAmplitude.value = 0.12
      }

      if (titleMaterial.uniforms.uSineDistortSpread) {
        titleMaterial.uniforms.uSineDistortSpread.value = 0.045
      }
      if (titleMaterial.uniforms.uSineDistortCycleCount) {
        titleMaterial.uniforms.uSineDistortCycleCount.value = 1.35
      }
      if (titleMaterial.uniforms.uSineDistortAmplitude) {
        titleMaterial.uniforms.uSineDistortAmplitude.value = 0.1
      }
      if (titleMaterial.uniforms.uNoiseDistortVolatility) {
        titleMaterial.uniforms.uNoiseDistortVolatility.value = 5.8
      }
      if (titleMaterial.uniforms.uNoiseDistortAmplitude) {
        titleMaterial.uniforms.uNoiseDistortAmplitude.value = 0.006
      }
      if (titleMaterial.uniforms.uRotation) {
        titleMaterial.uniforms.uRotation.value = 170.0
      }
      if (titleMaterial.uniforms.uSpeed) {
        titleMaterial.uniforms.uSpeed.value = 0.075
      }

      const titleBlotter = new Blotter(titleMaterial, { texts: titleText })
      const titleScope = titleBlotter.forText(titleText)

      headingRef.current.innerHTML = text
      titleScope.appendTo(headingRef.current)
      if (titleScope.domElement) titleScope.domElement.classList.add('blotter-layer')

      const titleState = {
        baseSpeed: 0.075,
        targetSpeed: 0.075,
        currentSpeed: 0.075,
      }

      const handleScroll = () => {
        const now = performance.now()
        const dt = Math.max(now - scrollState.t, 16)
        const nextY = window.scrollY
        const velocity = Math.abs(nextY - scrollState.y) / dt
        const impulse = clamp((velocity * 1000) / 1700, 0, 0.07)

        titleState.targetSpeed = Math.max(
          titleState.targetSpeed,
          titleState.baseSpeed + impulse,
        )

        scrollState = { y: nextY, t: now }
      }

      const animateUniforms = () => {
        titleState.targetSpeed = lerp(titleState.targetSpeed, titleState.baseSpeed, 0.05)
        titleState.currentSpeed = lerp(titleState.currentSpeed, titleState.targetSpeed, 0.1)
        titleMaterial.uniforms.uSpeed.value = titleState.currentSpeed

        animationFrameId = window.requestAnimationFrame(animateUniforms)
      }

      window.addEventListener('scroll', handleScroll, { passive: true })
      animationFrameId = window.requestAnimationFrame(animateUniforms)

      cleanupEvents = () => {
        window.removeEventListener('scroll', handleScroll)
      }

      headingRef.current.classList.add('is-blotter-ready')
    }

    initBlotter().catch(() => {
      // Keep the semantic fallback text if Blotter fails to initialize.
    })

    return () => {
      cancelled = true
      window.cancelAnimationFrame(animationFrameId)
      cleanupEvents()
      if (headingRef.current) {
        headingRef.current.classList.remove('is-blotter-ready')
      }
    }
  }, [text])

  const Tag = as

  return (
    <Tag
      className={`blotter-title ${className}`.trim()}
      ref={headingRef}
      aria-label={text}
    >
      {text}
    </Tag>
  )
}

export default BlotterTitle
