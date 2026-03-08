/**
 * ProductCatalog.jsx
 * src/components/home/ProductCatalog.jsx
 *
 * - Full-width layout (no max-w-7xl container)
 * - 15 clothing category cards (2 / 2 / 5 column grid)
 * - Only "Add to Cart" button per card (Customize removed)
 * - Sticky bottom "Go to Cart" bar slides up when cart has items
 * - Cart integration via src/utils/cartStorage.js → addToCart()
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart, getCartItems } from "../../utils/cartStorage";
// ─── Product data — 15 clothing items ────────────────────────────────────────

const products = [
  {
    id: 1,
    name: "Classic T-Shirt",
    slug: "classic-tshirt",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    price: 499,
  },
  {
    id: 2,
    name: "Premium Polo Shirt",
    slug: "premium-polo",
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&q=80",
    price: 699,
  },
  {
    id: 3,
    name: "Slim Fit Jeans",
    slug: "slim-fit-jeans",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
    price: 1199,
  },
  {
    id: 4,
    name: "Sports Jersey",
    slug: "sports-jersey",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    price: 799,
  },
  {
    id: 5,
    name: "Baseball Hat",
    slug: "baseball-hat",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80",
    price: 399,
  },
  {
    id: 6,
    name: "Corporate Uniform",
    slug: "corporate-uniform",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80",
    price: 999,
  },
  {
    id: 7,
    name: "Formal Shirt",
    slug: "formal-shirt",
    image: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&q=80",
    price: 849,
  },
  {
    id: 8,
    name: "Graphic T-Shirt",
    slug: "graphic-tshirt",
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80",
    price: 549,
  },
  {
  id: 9,
  name: "Pique Polo Shirt",
  slug: "pique-polo",
  image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
  price: 749,
},
  {
    id: 10,
    name: "Cargo Jeans",
    slug: "cargo-jeans",
    image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&q=80",
    price: 1099,
  },
  {
    id: 11,
    name: "Football Jersey",
    slug: "football-jersey",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&q=80",
    price: 899,
  },
  {
    id: 12,
    name: "Snapback Hat",
    slug: "snapback-hat",
    image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=600&q=80",
    price: 449,
  },
{
  id: 13,
  name: "Classic Blue Jeans",
  slug: "classic-blue-jeans",
 image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
  price: 1199,
},
  {
    id: 14,
    name: "Oxford Formal Shirt",
    slug: "oxford-formal-shirt",
    image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&q=80",
    price: 949,
  },
  {
    id: 15,
    name: "Oversized T-Shirt",
    slug: "oversized-tshirt",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
    price: 599,
  },
];

// Stagger delay per column position (5-col grid)
const delayClasses = [
  "delay-0",
  "[animation-delay:50ms]",
  "delay-100",
  "delay-150",
  "delay-200",
];

// ─── Product Card ─────────────────────────────────────────────────────────────

const ProductCard = ({ product, index, onAddToCart }) => {
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart({
  id: product.id,
  title: product.name,
  price: product.price,
  previewImage: product.image,
});
    onAddToCart();           // notify parent to show sticky bar
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div
      className={[
        "group bg-white rounded-2xl overflow-hidden flex flex-col",
        "shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
        "hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]",
        "transition-all duration-300 ease-out",
        "opacity-0 animate-[fadeUp_0.45s_ease-out_forwards]",
        delayClasses[index % 5],
      ].join(" ")}
    >
      {/* Square image */}
      <div className="aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>

      {/* Card body */}
      <div className="flex flex-col items-center gap-3 px-3 pt-3 pb-4 flex-1 justify-between">
        <h3 className="text-xs md:text-sm font-semibold text-gray-900 text-center uppercase tracking-wide leading-snug line-clamp-2">
          {product.name}
        </h3>

        <button
          onClick={handleClick}
          aria-label={`Add ${product.name} to cart`}
          className={[
            "w-full text-[10px] md:text-xs font-semibold uppercase tracking-widest",
            "px-3 py-2 rounded-md border transition-all duration-200",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
            added
              ? "bg-green-600 border-green-600 text-white"
              : "border-black text-black hover:bg-black hover:text-white",
          ].join(" ")}
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

// ─── Sticky Bottom Cart Bar ───────────────────────────────────────────────────

const StickyCartBar = ({ visible, itemCount }) => {
  const navigate = useNavigate();

  return (
    <div
      aria-live="polite"
      aria-label="Cart summary"
      className={[
        "fixed bottom-4 left-0 right-0 z-50 px-4 md:px-6",
        "transition-all duration-300 ease-out",
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-full opacity-0 pointer-events-none",
      ].join(" ")}
    >
      <div className="max-w-lg mx-auto">
        <button
          onClick={() => navigate("/shopping-cart")}
          className="w-full flex items-center justify-between bg-black text-white font-semibold rounded-xl py-4 px-6 hover:bg-zinc-800 active:scale-[0.98] transition-all duration-200 shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
        >
          <span className="text-sm tracking-wide">
            🛒 {itemCount} item{itemCount !== 1 ? "s" : ""} in cart
          </span>
          <span className="flex items-center gap-1.5 text-sm font-bold tracking-wider uppercase">
            Go to Cart
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────

const ProductCatalog = () => {
  const [cartItemCount, setCartItemCount] = useState(0);

  // Sync count from cartStorage on mount
  useEffect(() => {
    const cart = getCartItems?.() ?? [];
    const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    setCartItemCount(total);
  }, []);

  const handleAddToCart = () => {
    // Re-read cart total after addToCart() was called in the card
    const cart = getCartItems?.() ?? [];
    const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    setCartItemCount(total);
  };

  return (
    <>
      {/* Keyframe — injected once, static string */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section
        aria-label="Product catalog"
        className="w-full bg-[#f9fafa] py-12 md:py-16 lg:py-20"
      >
        {/* Full-width container with side padding only */}
        <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12">

          {/* Heading */}
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">
              Create custom products,{" "}
              <span className="italic font-light">super fast</span>
            </h2>
            <p className="mt-3 text-sm md:text-base text-gray-500 max-w-xl mx-auto">
              Browse 1000+ products — no minimums, fast delivery, bulk discounts.
            </p>
          </div>

          {/* Grid — 2 / 2 / 5 columns, 15 cards = 3 rows on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 lg:gap-6">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Sticky bottom cart bar */}
      <StickyCartBar visible={cartItemCount > 0} itemCount={cartItemCount} />
    </>
  );
};

export default ProductCatalog;