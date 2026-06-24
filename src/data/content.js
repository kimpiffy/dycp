const img = (path) => `${import.meta.env.BASE_URL}${path}`

export const content = {
  hero: {
    title: 'KIM PIFFY',
    role: 'Visual Artist • Installation Designer • Creative Technologist',
    subtitle: 'Creating sensory experiences across digital and physical spaces.',
  },
  introduction: {
    text: 'Hi, I’m Kim Piffy.',
    images: [
      { src: img('images/intro-kim-1.webp'), alt: 'Portrait of Kim in atmospheric light.' },
      { src: img('images/intro-kim-2.webp'), alt: 'Kim preparing immersive exhibition materials.' },
      { src: img('images/intro-kim-3.webp'), alt: 'Kim inside a lit installation space.' },
    ],
  },
  visualWorlds: {
    text: 'My interests in mythology, philosophy and semiotics have always been a driving influence for my art and illustration. I often work with textiles and design surface patterns. Whatever medium I am working in, I have always been drawn to finding ways to incorporate colourful and tactile elements, and use light as a material.',
    images: [
      { src: img('images/visual-world-1.webp'), alt: 'Mythic artwork with luminous symbols.' },
      { src: img('images/visual-world-2.webp'), alt: 'Contemporary illustration with layered forms.' },
      { src: img('images/visual-world-3.webp'), alt: 'Mandalas and pattern design details.' },
      { src: img('images/visual-world-4.webp'), alt: 'Symbolic mixed-media composition.' },
    ],
  },
  iAmPiffy: {
    intro: 'Self-funded and curated exhibition at Centrespace Gallery, Bristol.',
    text: 'My first solo exhibition presented an introspective, autobiographical body of work that drew on archetypes to shift from personal experience into universally recognisable themes.\n\nI transformed the gallery into an immersive ultra-violet environment and organised an accompanying independent makers’ market. For the open view, I experimented with VJ software for the first time, creating kaleidoscopic animations derived from my artworks and synchronising them with live DJ performances.\n\nThis project marked an early exploration of exhibition-making as world-building.',
    images: [
      { src: img('images/i-am-piffy-1.webp'), alt: 'UV-lit autobiographical artwork display.' },
      { src: img('images/i-am-piffy-2.webp'), alt: 'Visitors moving through I Am Piffy exhibition.' },
      { src: img('images/i-am-piffy-3.webp'), alt: 'Glowing details from I Am Piffy pieces.' },
      { src: img('images/i-am-piffy-4.webp'), alt: 'Additional I Am Piffy exhibition detail.' },
      { src: img('images/i-am-piffy-5.webp'), alt: 'Additional I Am Piffy installation view.' },
      { src: img('images/i-am-piffy-6.webp'), alt: 'Additional I Am Piffy artwork and space detail.' },
    ],
  },
  bridgesOfLight: {
    title: 'Imagining a Bright Future',
    collaborator: 'An immersive light installation for Bridges of Light by Severn Arts, Worcester.',
    tone: 'blue',
    text: 'My first creative health commission was a surreal landscape which featured atmospheric and symbolic elements including 1,000 origami cranes. Neurodivergent participants and local young people co-created fish for the river and footprints to light the path. Visitors were invited to walk through the space, interact with the environment, and share their own message for others to read.',
    sequence: [
      { src: img('images/bridges-cranes.webp'), alt: 'Paper cranes suspended in glowing light.' },
      { src: img('images/bridges-river.webp'), alt: 'A glowing river path through the installation.' },
      { src: img('images/bridges-wishing-wall.webp'), alt: 'Wishing wall filled with participant messages.' },
      { src: img('images/bridges-writing.webp'), alt: 'People writing wishes during the event.' },
      { src: img('images/bridges-interaction.webp'), alt: 'Public interaction inside the immersive space.' },
    ],
  },
  wishingTree: {
    title: 'The Wishing Tree',
    collaborator: 'A sensory calming zone at The Festival of Play, hosted by Scala, Worcester.',
    tone: 'earth',
    text: 'This ambitious project involved fabricating a large, transportable, glowing tree structure that invited visitors to create and hang wishes from the branches. The installation evolved through each contribution, becoming a living record of the community’s collective hopes and aspirations.',
    insideText:
      'The project introduced me to new materials and solidified my understanding of spatial planning, audience flow and accessible participation.',
    insideImages: [
      { src: img('images/tree-underneath.webp'), alt: 'Young people sitting beneath the glowing tree.' },
      { src: img('images/tree-wheelchair.webp'), alt: 'Wheelchair user participating in the tree space.' },
      { src: img('images/tree-stars.webp'), alt: 'Visitors hanging wish stars from branches.' },
      { src: img('images/tree-stars-close.webp'), alt: 'Close-up of glowing stars with handwritten wishes.' },
      { src: img('images/tree-texture.webp'), alt: 'Textural detail of the tree structure and lighting.' },
    ],
  },
  workshops: {
    text: "Workshops allow participants to contribute directly to installations. I'd like to take this one step further and have the opportunity to design an installation with them, making the environment something built with people rather than simply shown to them.",
  },
  digital: {
    text: 'My practice is now expanding into creative technology, projection mapping, interactive web design and digital immersivity. I am exploring how digital tools can extend the same values that run through my physical work: participation, atmosphere, accessibility, storytelling and shared experience.',
    images: [
      { src: img('images/digital-mapping.webp'), alt: 'Projection mapping trial with layered light.' },
      { src: img('images/digital-lightspace.webp'), alt: 'LightSpace app interface experiments.' },
      { src: img('images/digital-web.webp'), alt: 'Interactive web visual experiment.' },
      { src: img('images/digital-particles.webp'), alt: 'Digital visual showing responsive particles.' },
    ],
  },
  closing: {
    links: [
      { label: 'Instagram', href: 'https://instagram.com/' },
      { label: 'LinkedIn', href: 'https://linkedin.com/' },
      { label: 'Website', href: 'https://example.com' },
      { label: 'GitHub', href: 'https://github.com/kimpiffy' },
    ],
  },
}