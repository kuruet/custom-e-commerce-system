import { Textbox, Image } from "fabric";
import ColorSelector from "./ColorSelector";

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

const uploadLogo = async (event) => {

  if (!canvas) return;

  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = async (e) => {

    const img = await Image.fromURL(e.target.result);

    img.scaleToWidth(120);

    img.set({
      left: 160,
      top: 160
    });

    canvas.add(img);
    canvas.setActiveObject(img);
    canvas.renderAll();

  };

  reader.readAsDataURL(file);

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

      <label className="w-full block">

        <input
          type="file"
          accept="image/*"
          onChange={uploadLogo}
          className="hidden"
        />

        <div className="w-full bg-gray-800 text-white py-2 rounded text-center cursor-pointer">
          Upload Logo
        </div>

      </label>

    </div>
  );
}