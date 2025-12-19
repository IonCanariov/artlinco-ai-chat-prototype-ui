import { useState } from "react";

export default function ProjectHeader({ project, onSaveDescription }) {
  const [text, setText] = useState(project?.description || "");

  if (!project) {
    return <div className="project-header">Select a project</div>;
  }

  function save() {
    if (text !== project.description) {
      onSaveDescription(project.id, text);
    }
  }

  return (
    <div className="project-header">
      <h2>{project.name}</h2>

      <textarea
        placeholder="Project description..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.metaKey) {
            save(); // Cmd+Enter save
          }
        }}
      />
    </div>
  );
}
