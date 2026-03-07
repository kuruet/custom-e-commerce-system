import { useEffect, useRef } from "react";
import { Canvas } from "fabric";

export default function DesignCanvas() {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);

  useEffect(() => {
    const canvas = new Canvas(canvasRef.current, {
      width: 400,
      height: 400,
      backgroundColor: "#ffffff",
      selection: true,
    });

    fabricRef.current = canvas;

    return () => {
      canvas.dispose();
    };
  }, []);

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <canvas ref={canvasRef} />
    </div>
  );
}