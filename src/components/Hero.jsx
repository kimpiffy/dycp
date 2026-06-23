import { useEffect, useState } from 'react'
import BlotterTitle from './BlotterTitle'

function Hero({ content }) {
  const [showArrow, setShowArrow] = useState(true)

  useEffect(() => {
    const updateArrowVisibility = () => {
      setShowArrow(window.scrollY < window.innerHeight * 0.5)
    }

    updateArrowVisibility()
    window.addEventListener('scroll', updateArrowVisibility, { passive: true })
    window.addEventListener('resize', updateArrowVisibility)

    return () => {
      window.removeEventListener('scroll', updateArrowVisibility)
      window.removeEventListener('resize', updateArrowVisibility)
    }
  }, [])

  return (
    <header className="hero" aria-label="Kim Piffy landing section">
      <div className="hero-content">
        <BlotterTitle as="h1" className="hero-title" text={content.title} />
        <p className="hero-role">{content.role}</p>
        <p className="hero-subtitle">{content.subtitle}</p>
      </div>
      <a className={`down-arrow ${showArrow ? '' : 'is-hidden'}`.trim()} href="#introduction" aria-label="Scroll down">
        ↓
      </a>
    </header>
  )
}

export default Hero
