import ImageReveal from './ImageReveal'

function GallerySequence({ images, reducedMotion, fullWidth = false }) {
  return (
    <div className={`gallery ${fullWidth ? 'gallery-full-width' : 'gallery-collage'}`}>
      {images.map((image, index) => (
        <ImageReveal
          key={image.src}
          image={image}
          delay={index * 100}
          reducedMotion={reducedMotion}
          fullWidth={fullWidth}
          index={index}
        />
      ))}
    </div>
  )
}

export default GallerySequence
