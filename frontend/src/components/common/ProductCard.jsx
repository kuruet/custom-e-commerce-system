import { useNavigate } from "react-router-dom";
import WishlistButton from "../../features/wishlist/components/WishlistButton";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div style={{ border: "1px solid #f0f0f0", borderRadius: 12, padding: 16, position: "relative", background: "#fff" }}>

      {/* Wishlist toggle — top-right */}
      <div style={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}>
        <WishlistButton productId={product._id} />
      </div>

      <img
        src={product.image}
        alt={product.title}
        style={{ width: "100%", height: 192, objectFit: "cover", borderRadius: 8, background: "#f9fafb" }}
        onError={e => { e.target.style.background = "#f3f4f6"; e.target.src = ""; }}
      />

      <h2 style={{ fontSize: 16, fontWeight: 600, marginTop: 12, marginBottom: 4 }}>
        {product.title}
      </h2>

      <p style={{ color: "#6b7280", marginBottom: 12 }}>₹{product.price}</p>

      <button
        onClick={() => navigate(`/product/${product._id}`)}
        style={{
          width: "100%", background: "#0f0f0f", color: "#fff",
          border: "none", borderRadius: 8, padding: "9px 0", cursor: "pointer",
          fontWeight: 600, fontSize: 14
        }}
      >
        View Product
      </button>
    </div>
  );
};

export default ProductCard;