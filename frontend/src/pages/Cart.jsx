import { useEffect, useState } from "react";
import { getCartItems, clearCart } from "../utils/cartStorage";
import CartItem from "../components/cart/CartItem";
import { useNavigate } from "react-router-dom";
import AuthModal from "../components/auth/AuthModal";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    navigate("/order-checkout");
  };

  const refreshCart = () => {
    setCartItems(getCartItems());
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const handleProceedToCheckout = () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      setShowAuthModal(true);
      return;
    }
    navigate("/order-checkout");
  };

  const handleClearCart = () => {
    setIsClearing(true);
    setTimeout(() => {
      clearCart();
      refreshCart();
      setIsClearing(false);
    }, 350);
  };

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600&display=swap');

        .cart-root {
          font-family: 'DM Sans', sans-serif;
          animation: cartFadeIn 0.4s ease both;
        }
        @keyframes cartFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cart-title {
          font-family: 'DM Serif Display', serif;
        }
        .cart-item-row {
          animation: itemSlideIn 0.35s ease both;
        }
        @keyframes itemSlideIn {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* Checkout button */
        .btn-checkout {
          background: #0f0f0f;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          letter-spacing: 0.01em;
        }
        .btn-checkout:hover {
          opacity: 0.88;
          transform: scale(1.02);
          box-shadow: 0 6px 24px rgba(0,0,0,0.18);
        }
        .btn-checkout:active {
          transform: scale(0.98);
        }

        /* Clear button */
        .btn-clear {
          background: transparent;
          color: #6b7280;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.18s, color 0.18s, border-color 0.18s, transform 0.15s;
        }
        .btn-clear:hover {
          background: #fef2f2;
          color: #dc2626;
          border-color: #fecaca;
        }
        .btn-clear:active {
          transform: scale(0.97);
        }
        .btn-clear:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        /* Summary card */
        .summary-card {
          background: #fff;
          border: 1px solid #f0f0f0;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          transition: box-shadow 0.2s;
        }
        .summary-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.10);
        }

        /* Empty state */
        .empty-state {
          animation: cartFadeIn 0.4s ease both;
        }
        .empty-icon-ring {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #f9fafb;
          border: 2px dashed #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 32px;
        }
        .btn-shop {
          background: #0f0f0f;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 14.5px;
          cursor: pointer;
          padding: 12px 28px;
          transition: opacity 0.2s, transform 0.15s;
          margin-top: 20px;
        }
        .btn-shop:hover {
          opacity: 0.85;
          transform: scale(1.02);
        }

        /* Divider row */
        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          color: #6b7280;
          padding: 6px 0;
        }
        .summary-total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 17px;
          font-weight: 700;
          color: #0f0f0f;
          padding-top: 14px;
          border-top: 1.5px solid #f0f0f0;
          margin-top: 8px;
        }
        .badge-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #0f0f0f;
          color: #fff;
          font-size: 11.5px;
          font-weight: 600;
          border-radius: 999px;
          padding: 2px 9px;
          margin-left: 10px;
          vertical-align: middle;
        }

        /* Top accent */
        .page-accent {
          height: 3px;
          background: linear-gradient(90deg, #0f0f0f 0%, #888 100%);
          border-radius: 0 0 4px 4px;
          width: 48px;
          margin-bottom: 10px;
        }

        /* Clearing overlay animation */
        .clearing {
          opacity: 0.4;
          pointer-events: none;
          transition: opacity 0.3s;
        }

        @media (max-width: 640px) {
          .cart-layout { flex-direction: column; }
          .summary-card { margin-top: 0; }
        }
      `}</style>

      <div
        className="cart-root w-full max-w-6xl mx-auto"
        style={{ padding: "40px 20px 80px" }}
      >
        {/* Page Header */}
        <div style={{ marginBottom: 36 }}>
          <div className="page-accent" />
          <h1 className="cart-title" style={{ fontSize: 32, color: "#0f0f0f", marginBottom: 4 }}>
            Your Cart
            {cartItems.length > 0 && (
              <span className="badge-count">{totalItems}</span>
            )}
          </h1>
          <p style={{ fontSize: 14, color: "#9ca3af" }}>
            {cartItems.length > 0
              ? `${cartItems.length} product${cartItems.length > 1 ? "s" : ""} in your bag`
              : "Nothing added yet"}
          </p>
        </div>

        {/* Empty State */}
        {cartItems.length === 0 ? (
          <div className="empty-state" style={{ textAlign: "center", paddingTop: 60, paddingBottom: 80 }}>
            <div className="empty-icon-ring">🛒</div>
            <p style={{ fontSize: 20, fontWeight: 600, color: "#1f2937", marginBottom: 6 }}>
              Your cart is empty
            </p>
            <p style={{ fontSize: 14, color: "#9ca3af", maxWidth: 280, margin: "0 auto" }}>
              Looks like you haven't added anything yet. Start exploring our collection.
            </p>
            <button className="btn-shop" onClick={() => navigate("/")}>
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Two-column layout: items left, summary right */
          <div
            className="cart-layout"
            style={{
              display: "flex",
              gap: 28,
              alignItems: "flex-start",
            }}
          >
            {/* ── Left: Cart Items ── */}
            <div
              className={isClearing ? "clearing" : ""}
              style={{ flex: 1, minWidth: 0 }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {cartItems.map((item, index) => (
                  <div
                    className="cart-item-row"
                    key={index}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <CartItem
                      item={item}
                      index={index}
                      refreshCart={refreshCart}
                    />
                  </div>
                ))}
              </div>

              {/* Clear cart link below items */}
              <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
                <button
                  className="btn-clear"
                  onClick={handleClearCart}
                  disabled={isClearing}
                  style={{ padding: "8px 18px" }}
                >
                  {isClearing ? "Clearing…" : "🗑 Clear cart"}
                </button>
              </div>
            </div>

            {/* ── Right: Order Summary ── */}
            <div
              className="summary-card"
              style={{
                width: "100%",
                maxWidth: 320,
                flexShrink: 0,
                padding: "24px 22px",
                position: "sticky",
                top: 112,
              }}
            >
              <p
                style={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Order Summary
              </p>

              {/* Line items */}
              <div>
                {cartItems.map((item, i) => (
                  <div className="summary-row" key={i}>
                    <span style={{ maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.name} <span style={{ color: "#d1d5db" }}>×{item.quantity}</span>
                    </span>
                    <span>₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>

              {/* Shipping */}
              <div className="summary-row" style={{ marginTop: 4 }}>
                <span>Shipping</span>
                <span style={{ color: "#16a34a", fontWeight: 500 }}>Free</span>
              </div>

              {/* Total */}
              <div className="summary-total-row">
                <span>Total</span>
                <span>₹{totalPrice.toLocaleString("en-IN")}</span>
              </div>

              {/* Checkout button */}
              <button
                className="btn-checkout"
                onClick={handleProceedToCheckout}
                style={{ width: "100%", padding: "14px 0", marginTop: 20 }}
              >
                Proceed to Checkout →
              </button>

              {/* Trust note */}
              <p
                style={{
                  fontSize: 12,
                  color: "#b0b7c3",
                  textAlign: "center",
                  marginTop: 12,
                }}
              >
                🔒 Secure checkout &nbsp;·&nbsp; Free returns
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}