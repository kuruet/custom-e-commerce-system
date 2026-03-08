import { useParams, useNavigate } from "react-router-dom";
import { addToCart } from "../utils/cartStorage";
import { useState } from "react";

import ProductCanvas from "../components/designer/ProductCanvas";
import DesignToolbar from "../components/designer/DesignToolbar";

export default function CustomizeProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [color, setColor] = useState("white");
  const [canvasInstance, setCanvasInstance] = useState(null);
  const [preview, setPreview] = useState(null);

  // Add To Cart Handler
const handleAddToCart = () => {
  if (!canvasInstance) return;

  const previewImage =
    preview ||
    canvasInstance.toDataURL({
      format: "png",
      quality: 1,
    });

  const designJSON = canvasInstance.toJSON();

const cartItem = {
  id: `custom-${Date.now()}`,   // unique cart id
  productId,
  title: "Custom Product",
  price: 799,
  color,
  quantity: 1,
  previewImage,
  designJSON,
};

  addToCart(cartItem);

  navigate("/shopping-cart")
};

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-8">
        Customize Your Product
      </h1>

      <div className="flex gap-8">

        <ProductCanvas
          color={color}
          setCanvasInstance={setCanvasInstance}
        />

        <div className="w-[260px]">
          <DesignToolbar
            setColor={setColor}
            canvas={canvasInstance}
            setPreview={setPreview}
          />
        </div>

      </div>

      {/* Preview Section */}
      {preview && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">
            Design Preview
          </h2>

          <img
            src={preview}
            alt="Design Preview"
            className="w-[250px] border rounded"
          />
        </div>
      )}

      {/* Add To Cart Button */}
      <div className="mt-8">
        <button
          onClick={handleAddToCart}
          className="bg-black text-white px-6 py-3 rounded hover:opacity-90"
        >
          Add To Cart
        </button>
      </div>

    </div>
  );
}