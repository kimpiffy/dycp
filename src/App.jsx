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
        title="I Am Piffy"
        tone="magenta"
        reverse
        images={[...content.iAmPiffy.images, { src: '/images/visual-world-4.svg', alt: 'Symbolic mixed-media composition.' }]}
        reducedMotion={reducedMotion}
      >
        <p className="project-collaborator">{content.iAmPiffy.intro}</p>
        {renderParagraphs(content.iAmPiffy.text)}
      </StorySection>

      <ProjectIntro project={content.bridgesOfLight} reducedMotion={reducedMotion} />

      <ProjectIntro project={content.wishingTree} reducedMotion={reducedMotion} reverse />

      <StorySection
        title="Workshops / co-creation"
        tone="glow"
        images={[
          { src: '/images/intro-kim-2.svg', alt: 'Kim preparing immersive exhibition materials.' },
          { src: '/images/tree-stars.svg', alt: 'Visitors hanging wish stars from branches.' },
          { src: '/images/bridges-writing.svg', alt: 'People writing wishes during the event.' },
          { src: '/images/digital-web.svg', alt: 'Interactive web visual experiment.' },
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
