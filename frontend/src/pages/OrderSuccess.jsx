import { Link, useSearchParams } from "react-router-dom";

const OrderSuccess = () => {

  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">

      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-lg text-center">

        <div className="text-green-500 text-6xl mb-4">
          ✓
        </div>

        <h1 className="text-3xl font-bold mb-4">
          Order Placed Successfully
        </h1>

        <p className="text-gray-600 mb-4">
          Thank you for your purchase. Your custom product will be processed soon.
        </p>

        {orderId && (
          <div className="bg-gray-100 rounded-lg p-3 mb-6">
            <p className="text-sm text-gray-500">
              Order ID
            </p>

            <p className="font-mono text-lg">
              {orderId}
            </p>
          </div>
        )}

        <Link
          to="/"
          className="block w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
        >
          Continue Shopping
        </Link>

      </div>

    </div>
  );
};

export default OrderSuccess;