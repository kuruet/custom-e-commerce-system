import { useParams } from "react-router-dom";
import { useState } from "react";

import ProductCanvas from "../components/designer/ProductCanvas";
import DesignToolbar from "../components/designer/DesignToolbar";

export default function CustomizeProduct() {

  const { productId } = useParams();

  const [color, setColor] = useState("white");
  const [canvasInstance, setCanvasInstance] = useState(null);
  const [preview, setPreview] = useState(null);

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

    </div>
  );
}