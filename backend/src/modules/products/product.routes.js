import express from "express";
import mongoose from "mongoose";
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
  getRecommendedProductsController
} from "./product.controller.js";

import upload from "../../middleware/upload.js";

const router = express.Router();

/**
 * Middleware to validate MongoDB ObjectId
 * Prevents "Cast to ObjectId failed" by stopping invalid IDs before they hit the controller
 */
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: `Invalid Product ID format: ${req.params.id}`,
    });
  }
  next();
};

/* =========================================================
   1. STATIC ROUTES (Must be defined first)
   ========================================================= */

// Get all products
router.get("/", getAllProductsController);

// Get recommended products
// This matches "/api/products/recommendations" exactly
router.get("/recommendations", getRecommendedProductsController);

// Create product
router.post("/", upload.single("image"), createProductController);


/* =========================================================
   2. DYNAMIC ROUTES (Must be defined last)
   ========================================================= */

// Get product by ID
router.get("/:id", validateObjectId, getProductByIdController);

// Update product
router.put("/:id", validateObjectId, updateProductController);

// Delete product
router.delete("/:id", validateObjectId, deleteProductController);

export default router;