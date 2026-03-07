import { useEffect, useState } from "react";
import { getCartItems } from "../utils/cartStorage";
import CartItem from "../components/cart/CartItem";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = getCartItems();
    setCartItems(items);
  }, []);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="w-full p-6">

      <h1 className="text-3xl font-bold mb-8">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-6">

         {cartItems.map((item, index) => (
  <CartItem
    key={index}
    item={item}
    index={index}
    refreshCart={() => setCartItems(getCartItems())}
  />
))}

          {/* Total */}
          <div className="text-xl font-semibold">
            Total: ₹{totalPrice}
          </div>

          {/* Checkout */}
          <button className="bg-black text-white px-6 py-3 rounded">
            Proceed to Checkout
          </button>

        </div>
      )}

    </div>
  );
}