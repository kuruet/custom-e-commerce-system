import { useEffect, useRef } from "react";
import { Canvas, Textbox } from "fabric";

export default function DesignCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new Canvas(canvasRef.current, {
      width: 500,
      height: 500,
      backgroundColor: "#ffffff",
    });

    // TEMP TEST OBJECT
    const text = new Textbox("Edit me", {
      left: 150,
      top: 200,
      fontSize: 30,
      fill: "black"
    });

    canvas.add(text);

  }, []);

  return (
    <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-100 flex justify-center items-center">
      <canvas ref={canvasRef}/>
    </div>
  );
}