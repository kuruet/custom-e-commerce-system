import { useParams } from "react-router-dom";
import ProductCanvas from "../components/designer/ProductCanvas";
import DesignToolbar from "../components/designer/DesignToolbar";

export default function CustomizeProduct() {
  const { productId } = useParams();

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Customize Your Product
      </h1>

      <div className="grid grid-cols-3 gap-10">

        {/* Canvas Area */}
        <div className="col-span-2 flex justify-center">
          <ProductCanvas />
        </div>

        {/* Tools Panel */}
        <div>
          <DesignToolbar />
        </div>

      </div>

    </div>
  );
}