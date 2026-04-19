export async function loadDesignIntoCanvas(canvas, designJSON) {
  if (!canvas || !designJSON) return;

  try {
    canvas.clear();
    await canvas.loadFromJSON(designJSON);
    canvas.renderAll();
  } catch (error) {
    console.error("Failed to load design into canvas:", error);
  }
}
