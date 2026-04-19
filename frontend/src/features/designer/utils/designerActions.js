import { Textbox, Image } from "fabric";
import html2canvas from "html2canvas";

// PRINT AREA CENTER
const centerX = 210;
const centerY = 190;

export const applyTextColor = (canvas, color) => {
  if (!canvas) return;
  const activeObject = canvas.getActiveObject();
  if (activeObject && activeObject.type === "textbox") {
    activeObject.set("fill", color);
    canvas.renderAll();
  }
};

export const addText = (canvas, textColor = "black") => {
  if (!canvas) return;

  const text = new Textbox("Your Text", {
    left: centerX,
    top: centerY,
    originX: "center",
    originY: "center",
    fontSize: 24,
    fill: textColor
  });

  canvas.add(text);
  canvas.setActiveObject(text);
  canvas.renderAll();
};

export const uploadImage = (canvas, file) => {
  if (!canvas || !file) return;

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
};

export const generatePreview = async (setPreview) => {
  const designer = document.getElementById("designer-area");
  if (!designer) return;

  const canvasImage = await html2canvas(designer);

  const preview = canvasImage.toDataURL("image/png");

  if (setPreview) {
    setPreview(preview);
  }
};
