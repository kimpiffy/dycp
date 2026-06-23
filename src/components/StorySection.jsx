import BlotterTitle from './BlotterTitle'
import GallerySequence from './GallerySequence'

function StorySection({
  id,
  title,
  children,
  images,
  reducedMotion,
  tone = 'glow',
  compact = false,
  reverse = false,
  hideTitle = false,
  fullWidthMedia = false,
  mediaNudge = 'default',
  mediaAlignment = 'side',
}) {
  return (
    <section
      id={id}
      className={`journey-section tone-${tone} story-section ${compact ? 'compact' : ''} ${reverse ? 'is-reverse' : ''} ${!children ? 'media-only' : ''} ${fullWidthMedia ? 'has-full-media' : ''} ${mediaAlignment === 'below' ? 'media-below' : ''} ${mediaAlignment === 'center' ? 'media-center' : ''} ${mediaNudge !== 'default' ? `media-nudge-${mediaNudge}` : ''}`.trim()}
    >
      <div className="section-inner story-layout">
        <div className={`story-body ${reverse ? 'is-reverse' : ''} ${!images ? 'copy-only' : ''}`.trim()}>
          {children || (!hideTitle && title) ? (
            <div className="story-copy">
              {!hideTitle && title ? <BlotterTitle as="h2" text={title} /> : null}
              {children}
            </div>
          ) : null}
          {images ? (
            <div className="story-media">
              <GallerySequence images={images} reducedMotion={reducedMotion} fullWidth={fullWidthMedia} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default StorySection