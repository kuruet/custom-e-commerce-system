const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-md p-4">

      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover rounded"
      />

      <h2 className="text-lg font-semibold mt-3">
        {product.title}
      </h2>

      <p className="text-gray-600">
        ₹{product.price}
      </p>

      <button className="mt-3 bg-black text-white px-4 py-2 rounded">
        View Product
      </button>

    </div>
  );
};

export default ProductCard;