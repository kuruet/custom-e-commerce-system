import { useState, useEffect, useCallback, useRef } from "react";
import { fetchChatHistory, sendChatMessage } from "../services/chat.api.js";
import { generateResponse } from "../services/chatEngine.js";

const isLoggedIn = () => !!localStorage.getItem("userToken");

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (!isLoggedIn() || initialized.current) return;
    initialized.current = true;
    fetchChatHistory()
      .then(res => setMessages(res.data?.messages || []))
      .catch(() => {});
  }, []);

  const send = useCallback(async (text) => {
    if (!text.trim() || !isLoggedIn()) return;
    
    // Add user message to UI immediately
    const userMsg = { sender: "USER", text: text.trim(), createdAt: new Date() };
    setMessages(prev => [...prev, userMsg]);
    
    setSending(true);
    try {
      // 1. Generate AI response locally
      const aiResponseText = await generateResponse(text.trim());
      const aiMsg = { sender: "AI", text: aiResponseText, createdAt: new Date() };
      
      // 2. Add AI response to UI
      setMessages(prev => [...prev, aiMsg]);
      
      // 3. (Optional) Sync with backend to keep chat history updated
      // We still call sendChatMessage silently so the backend saves it,
      // but we ignore the backend's static fallback response.
      sendChatMessage(text.trim()).catch(() => {});

    } catch (_) {
      // keep existing messages; user sees no crash
    } finally {
      setSending(false);
    }
  }, []);

  return { messages, sending, send };
}
