import { useEffect, useRef } from "react";
import { Canvas } from "fabric";
import { loadDesignLocally } from "../utils/designPersistence";
import { loadDesignIntoCanvas } from "../utils/loadCanvasDesign";

import shirtWhite from "../../../assets/mockups/shirt-white.png";
import shirtBlack from "../../../assets/mockups/shirt-black.png";
import shirtRed from "../../../assets/mockups/shirt-red.png";
import shirtBlue from "../../../assets/mockups/shirt-blue.png";

export default function ProductCanvas({ color, setCanvasInstance }) {

  const canvasRef = useRef(null);
  const fabricRef = useRef(null);

  const mockups = {
    white: shirtWhite,
    black: shirtBlack,
    red: shirtRed,
    blue: shirtBlue
  };

  useEffect(() => {

    fabricRef.current = new Canvas(canvasRef.current, {
      width: 420,
      height: 420,
      backgroundColor: "transparent",
      selection: true
    });

    const wrapper = fabricRef.current.wrapperEl;
    wrapper.style.position = "absolute";
    wrapper.style.top = "0";
    wrapper.style.left = "0";

    if (setCanvasInstance) {
      setCanvasInstance(fabricRef.current);
    }

    // Load saved design if it exists
    const savedDesign = loadDesignLocally();
    if (savedDesign && savedDesign.designJSON) {
      loadDesignIntoCanvas(fabricRef.current, savedDesign.designJSON);
    }

    return () => fabricRef.current.dispose();

  }, []);

  return (
    <div
      id="designer-area"
      style={{
        width: "420px",
        height: "420px",
        position: "relative"
      }}
    >

      {/* Shirt Layer */}
      <img
        src={mockups[color]}
        alt="shirt"
        style={{
          width: "420px",
          height: "420px",
          objectFit: "contain",
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none"
        }}
      />

      {/* Fabric Canvas */}
      <canvas
        ref={canvasRef}
        width={420}
        height={420}
        style={{
          position: "absolute",
          top: 0,
          left: 0
        }}
      />

    </div>
  );
}