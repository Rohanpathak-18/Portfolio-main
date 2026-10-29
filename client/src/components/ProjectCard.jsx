export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className={`project-art art-${project.visual}`} aria-hidden="true">
        <div className="art-top">
          <span>RP / DIGITAL WORK</span>
          <span>SELECTED WORK</span>
        </div>
        <div className="art-orbit orbit-one" />
        <div className="art-orbit orbit-two" />
        <span className="art-mark">{project.mark}</span>
        <span className="art-caption">{project.category}</span>
      </div>
      <div className="project-meta">
        <div>
          <span className="eyebrow">
            {project.number} / {project.category}
          </span>
          <h3>{project.name}</h3>
        </div>
        <div className="project-actions">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer">
              LIVE &gt;
            </a>
          )}
          {project.link && (
            <a
              className="round-link"
              href={project.link}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${project.name} source code`}
            >
              &gt;
            </a>
          )}
        </div>
      </div>
      <p className="project-description">{project.description}</p>
      <div className="tag-list">
        {project.stack.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  );
}
