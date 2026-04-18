import { useRecommendations } from "../hooks/useRecommendations.js";
import { useNavigate } from "react-router-dom";

export default function RecommendationCarousel({ cartIds = [], title = "You May Also Like" }) {
  const { products, loading } = useRecommendations(cartIds);
  const navigate = useNavigate();

  if (loading) return (
    <div style={{ padding: "32px 0", textAlign: "center", color: "#9ca3af", fontSize: 14 }}>
      Loading recommendations…
    </div>
  );

  if (!products.length) return null;

  return (
    <section style={{ padding: "40px 0" }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, textAlign: "center", letterSpacing: "0.02em" }}>
        {title}
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 16,
        maxWidth: 900,
        margin: "0 auto",
        padding: "0 16px"
      }}>
        {products.slice(0, 6).map(product => (
          <div
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)}
            style={{
              border: "1px solid #f0f0f0",
              borderRadius: 12,
              padding: 16,
              cursor: "pointer",
              transition: "box-shadow 0.2s, transform 0.15s",
              background: "#fff"
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 8, background: "#f9fafb" }}
              onError={e => { e.target.style.background = "#f3f4f6"; e.target.src = ""; }}
            />
            <p style={{ fontWeight: 600, fontSize: 14, marginTop: 10, marginBottom: 4, lineHeight: 1.3 }}>
              {product.title}
            </p>
            <p style={{ color: "#6b7280", fontSize: 13 }}>₹{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
