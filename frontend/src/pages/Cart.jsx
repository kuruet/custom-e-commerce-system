import { useEffect, useState } from "react";
import { getCartItems, clearCart } from "../utils/cartStorage";
import CartItem from "../components/cart/CartItem";
import { useNavigate } from "react-router-dom";
import AuthModal from "../components/auth/AuthModal";

export default function Cart() {

    const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
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

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-10">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (

        <div className="text-center py-20 border rounded-lg">
          <p className="text-gray-500 text-lg">
            Your cart is empty
          </p>
        </div>

      ) : (

        <div className="space-y-6">

          {/* Cart Items */}
          <div className="space-y-4">

            {cartItems.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                index={index}
                refreshCart={refreshCart}
              />
            ))}

          </div>

          {/* Cart Summary */}
          <div className="flex justify-between items-center border-t pt-6 mt-10">

            <div className="text-xl font-semibold">
              Total: ₹{totalPrice}
            </div>

            <button
  onClick={handleProceedToCheckout}
  className="..."
>
  Proceed to Checkout
</button>

            <div className="flex gap-4">

              <button
                onClick={() => {
                  clearCart();
                  refreshCart();
                }}
                className="px-5 py-3 border rounded-lg hover:bg-gray-100"
              >
                Clear Cart
              </button>

              

            </div>

          </div>

        </div>

      )}

    <AuthModal
  isOpen={showAuthModal}
  onClose={() => setShowAuthModal(false)}
  onSuccess={handleAuthSuccess}
/>

    </div>

    
  );
}