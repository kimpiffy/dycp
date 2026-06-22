function Hero({ content }) {
  return (
    <header className="hero" aria-label="Kim Piffy landing section">
      <div className="hero-content">
        <h1>{content.title}</h1>
        <p className="hero-role">{content.role}</p>
        <p>{content.subtitle}</p>
      </div>
      <a className="down-arrow" href="#introduction" aria-label="Scroll down">
        ↓
      </a>
    </header>
  )
}

export default Hero
