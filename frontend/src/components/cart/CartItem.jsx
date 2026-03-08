import { removeFromCart, updateQuantity } from "../../utils/cartStorage";

export default function CartItem({ item, index, refreshCart }) {

  const increaseQty = () => {
    updateQuantity(index, item.quantity + 1);
    refreshCart();
  };

  const decreaseQty = () => {
    if (item.quantity <= 1) return;
    updateQuantity(index, item.quantity - 1);
    refreshCart();
  };

  const removeItem = () => {
    removeFromCart(index);
    refreshCart();
  };

  const imageSrc = item.previewImage || item.image || "/placeholder.png";
  const productTitle = item.title || item.name || "Product";

  return (
    <div className="flex items-center gap-6 border rounded-lg p-5 shadow-sm hover:shadow-md transition">

      {/* Preview Image */}
      <img
        src={imageSrc}
        alt={productTitle}
        className="w-[120px] h-[120px] object-contain border rounded"
      />

      {/* Details */}
      <div className="flex-1">

        <h2 className="font-semibold text-lg">
          {productTitle}
        </h2>

        {/* Color only if exists */}
        {item.color && (
          <p className="text-sm text-gray-500 mt-1">
            Color: {item.color}
          </p>
        )}

        <p className="font-medium mt-2">
          ₹{item.price}
        </p>

        {/* Quantity */}
        <div className="flex items-center gap-3 mt-4">

          <button
            onClick={decreaseQty}
            aria-label="Decrease quantity"
            className="w-8 h-8 border rounded hover:bg-gray-100"
          >
            -
          </button>

          <span className="font-medium">
            {item.quantity}
          </span>

          <button
            onClick={increaseQty}
            aria-label="Increase quantity"
            className="w-8 h-8 border rounded hover:bg-gray-100"
          >
            +
          </button>

        </div>

        {/* Remove Button */}
        <button
          onClick={removeItem}
          className="text-red-500 text-sm mt-4 hover:underline"
        >
          Remove
        </button>

      </div>

    </div>
  );
}