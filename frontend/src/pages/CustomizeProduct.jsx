import { useParams, useNavigate } from "react-router-dom";
import { addToCart } from "../utils/cartStorage";
import DesignerLayout from "../features/designer/components/DesignerLayout";
import useDesigner from "../features/designer/hooks/useDesigner";

export default function CustomizeProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const {
      color,
      setColor,
      canvasInstance,
      setCanvasInstance,
      preview,
      setPreview,
      sizes,
      setSizes,
      material,
      setMaterial,
      notes,
      setNotes,
      totalQuantity,
      totalPrice,
      textColor,
      setTextColor
  } = useDesigner();

  const handleAddToCart = () => {
    if (!canvasInstance) return;
    if (totalQuantity === 0) {
      alert("Please select at least one size before adding to cart.");
      return;
    }

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
      price: totalPrice,
      totalQuantity,
      color,
      sizes,
      material,
      notes,
      previewImage,
      designJSON,
    };
    addToCart(cartItem);
    navigate("/shopping-cart");
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl md:text-3xl font-bold py-10 text-center">
        Customize Your Product
      </h1>

      {/* Designer Layout */}
      <DesignerLayout
        color={color}
        setColor={setColor}
        canvasInstance={canvasInstance}
        setCanvasInstance={setCanvasInstance}
        setPreview={setPreview}
        sizes={sizes}
        setSizes={setSizes}
        material={material}
        setMaterial={setMaterial}
        notes={notes}
        setNotes={setNotes}
        textColor={textColor}
        setTextColor={setTextColor}
      />

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
      <div className="mt-10 flex justify-center pb-10">
        <button
          onClick={handleAddToCart}
          className={`bg-black text-white px-6 py-3 rounded transition-opacity ${
            totalQuantity === 0 ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
          }`}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}