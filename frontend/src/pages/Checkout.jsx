import { useEffect, useState } from "react";
import { getCartItems, clearCart } from "../utils/cartStorage";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/api";

const Checkout = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

const [form, setForm] = useState({
  name: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  paymentMethod: "COD",
});

  useEffect(() => {
    const items = getCartItems();

    if (items.length === 0) {
      navigate("/shopping-cart");
      return;
    }

    setCartItems(items);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!/^[0-9]{6}$/.test(form.postalCode)) {
      newErrors.postalCode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + item.price * (item.quantity || 1);
  }, 0);

  const handlePlaceOrder = async () => {
    if (isSubmitting) return;
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      const orderData = {
  paymentMethod: form.paymentMethod,

  customer: {
          name: form.name,
          phone: form.phone,
          address: form.address,
          city: form.city,
          postalCode: form.postalCode,
        },

        items: cartItems.map((item) => ({
          productId: String(item.id),
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          previewImage: item.previewImage,
        })),

        totalPrice,
      };

     const token = localStorage.getItem("userToken");

const response = await createOrder(orderData, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

      const orderId = response.data._id;

      clearCart();

      navigate(`/success-page?orderId=${orderId}`);
    } catch (error) {
      console.error("Order creation failed:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-8">
        Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-10">

        {/* Order Summary */}
        <div className="bg-white shadow-md rounded-xl p-6">

          <h2 className="text-xl font-semibold mb-4">
            Your Order
          </h2>

          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 border border-gray-200 p-4 rounded-xl bg-gray-50"
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
        <div className="bg-white shadow-md rounded-xl p-6">

          <h2 className="text-xl font-semibold mb-4">
            Shipping Information
          </h2>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handlePlaceOrder();
            }}
          >

            {/* Name */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <textarea
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            {/* City */}
            <div>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>

            {/* Pincode */}
            <div>
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={form.postalCode}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.postalCode && (
                <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
              )}
            </div>

            {/* Payment Method */}
<div className="mt-4">

  <h3 className="text-lg font-semibold mb-3">
    Payment Method
  </h3>

  <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between bg-gray-50">

    <div className="flex items-center gap-3">

      <input
        type="radio"
        name="paymentMethod"
        value="COD"
        checked={form.paymentMethod === "COD"}
        onChange={handleChange}
        className="accent-black"
      />

      <div>
        <p className="font-medium">
          Cash on Delivery
        </p>

        <p className="text-sm text-gray-500">
          Pay with cash when your order arrives
        </p>
      </div>

    </div>

    <span className="text-green-600 font-semibold text-sm">
      Available
    </span>

  </div>

</div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Processing Order...
                </span>
              ) : (
                "Place Order"
              )}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Checkout;