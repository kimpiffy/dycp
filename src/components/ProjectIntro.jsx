import StorySection from './StorySection'

function renderParagraphs(text) {
  return text.split('\n\n').map((paragraph, index) => <p key={`${index}-${paragraph}`}>{paragraph}</p>)
}

function ProjectIntro({ project, reducedMotion, reverse = false }) {
  return (
    <StorySection
      title={project.title}
      tone={project.tone}
      reverse={reverse}
      images={(project.sequence ?? project.insideImages)?.slice(0, 4)}
      reducedMotion={reducedMotion}
    >
      <p className="project-collaborator">{project.collaborator}</p>
      {renderParagraphs(project.text)}
      {project.insideText ? renderParagraphs(project.insideText) : null}
    </StorySection>
  )
}

export default ProjectIntro
