import Section from './Section'

function ProjectIntro({ project }) {
  return (
    <Section title={project.title} tone={project.tone}>
      <p className="project-collaborator">{project.collaborator}</p>
      <p>{project.text}</p>
    </Section>
  )
}

export default ProjectIntro
