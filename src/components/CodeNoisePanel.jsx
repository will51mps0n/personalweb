const CodeNoisePanel = ({ project }) => {
  const hasProjectDetails = Boolean(project && (project.summary?.length || project.stack?.length));

  return (
    <div className={`code-noise-panel ${hasProjectDetails ? "is-active" : ""}`}>
      <article className="code-noise-panel__content">
        {hasProjectDetails ? (
          <div className="code-noise-panel__inner">
            <p className="code-noise-panel__label">Focused Project</p>
            <h3 className="code-noise-panel__title">{project.title}</h3>
            <ul className="code-noise-panel__bullets">
              {project.summary?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            {project.stack?.length ? (
              <div className="code-noise-panel__stack">
                <p>Tech Stack</p>
                <ul>
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="code-noise-panel__inner">
            <p className="code-noise-panel__placeholder">Hover a project title to view its highlights.</p>
          </div>
        )}
      </article>
    </div>
  );
};

export default CodeNoisePanel;
