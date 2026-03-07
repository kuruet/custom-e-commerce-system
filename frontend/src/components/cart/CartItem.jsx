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

  return (
    <div className="flex items-center gap-6 border p-4 rounded">

      <img
        src={item.previewImage}
        alt="preview"
        className="w-[120px] border rounded"
      />

      <div className="flex-1">

        <h2 className="font-semibold text-lg">
          {item.title}
        </h2>

        <p>Color: {item.color}</p>

        <p>Price: ₹{item.price}</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mt-2">

          <button
            onClick={decreaseQty}
            className="px-3 py-1 border rounded"
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={increaseQty}
            className="px-3 py-1 border rounded"
          >
            +
          </button>

        </div>

        {/* Remove */}
        <button
          onClick={removeItem}
          className="text-red-500 mt-3 text-sm"
        >
          Remove
        </button>

      </div>

    </div>
  );
}