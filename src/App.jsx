import { useEffect, useState } from "react";
import {
  fetchProjects,
  fetchMessages,
  createProject,
  sendMessage,
  updateProjectDescription,
} from "./api/api";

import ProjectList from "./components/ProjectList";
import ProjectHeader from "./components/ProjectHeader";
import StyleSelector from "./components/StyleSelector";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import MemoryPanel from "./components/MemoryPanel";
import logo from "./assets/logo.png";



export default function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [messages, setMessages] = useState([]);
  const [style, setStyle] = useState("default");
  const [sending, setSending] = useState(false);

  // Load projects on startup
  useEffect(() => {
    (async () => {
      const data = await fetchProjects();
      setProjects(data);
    })();
  }, []);
//Reset style when project changes
  useEffect(() => {
  if (!selectedProject) return;

  // eslint-disable-next-line react-hooks/set-state-in-effect
  setStyle("balanced");
}, [selectedProject?.id]);


  // Load messages when project changes
  useEffect(() => {
    if (!selectedProject) return;

    fetchMessages(selectedProject.id)
      .then(setMessages)
      .catch(console.error);
  }, [selectedProject]);

  // Create project
  async function handleCreateProject(name) {
    const newProject = await createProject(name);
    setProjects((prev) => [...prev, newProject]);
    setSelectedProject(newProject);
  }

  // Save project description
  async function handleSaveDescription(projectId, text) {
  await updateProjectDescription(projectId, text);

  // reload projects from DB (source of truth)
  const refreshed = await fetchProjects();
  setProjects(refreshed);

  const updatedProject = refreshed.find(p => p.id === projectId);
  setSelectedProject(updatedProject);
}



  // Send chat message
async function handleSendMessage(text) {
  if (!selectedProject) return;

  setSending(true);

  // 🔥 1. Show user message immediately
  const optimisticUserMessage = {
    id: "temp-" + Date.now(),
    role: "user",
    content: text,
  };

  setMessages((prev) => [...prev, optimisticUserMessage]);

  try {
    await sendMessage(selectedProject.id, text);

    // 🔁 Refresh messages from DB (authoritative)
    const updated = await fetchMessages(selectedProject.id);
    setMessages(updated);

    // 🔁 Refresh token counts
    const refreshedProjects = await fetchProjects();
    setProjects(refreshedProjects);
  } finally {
    setSending(false);
  }
}


  return (
    <div className="app">
      {/* SIDEBAR */}
      <ProjectList
        projects={projects}
        selectedId={selectedProject?.id}
        onSelect={setSelectedProject}
        onCreateProject={handleCreateProject}
      />

      {/* MAIN */}
      <div className="main">
        <MemoryPanel />
        <div className="top-bar">
          <a
           href="https://artlinco.com/"
           target="_blank"
           rel="noopener noreferrer"
>
        <img src={logo} className="logo" alt="Artlinco" />
          </a>

        </div>

        <ProjectHeader
          key={selectedProject?.id}
          project={selectedProject}
          onSaveDescription={handleSaveDescription}
/>

        <StyleSelector value={style} onChange={setStyle} />

        <ChatMessages messages={messages} loading={sending} />


        <ChatInput
          projectId={selectedProject?.id}
          onSend={handleSendMessage}
          disabled={!selectedProject || sending}
        />

      </div>
    </div>
  );
}
