import { useRef, useState, useEffect } from "react";

const products = [
  {
    label: "Merino Wool Overcoat",
    price: "₹12,999",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80&fit=crop",
    tag: "Limited Edition",
  },
  {
    label: "Premium French Terry Hoodie",
    price: "₹5,499",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80&fit=crop",
    tag: "Coming Soon",
  },
  {
    label: "Pima Cotton Crewneck",
    price: "₹3,299",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&q=80&fit=crop",
    tag: "Coming Soon",
  },
  {
    label: "Celebrity Streetwear Jacket",
    price: "₹9,799",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80&fit=crop",
    tag: "Exclusive",
  },
  {
    label: "Luxury Bomber Jacket",
    price: "₹11,499",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80&fit=crop",
    tag: "Coming Soon",
  },
 {
  label: "Structured Linen Blazer",
  price: "₹8,299",
  image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=600&q=80&fit=crop",
  tag: "Coming Soon",
},
  {
    label: "Heritage Fleece Pullover",
    price: "₹4,799",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80&fit=crop",
    tag: "Limited Edition",
  },
  {
    label: "Raw Edge Premium Tee",
    price: "₹2,499",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80&fit=crop",
    tag: "Coming Soon",
  },
  {
    label: "Double-Faced Cashmere Coat",
    price: "₹18,999",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80&fit=crop",
    tag: "Exclusive",
  },
];

const tagColors = {
  "Coming Soon": { bg: "#0f0f0f", text: "#fff" },
  "Limited Edition": { bg: "#7c3aed", text: "#fff" },
  "Exclusive": { bg: "#b45309", text: "#fff" },
};

const UpcomingPremiumRow = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    updateArrows();
    return () => el.removeEventListener("scroll", updateArrows);
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .upr-root {
          font-family: 'DM Sans', sans-serif;
          background: #FAF6F0;
          position: relative;
          overflow: hidden;
        }

        /* Grain texture overlay */
        .upr-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .upr-inner {
          position: relative;
          z-index: 1;
        }

        /* Header */
        .upr-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #a78060;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .upr-eyebrow::before,
        .upr-eyebrow::after {
          content: '';
          flex: none;
          width: 28px;
          height: 1px;
          background: #c8a882;
        }
        .upr-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 5vw, 58px);
          font-weight: 300;
          color: #1a1410;
          letter-spacing: -0.01em;
          line-height: 1.05;
          margin-bottom: 12px;
        }
        .upr-title em {
          font-style: italic;
          font-weight: 300;
          color: #7c5c3a;
        }
        .upr-subtitle {
          font-size: 14px;
          font-weight: 300;
          color: #9c8878;
          letter-spacing: 0.02em;
        }

        /* Scroll container */
        .upr-scroll {
          overflow-x: auto;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          cursor: grab;
        }
        .upr-scroll:active { cursor: grabbing; }
        .upr-scroll::-webkit-scrollbar { display: none; }
        .upr-scroll { -ms-overflow-style: none; scrollbar-width: none; }

        /* Cards track */
        .upr-track {
          display: flex;
          gap: 18px;
          padding: 8px 2px 20px;
        }

        /* Card */
        .upr-card {
          flex: 0 0 auto;
          width: 230px;
          background: #fff;
          border-radius: 14px;
          border: 1px solid rgba(0,0,0,0.06);
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease;
          animation: cardFadeUp 0.5s ease both;
        }
        @keyframes cardFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .upr-card:hover {
          transform: translateY(-5px) scale(1.01);
          box-shadow: 0 14px 36px rgba(0,0,0,0.11);
        }

        /* Image wrapper */
        .upr-img-wrap {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: #f5f0ea;
        }
        .upr-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .upr-card:hover .upr-img {
          transform: scale(1.06);
        }

        /* Badge */
        .upr-badge {
          position: absolute;
          top: 11px;
          left: 11px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          padding: 4px 10px;
          border-radius: 999px;
          text-transform: uppercase;
        }

        /* Blur overlay on hover */
        .upr-img-overlay {
          position: absolute;
          inset: 0;
          background: rgba(250,246,240,0.12);
          opacity: 0;
          transition: opacity 0.25s;
        }
        .upr-card:hover .upr-img-overlay { opacity: 1; }

        /* Card info */
        .upr-card-info {
          padding: 14px 15px 16px;
          border-top: 1px solid #f5f0ea;
        }
        .upr-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15.5px;
          font-weight: 600;
          color: #1a1410;
          margin-bottom: 4px;
          line-height: 1.3;
        }
        .upr-card-price {
          font-size: 12.5px;
          font-weight: 400;
          color: #a08060;
          letter-spacing: 0.02em;
        }

        /* Nav arrows */
        .upr-arrow {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.09);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          transition: transform 0.18s, box-shadow 0.18s, opacity 0.18s, background 0.15s;
          color: #1a1410;
          font-size: 16px;
        }
        .upr-arrow:hover {
          transform: scale(1.12);
          box-shadow: 0 6px 20px rgba(0,0,0,0.13);
          background: #1a1410;
          color: #FAF6F0;
        }
        .upr-arrow:active { transform: scale(0.95); }
        .upr-arrow:disabled {
          opacity: 0.28;
          cursor: default;
          transform: none;
          box-shadow: none;
        }

        /* Section entrance */
        .upr-entrance {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .upr-entrance.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Decorative top border */
        .upr-top-accent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, #c8a882 30%, #a07850 60%, transparent 100%);
          opacity: 0.6;
        }

        @media (max-width: 768px) {
          .upr-card { width: 185px; }
          .upr-track { gap: 12px; }
        }
        @media (max-width: 480px) {
          .upr-card { width: 160px; }
        }
      `}</style>

      <section ref={sectionRef} className="upr-root" style={{ paddingTop: 72, paddingBottom: 80 }}>
        <div className="upr-top-accent" />

        <div className={`upr-inner upr-entrance${visible ? " visible" : ""}`}>
          <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 24px" }}>

            {/* Header */}
            <div style={{ marginBottom: 40, maxWidth: 560 }}>
              <div className="upr-eyebrow">Curated Collection</div>
              <h2 className="upr-title">
                Future <em>Premium</em> Line
              </h2>
              <p className="upr-subtitle">
                Next generation premium apparel — launching soon.
              </p>
            </div>

            {/* Carousel + Arrows */}
            <div style={{ position: "relative" }}>

              {/* Left arrow */}
              <button
                className="upr-arrow"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                style={{
                  position: "absolute",
                  left: -20,
                  top: "50%",
                  transform: canScrollLeft ? "translateY(-50%)" : "translateY(-50%) scale(0.85)",
                  zIndex: 10,
                }}
              >
                ←
              </button>

              {/* Scroll track */}
              <div
                ref={scrollRef}
                className="upr-scroll"
                style={{ padding: "0 4px" }}
              >
                <div className="upr-track">
                  {products.map((product, idx) => {
                    const badge = tagColors[product.tag] || tagColors["Coming Soon"];
                    return (
                      <div
                        key={idx}
                        className="upr-card"
                        style={{ animationDelay: `${idx * 0.06}s` }}
                      >
                        {/* Image */}
                        <div className="upr-img-wrap">
                          <img
                            src={product.image}
                            alt={product.label}
                            className="upr-img"
                            loading="lazy"
                          />
                          <div className="upr-img-overlay" />
                          {/* Badge */}
                          <span
                            className="upr-badge"
                            style={{ background: badge.bg, color: badge.text }}
                          >
                            {product.tag}
                          </span>
                        </div>

                        {/* Info */}
                        <div className="upr-card-info">
                          <div className="upr-card-name">{product.label}</div>
                          <div className="upr-card-price">{product.price}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right arrow */}
              <button
                className="upr-arrow"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                style={{
                  position: "absolute",
                  right: -20,
                  top: "50%",
                  transform: canScrollRight ? "translateY(-50%)" : "translateY(-50%) scale(0.85)",
                  zIndex: 10,
                }}
              >
                →
              </button>
            </div>

            {/* Footer note */}
            <p style={{ marginTop: 32, fontSize: 12, color: "#c8b8a8", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Notify me when available &nbsp;·&nbsp; Stay tuned for launch dates
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpcomingPremiumRow;