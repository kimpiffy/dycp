function Section({ id, title, children, tone = 'glow', compact = false }) {
  return (
    <section id={id} className={`journey-section tone-${tone} ${compact ? 'compact' : ''}`}>
      <div className="section-inner">
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  )
}

export default Section
