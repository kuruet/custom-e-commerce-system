import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import DesignCanvas from "../components/DesignCanvas";

export default function CustomizeProduct() {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${productId}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Loading state
  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading product...
      </div>
    );
  }

  // Product not found
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

        {/* Product Info */}
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

        {/* Canvas Designer */}
        <div>
          <DesignCanvas />
        </div>

      </div>

    </div>
  );
}