import express from "express";

import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController
} from "./product.controller.js";
import upload from "../../middleware/upload.js";

const router = express.Router();


// Create product
router.post("/", upload.single("image"), createProductController);

// Get all products
router.get("/", getAllProductsController);

// Get product by ID
router.get("/:id", getProductByIdController);

// Update product
router.put("/:id", updateProductController);

// Delete product
router.delete("/:id", deleteProductController);


export default router;