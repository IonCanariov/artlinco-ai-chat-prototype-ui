export default function ProjectList({
  projects,
  onSelect,
  selectedId,
  onCreateProject,
}) {
  function handleCreate() {
    const name = prompt("Project name?");
    if (!name) return;
    onCreateProject(name);
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Projects</h3>
        <button className="create-btn" onClick={handleCreate}>
          ＋
        </button>
      </div>

      {projects.length === 0 && (
        <div className="empty">No projects yet</div>
      )}

      {projects.map((p) => (
        <div
          key={p.id}
          className={`project-item ${p.id === selectedId ? "active" : ""}`}
          onClick={() => onSelect(p)}
        >
          <div className="project-name">{p.name}</div>
          <div className="project-tokens">{p.total_tokens} tokens</div>
        </div>
      ))}
    </div>
  );
}
