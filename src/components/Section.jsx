import BlotterTitle from './BlotterTitle'

function Section({ id, title, children, tone = 'glow', compact = false }) {
  return (
    <section id={id} className={`journey-section tone-${tone} ${compact ? 'compact' : ''}`}>
      <div className="section-inner">
        {title ? <BlotterTitle as="h2" text={title} /> : null}
        {children}
      </div>
    </section>
  )
}

export default Section
