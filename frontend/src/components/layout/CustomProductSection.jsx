import { useNavigate } from "react-router-dom";

import shirtWhite from "../../assets/mockups/shirt-white.png";
import shirtBlack from "../../assets/mockups/shirt-black.png";
import shirtBlue from "../../assets/mockups/shirt-blue.png";

export default function CustomProductSection() {
  const navigate = useNavigate();

  const products = [
    {
      id: "tshirt-white",
      title: "White T-Shirt",
      image: shirtWhite,
    },
    {
      id: "tshirt-black",
      title: "Black T-Shirt",
      image: shirtBlack,
    },
    {
      id: "tshirt-blue-1",
      title: "Blue T-Shirt",
      image: shirtBlue,
    },
  ];

  return (
    <section className="max-w-6xl mx-auto py-12 px-4">

      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        Customize Your Own Product
      </h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">

        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 text-center hover:shadow-md transition"
          >

            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[180px] md:h-[220px] object-contain"
            />

            <h3 className="mt-4 font-semibold text-sm md:text-base">
              {product.title}
            </h3>

            <button
              onClick={() => navigate(`/customize/${product.id}`)}
              className="mt-4 bg-black text-white px-4 py-2 rounded hover:opacity-90 text-sm md:text-base"
            >
              Customize
            </button>

          </div>
        ))}

      </div>

    </section>
  );
}