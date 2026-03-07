import { useEffect, useRef } from "react";
import { Canvas } from "fabric";

import shirtWhite from "../../assets/mockups/shirt-white.png";

export default function ProductCanvas({ color, setCanvasInstance }) {

  const canvasRef = useRef(null);
  const fabricRef = useRef(null);

  useEffect(() => {

    fabricRef.current = new Canvas(canvasRef.current, {
      width: 420,
      height: 420,
      backgroundColor: "transparent",
      selection: true
    });

    const canvasWrapper = fabricRef.current.wrapperEl;

    canvasWrapper.style.position = "absolute";
    canvasWrapper.style.top = "0";
    canvasWrapper.style.left = "0";

    setCanvasInstance(fabricRef.current);

    return () => {
      fabricRef.current.dispose();
    };

  }, []);

  return (
    <div className="relative w-[420px] h-[420px]">

      <img
        src={shirtWhite}
        alt="shirt"
        className="absolute inset-0 w-full h-full object-contain select-none"
      />

      <div className="absolute inset-0">
        <canvas ref={canvasRef}/>
      </div>

      <div
        className="absolute border-2 border-dashed border-gray-400 pointer-events-none z-10"
        style={{
          top: "120px",
          left: "140px",
          width: "140px",
          height: "140px"
        }}
      />

    </div>
  );
}