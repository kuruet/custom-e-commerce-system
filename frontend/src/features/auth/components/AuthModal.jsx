import { useState, useEffect, useRef } from "react";
import Login from "../../../pages/Login";
import Signup from "../../../pages/Signup";

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [mode, setMode] = useState("login");
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef(null);

  // Handle open/close animation states
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  // ESC key closes modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        .auth-modal-overlay {
          animation: overlayFadeIn 0.25s ease forwards;
        }
        .auth-modal-card {
          animation: cardReveal 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          font-family: 'DM Sans', sans-serif;
        }
        .auth-modal-title {
          font-family: 'DM Serif Display', serif;
        }
        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes cardReveal {
          from { opacity: 0; transform: scale(0.94) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .tab-active {
          background: #0f0f0f;
          color: #ffffff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.18);
        }
        .tab-inactive {
          background: transparent;
          color: #6b7280;
        }
        .tab-inactive:hover {
          color: #1f2937;
          background: #f3f4f6;
        }
        .auth-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 18px 0;
        }
        .auth-divider::before,
        .auth-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e5e7eb;
        }
        .close-btn {
          transition: background 0.15s, color 0.15s, transform 0.15s;
        }
        .close-btn:hover {
          background: #f3f4f6;
          color: #111;
          transform: rotate(90deg);
        }
        .switch-link {
          color: #0f0f0f;
          font-weight: 600;
          text-decoration: none;
          border-bottom: 1.5px solid #0f0f0f;
          padding-bottom: 1px;
          transition: opacity 0.15s;
          cursor: pointer;
          background: none;
          border-top: none;
          border-left: none;
          border-right: none;
          font-size: inherit;
          font-family: inherit;
        }
        .switch-link:hover {
          opacity: 0.65;
        }
        .badge-pill {
          display: inline-block;
          background: #f0fdf4;
          color: #15803d;
          font-size: 11px;
          font-weight: 500;
          padding: 2px 9px;
          border-radius: 999px;
          border: 1px solid #bbf7d0;
          letter-spacing: 0.02em;
        }
        /* Scrollable form area for tall signup forms */
        .auth-form-scroll {
          max-height: 370px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #e5e7eb transparent;
        }
        .auth-form-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .auth-form-scroll::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 4px;
        }
      `}</style>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="auth-modal-overlay fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{ background: "rgba(10,10,10,0.55)", backdropFilter: "blur(6px)" }}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-label="Authentication"
      >
        {/* Card */}
        <div
          className="auth-modal-card bg-white rounded-2xl w-full relative"
          style={{
            maxWidth: 420,
            boxShadow: "0 24px 64px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.07)",
            padding: "36px 32px 28px",
          }}
        >
          {/* Top accent line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "15%",
              right: "15%",
              height: 3,
              background: "linear-gradient(90deg, #0f0f0f 0%, #555 100%)",
              borderRadius: "0 0 4px 4px",
            }}
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close authentication modal"
            className="close-btn absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400"
            style={{ fontSize: 17, fontWeight: 400, lineHeight: 1 }}
          >
            ✕
          </button>

          {/* Header */}
          <div style={{ marginBottom: 22 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              {/* Minimal logo mark */}
              <div
                style={{
                  width: 28,
                  height: 28,
                  background: "#0f0f0f",
                  borderRadius: 7,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1L13 4V10L7 13L1 10V4L7 1Z" stroke="white" strokeWidth="1.5" fill="none"/>
                  <circle cx="7" cy="7" r="2" fill="white"/>
                </svg>
              </div>
              <span className="auth-modal-title" style={{ fontSize: 20, color: "#0f0f0f", lineHeight: 1.2 }}>
                {mode === "login" ? "Welcome back" : "Create account"}
              </span>
            </div>
            <p style={{ fontSize: 13.5, color: "#6b7280", marginLeft: 38 }}>
              {mode === "login"
                ? "Sign in to continue to your account"
                : "Join thousands of happy customers"}
            </p>
          </div>

          {/* Tab Switcher */}
          <div
            style={{
              display: "flex",
              background: "#f9fafb",
              borderRadius: 10,
              padding: 4,
              marginBottom: 22,
              border: "1px solid #f3f4f6",
            }}
          >
            {["login", "signup"].map((tab) => (
              <button
                key={tab}
                onClick={() => setMode(tab)}
                className={mode === tab ? "tab-active" : "tab-inactive"}
                style={{
                  flex: 1,
                  padding: "8px 0",
                  borderRadius: 7,
                  fontSize: 13.5,
                  fontWeight: 500,
                  fontFamily: "inherit",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  letterSpacing: "0.01em",
                }}
              >
                {tab === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* Form Area */}
          <div className="auth-form-scroll">
            {mode === "login" ? (
             <Login modalMode onSuccess={onSuccess} />
            ) : (
             <Signup modalMode onSuccess={onSuccess} />
            )}
          </div>

          {/* Footer Switch */}
          <div
            style={{
              marginTop: 20,
              paddingTop: 16,
              borderTop: "1px solid #f3f4f6",
              textAlign: "center",
              fontSize: 13,
              color: "#6b7280",
            }}
          >
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button className="switch-link" onClick={() => setMode("signup")}>
                  Sign up free
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button className="switch-link" onClick={() => setMode("login")}>
                  Sign in
                </button>
              </>
            )}
          </div>

          {/* Trust badges */}
          <div
            style={{
              marginTop: 14,
              display: "flex",
              justifyContent: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <span className="badge-pill">🔒 Secure checkout</span>
            <span className="badge-pill">✓ No spam, ever</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModal;