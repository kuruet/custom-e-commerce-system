import { useEffect, useState } from "react";
import { getCartItems, clearCart } from "../utils/cartStorage";
import { useNavigate } from "react-router-dom";
import { createOrder, getRecommendations } from "../services/api";
import ProductCard from "../components/common/ProductCard";
import PointsBadge from "../features/loyalty/components/PointsBadge";


const Checkout = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [recommendations, setRecommendations] = useState([]);

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

    // Fetch recommendations
// Fetch recommendations
const cartProductIds = items
  .filter(item => item._id)
  .map(item => item._id);

getRecommendations(cartProductIds)
  .then(res => {
    if (res.success) {
      setRecommendations(res.data);
    }
  })
  .catch(err => console.error("Failed to load recommendations:", err));
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
  paymentMethod: form.paymentMethod || "COD",
  customer: {
    name: form.name,
    phone: form.phone,
    address: form.address,
    city: form.city,
    postalCode: form.postalCode,
  },
  // FIX: Log cartItems here to see why they are being filtered out
  items: cartItems
    .filter(item => {
       const id = item._id || item.id || item.productId;
       // Only filter out items that have NO id at all
       return id !== undefined && id !== null;
    })
    .map((item) => ({
      // Use whatever ID field is actually present
      productId: item._id || item.id || item.productId, 
      title: item.title,
      price: Number(item.price),
      quantity: Number(item.quantity) || 1,
      previewImage: item.previewImage,
    })),
  totalPrice: Number(totalPrice),
};

console.log("DEBUG: Final items being sent:", orderData.items);

      // ── COD FLOW (existing — unchanged) ──────────────────────────────────
      if (form.paymentMethod === "COD") {

        const response = await createOrder(orderData);

        console.log("FINAL ORDER DATA:", orderData);

        const orderId = response.data._id || response._id;
        clearCart();

        navigate(`/success-page?orderId=${orderId}`);

      // ── ONLINE FLOW (Razorpay) ────────────────────────────────────────────
      } else if (form.paymentMethod === "ONLINE") {

        // Step 1: Create Razorpay order on backend
        const razorpayOrderRes = await fetch(`${import.meta.env.VITE_API_URL}/payment/create-order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: Number(totalPrice) }),
        });

        const razorpayOrderData = await razorpayOrderRes.json();

        if (!razorpayOrderData.success) {
          throw new Error("Failed to create Razorpay order from backend.");
        }

        // Support both { id, amount } and { order: { id, amount } } response shapes
        const rzpOrder = razorpayOrderData.order || razorpayOrderData;

        // Step 2: Open Razorpay popup
        const options = {
          key: "rzp_test_SefM4Q9Y9W8ofN",
          amount: rzpOrder.amount,
          currency: rzpOrder.currency || "INR",
          name: "Your Store",
          description: "Order Payment",
          order_id: rzpOrder.id,
          prefill: {
            name: form.name,
            contact: form.phone,
          },
          theme: {
            color: "#000000",
          },
          // Step 3: On payment success → verify → create order in DB → navigate
          handler: async function (paymentResponse) {
            try {
              const verifyRes = await fetch(`${import.meta.env.VITE_API_URL}/payment/verify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: paymentResponse.razorpay_order_id,
                  razorpay_payment_id: paymentResponse.razorpay_payment_id,
                  razorpay_signature: paymentResponse.razorpay_signature,
                  orderData: orderData,
                }),
              });

              const verifyData = await verifyRes.json();

              if (!verifyData.success) {
                throw new Error("Payment verification failed.");
              }

              // Create order in DB after successful payment verification
              const orderId = verifyData.order._id;

              clearCart();

              navigate(`/success-page?orderId=${orderId}`);

            } catch (verifyError) {
              console.error("Payment verification or order creation failed:", verifyError);
              alert("Payment verification failed. Please contact support.");
              setIsSubmitting(false);
            }
          },
          modal: {
            // Re-enable the button if the user closes the Razorpay popup
            ondismiss: function () {
              setIsSubmitting(false);
            },
          },
        };

        // Ensure Razorpay script is loaded
        if (typeof window.Razorpay === "undefined") {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = resolve;
            script.onerror = () => reject(new Error("Failed to load Razorpay SDK."));
            document.body.appendChild(script);
          });
        }

        const rzp = new window.Razorpay(options);

        rzp.on("payment.failed", function (response) {
          console.error("Razorpay payment failed:", response.error);
          alert(`Payment failed: ${response.error.description}`);
          setIsSubmitting(false);
        });

        rzp.open();

        // NOTE: Do NOT set isSubmitting(false) here for ONLINE —
        // it is handled inside handler() or ondismiss() above.
        return;
      }

    } catch (error) {
      console.error("Order creation failed:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      // For COD, always release. For ONLINE, handler/ondismiss manages it.
      if (form.paymentMethod === "COD") {
        setIsSubmitting(false);
      }
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

          <div className="mt-6">
            <PointsBadge />
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

  {/* COD Option */}
  <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between bg-gray-50 mb-3">

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

  {/* ONLINE / Razorpay Option */}
  <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between bg-gray-50">

    <div className="flex items-center gap-3">

      <input
        type="radio"
        name="paymentMethod"
        value="ONLINE"
        checked={form.paymentMethod === "ONLINE"}
        onChange={handleChange}
        className="accent-black"
      />

      <div>
        <p className="font-medium">
          Pay Online (Razorpay)
        </p>

        <p className="text-sm text-gray-500">
          Pay securely via UPI, Card, or Net Banking
        </p>
      </div>

    </div>

    <span className="text-blue-600 font-semibold text-sm">
      Secure
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

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <div className="mt-16 bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {recommendations.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default Checkout;