export default function CartItem({ item }) {
  return (
    <div className="flex items-center gap-6 border p-4 rounded">

      {/* Preview Image */}
      <img
        src={item.previewImage}
        alt="preview"
        className="w-[120px] border rounded"
      />

      {/* Product Details */}
      <div className="flex-1">

        <h2 className="font-semibold text-lg">
          {item.title}
        </h2>

        <p>Color: {item.color}</p>

        <p>Price: ₹{item.price}</p>

        <p>Quantity: {item.quantity}</p>

      </div>

    </div>
  );
}