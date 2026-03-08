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

const handleAddToCart = () => {
  if (!canvasInstance) return;

  const previewImage =
    preview ||
    canvasInstance.toDataURL({
      format: "jpeg",
      quality: 0.6,
    });

  const designJSON = canvasInstance.toJSON();

  const cartItem = {
    id: `custom-${Date.now()}`,
    productId,
    title: "Custom Product",
    price: 799,
    color,
    quantity: 1,
    previewImage,
    designJSON,
  };

  addToCart(cartItem);

  navigate("/shopping-cart");
};

  return (
    <div className="w-full px-4 py-10 flex justify-center">

      {/* Main Container */}
      <div className="w-full max-w-6xl">

        <h1 className="text-2xl md:text-3xl font-bold mb-10 text-center">
          Customize Your Product
        </h1>

        {/* Designer Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10">

          {/* Canvas */}
          <div className="flex justify-center">
            <ProductCanvas
              color={color}
              setCanvasInstance={setCanvasInstance}
            />
          </div>

          {/* Toolbar */}
          <div className="w-full max-w-[260px]">
            <DesignToolbar
              setColor={setColor}
              canvas={canvasInstance}
              setPreview={setPreview}
            />
          </div>

        </div>

        {/* Preview Section */}
        {preview && (
          <div className="mt-12 text-center">

            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Design Preview
            </h2>

            <img
              src={preview}
              alt="Design Preview"
              className="mx-auto w-[220px] md:w-[250px] border rounded"
            />

          </div>
        )}

        {/* Add To Cart */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-3 rounded hover:opacity-90"
          >
            Add To Cart
          </button>
        </div>

      </div>
    </div>
  );
}