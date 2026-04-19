import TextColorPicker from "./TextColorPicker";
import {
  addText,
  uploadImage,
  generatePreview,
  applyTextColor
} from "../utils/designerActions";
import { saveDesignLocally, loadDesignLocally } from "../utils/designPersistence";
import { loadDesignIntoCanvas } from "../utils/loadCanvasDesign";

export default function DesignToolbar({ canvas, setPreview, textColor, setTextColor }) {

  const handleColorChange = (color) => {
    setTextColor(color);
    applyTextColor(canvas, color);
  };

  const saveCurrentDesign = () => {
    if (!canvas) return;
    try {
      const designJSON = canvas.toJSON();
      const previewImage = canvas.toDataURL({ format: "jpeg", quality: 0.6 });
      saveDesignLocally({ designJSON, previewImage });
      alert("Design saved successfully!");
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const loadSavedDesign = async () => {
    if (!canvas) return;
    const savedDesign = loadDesignLocally();
    if (savedDesign && savedDesign.designJSON) {
      await loadDesignIntoCanvas(canvas, savedDesign.designJSON);
    } else {
      alert("No saved design found.");
    }
  };

  return (
    <div className="space-y-4">

      <TextColorPicker textColor={textColor} onChange={handleColorChange} />

      <button
        onClick={() => addText(canvas, textColor)}
        className="w-full bg-black text-white py-2 rounded"
      >
        Add Text
      </button>

      <label className="w-full block">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) uploadImage(canvas, file);
          }}
          className="hidden"
        />
        <div className="w-full bg-gray-800 text-white py-2 rounded text-center cursor-pointer">
          Upload Logo
        </div>
      </label>

      <button
        onClick={() => generatePreview(setPreview)}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Generate Preview
      </button>

      <div className="border-t border-gray-200 pt-3 space-y-2">
        <button
          onClick={saveCurrentDesign}
          className="w-full border border-gray-800 text-gray-800 py-2 rounded hover:bg-gray-100 transition-colors"
        >
          Save Design
        </button>
        <button
          onClick={loadSavedDesign}
          className="w-full border border-gray-800 text-gray-800 py-2 rounded hover:bg-gray-100 transition-colors"
        >
          Load Saved Design
        </button>
      </div>

    </div>
  );
}