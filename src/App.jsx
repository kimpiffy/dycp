import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Preloader from './components/Preloader'
import StorySection from './components/StorySection'
import ProjectIntro from './components/ProjectIntro'
import FallingStars from './components/FallingStars'
import { content } from './data/content'

function renderParagraphs(text) {
  return text.split('\n\n').map((paragraph, index) => <p key={`${index}-${paragraph}`}>{paragraph}</p>)
}

function App() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(mediaQuery.matches)

    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)

    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    const imageElements = Array.from(document.querySelectorAll('.page-content img'))

    if (imageElements.length === 0) {
      setIsLoading(false)
      return undefined
    }

    let cancelled = false
    let remainingImages = imageElements.length

    const markImageComplete = () => {
      remainingImages -= 1

      if (!cancelled && remainingImages <= 0) {
        setIsLoading(false)
      }
    }

    imageElements.forEach((image) => {
      if (image.complete && image.naturalWidth > 0) {
        remainingImages -= 1
        return
      }

      image.addEventListener('load', markImageComplete, { once: true })
      image.addEventListener('error', markImageComplete, { once: true })
    })

    if (remainingImages <= 0) {
      setIsLoading(false)
    }

    return () => {
      cancelled = true

      imageElements.forEach((image) => {
        image.removeEventListener('load', markImageComplete)
        image.removeEventListener('error', markImageComplete)
      })
    }
  }, [])

  return (
    <main className="app-shell">
      {isLoading ? <Preloader reducedMotion={reducedMotion} /> : null}
      <FallingStars reducedMotion={reducedMotion} />

      <section className="mobile-gate" aria-label="Mobile access notice">
        <p className="mobile-gate-message">
          This website has been designed for assessment purposes only. To access please view from a tablet, laptop or desktop PC.
        </p>
      </section>

      <div className="page-content">
        <Hero content={content.hero} />

        <StorySection
          id="introduction"
          tone="glow"
          hideTitle
          images={content.introduction.images}
          reducedMotion={reducedMotion}
          mediaAlignment="center"
          mediaNudge="intro"
        />

        <StorySection
          title="Early Practice"
          tone="violet"
          images={content.visualWorlds.images}
          reducedMotion={reducedMotion}
          mediaNudge="scatter"
          className="visual-worlds-intro"
        >
          <p className="project-collaborator">{content.visualWorlds.lead}</p>
          {renderParagraphs(content.visualWorlds.text)}
        </StorySection>

        <StorySection
          id="i-am-piffy"
          title="I Am Piffy"
          tone="magenta"
          reverse
          className="i-am-piffy-top i-am-piffy-media"
          images={content.iAmPiffy.images.slice(0, 3)}
          reducedMotion={reducedMotion}
        >
          <p className="project-collaborator">{content.iAmPiffy.intro}</p>
          {renderParagraphs(content.iAmPiffy.text)}
        </StorySection>

        <StorySection
          id="i-am-piffy-panorama"
          tone="magenta"
          hideTitle
          images={content.iAmPiffy.images.slice(3, 6)}
          reducedMotion={reducedMotion}
          mediaAlignment="center"
          mediaNudge="intro"
        />

        <ProjectIntro project={content.bridgesOfLight} reducedMotion={reducedMotion} className="bridges-intro" />

        <StorySection
          hideTitle
          tone="blue"
          images={[content.bridgesOfLight.belowImage]}
          reducedMotion={reducedMotion}
          fullWidthMedia
          mediaAlignment="center"
          className="bridges-below-image"
        />

        <ProjectIntro project={content.wishingTree} reducedMotion={reducedMotion} reverse className="wishing-tree-intro" />

        <StorySection
          hideTitle
          tone="earth"
          images={[content.wishingTree.belowImage]}
          reducedMotion={reducedMotion}
          fullWidthMedia
          mediaAlignment="center"
          className="wishing-tree-below-image"
        />

        <StorySection
          title="Workshops & Co-Creation"
          tone="glow"
          id="workshops"
          images={content.workshops.images}
          reducedMotion={reducedMotion}
          className="workshops-section"
        >
          <p>
            <span style={{ color: 'var(--accent-pink)' }}>
              I have facilitated creative workshops with a range of community groups, including ongoing work with the Monday Night Club.
            </span>
          </p>
          <p>
            These experiences have shaped my interest in accessibility and co-creation, reinforcing my belief that environments should be flexible enough to accommodate different ways of engaging, rather than expecting people to conform to a single way of experiencing them. Working alongside people with different needs and perspectives has strengthened my understanding of how thoughtful design can create richer and more inclusive experiences for everyone.
          </p>
          <p>
            I do not view environments and artwork as things to be passively consumed, and for this reason I am increasingly interested in how participants might contribute to and influence creative work from an earlier stage in the development process.
          </p>
          <p>
            I would like to explore this further after a period of focused research and development which I believe will allow me to investigate approaches that could support more collaborative and responsive ways of designing immersive experiences.
          </p>
        </StorySection>

        <StorySection
          title="Digital experimentation"
          tone="grid"
          reverse
          images={content.digital.images}
          reducedMotion={reducedMotion}
          className="digital-experimentation"
        >
          <p className="project-collaborator">{content.digital.lead}</p>
          {renderParagraphs(content.digital.text)}
        </StorySection>

      </div>

      <section className="journey-section tone-magenta compact thank-you-section" aria-label="Thank you">
        <div className="section-inner thank-you-inner">
          <div className="thank-you-copy">
            <h2 className="thank-you-title">THANK YOU</h2>
            <p className="thank-you-message">{content.closing.message}</p>
            <p className="thank-you-credit">Made with <span className="heart-icon" aria-hidden="true">♥</span> by Kim Piffy</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
