import { useState } from "react";
import { useLoyalty } from "../hooks/useLoyalty.js";

export default function RewardsPanel({ onRedeemed }) {
  const { points, redeem, error } = useLoyalty();
  const [input, setInput] = useState("");
  const [success, setSuccess] = useState(null);
  const [busy, setBusy] = useState(false);

  if (!localStorage.getItem("userToken")) return null;

  const handleRedeem = async () => {
    const amt = Number(input);
    if (!amt || amt <= 0) return;
    setBusy(true);
    setSuccess(null);
    try {
      const res = await redeem(amt);
      setSuccess(`✅ Redeemed ${amt} pts! Remaining: ${res.pointsRemaining}`);
      setInput("");
      if (onRedeemed) onRedeemed(res.pointsRemaining);
    } catch (_) {
      // error already set in hook
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{
      padding: "14px 16px", borderRadius: 10,
      background: "linear-gradient(135deg, #fffbeb, #fef3c7)",
      border: "1px solid #fcd34d"
    }}>
      <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: "#92400e" }}>
        ⭐ Loyalty Points: <strong>{points}</strong>
      </p>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="number"
          min="1"
          max={points}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Points to redeem"
          style={{
            flex: 1, padding: "6px 10px", borderRadius: 6,
            border: "1px solid #fcd34d", fontSize: 13, outline: "none"
          }}
        />
        <button
          onClick={handleRedeem}
          disabled={busy || !input || Number(input) > points}
          style={{
            padding: "6px 14px", borderRadius: 6, border: "none",
            background: "#d97706", color: "#fff", fontWeight: 600,
            fontSize: 13, cursor: "pointer", opacity: busy ? 0.6 : 1
          }}
        >
          {busy ? "…" : "Redeem"}
        </button>
      </div>

      {error && <p style={{ color: "#dc2626", fontSize: 12, marginTop: 6 }}>{error}</p>}
      {success && <p style={{ color: "#16a34a", fontSize: 12, marginTop: 6 }}>{success}</p>}
    </div>
  );
}
