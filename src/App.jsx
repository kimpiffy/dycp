import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import StorySection from './components/StorySection'
import ProjectIntro from './components/ProjectIntro'
import FallingStars from './components/FallingStars'
import { content } from './data/content'

function renderParagraphs(text) {
  return text.split('\n\n').map((paragraph, index) => <p key={`${index}-${paragraph}`}>{paragraph}</p>)
}

function App() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(mediaQuery.matches)

    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)

    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  return (
    <main>
      <FallingStars reducedMotion={reducedMotion} />
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
      >
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

      <ProjectIntro project={content.bridgesOfLight} reducedMotion={reducedMotion} />

      <ProjectIntro project={content.wishingTree} reducedMotion={reducedMotion} reverse />

      <StorySection
        title="Workshops / co-creation"
        tone="glow"
        images={[
          { src: '/images/intro-kim-2.webp', alt: 'Kim preparing immersive exhibition materials.' },
          { src: '/images/tree-stars.webp', alt: 'Visitors hanging wish stars from branches.' },
          { src: '/images/bridges-writing.webp', alt: 'People writing wishes during the event.' },
          { src: '/images/digital-web.webp', alt: 'Interactive web visual experiment.' },
        ]}
        reducedMotion={reducedMotion}
      >
        {renderParagraphs(content.workshops.text)}
      </StorySection>

      <StorySection
        title="Digital experimentation"
        tone="grid"
        reverse
        images={content.digital.images}
        reducedMotion={reducedMotion}
      >
        {renderParagraphs(content.digital.text)}
      </StorySection>

      <section className="journey-section tone-magenta compact social-links-section" aria-label="Social links">
        <div className="section-inner social-links-inner">
          <div className="social-links-grid">
            {content.closing.links.map((link) => (
              <a key={link.label} className="social-link-button" href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
