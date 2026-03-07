import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders/${id}`
      );

      setOrder(response.data.order || response.data);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  if (!order) {
    return <div className="p-6">Loading order...</div>;
  }

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">Order Details</h1>

      <div className="mb-6 border p-4 rounded">

        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>

      </div>

      <div className="mb-6 border p-4 rounded">

        <h2 className="text-xl font-semibold mb-2">Customer Info</h2>

        <p>{order.customer?.name}</p>
        <p>{order.customer?.phone}</p>
        <p>{order.customer?.address}</p>
        <p>{order.customer?.city}</p>
        <p>{order.customer?.postalCode}</p>

      </div>

      <div className="border p-4 rounded">

        <h2 className="text-xl font-semibold mb-4">Items</h2>

        {order.items.map((item, index) => (

          <div key={index} className="mb-6 border-b pb-4">

            <p><strong>Product:</strong> {item.title}</p>
            <p><strong>Color:</strong> {item.color}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <p><strong>Price:</strong> ₹{item.price}</p>

            <div className="mt-4">

              <p className="font-semibold">Design Preview</p>

              <img
                src={item.previewImage}
                alt="design preview"
                className="w-48 mt-2 border"
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default OrderDetails;