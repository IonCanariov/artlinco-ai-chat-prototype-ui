import { useState, useRef, useEffect } from "react";

export default function ChatInput({ projectId, onSend, disabled }) {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  // ✅ CLEAR draft when project changes
  useEffect(() => {
    setText("");
  }, [projectId]);

  // Auto-grow textarea
  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "0px";
    textareaRef.current.style.height =
      Math.min(textareaRef.current.scrollHeight, 180) + "px";
  }, [text]);


  function handleSend() {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  }

  return (
    <div className="chat-input-wrapper">
      <textarea
        ref={textareaRef}
        className="chat-textarea"
        placeholder="Type your message…"
        value={text}
        disabled={disabled}
        onChange={(e) => setText(e.target.value)}
        rows={1}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />

      <button
        className="send-button"
        onClick={handleSend}
        disabled={disabled}
      >
        Send
      </button>
    </div>
  );
}


