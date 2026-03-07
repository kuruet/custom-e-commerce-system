import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

const ProductDetails = () => {

    const navigate = useNavigate();

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {

      const response = await API.get(`/products/${id}`);

      setProduct(response.data.data);

    } catch (error) {
      console.error("Failed to fetch product", error);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">

      <div className="grid grid-cols-2 gap-8">

        <img
          src={product.image}
          alt={product.title}
          className="w-full rounded-lg"
        />

        <div>

          <h1 className="text-3xl font-bold mb-4">
            {product.title}
          </h1>

          <p className="text-gray-600 mb-4">
            {product.description}
          </p>

          <p className="text-xl font-semibold mb-6">
            ₹{product.price}
          </p>

          <button
  onClick={() => navigate(`/customize/${product._id}`)}
  className="bg-black text-white px-6 py-2 rounded"
>
  Customize Product
</button>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;