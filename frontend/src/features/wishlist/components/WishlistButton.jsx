import { useWishlist } from "../hooks/useWishlist.js";

export default function WishlistButton({ productId }) {
  const { toggle, isWishlisted } = useWishlist();
  const active = isWishlisted(productId);

  if (!productId) return null;

  return (
    <button
      onClick={(e) => { e.stopPropagation(); toggle(productId); }}
      title={active ? "Remove from wishlist" : "Add to wishlist"}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: 20,
        lineHeight: 1,
        padding: "2px 4px",
        color: active ? "#e11d48" : "#9ca3af",
        transition: "color 0.2s, transform 0.15s",
        transform: active ? "scale(1.2)" : "scale(1)",
      }}
      aria-label={active ? "Remove from wishlist" : "Save to wishlist"}
    >
      {active ? "♥" : "♡"}
    </button>
  );
}
