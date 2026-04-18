import { Textbox, Image } from "fabric";
import html2canvas from "html2canvas";
import ColorSelector from "./ColorSelector";

export default function DesignToolbar({ setColor, canvas, setPreview }) {

  // PRINT AREA CENTER
  const centerX = 210;
  const centerY = 190;

  const addText = () => {

    if (!canvas) return;

    const text = new Textbox("Your Text", {
      left: centerX,
      top: centerY,
      originX: "center",
      originY: "center",
      fontSize: 24,
      fill: "black"
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  };


  const uploadLogo = async (event) => {

    if (!canvas) return;

    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e) => {

      const img = await Image.fromURL(e.target.result);

      img.scaleToWidth(100);

      img.set({
        left: centerX,
        top: centerY,
        originX: "center",
        originY: "center"
      });

      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();

    };

    reader.readAsDataURL(file);

    event.target.value = "";
  };


  const generatePreview = async () => {

    const designer = document.getElementById("designer-area");
    if (!designer) return;

    const canvasImage = await html2canvas(designer);

    const preview = canvasImage.toDataURL("image/png");

    if (setPreview) {
      setPreview(preview);
    }

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

      <button
        onClick={generatePreview}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
       Generate Preview
      </button>

    </div>
  );
}