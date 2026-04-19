import { useState, useCallback, useEffect } from "react";
import { getTotalQuantity, getUnitPrice, calculateTotalPrice } from "../utils/pricingEngine";
import { saveDesignLocally, loadDesignLocally } from "../utils/designPersistence";

export default function useDesigner() {
    /**
     * 🎯 CORE DESIGN STATE
     * We only manage UI-level state here.
     * Fabric.js remains the source of truth for actual design elements.
     */

    const [color, setColor] = useState("white");
    const [canvasInstance, setCanvasInstance] = useState(null);
    const [preview, setPreview] = useState(null);

    // Product Options State
    const [sizes, setSizes] = useState({ S: 0, M: 0, L: 0, XL: 0, XXL: 0 });
    const [material, setMaterial] = useState("basic");
    const [notes, setNotes] = useState("");

    // Text Color State
    const [textColor, setTextColor] = useState("black");

    /**
     * 🎯 DERIVED VALUES
     */
    const totalQuantity = getTotalQuantity(sizes);
    const unitPrice = getUnitPrice(material);
    const totalPrice = calculateTotalPrice(sizes, material);

    /**
     * 🎯 PERSISTENCE METHODS
     */
    const saveCurrentDesign = useCallback(() => {
        if (!canvasInstance) return;
        try {
            const designJSON = canvasInstance.toJSON();
            const previewImage = canvasInstance.toDataURL({
                format: "jpeg",
                quality: 0.6,
            });
            saveDesignLocally({ designJSON, previewImage });
        } catch (error) {
            console.error("Save current design failed:", error);
        }
    }, [canvasInstance]);

    const loadSavedDesign = useCallback(() => {
        return loadDesignLocally();
    }, []);

    /**
     * 🎯 OPTIONAL AUTOSAVE EFFECT
     */
    useEffect(() => {
        if (!canvasInstance) return;

        let timeoutId;
        const handleModification = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                saveCurrentDesign();
            }, 500);
        };

        canvasInstance.on("object:modified", handleModification);
        canvasInstance.on("object:added", handleModification);
        canvasInstance.on("object:removed", handleModification);

        return () => {
            clearTimeout(timeoutId);
            canvasInstance.off("object:modified", handleModification);
            canvasInstance.off("object:added", handleModification);
            canvasInstance.off("object:removed", handleModification);
        };
    }, [canvasInstance, saveCurrentDesign]);

    /**
     * 🎯 SAFE SETTERS (memoized for stability)
     */

    const handleSetColor = useCallback((newColor) => {
        setColor(newColor);
    }, []);

    const handleSetCanvasInstance = useCallback((instance) => {
        setCanvasInstance(instance);
    }, []);

    const handleSetPreview = useCallback((previewImage) => {
        setPreview(previewImage);
    }, []);

    const handleSetTextColor = useCallback((newColor) => {
        setTextColor(newColor);
    }, []);

    /**
     * 🎯 HELPERS (future-proofing)
     */

    const generatePreviewFromCanvas = useCallback(() => {
        if (!canvasInstance) return null;

        try {
            return canvasInstance.toDataURL({
                format: "jpeg",
                quality: 0.6,
            });
        } catch (err) {
            console.error("Preview generation failed:", err);
            return null;
        }
    }, [canvasInstance]);

    const getDesignJSON = useCallback(() => {
        if (!canvasInstance) return null;

        try {
            return canvasInstance.toJSON();
        } catch (err) {
            console.error("Design JSON extraction failed:", err);
            return null;
        }
    }, [canvasInstance]);

    /**
     * 🎯 RETURN CONTRACT
     * This is the ONLY interface the rest of the app should use.
     */

    return {
        // State
        color,
        canvasInstance,
        preview,
        sizes,
        material,
        notes,
        textColor,

        // Derived Values
        totalQuantity,
        unitPrice,
        totalPrice,

        // Persistence
        saveCurrentDesign,
        loadSavedDesign,

        // Setters
        setColor: handleSetColor,
        setCanvasInstance: handleSetCanvasInstance,
        setPreview: handleSetPreview,
        setSizes,
        setMaterial,
        setNotes,
        setTextColor: handleSetTextColor,

        // Helpers (optional usage)
        generatePreviewFromCanvas,
        getDesignJSON,
    };
}