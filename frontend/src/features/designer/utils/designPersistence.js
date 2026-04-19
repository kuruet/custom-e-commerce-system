export function saveDesignLocally(design) {
  try {
    localStorage.setItem("designer_draft", JSON.stringify(design));
  } catch (error) {
    console.error("Failed to save design locally:", error);
  }
}

export function loadDesignLocally() {
  try {
    const saved = localStorage.getItem("designer_draft");
    if (!saved) return null;
    return JSON.parse(saved);
  } catch (error) {
    console.error("Failed to load design locally:", error);
    return null;
  }
}

export function clearSavedDesign() {
  localStorage.removeItem("designer_draft");
}
