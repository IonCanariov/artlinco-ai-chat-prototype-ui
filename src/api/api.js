const API_BASE = import.meta.env.VITE_API_BASE_URL;

// ---------------- PROJECTS ----------------

export async function fetchProjects() {
  const res = await fetch(`${API_BASE}/projects`);
  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }
  return res.json();
}

export async function createProject(name) {
  const res = await fetch(`${API_BASE}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    throw new Error("Failed to create project");
  }

  return res.json();
}

export async function updateProjectDescription(projectId, description) {
  const res = await fetch(`${API_BASE}/projects/${projectId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description }),
  });

  if (!res.ok) {
    throw new Error("Failed to update project description");
  }

  return res.json();
}

// ---------------- MESSAGES ----------------

export async function fetchMessages(projectId) {
  const res = await fetch(`${API_BASE}/messages?projectId=${projectId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch messages");
  }
  return res.json();
}

export async function sendMessage(projectId, content) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ projectId, content }),
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }

  return res.json();
}
