import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Section from './components/Section'
import GallerySequence from './components/GallerySequence'
import ProjectIntro from './components/ProjectIntro'
import { content } from './data/content'

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
      <div className="particles" aria-hidden="true" />
      <Hero content={content.hero} />

      <Section id="introduction" title="Introduction" tone="glow">
        <p>{content.introduction.text}</p>
        <GallerySequence images={content.introduction.images} reducedMotion={reducedMotion} />
      </Section>

      <Section title="Visual worlds" tone="violet">
        <p>{content.visualWorlds.text}</p>
        <GallerySequence images={content.visualWorlds.images} reducedMotion={reducedMotion} />
      </Section>

      <Section title="I Am Piffy" tone="magenta">
        <p>{content.iAmPiffy.text}</p>
        <GallerySequence images={content.iAmPiffy.images} reducedMotion={reducedMotion} />
      </Section>

      <ProjectIntro project={content.bridgesOfLight} />

      <Section title="Bridges of Light" tone="blue" compact>
        <GallerySequence
          images={content.bridgesOfLight.sequence}
          reducedMotion={reducedMotion}
          fullWidth
        />
      </Section>

      <ProjectIntro project={content.wishingTree} />

      <Section title="Inside the Tree" tone="earth">
        <p>{content.wishingTree.insideText}</p>
        <GallerySequence images={content.wishingTree.insideImages} reducedMotion={reducedMotion} />
      </Section>

      <Section title="Workshops / co-creation" tone="glow">
        <p>{content.workshops.text}</p>
      </Section>

      <Section title="Digital experimentation" tone="grid">
        <p>{content.digital.text}</p>
        <GallerySequence images={content.digital.images} reducedMotion={reducedMotion} />
      </Section>

      <Section title="Closing" tone="magenta" compact>
        <p>{content.closing.text}</p>
        <p className="signature">{content.closing.signature}</p>
        <ul className="links" aria-label="Contact links">
          {content.closing.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  )
}

export default App
