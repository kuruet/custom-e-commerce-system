import { useEffect, useState } from "react";
import axios from "axios";
             import { Link } from "react-router-dom";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders`
        
      );
      console.log(response.data);

     setOrders(response.data.data);
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

{Array.isArray(orders) && orders.length === 0 && (
  <tr>
    <td colSpan="5" className="p-4">
      No orders found
    </td>
  </tr>
)}

{Array.isArray(orders) &&
 orders.map((order) => (
  <tr key={order._id} className="text-center">
    <td className="p-3 border">{order._id}</td>
    <td className="p-3 border">{order.customer?.name}</td>
    <td className="p-3 border">₹{order.totalPrice}</td>
  <td className="p-3 border">
  <span className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded text-sm">
    {order.status}
  </span>
</td>
    <td className="p-3 border">
   <Link
  to={`/admin/orders/${order._id}`}
  className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
>
  View
</Link>
    </td>
  </tr>
))}

</tbody>
      </table>
    </div>
  );
};

export default OrdersList;