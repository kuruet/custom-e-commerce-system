import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  useRef } from "react";
import { Canvas } from "fabric";
import axios from "axios";
import { Link } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const canvasRef = useRef(null);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders/${id}`
      );

    setOrder(response.data.data);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  useEffect(() => {
  if (!order) return;

  if (!order.items || order.items.length === 0) return;

  const designJSON = order.items[0].designJSON;

  if (!designJSON) return;

 const canvas = new Canvas(canvasRef.current, {
  width: 400,
  height: 400
});

  canvas.loadFromJSON(designJSON, () => {
    canvas.renderAll();
  });

}, [order]);

  if (!order) {
    return <div className="p-6">Loading order...</div>;
  }

  return (
    <div className="p-6">

        <Link
  to="/admin/orders"
  className="inline-block mb-4 text-blue-600 underline"
>
← Back to Orders
</Link>

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

      {Array.isArray(order.items) && order.items.map((item, index) => (

  <div
    key={index}
    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border p-4 rounded"
  >

    {/* Product Info */}

    <div>

      <h3 className="text-lg font-semibold mb-3">Product Information</h3>

      <p><strong>Title:</strong> {item.title}</p>
      <p><strong>Color:</strong> {item.color}</p>
      <p><strong>Quantity:</strong> {item.quantity}</p>
      <p><strong>Price:</strong> ₹{item.price}</p>

    </div>


    {/* Design Preview */}

    <div>

      <h3 className="text-lg font-semibold mb-3">Design Preview</h3>

      <img
        src={item.previewImage}
        alt="design preview"
        className="w-64 border rounded"
      />

    </div>
    <h3 className="text-lg font-semibold mt-6 mb-3">
Design Canvas Viewer
</h3>

<canvas
  ref={canvasRef}
  className="border"
/>

  </div>

))}

      </div>

    </div>
  );
};

export default OrderDetails;