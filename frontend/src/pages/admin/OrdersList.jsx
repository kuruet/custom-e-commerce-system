import { useEffect, useState } from "react";
import axios from "axios";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders`
      );

      setOrders(response.data.orders || response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Orders</h1>

      <table className="w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Order ID</th>
            <th className="p-3 border">Customer</th>
            <th className="p-3 border">Total</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(orders) && orders.map((order) => (
            <tr key={order._id} className="text-center">
              <td className="p-3 border">{order._id}</td>
              <td className="p-3 border">{order.customer?.name}</td>
              <td className="p-3 border">₹{order.totalPrice}</td>
              <td className="p-3 border">{order.status}</td>
              <td className="p-3 border">
                <a
                  href={`/admin/orders/${order._id}`}
                  className="text-blue-500 underline"
                >
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList;