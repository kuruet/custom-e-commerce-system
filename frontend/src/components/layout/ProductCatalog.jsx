/**
 * ProductCatalog.jsx
 * src/components/home/ProductCatalog.jsx
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  getCartItems,
  updateQuantity,
  removeFromCart,
} from "../../utils/cartStorage";

const products = [
  {
    id: 1,
    name: "Classic T-Shirt",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    price: 499,
  },
  {
    id: 2,
    name: "Premium Polo Shirt",
    image:
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&q=80",
    price: 699,
  },
  {
    id: 3,
    name: "Slim Fit Jeans",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
    price: 1199,
  },
  {
    id: 4,
    name: "Sports Jersey",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    price: 799,
  },
  {
    id: 5,
    name: "Baseball Hat",
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80",
    price: 399,
  },
  {
    id: 6,
    name: "Corporate Uniform",
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80",
    price: 999,
  },
  {
    id: 7,
    name: "Formal Shirt",
    image:
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&q=80",
    price: 849,
  },
  {
    id: 8,
    name: "Graphic T-Shirt",
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80",
    price: 549,
  },
  {
    id: 9,
    name: "Pique Polo Shirt",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
    price: 749,
  },
  {
    id: 10,
    name: "Cargo Jeans",
    image:
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&q=80",
    price: 1099,
  },
  {
    id: 11,
    name: "Football Jersey",
    image:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&q=80",
    price: 899,
  },
  {
    id: 12,
    name: "Snapback Hat",
    image:
      "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=600&q=80",
    price: 449,
  },
  {
    id: 13,
    name: "Classic Blue Jeans",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
    price: 1199,
  },
  {
    id: 14,
    name: "Oxford Formal Shirt",
    image:
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&q=80",
    price: 949,
  },
  {
    id: 15,
    name: "Oversized T-Shirt",
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
    price: 599,
  },
];

const delayClasses = [
  "delay-0",
  "[animation-delay:50ms]",
  "delay-100",
  "delay-150",
  "delay-200",
];

const ProductCard = ({ product, index, onAddToCart }) => {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const cart = getCartItems();
    const existing = cart.find((c) => c.id === product.id);

    if (existing) {
      setQuantity(existing.quantity);
    }
  }, []);

  const increaseQty = () => {
    if (quantity >= 10) return;

    updateQuantity(product.id, quantity + 1);
    setQuantity(quantity + 1);
    onAddToCart();
  };

  const decreaseQty = () => {
    if (quantity === 1) {
      removeFromCart(product.id);
      setQuantity(0);
    } else {
      updateQuantity(product.id, quantity - 1);
      setQuantity(quantity - 1);
    }

    onAddToCart();
  };

  const addItem = () => {
    addToCart({
      id: product.id,
      title: product.name,
      price: product.price,
      previewImage: product.image,
      quantity: 1,
    });

    setQuantity(1);
    onAddToCart();
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
      <div className="aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col items-center gap-3 px-3 pt-3 pb-4 flex-1">
        <h3 className="text-xs md:text-sm font-semibold text-gray-900 text-center uppercase">
          {product.name}
        </h3>

        {quantity === 0 ? (
          <button
            onClick={addItem}
            className="w-full text-xs font-semibold uppercase tracking-widest px-3 py-2 rounded-md border border-black text-black hover:bg-black hover:text-white transition"
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center justify-between w-full border rounded-md overflow-hidden">
            <button
              onClick={decreaseQty}
              className="px-3 py-2 hover:bg-gray-100"
            >
              -
            </button>

            <span className="font-semibold">{quantity}</span>

            <button
              onClick={increaseQty}
              className="px-3 py-2 hover:bg-gray-100"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const StickyCartBar = ({ visible, itemCount }) => {
  const navigate = useNavigate();

  return (
    <div
      className={[
        "fixed bottom-4 left-0 right-0 z-50 px-4 md:px-6",
        "transition-all duration-300",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none",
      ].join(" ")}
    >
      <div className="max-w-lg mx-auto">
        <button
          onClick={() => navigate("/shopping-cart")}
          className="w-full flex items-center justify-between bg-black text-white font-semibold rounded-xl py-4 px-6 hover:bg-zinc-800"
        >
          <span>🛒 {itemCount} items in cart</span>
          <span className="uppercase text-sm font-bold">Go to Cart →</span>
        </button>
      </div>
    </div>
  );
};

const ProductCatalog = () => {
  const [cartItemCount, setCartItemCount] = useState(0);

  const updateCartCount = () => {
    const cart = getCartItems();
    const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    setCartItemCount(total);
  };

  useEffect(() => {
    updateCartCount();
  }, []);

  return (
    <>
      <section className="w-full bg-[#f9fafa] py-12 md:py-16 lg:py-20">
        <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12">

          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
              Create custom products,
              <span className="italic font-light"> super fast</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 lg:gap-6">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onAddToCart={updateCartCount}
              />
            ))}
          </div>

        </div>
      </section>

      <StickyCartBar visible={cartItemCount > 0} itemCount={cartItemCount} />
    </>
  );
};

export default ProductCatalog;