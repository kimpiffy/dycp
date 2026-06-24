import { useEffect, useRef, useState } from 'react'

function ImageReveal({ image, delay = 0, reducedMotion = false, fullWidth = false, index = 0 }) {
  const [visible, setVisible] = useState(reducedMotion)
  const imageRef = useRef(null)
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

  return (
    <figure
      ref={imageRef}
      className={`image-reveal ${visible ? 'visible' : ''} ${fullWidth ? 'full-width' : ''}`}
      style={{ transitionDelay: `${delay}ms`, '--image-tilt': `${tilt}deg` }}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        width="1600"
        height="900"
      />
    </figure>
  )
}

export default ImageReveal
