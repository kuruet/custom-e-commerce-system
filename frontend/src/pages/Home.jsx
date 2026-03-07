import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import ProductCatalog from '../components/layout/ProductCatalog';

const Home = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {

      const response = await API.get("/products");

      setProducts(response.data.data);

    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

  
       

      <h1 className="text-3xl font-bold mb-6">
        Products
      </h1>

      <div className="grid grid-cols-3 gap-6">

        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}

      </div>

    </div>
  );
};

export default Home;