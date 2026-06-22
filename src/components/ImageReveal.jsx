import { useEffect, useRef, useState } from 'react'

function ImageReveal({ image, delay = 0, reducedMotion = false, fullWidth = false }) {
  const [visible, setVisible] = useState(reducedMotion)
  const imageRef = useRef(null)

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
      { threshold: 0.2 },
    )

    observer.observe(imageRef.current)

    return () => observer.disconnect()
  }, [reducedMotion])

  return (
    <figure
      ref={imageRef}
      className={`image-reveal ${visible ? 'visible' : ''} ${fullWidth ? 'full-width' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
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
