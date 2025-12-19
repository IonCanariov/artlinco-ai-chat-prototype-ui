import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";


export default function ChatMessages({ messages, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="chat-messages">
      {messages.map((m) => {
        const isUser = m.role === "user";

        return (
          <div
            key={m.id}
            className={`chat-row ${isUser ? "user" : "assistant"}`}
          >
            <div className="chat-label">
              {isUser ? "John" : "AI"}
            </div>

            <div className="chat-bubble">
              {isUser ? (
                m.content
              ) : (
                <ReactMarkdown>{m.content}</ReactMarkdown>
              )}
            </div>
          </div>
        );
      })}

      {/* 👇 Loading indicator */}
      {loading && (
        <div className="chat-row assistant">
          <div className="chat-label">AI</div>
          <div className="chat-bubble loading-bubble">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}

