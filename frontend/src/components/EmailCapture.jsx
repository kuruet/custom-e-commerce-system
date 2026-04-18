import { useState } from "react";
import { useEmail } from "../features/email/hooks/useEmail.js";

export default function EmailCapture() {
  const { subscribe, loading, error, success } = useEmail();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) return;
    await subscribe(email);
  };

  if (success) {
    return (
      <div style={{
        textAlign: "center", padding: "40px 20px", background: "#f9fafb",
        borderRadius: 16, margin: "40px auto", maxWidth: 600,
        animation: "fadeIn 0.5s ease-in"
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
        <h3 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 8px 0" }}>You're in!</h3>
        <p style={{ color: "#4b5563" }}>Check your inbox for a welcome surprise.</p>
      </div>
    );
  }

  return (
    <div style={{
      textAlign: "center", padding: "48px 24px", background: "#fdfbf7",
      borderRadius: 16, border: "1px solid #f3e8d6", margin: "40px auto", maxWidth: 640
    }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Join our community ✨</h2>
      <p style={{ color: "#4b5563", marginBottom: 32, fontSize: 16 }}>
        Get early access to drops, personalized deals, and exclusive offers.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 12, maxWidth: 440, margin: "0 auto" }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          style={{
            flex: 1, padding: "14px 20px", borderRadius: 8,
            border: "1px solid #e5e7eb", fontSize: 16, outline: "none",
            background: "#fff"
          }}
        />
        <button
          type="submit"
          disabled={loading || !email}
          style={{
            padding: "14px 28px", borderRadius: 8, border: "none",
            background: "#000", color: "#fff", fontWeight: 600,
            fontSize: 16, cursor: "pointer", transition: "transform 0.2s",
            opacity: loading ? 0.7 : 1
          }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = "scale(1.03)"; }}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          {loading ? "..." : "Subscribe"}
        </button>
      </form>

      {error && <p style={{ color: "#dc2626", marginTop: 16, fontSize: 14 }}>{error}</p>}
    </div>
  );
}
