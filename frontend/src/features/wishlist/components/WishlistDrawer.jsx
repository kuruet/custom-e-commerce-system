import { useWishlist } from "../hooks/useWishlist.js";
import { useNavigate } from "react-router-dom";

export default function WishlistDrawer({ isOpen, onClose }) {
  const { items, loading } = useWishlist();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
          zIndex: 998, backdropFilter: "blur(2px)"
        }}
      />

      {/* Drawer */}
      <div style={{
        position: "fixed", top: 0, right: 0, width: 360, height: "100vh",
        background: "#fff", zIndex: 999, overflowY: "auto",
        boxShadow: "-4px 0 24px rgba(0,0,0,0.12)",
        display: "flex", flexDirection: "column"
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid #f3f4f6" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>♥ Wishlist</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#6b7280" }}>✕</button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, padding: "16px 24px" }}>
          {loading && <p style={{ color: "#9ca3af", textAlign: "center", marginTop: 40 }}>Loading…</p>}

          {!loading && items.length === 0 && (
            <div style={{ textAlign: "center", marginTop: 60, color: "#9ca3af" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>♡</div>
              <p style={{ fontWeight: 600, color: "#374151" }}>Your wishlist is empty</p>
              <p style={{ fontSize: 13 }}>Save items you love using the ♡ button</p>
            </div>
          )}

          {items.map(product => (
            <div
              key={product._id}
              style={{
                display: "flex", gap: 14, padding: "12px 0",
                borderBottom: "1px solid #f9fafb", cursor: "pointer"
              }}
              onClick={() => { navigate(`/product/${product._id}`); onClose(); }}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 8, flexShrink: 0, background: "#f3f4f6" }}
                onError={e => { e.target.style.display = "none"; }}
              />
              <div>
                <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{product.title}</p>
                <p style={{ color: "#6b7280", fontSize: 13 }}>₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
