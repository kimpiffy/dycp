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
    lead: 'My interests in mythology, philosophy and semiotics have always been a driving influence for my art and illustration.',
    text: 'For over 10 years, and through a range of media I have explored how visual forms could communicate big ideas and emotions that I often found difficult to express in words.\n\nMy mixed media artworks are primarily conceptual and figurative but I also frequently work with textiles and design surface patterns. Whatever I am working in, I have always been drawn to finding ways to incorporate colourful and tactile elements, and have a long standing fascination with U.V light and it\'s ability to surface the \'otherworld\'.\n\nLooking back, many of my early works felt like fragments of larger worlds I hadn\'t yet discovered how to build, and I was certainly driven by a desire to create atmosphere and invite imagination beyond the edges of a single artwork, (which is especially evident in the photoshoots which featured my clothing designs).\n\nThese elements became the components which have formed the foundation and knowledge base for my expansion into installation and spatial storytelling.',
    images: [
      { src: img('images/visual-world-1.webp'), alt: 'Mythic artwork with luminous symbols.' },
      { src: img('images/visual-world-2.webp'), alt: 'Contemporary illustration with layered forms.' },
      { src: img('images/visual-world-3.webp'), alt: 'Mandalas and pattern design details.' },
      { src: img('images/visual-world-4.webp'), alt: 'Symbolic mixed-media composition.' },
    ],
  },
  iAmPiffy: {
    intro: 'Self-funded and curated exhibition at Centrespace Gallery, Bristol.',
    text: 'My first solo exhibition presented an introspective, autobiographical body of work that drew on archetypes to shift from personal experience into universally recognisable themes.\n\nI transformed the gallery into an immersive ultra-violet environment and organised an accompanying independent makers’ market. For the open view, I experimented with VJ software for the first time, creating kaleidoscopic animations derived from my artworks which were synchronised to the music during live DJ performances.\n\nThis project marked an early exploration of immersive world-building.',
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
    text: 'This installation invited visitors to move through a landscape which included elements such as bridges, a glowing river and 1,000 origami cranes which were suspended overhead.\n\nNeurodivergent adults and disadvantaged young people created fish for the river and footprints to light the path.\n\nVisitors were invited to walk through the space, relax in the chill out area, enjoy the visuals with a calming soundscape, and share their own message for others to read around the portal into the future!\n\nCreating this installation shifted my focus beyond visual outcomes and towards the experience of the audience. I became excited by how sensory design could encourage calmness, curiosity, reflection and engagement.',
    sequence: [
      { src: img('images/bridges-1.webp'), alt: 'Paper cranes suspended in glowing light.' },
      { src: img('images/bridges-2.webp'), alt: 'A glowing river path through the installation.' },
      { src: img('images/bridges-3.webp'), alt: 'Wishing wall filled with participant messages.' },
      { src: img('images/bridges-4.webp'), alt: 'People writing wishes during the event.' },
      { src: img('images/bridges-5.webp'), alt: 'Public interaction inside the immersive space.' },
    ],
    belowImage: { src: img('images/bridges-6.webp'), alt: 'Public interaction inside the immersive space.' },
  },
  wishingTree: {
    title: 'The Wishing Tree',
    collaborator: 'A sensory calming zone at The Festival of Play, hosted by Scala, Worcester.',
    tone: 'earth',
    text: 'This installation centred around a three-metre, illuminated tree sculpture that I designed and fabricated as the focal point of a sensory environment. Visitors were invited to decorate and hang wishes from the tree which allowed it to function as a living system; evolving to become a collective record of hope and aspiration.\n\nThis ambitious project required me to develop new skills in order to construct the large-scale sculpture. Drawing on my longstanding interest in symbolism and archetypes, I was intrigued by how the familiar image of a tree could act as an intuitive point of connection, encouraging participation without too many instructions or pressure.\n\nAlongside strengthening my interest in participatory settings, this project sparked a growing curiosity about how sculpture and technology might work together in future. Observing the installation transform through audience contribution reinforced my interest in creating spaces that remain open to transformation through interaction.',
    insideImages: [
      { src: img('images/tree-1.webp'), alt: 'Young people sitting beneath the glowing tree.' },
      { src: img('images/tree-2.webp'), alt: 'Wheelchair user participating in the tree space.' },
      { src: img('images/tree-3.webp'), alt: 'Visitors hanging wish stars from branches.' },
      { src: img('images/tree-4.webp'), alt: 'Close-up of glowing stars with handwritten wishes.' },
    ],
    belowImage: { src: img('images/tree-5.webp'), alt: 'Textural detail of the tree structure and lighting.' },
  },
  workshops: {
    images: [
      { src: img('images/workshops-2.webp'), alt: 'Visitors hanging wish stars from branches.' },
      { src: img('images/workshops-3.webp'), alt: 'People writing wishes during the event.' },
      { src: img('images/workshops-4.webp'), alt: 'Interactive web visual experiment.' },
    ],
    text: 'I have facilitated creative workshops with a range of community groups, including ongoing work with the Monday Night Club.\n\nThese experiences have shaped my interest in accessibility and co-creation, reinforcing my belief that environments should be flexible enough to accommodate different ways of engaging, rather than expecting people to conform to a single way of experiencing them. Working alongside people with different needs and perspectives has strengthened my understanding of how thoughtful design can create richer and more inclusive experiences for everyone.\n\nI do not view environments and artwork as things to be passively consumed, and for this reason I am increasingly interested in how participants might contribute to and influence creative work from an earlier stage in the development process.\n\nI would like to explore this further after a period of focused research and development which I believe will allow me to investigate approaches that could support more collaborative and responsive ways of designing immersive experiences.',
  },
  digital: {
    lead: 'I am committed to lifelong learning and I am continually expanding my knowledge of coding, UX and UI design principles.',
    text: 'These skills provide a multitude of possibilities for developing immersive environments, while also strengthening my understanding of how people interact with and experience designed systems.\n\nI am interested in how digital technologies can expand the world-building already present within my installation practice. Whether through responsive environments, projection mapping, VJing or dynamic and interactive online spaces, I see digital tools as another way of creating and enhancing meaningful engagement rather than as a separate discipline.\n\nMy proposed DYCP will allow me sufficient time to deepen this area of research, exploring how responsive technologies can support immersive worldbuilding, accessibility and create new opportunities for audiences to engage with my work both online and in physical spaces.',
    images: [
      { src: img('images/digital-1.webp'), alt: 'Digital artwork still with layered light and color.' },
      { src: img('images/digital-2.mp4'), alt: 'Digital artwork loop showing moving light and texture.', type: 'video' },
    ],
  },
  closing: {
    message: 'I appreciate the time it will have taken you to read through my application.',
  },
}