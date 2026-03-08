import { useNavigate } from "react-router-dom";

export default function CustomProductSection() {
  const navigate = useNavigate();

  const products = [
    {
      id: "tshirt",
      title: "Custom T-Shirt",
      image: "/mockups/shirt-white.png",
    },
    {
      id: "hoodie",
      title: "Custom Hoodie",
      image: "/mockups/hoodie.png",
    },
    {
      id: "cap",
      title: "Custom Cap",
      image: "/mockups/cap.png",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto py-16">

      <h2 className="text-3xl font-bold mb-10">
        Customize Your Own Product
      </h2>

      <div className="grid grid-cols-3 gap-6">

        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 text-center"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[220px] object-contain"
            />

            <h3 className="mt-4 font-semibold">
              {product.title}
            </h3>

            <button
              onClick={() => navigate(`/customize/${product.id}`)}
              className="mt-4 bg-black text-white px-4 py-2 rounded"
            >
              Customize
            </button>
          </div>
        ))}

      </div>
    </section>
  );
}