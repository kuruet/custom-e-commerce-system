import { useEffect, useRef } from "react";
import { Canvas } from "fabric";

export default function DesignCanvas({ setCanvas }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new Canvas(canvasRef.current, {
      width: 500,
      height: 500,
      backgroundColor: "#ffffff",
      selection: true,
    });

    setCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, [setCanvas]);

  return (
    <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-100 flex justify-center items-center">
      <canvas ref={canvasRef} />
    </div>
  );
}