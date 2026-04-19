import { removeFromCart, updateQuantity, updateItemSize } from "../../../utils/cartStorage";

export default function CartItem({ item, refreshCart }) {

  const increaseQty = () => {
    updateQuantity(item.id, item.quantity + 1);
    refreshCart();
  };

  const decreaseQty = () => {
    updateQuantity(item.id, item.quantity - 1);
    refreshCart();
  };

  const removeItem = () => {
    removeFromCart(item.id);
    refreshCart();
  };

  const handleSizeChange = (e) => {
    updateItemSize(item.id, e.target.value === "Select Size" ? null : e.target.value);
    refreshCart();
  };

  return (
    <div className="flex items-center gap-6 border rounded-lg p-5 shadow-sm hover:shadow-md transition">

      <img
        src={item.previewImage}
        alt={item.title}
        className="w-[120px] h-[120px] object-contain border rounded"
      />

      <div className="flex-1">

        <h2 className="font-semibold text-lg">
          {item.title}
        </h2>

        <p className="font-medium mt-2">
          ₹{item.price}
        </p>

        <div className="mt-3">
          <select
            value={item.size || "Select Size"}
            onChange={handleSizeChange}
            className={`border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 ${!item.size ? "border-red-400 text-red-500" : "border-gray-300 text-gray-700"}`}
          >
            <option value="Select Size" disabled>Select Size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>

        <div className="flex items-center gap-3 mt-4">

          <button
            onClick={decreaseQty}
            className="w-8 h-8 border rounded hover:bg-gray-100"
          >
            -
          </button>

          <span className="font-medium">
            {item.quantity}
          </span>

          <button
            onClick={increaseQty}
            className="w-8 h-8 border rounded hover:bg-gray-100"
          >
            +
          </button>

        </div>

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