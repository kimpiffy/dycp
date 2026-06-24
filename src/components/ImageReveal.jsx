import { useEffect, useRef, useState } from 'react'

function ImageReveal({ image, delay = 0, reducedMotion = false, fullWidth = false, index = 0 }) {
  const [visible, setVisible] = useState(reducedMotion)
  const imageRef = useRef(null)
  const videoRef = useRef(null)
  const isVideo = image.type === 'video'
  const tilt = (() => {
    const values = [-3.5, 2.25, -1.5, 3.75, -2.1, 1.6, -0.9, 2.8]

    return values[index % values.length]
  })()

  useEffect(() => {
    if (reducedMotion || !imageRef.current) {
      setVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(imageRef.current)

    return () => observer.disconnect()
  }, [reducedMotion])

  useEffect(() => {
    if (!isVideo || !visible || !videoRef.current) {
      return undefined
    }

    const video = videoRef.current
    video.muted = true
    video.defaultMuted = true
    video.playsInline = true
    video.play().catch(() => {})

    return undefined
  }, [isVideo, visible])

  return (
    <figure
      ref={imageRef}
      className={`image-reveal ${isVideo ? 'is-video' : ''} ${visible ? 'visible' : ''} ${fullWidth ? 'full-width' : ''}`}
      style={{ transitionDelay: `${delay}ms`, '--image-tilt': `${tilt}deg` }}
    >
      {isVideo ? (
        <video
          ref={videoRef}
          src={image.src}
          aria-label={image.alt}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      ) : (
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          width="1600"
          height="900"
        />
      )}
    </figure>
  )
}

export default ImageReveal
