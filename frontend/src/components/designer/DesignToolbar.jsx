import ColorSelector from "./ColorSelector";
import { Textbox } from "fabric";

export default function DesignToolbar({ setColor, canvas }) {

  const addText = () => {

    if (!canvas) return;

    const text = new Textbox("Your Text", {
      left: 180,
      top: 180,
      fontSize: 24,
      fill: "black"
    });

    canvas.add(text);
    canvas.setActiveObject(text);
  };

  return (
    <div className="space-y-6">

      <ColorSelector setColor={setColor} />

      <button
        onClick={addText}
        className="w-full bg-black text-white py-2 rounded"
      >
        Add Text
      </button>

      <button className="w-full bg-gray-800 text-white py-2 rounded">
        Upload Logo
      </button>

    </div>
  );
}