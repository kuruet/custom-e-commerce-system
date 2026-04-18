import { useState, useRef, useEffect } from "react";
import { useChat } from "../hooks/useChat.js";

export default function ChatWindow({ onClose }) {
  const { messages, sending, send } = useChat();
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    const text = input;
    setInput("");
    await send(text);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div style={{
      position: "fixed", bottom: 90, right: 24, width: 340, height: 480,
      background: "#fff", borderRadius: 16, zIndex: 1000,
      boxShadow: "0 12px 48px rgba(0,0,0,0.18)",
      display: "flex", flexDirection: "column", overflow: "hidden"
    }}>
      {/* Header */}
      <div style={{
        background: "#0f0f0f", color: "#fff", padding: "14px 18px",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0
      }}>
        <div>
          <p style={{ fontWeight: 700, fontSize: 14, margin: 0 }}>💬 Nynth Assistant</p>
          <p style={{ fontSize: 11, color: "#9ca3af", margin: "2px 0 0" }}>Ask me anything</p>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: 18 }}>✕</button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.length === 0 && (
          <div style={{ textAlign: "center", color: "#9ca3af", marginTop: 40, fontSize: 13 }}>
            <p style={{ fontSize: 24, marginBottom: 8 }}>👋</p>
            <p>Hi! Ask me about orders, sizing, payments, or product recommendations.</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: msg.sender === "USER" ? "flex-end" : "flex-start"
          }}>
            <div style={{
              maxWidth: "80%", padding: "9px 13px", borderRadius: 12,
              fontSize: 13, lineHeight: 1.5, whiteSpace: "pre-wrap",
              background: msg.sender === "USER" ? "#0f0f0f" : "#f3f4f6",
              color: msg.sender === "USER" ? "#fff" : "#1f2937",
              borderBottomRightRadius: msg.sender === "USER" ? 4 : 12,
              borderBottomLeftRadius: msg.sender === "AI" ? 4 : 12,
            }}>
              {msg.text}
            </div>
          </div>
        ))}

        {sending && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ background: "#f3f4f6", borderRadius: 12, padding: "9px 16px", fontSize: 18, color: "#9ca3af" }}>
              ···
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: "12px 14px", borderTop: "1px solid #f3f4f6",
        display: "flex", gap: 8, flexShrink: 0
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type a message…"
          disabled={sending}
          style={{
            flex: 1, padding: "9px 12px", borderRadius: 8, border: "1.5px solid #e5e7eb",
            fontSize: 13, outline: "none", fontFamily: "inherit"
          }}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || sending}
          style={{
            padding: "9px 14px", borderRadius: 8, border: "none",
            background: "#0f0f0f", color: "#fff", fontWeight: 600,
            fontSize: 13, cursor: "pointer", opacity: (!input.trim() || sending) ? 0.5 : 1
          }}
        >
          ↑
        </button>
      </div>
    </div>
  );
}
