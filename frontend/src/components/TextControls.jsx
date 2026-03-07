import { Textbox } from "fabric";

export default function TextControls({ canvas }) {

  const addText = () => {
    if (!canvas) return;

    const text = new Textbox("Your Text", {
      left: 150,
      top: 200,
      fontSize: 30,
      fill: "#000000",
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  };

  return (
    <div className="mb-4">
      <button
        onClick={addText}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Add Text
      </button>
    </div>
  );
}