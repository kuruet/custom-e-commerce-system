import { useState } from "react";
import ChatWindow from "./ChatWindow.jsx";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("userToken");

  if (!isLoggedIn) return null;

  return (
    <>
      {open && <ChatWindow onClose={() => setOpen(false)} />}

      {/* Floating button */}
      <button
        onClick={() => setOpen(v => !v)}
        title="Chat with AI assistant"
        style={{
          position: "fixed", bottom: 24, right: 24, width: 52, height: 52,
          borderRadius: "50%", background: "#0f0f0f", color: "#fff",
          border: "none", cursor: "pointer", zIndex: 999,
          fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
          transition: "transform 0.2s, box-shadow 0.2s"
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? "✕" : "💬"}
      </button>
    </>
  );
}
