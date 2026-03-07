import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function CustomizeProduct() {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-10 text-center text-red-500">
        Product not found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Customize Product
      </h1>

      <div className="grid md:grid-cols-2 gap-10">

        {/* Product Preview */}
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="rounded-lg shadow-md"
          />

          <h2 className="text-xl font-semibold mt-4">
            {product.title}
          </h2>

          <p className="text-gray-600">
            ₹{product.price}
          </p>
        </div>

        {/* Canvas area placeholder */}
        <div className="border rounded-lg h-[400px] flex items-center justify-center">
          Canvas will load here
        </div>

      </div>

    </div>
  );
}