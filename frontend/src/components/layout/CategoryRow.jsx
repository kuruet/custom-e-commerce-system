import { Link, useLocation } from "react-router-dom";

const categories = [
  { label: "Best Sellers", link: "/category/best-sellers" },
  { label: "New Arrivals", link: "/category/new-arrivals" },
  { label: "T-Shirts", link: "/category/tshirts" },
  { label: "Hoodies", link: "/category/hoodies" },
  { label: "Uniforms", link: "/category/uniforms" },
  { label: "Jerseys", link: "/category/jerseys" },
  { label: "Bottles & Mugs", link: "/category/bottles" },
  { label: "Caps", link: "/category/caps" },
  { label: "Bags", link: "/category/bags" },
  { label: "Office", link: "/category/office" },
  { label: "Gifting", link: "/category/gifting" },
  { label: "Tech", link: "/category/tech" },
];

const CategoryRow = () => {
  const location = useLocation();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

        .cat-row-root {
          font-family: 'DM Sans', sans-serif;
          animation: catRowSlideDown 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes catRowSlideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Hide scrollbar cross-browser */
        .cat-nav::-webkit-scrollbar { display: none; }
        .cat-nav { -ms-overflow-style: none; scrollbar-width: none; }

        /* Category link with animated underline */
        .cat-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: #6b7280;
          text-decoration: none;
          white-space: nowrap;
          padding: 4px 0;
          transition: color 0.18s ease;
        }
        .cat-link::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 50%;
          right: 50%;
          height: 1.5px;
          background: #0f0f0f;
          border-radius: 2px;
          transition: left 0.22s ease, right 0.22s ease;
        }
        .cat-link:hover {
          color: #0f0f0f;
        }
        .cat-link:hover::after {
          left: 0;
          right: 0;
        }
        .cat-link.active {
          color: #0f0f0f;
          font-weight: 600;
        }
        .cat-link.active::after {
          left: 0;
          right: 0;
          background: #0f0f0f;
        }

        /* Divider between "editorial" and normal categories */
        .cat-divider {
          width: 1px;
          height: 14px;
          background: #e5e7eb;
          flex-shrink: 0;
          margin: 0 4px;
        }

        /* CTA button */
        .cat-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #0f0f0f;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 7px 16px;
          border-radius: 8px;
          white-space: nowrap;
          flex-shrink: 0;
          transition: opacity 0.18s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 1px 4px rgba(0,0,0,0.12);
        }
        .cat-cta:hover {
          opacity: 0.87;
          transform: scale(1.03);
          box-shadow: 0 4px 14px rgba(0,0,0,0.18);
        }
        .cat-cta:active {
          transform: scale(0.97);
        }
        .cat-cta-arrow {
          display: inline-block;
          transition: transform 0.18s;
        }
        .cat-cta:hover .cat-cta-arrow {
          transform: translateX(3px);
        }

        /* Fade edges on scroll overflow */
        .cat-nav-wrapper {
          position: relative;
          min-width: 0;
          flex: 1;
        }
        .cat-nav-wrapper::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 40px;
          height: 100%;
          background: linear-gradient(to right, transparent, var(--cat-bg, #fff));
          pointer-events: none;
        }
      `}</style>

      <section
        className="cat-row-root hidden md:block w-full border-b border-border bg-card"
        style={{ "--cat-bg": "var(--card, #fff)" }}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4" style={{ height: 44 }}>

            {/* Category nav with fade-right edge */}
            <div className="cat-nav-wrapper">
              <nav
                aria-label="Product categories"
                className="cat-nav flex items-center gap-5 lg:gap-6 xl:gap-7 overflow-x-auto scroll-smooth"
              >
                {/* Editorial highlights */}
                {categories.slice(0, 2).map((cat) => (
                  <Link
                    key={cat.link}
                    to={cat.link}
                    className={`cat-link${location.pathname === cat.link ? " active" : ""}`}
                    style={{ color: location.pathname === cat.link ? "#0f0f0f" : "#111827", fontWeight: 600 }}
                  >
                    {cat.label}
                  </Link>
                ))}

                {/* Separator */}
                <span className="cat-divider" aria-hidden="true" />

                {/* Regular categories */}
                {categories.slice(2).map((cat) => (
                  <Link
                    key={cat.link}
                    to={cat.link}
                    className={`cat-link${location.pathname === cat.link ? " active" : ""}`}
                  >
                    {cat.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* CTA */}
            <Link to="/customize/T-shirt-white" className="cat-cta ml-4">
              Customize
              <span className="cat-cta-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryRow;