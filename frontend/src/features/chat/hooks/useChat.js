import { useState, useEffect, useCallback, useRef } from "react";
import { fetchChatHistory, sendChatMessage } from "../services/chat.api.js";

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
    setSending(true);
    try {
      const res = await sendChatMessage(text.trim());
      setMessages(res.data?.messages || []);
    } catch (_) {
      // keep existing messages; user sees no crash
    } finally {
      setSending(false);
    }
  }, []);

  return { messages, sending, send };
}
