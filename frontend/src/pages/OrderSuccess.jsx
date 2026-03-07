import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">

      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-lg text-center">

        <div className="text-green-500 text-6xl mb-4">
          ✓
        </div>

        <h1 className="text-3xl font-bold mb-4">
          Order Placed Successfully
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your custom design has been received
          and our team will begin processing your order shortly.
        </p>

        <div className="space-y-3">

          <Link
            to="/"
            className="block w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
          >
            Continue Shopping
          </Link>

          <Link
            to="/cart"
            className="block w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            View Cart
          </Link>

        </div>

      </div>

    </div>
  );
};

export default OrderSuccess;