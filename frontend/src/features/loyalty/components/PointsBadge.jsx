import { useLoyalty } from "../hooks/useLoyalty.js";

export default function PointsBadge({ onClick }) {
  const { points, loading } = useLoyalty();

  if (loading || points == null) return null;

  return (
    <button
      onClick={onClick}
      title="Your loyalty points"
      style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        background: "linear-gradient(135deg, #f59e0b, #d97706)",
        color: "#fff", borderRadius: 999, padding: "4px 12px", border: "none",
        fontSize: 12, fontWeight: 700, cursor: onClick ? "pointer" : "default",
        boxShadow: "0 2px 8px rgba(217,119,6,0.3)", letterSpacing: "0.02em"
      }}
    >
      ⭐ {points} pts
    </button>
  );
}
