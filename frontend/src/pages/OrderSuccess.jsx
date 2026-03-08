import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

/* ─── Confetti engine (no external deps) ─────────────────────────── */
function useConfetti(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const COLORS = [
      "#34d399", "#6ee7b7", "#a7f3d0",
      "#fbbf24", "#fde68a",
      "#60a5fa", "#bfdbfe",
      "#f9a8d4", "#ffffff",
    ];

    const pieces = Array.from({ length: 130 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 100,
      r: 4 + Math.random() * 6,
      d: 10 + Math.random() * 20,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      tilt: Math.random() * 10 - 10,
      tiltAngle: 0,
      tiltSpeed: 0.04 + Math.random() * 0.06,
      speed: 1.5 + Math.random() * 2.5,
      opacity: 1,
      shape: Math.random() > 0.5 ? "rect" : "circle",
    }));

    let frame;
    let tick = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tick++;

      pieces.forEach((p) => {
        p.tiltAngle += p.tiltSpeed;
        p.y += p.speed;
        p.tilt = Math.sin(p.tiltAngle) * 12;
        if (tick > 120) p.opacity = Math.max(0, p.opacity - 0.008);

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        if (p.shape === "circle") {
          ctx.arc(p.x + p.tilt, p.y, p.r, 0, Math.PI * 2);
        } else {
          ctx.translate(p.x + p.tilt, p.y);
          ctx.rotate(p.tiltAngle);
          ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
        }
        ctx.fill();
        ctx.restore();

        if (p.y > canvas.height) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
          p.opacity = tick > 120 ? 0 : 1;
        }
      });

      if (pieces.some((p) => p.opacity > 0)) {
        frame = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [canvasRef]);
}

/* ─── Animated check SVG ──────────────────────────────────────────── */
function AnimatedCheck() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow rings */}
      <span className="absolute w-32 h-32 rounded-full bg-emerald-400/10 animate-ping-slow" />
      <span className="absolute w-24 h-24 rounded-full bg-emerald-400/15 animate-ping-slower" />

      {/* Main circle */}
      <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-xl shadow-emerald-500/40 flex items-center justify-center">
        <svg
          viewBox="0 0 52 52"
          className="w-10 h-10"
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline
            points="14,26 22,34 38,18"
            className="check-path"
          />
        </svg>
      </div>
    </div>
  );
}

/* ─── Floating orb background ─────────────────────────────────────── */
function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-200/30 blur-3xl animate-orb-1" />
      <div className="absolute top-1/2 -right-40 w-80 h-80 rounded-full bg-sky-200/25 blur-3xl animate-orb-2" />
      <div className="absolute -bottom-24 left-1/3 w-72 h-72 rounded-full bg-teal-200/20 blur-3xl animate-orb-3" />
    </div>
  );
}

/* ─── Main component ──────────────────────────────────────────────── */
const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const canvasRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);

  useConfetti(canvasRef);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleCopy = () => {
    if (!orderId) return;
    navigator.clipboard.writeText(orderId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      {/* Keyframe styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .font-display { font-family: 'Fraunces', Georgia, serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }

        /* Check draw */
        .check-path {
          stroke-dasharray: 40;
          stroke-dashoffset: 40;
          animation: drawCheck 0.55s cubic-bezier(.65,0,.35,1) 0.35s forwards;
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }

        /* Card entrance */
        @keyframes cardUp {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        .card-enter {
          animation: cardUp 0.65s cubic-bezier(.22,1,.36,1) 0.1s both;
        }

        /* Staggered text reveals */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .fade-up-1 { animation: fadeUp 0.5s ease-out 0.55s both; }
        .fade-up-2 { animation: fadeUp 0.5s ease-out 0.70s both; }
        .fade-up-3 { animation: fadeUp 0.5s ease-out 0.85s both; }
        .fade-up-4 { animation: fadeUp 0.5s ease-out 1.00s both; }

        /* Pings */
        @keyframes pingSlow   { 75%, 100% { transform: scale(1.6); opacity: 0; } }
        @keyframes pingSlower { 75%, 100% { transform: scale(2.0); opacity: 0; } }
        .animate-ping-slow   { animation: pingSlow   1.8s cubic-bezier(0,0,.2,1) infinite; }
        .animate-ping-slower { animation: pingSlower 2.4s cubic-bezier(0,0,.2,1) 0.3s infinite; }

        /* Background orbs */
        @keyframes orb1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,20px) scale(1.08); } }
        @keyframes orb2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-20px,30px) scale(1.06); } }
        @keyframes orb3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(15px,-15px) scale(1.04); } }
        .animate-orb-1 { animation: orb1 8s ease-in-out infinite; }
        .animate-orb-2 { animation: orb2 10s ease-in-out infinite; }
        .animate-orb-3 { animation: orb3 7s ease-in-out infinite; }

        /* Order ID glow pulse */
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(52,211,153,0); }
          50%       { box-shadow: 0 0 0 6px rgba(52,211,153,0.12); }
        }
        .glow-pulse { animation: glowPulse 3s ease-in-out 1.2s infinite; }

        /* Button shimmer */
        .btn-shimmer {
          position: relative;
          overflow: hidden;
        }
        .btn-shimmer::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transition: left 0.5s ease;
        }
        .btn-shimmer:hover::after { left: 140%; }
      `}</style>

      {/* Confetti canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-50"
        aria-hidden="true"
      />

      {/* Background */}
      <div className="font-body min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-50 via-gray-50 to-teal-50/60 relative overflow-hidden">
        <BackgroundOrbs />

        {/* Card */}
        <div className="card-enter relative z-10 w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-200/80 border border-white/60 overflow-hidden">

            {/* Top accent stripe */}
            <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400" />

            <div className="px-8 pt-10 pb-10 text-center">

              {/* Check icon */}
              <div className="flex justify-center mb-7">
                <AnimatedCheck />
              </div>

              {/* Heading */}
              <h1 className="font-display text-3xl sm:text-4xl font-semibold text-slate-800 leading-tight mb-3 fade-up-1">
                Order Placed!
              </h1>

              {/* Sub-message */}
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed fade-up-2 mb-7">
                Thank you for your purchase.{" "}
                <span className="text-slate-700 font-medium">Your custom product</span> is being
                queued for processing and will be on its way soon.
              </p>

              {/* Order ID */}
              {orderId && (
                <div className="fade-up-3 mb-8">
                  <div className="glow-pulse rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/50 border border-emerald-100/80 p-4 text-left relative">
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-1.5 ml-0.5">
                      Order ID
                    </p>
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-mono text-slate-700 text-sm sm:text-base break-all leading-snug">
                        #{orderId}
                      </p>
                      <button
                        onClick={handleCopy}
                        title="Copy order ID"
                        className="flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-200
                          border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 hover:shadow-sm active:scale-95"
                      >
                        {copied ? (
                          <>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Copied
                          </>
                        ) : (
                          <>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                              <rect x="9" y="9" width="13" height="13" rx="2" />
                              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                            </svg>
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="fade-up-4 flex flex-col gap-3">
                {/* Primary CTA */}
                <Link
                  to="/"
                  className="btn-shimmer block w-full py-3.5 px-6 rounded-2xl text-white text-sm font-semibold tracking-wide
                    bg-gradient-to-r from-emerald-500 to-teal-500
                    hover:from-emerald-400 hover:to-teal-400
                    shadow-lg shadow-emerald-500/25
                    hover:shadow-xl hover:shadow-emerald-500/30
                    hover:-translate-y-0.5
                    active:translate-y-0 active:scale-[0.99]
                    transition-all duration-200"
                >
                  Continue Shopping
                </Link>

                {/* Secondary: delivery note */}
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                  A confirmation has been saved for your order.{" "}
                  <span className="text-slate-500">Check your order history for updates.</span>
                </p>
              </div>

            </div>

            {/* Bottom strip */}
            <div className="bg-gradient-to-r from-slate-50 to-teal-50/40 border-t border-slate-100 px-8 py-3.5 flex items-center justify-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 text-emerald-500 flex-shrink-0">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="text-slate-400 text-xs">
                Secured checkout · Cash on Delivery
              </span>
            </div>
          </div>

          {/* Floating badges */}
          <div className="fade-up-4 flex justify-center gap-3 mt-5">
            {["Order Confirmed", "COD", "Processing Soon"].map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium text-slate-400 bg-white/70 border border-slate-200/70 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;