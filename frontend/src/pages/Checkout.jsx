import { useEffect, useState } from "react";
import { getCartItems } from "../utils/cartStorage";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/api";
import { clearCart } from "../utils/cartStorage";

const Checkout = () => {

    const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  useEffect(() => {
    const items = getCartItems();
    setCartItems(items);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const handlePlaceOrder = async () => {
  try {
    const orderData = {
      customer: {
        name: form.name,
        phone: form.phone,
        address: form.address,
        city: form.city,
        postalCode: form.postalCode,
      },

      items: cartItems,

      totalPrice,
    };

    await createOrder(orderData);

    clearCart();

    navigate("/order-success");
  } catch (error) {
    console.error("Order creation failed", error);
  }
};

  return (
    <div className="max-w-6xl mx-auto p-6">
      
      <h1 className="text-3xl font-bold mb-8">
        Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-10">

        {/* Order Summary */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Your Order
          </h2>

          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 border p-3 rounded-lg"
              >
                <img
                  src={item.previewImage}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Color: {item.color}
                  </p>

                  <p className="text-sm">
                    Qty: {item.quantity}
                  </p>

                  <p className="font-medium">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold">
              Total: ₹{totalPrice}
            </h3>
          </div>
        </div>

        {/* Shipping Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Shipping Information
          </h2>

          <form className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <textarea
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={form.postalCode}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <button
  type="button"
  onClick={handlePlaceOrder}
  className="w-full bg-black text-white py-3 rounded hover:opacity-90"
>
  Place Order
</button>

          </form>
        </div>

      </div>

    </div>
  );
};

export default Checkout;